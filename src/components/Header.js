import React from 'react';
import logo from '../logo.jpeg';

const Header = () => {
    return (
        <header className="bg-white">
            <img src={logo} className="h-20 w-200 pl-4" alt="Logo" />
        </header>
    );
}

export default Header;
