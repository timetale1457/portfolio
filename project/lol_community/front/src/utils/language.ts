import i18n from 'i18next';
import * as reactI18next from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// i18n 초기화
i18n
  .use(Backend) // 서버에서 번역 파일을 불러오기 위해 사용
  .use(LanguageDetector) // 브라우저에서 사용자의 언어를 자동으로 감지
  .use(reactI18next.initReactI18next) // React에서 i18next 사용
  .init({
    fallbackLng: 'en', // 설정된 언어에 해당하는 번역이 없을 경우 기본 언어
    debug: true, // 디버그 모드 (개발 중 활성화하면 콘솔에서 로그 확인 가능)
    interpolation: {
      escapeValue: false, // React는 XSS 방지를 위해 자동으로 이스케이프 처리를 해줍니다.
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // 번역 파일 경로
    },
  });

export default i18n;
