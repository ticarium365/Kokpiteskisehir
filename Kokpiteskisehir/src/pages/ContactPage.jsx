import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, MessageCircle, Calendar, CheckCircle2, ArrowRight, Clock, GraduationCap, Navigation } from 'lucide-react';
import SEO from '../components/SEO';
import './ContactPage.css';

const ContactPage = () => {
  const [formState, setFormState] = useState('idle'); // idle, submitting, success, error
  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!FORMSPREE_ENDPOINT) {
      const formData = new FormData(e.target);
      const phone = formData.get('phone') || '';
      const name = formData.get('fullName') || '';
      const interest = formData.get('interest') || '';
      const message = formData.get('message') || '';
      const waText = encodeURIComponent(
        `Merhaba, bilgi almak istiyorum.\nAd Soyad: ${name}\nTelefon: ${phone}\nİlgilendiğim Alan: ${interest}\n${message}`
      );
      window.open(`https://wa.me/905305801525?text=${waText}`, '_blank');
      setFormState('success');
      e.target.reset();
      return;
    }

    setFormState('submitting');
    const formData = new FormData(e.target);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setFormState('success');
        e.target.reset();
      } else {
        setFormState('error');
      }
    } catch (error) {
      setFormState('error');
    }
  };
  return (
    <div className="contact-page-container">
      <SEO 
        title="İletişim"
        description="Kokpit Okulları ile iletişime geçin. Eskişehir Yesevi Kampüsü adres, telefon ve iletişim bilgileri. Tanıtım randevusu alın."
        keywords="Kokpit Okulları iletişim, okul adresi, telefon numarası, Eskişehir okul iletişim, kampüs adresi"
      />
      
      {/* 1. Hero Section */}
      <section className="contact-hero-section">
        <div className="contact-hero-bg"></div>
        <div className="contact-hero-overlay"></div>
        <div className="container relative-z">
          <div className="contact-hero-content">
            <div className="contact-badge">İletişim</div>
            <h1 className="contact-hero-title">Geleceğin İçin İlk Adımı Birlikte Atalım</h1>
            <p className="contact-hero-subtitle">
              Kokpit Okulları hakkında bilgi almak, tanıtım randevusu oluşturmak veya bursluluk başvurusu yapmak için bizimle iletişime geçin.
            </p>
            <div className="contact-hero-actions">
              <a href="https://wa.me/905305801525" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle size={18} style={{ marginRight: '8px' }} /> WhatsApp ile İletişim
              </a>
              <a href="#contact-form" className="btn-primary-glow">
                <Calendar size={18} style={{ marginRight: '8px' }} /> Tanıtım Randevusu Al
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Contact Information Cards */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="contact-info-card glass-card">
              <div className="contact-icon"><MapPin size={28} /></div>
              <h3>Adres</h3>
              <p>Şeker Mh. Gazi Yakup Satar Cd. No:90,<br/>26120 Tepebaşı / Eskişehir</p>
            </div>

            <div className="contact-info-card glass-card">
              <div className="contact-icon"><Phone size={28} /></div>
              <h3>Telefon</h3>
              <p>
                <a href="tel:+902222600000" className="contact-link">(0222) 260 00 00</a>
              </p>
            </div>

            <div className="contact-info-card glass-card whatsapp-card">
              <div className="contact-icon whatsapp-icon"><MessageCircle size={28} /></div>
              <h3>WhatsApp</h3>
              <p>
                <a href="tel:+905305801525" className="contact-link">0530 580 15 25</a>
                <br/>
                <a href="https://wa.me/905305801525" target="_blank" rel="noopener noreferrer" className="contact-link" style={{ fontSize: '0.9rem' }}>WhatsApp'ta Yaz</a>
              </p>
            </div>

            <div className="contact-info-card glass-card">
              <div className="contact-icon"><Clock size={28} /></div>
              <h3>Çalışma Saatleri</h3>
              <p>Pazartesi - Cuma: 08:30 - 17:30<br/>Cumartesi - Pazar: Kapalı</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Premium Contact Form */}
      <section className="contact-section bg-darker" id="contact-form">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Bilgi Talebi Oluşturun</h2>
            <p className="section-subtitle">
              Size en uygun eğitim alanı ve başvuru süreci hakkında bilgi almak için formu doldurun.
            </p>
          </div>

          <div className="contact-form-wrapper">
            <div className="contact-form-card glass-panel">
              {formState === 'success' ? (
                <div className="form-success-message">
                  <CheckCircle2 size={48} />
                  <h3>Bilgi Talebiniz Alındı</h3>
                  <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
                  <button onClick={() => setFormState('idle')} className="btn-secondary">
                    Yeni Talep Oluştur
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fullName">Ad Soyad *</label>
                      <input type="text" id="fullName" name="fullName" required placeholder="Adınız ve soyadınız" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Telefon Numarası *</label>
                      <input type="tel" id="phone" name="phone" required placeholder="05XX XXX XX XX" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">E-posta *</label>
                      <input type="email" id="email" name="email" required placeholder="ornek@email.com" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="interest">İlgilendiğiniz Alan *</label>
                      <select id="interest" name="interest" required>
                        <option value="">Seçiniz</option>
                        <option value="aviation">Havacılık Lisesi</option>
                        <option value="software">Matrix Yazılım Koleji</option>
                        <option value="health">Sağlık Meslek Lisesi</option>
                        <option value="general">Genel Bilgi</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Mesajınız</label>
                    <textarea id="message" name="message" rows="5" placeholder="Sorularınız veya talepleriniz hakkında bilgi verin..."></textarea>
                  </div>

                  <div className="form-checkbox">
                    <input type="checkbox" id="kvkk" name="kvkk" required />
                    <label htmlFor="kvkk">
                      KVKK Aydınlatma Metnini okudum ve kişisel verilerimin işlenmesini kabul ediyorum. *
                    </label>
                  </div>

                  {formState === 'error' && (
                    <div className="form-error-message">
                      Gönderim sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin veya WhatsApp üzerinden iletişime geçin.
                    </div>
                  )}

                  <div className="form-actions">
                    <button type="submit" className="btn-submit" disabled={formState === 'submitting'}>
                      {formState === 'submitting' ? 'Gönderiliyor...' : (
                        <>
                          <Send size={18} style={{ marginRight: '8px' }} /> Bilgi Talebi Gönder
                        </>
                      )}
                    </button>
                    <a href="#" className="btn-scholarship">
                      <GraduationCap size={18} style={{ marginRight: '8px' }} /> Bursluluk Başvurusu
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick Action Section */}
      <section className="contact-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Hızlı İletişim</h2>
            <p className="section-subtitle">
              Size en hızlı şekilde ulaşmak için tercih ettiğiniz yöntemi seçin.
            </p>
          </div>

          <div className="quick-actions-grid">
            <a href="https://wa.me/905305801525" target="_blank" rel="noopener noreferrer" className="quick-action-btn glass-card whatsapp-action">
              <MessageCircle size={32} />
              <span>WhatsApp ile Yaz</span>
            </a>
            <a href="tel:+902222600000" className="quick-action-btn glass-card phone-action">
              <Phone size={32} />
              <span>Telefonla Ara</span>
            </a>
            <a href="https://maps.google.com/?q=Şeker+Mh.+Gazi+Yakup+Satar+Cd.+No:90+26120+Tepebaşı+Eskişehir" target="_blank" rel="noopener noreferrer" className="quick-action-btn glass-card map-action">
              <Navigation size={32} />
              <span>Yol Tarifi Al</span>
            </a>
            <a href="#" className="quick-action-btn glass-card scholarship-action">
              <GraduationCap size={32} />
              <span>Bursluluk Başvurusu</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. Map Section */}
      <section className="contact-section bg-darker">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Kampüs Konumu</h2>
            <p className="section-subtitle">
              Şeker Mh. Gazi Yakup Satar Cd. No:90, 26120 Tepebaşı / Eskişehir
            </p>
          </div>

          <div className="map-container glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3073.4!2d30.5261!3d39.7765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cc0e6e0e5e9999%3A0x1!2zU8OcS0VSIE1ILiBHQVpJIFlBS1VQIFNBVEFSIENELiBOTzo5MCBURVBFQsWeSSBFU0tJxZ5FSElSIFRVUktFWQ!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', minHeight: '450px', filter: 'invert(92%) hue-rotate(180deg) brightness(0.85) contrast(0.9)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kokpit Okulları Kampüs Konumu"
            ></iframe>
            <div className="map-address-bar">
              <MapPin size={16} />
              <span>Şeker Mh. Gazi Yakup Satar Cd. No:90, 26120 Tepebaşı / Eskişehir</span>
              <a href="https://maps.google.com/?q=Şeker+Mh.+Gazi+Yakup+Satar+Cd.+No:90+26120+Tepebaşı+Eskişehir" target="_blank" rel="noopener noreferrer" className="map-link-inline">
                <Navigation size={14} /> Yol Tarifi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="contact-final-cta">
        <div className="cta-overlay"></div>
        <div className="container relative-z text-center">
          <h2>Kampüsü Yakından Tanımak İçin Bize Ulaşın</h2>
          <p>Size en uygun eğitim alanı ve başvuru süreci hakkında bilgi almak için formu doldurun veya WhatsApp üzerinden hemen iletişime geçin.</p>
          <div className="contact-hero-actions justify-center">
            <a href="#contact-form" className="btn-primary-glow">
              <Send size={18} style={{ marginRight: '8px' }} /> İletişime Geç
            </a>
            <a href="https://wa.me/905305801525" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageCircle size={18} style={{ marginRight: '8px' }} /> WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
