import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer-new">
      <div className="footer-content">
        <div className="footer-section footer-branding">
          <img src="/img/logo.png" alt="CraveHub Logo" className="footer-logo-img" />
          <h4 className="footer-title">Crave Hub</h4>
          <p className="footer-text">
            CampusCanteen is your digital companion for a seamless college cafeteria experience. Browse the daily menu, customize your meals, and place simulated orders — all from the comfort of your device. No more long queues or guesswork — just tap, order, and enjoy!
          </p>

        </div>

        <div className="footer-section footer-links">
          <ul>
            <li>
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Menu
              </Link>
            </li>

            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section footer-contact">
          <p>123 Crave Street, Flavor Town, FT 56789</p>
          <p>+123 456 7890</p>
          <p>contact@cravehub.com</p>
          <div className="footer-socials">
            <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 CraveHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
