import { useState } from 'react';
import { MessageSquare, Star, Send, Calendar, User, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import './ZiyaretciDefteriPage.css';

const ZiyaretciDefteriPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      date: '15 Ocak 2024',
      message: 'Kokpit Okulları\'nın eğitim kalitesi gerçekten etkileyici. Oğlum burada çok gelişti.',
      rating: 5
    },
    {
      id: 2,
      name: 'Zeynep Kara',
      date: '10 Ocak 2024',
      message: 'Havacılık bölümündeki simülasyonlar inanılmaz. Öğrenciler için büyük fırsat.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emre Demir',
      date: '5 Ocak 2024',
      message: 'Yazılım laboratuvarları çok modern. Öğrenciler gerçek projeler geliştiriyor.',
      rating: 5
    },
    {
      id: 4,
      name: 'Ayşe Kaya',
      date: '28 Aralık 2023',
      message: 'Sağlık bölümündeki uygulamalı eğitim beni çok etkiledi. Tebrikler!',
      rating: 5
    },
    {
      id: 5,
      name: 'Can Özkan',
      date: '20 Aralık 2023',
      message: 'Öğretmenler çok ilgili ve destekleyici. Çok teşekkür ederiz.',
      rating: 5
    },
    {
      id: 6,
      name: 'Elif Şahin',
      date: '15 Aralık 2023',
      message: 'Kampüs tesisleri çok güzel. Öğrenciler için harika bir ortam.',
      rating: 5
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="ziyaretci-page-container">
      <SEO 
        title="Ziyaretçi Defteri"
        description="Kokpit Okulları ziyaretçi defteri. Ziyaretçilerimizin görüşleri ve mesajları."
        keywords="Kokpit Okulları ziyaretçi defteri, görüşler, yorumlar"
      />
      
      {/* Hero Section */}
      <section className="ziyaretci-hero-section">
        <div className="ziyaretci-hero-bg"></div>
        <div className="ziyaretci-hero-overlay"></div>
        <div className="container relative-z">
          <div className="ziyaretci-hero-content">
            <div className="ziyaretci-badge">Ziyaretçi Defteri</div>
            <h1 className="ziyaretci-hero-title">Ziyaretçilerimiz Ne Söylüyor</h1>
            <p className="ziyaretci-hero-subtitle">
              Kokpit Okulları'nı ziyaret eden veli, öğrenci ve misafirlerimizin görüşleri.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="ziyaretci-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Son Mesajlar</h2>
            <p className="section-subtitle">
              Ziyaretçilerimizin Kokpit Okulları hakkındaki düşünceleri
            </p>
          </div>

          <div className="ziyaretci-testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="ziyaretci-testimonial-card glass-card">
                <div className="ziyaretci-testimonial-header">
                  <div className="ziyaretci-testimonial-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ziyaretci-testimonial-info">
                    <h4 className="ziyaretci-testimonial-name">{testimonial.name}</h4>
                    <div className="ziyaretci-testimonial-date">
                      <Calendar size={12} />
                      {testimonial.date}
                    </div>
                  </div>
                  <div className="ziyaretci-testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="ziyaretci-testimonial-message">{testimonial.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="ziyaretci-section bg-darker">
        <div className="container">
          <div className="ziyaretci-form-container glass-panel">
            <div className="ziyaretci-form-header">
              <div className="ziyaretci-form-icon">
                <MessageSquare size={40} />
              </div>
              <div>
                <h2>Mesajınızı Bırakın</h2>
                <p>Ziyaretçi defterimize mesajınızı ekleyin</p>
              </div>
            </div>

            {submitted ? (
              <div className="ziyaretci-success-message">
                <CheckCircle2 size={48} />
                <h3>Mesajınız Alındı</h3>
                <p>Teşekkür ederiz. Mesajınız incelendikten sonra yayınlanacaktır.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="ziyaretci-form">
                <div className="ziyaretci-form-row">
                  <div className="ziyaretci-form-group">
                    <label>
                      <User size={16} />
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Adınız ve soyadınız"
                      className="glass-input"
                    />
                  </div>
                  <div className="ziyaretci-form-group">
                    <label>
                      <MessageSquare size={16} />
                      E-posta
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="E-posta adresiniz"
                      className="glass-input"
                    />
                  </div>
                </div>

                <div className="ziyaretci-form-group">
                  <label>
                    <MessageSquare size={16} />
                    Mesajınız
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Kokpit Okulları hakkındaki görüşleriniz..."
                    rows={5}
                    className="glass-textarea"
                  ></textarea>
                </div>

                <button type="submit" className="ziyaretci-submit-btn">
                  <Send size={18} />
                  Mesaj Gönder
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="ziyaretci-section">
        <div className="container">
          <div className="ziyaretci-info-card glass-panel">
            <h3>Ziyaretçi Defteri Kuralları</h3>
            <ul className="ziyaretci-rules-list">
              <li>
                <CheckCircle2 size={16} />
                <span>Mesajlarınız kibar ve yapıcı olmalıdır.</span>
              </li>
              <li>
                <CheckCircle2 size={16} />
                <span>Küfür, hakaret ve spam mesajlar yayınlanmaz.</span>
              </li>
              <li>
                <CheckCircle2 size={16} />
                <span>Mesajlarınız onaylandıktan sonra yayınlanır.</span>
              </li>
              <li>
                <CheckCircle2 size={16} />
                <span>Kişisel bilgileriniz gizli tutulur.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZiyaretciDefteriPage;
