'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import ImageUploader from '@/components/ImageUploader';
import LoadingProgress from '@/components/LoadingProgress';
import { removeImageBackground, blobToDataURL } from '@/utils/backgroundRemoval';

// Three.js SSR 에러 방지
const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
    ssr: false,
    loading: () => <div className="text-center text-purple-500">Loading 3D Viewer...</div>
});

export default function Home() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [modelUrl, setModelUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [processingStage, setProcessingStage] = useState<string>('');

    const handleImageUpload = async (file: File) => {
        // 로딩 상태 즉시 표시
        setIsLoading(true);
        setProgress(0);
        setProcessingStage('이미지 준비 중...');

        const imageUrl = URL.createObjectURL(file);
        setUploadedImage(imageUrl);

        try {
            // 배경 제거 시작
            setProcessingStage('AI 배경 제거 중... (10-20초 소요)');
            setProgress(10);

            const backgroundRemovedBlob = await removeImageBackground(file, (progressPercent) => {
                setProgress(Math.max(10, progressPercent)); // Ensure progress is at least 10%
            });

            setProcessingStage('3D 변환 준비 중...');

            // Blob을 Data URL로 변환
            const processedImageUrl = await blobToDataURL(backgroundRemovedBlob);

            setProgress(100);

            // 3D 뷰어에 결과 표시
            setTimeout(() => {
                setModelUrl(processedImageUrl);
                setIsLoading(false);
                setProcessingStage('');
            }, 300);
        } catch (error) {
            console.error('Background removal failed:', error);
            setIsLoading(false);
            setProcessingStage('');
            alert('캐릭터 추출에 실패했습니다. 다른 이미지를 시도해주세요.');

            // 실패시 원본 이미지 사용
            setModelUrl(imageUrl);
        }
    };

    const handleReset = () => {
        setUploadedImage(null);
        setModelUrl(null);
        setIsLoading(false);
        setProgress(0);
        setProcessingStage('');
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
                                <LoadingProgress
                                    progress={progress}
                                    image={uploadedImage}
                                    processingStage={processingStage}
                                />
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
