import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import logic from '../../../logic';

import Title from '../../../components/core/Title/Title';
import './Header.css';

import InfoIcon from '../../../icons/info.png';
import LogoutIcon from '../../../icons/logout.png';

import UserInfoMenu from '../UserInfoMenu/UserInfoMenu';
import { ContextForUser } from '../../../UserContext';

function Header() {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = ContextForUser();

    const handleUserInfoMenu = () => {
        setIsMenuOpened(!isMenuOpened);
    };

    const handleLogout = () => {
        logic.logoutUser();
        navigate('/login');
        window.location.reload();
    };

    return (
        <header>
            <div className="Header">
                <h1 className="UsernameTitle">
                    {currentUser?.username && currentUser.username}
                </h1>
                <Title>Farm-Hub</Title>
                <div className="ButtonsContainer">
                    <img
                        src={InfoIcon}
                        width={24}
                        alt="User Information"
                        onClick={handleUserInfoMenu}
                    />
                    <img
                        src={LogoutIcon}
                        width={24}
                        alt="Logout Button"
                        onClick={handleLogout}
                    />
                </div>
                {isMenuOpened && <UserInfoMenu />}
            </div>
        </header>
    );
}

export default Header;
