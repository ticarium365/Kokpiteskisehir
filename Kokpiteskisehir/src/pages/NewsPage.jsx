import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, MapPin, Send, Search, X } from 'lucide-react';
import SEO from '../components/SEO';
import { newsItems } from '../data/newsData';
import './NewsPage.css';

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // News data - replace with CMS data later
  const newsItems = [
    {
      id: 1,
      title: 'Bursluluk Sınav Başvuruları Başladı',
      category: 'scholarship',
      date: '2024',
      excerpt: 'Kokpit Okulları bursluluk sınavı başvuruları için detaylı bilgi ve başvuru süreci hakkında bizimle iletişime geçebilirsiniz.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800',
      slug: 'bursluluk-sinav-basvurulari',
      featured: true
    },
    {
      id: 2,
      title: 'Deprem Bölgesi İçin İhtiyaç Listesi',
      category: 'announcement',
      date: '2024',
      excerpt: 'Deprem bölgesi için ihtiyaç listesi ve yardım kampanyası detayları.',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800',
      slug: 'deprem-bolgesi-ihityac-listesi'
    },
    {
      id: 3,
      title: '1-7 Nisan Ulusal Kanser Haftası Etkinliği',
      category: 'events',
      date: '2024',
      excerpt: 'Ulusal Kanser Haftası kapsamında düzenlenen farkındalık etkinlikleri.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800',
      slug: 'ulusal-kanser-haftasi-etkinligi'
    },
    {
      id: 4,
      title: '7 Nisan Dünya Sağlık Günü',
      category: 'events',
      date: '2024',
      excerpt: 'Dünya Sağlık Günü kapsamında sağlık eğitimi ve farkındalık etkinlikleri.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800',
      slug: 'dunya-saglik-gunu'
    },
    {
      id: 5,
      title: 'Dünya Masa Tenisi Günü',
      category: 'events',
      date: '2024',
      excerpt: 'Okul spor etkinlikleri kapsamında masa tenisi turnuvası.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800',
      slug: 'dunya-masa-tenisi-gunu'
    },
    {
      id: 6,
      title: 'Kitap Söyleşisi',
      category: 'campus',
      date: '2024',
      excerpt: 'Kütüphanede düzenlenen yazar söyleşisi ve imza günü.',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800',
      slug: 'kitap-soylesisi'
    },
    {
      id: 7,
      title: 'Kokpit Okulları Haber Ötesi',
      category: 'press',
      date: '16.03.2018',
      excerpt: 'Haber Ötesi kanalında Kokpit Okulları tanıtımı.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800',
      slug: 'haber-otesi-tanitim'
    },
    {
      id: 8,
      title: 'Milliyet Gazetesi',
      category: 'press',
      date: '15.03.2018',
      excerpt: 'Milliyet Gazetesi\'nde Kokpit Okulları haberi.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800',
      slug: 'milliyet-gazetesi-haberi'
    },
    {
      id: 9,
      title: 'Anadolu Gazetesi ile Haber Ötesi',
      category: 'press',
      date: '16.02.2018',
      excerpt: 'Anadolu Gazetesi ve Haber Ötesi işbirliği.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800',
      slug: 'anadolu-gazetesi-haber-otesi'
    },
    {
      id: 10,
      title: 'Sakarya Gazetesi',
      category: 'press',
      date: '28.07.2016',
      excerpt: 'Sakarya Gazetesi\'nde Kokpit Okulları haberi.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800',
      slug: 'sakarya-gazetesi-haberi'
    },
    {
      id: 11,
      title: 'Bölge Vizyon',
      category: 'press',
      date: 'Temmuz 2015',
      excerpt: 'Bölge Vizyon dergisinde Kokpit Okulları röportajı.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800',
      slug: 'bolge-vizyon-roportaji'
    },
  ];

  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'announcement', label: 'Duyurular' },
    { id: 'press', label: 'Basın' },
    { id: 'events', label: 'Etkinlikler' },
    { id: 'campus', label: 'Kampüs' },
    { id: 'scholarship', label: 'Bursluluk' },
  ];

  const featuredItem = newsItems.find(item => item.featured);

  const filteredNews = useMemo(() => {
    return selectedCategory === 'all' 
      ? newsItems.filter(item => !item.featured)
      : newsItems.filter(item => item.category === selectedCategory && !item.featured);
  }, [selectedCategory]);

  const getCategoryLabel = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.label : categoryId;
  };

  const formatTurkishDate = (dateString) => {
    // Handle various date formats and convert to Turkish
    if (dateString.includes('.')) {
      // Format like '16.03.2018'
      const parts = dateString.split('.');
      if (parts.length === 3) {
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const year = parts[2];
        const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
        return `${day} ${months[month - 1]} ${year}`;
      }
    } else if (dateString.includes(' ')) {
      // Format like 'Temmuz 2015'
      return dateString;
    } else if (/^\d{4}$/.test(dateString)) {
      // Format like '2024'
      return dateString;
    }
    return dateString;
  };

  const getCategoryClass = (categoryId) => {
    switch (categoryId) {
      case 'scholarship':
        return 'category-scholarship';
      case 'press':
        return 'category-press';
      case 'events':
        return 'category-events';
      case 'campus':
        return 'category-campus';
      case 'announcement':
        return 'category-announcement';
      default:
        return 'category-default';
    }
  };

  const handleReadMore = (item) => {
    navigate(`/haberler/${item.id}`);
  };

  return (
    <div className="news-page-container">
      <SEO 
        title="Haberler ve Duyurular"
        description="Kokpit Okulları'ndan son haberler, duyurular ve kampüs etkinlikleri. Okulumuzdaki gelişmeleri takip edin."
        keywords="Kokpit Okulları haberleri, okul duyuruları, kampüs etkinlikleri, eğitim haberleri, Eskişehir okul haberleri"
      />
      
      {/* Hero Section */}
      <section className="news-hero-section">
        <div className="news-hero-bg"></div>
        <div className="news-hero-overlay"></div>
        <div className="container relative-z">
          <div className="news-hero-content">
            <div className="news-badge">Haberler ve Duyurular</div>
            <h1 className="news-hero-title">Kokpit Okulları'ndan Güncel Gelişmeler</h1>
            <p className="news-hero-subtitle">
              Duyurular, etkinlikler, basın haberleri ve kampüs yaşamından güncel içerikler.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Announcement */}
      {featuredItem && (
        <section className="news-section">
          <div className="container">
            <div className="featured-news glass-card">
              <div className="featured-image">
                <img 
                  src={featuredItem.image} 
                  alt={featuredItem.title} 
                  onError={(e) => { e.target.style.display='none'; e.target.parentElement.style.background='rgba(255, 255, 255, 0.05)'; }}
                />
                <div className={`category-badge ${getCategoryClass(featuredItem.category)}`}>
                  <Calendar size={16} />
                  <span>{getCategoryLabel(featuredItem.category)}</span>
                </div>
              </div>
              <div className="featured-content">
                <div className="featured-date">{featuredItem.date}</div>
                <h2>{featuredItem.title}</h2>
                <p>{featuredItem.excerpt}</p>
                <Link to="/iletisim" className="btn-featured">
                  Başvuru Bilgisi Al <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="news-section bg-darker">
        <div className="container">
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="news-section">
        <div className="container">
          <div className="news-grid">
            {filteredNews.map(item => (
              <div key={item.id} className="news-card glass-card">
                <div className="news-image">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy" 
                    onError={(e) => { e.target.style.display='none'; e.target.parentElement.style.background='rgba(255, 255, 255, 0.05)'; }}
                  />
                  <div className={`category-badge ${getCategoryClass(item.category)}`}>
                    <span>{getCategoryLabel(item.category)}</span>
                  </div>
                </div>
                <div className="news-content">
                  <div className="news-date">
                    <Calendar size={14} />
                    {formatTurkishDate(item.date)}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <Link 
                    to={`/haberler/${item.id}`}
                    className="read-more-btn"
                    aria-label={`${item.title} haberinin devamını oku`}
                  >
                    Devamını Oku <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {filteredNews.length === 0 && (
            <div className="no-results glass-card">
              <Search size={48} />
              <p>Bu kategoride haber bulunamadı.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default NewsPage;
