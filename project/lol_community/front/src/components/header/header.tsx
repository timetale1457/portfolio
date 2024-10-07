import { changeLanguage } from 'i18next';
import './header.css';

const Header: React.FC = () => {
    return (
        <div>
            <i className="fa fa-globe" aria-hidden="true"/>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('ko')}>한국어</button>
        </div>
        
    );
  };

  export default Header;