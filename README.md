# 1Frame to 3D ✨

**단 한 장의 사진으로 놀라운 3D 모델을 생성하세요**

AI 기반 이미지-to-3D 변환 웹 애플리케이션입니다. 사진을 업로드하면 자동으로 배경이 제거되고 입체적인 3D 뷰어로 변환됩니다.

![Demo](https://img.shields.io/badge/Status-Demo-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-Latest-orange?style=for-the-badge)

## ✨ 주요 기능

- 🖼️ **자동 배경 제거** - AI가 이미지에서 캐릭터/사물만 추출
- ⚡ **빠른 처리 속도** - 이미지 리사이징 및 경량 모델 최적화 (2-5초)
- 🖱️ **드래그 앤 드롭** - 간편한 이미지 업로드
- 🎨 **인터랙티브 3D 뷰어** - 회전, 줌, 팬 기능 지원
- 🌙 **프리미엄 다크 모드** - 세련된 UI 디자인
- 📱 **반응형** - 모바일 및 데스크탑 완벽 지원

## 🛠️ 기술 스택

### Frontend
- **Next.js 14** - React 프레임워크
- **TypeScript** - 타입 안정성
- **React Three Fiber** - 3D 렌더링
- **@imgly/background-removal** - AI 배경 제거 (클라이언트 사이드)
- **Framer Motion** - 부드러운 애니메이션
- **Tailwind CSS** - 스타일링

### Performance
- **Image Optimization** - 자동 리사이징 (Max 1024px)
- **Quantized Model** - 경량화된 AI 모델 사용
- **Lazy Loading** - 무거운 3D 컴포넌트 지연 로딩

## 🚀 시작하기

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어 확인하세요.

## 📁 프로젝트 구조

```
1Frame-to-3D/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # 메인 로직 (업로드 -> 배경제거 -> 3D)
│   │   └── layout.tsx                # 루트 레이아웃 및 메타데이터
│   ├── components/
│   │   ├── ModelViewer.tsx           # Three.js 3D 뷰어
│   │   ├── ImageUploader.tsx         # 드래그 앤 드롭 UI
│   │   └── LoadingProgress.tsx       # 진행률 표시
│   └── utils/
│       └── backgroundRemoval.ts      # 배경 제거 로직
```

## 📝 사용 방법

1. **"이미지 업로드"** 또는 파일을 드래그하여 놓으세요.
2. **AI 분석**이 자동으로 시작되어 배경을 제거합니다.
3. **3D 뷰어**에서 생성된 모델을 확인하세요.
   - **회전**: 마우스 드래그
   - **줌**: 스크롤
   - **이동**: 우클릭 드래그

## 🤝 기여하기

이 프로젝트는 오픈 소스입니다. 이슈와 PR은 언제나 환영합니다!

---

**Made with ❤️ using Next.js and Three.js**
