# 1Frame to 3D ✨

**단 한 장의 사진으로 놀라운 3D 모델을 생성하세요**

AI 기반 이미지-to-3D 변환 웹 애플리케이션입니다. 사진을 업로드하면 실시간으로 인터랙티브한 3D 모델로 변환됩니다.

![Demo](https://img.shields.io/badge/Status-Demo-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-Latest-orange?style=for-the-badge)

## ✨ 주요 기능

- 🖼️ **드래그 앤 드롭** 이미지 업로드
- ⚡ **실시간 3D 변환** (AI 기반)
- 🎨 **인터랙티브 3D 뷰어** (회전, 줌, 팬)
- 🌙 **프리미엄 다크 모드** 디자인
- 📱 **반응형** 모바일 지원
- ✨ **부드러운 애니메이션** (Framer Motion)

## 🛠️ 기술 스택

### Frontend
- **Next.js 15** - React 프레임워크 (App Router)
- **TypeScript** - 타입 안정성
- **React Three Fiber** - 3D 렌더링
- **@react-three/drei** - 3D 헬퍼 유틸리티
- **Three.js** - WebGL 3D 라이브러리
- **Framer Motion** - 애니메이션
- **Tailwind CSS** - 스타일링

### Backend
- **Next.js API Routes** - 서버리스 API
- **Mock AI Service** - 데모용 (실제 AI API로 교체 가능)

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어 확인하세요.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📁 프로젝트 구조

```
1Frame-to-3D/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── convert/
│   │   │       └── route.ts          # 이미지-to-3D 변환 API
│   │   ├── layout.tsx                # 루트 레이아웃
│   │   ├── page.tsx                  # 메인 페이지
│   │   └── globals.css               # 글로벌 스타일
│   └── components/
│       ├── ImageUploader.tsx         # 이미지 업로드 컴포넌트
│       ├── LoadingProgress.tsx       # 로딩 진행 표시
│       └── ModelViewer.tsx           # 3D 모델 뷰어
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🔌 실제 AI API 연동하기

현재는 Mock 데이터를 사용하고 있습니다. 실제 AI 서비스를 연동하려면:

### 1. Meshy.ai 사용 예시

```typescript
// src/app/api/convert/route.ts
const response = await fetch('https://api.meshy.ai/v1/image-to-3d', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.MESHY_API_KEY}`,
  },
  body: formData,
});
```

### 2. 환경 변수 설정

`.env.local` 파일 생성:

```env
MESHY_API_KEY=your_api_key_here
```

### 3. 지원되는 AI 서비스

- **Meshy.ai** - 이미지-to-3D 변환
- **Stability AI** - TripoSR 모델
- **Rodin AI** - 3D 생성
- **Custom API** - 자체 AI 모델

## 🎨 디자인 특징

- **그라디언트 배경** - 애니메이션 효과
- **글래스모피즘** - 반투명 UI 요소
- **글로우 이펙트** - 네온 스타일 강조
- **마이크로 애니메이션** - 부드러운 인터랙션
- **커스텀 스크롤바** - 프리미엄 느낌

## 📝 라이선스

MIT License

## 🤝 기여하기

이슈와 PR은 언제나 환영합니다!

---

**Made with ❤️ using Next.js and Three.js**

