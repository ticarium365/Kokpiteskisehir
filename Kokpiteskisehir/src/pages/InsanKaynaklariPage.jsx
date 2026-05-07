import { Link } from 'react-router-dom';
import { Users, Briefcase, GraduationCap, Award, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import './InsanKaynaklariPage.css';

const InsanKaynaklariPage = () => {
  return (
    <div className="ik-page-container">
      <SEO 
        title="İnsan Kaynakları"
        description="Kokpit Okulları'nda kariyer fırsatları. Öğretmen ve eğitim kadrosu alımları hakkında bilgi alın."
        keywords="Kokpit Okulları iş başvurusu, öğretmen alımı, eğitim kadrosu, kariyer fırsatları"
      />
      
      {/* Hero Section */}
      <section className="ik-hero-section">
        <div className="ik-hero-bg"></div>
        <div className="ik-hero-overlay"></div>
        <div className="container relative-z">
          <div className="ik-hero-content">
            <div className="ik-badge">İnsan Kaynakları</div>
            <h1 className="ik-hero-title">Ekipimize Katılın, Geleceği Birlikte İnşa Edelim</h1>
            <p className="ik-hero-subtitle">
              Kokpit Okulları ailesinde değerli bir kariyer fırsatı. Öğretmen, uzman ve yönetici pozisyonlarında açık kadrolarımızı inceleyin.
            </p>
            <div className="ik-hero-actions">
              <a href="#acik-pozisyonlar" className="btn-primary-glow">
                Açık Pozisyonları İncele
              </a>
              <Link to="/iletisim" className="btn-glass">
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="ik-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Neden Kokpit Okulları?</h2>
            <p className="section-subtitle">
              Eğitimde fark yaratan bir ekibin parçası olun
            </p>
          </div>

          <div className="ik-benefits-grid">
            <div className="ik-benefit-card glass-card">
              <div className="ik-benefit-icon"><GraduationCap size={32} /></div>
              <h3>Profesyonel Gelişim</h3>
              <p>Sürekli eğitim ve gelişim fırsatları, seminerler ve sertifikasyon programları.</p>
            </div>
            <div className="ik-benefit-card glass-card">
              <div className="ik-benefit-icon"><Target size={32} /></div>
              <h3>Kariyer Yolu</h3>
              <p>Açık pozisyonlarda yükselme fırsatları ve kariyer planlama desteği.</p>
            </div>
            <div className="ik-benefit-card glass-card">
              <div className="ik-benefit-icon"><Award size={32} /></div>
              <h3>Rekabetçi Maaş</h3>
              <p>Sektör standartlarının üzerinde maaş ve sosyal haklar paketi.</p>
            </div>
            <div className="ik-benefit-card glass-card">
              <div className="ik-benefit-icon"><Users size={32} /></div>
              <h3>Dinamik Ortam</h3>
              <p>Genç, enerjik ve yenilikçi bir çalışma ortamı.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="ik-section bg-darker" id="acik-pozisyonlar">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Açık Pozisyonlar</h2>
            <p className="section-subtitle">
              Şu anda başvurabileceğiniz pozisyonlarımız
            </p>
          </div>

          <div className="ik-positions-grid">
            <div className="ik-position-card glass-card">
              <div className="ik-position-header">
                <div className="ik-position-icon"><Briefcase size={24} /></div>
                <div className="ik-position-type-full">Tam Zamanlı</div>
              </div>
              <h3 className="ik-position-title">Havacılık Öğretmeni</h3>
              <p className="ik-position-department">Havacılık Lisesi</p>
              <div className="ik-position-details">
                <span className="ik-position-location">Eskişehir</span>
                <span className="ik-position-experience">3+ Yıl Deneyim</span>
              </div>
              <div className="ik-position-requirements">
                <p>Sivil havacılık lisansı, pilotaj sertifikası veya havacılık alanında üniversite mezuniyeti.</p>
              </div>
              <Link to="/iletisim" className="ik-apply-btn">
                Başvur <ArrowRight size={16} />
              </Link>
            </div>

            <div className="ik-position-card glass-card">
              <div className="ik-position-header">
                <div className="ik-position-icon"><Briefcase size={24} /></div>
                <div className="ik-position-type-full">Tam Zamanlı</div>
              </div>
              <h3 className="ik-position-title">Yazılım Öğretmeni</h3>
              <p className="ik-position-department">Matrix Yazılım Koleji</p>
              <div className="ik-position-details">
                <span className="ik-position-location">Eskişehir</span>
                <span className="ik-position-experience">2+ Yıl Deneyim</span>
              </div>
              <div className="ik-position-requirements">
                <p>Bilgisayar mühendisliği veya yazılım alanında üniversite mezuniyeti, modern teknoloji bilgisi.</p>
              </div>
              <Link to="/iletisim" className="ik-apply-btn">
                Başvur <ArrowRight size={16} />
              </Link>
            </div>

            <div className="ik-position-card glass-card">
              <div className="ik-position-header">
                <div className="ik-position-icon"><Briefcase size={24} /></div>
                <div className="ik-position-type-full">Tam Zamanlı</div>
              </div>
              <h3 className="ik-position-title">Sağlık Öğretmeni</h3>
              <p className="ik-position-department">Sağlık Meslek Lisesi</p>
              <div className="ik-position-details">
                <span className="ik-position-location">Eskişehir</span>
                <span className="ik-position-experience">3+ Yıl Deneyim</span>
              </div>
              <div className="ik-position-requirements">
                <p>Hemşirelik veya sağlık alanında üniversite mezuniyeti, klinik deneyim.</p>
              </div>
              <Link to="/iletisim" className="ik-apply-btn">
                Başvur <ArrowRight size={16} />
              </Link>
            </div>

            <div className="ik-position-card glass-card">
              <div className="ik-position-header">
                <div className="ik-position-icon"><Briefcase size={24} /></div>
                <div className="ik-position-type-part">Yarı Zamanlı</div>
              </div>
              <h3 className="ik-position-title">İngilizce Öğretmeni</h3>
              <p className="ik-position-department">Genel Eğitim</p>
              <div className="ik-position-details">
                <span className="ik-position-location">Eskişehir</span>
                <span className="ik-position-experience">2+ Yıl Deneyim</span>
              </div>
              <div className="ik-position-requirements">
                <p>İngilizce öğretmenliği veya ilgili alanda mezuniyet, CELTA/TEFL sertifikası tercihen.</p>
              </div>
              <Link to="/iletisim" className="ik-apply-btn">
                Başvur <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="ik-notice glass-card">
            <div className="ik-notice-icon"><CheckCircle2 size={32} /></div>
            <div className="ik-notice-content">
              <h4>Başvuru Süreci</h4>
              <p>CV'nizi ve başvuru formunu iletisim@kokpitokullari.com adresine göndererek başvurunuzu yapabilirsiniz. Uygun adaylarla iletişime geçilecektir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="ik-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Başvuru Süreci</h2>
            <p className="section-subtitle">
              Başvurunuzdan işe alımına kadar geçen süreç
            </p>
          </div>

          <div className="ik-process-steps">
            <div className="ik-process-step">
              <div className="ik-step-number">1</div>
              <h3>Başvuru</h3>
              <p>CV ve başvuru formunu gönderin</p>
            </div>
            <div className="ik-process-arrow">→</div>
            <div className="ik-process-step">
              <div className="ik-step-number">2</div>
              <h3>Ön Değerlendirme</h3>
              <p>HR ekibi başvurunuzu inceler</p>
            </div>
            <div className="ik-process-arrow">→</div>
            <div className="ik-process-step">
              <div className="ik-step-number">3</div>
              <h3>Mülakat</h3>
              <p>Yetkinlik mülakatı yapılır</p>
            </div>
            <div className="ik-process-arrow">→</div>
            <div className="ik-process-step">
              <div className="ik-step-number">4</div>
              <h3>Teklif</h3>
              <p>Uygun adaylara teklif sunulur</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="ik-final-cta">
        <div className="ik-cta-overlay"></div>
        <div className="container relative-z text-center">
          <h2>Kariyerinizi Kokpit Okulları'nda Şekillendirin</h2>
          <p>Eğitimde fark yaratmak isteyen profesyonelleri bekliyoruz.</p>
          <Link to="/iletisim" className="btn-primary-glow">
            İletişime Geç <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default InsanKaynaklariPage;
