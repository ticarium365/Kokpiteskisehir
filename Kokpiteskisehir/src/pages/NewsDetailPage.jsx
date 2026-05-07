import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import './NewsDetailPage.css';

function formatTarih(tarihStr) {
  if (!tarihStr) return '';
  try {
    return new Date(tarihStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return tarihStr;
  }
}

const NewsDetailPage = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      fetch(`/api/haberler/${id}`, { credentials: 'same-origin' }).then(r => {
        if (!r.ok) throw new Error('Haber bulunamadı');
        return r.json();
      }),
      fetch('/api/haberler?yayinda=true', { credentials: 'same-origin' }).then(r => r.json()).catch(() => [])
    ])
      .then(([item, all]) => {
        if (!cancelled) {
          setNewsItem(item);
          setOthers((all || []).filter(n => String(n.id) !== String(id)).slice(0, 3));
        }
      })
      .catch(err => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [id]);

  const handleShare = async () => {
    if (navigator.share && newsItem) {
      try {
        await navigator.share({
          title: newsItem.baslik,
          text: newsItem.ozet || '',
          url: window.location.href
        });
      } catch (err) {}
    }
  };

  if (loading) {
    return (
      <div className="news-detail-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Loader2 size={40} style={{ animation: 'spin 1s linear infinite', opacity: 0.5 }} />
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="news-detail-page">
        <div className="container">
          <div className="not-found" style={{ padding: '80px 0', textAlign: 'center' }}>
            <h2>Haber bulunamadı</h2>
            <Link to="/haberler" className="back-link">
              <ArrowLeft size={16} /> Haberlere Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-detail-page">
      <SEO 
        title={newsItem.baslik}
        description={newsItem.ozet || ''}
        keywords="Kokpit Okulları haberleri, okul duyuruları, kampüs etkinlikleri"
      />

      {/* Hero Section */}
      <section className="news-detail-hero">
        {newsItem.resimUrl && (
          <div className="hero-image">
            <img src={newsItem.resimUrl} alt={newsItem.baslik} />
            <div className="hero-overlay"></div>
          </div>
        )}
        <div className="container">
          <Link to="/haberler" className="back-button">
            <ArrowLeft size={20} />
            Haberlere Dön
          </Link>
          <div className="news-meta">
            {newsItem.kategori && <span className="category-badge">{newsItem.kategori}</span>}
            <span className="date">
              <Calendar size={16} />
              {formatTarih(newsItem.yayinTarihi)}
            </span>
          </div>
          <h1 className="news-title">{newsItem.baslik}</h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="news-content-section">
        <div className="container">
          <div className="news-content-wrapper">
            <div className="news-body">
              {newsItem.icerik ? (
                <div dangerouslySetInnerHTML={{ __html: newsItem.icerik }} />
              ) : (
                newsItem.ozet && <p>{newsItem.ozet}</p>
              )}
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
      {others.length > 0 && (
        <section className="related-news-section">
          <div className="container">
            <h2>İlgili Haberler</h2>
            <div className="related-news-grid">
              {others.map(item => (
                <Link key={item.id} to={`/haberler/${item.id}`} className="related-news-card">
                  {item.resimUrl && <img src={item.resimUrl} alt={item.baslik} />}
                  <div className="related-news-info">
                    <span className="related-date">{formatTarih(item.yayinTarihi)}</span>
                    <h3>{item.baslik}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default NewsDetailPage;
