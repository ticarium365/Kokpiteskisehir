import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Megaphone, Bell, MessageCircle, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { useApi } from '../hooks/useApi';
import './DuyurularPage.css';

function formatTarih(tarihStr) {
  if (!tarihStr) return '';
  try {
    return new Date(tarihStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return tarihStr;
  }
}

const DuyurularPage = () => {
  const { data: duyurular, loading, error } = useApi('/duyurular?yayinda=true');

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
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
              <Loader2 size={40} style={{ animation: 'spin 1s linear infinite', opacity: 0.5 }} />
            </div>
          )}

          {error && (
            <div className="content-coming-soon glass-card" style={{ textAlign: 'center' }}>
              <p style={{ color: '#ef4444' }}>Duyurular yüklenirken bir hata oluştu.</p>
            </div>
          )}

          {!loading && !error && duyurular && duyurular.length > 0 && (
            <div className="duyurular-grid">
              {duyurular.map((item) => (
                <div key={item.id} className={`duyurular-card glass-card ${item.onemli ? 'featured' : ''}`}>
                  {item.onemli && <div className="duyurular-featured-badge">ÖNEMLİ</div>}
                  <div className="duyurular-card-content">
                    <div className="duyurular-card-date">
                      <Calendar size={14} />
                      {formatTarih(item.yayinTarihi)}
                    </div>
                    <h3 className="duyurular-card-title">{item.baslik}</h3>
                    <div
                      className="duyurular-card-excerpt"
                      dangerouslySetInnerHTML={{ __html: item.icerik?.substring(0, 200) + (item.icerik?.length > 200 ? '...' : '') }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && (!duyurular || duyurular.length === 0) && (
            <div className="content-coming-soon glass-card">
              <div className="coming-soon-icon"><Bell size={36} /></div>
              <div className="coming-soon-text">
                <h3>Yeni Duyurular Eklenecek</h3>
                <p>Kayıt tarihleri, etkinlikler ve önemli ilanlar burada yayımlanacak. WhatsApp üzerinden anlık bildirim alabilirsiniz.</p>
              </div>
              <a href="https://wa.me/905305801525" target="_blank" rel="noopener noreferrer" className="coming-soon-btn">
                <MessageCircle size={16} />
                WhatsApp'tan Takip Et
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DuyurularPage;
