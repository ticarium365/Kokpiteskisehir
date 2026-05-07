import { Link } from 'react-router-dom';
import { Target, Award, Globe, Users, Zap, CheckCircle2, ArrowRight, TrendingUp, Shield, Heart } from 'lucide-react';
import SEO from '../components/SEO';
import './HedeflerimizPage.css';

const HedeflerimizPage = () => {
  const goals = [
    {
      id: 1,
      icon: <Award size={32} />,
      title: 'Eğitim Kalitesi',
      description: 'Türkiye\'nin en iyi uygulamalı eğitim modelini sunarak öğrenci başarısını en üst düzeye çıkarmak.',
      progress: 85
    },
    {
      id: 2,
      icon: <Globe size={32} />,
      title: 'Uluslararası Standartlar',
      description: 'Dünya standartlarında eğitim programlarıyla öğrencilerimizi global kariyere hazırlamak.',
      progress: 70
    },
    {
      id: 3,
      icon: <Users size={32} />,
      title: 'Öğrenci Memnuniyeti',
      description: 'Öğrenci ve veli memnuniyetini %100\'e çıkarmak için sürekli iyileştirme yapmak.',
      progress: 92
    },
    {
      id: 4,
      icon: <Zap size={32} />,
      title: 'Teknoloji Altyapısı',
      description: 'En güncel teknoloji ve ekipmanlarla kampüs altyapısını sürekli güncellemek.',
      progress: 78
    }
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Kuruluş',
      description: 'Kokpit Okulları Yesevi Kampüsü\'nün kuruluşu ve ilk öğrenci alımı.'
    },
    {
      year: '2025',
      title: 'Üniversite Başarıları',
      description: 'İlk mezuniyet ve yüksek üniversite yerleşme oranı başarısı.'
    },
    {
      year: '2026',
      title: 'Bölüm Genişlemesi',
      description: 'Yeni eğitim programları ve bölüm açılışları.'
    },
    {
      year: '2027',
      title: 'Uluslararası İşbirlikleri',
      description: 'Yabancı üniversitelerle işbirliği ve öğrenci değişim programları.'
    },
    {
      year: '2028',
      title: 'Bölgesel Liderlik',
      description: 'Ege ve Marmara bölgelerinde yeni kampüs açılışları.'
    }
  ];

  return (
    <div className="hedefler-page-container">
      <SEO 
        title="Hedeflerimiz"
        description="Kokpit Okulları'nın vizyonu, misyonu ve hedefleri. Eğitimde kalite ve başarı odaklı büyüme planı."
        keywords="Kokpit Okulları hedefleri, vizyon, misyon, eğitim kalitesi, büyüme planı"
      />
      
      {/* Hero Section */}
      <section className="hedefler-hero-section">
        <div className="hedefler-hero-bg"></div>
        <div className="hedefler-hero-overlay"></div>
        <div className="container relative-z">
          <div className="hedefler-hero-content">
            <div className="hedefler-badge">Hedeflerimiz</div>
            <h1 className="hedefler-hero-title">Geleceğe Yönelik Hedeflerimiz</h1>
            <p className="hedefler-hero-subtitle">
              Eğitimde mükemmeliyet ve sürekli gelişim ilkesiyle öğrencilerimizi geleceğin liderleri olarak yetiştirmek için yola çıktık.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="hedefler-section">
        <div className="container">
          <div className="hedefler-mv-grid">
            <div className="hedefler-mv-card glass-panel">
              <div className="hedefler-mv-icon"><Target size={48} /></div>
              <h2>Vizyonumuz</h2>
              <p>
                Yenilikçi eğitim modelleri ile sağlık ve teknoloji eğitiminde Türkiye'nin öncü kurumlarından biri olmak; ulusal ve uluslararası standartlarda eğitim vererek, kendi alanında en çok tercih edilen, saygın ve güvenilir bir eğitim kurumu olmaktır.
              </p>
            </div>
            <div className="hedefler-mv-card glass-panel">
              <div className="hedefler-mv-icon"><Shield size={48} /></div>
              <h2>Misyonumuz</h2>
              <p>
                Öğrencilerimizin bilişsel, duygusal, sosyal ve fiziksel gelişimlerini destekleyerek, onların çok yönlü bireyler olarak yetişmelerini sağlamak; mesleki yeterlilik ve etik değerlerle donatılmış sağlık ve bilişim personeli adaylarını topluma kazandırmak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className="hedefler-section bg-darker">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Stratejik Hedefler</h2>
            <p className="section-subtitle">
              Kısa ve uzun vadeli hedeflerimiz
            </p>
          </div>

          <div className="hedefler-goals-grid">
            {goals.map((goal) => (
              <div key={goal.id} className="hedefler-goal-card glass-card">
                <div className="hedefler-goal-icon">{goal.icon}</div>
                <h3 className="hedefler-goal-title">{goal.title}</h3>
                <p className="hedefler-goal-description">{goal.description}</p>
                <div className="hedefler-progress-container">
                  <div className="hedefler-progress-bar">
                    <div 
                      className="hedefler-progress-fill"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <span className="hedefler-progress-text">{goal.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="hedefler-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Yol Haritası</h2>
            <p className="section-subtitle">
              Gelecek 5 yılın hedefleri ve kilometre taşları
            </p>
          </div>

          <div className="hedefler-timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="hedefler-milestone">
                <div className="hedefler-milestone-year">{milestone.year}</div>
                <div className="hedefler-milestone-content glass-card">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="hedefler-section bg-darker">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Temel Değerlerimiz</h2>
            <p className="section-subtitle">
              Tüm çalışmalarımızı yönlendiren prensipler
            </p>
          </div>

          <div className="hedefler-values-grid">
            <div className="hedefler-value-card glass-card">
              <div className="hedefler-value-icon"><Heart size={32} /></div>
              <h3>Öğrenci Odaklılık</h3>
              <p>Öğrenci başarısını ve gelişimini her şeyin önünde tutmak.</p>
            </div>
            <div className="hedefler-value-card glass-card">
              <div className="hedefler-value-icon"><TrendingUp size={32} /></div>
              <h3>Sürekli İyileştirme</h3>
              <p>Her zaman daha iyisini hedeflemek ve gelişmek.</p>
            </div>
            <div className="hedefler-value-card glass-card">
              <div className="hedefler-value-icon"><CheckCircle2 size={32} /></div>
              <h3>Güvenilirlik</h3>
              <p>Veli ve öğrencilerimize karşı dürüst ve şeffaf olmak.</p>
            </div>
            <div className="hedefler-value-card glass-card">
              <div className="hedefler-value-icon"><Users size={32} /></div>
              <h3>Takım Çalışması</h3>
              <p>Birlikte çalışarak kolektif başarıya ulaşmak.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hedefler-final-cta">
        <div className="hedefler-cta-overlay"></div>
        <div className="container relative-z text-center">
          <h2>Geleceği Birlikte İnşa Edelim</h2>
          <p>Kokpit Okulları'nın hedeflerine katkıda bulunmak ister misiniz?</p>
          <div className="hedefler-cta-actions">
            <Link to="/iletisim" className="btn-primary-glow">
              İletişime Geç <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Link>
            <Link to="/insan-kaynaklari" className="btn-glass">
              Kariyer Fırsatları
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HedeflerimizPage;
