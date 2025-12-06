'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
    onImageUpload: (file: File) => void;
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            // Auto-upload immediately
            onImageUpload(file);
        }
    }, [onImageUpload]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            // Auto-upload immediately
            onImageUpload(file);
        }
    }, [onImageUpload]);

    const handleUpload = () => {
        if (selectedFile) {
            onImageUpload(selectedFile);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-effect rounded-3xl p-8 md:p-12"
            >
                {!preview ? (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`
              relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
              ${isDragging
                                ? 'border-purple-500 bg-purple-500/10 scale-105'
                                : 'border-gray-600 hover:border-purple-500/50 hover:bg-white/5'
                            }
            `}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            id="file-upload"
                        />

                        <div className="pointer-events-none">
                            <motion.div
                                animate={{ y: isDragging ? -10 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="mb-6"
                            >
                                <svg
                                    className="mx-auto h-24 w-24 text-purple-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                            </motion.div>

                            <h3 className="text-2xl font-semibold mb-2 gradient-text">
                                이미지를 드래그하거나 클릭하세요
                            </h3>
                            <p className="text-gray-400 mb-4">
                                JPG, PNG, WEBP 지원 (최대 10MB)
                            </p>

                            <div className="inline-block px-6 py-3 rounded-xl gradient-bg text-white font-semibold glow-effect">
                                파일 선택
                            </div>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        <div className="relative rounded-2xl overflow-hidden glow-effect">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-auto max-h-96 object-contain bg-black/20"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleUpload}
                                className="flex-1 px-6 py-4 rounded-xl gradient-bg text-white font-semibold hover:scale-105 transition-transform duration-300 glow-effect"
                            >
                                3D로 변환하기 ✨
                            </button>
                            <button
                                onClick={() => {
                                    setPreview(null);
                                    setSelectedFile(null);
                                }}
                                className="px-6 py-4 rounded-xl glass-effect hover:bg-white/10 transition-all duration-300 font-semibold"
                            >
                                취소
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
