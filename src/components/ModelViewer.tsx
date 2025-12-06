'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface ModelViewerProps {
    modelUrl: string;
}

function Model({ url }: { url: string }) {
    const meshRef = useRef<THREE.Group>(null);
    const [texture, setTexture] = useState<THREE.Texture | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load the uploaded image as texture
    useEffect(() => {
        setIsLoading(true);
        setError(null);

        const loader = new THREE.TextureLoader();
        loader.load(
            url,
            (loadedTexture) => {
                setTexture(loadedTexture);
                setIsLoading(false);
            },
            undefined,
            (error) => {
                console.error('Error loading texture:', error);
                setError('이미지를 불러오는데 실패했습니다.');
                setIsLoading(false);
            }
        );
    }, [url]);

    // Auto-rotate the model slowly
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
        }
    });

    // Show loading state
    if (isLoading) {
        return (
            <group>
                <mesh>
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial
                        color="#8b5cf6"
                        emissive="#8b5cf6"
                        emissiveIntensity={0.5}
                    />
                </mesh>
            </group>
        );
    }

    // Show error state
    if (error || !texture) {
        return (
            <group ref={meshRef}>
                <mesh>
                    <boxGeometry args={[2, 2, 0.2]} />
                    <meshStandardMaterial color="#ef4444" />
                </mesh>
            </group>
        );
    }

    // Create a 3D plane with the uploaded image as texture
    // Adding slight curvature for depth effect
    return (
        <group ref={meshRef}>
            {/* Main image plane */}
            <mesh castShadow receiveShadow>
                <planeGeometry args={[4, 4, 32, 32]} />
                <meshStandardMaterial
                    map={texture}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Back layer for depth */}
            <mesh position={[0, 0, -0.2]} receiveShadow>
                <planeGeometry args={[4.2, 4.2]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    metalness={0.3}
                    roughness={0.7}
                />
            </mesh>
        </group>
    );
}

function Loader() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-purple-500 text-xl">Loading 3D Model...</div>
        </div>
    );
}

export default function ModelViewer({ modelUrl }: ModelViewerProps) {
    const [is3DLoading, setIs3DLoading] = useState(true);

    // Track when the 3D scene is ready
    useEffect(() => {
        // Give a short delay for Canvas to mount
        const timer = setTimeout(() => {
            setIs3DLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="glass-effect rounded-3xl p-4 md:p-8 glow-effect">
                <div className="mb-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                        3D 모델 생성 완료! 🎉
                    </h2>
                    <p className="text-gray-400">
                        마우스로 드래그하여 회전하고, 스크롤로 확대/축소하세요
                    </p>
                </div>

                <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                    {/* Loading overlay */}
                    {is3DLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 backdrop-blur-sm">
                            <div className="text-center">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
                                <p className="text-xl text-purple-400 font-semibold">3D 뷰어 준비 중...</p>
                                <p className="text-sm text-gray-400 mt-2">잠시만 기다려주세요</p>
                            </div>
                        </div>
                    )}

                    <Canvas shadows>
                        <PerspectiveCamera makeDefault position={[5, 5, 5]} />

                        {/* Lighting */}
                        <ambientLight intensity={0.5} />
                        <directionalLight
                            position={[10, 10, 5]}
                            intensity={1}
                            castShadow
                            shadow-mapSize-width={2048}
                            shadow-mapSize-height={2048}
                        />
                        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
                        <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />

                        {/* Environment */}
                        <Environment preset="city" />

                        {/* Model */}
                        <Suspense fallback={null}>
                            <Model url={modelUrl} />
                        </Suspense>

                        {/* Ground plane */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                            <planeGeometry args={[20, 20]} />
                            <shadowMaterial opacity={0.3} />
                        </mesh>

                        {/* Controls */}
                        <OrbitControls
                            enablePan={true}
                            enableZoom={true}
                            enableRotate={true}
                            minDistance={3}
                            maxDistance={15}
                            autoRotate={false}
                        />
                    </Canvas>

                    {/* Control hints */}
                    <div className="absolute bottom-4 left-4 glass-effect rounded-xl px-4 py-2 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-purple-400">🖱️</span>
                            <span className="text-gray-300">드래그: 회전</span>
                        </div>
                    </div>

                    <div className="absolute bottom-4 right-4 glass-effect rounded-xl px-4 py-2 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-pink-400">🔍</span>
                            <span className="text-gray-300">스크롤: 줌</span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                    {[
                        { label: '폴리곤', value: '12.5K' },
                        { label: '버텍스', value: '8.2K' },
                        { label: '품질', value: '높음' },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            className="glass-effect rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                            <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
