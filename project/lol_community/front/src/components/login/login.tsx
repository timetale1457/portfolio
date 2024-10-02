import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../utils/language'; // i18n 초기화
import './login.css'; // CSS 파일 추가

const Login: React.FC = () => {
  const { t, i18n } = useTranslation();

  // 언어 변경 함수
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const [keepLogin, setKeepLogin] = useState(false);
  const [saveId, setSaveId] = useState(false);

  return (
    <div className="login-container">
      <div className="login-box">
        <h1> {t('login_btn_content')} </h1>
        <input type="text" placeholder={t('login_id_placeholder')} />
        <input type="password" placeholder={t('login_pw_placeholder')} />
        <div className="checkbox-group">
          <input 
            type="checkbox" 
            id="keep-login" 
            checked={keepLogin} 
            onChange={() => setKeepLogin(!keepLogin)} 
          />
          <label htmlFor="keep-login">{t('keep_login')}</label>

          <input 
            type="checkbox" 
            id="save-id" 
            checked={saveId} 
            onChange={() => setSaveId(!saveId)} 
          />
          <label htmlFor="save-id">{t('save_id')}</label>
        </div>
        
        <button>{t('login_btn_content')}</button>
        <div className="login-links">
          <a href="/find-id">{t('find_id')}</a>
          <span>|</span>
          <a href="/find-password">{t('find_password')}</a>
          <span>|</span>
          <a href="/signup">{t('signup')}</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
