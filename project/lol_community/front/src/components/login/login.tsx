import React, { useEffect, useState } from 'react';
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
  const signUpBtn = document.getElementById("signUp");
  const signInBtn = document.getElementById("signIn");
  const container = document.querySelector(".container");
  
  useEffect(() => {
    const signUpBtn = document.getElementById("signUp");
    const signInBtn = document.getElementById("signIn");
    const container = document.querySelector(".container");

    if (signUpBtn && signInBtn && container) {
      signUpBtn.addEventListener("click", () => {
        container.classList.add("right-panel-active");
      });
      signInBtn.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
      });
    }

    // Cleanup function: 이벤트 리스너 제거
    return () => {
      signUpBtn?.removeEventListener("click", () => {
        container?.classList.add("right-panel-active");
      });
      signInBtn?.removeEventListener("click", () => {
        container?.classList.remove("right-panel-active");
      });
    };
  }, []); // 빈 배열을 넣어 한 번만 실행

  return (
    <div className="wrapper">
      <div className="container">
        <div className="sign-up-container">
          <form>
            <h1>Create Account</h1>
            <div className="social-links">
              <div>
                <a href="#"><i className="fa fa-google" aria-hidden="true"></i></a>
              </div>
              <div>
                <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
              </div>
              <div>
                <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
              </div>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="form_btn">Sign Up</button>
          </form>
        </div>
        <div className="sign-in-container">
          <form>
            <h1>Sign In</h1>
            <div className="social-links">
              <div>
                <a href="#"><i className="fa fa-google" aria-hidden="true"></i></a>
              </div>
              <div>
                <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
              </div>
              <div>
                <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
              </div>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="form_btn">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay-left">
            <h1>Welcome Back</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button id="signIn" className="overlay_btn">Sign In</button>
          </div>
          <div className="overlay-right">
            <h1>Hello, Friend</h1>
            <p>Enter your personal details and start journey with us</p>
            <button id="signUp" className="overlay_btn">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
