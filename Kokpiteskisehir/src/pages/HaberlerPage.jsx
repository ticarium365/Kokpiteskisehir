import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Bell, MessageCircle, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { useApi } from '../hooks/useApi';
import './HaberlerPage.css';

function formatTarih(tarihStr) {
  if (!tarihStr) return '';
  try {
    return new Date(tarihStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return tarihStr;
  }
}

const HaberlerPage = () => {
  const { data: haberler, loading, error } = useApi('/haberler?yayinda=true');

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
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
              <Loader2 size={40} style={{ animation: 'spin 1s linear infinite', opacity: 0.5 }} />
            </div>
          )}

          {error && (
            <div className="content-coming-soon glass-card" style={{ textAlign: 'center' }}>
              <p style={{ color: '#ef4444' }}>Haberler yüklenirken bir hata oluştu.</p>
            </div>
          )}

          {!loading && !error && haberler && haberler.length > 0 && (
            <div className="haberler-grid">
              {haberler.map((item) => (
                <Link key={item.id} to={`/haberler/${item.id}`} className="haberler-card glass-card">
                  <div className="haberler-card-image">
                    {item.resimUrl ? (
                      <img src={item.resimUrl} alt={item.baslik} />
                    ) : (
                      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bell size={48} style={{ opacity: 0.3, color: '#fff' }} />
                      </div>
                    )}
                  </div>
                  <div className="haberler-card-content">
                    <div className="haberler-card-date">
                      <Calendar size={14} />
                      {formatTarih(item.yayinTarihi)}
                    </div>
                    <h3 className="haberler-card-title">{item.baslik}</h3>
                    {item.ozet && <p className="haberler-card-excerpt">{item.ozet}</p>}
                    <span className="haberler-card-link">
                      Devamını Oku <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && !error && (!haberler || haberler.length === 0) && (
            <div className="content-coming-soon glass-card">
              <div className="coming-soon-icon"><Bell size={36} /></div>
              <div className="coming-soon-text">
                <h3>Haberler Yolda</h3>
                <p>Etkinlikler, başarılar ve okul haberleri buraya eklenecek. Gelişmelerden haberdar olmak için bizi takip edin.</p>
              </div>
              <a href="https://wa.me/905305801525" target="_blank" rel="noopener noreferrer" className="coming-soon-btn">
                <MessageCircle size={16} />
                WhatsApp ile Takip Et
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HaberlerPage;
