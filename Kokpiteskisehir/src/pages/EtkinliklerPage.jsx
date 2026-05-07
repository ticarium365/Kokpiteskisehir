import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, PartyPopper } from 'lucide-react';
import SEO from '../components/SEO';
import './EtkinliklerPage.css';

const EtkinliklerPage = () => {
  const events = [
    {
      id: 1,
      title: '1-7 Nisan Ulusal Kanser Haftası Etkinliği',
      date: '2024',
      excerpt: 'Ulusal Kanser Haftası kapsamında düzenlenen farkındalık etkinlikleri.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800',
      slug: 'ulusal-kanser-haftasi-etkinligi'
    },
    {
      id: 2,
      title: '7 Nisan Dünya Sağlık Günü',
      date: '2024',
      excerpt: 'Dünya Sağlık Günü kapsamında sağlık eğitimi ve farkındalık etkinlikleri.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800',
      slug: 'dunya-saglik-gunu'
    },
    {
      id: 3,
      title: 'Dünya Masa Tenisi Günü',
      date: '2024',
      excerpt: 'Okul spor etkinlikleri kapsamında masa tenisi turnuvası.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800',
      slug: 'dunya-masa-tenisi-gunu'
    },
    {
      id: 4,
      title: 'Kitap Söyleşisi',
      date: '2024',
      excerpt: 'Kütüphanede düzenlenen yazar söyleşisi ve imza günü.',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800',
      slug: 'kitap-soylesisi'
    }
  ];

  return (
    <div className="etkinlikler-page-container">
      <SEO 
        title="Etkinlikler"
        description="Kokpit Okulları etkinlikleri ve kampüs aktiviteleri."
        keywords="Kokpit Okulları etkinlikleri, okul etkinlikleri, kampüs aktiviteleri"
      />
      
      {/* Hero Section */}
      <section className="etkinlikler-hero-section">
        <div className="etkinlikler-hero-bg"></div>
        <div className="etkinlikler-hero-overlay"></div>
        <div className="container relative-z">
          <div className="etkinlikler-hero-content">
            <div className="etkinlikler-badge">
              <PartyPopper size={20} />
              Etkinlik Takvimi
            </div>
            <h1 className="etkinlikler-hero-title">Etkinlikler</h1>
            <p className="etkinlikler-hero-subtitle">
              Okulumuzdaki etkinlikler, turnuvalar ve sosyal aktiviteler
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="etkinlikler-section">
        <div className="container">
          <div className="etkinlikler-grid">
            {events.map((item) => (
              <Link key={item.id} to={`/etkinlikler/${item.slug}`} className="etkinlikler-card glass-card">
                <div className="etkinlikler-card-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="etkinlikler-card-content">
                  <div className="etkinlikler-card-date">
                    <Calendar size={14} />
                    {item.date}
                  </div>
                  <h3 className="etkinlikler-card-title">{item.title}</h3>
                  <p className="etkinlikler-card-excerpt">{item.excerpt}</p>
                  <span className="etkinlikler-card-link">
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

export default EtkinliklerPage;
