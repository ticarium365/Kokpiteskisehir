import AcademicCalendar from '../components/AcademicCalendar';
import SEO from '../components/SEO';
import './AkademikTakvimPage.css';

const AkademikTakvimPage = () => {
  return (
    <div className="akademik-takvim-page">
      <SEO 
        title="Akademik Takvim"
        description="Kokpit Okulları akademik takvimi. Öğretim yılı etkinlikleri, sınav takvimi ve önemli tarihler."
        keywords="Kokpit Okulları akademik takvim, eğitim takvimi, sınav tarihleri"
      />
      
      {/* Hero Section */}
      <section className="akademik-hero-section">
        <div className="akademik-hero-bg"></div>
        <div className="akademik-hero-overlay"></div>
        <div className="container relative-z">
          <div className="akademik-hero-content">
            <h1 className="akademik-hero-title">Akademik Takvim</h1>
            <p className="akademik-hero-subtitle">
              Öğretim yılı etkinlikleri, sınav takvimi ve önemli tarihler
            </p>
          </div>
        </div>
      </section>

      {/* Academic Calendar Component */}
      <section className="akademik-calendar-section">
        <div className="container">
          <AcademicCalendar />
        </div>
      </section>
    </div>
  );
};

export default AkademikTakvimPage;
