import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Bell, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import './HaberlerPage.css';

const HaberlerPage = () => {
  const newsItems = [
    {
      id: 1,
      title: 'Kokpit Okulları Yeni Eğitim Yılı Başlıyor',
      date: '2024',
      excerpt: '2024-2025 eğitim yılında yeni programlarımız ve yeniliklerimiz.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800',
      slug: 'yeni-egitim-yili'
    }
  ];

  return (
    <div className="haberler-page-container">
      <SEO 
        title="Haberler"
        description="Kokpit Okulları haberleri ve güncellemeleri."
        keywords="Kokpit Okulları haberleri, okul haberleri, güncellemeler"
      />
      
      {/* Hero Section */}
      <section className="haberler-hero-section">
        <div className="haberler-hero-bg"></div>
        <div className="haberler-hero-overlay"></div>
        <div className="container relative-z">
          <div className="haberler-hero-content">
            <h1 className="haberler-hero-title">Haberler</h1>
            <p className="haberler-hero-subtitle">
              Okulumuzdaki son gelişmeler ve güncel haberler
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="haberler-section">
        <div className="container">
          <div className="haberler-grid">
            {newsItems.map((item) => (
              <Link key={item.id} to={`/haberler/${item.slug}`} className="haberler-card glass-card">
                <div className="haberler-card-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="haberler-card-content">
                  <div className="haberler-card-date">
                    <Calendar size={14} />
                    {item.date}
                  </div>
                  <h3 className="haberler-card-title">{item.title}</h3>
                  <p className="haberler-card-excerpt">{item.excerpt}</p>
                  <span className="haberler-card-link">
                    Devamını Oku <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming Soon Banner */}
          <div className="content-coming-soon glass-card">
            <div className="coming-soon-icon"><Bell size={36} /></div>
            <div className="coming-soon-text">
              <h3>Daha Fazla Haber Yolda</h3>
              <p>Etkinlikler, başarılar ve okul haberleri buraya eklenecek. Gelişmelerden haberdar olmak için bizi takip edin.</p>
            </div>
            <a href="https://wa.me/905305801525" target="_blank" rel="noopener noreferrer" className="coming-soon-btn">
              <MessageCircle size={16} />
              WhatsApp ile Takip Et
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HaberlerPage;
