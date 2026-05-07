import { Link } from 'react-router-dom';
import { Phone, Info } from 'lucide-react';
import SEO from '../components/SEO';
import './LoginPages.css';

const TeacherLoginPage = () => {
  return (
    <div className="login-page-container">
      <SEO
        title="Öğretmen Girişi"
        description="Kokpit Okulları öğretmen portalı giriş ekranı. Öğretmen girişi yapın."
        keywords="öğretmen girişi, öğretmen portalı, okul yönetim sistemi, öğretmen giriş sistemi"
      />

      <section className="login-section">
        <div className="login-panel glass-card">
          <div className="login-header">
            <h2 className="login-logo">KOKPİT OKULLARI</h2>
            <p className="login-type">Öğretmen Girişi</p>
          </div>

          <div className="login-coming-soon">
            <div className="login-coming-icon">
              <Info size={40} />
            </div>
            <h3>Portal Hazırlanıyor</h3>
            <p>Öğretmen portalı yakında aktif olacaktır. Giriş bilgileriniz için okul yönetimiyle iletişime geçiniz.</p>

            <div className="login-contact-options">
              <a href="tel:+902222600000" className="login-contact-btn">
                <Phone size={18} />
                (0222) 260 00 00
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

export default TeacherLoginPage;
