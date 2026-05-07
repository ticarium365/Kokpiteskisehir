import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  GraduationCap, 
  Target, 
  Users, 
  Lightbulb, 
  Shield, 
  Award,
  ArrowRight,
  Calendar,
  MapPin,
  Building2,
  Heart,
  BookOpen,
  Globe,
  Rocket,
  Star,
  Plane,
  Monitor,
  Activity,
  HeartPulse
} from 'lucide-react';
import SEO from '../components/SEO';
import AcademicCalendar from '../components/AcademicCalendar';
import './AboutPage.css';

const AboutPage = () => {
  const [selectedSpot, setSelectedSpot] = useState(0);

  const campusSpots = [
    {
      id: 1,
      title: 'Havacılık Simülatörü',
      icon: <Plane size={24} />,
      description: 'Gerçek uçuş simülatörleriyle pratik havacılık eğitimi. Öğrencilerimiz mezun olmadan önce 50+ saat simülatör deneyimi kazanıyor.',
      // TODO: Replace with real cockpit image
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800'
    },
    {
      id: 2,
      title: 'Yazılım Laboratuvarı',
      icon: <Monitor size={24} />,
      description: 'Her öğrenciye özel bilgisayar, modern IDE ortamları ve gerçek proje geliştirme altyapısı.',
      // TODO: Replace with real computer lab image
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800'
    },
    {
      id: 3,
      title: 'Sağlık Simülasyon Merkezi',
      icon: <HeartPulse size={24} />,
      description: 'Gerçek hastane ekipmanlarıyla donatılmış simülasyon laboratuvarı. Hemşirelik ve ebelik bölümleri için özel alanlar.',
      // TODO: Replace with real medical equipment image
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800'
    },
    {
      id: 4,
      title: 'Spor Tesisleri & Sosyal Alanlar',
      icon: <Activity size={24} />,
      description: 'Spor salonu, kafeterya ve öğrenci dinlenme alanları ile kampüs hayatı.',
      // TODO: Replace with real sports facility image
      image: 'https://images.unsplash.com/photo-1461896836934-5b6e820cf324?q=80&w=800'
    }
  ];
  return (
    <div className="about-page-container">
      <SEO 
        title="Hakkımızda"
        description="Kokpit Okulları'nın eğitim yaklaşımı, vizyonu, misyonu ve modern kampüs kültürü hakkında bilgi alın. Yesevi Kampüsü'nde fark yaratıyoruz."
        keywords="Kokpit Okulları hakkında, eğitim vizyonu, kampüs kültürü, Eskişehir özel okul, okul tanıtımı"
      />
      
      {/* 1. Cinematic Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-bg"></div>
        <div className="about-hero-overlay"></div>
        <div className="container relative-z">
          <div className="about-hero-content">
            <div className="about-badge">Hakkımızda</div>
            <h1 className="about-hero-title">Geleceğin Mesleklerine Hazırlayan Modern Eğitim Kampüsü</h1>
            <p className="about-hero-subtitle">
              Kokpit Okulları; havacılık, teknoloji ve sağlık alanlarında öğrencilerini geleceğe hazırlayan uygulamalı eğitim yaklaşımına sahip modern bir eğitim kurumudur.
            </p>
            <div className="about-hero-actions">
              <Link to="/" className="btn-primary-glow">
                <MapPin size={18} style={{ marginRight: '8px' }} /> Kampüsü Keşfet
              </Link>
              <Link to="/iletisim" className="btn-glass">
                <Calendar size={18} style={{ marginRight: '8px' }} /> Tanıtım Randevusu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Campus Tour Section */}
      <section className="campus-tour-section" id="kampus">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Kampüsü Keşfet</h2>
            <p className="section-subtitle">
              Modern eğitim altyapımızı ve kampüs olanaklarımızı yakından tanıyın.
            </p>
          </div>

          <div className="campus-tour-grid">
            {/* Left: Spot Selector */}
            <div className="campus-spots-selector">
              {campusSpots.map((spot, index) => (
                <button
                  key={spot.id}
                  className={`campus-spot-btn ${selectedSpot === index ? 'active' : ''}`}
                  onClick={() => setSelectedSpot(index)}
                >
                  <span className="spot-icon">{spot.icon}</span>
                  <span className="spot-title">{spot.title}</span>
                  <ArrowRight size={16} className="spot-arrow" />
                </button>
              ))}
            </div>

            {/* Right: Image + Description */}
            <div className="campus-spot-display">
              <div className="spot-image-wrapper">
                <img
                  src={campusSpots[selectedSpot].image}
                  alt={campusSpots[selectedSpot].title}
                  className="spot-image"
                />
                <div className="spot-image-overlay"></div>
              </div>
              <div className="spot-info-panel glass-panel">
                <div className="spot-info-icon">{campusSpots[selectedSpot].icon}</div>
                <h3 className="spot-info-title">{campusSpots[selectedSpot].title}</h3>
                <p className="spot-info-description">{campusSpots[selectedSpot].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
4
      {/* 3. Educational Philosophy */}
      <section className="about-section philosophy-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Eğitim Yaklaşımımız</h2>
            <p className="section-subtitle">
              Öğrencilerimizi sadece akademik başarıya değil, hayata ve mesleki kariyere hazırlayan modern eğitim modeli.
            </p>
          </div>

          <div className="philosophy-grid">
            <div className="philosophy-card glass-card">
              <div className="philosophy-icon"><BookOpen size={28} /></div>
              <h3>Uygulamalı Eğitim</h3>
              <p>Teorik bilgiyi pratiğe dönüştüren laboratuvar ve simülasyon destekli eğitim modeli.</p>
            </div>
            <div className="philosophy-card glass-card">
              <div className="philosophy-icon"><Users size={28} /></div>
              <h3>Bireysel Gelişim</h3>
              <p>Her öğrencinin potansiyelini en üst düzeyde kullanabileceği kişiselleştirilmiş destek sistemi.</p>
            </div>
            <div className="philosophy-card glass-card">
              <div className="philosophy-icon"><Target size={28} /></div>
              <h3>Kariyer Odaklı Yaklaşım</h3>
              <p>Mesleki becerilerle donatılmış, sektör ihtiyaçlarına cevap veren profesyonel yetiştirme.</p>
            </div>
            <div className="philosophy-card glass-card">
              <div className="philosophy-icon"><Rocket size={28} /></div>
              <h3>Teknoloji Destekli Öğrenme</h3>
              <p>Modern eğitim teknolojileri ile zenginleştirilmiş öğrenme ortamları.</p>
            </div>
            <div className="philosophy-card glass-card">
              <div className="philosophy-icon"><Shield size={28} /></div>
              <h3>Rehberlik Sistemi</h3>
              <p>Üniversite ve kariyer yolculuğunda sürekli rehberlik ve danışmanlık desteği.</p>
            </div>
            <div className="philosophy-card glass-card">
              <div className="philosophy-icon"><Heart size={28} /></div>
              <h3>Sosyal Gelişim</h3>
              <p>Kültürel, sanatsal ve sportif etkinliklerle çok yönlü birey yetiştirme.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission */}
      <section className="about-section bg-darker">
        <div className="container">
          <div className="vision-mission-split">
            <div className="vision-panel glass-panel">
              <div className="vm-icon"><Star size={40} /></div>
              <h2>Vizyonumuz</h2>
              <p>
                Yenilikçi eğitim modelleri ile sağlık ve teknoloji eğitiminde Türkiye'nin öncü kurumlarından 
                biri olmak; ulusal ve uluslararası standartlarda eğitim vererek, kendi alanında en çok tercih 
                edilen, saygın ve güvenilir bir eğitim kurumu olmaktır.
              </p>
              <p>
                Öğrencilerimizin potansiyellerini en üst düzeyde kullanabilecekleri bir eğitim ortamı sunarak, 
                geleceğin liderlerini, uzmanlarını ve inovatif düşünürlerini yetiştirmek vizyonumuzun temelini oluşturmaktadır.
              </p>
            </div>
            <div className="mission-panel glass-panel">
              <div className="vm-icon"><Award size={40} /></div>
              <h2>Misyonumuz</h2>
              <p>
                Öğrencilerimizin bilişsel, duygusal, sosyal ve fiziksel gelişimlerini destekleyerek, onların 
                çok yönlü bireyler olarak yetişmelerini sağlamak; mesleki yeterlilik ve etik değerlerle donatılmış 
                sağlık ve bilişim personeli adaylarını topluma kazandırmak.
              </p>
              <p>
                Eğitim ve öğretim sürecinde sürekli gelişim ilkesini benimseyerek, öğrenci odaklı, çağdaş ve 
                kaliteli bir eğitim hizmeti sunmaktır. Toplumsal duyarlılık bilinciyle hareket eden nesiller yetiştirmek 
                misyonumuzun ayrılmaz bir parçasıdır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Families Choose Kokpit */}
      <section className="about-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Neden Aileler Kokpit'i Seçiyor?</h2>
            <p className="section-subtitle">
              Güvenilir eğitim ortamı ve güçlü altyapı ile çocuklarınızın geleceğine yatırım yapın.
            </p>
          </div>

          <div className="trust-features-grid">
            <div className="trust-feature glass-card">
              <Building2 size={32} className="trust-icon" />
              <h3>Modern Eğitim Altyapısı</h3>
              <p>Güncel teknoloji ve donanımlı sınıflarda modern eğitim imkanı.</p>
            </div>
            <div className="trust-feature glass-card">
              <Lightbulb size={32} className="trust-icon" />
              <h3>Uygulamalı Laboratuvarlar</h3>
              <p>Havacılık simülatörü, yazılım laboratuvarı ve sağlık laboratuvarları.</p>
            </div>
            <div className="trust-feature glass-card">
              <Target size={32} className="trust-icon" />
              <h3>Kariyer Hazırlığı</h3>
              <p>Mesleki becerilerle donatılmış, sektöre hazır profesyoneller yetiştirme.</p>
            </div>
            <div className="trust-feature glass-card">
              <GraduationCap size={32} className="trust-icon" />
              <h3>Üniversite Desteği</h3>
              <p>Üniversiteye geçiş sürecinde akademik danışmanlık ve hazırlık programları.</p>
            </div>
            <div className="trust-feature glass-card">
              <Shield size={32} className="trust-icon" />
              <h3>Rehberlik Sistemi</h3>
              <p>Bireysel rehberlik ve sürekli takip ile öğrenci gelişim desteği.</p>
            </div>
            <div className="trust-feature glass-card">
              <Users size={32} className="trust-icon" />
              <h3>Güvenli Kampüs Ortamı</h3>
              <p>Disiplinli, güvenli ve öğrenci odaklı eğitim ortamı.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Campus & Student Culture */}
      <section className="about-section bg-darker">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Kampüs ve Öğrenci Kültürü</h2>
            <p className="section-subtitle">
              Öğrencilerimizi akademik, sosyal ve kültürel açıdan geliştiren zengin kampüs hayatı.
            </p>
          </div>

          <div className="culture-grid">
            <div className="culture-item glass-card">
              <div className="culture-number">01</div>
              <h3>Öğrenci Gelişimi</h3>
              <p>Bireysel ilgi ve destek ile her öğrencinin potansiyelini maksimize etme.</p>
            </div>
            <div className="culture-item glass-card">
              <div className="culture-number">02</div>
              <h3>Projeler ve İnovasyon</h3>
              <p>Öğrenci projeleri, yarışmalar ve inovasyon odaklı çalışmalar.</p>
            </div>
            <div className="culture-item glass-card">
              <div className="culture-number">03</div>
              <h3>Takım Çalışması</h3>
              <p>Grup çalışmaları ve ekip projeleri ile işbirliği becerileri geliştirme.</p>
            </div>
            <div className="culture-item glass-card">
              <div className="culture-number">04</div>
              <h3>Etkinlikler</h3>
              <p>Sportif, kültürel ve sanatsal etkinliklerle sosyal gelişim destekleme.</p>
            </div>
            <div className="culture-item glass-card">
              <div className="culture-number">05</div>
              <h3>Disiplin ve Sorumluluk</h3>
              <p>Kurallara saygı, disiplin ve kişisel sorumluluk bilinci.</p>
            </div>
            <div className="culture-item glass-card">
              <div className="culture-number">06</div>
              <h3>Sosyal Sorumluluk</h3>
              <p>Toplumsal duyarlılık projeleri ve gönüllü çalışmalar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Academic Calendar */}
      <AcademicCalendar />

      {/* 8. Final Institutional CTA */}
      <section className="about-final-cta">
        <div className="cta-overlay"></div>
        <div className="container relative-z text-center">
          <h2>Modern Eğitim Yaklaşımımızı Yakından Tanıyın</h2>
          <p>Kokpit Okulları Yesevi Kampüsü'nü ziyaret edin, eğitim modelimizi yakından inceleyin.</p>
          <div className="about-hero-actions justify-center">
            <Link to="/iletisim" className="btn-primary-glow">
              İletişime Geç <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Link>
            <Link to="/iletisim" className="btn-glass">
              Tanıtım Randevusu
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
