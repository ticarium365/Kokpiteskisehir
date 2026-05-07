import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Lock, Phone, User } from 'lucide-react';
import SEO from '../components/SEO';
import './LoginPages.css';

const StudentParentLoginPage = () => {
  const [activeTab, setActiveTab] = useState('student');
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
        title="Öğrenci ve Veli Girişi"
        description="Kokpit Okulları öğrenci ve veli portalı giriş ekranı. Öğrenci ve veli girişi yapın."
        keywords="öğrenci girişi, veli girişi, öğrenci portalı, veli portalı, okul giriş sistemi"
      />
      
      {/* Login Section */}
      <section className="login-section">
        <div className="login-panel glass-card">
          {/* Logo/Title */}
          <div className="login-header">
            <h2 className="login-logo">KOKPİT OKULLARI</h2>
            <p className="login-type">Öğrenci & Veli Girişi</p>
          </div>

          {/* Tabs */}
          <div className="login-tabs">
            <button 
              className={`login-tab ${activeTab === 'student' ? 'active' : ''}`}
              onClick={() => setActiveTab('student')}
            >
              <GraduationCap size={18} />
              Öğrenci Girişi
            </button>
            <button 
              className={`login-tab ${activeTab === 'parent' ? 'active' : ''}`}
              onClick={() => setActiveTab('parent')}
            >
              <Users size={18} />
              Veli Girişi
            </button>
          </div>

          {/* Student Login Form */}
          {activeTab === 'student' && (
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="student-number">
                  <User size={18} />
                  Öğrenci Numarası
                </label>
                <input 
                  type="text" 
                  id="student-number"
                  name="student-number"
                  placeholder="Öğrenci numaranızı girin"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="student-password">
                  <Lock size={18} />
                  Şifre
                </label>
                <input 
                  type="password" 
                  id="student-password"
                  name="student-password"
                  placeholder="Şifrenizi girin"
                  required
                />
              </div>

              <div className="forgot-password">
                <a href="#" onClick={handleForgotPassword}>Şifremi Unuttum</a>
              </div>

              <button type="submit" className="btn-login" disabled={loading}>
                {loading ? 'Giriş yapılıyor...' : 'Öğrenci Girişi'}
              </button>
            </form>
          )}

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

          {/* Parent Login Form */}
          {activeTab === 'parent' && (
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="parent-phone">
                  <Phone size={18} />
                  Telefon Numarası
                </label>
                <input 
                  type="tel" 
                  id="parent-phone"
                  name="parent-phone"
                  placeholder="Telefon numaranızı girin"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="parent-password">
                  <Lock size={18} />
                  Şifre
                </label>
                <input 
                  type="password" 
                  id="parent-password"
                  name="parent-password"
                  placeholder="Şifrenizi girin"
                  required
                />
              </div>

              <div className="forgot-password">
                <a href="#" onClick={handleForgotPassword}>Şifremi Unuttum</a>
              </div>

              <button type="submit" className="btn-login" disabled={loading}>
                {loading ? 'Giriş yapılıyor...' : 'Veli Girişi'}
              </button>
            </form>
          )}

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
            <p>Bu alan ilerleyen aşamada okul yönetim sistemiyle entegre edilecektir.</p>
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

export default StudentParentLoginPage;
