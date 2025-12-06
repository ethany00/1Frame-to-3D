import { removeBackground, Config } from '@imgly/background-removal';

/**
 * 처리 속도 향상을 위한 이미지 리사이징
 */
async function resizeImage(file: File, maxSize: number): Promise<File> {
    return new Promise((resolve) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        img.onload = () => {
            let width = img.width;
            let height = img.height;

            // 지정된 크기보다 클 경우 리사이징
            if (width > maxSize || height > maxSize) {
                if (width > height) {
                    height = (height / width) * maxSize;
                    width = maxSize;
                } else {
                    width = (width / height) * maxSize;
                    height = maxSize;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(new File([blob], file.name, { type: 'image/png' }));
                } else {
                    resolve(file);
                }
            }, 'image/png', 0.9);
        };

        img.src = URL.createObjectURL(file);
    });
}

/**
 * AI를 사용하여 이미지 배경 제거 및 투명 배경 Blob 반환
 */
export async function removeImageBackground(
    imageFile: File,
    onProgress?: (progress: number) => void
): Promise<Blob> {
    try {
        // 빠른 처리를 위해 리사이징 (최대 1024px)
        const resizedFile = await resizeImage(imageFile, 1024);

        // 최적화된 설정 (경량 모델 사용)
        const config: Config = {
            model: 'isnet_quint8', // 양자화된 모델 사용으로 속도 향상
            output: {
                format: 'image/png',
                quality: 0.8,
            },
            progress: (key, current, total) => {
                const percentage = Math.round((current / total) * 100);
                onProgress?.(percentage);
            },
        };

        // 배경 제거 실행
        const blob = await removeBackground(resizedFile, config);

        return blob;
    } catch (error) {
        console.error('Background removal failed:', error);
        throw new Error('배경 제거에 실패했습니다.');
    }
}

/**
 * Blob을 텍스처용 Data URL로 변환
 */
export function blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
