import { Link } from 'react-router-dom';
import { Users, GraduationCap, Award, BookOpen, Target, Heart, Shield, Star, ChevronRight, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { useApi } from '../hooks/useApi';
import './EgitimKadromuzPage.css';

const EgitimKadromuzPage = () => {
  const { data: teachers, loading, error } = useApi('/ekip?yayinda=true');

  return (
    <div className="ek-page-container">
      <SEO 
        title="Eğitim Kadromuz"
        description="Kokpit Okulları eğitim kadrosu. Deneyimli öğretmenlerimiz ve uzmanlarımızla tanışın."
        keywords="Kokpit Okulları öğretmenleri, eğitim kadrosu, havacılık eğitmenleri, sağlık eğitmenleri"
      />
      
      {/* Hero Section */}
      <section className="ek-hero-section">
        <div className="ek-hero-bg"></div>
        <div className="ek-hero-overlay"></div>
        <div className="container relative-z">
          <div className="ek-hero-content">
            <div className="ek-badge">Eğitim Kadromuz</div>
            <h1 className="ek-hero-title">Deneyimli Eğitim Kadrosu</h1>
            <p className="ek-hero-subtitle">
              Kokpit Okulları'nın başarısının arkasında uzman ve deneyimli öğretmen kadromuz var. Her bir öğretmenimiz öğrencilerimizin geleceğine katkı sağlamak için burada.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="ek-section">
        <div className="container">
          <div className="ek-stats-grid">
            <div className="ek-stat-card glass-card">
              <div className="ek-stat-icon"><Users size={40} /></div>
              <h4 className="ek-stat-number">45+</h4>
              <p className="ek-stat-label">Öğretmen</p>
            </div>
            <div className="ek-stat-card glass-card">
              <div className="ek-stat-icon"><GraduationCap size={40} /></div>
              <h4 className="ek-stat-number">20+</h4>
              <p className="ek-stat-label">Yıllık Deneyim Ortalaması</p>
            </div>
            <div className="ek-stat-card glass-card">
              <div className="ek-stat-icon"><Award size={40} /></div>
              <h4 className="ek-stat-number">%95</h4>
              <p className="ek-stat-label">Öğrenci Memnuniyeti</p>
            </div>
            <div className="ek-stat-card glass-card">
              <div className="ek-stat-icon"><BookOpen size={40} /></div>
              <h4 className="ek-stat-number">100%</h4>
              <p className="ek-stat-label">Sertifika Sahibi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="ek-section bg-darker">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Öğretmenlerimiz</h2>
            <p className="section-subtitle">
              Alanında uzman, deneyimli ve öğrenci odaklı eğitim kadromuz
            </p>
          </div>

          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
              <Loader2 size={40} style={{ animation: 'spin 1s linear infinite', opacity: 0.5 }} />
            </div>
          )}

          {!loading && !error && teachers && teachers.length > 0 && (
            <div className="ek-teachers-grid">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="ek-teacher-card glass-card">
                  <div className="ek-teacher-image">
                    {teacher.resimUrl ? (
                      <img src={teacher.resimUrl} alt={teacher.ad} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1e293b, #334155)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Users size={64} style={{ opacity: 0.3, color: '#fff' }} />
                      </div>
                    )}
                    <div className="ek-teacher-overlay"></div>
                  </div>
                  <div className="ek-teacher-content">
                    {teacher.bolum && <div className="ek-teacher-department">{teacher.bolum}</div>}
                    <h3 className="ek-teacher-name">{teacher.ad}</h3>
                    <p className="ek-teacher-title">{teacher.unvan}</p>
                    {teacher.biyografi && (
                      <div className="ek-teacher-details">
                        <div className="ek-teacher-detail">
                          <Target size={14} />
                          <span>{teacher.biyografi}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && (!teachers || teachers.length === 0) && (
            <div className="glass-card" style={{ textAlign: 'center', padding: '60px 40px' }}>
              <Users size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <p style={{ opacity: 0.6 }}>Ekip bilgileri yakında eklenecek.</p>
            </div>
          )}

          <div className="ek-cta-container">
            <Link to="/iletisim" className="btn-primary-glow">
              Eğitim Kadromuzla Tanışın <ChevronRight size={18} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="ek-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Eğitim Değerlerimiz</h2>
            <p className="section-subtitle">
              Öğretmenlerimizin temel çalışma prensipleri
            </p>
          </div>

          <div className="ek-values-grid">
            <div className="ek-value-card glass-card">
              <div className="ek-value-icon"><Heart size={32} /></div>
              <h3>Öğrenci Odaklılık</h3>
              <p>Her öğrencinin bireysel ihtiyaçlarını anlayan ve buna göre yaklaşan eğitim anlayışı.</p>
            </div>
            <div className="ek-value-card glass-card">
              <div className="ek-value-icon"><Shield size={32} /></div>
              <h3>Güvenli Ortam</h3>
              <p>Öğrencilerin kendilerini güvende hissettiği, destekleyici ve kapsayıcı öğrenme ortamı.</p>
            </div>
            <div className="ek-value-card glass-card">
              <div className="ek-value-icon"><Star size={32} /></div>
              <h3>Mükemmeliyet</h3>
              <p>Sürekli kendini geliştiren, yeniliklere açık ve kalite odaklı eğitim yaklaşımı.</p>
            </div>
            <div className="ek-value-card glass-card">
              <div className="ek-value-icon"><Users size={32} /></div>
              <h3>Takım Çalışması</h3>
              <p>Öğretmenler arası işbirliği ve öğrenci-veli-öğretmen uyumunu ön planda tutan kültür.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="ek-final-cta">
        <div className="ek-cta-overlay"></div>
        <div className="container relative-z text-center">
          <h2>Eğitim Kadromuza Katılın</h2>
          <p>Kokpit Okulları ailesinde kariyer fırsatları.</p>
          <Link to="/insan-kaynaklari" className="btn-primary-glow">
            İnsan Kaynakları <ChevronRight size={18} style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EgitimKadromuzPage;
