import { Link } from 'react-router-dom';
import { Plane, Gamepad2, Monitor, Target, Award, CheckCircle2, ArrowRight, Zap, BookOpen, Users } from 'lucide-react';
import SEO from '../components/SEO';
import './EgitimPage.css';

const EgitimPage = () => {
  const programs = [
    {
      id: 1,
      icon: <Plane size={32} />,
      title: 'İHA (İnsansız Hava Aracı) Eğitimi',
      description: 'Drone teknolojileri, İHA pilotluğu ve havacılık mühendisliği alanında uygulamalı eğitim.',
      features: ['İHA Pilotluğu', 'Drone Tasarımı', 'Havacılık Mühendisliği', 'Simülasyon Eğitimi'],
      duration: '4 Yıl',
      school: 'Havacılık Lisesi'
    },
    {
      id: 2,
      icon: <Gamepad2 size={32} />,
      title: 'Game Development',
      description: 'Oyun tasarımı, geliştirme ve oyun motorları eğitimi ile oyun endüstrisine adım atın.',
      features: ['Unity & Unreal Engine', '3D Modelleme', 'Oyun Tasarımı', 'Proje Geliştirme'],
      duration: '4 Yıl',
      school: 'Matrix Yazılım Koleji'
    },
    {
      id: 3,
      icon: <Monitor size={32} />,
      title: 'Web & Mobil Geliştirme',
      description: 'Modern web teknolojileri, mobil uygulama geliştirme ve full-stack eğitimi.',
      features: ['React & Node.js', 'iOS & Android', 'Veritabanı', 'Cloud Computing'],
      duration: '4 Yıl',
      school: 'Matrix Yazılım Koleji'
    },
    {
      id: 4,
      icon: <Target size={32} />,
      title: 'Siber Güvenlik',
      description: 'Siber güvenlik uzmanlığı, ağ güvenliği ve siber savunma eğitimi.',
      features: ['Penetration Testing', 'Network Security', 'Cryptografi', 'Security Auditing'],
      duration: '4 Yıl',
      school: 'Matrix Yazılım Koleji'
    }
  ];

  const advantages = [
    {
      icon: <Zap size={24} />,
      title: 'Uygulamalı Eğitim',
      description: 'Teoriyi pratikle birleştiren laboratuvar ve simülasyon destekli eğitim modeli.'
    },
    {
      icon: <BookOpen size={24} />,
      title: 'Sektör İşbirlikleri',
      description: 'Gerçek projeler ve staj imkanları ile sektör deneyimi kazanın.'
    },
    {
      icon: <Users size={24} />,
      title: 'Deneyimli Eğitmenler',
      description: 'Alanında uzman, deneyimli öğretmen kadrosu ile kaliteli eğitim.'
    },
    {
      icon: <Award size={24} />,
      title: 'Sertifikasyon',
      description: 'Uluslararası geçerliliği olan sertifikalar ile kariyer avantajı.'
    }
  ];

  return (
    <div className="egitim-page-container">
      <SEO 
        title="Eğitim ve İHA Eğitimi"
        description="Kokpit Okulları eğitim programları. İHA, drone, oyun geliştirme, siber güvenlik ve modern teknoloji eğitimi."
        keywords="İHA eğitimi, drone kursu, oyun geliştirme eğitimi, siber güvenlik, web geliştirme"
      />
      
      {/* Hero Section */}
      <section className="egitim-hero-section">
        <div className="egitim-hero-bg"></div>
        <div className="egitim-hero-overlay"></div>
        <div className="container relative-z">
          <div className="egitim-hero-content">
            <div className="egitim-badge">Eğitim Programları</div>
            <h1 className="egitim-hero-title">Geleceğin Teknolojilerinde Uzmanlaşın</h1>
            <p className="egitim-hero-subtitle">
              İHA, drone, oyun geliştirme, siber güvenlik ve modern teknoloji alanlarında uygulamalı eğitim ile kariyerinizi şekillendirin.
            </p>
            <div className="egitim-hero-actions">
              <Link to="/iletisim" className="btn-primary-glow">
                Tanıtım Randevusu Al
              </Link>
              <Link to="/okullarimiz" className="btn-glass">
                Okullarımızı İncele
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="egitim-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Neden Kokpit Okulları?</h2>
            <p className="section-subtitle">
              Eğitimde fark yaratan özelliklerimiz
            </p>
          </div>

          <div className="egitim-advantages-grid">
            {advantages.map((advantage, index) => (
              <div key={index} className="egitim-advantage-card glass-card">
                <div className="egitim-advantage-icon">{advantage.icon}</div>
                <h3>{advantage.title}</h3>
                <p>{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="egitim-section bg-darker">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Eğitim Programlarımız</h2>
            <p className="section-subtitle">
              Modern teknoloji ve havacılık alanında uzmanlaşın
            </p>
          </div>

          <div className="egitim-programs-grid">
            {programs.map((program) => (
              <div key={program.id} className="egitim-program-card glass-card">
                <div className="egitim-program-icon">{program.icon}</div>
                <h3 className="egitim-program-title">{program.title}</h3>
                <p className="egitim-program-description">{program.description}</p>
                <div className="egitim-program-meta">
                  <span className="egitim-program-duration">
                    <BookOpen size={14} />
                    {program.duration}
                  </span>
                  <span className="egitim-program-school">{program.school}</span>
                </div>
                <ul className="egitim-program-features">
                  {program.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={14} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/iletisim" className="egitim-program-btn">
                  Detaylı Bilgi <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İHA Special Section */}
      <section className="egitim-section">
        <div className="container">
          <div className="egitim-ih-special glass-panel">
            <div className="egitim-ih-content">
              <div className="egitim-ih-badge">ÖZEL PROGRAM</div>
              <h2 className="egitim-ih-title">İHA ve Drone Eğitimi</h2>
              <p className="egitim-ih-description">
                Türkiye'nin öncü İHA eğitim programı ile drone teknolojilerinde uzmanlaşın. 
                Sivil havacılık, askeri ve ticari alanlarda kullanılan İHA sistemlerinin tasarımı, 
                pilotluğu ve bakımı konusunda kapsamlı eğitim alıyorsunuz.
              </p>
              <div className="egitim-ih-features">
                <div className="egitim-ih-feature">
                  <CheckCircle2 size={20} />
                  <span>Sertifikalı İHA Pilotluğu</span>
                </div>
                <div className="egitim-ih-feature">
                  <CheckCircle2 size={20} />
                  <span>Drone Tasarımı ve Üretimi</span>
                </div>
                <div className="egitim-ih-feature">
                  <CheckCircle2 size={20} />
                  <span>Havacılık Mühendisliği Temelleri</span>
                </div>
                <div className="egitim-ih-feature">
                  <CheckCircle2 size={20} />
                  <span>Simülasyon Eğitimi</span>
                </div>
              </div>
              <Link to="/havacilik-lisesi" className="btn-primary-glow">
                Programı İncele <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </Link>
            </div>
            <div className="egitim-ih-image">
              <img 
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop" 
                alt="İHA Drone" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="egitim-final-cta">
        <div className="egitim-cta-overlay"></div>
        <div className="container relative-z text-center">
          <h2>Geleceğin Teknolojilerinde Yerinizi Alın</h2>
          <p>Eğitim programlarımız hakkında detaylı bilgi alın.</p>
          <Link to="/iletisim" className="btn-primary-glow">
            İletişime Geç <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EgitimPage;
