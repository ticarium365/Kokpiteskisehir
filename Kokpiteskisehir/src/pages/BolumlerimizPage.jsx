import { Link } from 'react-router-dom';
import { Plane, HeartPulse, Code2, ArrowRight, CheckCircle2, GraduationCap, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import './BolumlerimizPage.css';

const BolumlerimizPage = () => {
  const departments = [
    // Aviation Departments
    {
      id: 1,
      name: 'Sivil Havacılık Yönetimi',
      icon: <Plane size={28} />,
      description: 'Havacılık sektöründe yöneticilik ve operasyon alanında kariyer.',
      school: 'Havacılık Lisesi',
      color: 'var(--color-aviation)',
      duration: '4 Yıl',
      link: '/bolum/6/sivil-havacilik-yonetimi'
    },
    {
      id: 2,
      name: 'İHA Pilotluğu',
      icon: <Plane size={28} />,
      description: 'İnsansız hava aracı pilotluğu ve drone teknolojileri.',
      school: 'Havacılık Lisesi',
      color: 'var(--color-aviation)',
      duration: '4 Yıl',
      link: '/havacilik-lisesi'
    },
    // Health Departments
    {
      id: 3,
      name: 'Hemşire Yardımcılığı',
      icon: <HeartPulse size={28} />,
      description: 'Hemşirelik alanında uygulama odaklı sağlık eğitimi.',
      school: 'Sağlık Meslek Lisesi',
      color: 'var(--color-health)',
      duration: '4 Yıl',
      link: '/bolum/2/hemsire-yardimciligi'
    },
    {
      id: 4,
      name: 'Ebe Yardımcılığı',
      icon: <HeartPulse size={28} />,
      description: 'Ebelik ve kadın sağlığı alanında uzmanlaşma.',
      school: 'Sağlık Meslek Lisesi',
      color: 'var(--color-health)',
      duration: '4 Yıl',
      link: '/bolum/3/ebe-yardimciligi'
    },
    {
      id: 5,
      name: 'Sağlık Bakım Teknisyenliği',
      icon: <HeartPulse size={28} />,
      description: 'Hasta bakımı ve sağlık teknisyenliği alanında eğitim.',
      school: 'Sağlık Meslek Lisesi',
      color: 'var(--color-health)',
      duration: '4 Yıl',
      link: '/bolum/6/saglik-bakim-teknisyenligi'
    },
    // Software Departments
    {
      id: 6,
      name: 'Web Development',
      icon: <Code2 size={28} />,
      description: 'Modern web teknolojileri ile full-stack geliştirme.',
      school: 'Matrix Yazılım Koleji',
      color: 'var(--color-software)',
      duration: '4 Yıl',
      link: '/matrix-yazilim-koleji'
    },
    {
      id: 7,
      name: 'Game Development',
      icon: <Code2 size={28} />,
      description: 'Oyun tasarımı ve geliştirme alanında uzmanlaşma.',
      school: 'Matrix Yazılım Koleji',
      color: 'var(--color-software)',
      duration: '4 Yıl',
      link: '/matrix-yazilim-koleji'
    },
    {
      id: 8,
      name: 'Siber Güvenlik',
      icon: <Code2 size={28} />,
      description: 'Ağ güvenliği ve siber savunma alanında eğitim.',
      school: 'Matrix Yazılım Koleji',
      color: 'var(--color-software)',
      duration: '4 Yıl',
      link: '/matrix-yazilim-koleji'
    }
  ];

  const schools = [
    { name: 'Havacılık Lisesi', color: 'var(--color-aviation)', icon: <Plane size={20} /> },
    { name: 'Sağlık Meslek Lisesi', color: 'var(--color-health)', icon: <HeartPulse size={20} /> },
    { name: 'Matrix Yazılım Koleji', color: 'var(--color-software)', icon: <Code2 size={20} /> }
  ];

  return (
    <div className="bolumler-page-container">
      <SEO 
        title="Bölümlerimiz"
        description="Kokpit Okulları eğitim bölümleri. Havacılık, sağlık ve yazılım alanında uzmanlaşmış bölümler."
        keywords="Kokpit Okulları bölümleri, havacılık bölümü, sağlık bölümü, yazılım bölümü"
      />
      
      {/* Hero Section */}
      <section className="bolumler-hero-section">
        <div className="bolumler-hero-bg"></div>
        <div className="bolumler-hero-overlay"></div>
        <div className="container relative-z">
          <div className="bolumler-hero-content">
            <div className="bolumler-badge">Bölümlerimiz</div>
            <h1 className="bolumler-hero-title">Eğitim Bölümleri</h1>
            <p className="bolumler-hero-subtitle">
              Havacılık, sağlık ve yazılım alanında uzmanlaşmış bölümlerimiz ile geleceğin mesleklerine hazırlanın.
            </p>
          </div>
        </div>
      </section>

      {/* Schools Filter */}
      <section className="bolumler-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Okullarımı Göre Bölümler</h2>
            <p className="section-subtitle">
              Her okulun uzmanlaştığı eğitim programları
            </p>
          </div>

          <div className="bolumler-schools-nav">
            {schools.map((school, index) => (
              <div key={index} className="bolumler-school-nav-item">
                <div className="bolumler-school-nav-icon" style={{ background: school.color }}>
                  {school.icon}
                </div>
                <span>{school.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="bolumler-section bg-darker">
        <div className="container">
          <div className="bolumler-departments-grid">
            {departments.map((dept) => (
              <div key={dept.id} className="bolumler-dept-card glass-card">
                <div className="bolumler-dept-header" style={{ background: dept.color }}>
                  <div className="bolumler-dept-icon">{dept.icon}</div>
                  <span className="bolumler-dept-school">{dept.school}</span>
                </div>
                <div className="bolumler-dept-content">
                  <h3 className="bolumler-dept-name">{dept.name}</h3>
                  <p className="bolumler-dept-description">{dept.description}</p>
                  
                  <div className="bolumler-dept-meta">
                    <div className="bolumler-dept-meta-item">
                      <Clock size={14} />
                      <span>{dept.duration}</span>
                    </div>
                    <div className="bolumler-dept-meta-item">
                      <GraduationCap size={14} />
                      <span>Lise Mezunu</span>
                    </div>
                  </div>

                  <Link to={dept.link} className="bolumler-dept-btn" style={{ color: dept.color, borderColor: dept.color }}>
                    Bölümü İncele <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bolumler-section">
        <div className="container">
          <div className="bolumler-info-panel glass-panel">
            <div className="bolumler-info-content">
              <h2>Bölüm Seçimi Hakkında</h2>
              <p>
                Kokpit Okulları'nda her öğrenci kendi ilgi alanına ve geleceğin mesleklerine uygun bölümü seçebilir. 
                Okullarımızın her biri kendi alanında uzmanlaşmış eğitim programları sunar. 
                Bölüm seçimi sırasında rehber öğretmenlerimiz öğrencilerimize ve velilerimize destek sağlar.
              </p>
              <div className="bolumler-info-features">
                <div className="bolumler-info-feature">
                  <CheckCircle2 size={20} />
                  <span>Uzman Rehberlik Desteği</span>
                </div>
                <div className="bolumler-info-feature">
                  <CheckCircle2 size={20} />
                  <span>Üniversite Hazırlık Programı</span>
                </div>
                <div className="bolumler-info-feature">
                  <CheckCircle2 size={20} />
                  <span>Kariyer Danışmanlığı</span>
                </div>
              </div>
            </div>
            <div className="bolumler-info-cta">
              <Link to="/iletisim" className="btn-primary-glow">
                Danışmanlık Alın <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bolumler-final-cta">
        <div className="bolumler-cta-overlay"></div>
        <div className="container relative-z text-center">
          <h2>Doğru Bölümü Seçin</h2>
          <p>Geleceğin mesleği için en uygun bölümü belirleyin.</p>
          <Link to="/iletisim" className="btn-primary-glow">
            İletişime Geç <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BolumlerimizPage;
