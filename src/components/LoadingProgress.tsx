'use client';

import { motion } from 'framer-motion';

interface LoadingProgressProps {
    progress: number;
    image: string | null;
    processingStage?: string;
}

export default function LoadingProgress({ progress, image, processingStage }: LoadingProgressProps) {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="glass-effect rounded-3xl p-8 md:p-12"
            >
                {image && (
                    <div className="mb-8 rounded-2xl overflow-hidden">
                        <img
                            src={image}
                            alt="Processing"
                            className="w-full h-auto max-h-64 object-contain bg-black/20"
                        />
                    </div>
                )}

                <div className="space-y-6">
                    <div className="text-center">
                        <motion.h3
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-2xl font-semibold gradient-text mb-2"
                        >
                            {processingStage || 'AI가 3D 모델을 생성하고 있습니다...'}
                        </motion.h3>
                        <p className="text-gray-400">
                            잠시만 기다려주세요
                        </p>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="absolute inset-y-0 left-0 gradient-bg rounded-full"
                        />

                        {/* Shimmer effect */}
                        <motion.div
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                    </div>

                    <div className="text-center">
                        <span className="text-3xl font-bold gradient-text">
                            {progress}%
                        </span>
                    </div>

                    {/* Loading animation */}
                    <div className="flex justify-center gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                                className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
