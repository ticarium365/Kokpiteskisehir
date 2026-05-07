import { Link } from 'react-router-dom';
import { PlaneTakeoff, Focus, MonitorSmartphone, Globe2, Target, Users, Plane, Code2, HeartPulse, ArrowRight, CheckCircle2, Navigation, Terminal, Gamepad2, Briefcase, ShieldCheck, Stethoscope, GraduationCap, Award, Zap, School, BookOpen, BadgeCheck, ChevronRight, Microscope, Lightbulb, HeartHandshake, Music, Phone, MessageSquare, Clock, Send, Calendar, Quote, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import './HomePage.css';

const HomePage = () => {
  const handleScholarshipClick = () => {
    alert('Bursluluk başvurusu yakında açılacaktır. Bilgi için bizi arayın: (0222) 260 00 00');
  };

  const testimonials = [
    {
      id: 1,
      quote: 'Sivil havacılık bölümü sayesinde hayallerimi gerçekleştirebildim. Simülasyon eğitimi mezuniyet sonrası kariyerimde büyük avantaj sağladı.',
      name: 'Ahmet Yılmaz',
      year: '2023',
      department: 'Sivil Havacılık',
      university: 'Anadolu Üniversitesi Havacılık',
      school: 'aviation'
    },
    {
      id: 2,
      quote: 'Hemşirelik bölümündeki uygulamalı eğitim beni çok iyi hazırladı. Üniversitedeki klinik pratiklerde hiç zorlanmadım.',
      name: 'Zeynep Kara',
      year: '2023',
      department: 'Hemşire Yardımcılığı',
      university: 'Eskişehir Osmangazi Üniversitesi',
      school: 'health'
    },
    {
      id: 3,
      quote: 'Yazılım projelerimizi gerçek müşterilerle çalışarak geliştirdik. Bu deneyim, ODTÜ\'de projelerimde bana büyük avantaj sağladı.',
      name: 'Emre Demir',
      year: '2024',
      department: 'Yazılım Geliştirme',
      university: 'ODTÜ Bilgisayar Mühendisliği',
      school: 'software'
    },
    {
      id: 4,
      quote: 'Oğlumun eğitim hayatındaki değişimi inanılmaz. Hem akademik hem sosyal yönden çok gelişti. Kokpit Okulları doğru tercih.',
      name: 'Ayşe Kaya',
      label: 'Veli',
      year: '2024',
      department: 'Havacılık Lisesi',
      school: 'aviation'
    },
    {
      id: 5,
      quote: 'Laboratuvar imkanları ve öğretmenlerin ilgisi sayesinde sağlık alanında kendime güvenim tam. Şimdi üniversitede başarılıyım.',
      name: 'Elif Şahin',
      year: '2023',
      department: 'Sağlık Bakım Teknisyenliği',
      university: 'Ankara Üniversitesi',
      school: 'health'
    },
    {
      id: 6,
      quote: 'Matrix Yazılım Koleji\'ndeki eğitim, oyun geliştirme kariyerimde temel oluşturdu. Şimdi profesyonel bir stajda çalışıyorum.',
      name: 'Can Özkan',
      year: '2024',
      department: 'Game Development',
      university: 'İstanbul Teknik Üniversitesi',
      school: 'software'
    }
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getSchoolColor = (school) => {
    switch (school) {
      case 'aviation':
        return 'var(--color-aviation)';
      case 'health':
        return 'var(--color-health)';
      case 'software':
        return 'var(--color-software)';
      default:
        return 'var(--color-secondary)';
    }
  };

  return (
    <div className="home-page">
      <SEO 
        title="Eskişehir Kokpit Okulları | Havacılık, Yazılım ve Sağlık Eğitimi"
        description="Eskişehir Kokpit Okulları Yesevi Kampüsü; havacılık, yazılım ve sağlık alanlarında uygulamalı eğitim modeliyle öğrencileri geleceğin kariyerlerine hazırlar."
        keywords="havacılık lisesi, sağlık meslek lisesi, yazılım koleji, Eskişehir özel okul, Kokpit Okulları, Yesevi Kampüsü"
      />
      {/* Hero Section */}
      <section className="hero-section">
        {/* Cinematic Background Layer */}
        <div className="hero-cinematic-bg"></div>
        
        {/* Animated Floating Gradients */}
        <div className="floating-gradient gradient-blue"></div>
        <div className="floating-gradient gradient-red"></div>

        {/* Dark Cinematic Overlay */}
        <div className="hero-overlay"></div>
        
        <div className="hero-content-wrapper">
          <div className="hero-text-container">
            <h1 className="hero-main-title">
              Geleceğin Teknoloji ve Havacılık Liderlerini Yetiştiriyoruz.
            </h1>
            <p className="hero-sub-title">
              Gelecek odaklı öğrenciler için tasarlanmış havacılık, yazılım ve sağlık bilimlerinde uygulamalı modern eğitim.
            </p>
            
            <div className="hero-btn-container">
              {/* TODO: Replace with real Google Form URL when available */}
              <button onClick={handleScholarshipClick} className="btn-glow-red">
                Bursluluk Sınavına Başvur
              </button>
              <Link to="/video-galeri" className="btn-glass-secondary">
                Kampüsü Keşfet
              </Link>
            </div>
          </div>
        </div>

        {/* Minimal Glass Reflection at Bottom */}
        <div className="hero-glass-reflection"></div>
      </section>

      {/* Premium "Why Kokpit?" Section */}
      <section className="why-kokpit-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Neden Kokpit?</h2>
            <p className="section-subtitle">
              Öğrencileri yalnızca sınavlara değil, geleceğin mesleklerine hazırlıyoruz.
            </p>
          </div>

          <div className="features-glass-grid">
            {/* Card 1 */}
            <div className="feature-glass-card">
              <div className="feature-icon-wrapper">
                <PlaneTakeoff size={32} className="feature-icon" />
              </div>
              <h3 className="feature-title">Pilotaj Simülasyonu</h3>
              <p className="feature-desc">Gerçek uçuş deneyimine hazırlayan uygulamalı simülasyon eğitimi.</p>
            </div>

            {/* Card 2 */}
            <div className="feature-glass-card">
              <div className="feature-icon-wrapper">
                <Focus size={32} className="feature-icon" />
              </div>
              <h3 className="feature-title">Drone & İHA Eğitimi</h3>
              <p className="feature-desc">Yeni nesil havacılık teknolojilerini deneyimleyin.</p>
            </div>

            {/* Card 3 */}
            <div className="feature-glass-card">
              <div className="feature-icon-wrapper">
                <MonitorSmartphone size={32} className="feature-icon" />
              </div>
              <h3 className="feature-title">Yazılım ve Teknoloji Laboratuvarları</h3>
              <p className="feature-desc">Modern yazılım geliştirme ve teknoloji altyapısıyla öğrenin.</p>
            </div>

            {/* Card 4 */}
            <div className="feature-glass-card">
              <div className="feature-icon-wrapper">
                <Globe2 size={32} className="feature-icon" />
              </div>
              <h3 className="feature-title">İngilizce Destekli Eğitim</h3>
              <p className="feature-desc">Küresel kariyerler için güçlü yabancı dil altyapısı.</p>
            </div>

            {/* Card 5 */}
            <div className="feature-glass-card">
              <div className="feature-icon-wrapper">
                <Target size={32} className="feature-icon" />
              </div>
              <h3 className="feature-title">Kariyer ve Üniversite Hazırlığı</h3>
              <p className="feature-desc">Üniversiteye ve profesyonel hayata hazırlayan rehberlik sistemi.</p>
            </div>

            {/* Card 6 */}
            <div className="feature-glass-card">
              <div className="feature-icon-wrapper">
                <Users size={32} className="feature-icon" />
              </div>
              <h3 className="feature-title">Sosyal ve Uygulamalı Kampüs Yaşamı</h3>
              <p className="feature-desc">Etkinlikler, projeler ve takım çalışmalarıyla gelişen öğrenciler.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Educational Pathways Section */}
      <section className="schools-section">
        <div className="container">
          <div className="section-header-centered" style={{ marginBottom: '80px' }}>
            <h2 className="section-main-title">Eğitim Alanlarımız</h2>
            <p className="section-subtitle">
              Öğrencilerin ilgi alanlarına ve geleceğin kariyerlerine yönelik modern eğitim programları.
            </p>
          </div>

          <div className="schools-premium-grid">
            {/* Card 1 - Aviation */}
            <Link to="/havacilik-lisesi" className="school-premium-card card-aviation">
              <div className="school-card-bg aviation-bg"></div>
              <div className="school-card-overlay"></div>
              <div className="school-card-content">
                <div className="school-icon-header">
                  <Plane size={40} />
                </div>
                <h3 className="school-card-title">Havacılık Lisesi</h3>
                <p className="school-card-desc">Pilotaj, drone teknolojileri ve sivil havacılık alanında uygulamalı eğitim.</p>
                <ul className="school-card-features">
                  <li><CheckCircle2 size={16} /> Pilotaj Simülasyonu</li>
                  <li><CheckCircle2 size={16} /> İHA / Drone Eğitimi</li>
                  <li><CheckCircle2 size={16} /> Havacılık İngilizcesi</li>
                </ul>
                <div className="school-card-cta">
                  <span>Bölümü İncele</span>
                  <ArrowRight size={20} className="cta-icon" />
                </div>
              </div>
            </Link>

            {/* Card 2 - Software */}
            <Link to="/matrix-yazilim-koleji" className="school-premium-card card-software">
              <div className="school-card-bg software-bg"></div>
              <div className="school-card-overlay"></div>
              <div className="school-card-content">
                <div className="school-icon-header">
                  <Code2 size={40} />
                </div>
                <h3 className="school-card-title">Matrix Yazılım Koleji</h3>
                <p className="school-card-desc">Yazılım geliştirme, oyun teknolojileri ve dijital üretim odaklı eğitim.</p>
                <ul className="school-card-features">
                  <li><CheckCircle2 size={16} /> Web Development</li>
                  <li><CheckCircle2 size={16} /> Game Development</li>
                  <li><CheckCircle2 size={16} /> Software Labs</li>
                </ul>
                <div className="school-card-cta">
                  <span>Programı Keşfet</span>
                  <ArrowRight size={20} className="cta-icon" />
                </div>
              </div>
            </Link>

            {/* Card 3 - Health */}
            <Link to="/saglik-meslek-lisesi" className="school-premium-card card-health">
              <div className="school-card-bg health-bg"></div>
              <div className="school-card-overlay"></div>
              <div className="school-card-content">
                <div className="school-icon-header">
                  <HeartPulse size={40} />
                </div>
                <h3 className="school-card-title">Sağlık Meslek Lisesi</h3>
                <p className="school-card-desc">Uygulamalı sağlık eğitimiyle geleceğin sağlık profesyonellerini yetiştiriyoruz.</p>
                <ul className="school-card-features">
                  <li><CheckCircle2 size={16} /> Hemşire Yardımcılığı</li>
                  <li><CheckCircle2 size={16} /> Ebe Yardımcılığı</li>
                  <li><CheckCircle2 size={16} /> Sağlık Bakım Teknisyenliği</li>
                </ul>
                <div className="school-card-cta">
                  <span>Detayları Gör</span>
                  <ArrowRight size={20} className="cta-icon" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Careers & Future Opportunities Section */}
      <section className="careers-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Kariyer Yolculuğun Burada Başlıyor</h2>
            <p className="section-subtitle">
              Öğrencilerimizi yalnızca okul hayatına değil, geleceğin profesyonel dünyasına hazırlıyoruz.
            </p>
          </div>

          <div className="careers-grid">
            {/* Career Items */}
            <div className="career-glass-card">
              <div className="career-icon-bg"><Plane size={28} /></div>
              <h3 className="career-title">Pilot</h3>
              <p className="career-desc">Gökyüzünde profesyonel kariyer fırsatları.</p>
            </div>

            <div className="career-glass-card">
              <div className="career-icon-bg"><Navigation size={28} /></div>
              <h3 className="career-title">Drone Operatörü</h3>
              <p className="career-desc">Yeni nesil havacılık teknolojilerinde uzmanlaşın.</p>
            </div>

            <div className="career-glass-card">
              <div className="career-icon-bg"><Terminal size={28} /></div>
              <h3 className="career-title">Yazılım Geliştirici</h3>
              <p className="career-desc">Dijital dünyanın üreticileri arasında yerinizi alın.</p>
            </div>

            <div className="career-glass-card">
              <div className="career-icon-bg"><Gamepad2 size={28} /></div>
              <h3 className="career-title">Oyun Geliştirici</h3>
              <p className="career-desc">Yaratıcılığınızı teknolojiyle birleştirin.</p>
            </div>

            <div className="career-glass-card">
              <div className="career-icon-bg"><Briefcase size={28} /></div>
              <h3 className="career-title">Kabin Memuru</h3>
              <p className="career-desc">Uluslararası havacılık dünyasında kariyer fırsatları.</p>
            </div>

            <div className="career-glass-card">
              <div className="career-icon-bg"><ShieldCheck size={28} /></div>
              <h3 className="career-title">Siber Güvenlik Uzmanı</h3>
              <p className="career-desc">Geleceğin dijital güvenlik profesyonelleri arasında olun.</p>
            </div>

            <div className="career-glass-card">
              <div className="career-icon-bg"><Stethoscope size={28} /></div>
              <h3 className="career-title">Sağlık Profesyoneli</h3>
              <p className="career-desc">İnsan hayatına dokunan güçlü ve saygın meslekler.</p>
            </div>

            <div className="career-glass-card">
              <div className="career-icon-bg"><GraduationCap size={28} /></div>
              <h3 className="career-title">Üniversite Kariyerleri</h3>
              <p className="career-desc">Üniversiteye geçişte güçlü akademik altyapı.</p>
            </div>
          </div>

          {/* Premium Statistics Area */}
          <div className="stats-glass-container">
            <div className="stat-item">
              <div className="stat-icon"><Award size={36} /></div>
              <h4 className="stat-number">43+</h4>
              <p className="stat-label">Üniversite Yerleşimi</p>
            </div>
            <div className="stat-divider"></div>
            
            <div className="stat-item">
              <div className="stat-icon"><Zap size={36} /></div>
              <h4 className="stat-number">%100</h4>
              <p className="stat-label">Uygulamalı Eğitim Modeli</p>
            </div>
            <div className="stat-divider"></div>

            <div className="stat-item">
              <div className="stat-icon"><MonitorSmartphone size={36} /></div>
              <h4 className="stat-number">5+</h4>
              <p className="stat-label">Havacılık ve Teknoloji Laboratuvarı</p>
            </div>
            <div className="stat-divider"></div>

            <div className="stat-item">
              <div className="stat-icon"><Target size={36} /></div>
              <h4 className="stat-number">Kariyer</h4>
              <p className="stat-label">Odaklı Profesyonel Eğitim</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories / Placements Section */}
      <section className="success-section">
        {/* Animated Soft Gradient Background */}
        <div className="success-bg-glow glow-1"></div>
        <div className="success-bg-glow glow-2"></div>
        
        <div className="container relative-z">
          <div className="section-header-centered">
            <h2 className="section-main-title">Mezunlarımızın Başarı Yolculuğu</h2>
            <p className="section-subtitle">
              Kokpit Okulları öğrencileri, farklı üniversite ve bölümlerde geleceklerine güçlü bir adım atıyor.
            </p>
          </div>

          {/* New Statistics Row for Success */}
          <div className="success-stats-grid">
            <div className="success-stat-card">
              <h4 className="success-stat-number">43+</h4>
              <p className="success-stat-label">Üniversite Yerleşimi</p>
            </div>
            <div className="success-stat-card">
              <h4 className="success-stat-number">20+</h4>
              <p className="success-stat-label">Farklı Bölüm</p>
            </div>
            <div className="success-stat-card">
              <h4 className="success-stat-number" style={{ fontSize: '1.5rem', lineHeight: '2.8rem' }}>Sağlık, Havacılık ve Teknoloji</h4>
              <p className="success-stat-label">Kariyer Alanları</p>
            </div>
            <div className="success-stat-card">
              <h4 className="success-stat-number" style={{ fontSize: '1.8rem', lineHeight: '2.8rem' }}>Güçlü Rehberlik</h4>
              <p className="success-stat-label">Üniversite Hazırlığı</p>
            </div>
          </div>

          {/* Featured Placement Cards */}
          <div className="student-card-grid">
            {/* Student 1 */}
            <div className="student-glass-card">
              <div className="student-badge"><BadgeCheck size={24} /></div>
              <h3 className="student-name">Muzaffer Safa Aydın</h3>
              <div className="student-detail">
                <School size={16} />
                <span>Afyon Sağlık Bilimleri Üniversitesi</span>
              </div>
              <div className="student-detail highlight">
                <BookOpen size={16} />
                <span>İlk ve Acil Yardım</span>
              </div>
            </div>

            {/* Student 2 */}
            <div className="student-glass-card">
              <div className="student-badge"><BadgeCheck size={24} /></div>
              <h3 className="student-name">Cemile Köksoy</h3>
              <div className="student-detail">
                <School size={16} />
                <span>Afyon Sağlık Bilimleri Üniversitesi</span>
              </div>
              <div className="student-detail highlight">
                <BookOpen size={16} />
                <span>Tıbbi Görüntüleme Teknikleri</span>
              </div>
            </div>

            {/* Student 3 */}
            <div className="student-glass-card">
              <div className="student-badge"><BadgeCheck size={24} /></div>
              <h3 className="student-name">İlayda Yağımlı</h3>
              <div className="student-detail">
                <School size={16} />
                <span>Ankara Gazi Üniversitesi</span>
              </div>
              <div className="student-detail highlight">
                <BookOpen size={16} />
                <span>Tıbbi Görüntüleme Teknikleri</span>
              </div>
            </div>

            {/* Student 4 */}
            <div className="student-glass-card">
              <div className="student-badge"><BadgeCheck size={24} /></div>
              <h3 className="student-name">Aleyna Dinç</h3>
              <div className="student-detail">
                <School size={16} />
                <span>Eskişehir Anadolu Üniversitesi</span>
              </div>
              <div className="student-detail highlight">
                <BookOpen size={16} />
                <span>Acil Durum ve Afet Yönetimi</span>
              </div>
            </div>

            {/* Student 5 */}
            <div className="student-glass-card">
              <div className="student-badge"><BadgeCheck size={24} /></div>
              <h3 className="student-name">Sezer Karakaya</h3>
              <div className="student-detail">
                <School size={16} />
                <span>Doğu Akdeniz Üniversitesi</span>
              </div>
              <div className="student-detail highlight">
                <BookOpen size={16} />
                <span>Sivil Havacılık Yer Hizmetleri</span>
              </div>
            </div>

            {/* Student 6 */}
            <div className="student-glass-card">
              <div className="student-badge"><BadgeCheck size={24} /></div>
              <h3 className="student-name">Burak Çetinkaya</h3>
              <div className="student-detail">
                <School size={16} />
                <span>Burdur Mehmet Akif Ersoy Üniv.</span>
              </div>
              <div className="student-detail highlight">
                <BookOpen size={16} />
                <span>Bilgisayar Programcılığı</span>
              </div>
            </div>
          </div>

          <div className="success-cta-container">
            <Link to="/onur-tablomuz" className="btn-glass-secondary" style={{ padding: '16px 50px' }}>
              Tüm Başarıları Gör <ChevronRight size={20} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Student Success Stories / Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Mezunlarımız Ne Söylüyor</h2>
            <p className="section-subtitle">
              Öğrenci ve velilerimizin Kokpit Okulları deneyimi
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card glass-card">
                <div className="testimonial-quote-icon">
                  <Quote size={32} />
                </div>
                <p className="testimonial-text">{testimonial.quote}</p>
                <div className="testimonial-footer">
                  <div 
                    className="testimonial-avatar"
                    style={{ background: getSchoolColor(testimonial.school) }}
                  >
                    {getInitials(testimonial.name)}
                  </div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <div className="testimonial-details">
                      <span className="testimonial-year">{testimonial.year} Mezunu</span>
                      <span className="testimonial-separator">•</span>
                      <span className="testimonial-department">{testimonial.department}</span>
                    </div>
                    {testimonial.university && (
                      <p className="testimonial-university">{testimonial.university}</p>
                    )}
                    {testimonial.label && (
                      <span className="testimonial-label">{testimonial.label}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Experience / Kampüs Yaşamı Section */}
      <section className="campus-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Kampüs Yaşamı</h2>
            <p className="section-subtitle">
              Öğrencilerimiz derslerin ötesinde; uygulama, proje, etkinlik ve sosyal gelişimle büyür.
            </p>
          </div>

          <div className="campus-bento-grid">
            {/* Featured Large Card: Uygulamalı Laboratuvarlar */}
            <div className="campus-card bento-featured">
              <div className="campus-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80')" }}></div>
              <div className="campus-overlay"></div>
              <div className="campus-content">
                <div className="campus-icon"><Microscope size={28} /></div>
                <h3 className="campus-title">Uygulamalı Laboratuvarlar</h3>
                <p className="campus-desc">Sağlık, yazılım ve havacılık alanlarında uygulama odaklı öğrenme ortamları.</p>
              </div>
            </div>

            {/* Normal Card 1: Havacılık Simülasyon */}
            <div className="campus-card bento-small">
              <div className="campus-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=80')" }}></div>
              <div className="campus-overlay"></div>
              <div className="campus-content">
                <div className="campus-icon"><Plane size={24} /></div>
                <h3 className="campus-title">Havacılık Simülasyon Deneyimi</h3>
                <p className="campus-desc">Pilotaj ve havacılık eğitimini destekleyen gerçekçi simülasyon altyapısı.</p>
              </div>
            </div>

            {/* Normal Card 2: Sosyal Etkinlikler */}
            <div className="campus-card bento-small">
              <div className="campus-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80')" }}></div>
              <div className="campus-overlay"></div>
              <div className="campus-content">
                <div className="campus-icon"><Music size={24} /></div>
                <h3 className="campus-title">Sosyal Etkinlikler</h3>
                <p className="campus-desc">Geziler, seminerler, törenler, yarışmalar ve öğrenci kulüpleriyle aktif kampüs hayatı.</p>
              </div>
            </div>

            {/* Normal Card 3: Proje ve Takım */}
            <div className="campus-card bento-small">
              <div className="campus-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80')" }}></div>
              <div className="campus-overlay"></div>
              <div className="campus-content">
                <div className="campus-icon"><Lightbulb size={24} /></div>
                <h3 className="campus-title">Proje ve Takım Çalışmaları</h3>
                <p className="campus-desc">Öğrencilerin sorumluluk, liderlik ve üretkenlik becerilerini geliştiren proje kültürü.</p>
              </div>
            </div>

            {/* Normal Card 4: Rehberlik */}
            <div className="campus-card bento-wide">
              <div className="campus-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80')" }}></div>
              <div className="campus-overlay"></div>
              <div className="campus-content">
                <div className="campus-icon"><HeartHandshake size={24} /></div>
                <h3 className="campus-title">Rehberlik ve Veli İletişimi</h3>
                <p className="campus-desc">Öğrenci gelişimini takip eden rehberlik, danışmanlık ve veli bilgilendirme sistemi.</p>
              </div>
            </div>
          </div>

          <div className="campus-cta-container" style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link to="/foto-galeriler" className="btn-glow-red" style={{ padding: '16px 50px' }}>
              Kampüsü Yakından Tanıyın <ArrowRight size={20} style={{ marginLeft: '10px' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final Premium CTA Section */}
      <section className="final-cta-section">
        <div className="cta-cinematic-bg"></div>
        <div className="cta-overlay"></div>
        <div className="cta-floating-particles"></div>

        <div className="container relative-z">
          <div className="cta-split-container">
            
            {/* Left Side: Motivational Content */}
            <div className="cta-left-content">
              <div className="cta-badge">Sınırlı Kontenjan</div>
              <h2 className="cta-glow-headline">Geleceğine İlk Adımı At</h2>
              <p className="cta-subtext">
                Kokpit Okulları'nda geleceğin kariyerlerine bugünden hazırlanmaya başla. Profesyonel eğitmenler ve son teknoloji laboratuvarlarla potansiyelini keşfet.
              </p>
              
              <ul className="cta-trust-list">
                <li><CheckCircle2 size={20} /> Havacılık, Yazılım ve Sağlıkta %100 Uygulamalı Eğitim</li>
                <li><CheckCircle2 size={20} /> Üniversite ve Kariyer Odaklı Güçlü Rehberlik</li>
                <li><CheckCircle2 size={20} /> Modern Laboratuvarlar ve Simülasyon Merkezleri</li>
              </ul>

              <div className="cta-trust-badges">
                <div className="trust-badge">
                  <Phone size={18} />
                  <span>WhatsApp Hızlı Destek</span>
                </div>
                <div className="trust-badge">
                  <Clock size={18} />
                  <span>Hızlı Geri Dönüş</span>
                </div>
                <div className="trust-badge">
                  <MessageSquare size={18} />
                  <span>Ücretsiz Ön Bilgilendirme</span>
                </div>
              </div>
            </div>

            {/* Right Side: Premium Glass Form */}
            <div className="cta-right-form">
              <div className="glass-form-container">
                <h3 className="form-title">Hemen Başvurunu Yap</h3>
                <p className="form-subtitle">Formu doldurun, eğitim danışmanlarımız sizi arasın.</p>
                
                <form className="premium-glass-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <input type="text" className="glass-input" placeholder="Adınız Soyadınız" required />
                  </div>
                  <div className="form-group">
                    <input type="tel" className="glass-input" placeholder="Telefon Numarası" required />
                  </div>
                  <div className="form-group">
                    <input type="email" className="glass-input" placeholder="E-posta Adresiniz" />
                  </div>
                  <div className="form-group">
                    <select className="glass-select" required defaultValue="">
                      <option value="" disabled>İlgilendiğiniz Alanı Seçin</option>
                      <option value="havacilik">Havacılık Lisesi</option>
                      <option value="yazilim">Matrix Yazılım Koleji</option>
                      <option value="saglik">Sağlık Meslek Lisesi</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea className="glass-textarea" placeholder="Eklemek istediğiniz mesajınız..." rows="3"></textarea>
                  </div>
                  
                  <div className="form-actions">
                    <Link to="/hakkimizda#kampus" className="btn-primary-glow">
                      <MapPin size={18} style={{ marginRight: '8px' }} /> Kampüsü Keşfet
                    </Link>
                    <button type="button" className="btn-glass-secondary w-full">
                      <Calendar size={18} style={{ marginRight: '8px' }} /> Tanıtım Randevusu
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
