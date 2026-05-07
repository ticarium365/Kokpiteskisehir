import { Link } from 'react-router-dom';
import { 
  Plane, 
  Navigation, 
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

const AviationHighSchool = () => {
  return (
    <div className="school-page-container">
      <SEO 
        title="Eskişehir Havacılık Lisesi"
        description="Pilotaj, İHA/drone eğitimi, kabin memurluğu ve sivil havacılık alanlarında uygulamalı eğitim sunan Eskişehir Havacılık Lisesi."
        keywords="havacılık lisesi, pilot eğitimi, İHA drone, kabin memurluğu, sivil havacılık, Eskişehir havacılık okulu"
      />
      
      {/* 1. Cinematic Hero Section */}
      <section className="school-hero-section aviation-hero">
        <div className="school-hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2000&auto=format&fit=crop')" }}></div>
        <div className="school-hero-overlay aviation-overlay"></div>
        <div className="container relative-z">
          <div className="school-hero-content">
            <div className="school-badge aviation-badge">
              <Plane size={16} style={{ marginRight: '8px' }} />
              Havacılık Lisesi
            </div>
            <h1 className="school-hero-title">Kokpite Giden Yol Burada Başlar</h1>
            <p className="school-hero-subtitle">
              Pilotaj, drone teknolojileri ve sivil havacılık alanlarında uygulamalı eğitim modeli.
            </p>
            <div className="school-hero-actions">
              <Link to="/iletisim" className="btn-glow-red">
                <Calendar size={18} style={{ marginRight: '8px' }} /> Tanıtım Randevusu Al
              </Link>
              <Link to="/iletisim" className="btn-glass-secondary">
                <Send size={18} style={{ marginRight: '8px' }} /> Bursluluk Başvurusu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Aviation at Kokpit? */}
      <section className="school-content-section why-aviation">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Neden Kokpit Havacılık?</h2>
            <p className="section-subtitle">
              Sektörün ihtiyaç duyduğu nitelikli profesyonelleri uluslararası standartlarda yetiştiriyoruz.
            </p>
          </div>

          <div className="why-grid">
            <div className="glass-card aviation-card">
              <div className="glass-icon aviation-icon"><Plane size={24} /></div>
              <h3>Pilotaj Simülasyonu</h3>
              <p>CESSNA 172 Kokpit Simülatöründe gerçek hava koşulları ve trafik kontrolü ile uygulamalı uçuş eğitimi.</p>
            </div>
            <div className="glass-card aviation-card">
              <div className="glass-icon aviation-icon"><Navigation size={24} /></div>
              <h3>İHA / Drone Eğitimi</h3>
              <p>Gelişen drone teknolojilerine yönelik İHA 0 ve İHA 1 ticari pilot lisansı eğitim ve sertifikasyonu.</p>
            </div>
            <div className="glass-card aviation-card">
              <div className="glass-icon aviation-icon"><Globe2 size={24} /></div>
              <h3>Havacılık İngilizcesi</h3>
              <p>Uluslararası kariyer hedefleri için standart İngilizceye ek olarak sektörel ve mesleki İngilizce eğitimi.</p>
            </div>
            <div className="glass-card aviation-card">
              <div className="glass-icon aviation-icon"><Briefcase size={24} /></div>
              <h3>Kabin Memurluğu Eğitimi</h3>
              <p>Özel programımızla mezuniyet sonrası MEB onaylı temel kabin memuru kursuna katılım imkanı.</p>
            </div>
            <div className="glass-card aviation-card">
              <div className="glass-icon aviation-icon"><GraduationCap size={24} /></div>
              <h3>Kariyer ve Üniversite Hazırlığı</h3>
              <p>Mesleki eğitimin yanında güçlü akademik altyapı ile havacılık dışı bölümlere de hazırlık fırsatı.</p>
            </div>
            <div className="glass-card aviation-card">
              <div className="glass-icon aviation-icon"><Settings size={24} /></div>
              <h3>Uygulamalı Eğitim Sistemi</h3>
              <p>Sektörel teknik geziler, havacılık laboratuvarları ve modern teknolojilerle harmanlanmış müfredat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Program Content */}
      <section className="school-content-section bg-darker">
        <div className="container">
          <div className="split-content-layout">
            <div className="split-text">
              <h2 className="section-main-title">Eğitim Programının İçeriği</h2>
              <p className="section-lead">
                Sivil havacılık ekosisteminin tüm gereksinimlerini kapsayan, güncel ve teknoloji odaklı bir müfredat sunuyoruz.
              </p>
              
              <div className="program-accordion">
                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Sivil Havacılık Programı</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> Uçak Bilgisi ve Aerodinamik Performans</li>
                    <li><CheckCircle2 size={16} /> Havacılık ve Hava Trafik Kuralları</li>
                    <li><CheckCircle2 size={16} /> Meteoroloji ve Seyrüsefer Sistemleri</li>
                  </ul>
                </div>
                
                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Pilotaj Programı</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> CESSNA 172 Simülatör Eğitimi</li>
                    <li><CheckCircle2 size={16} /> Gerçek Hava Koşulları Simülasyonu</li>
                    <li><CheckCircle2 size={16} /> Trafik Kontrolü İletişimi</li>
                  </ul>
                </div>

                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">İHA 0 / İHA 1 Eğitimi</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> Ticari Drone Pilot Lisansı</li>
                    <li><CheckCircle2 size={16} /> İHA Sertifikasyonu</li>
                    <li><CheckCircle2 size={16} /> Drone Teknolojileri Uygulamaları</li>
                  </ul>
                </div>

                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Kabin Memurluğu</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> MEB Onaylı Temel Kurs</li>
                    <li><CheckCircle2 size={16} /> Yolcu Güvenliği Prosedürleri</li>
                    <li><CheckCircle2 size={16} /> Acil Durum Yönetimi</li>
                  </ul>
                </div>
                
                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Okutulan Dersler</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> Ramp, Yolcu ve Kargo Hizmetleri</li>
                    <li><CheckCircle2 size={16} /> Havacılık Emniyeti ve Güvenliği</li>
                    <li><CheckCircle2 size={16} /> Havacılık Yönetimi ve Ulaştırma Stratejileri</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="split-image">
              <div className="glass-image-wrapper">
                <div className="glass-image-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=800')" }}></div>
                <div className="glass-floating-badge">CESSNA 172 Simülatörü</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Career Outcomes */}
      <section className="school-content-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Kariyer Fırsatları</h2>
            <p className="section-subtitle">Havacılık sektörünün saygın ve aranan profesyonelleri arasında yer alın.</p>
          </div>

          <div className="career-tags-grid">
            <div className="career-tag"><Plane size={18} /> Pilot</div>
            <div className="career-tag"><Navigation size={18} /> Drone Operatörü</div>
            <div className="career-tag"><UserCheck size={18} /> Kabin Memuru</div>
            <div className="career-tag"><ShieldCheck size={18} /> Ramp Memuru</div>
            <div className="career-tag"><Briefcase size={18} /> Yolcu Hizmetleri</div>
            <div className="career-tag"><Settings size={18} /> Dispatcher</div>
            <div className="career-tag"><Target size={18} /> Kargo Hizmetleri</div>
            <div className="career-tag"><Calendar size={18} /> Planlama Uzmanı</div>
          </div>
        </div>
      </section>

      {/* 5. Student Profile */}
      <section className="school-content-section bg-darker">
        <div className="container">
          <div className="profile-box glass-panel">
            <div className="profile-header">
              <Compass size={40} className="profile-icon" />
              <h2>Kimler İçin Uygun?</h2>
              <p>Başarılı bir sivil havacılık öğrencisinde aranan temel özellikler:</p>
            </div>
            <div className="profile-traits">
              <div className="trait">
                <Zap size={24} />
                <span>Disiplin</span>
              </div>
              <div className="trait">
                <UserCheck size={24} />
                <span>İletişim Becerisi</span>
              </div>
              <div className="trait">
                <Globe2 size={24} />
                <span>Yabancı Dil İlgi</span>
              </div>
              <div className="trait">
                <Plane size={24} />
                <span>Havacılık Tutkusu</span>
              </div>
              <div className="trait">
                <Briefcase size={24} />
                <span>Takım Çalışması</span>
              </div>
              <div className="trait">
                <ShieldCheck size={24} />
                <span>Dikkat ve Sorumluluk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TODO: Add Stats/Highlights section here */}
      {/* 6. Final CTA */}
      <section className="school-final-cta">
        <div className="cta-overlay"></div>
        <div className="container relative-z text-center">
          <h2>Sen de Kokpite Adım At</h2>
          <p>Kontenjanlar dolmadan yerini ayırt ve havacılık kariyerine güçlü bir başlangıç yap.</p>
          <div className="school-hero-actions justify-center">
            <Link to="/iletisim" className="btn-glow-red">
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

export default AviationHighSchool;
