import { changeLanguage } from 'i18next';
import './header.css';
import { FaFlagUsa } from 'react-icons/fa'; // 미국 국기 아이콘
import { GiSouthKorea } from 'react-icons/gi'; // 한국 국기 아이콘
import { useState } from 'react';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ko'>('en');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const selectLanguage = (language: 'en' | 'ko') => {
        changeLanguage(language);
        setSelectedLanguage(language);
        setIsOpen(false); // 언어 선택 후 메뉴 닫기
    };
    return (
        <div className="language-toggle-container">
            <button className="language-button" onClick={toggleMenu}>
                {selectedLanguage === 'en' ? <FaFlagUsa /> : <GiSouthKorea />}
            </button>
            <div className={`language-menu ${isOpen ? 'open' : ''}`}>
                <button className="language-option" onClick={() => selectLanguage('en')}>
                    <FaFlagUsa/>
                </button>
                <button className="language-option" onClick={() => selectLanguage('ko')}>
                    <GiSouthKorea/>
                </button>
            </div>
        </div>
    );
};

export default Header;