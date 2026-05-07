import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Megaphone } from 'lucide-react';
import SEO from '../components/SEO';
import './DuyurularPage.css';

const DuyurularPage = () => {
  const announcements = [
    {
      id: 1,
      title: 'Bursluluk Sınav Başvuruları Başladı',
      date: '2024',
      excerpt: 'Kokpit Okulları bursluluk sınavı başvuruları için detaylı bilgi ve başvuru süreci hakkında bizimle iletişime geçebilirsiniz.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800',
      slug: 'bursluluk-sinav-basvurulari',
      featured: true
    },
    {
      id: 2,
      title: 'Deprem Bölgesi İçin İhtiyaç Listesi',
      date: '2024',
      excerpt: 'Deprem bölgesi için ihtiyaç listesi ve yardım kampanyası detayları.',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800',
      slug: 'deprem-bolgesi-ihityac-listesi'
    }
  ];

  return (
    <div className="duyurular-page-container">
      <SEO 
        title="Duyurular"
        description="Kokpit Okulları resmi duyuruları ve ilanları."
        keywords="Kokpit Okulları duyuruları, okul duyuruları, ilanlar"
      />
      
      {/* Hero Section */}
      <section className="duyurular-hero-section">
        <div className="duyurular-hero-bg"></div>
        <div className="duyurular-hero-overlay"></div>
        <div className="container relative-z">
          <div className="duyurular-hero-content">
            <div className="duyurular-badge">
              <Megaphone size={20} />
              Önemli Duyurular
            </div>
            <h1 className="duyurular-hero-title">Duyurular</h1>
            <p className="duyurular-hero-subtitle">
              Okulumuzdaki resmi duyurular ve ilanlar
            </p>
          </div>
        </div>
      </section>

      {/* Announcements Grid */}
      <section className="duyurular-section">
        <div className="container">
          <div className="duyurular-grid">
            {announcements.map((item) => (
              <Link key={item.id} to={`/duyurular/${item.slug}`} className={`duyurular-card glass-card ${item.featured ? 'featured' : ''}`}>
                {item.featured && <div className="duyurular-featured-badge">ÖNEMLİ</div>}
                <div className="duyurular-card-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="duyurular-card-content">
                  <div className="duyurular-card-date">
                    <Calendar size={14} />
                    {item.date}
                  </div>
                  <h3 className="duyurular-card-title">{item.title}</h3>
                  <p className="duyurular-card-excerpt">{item.excerpt}</p>
                  <span className="duyurular-card-link">
                    Detaylar <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DuyurularPage;
