import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../utils/language'; // i18n 초기화

const Login: React.FC = () => {
  const { t, i18n } = useTranslation();

  // 언어 변경 함수
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
       <h1> Login </h1>
      <input type="text" placeholder='Enter your username/email'></input>
      <input type="text" placeholder='Enter password'></input>
      <button>Login in</button>
      <text>Don't have an account?</text>
      <text >Signup Now</text>
      <h1>{t('login_id_placeholder')}</h1>
      <p>{t('login_pw_placeholder')}</p>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ko')}>한국어</button>
    </div>
  );
};

export default Login;