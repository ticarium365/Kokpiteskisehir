import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Lock, Phone, User } from 'lucide-react';
import SEO from '../components/SEO';
import './LoginPages.css';

const TeacherLoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showForgotMessage, setShowForgotMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    // TODO: Replace with real authentication API call
    setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 1500);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotMessage(!showForgotMessage);
  };

  return (
    <div className="login-page-container">
      <SEO 
        title="Öğretmen Girişi"
        description="Kokpit Okulları öğretmen portalı giriş ekranı. Öğretmen girişi yapın."
        keywords="öğretmen girişi, öğretmen portalı, okul yönetim sistemi, öğretmen giriş sistemi"
      />
      
      {/* Login Section */}
      <section className="login-section">
        <div className="login-panel glass-card">
          {/* Logo/Title */}
          <div className="login-header">
            <h2 className="login-logo">KOKPİT OKULLARI</h2>
            <p className="login-type">Öğretmen Girişi</p>
          </div>

          {/* Login Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="teacher-phone">
                <Phone size={18} />
                Telefon Numarası
              </label>
              <input 
                type="tel" 
                id="teacher-phone"
                name="teacher-phone"
                placeholder="Telefon numaranızı girin"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="teacher-password">
                <Lock size={18} />
                Şifre
              </label>
              <input 
                type="password" 
                id="teacher-password"
                name="teacher-password"
                placeholder="Şifrenizi girin"
                required
              />
            </div>

            <div className="forgot-password">
              <a href="#" onClick={handleForgotPassword}>Şifremi Unuttum</a>
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Giriş yapılıyor...' : 'Öğretmen Girişi'}
            </button>
          </form>

          {error && (
            <div className="login-error-message">
              Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.
            </div>
          )}

          {showForgotMessage && (
            <div className="login-info-message">
              Şifre sıfırlama için okul ile iletişime geçin: (0222) 260 00 00
            </div>
          )}

          {/* Helper Text */}
          <div className="login-helper-text">
            <p>Bu alan ilerleyen aşamada öğretmen paneliyle entegre edilecektir.</p>
            <p className="status-badge">Portal entegrasyonu hazırlık aşamasındadır.</p>
          </div>

          {/* Back Link */}
          <div className="login-back-link">
            <Link to="/">← Ana Sayfaya Dön</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherLoginPage;
