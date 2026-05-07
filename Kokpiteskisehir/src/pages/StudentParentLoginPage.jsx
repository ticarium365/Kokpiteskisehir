import { Link } from 'react-router-dom';
import { GraduationCap, Users, Phone, Info } from 'lucide-react';
import SEO from '../components/SEO';
import './LoginPages.css';

const StudentParentLoginPage = () => {
  return (
    <div className="login-page-container">
      <SEO
        title="Öğrenci ve Veli Girişi"
        description="Kokpit Okulları öğrenci ve veli portalı giriş ekranı. Öğrenci ve veli girişi yapın."
        keywords="öğrenci girişi, veli girişi, öğrenci portalı, veli portalı, okul giriş sistemi"
      />

      <section className="login-section">
        <div className="login-panel glass-card">
          <div className="login-header">
            <h2 className="login-logo">KOKPİT OKULLARI</h2>
            <p className="login-type">Öğrenci & Veli Girişi</p>
          </div>

          <div className="login-coming-soon">
            <div className="login-coming-icon">
              <Info size={40} />
            </div>
            <h3>Portal Hazırlanıyor</h3>
            <p>Öğrenci ve veli portalı yakında aktif olacaktır. Giriş bilgileriniz için okul yönetimiyle iletişime geçiniz.</p>

            <div className="login-contact-options">
              <a href="tel:+902222600000" className="login-contact-btn">
                <Phone size={18} />
                (0222) 260 00 00
              </a>
              <a href="https://wa.me/905305801525" target="_blank" rel="noopener noreferrer" className="login-contact-btn whatsapp">
                <GraduationCap size={18} />
                WhatsApp ile Ulaş
              </a>
            </div>
          </div>

          <div className="login-back-link">
            <Link to="/">← Ana Sayfaya Dön</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentParentLoginPage;
