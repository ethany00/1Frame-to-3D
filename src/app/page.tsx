'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import ImageUploader from '@/components/ImageUploader';
import LoadingProgress from '@/components/LoadingProgress';

// Dynamically import ModelViewer to avoid SSR issues with Three.js
const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
    ssr: false,
    loading: () => <div className="text-center text-purple-500">Loading 3D Viewer...</div>
});

export default function Home() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [modelUrl, setModelUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleImageUpload = async (file: File) => {
        const imageUrl = URL.createObjectURL(file);
        setUploadedImage(imageUrl);
        setIsLoading(true);
        setProgress(0);

        // Simulate progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + 10;
            });
        }, 300);

        // Simulate processing time (2 seconds)
        setTimeout(() => {
            clearInterval(progressInterval);
            setProgress(100);

            // Use the uploaded image directly as the 3D model texture
            setTimeout(() => {
                setModelUrl(imageUrl);
                setIsLoading(false);
            }, 500);
        }, 2000);
    };

    const handleReset = () => {
        setUploadedImage(null);
        setModelUrl(null);
        setIsLoading(false);
        setProgress(0);
    };

    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Animated background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20" />
                <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
                <div className="absolute top-0 -right-4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }} />
            </div>

            <div className="container mx-auto px-4 py-8 md:py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">
                        1Frame to 3D
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        단 한 장의 사진으로 놀라운 3D 모델을 생성하세요
                    </p>
                </motion.div>

                {/* Main content */}
                <div className="max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        {!uploadedImage && !isLoading && !modelUrl && (
                            <motion.div
                                key="uploader"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ImageUploader onImageUpload={handleImageUpload} />
                            </motion.div>
                        )}

                        {isLoading && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <LoadingProgress progress={progress} image={uploadedImage} />
                            </motion.div>
                        )}

                        {modelUrl && !isLoading && (
                            <motion.div
                                key="viewer"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-6"
                            >
                                <ModelViewer modelUrl={modelUrl} />

                                <div className="flex justify-center">
                                    <button
                                        onClick={handleReset}
                                        className="px-8 py-3 rounded-xl glass-effect hover:bg-white/10 transition-all duration-300 font-semibold glow-effect"
                                    >
                                        새로운 이미지 업로드
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                >
                    {[
                        { icon: '⚡', title: '초고속 변환', desc: 'AI 기반 실시간 3D 생성' },
                        { icon: '🎨', title: '고품질 결과', desc: '디테일한 3D 모델 생성' },
                        { icon: '🔄', title: '인터랙티브', desc: '자유로운 회전 및 확대' },
                    ].map((feature, idx) => (
                        <div
                            key={idx}
                            className="glass-effect rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </main>
    );
}
