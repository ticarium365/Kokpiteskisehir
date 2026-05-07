import { Link } from 'react-router-dom';
import { Plane, CheckCircle2, ArrowRight, MapPin, Mail, Phone, Code2, HeartPulse } from 'lucide-react';
import SEO from '../components/SEO';
import './OkullarimizPage.css';

const OkullarimizPage = () => {
  const campuses = [
    {
      id: 1,
      name: 'Eskişehir (Yesevi) Kampüsü',
      schools: [
        'Havacılık Lisesi: Sivil Havacılık Alanı, Pilotaj Programı',
        'Sağlık Lisesi',
        'Anadolu Lisesi',
        'Yazılım Lisesi'
      ],
      address: 'Şeker Mah. Gazi Yakup Satar Cd. No:90 26120 Tepebaşı-Eskişehir',
      email: 'bilgi@kokpitokullari.com',
      phone: '0222 260 00 00',
      color: 'var(--color-secondary)',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Kocaeli Kampüsü',
      schools: [
        'Mesleki Teknik Anadolu Lisesi: Uçak Bakım Bölümü, Pilotaj Programı',
        'Sivil Havacılık Alanı, Endüstriyel Tasarım Alanı',
        'Anadolu Lisesi',
        'Ortaokul',
        'İlkokul'
      ],
      address: 'Barbaros Mah. Mahmut Çavuş Caddesi No: 13 Başiskele-Kocaeli',
      email: 'info@kokpitkoleji.com',
      phone: '0262 41 434 41',
      color: '#00b4d8',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Muğla Kampüsü',
      schools: [
        'Mesleki Teknik Anadolu Lisesi: Sivil Havacılık Alanı, Pilotaj Programı',
        'Endüstriyel Tasarım Alanı',
        'Sağlık Lisesi',
        'Anadolu Lisesi'
      ],
      address: 'Köprübaşı Mah. Şebboy Sokak No:1 Ula/ Muğla',
      email: 'bilgi@kokpitokullari.com',
      phone: '0252 242 20 51 – 52 – 53',
      color: '#00c896',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="okullar-page-container">
      {/* Hero Section */}
      <section className="okullar-hero-section">
        <div className="okullar-hero-bg"></div>
        <div className="okullar-hero-overlay"></div>
        <div className="container relative-z">
          <div className="okullar-hero-content">
            <div className="okullar-badge">Kampüslerimiz</div>
            <h1 className="okullar-hero-title">Kokpit Okulları Kampüsleri</h1>
            <p className="okullar-hero-subtitle">
              Eskişehir, Kocaeli ve Muğla kampüslerinde kaliteli eğitim
            </p>
          </div>
        </div>
      </section>

      {/* Campuses Grid */}
      <section className="okullar-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Kampüslerimiz</h2>
            <p className="section-subtitle">
              Üç farklı kampüsümüzde geniş eğitim imkanları
            </p>
          </div>

          <div className="okullar-campuses-grid">
            {campuses.map((campus) => (
              <div key={campus.id} className="okullar-campus-card glass-panel">
                <div className="okullar-campus-image">
                  <img src={campus.image} alt={campus.name} />
                  <div className="okullar-campus-overlay"></div>
                  <div className="okullar-campus-badge" style={{ background: campus.color }}>
                    {campus.name}
                  </div>
                </div>
                <div className="okullar-campus-content">
                  <ul className="okullar-campus-schools">
                    {campus.schools.map((school, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={14} />
                        {school}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="okullar-campus-contact">
                    <div className="okullar-contact-item">
                      <MapPin size={16} />
                      <span>{campus.address}</span>
                    </div>
                    <div className="okullar-contact-item">
                      <Mail size={16} />
                      <span>{campus.email}</span>
                    </div>
                    <div className="okullar-contact-item">
                      <Phone size={16} />
                      <span>{campus.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Info */}
      <section className="okullar-section bg-darker">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Kampüs Olanaklarımız</h2>
            <p className="section-subtitle">
              Modern eğitim altyapısı ve kampüs imkanları
            </p>
          </div>

          <div className="okullar-campus-grid">
            <div className="okullar-feature-card glass-card">
              <div className="okullar-campus-icon">
                <Plane size={32} />
              </div>
              <h3>Havacılık Simülatörleri</h3>
              <p>Gerçek uçuş deneyimine hazırlayan profesyonel simülasyon laboratuvarları.</p>
            </div>
            <div className="okullar-feature-card glass-card">
              <div className="okullar-campus-icon">
                <Code2 size={32} />
              </div>
              <h3>Yazılım Laboratuvarları</h3>
              <p>Modern bilgisayar altyapısı ve geliştirme ortamları ile yazılım eğitimi.</p>
            </div>
            <div className="okullar-feature-card glass-card">
              <div className="okullar-campus-icon">
                <HeartPulse size={32} />
              </div>
              <h3>Sağlık Simülasyon Merkezi</h3>
              <p>Gerçek hastane ekipmanlarıyla donatılmış uygulamalı sağlık eğitimi.</p>
            </div>
            <div className="okullar-feature-card glass-card">
              <div className="okullar-campus-icon">
                <MapPin size={32} />
              </div>
              <h3>Spor ve Sosyal Alanlar</h3>
              <p>Spor salonu, kafeterya ve öğrenci dinlenme alanları ile kampüs hayatı.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="okullar-final-cta">
        <div className="okullar-cta-overlay"></div>
        <div className="container relative-z text-center">
          <h2>Kampüslerimizi Yakından Tanıyın</h2>
          <p>Yesevi Kampüsü'nü ziyaret edin, eğitim modelimizi inceleyin.</p>
          <Link to="/iletisim" className="btn-primary-glow">
            Tanıtım Randevusu Al <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OkullarimizPage;
