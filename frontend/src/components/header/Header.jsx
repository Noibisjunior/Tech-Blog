import React from 'react';
import './header.css';
// import login from '../../assets/images/login.jpg';
import User from './User';
import { nav } from '../../assets/data/data';
import { Link } from 'react-router-dom';

const Header = () => {
  window.addEventListener('scroll', function () {
    const header = this.document.querySelector('.header');
    header.classList.toggle('active', this.window.scrollY > 100);
  });

  return (
    <>
      <header className="header">
        <div className="flex">
          <div className="logo">
            {/* <img src={login} alt='logo' width='100px' /> */}
            <h1>ClericCoder</h1>
          </div>
          <nav>
            <ul>
              {nav.map((link) => (
              <li key={link.id}>
                  <Link to={link.url}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flexCenter">
            <User />
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
