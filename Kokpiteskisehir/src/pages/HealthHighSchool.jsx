import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  Stethoscope, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  Target, 
  Users, 
  BookOpen, 
  ArrowRight, 
  Send, 
  MapPin,
  Baby, 
  FlaskConical,
  CheckCircle2, 
  Calendar,
  Activity,
  Shield,
  HandHeart,
  User,
  AlertCircle,
  Hospital
} from 'lucide-react';
import SEO from '../components/SEO';
import './Schools.css';

const HealthHighSchool = () => {
  return (
    <div className="school-page-container">
      <SEO 
        title="Eskişehir Sağlık Meslek Lisesi"
        description="Hemşire yardımcılığı, ebe yardımcılığı ve sağlık bakım teknisyenliği alanlarında uygulamalı sağlık eğitimi."
        keywords="sağlık meslek lisesi, hemşire yardımcılığı, ebe yardımcılığı, sağlık bakım teknisyenliği, Eskişehir sağlık lisesi"
      />
      
      {/* 1. Cinematic Hero Section */}
      <section className="school-hero-section health-hero">
        <div className="school-hero-bg health-bg"></div>
        <div className="school-hero-overlay health-overlay"></div>
        <div className="container relative-z">
          <div className="school-hero-content">
            <div className="school-badge health-badge">
              <HeartPulse size={16} style={{ marginRight: '8px' }} />
              Sağlık Meslek Lisesi
            </div>
            <h1 className="school-hero-title">İnsan Hayatına Dokunan Profesyoneller Yetiştiriyoruz</h1>
            <p className="school-hero-subtitle">
              Uygulamalı sağlık eğitimiyle öğrencilerimizi sağlık sektörünün geleceğine hazırlıyoruz.
            </p>
            <div className="school-hero-actions">
              <Link to="/iletisim" className="btn-glow-health">
                <Calendar size={18} style={{ marginRight: '8px' }} /> Tanıtım Randevusu Al
              </Link>
              <Link to="/iletisim" className="btn-glass-secondary">
                <Send size={18} style={{ marginRight: '8px' }} /> Bursluluk Başvurusu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Health at Kokpit? */}
      <section className="school-content-section why-health">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Neden Kokpit Sağlık?</h2>
            <p className="section-subtitle">
              Sağlık sektörünün ihtiyaç duyduğu nitelikli profesyonelleri yetiştiriyoruz.
            </p>
          </div>

          <div className="why-grid">
            <div className="glass-card health-card">
              <div className="glass-icon health-icon"><HeartPulse size={24} /></div>
              <h3>Hemşire Yardımcılığı</h3>
              <p>Hastaların günlük yaşam aktivitelerine yardımcı olma, tedavi hazırlığı ve klinik refakat eğitimi.</p>
            </div>
            <div className="glass-card health-card">
              <div className="glass-icon health-icon"><Baby size={24} /></div>
              <h3>Ebe Yardımcılığı</h3>
              <p>Anne ve çocuk sağlığı, gebelik takibi ve doğum sürecinde profesyonel destek eğitimi.</p>
            </div>
            <div className="glass-card health-card">
              <div className="glass-icon health-icon"><Stethoscope size={24} /></div>
              <h3>Sağlık Bakım Teknisyenliği</h3>
              <p>Hasta bakım hizmetleri, ünite hazırlığı ve sağlık birimlerinde profesyonel çalışma.</p>
            </div>
            <div className="glass-card health-card">
              <div className="glass-icon health-icon"><FlaskConical size={24} /></div>
              <h3>Uygulamalı Laboratuvar Eğitimi</h3>
              <p>Modern laboratuvar ortamında teorik bilgiyi pratiğe dönüştüren uygulamalı eğitim.</p>
            </div>
            <div className="glass-card health-card">
              <div className="glass-icon health-icon"><GraduationCap size={24} /></div>
              <h3>Üniversite ve Kariyer Hazırlığı</h3>
              <p>Sağlık bölümlerine geçiş ve kariyer danışmanlığı ile güçlü akademik altyapı.</p>
            </div>
            <div className="glass-card health-card">
              <div className="glass-icon health-icon"><Users size={24} /></div>
              <h3>Rehberlik ve Gelişim Desteği</h3>
              <p>Bireysel rehberlik ve profesyonel gelişim odaklı destek sistemi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Program Content */}
      <section className="school-content-section bg-darker">
        <div className="container">
          <div className="split-content-layout">
            <div className="split-text">
              <h2 className="section-main-title">Eğitim Programı</h2>
              <p className="section-lead">
                Sağlık sektörünün gereksinimlerini kapsayan, güncel ve uygulamalı müfredat.
              </p>
              
              <div className="program-accordion">
                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Hemşire Yardımcılığı Programı</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> Hasta Bakım Hizmetleri</li>
                    <li><CheckCircle2 size={16} /> Temel Hemşirelik Uygulamaları</li>
                    <li><CheckCircle2 size={16} /> Klinik Refakat ve Transfer</li>
                  </ul>
                </div>
                
                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Ebe Yardımcılığı Programı</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> Anne ve Çocuk Sağlığı</li>
                    <li><CheckCircle2 size={16} /> Gebelik Takibi ve Eğitimi</li>
                    <li><CheckCircle2 size={16} /> Doğum Sonrası Bakım</li>
                  </ul>
                </div>

                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Sağlık Bakım Teknisyenliği</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> Hasta Günlük Yaşam Aktiviteleri</li>
                    <li><CheckCircle2 size={16} /> Ünite Hazırlığı ve Bakımı</li>
                    <li><CheckCircle2 size={16} /> Sağlık Hizmetleri Koordinasyonu</li>
                  </ul>
                </div>

                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Uygulamalı Eğitim Sistemi</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> Laboratuvar Uygulamaları</li>
                    <li><CheckCircle2 size={16} /> Staj Programları</li>
                    <li><CheckCircle2 size={16} /> Sektörel Teknik Geziler</li>
                  </ul>
                </div>

                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Okutulan Dersler</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> Anatomi ve Fizyoloji</li>
                    <li><CheckCircle2 size={16} /> Hastalık Bilgisi</li>
                    <li><CheckCircle2 size={16} /> İlk Yardım</li>
                    <li><CheckCircle2 size={16} /> Sağlık Hukuku</li>
                  </ul>
                </div>

                <div className="accordion-item glass-panel">
                  <h4 className="accordion-title">Üniversite Hazırlık Süreci</h4>
                  <ul className="clean-list">
                    <li><CheckCircle2 size={16} /> Sağlık Bölümlerine Geçiş</li>
                    <li><CheckCircle2 size={16} /> Akademik Danışmanlık</li>
                    <li><CheckCircle2 size={16} /> Kariyer Planlama</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="split-image">
              <div className="glass-image-wrapper">
                <div className="glass-image-bg health-image"></div>
                <div className="glass-floating-badge health-badge">Modern Sağlık Lab</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Career Opportunities */}
      <section className="school-content-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Kariyer Fırsatları</h2>
            <p className="section-subtitle">Sağlık sektörünün değerli profesyonelleri arasında yer alın.</p>
          </div>

          <div className="career-tags-grid">
            <div className="career-tag health-tag"><HeartPulse size={18} /> Hemşirelik</div>
            <div className="career-tag health-tag"><AlertCircle size={18} /> Acil Yardım Hizmetleri</div>
            <div className="career-tag health-tag"><Stethoscope size={18} /> Sağlık Teknikerliği</div>
            <div className="career-tag health-tag"><HandHeart size={18} /> Hasta Bakım Hizmetleri</div>
            <div className="career-tag health-tag"><GraduationCap size={18} /> Üniversite Sağlık Bölümleri</div>
            <div className="career-tag health-tag"><Hospital size={18} /> Hastane ve Klinik Çalışmaları</div>
          </div>
        </div>
      </section>

      {/* 5. Who Is It For */}
      <section className="school-content-section bg-darker">
        <div className="container">
          <div className="profile-box glass-panel">
            <div className="profile-header">
              <Shield size={40} className="profile-icon" />
              <h2>Kimler İçin Uygun?</h2>
              <p>Başarılı bir sağlık öğrencisinde aranan temel özellikler:</p>
            </div>
            <div className="profile-traits">
              <div className="trait">
                <HandHeart size={24} />
                <span>İnsanlara Yardım Etmeyi Seven</span>
              </div>
              <div className="trait">
                <Activity size={24} />
                <span>Disiplinli</span>
              </div>
              <div className="trait">
                <User size={24} />
                <span>Sorumluluk Sahibi</span>
              </div>
              <div className="trait">
                <Users size={24} />
                <span>İletişim Becerisi Güçlü</span>
              </div>
              <div className="trait">
                <AlertCircle size={24} />
                <span>Dikkatli ve Özenli</span>
              </div>
              <div className="trait">
                <HeartPulse size={24} />
                <span>Sağlık Alanına İlgi Duyan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TODO: Add Stats/Highlights section here */}
      {/* 6. Final CTA */}
      <section className="school-final-cta health-cta">
        <div className="cta-overlay"></div>
        <div className="container relative-z text-center">
          <h2>Sağlık Alanında Geleceğini Şekillendir</h2>
          <p>Kokpit Sağlık Meslek Lisesi ile kariyerine güçlü bir başlangıç yap.</p>
          <div className="school-hero-actions justify-center">
            <Link to="/iletisim" className="btn-glow-health">
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

export default HealthHighSchool;
