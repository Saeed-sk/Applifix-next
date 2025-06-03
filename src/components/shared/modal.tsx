'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineWarning, AiOutlineClose } from 'react-icons/ai';
import { FC, ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onCloseAction: () => void;
    title?: string;
    children: ReactNode;
}

interface ErrorModalProps {
    isOpen: boolean;
    onCloseAction: () => void;
    message: string;
}

export const ErrorModal: FC<ErrorModalProps> = ({ isOpen, onCloseAction, message }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-red-50 rounded-2xl shadow-lg w-full max-w-md mx-auto p-6 sm:p-8 relative border-2 border-red-400"
                    initial={{ scale: 0.8, y: -30 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: -30 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                    <button
                        onClick={onCloseAction}
                        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                        aria-label="Close error modal"
                    >
                        <AiOutlineClose size={24} />
                    </button>

                    <div className="flex flex-col items-center text-center">
                        <AiOutlineWarning size={48} className="text-red-500 mb-4" />
                        <h2 className="text-xl sm:text-2xl font-semibold text-red-600 mb-2">Error :</h2>
                        <p className="text-base sm:text-lg text-red-700">{message}</p>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);


export const Modal: FC<ModalProps> = ({ isOpen, onCloseAction, title, children }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto p-6 sm:p-8 relative"
                    initial={{ scale: 0.9, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: -20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                    <button
                        onClick={onCloseAction}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        aria-label="Close modal"
                    >
                        <AiOutlineClose size={24} />
                    </button>

                    {title && <h2 className="text-xl sm:text-2xl font-semibold mb-4">{title}</h2>}
                    <div className="text-base sm:text-lg">{children}</div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);