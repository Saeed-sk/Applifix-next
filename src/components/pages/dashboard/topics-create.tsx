import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
import Cookies from 'js-cookie';
import { ApiResponse } from '@/types/index.js';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Edit2, Plus } from 'lucide-react';

/**
 * Form fields for creating or updating a topic.
 */
export interface TopicFormData {
    title: string;
    description: string;
    image: FileList;
}

interface TopicModalFormProps {
    /** Existing topic for edit mode */
    initial?: {
        id: number;
        title: string;
        description: string;
        src: string;
    };
    /** ID for update; undefined for create */
    topicId?: number;
    /** Callback invoked on successful create/update */
    onSuccessAction: (topic: any) => void;
}

export default function TopicModalForm({
                                           initial,
                                           topicId,
                                           onSuccessAction,
                                       }: TopicModalFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm<TopicFormData>({
        defaultValues: initial
            ? { title: initial.title, description: initial.description, image: undefined as any }
            : undefined,
        mode: 'onChange',
    });

    const [submitting, setSubmitting] = useState(false);
    const [preview, setPreview] = useState<string | null>(initial?.src ?? null);

    // useEffect(() => {
    //     // When initial changes (edit mode), reset form and preview
    //     if (initial) {
    //         reset({
    //             title: initial.title,
    //             description: initial.description,
    //             image: undefined as any,
    //         });
    //         setPreview(initial.src ?? null);
    //     }
    // }, [initial, reset]);

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setPreview(URL.createObjectURL(file));
    };

    const onSubmit = async (data: TopicFormData) => {
        setSubmitting(true);
        const token = Cookies.get('token');
        try {
            const payload = new FormData();
            payload.append('title', data.title ?? initial?.title);
            payload.append('description', data.description ?? initial?.description);
            if (data.image && data.image.length > 0) {
                payload.append('image', data.image[0]);
            }
            const url = topicId ? `/api/topics/${topicId}` : '/api/topics';

            const response = await axios({
                url,
                method: 'POST',
                data: payload,

                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            onSuccessAction((response.data as ApiResponse<any>).data);

        } catch (err: any) {
            if (err.response) {
                const { data: serverPayload, status } = err.response;
                console.error('Laravel response:', serverPayload);

                // Determine error object: Laravel may return errors under 'errors' or under 'message'
                const validationErrors =
                    status === 422 && (serverPayload.errors ?? serverPayload.message);

                if (validationErrors && typeof validationErrors === 'object') {
                    Object.entries(validationErrors).forEach(([field, messages]: any) => {
                        setError(field as keyof TopicFormData, {
                            type: 'server',
                            message: Array.isArray(messages) ? messages[0] : String(messages),
                        });
                    });
                } else {
                    setError('title', {
                        type: 'server',
                        message: serverPayload.message || 'An unexpected error occurred.',
                    });
                }
            } else {
                setError('title', { type: 'network', message: 'Network error, please try again.' });
            }
        } finally {
            setSubmitting(false);
        }
    };

    const titleLabel = topicId ? 'Edit Topic' : 'New Topic';

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="default">
                    {topicId ? <Edit2 /> : <Plus />}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{titleLabel}</DialogTitle>
                    <DialogDescription>
                        {topicId
                            ? 'Update your topic details below.'
                            : 'Fill in the details to create a new topic.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            {...register('title', { required: 'Title is required' })}
                            defaultValue={initial?.title}
                            className="mt-1 block w-full border rounded px-3 py-2"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            defaultValue={initial?.description}
                            className="mt-1 block w-full border rounded px-3 py-2"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register('image')}
                            onChange={onImageChange}
                            className="mt-1 block w-full"
                        />
                        {preview && (
                            <img src={preview} alt="Preview" className="mt-2 h-32 object-cover rounded" />
                        )}
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    </div>

                    <DialogFooter className="space-x-2">
                        <Button type="submit" disabled={submitting}>
                            {submitting ? (topicId ? 'Updating...' : 'Creating...') : topicId ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
