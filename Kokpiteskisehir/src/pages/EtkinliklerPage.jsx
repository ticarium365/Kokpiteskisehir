import { Link } from 'react-router-dom';
import { Calendar, PartyPopper, MapPin, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { useApi } from '../hooks/useApi';
import './EtkinliklerPage.css';

function formatTarih(tarihStr) {
  if (!tarihStr) return '';
  try {
    return new Date(tarihStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return tarihStr;
  }
}

const EtkinliklerPage = () => {
  const { data: etkinlikler, loading, error } = useApi('/etkinlikler?yayinda=true');

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
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
              <Loader2 size={40} style={{ animation: 'spin 1s linear infinite', opacity: 0.5 }} />
            </div>
          )}

          {error && (
            <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: '#ef4444' }}>Etkinlikler yüklenirken bir hata oluştu.</p>
            </div>
          )}

          {!loading && !error && etkinlikler && etkinlikler.length > 0 && (
            <div className="etkinlikler-grid">
              {etkinlikler.map((item) => (
                <div key={item.id} className="etkinlikler-card glass-card">
                  <div className="etkinlikler-card-image">
                    {item.resimUrl ? (
                      <img src={item.resimUrl} alt={item.baslik} />
                    ) : (
                      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PartyPopper size={48} style={{ opacity: 0.3, color: '#fff' }} />
                      </div>
                    )}
                  </div>
                  <div className="etkinlikler-card-content">
                    <div className="etkinlikler-card-date">
                      <Calendar size={14} />
                      {formatTarih(item.tarih)}
                    </div>
                    <h3 className="etkinlikler-card-title">{item.baslik}</h3>
                    {item.aciklama && <p className="etkinlikler-card-excerpt">{item.aciklama}</p>}
                    {item.yer && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#94a3b8', marginTop: '8px' }}>
                        <MapPin size={12} />
                        {item.yer}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && (!etkinlikler || etkinlikler.length === 0) && (
            <div className="glass-card" style={{ textAlign: 'center', padding: '60px 40px' }}>
              <PartyPopper size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <h3 style={{ marginBottom: '8px' }}>Yaklaşan Etkinlik Yok</h3>
              <p style={{ opacity: 0.6 }}>Yeni etkinlikler eklendiğinde burada görünecek.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EtkinliklerPage;
