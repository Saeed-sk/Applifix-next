import React, {useState, ChangeEvent, useRef, useId, useEffect} from 'react';
import Image from 'next/image';
import {UseFormRegisterReturn} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import {env} from "@/env";
import {AspectRatio} from "@/components/ui/aspect-ratio";

interface ImageInputPreviewProps {
    alt: string;
    previewWidth?: number;
    previewHeight?: number;
    onChangeAction?: UseFormRegisterReturn;
    error?: string;
    userImage?: string
}

export default function ImageInputPreview({
                                              alt,
                                              previewWidth = 150,
                                              previewHeight = 150,
                                              onChangeAction,
                                              userImage,
                                              error,
                                          }: ImageInputPreviewProps) {
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [image, setImage] = useState('');
    const inputId = useId() + 'file';

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setPreviewSrc(URL.createObjectURL(file));
        } else {
            setPreviewSrc(null);
        }
    };

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        document.getElementById(inputId)?.click();
    };
    console.log(previewSrc)
    useEffect(() => {
        if (previewSrc) {
            setImage(previewSrc);
        }else if(!previewSrc && userImage){
            setImage(env.NEXT_PUBLIC_IMAGE_DIRECTORY + userImage);
        } else {
            setImage('/assets/user-avatar.svg');
        }
    }, [previewSrc]);

    return (
        <div className="w-full flex-center justify-between">
            {/* Hidden file input */}
            <input
                id={inputId}
                type="file"
                accept="image/*"
                {...onChangeAction}
                style={{
                    position: 'absolute',
                    opacity: 0,
                    width: 0,
                    height: 0,
                }}
            />

            {/* Preview only if selected */}
            {image && (
                <AspectRatio
                    className={'bg-white rounded-full border border-gray-300 w-[100px] aspect-square flex-center p-5 cursor-pointer'}
                    ratio={1}>
                    <Image
                        src={image}
                        onClick={handleClick}
                        className={'static w-full h-full object-fill'}
                        fill={true} sizes={'50svw'} priority={true}
                        alt={'user avatar'}
                    />
                </AspectRatio>
            )}

            {/* Button or text to add */}
            <Button type="button" onClick={handleClick} variant="outline-secondary">
                Change Image
            </Button>

            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
    );
}
