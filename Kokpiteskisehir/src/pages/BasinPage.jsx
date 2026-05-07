import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import SEO from '../components/SEO';
import './BasinPage.css';

const BasinPage = () => {
  const pressItems = [
    {
      id: 1,
      title: 'Kokpit Okulları Haber Ötesi',
      date: '16.03.2018',
      excerpt: 'Haber Ötesi kanalında Kokpit Okulları tanıtımı.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800',
      slug: 'haber-otesi-tanitim'
    },
    {
      id: 2,
      title: 'Milliyet Gazetesi',
      date: '15.03.2018',
      excerpt: 'Milliyet Gazetesi\'nde Kokpit Okulları haberi.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800',
      slug: 'milliyet-gazetesi-haberi'
    },
    {
      id: 3,
      title: 'Anadolu Gazetesi ile Haber Ötesi',
      date: '16.02.2018',
      excerpt: 'Anadolu Gazetesi ve Haber Ötesi işbirliği.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800',
      slug: 'anadolu-gazetesi-haber-otesi'
    },
    {
      id: 4,
      title: 'Sakarya Gazetesi',
      date: '28.07.2016',
      excerpt: 'Sakarya Gazetesi\'nde Kokpit Okulları haberi.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800',
      slug: 'sakarya-gazetesi-haberi'
    }
  ];

  return (
    <div className="basin-page-container">
      <SEO 
        title="Basın"
        description="Kokpit Okulları basın haberleri ve medya görünürlüğü."
        keywords="Kokpit Okulları basın, medya haberleri, gazete haberleri"
      />
      
      {/* Hero Section */}
      <section className="basin-hero-section">
        <div className="basin-hero-bg"></div>
        <div className="basin-hero-overlay"></div>
        <div className="container relative-z">
          <div className="basin-hero-content">
            <div className="basin-badge">
              <Newspaper size={20} />
              Medya
            </div>
            <h1 className="basin-hero-title">Basın</h1>
            <p className="basin-hero-subtitle">
              Kokpit Okulları hakkında medya haberleri ve yayınlar
            </p>
          </div>
        </div>
      </section>

      {/* Press Grid */}
      <section className="basin-section">
        <div className="container">
          <div className="basin-grid">
            {pressItems.map((item) => (
              <Link key={item.id} to={`/basin/${item.slug}`} className="basin-card glass-card">
                <div className="basin-card-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="basin-card-content">
                  <div className="basin-card-date">
                    <Calendar size={14} />
                    {item.date}
                  </div>
                  <h3 className="basin-card-title">{item.title}</h3>
                  <p className="basin-card-excerpt">{item.excerpt}</p>
                  <span className="basin-card-link">
                    Haberi Oku <ArrowRight size={16} />
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

export default BasinPage;
