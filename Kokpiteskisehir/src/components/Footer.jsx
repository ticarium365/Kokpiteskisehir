import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <div className="footer-logo">
            <div className="logo-icon">KO</div>
            <div className="logo-text">
              <span className="brand-name text-white">KOKPİT OKULLARI</span>
              <span className="campus-name text-light">Yesevi Kampüsü</span>
            </div>
          </div>
          <p className="footer-desc">
            Hayallerinize bir adım daha yaklaşın. Geleceğin sağlıkçıları, havacıları ve yazılımcıları burada yetişiyor.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 0-4 24.12 24.12 0 0 1 0 10 2 2 0 0 1 0 4Z"></path>
                <path d="m17 7-8.6 8.6a4 4 0 0 1-5.6 0 4 4 0 0 1 0-5.6l8.6-8.6a4 4 0 0 1 5.6 0 4 4 0 0 1 0 5.6Z"></path>
                <path d="m12 12 4-4"></path>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3 className="footer-title">Hızlı Bağlantılar</h3>
          <ul className="footer-links">
            <li><Link to="/hakkimizda">Hakkımızda</Link></li>
            <li><Link to="/hakkimizda#takvim">Akademik Takvim</Link></li>
            <li><Link to="/egitim-kadromuz">Eğitim Kadromuz</Link></li>
            <li><Link to="/hedeflerimiz">Hedeflerimiz</Link></li>
            <li><Link to="/basin">Basın</Link></li>
            <li><Link to="/ziyaretci-defteri">Ziyaretçi Defteri</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-title">Bölümlerimiz</h3>
          <ul className="footer-links">
            <li><Link to="/bolum/2/hemsire-yardimciligi">Hemşire Yardımcılığı</Link></li>
            <li><Link to="/bolum/3/ebe-yardimciligi">Ebe Yardımcılığı</Link></li>
            <li><Link to="/bolum/6/saglik-bakim-teknisyenligi">Sağlık Bakım Teknisyenliği</Link></li>
            <li><Link to="/havacilik-lisesi">Sivil Havacılık Yönetimi</Link></li>
            <li><Link to="/matrix-yazilim-koleji">Matrix Yazılım Koleji</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-title">İletişim</h3>
          <ul className="contact-info">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>Şeker Mh. Gazi Yakup Satar Cd. No:90, 26120 Tepebaşı/Eskişehir</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <span>(0222) 260 00 00 <br/> 0530 580 15 25</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} Kokpit Okulları Yesevi Kampüsü. Tüm hakları saklıdır.</p>
        <div className="footer-bottom-links">
          <a href="/kvkk-ve-aydinlatma-metni" target="_blank" rel="noopener noreferrer">KVKK ve Aydınlatma Metni</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
