'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export function InstallPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if the app is already installed
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

        // Detect iOS devices
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        setIsIOS(isIOSDevice);

        // Listen for the beforeinstallprompt event
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        try {
            await deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;

            if (choiceResult.outcome === 'accepted') {
                setShowPrompt(false);
            }
        } catch (err) {
            console.error('Error installing PWA:', err);
        }
    };

    if (isStandalone || (!showPrompt && !isIOS)) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-20 lg:bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-[400px] bg-dark-100 rounded-xl shadow-lg p-4 z-[999999]"
            >
                <div className="flex items-start justify-between gap-4 flex-col text-gray-200">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-light-100 mb-2">
                            {isIOS ? 'Install Applifix App' : 'Install App on Your Device'}
                        </h3>
                        {isIOS ? (
                            <p className="">
                                To install Applifix on your device:
                                <br />
                                1. Tap the Share button
                                <br />
                                2. Select "Add to Home Screen"
                            </p>
                        ) : (
                            <p className="text-sm ">
                                By installing Applifix on your device, you'll have faster access to all of its features.
                            </p>
                        )}
                    </div>
                    <div className="flex gap-2 w-full items-center justify-start">
                        {!isIOS && (
                            <button
                                onClick={handleInstallClick}
                                className="px-4 py-2 bg-primary-500 text-light-100 rounded-lg hover:bg-primary-600 transition-colors"
                            >
                                Install App
                            </button>
                        )}
                        <button
                            onClick={() => setShowPrompt(false)}
                            className="px-4 py-2 text-light-300 hover:text-light-100 transition-colors "
                        >
                            Later
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
