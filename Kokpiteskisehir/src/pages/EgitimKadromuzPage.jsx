import { Link } from 'react-router-dom';
import { Users, GraduationCap, Award, BookOpen, Target, Heart, Shield, Star, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import './EgitimKadromuzPage.css';

const EgitimKadromuzPage = () => {
  const teachers = [
    {
      id: 1,
      name: 'Dr. Ahmet Yılmaz',
      title: 'Havacılık Bölüm Başkanı',
      department: 'Havacılık Lisesi',
      education: 'Anadolu Üniversitesi - Havacılık Doktora',
      experience: '15 Yıl Deneyim',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Doç. Dr. Zeynep Kara',
      title: 'Sağlık Bölüm Başkanı',
      department: 'Sağlık Meslek Lisesi',
      education: 'Eskişehir Osmangazi Üniversitesi - Hemşirelik Doktora',
      experience: '12 Yıl Deneyim',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Müh. Emre Demir',
      title: 'Yazılım Bölüm Başkanı',
      department: 'Matrix Yazılım Koleji',
      education: 'ODTÜ - Bilgisayar Mühendisliği Yüksek Lisans',
      experience: '10 Yıl Deneyim',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Elif Şahin',
      title: 'İngilizce Öğretmeni',
      department: 'Genel Eğitim',
      education: 'Ankara Üniversitesi - İngiliz Öğretmenliği',
      experience: '8 Yıl Deneyim',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 5,
      name: 'Can Özkan',
      title: 'Game Development Eğitmeni',
      department: 'Matrix Yazılım Koleji',
      education: 'İstanbul Teknik Üniversitesi - Yazılım Mühendisliği',
      experience: '6 Yıl Deneyim',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 6,
      name: 'Ayşe Kaya',
      title: 'Hemşirelik Eğitmeni',
      department: 'Sağlık Meslek Lisesi',
      education: 'Ankara Üniversitesi - Hemşirelik',
      experience: '7 Yıl Deneyim',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop'
    }
  ];

  return (
    <div className="ek-page-container">
      <SEO 
        title="Eğitim Kadromuz"
        description="Kokpit Okulları eğitim kadrosu. Deneyimli öğretmenlerimiz ve uzmanlarımızla tanışın."
        keywords="Kokpit Okulları öğretmenleri, eğitim kadrosu, havacılık eğitmenleri, sağlık eğitmenleri"
      />
      
      {/* Hero Section */}
      <section className="ek-hero-section">
        <div className="ek-hero-bg"></div>
        <div className="ek-hero-overlay"></div>
        <div className="container relative-z">
          <div className="ek-hero-content">
            <div className="ek-badge">Eğitim Kadromuz</div>
            <h1 className="ek-hero-title">Deneyimli Eğitim Kadrosu</h1>
            <p className="ek-hero-subtitle">
              Kokpit Okulları'nın başarısının arkasında uzman ve deneyimli öğretmen kadromuz var. Her bir öğretmenimiz öğrencilerimizin geleceğine katkı sağlamak için burada.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="ek-section">
        <div className="container">
          <div className="ek-stats-grid">
            <div className="ek-stat-card glass-card">
              <div className="ek-stat-icon"><Users size={40} /></div>
              <h4 className="ek-stat-number">45+</h4>
              <p className="ek-stat-label">Öğretmen</p>
            </div>
            <div className="ek-stat-card glass-card">
              <div className="ek-stat-icon"><GraduationCap size={40} /></div>
              <h4 className="ek-stat-number">20+</h4>
              <p className="ek-stat-label">Yıllık Deneyim Ortalaması</p>
            </div>
            <div className="ek-stat-card glass-card">
              <div className="ek-stat-icon"><Award size={40} /></div>
              <h4 className="ek-stat-number">%95</h4>
              <p className="ek-stat-label">Öğrenci Memnuniyeti</p>
            </div>
            <div className="ek-stat-card glass-card">
              <div className="ek-stat-icon"><BookOpen size={40} /></div>
              <h4 className="ek-stat-number">100%</h4>
              <p className="ek-stat-label">Sertifika Sahibi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="ek-section bg-darker">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Öğretmenlerimiz</h2>
            <p className="section-subtitle">
              Alanında uzman, deneyimli ve öğrenci odaklı eğitim kadromuz
            </p>
          </div>

          <div className="ek-teachers-grid">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="ek-teacher-card glass-card">
                <div className="ek-teacher-image">
                  <img src={teacher.image} alt={teacher.name} />
                  <div className="ek-teacher-overlay"></div>
                </div>
                <div className="ek-teacher-content">
                  <div className="ek-teacher-department">{teacher.department}</div>
                  <h3 className="ek-teacher-name">{teacher.name}</h3>
                  <p className="ek-teacher-title">{teacher.title}</p>
                  <div className="ek-teacher-details">
                    <div className="ek-teacher-detail">
                      <GraduationCap size={14} />
                      <span>{teacher.education}</span>
                    </div>
                    <div className="ek-teacher-detail">
                      <Target size={14} />
                      <span>{teacher.experience}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="ek-cta-container">
            <Link to="/iletisim" className="btn-primary-glow">
              Eğitim Kadromuzla Tanışın <ChevronRight size={18} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="ek-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-title">Eğitim Değerlerimiz</h2>
            <p className="section-subtitle">
              Öğretmenlerimizin temel çalışma prensipleri
            </p>
          </div>

          <div className="ek-values-grid">
            <div className="ek-value-card glass-card">
              <div className="ek-value-icon"><Heart size={32} /></div>
              <h3>Öğrenci Odaklılık</h3>
              <p>Her öğrencinin bireysel ihtiyaçlarını anlayan ve buna göre yaklaşan eğitim anlayışı.</p>
            </div>
            <div className="ek-value-card glass-card">
              <div className="ek-value-icon"><Shield size={32} /></div>
              <h3>Güvenli Ortam</h3>
              <p>Öğrencilerin kendilerini güvende hissettiği, destekleyici ve kapsayıcı öğrenme ortamı.</p>
            </div>
            <div className="ek-value-card glass-card">
              <div className="ek-value-icon"><Star size={32} /></div>
              <h3>Mükemmeliyet</h3>
              <p>Sürekli kendini geliştiren, yeniliklere açık ve kalite odaklı eğitim yaklaşımı.</p>
            </div>
            <div className="ek-value-card glass-card">
              <div className="ek-value-icon"><Users size={32} /></div>
              <h3>Takım Çalışması</h3>
              <p>Öğretmenler arası işbirliği ve öğrenci-veli-öğretmen uyumunu ön planda tutan kültür.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="ek-final-cta">
        <div className="ek-cta-overlay"></div>
        <div className="container relative-z text-center">
          <h2>Eğitim Kadromuza Katılın</h2>
          <p>Kokpit Okulları ailesinde kariyer fırsatları.</p>
          <Link to="/insan-kaynaklari" className="btn-primary-glow">
            İnsan Kaynakları <ChevronRight size={18} style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EgitimKadromuzPage;
