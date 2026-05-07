import { Link } from 'react-router-dom';
import { 
  Code, 
  Terminal, 
  Gamepad2, 
  Briefcase, 
  ShieldCheck, 
  Target, 
  Users, 
  BookOpen, 
  ArrowRight, 
  Send, 
  MapPin, 
  Globe, 
  Database, 
  Rocket, 
  CheckCircle2, 
  Calendar, 
  Monitor, 
  Cpu, 
  Lightbulb, 
  Sparkles
} from 'lucide-react';
import SEO from '../components/SEO';
import './Schools.css';

const SoftwareCollege = () => {
  return (
    <div className="school-page-container">
      <SEO 
        title="Eskişehir Matrix Yazılım Koleji"
        description="Yazılım geliştirme, yapay zeka, siber güvenlik ve oyun geliştirme alanlarında modern yazılım eğitimi."
        keywords="yazılım koleji, yazılım lisesi, yapay zeka eğitimi, siber güvenlik, oyun geliştirme, Eskişehir yazılım okulu, Matrix Yazılım"
      />
      
      {/* 1. Cinematic Hero Section */}
      <section className="school-hero-section matrix-hero">
        <div className="school-hero-bg matrix-bg"></div>
        <div className="school-hero-overlay matrix-overlay"></div>
        <div className="container relative-z">
          <div className="school-hero-content">
            <div className="school-badge matrix-badge">
              <Code size={16} style={{ marginRight: '8px' }} />
              Matrix Yazılım Koleji
            </div>
            <h1 className="school-hero-title">Geleceğin Yazılım ve Teknoloji Üreticileri Burada Yetişir</h1>
            <p className="school-hero-subtitle">
              Yazılım geliştirme, oyun teknolojileri, web programlama ve dijital üretim odaklı modern eğitim modeli.
            </p>
            <div className="school-hero-actions">
              {/* TODO: Verify route /yazilim-koleji exists in App.jsx */}
              <Link to="/matrix-yazilim-koleji" className="btn-glow-matrix">
                <Monitor size={18} style={{ marginRight: '8px' }} /> Programı Keşfet
              </Link>
              <Link to="/iletisim" className="btn-glass-secondary">
                <Calendar size={18} style={{ marginRight: '8px' }} /> Tanıtım Randevusu Al
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Matrix? */}
      <section className="school-content-section why-matrix">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Neden Matrix?</h2>
            <p className="section-subtitle">
              Geleceğin teknoloji ekosisteminde yer alacak nitelikli yazılım profesyonelleri yetiştiriyoruz.
            </p>
          </div>

          <div className="why-grid">
            <div className="glass-card matrix-card">
              <div className="glass-icon matrix-icon"><Code size={24} /></div>
              <h3>Yazılım Geliştirme</h3>
              <p>Python, C# ve modern programlama dilleriyle profesyonel yazılım geliştirme eğitimi.</p>
            </div>
            <div className="glass-card matrix-card">
              <div className="glass-icon matrix-icon"><Globe size={24} /></div>
              <h3>Web Programlama</h3>
              <p>Front-end ve back-end teknolojileriyle tam kapsamlı web uygulama geliştirme.</p>
            </div>
            <div className="glass-card matrix-card">
              <div className="glass-icon matrix-icon"><Gamepad2 size={24} /></div>
              <h3>Oyun Geliştirme</h3>
              <p>Unity ve Unreal Engine ile 2D/3D oyun tasarımı ve oyun mekaniği eğitimi.</p>
            </div>
            <div className="glass-card matrix-card">
              <div className="glass-icon matrix-icon"><Database size={24} /></div>
              <h3>Veritabanı Yönetimi</h3>
              <p>SQL ve NoSQL veritabanları ile veri tasarımı ve büyük veri analitiği.</p>
            </div>
            <div className="glass-card matrix-card">
              <div className="glass-icon matrix-icon"><Rocket size={24} /></div>
              <h3>Proje Tabanlı Öğrenme</h3>
              <p>Gerçek dünya projeleriyle teorik bilgiyi pratiğe dönüştüren uygulamalı eğitim modeli.</p>
            </div>
            <div className="glass-card matrix-card">
              <div className="glass-icon matrix-icon"><Briefcase size={24} /></div>
              <h3>Kariyer ve Staj Fırsatları</h3>
              <p>Teknoloji şirketleriyle staj ve kariyer danışmanlığı imkanları.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Curriculum Section */}
      <section className="school-content-section bg-darker">
        <div className="container">
          <div className="split-content-layout">
            <div className="split-text">
              <h2 className="section-main-title">Eğitim Programı</h2>
              <p className="section-lead">
                Modern yazılım ekosisteminin gereksinimlerini kapsayan, güncel ve teknoloji odaklı müfredat.
              </p>
              
              <div className="program-accordion">
                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Temel Bilgisayar Bilimleri</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> Algoritmalar ve Veri Yapıları</li>
                    <li><CheckCircle2 size={16} /> Programlama Dilleri (Python, C#)</li>
                    <li><CheckCircle2 size={16} /> Bilgisayar Mimarisi ve İşletim Sistemleri</li>
                  </ul>
                </div>
                
                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Web Geliştirme</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> Web Tasarım ve Programlama</li>
                    <li><CheckCircle2 size={16} /> Front-end ve Back-end Geliştirme</li>
                    <li><CheckCircle2 size={16} /> Modern Web Frameworks</li>
                  </ul>
                </div>

                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Oyun Geliştirme</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> Unity ve Unreal Engine Kullanımı</li>
                    <li><CheckCircle2 size={16} /> 2D ve 3D Oyun Tasarımı</li>
                    <li><CheckCircle2 size={16} /> Oyun Mekaniği ve Grafik Programlama</li>
                  </ul>
                </div>

                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Veritabanı Yönetimi</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> SQL ve NoSQL Veritabanları</li>
                    <li><CheckCircle2 size={16} /> Veritabanı Tasarımı ve Optimizasyonu</li>
                    <li><CheckCircle2 size={16} /> Büyük Veri Analitiği</li>
                  </ul>
                </div>

                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Yazılım Mimarisi</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> Mikroservis Mimarisine Giriş</li>
                    <li><CheckCircle2 size={16} /> Yazılım Uygulama Geliştirme Modelleri</li>
                    <li><CheckCircle2 size={16} /> Bulut Bilişim ve DevOps</li>
                  </ul>
                </div>

                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Yazılım Testleme ve Kalite</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> Birim ve Entegrasyon Testleri</li>
                    <li><CheckCircle2 size={16} /> Kalite Güvencesi Süreçleri</li>
                    <li><CheckCircle2 size={16} /> Sürekli Entegrasyon ve Dağıtım</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="split-image">
              <div className="glass-image-wrapper">
                <div className="glass-image-bg matrix-image"></div>
                <div className="glass-floating-badge matrix-badge">Modern Yazılım Lab</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Career Paths */}
      <section className="school-content-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Kariyer Yolları</h2>
            <p className="section-subtitle">Teknoloji sektörünün aranan profesyonelleri arasında yer alın.</p>
          </div>

          <div className="career-tags-grid">
            <div className="career-tag matrix-tag"><Code size={18} /> Yazılım Geliştirici</div>
            <div className="career-tag matrix-tag"><Globe size={18} /> Web Developer</div>
            <div className="career-tag matrix-tag"><Gamepad2 size={18} /> Oyun Geliştirici</div>
            <div className="career-tag matrix-tag"><Database size={18} /> Veritabanı Uzmanı</div>
            <div className="career-tag matrix-tag"><Monitor size={18} /> Mobil Uygulama Geliştirici</div>
            <div className="career-tag matrix-tag"><ShieldCheck size={18} /> Siber Güvenlik Uzmanı</div>
            <div className="career-tag matrix-tag"><Cpu size={18} /> Yapay Zeka ve Veri Alanları</div>
            <div className="career-tag matrix-tag"><Rocket size={18} /> Teknoloji Girişimcisi</div>
          </div>
        </div>
      </section>

      {/* 5. Who Is It For */}
      <section className="school-content-section bg-darker">
        <div className="container">
          <div className="profile-box glass-panel">
            <div className="profile-header">
              <Sparkles size={40} className="profile-icon" />
              <h2>Kimler İçin Uygun?</h2>
              <p>Başarılı bir yazılım öğrencisinde aranan temel özellikler:</p>
            </div>
            <div className="profile-traits">
              <div className="trait">
                <Monitor size={24} />
                <span>Teknolojiye Meraklı</span>
              </div>
              <div className="trait">
                <Lightbulb size={24} />
                <span>Problem Çözmeyi Seven</span>
              </div>
              <div className="trait">
                <Target size={24} />
                <span>Üretmeyi Seven</span>
              </div>
              <div className="trait">
                <Cpu size={24} />
                <span>Matematik ve Mantık Becerisi</span>
              </div>
              <div className="trait">
                <Users size={24} />
                <span>Ekip Çalışmasına Yatkın</span>
              </div>
              <div className="trait">
                <Rocket size={24} />
                <span>Gelecek Teknolojilerine İlgi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TODO: Add Stats/Highlights section here */}
      {/* 6. Final CTA */}
      <section className="school-final-cta matrix-cta">
        <div className="cta-overlay"></div>
        <div className="container relative-z text-center">
          <h2>Geleceğin Teknolojilerini Üretmeye Hazır mısın?</h2>
          <p>Matrix Yazılım Koleji'yle teknoloji kariyerine güçlü bir başlangıç yap.</p>
          <div className="school-hero-actions justify-center">
            <Link to="/iletisim" className="btn-glow-matrix">
              Tanıtım Randevusu <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Link>
            <Link to="/iletisim" className="btn-glass-secondary">
              Bursluluk Başvurusu
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SoftwareCollege;
