import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import SEO from '../components/SEO';
import { newsItems } from '../data/newsData';
import './NewsDetailPage.css';

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const newsItem = newsItems.find(item => item.id === parseInt(id));

  if (!newsItem) {
    return (
      <div className="news-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Haber bulunamadı</h2>
            <Link to="/haberler" className="back-link">
              <ArrowLeft size={16} /> Haberlere Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: newsItem.title,
          text: newsItem.excerpt,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="news-detail-page">
      <SEO 
        title={newsItem.title}
        description={newsItem.excerpt}
        keywords="Kokpit Okulları haberleri, okul duyuruları, kampüs etkinlikleri"
      />

      {/* Hero Section */}
      <section className="news-detail-hero">
        <div className="hero-image">
          <img src={newsItem.image} alt={newsItem.title} />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <Link to="/haberler" className="back-button">
            <ArrowLeft size={20} />
            Haberlere Dön
          </Link>
          <div className="news-meta">
            <span className="category-badge">{newsItem.category}</span>
            <span className="date">
              <Calendar size={16} />
              {newsItem.date}
            </span>
          </div>
          <h1 className="news-title">{newsItem.title}</h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="news-content-section">
        <div className="container">
          <div className="news-content-wrapper">
            <div className="news-body">
              <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
            </div>
            
            <div className="news-actions">
              <button onClick={handleShare} className="share-button">
                <Share2 size={18} />
                Paylaş
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related News */}
      <section className="related-news-section">
        <div className="container">
          <h2>İlgili Haberler</h2>
          <div className="related-news-grid">
            {newsItems
              .filter(item => item.id !== newsItem.id)
              .slice(0, 3)
              .map(item => (
                <Link key={item.id} to={`/haberler/${item.id}`} className="related-news-card">
                  <img src={item.image} alt={item.title} />
                  <div className="related-news-info">
                    <span className="related-date">{item.date}</span>
                    <h3>{item.title}</h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetailPage;
