import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Handle scroll detection for glass morph styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open (Accessibility & UX)
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup to ensure we never permanently lock the scroll
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle closing menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  // Handle dropdown toggling cleanly for touch interactions
  const toggleDropdown = (menuName, e) => {
    e.preventDefault();
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-glass-container">
        <div className="logo-container">
          <Link to="/" className="brand-name" onClick={closeMobileMenu} aria-label="Ana Sayfaya Dön">
            KOKPİT<br/>OKULLARI
          </Link>
        </div>

        <nav 
          className={`desktop-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}
          aria-label="Ana Navigasyon"
        >
          <div className="nav-scroll-container">
            <Link to="/" className="nav-link active" onClick={closeMobileMenu}>Ana Sayfa</Link>
            
            {/* Kurumsal Dropdown */}
            <div className={`dropdown ${openDropdown === 'kurumsal' ? 'open' : ''}`}>
              <button 
                className="nav-link dropdown-toggle" 
                onClick={(e) => toggleDropdown('kurumsal', e)}
                aria-expanded={openDropdown === 'kurumsal'}
                aria-controls="kurumsal-menu"
              >
                Kurumsal <ChevronDown size={18} className="chevron" />
              </button>
              <div id="kurumsal-menu" className="dropdown-menu">
                <Link to="/hakkimizda" className="dropdown-item" onClick={closeMobileMenu}>Hakkımızda</Link>
                <Link to="/insan-kaynaklari" className="dropdown-item" onClick={closeMobileMenu}>İnsan Kaynakları</Link>
                <Link to="/egitim-kadromuz" className="dropdown-item" onClick={closeMobileMenu}>Eğitim Kadromuz</Link>
                <Link to="/hedeflerimiz" className="dropdown-item" onClick={closeMobileMenu}>Hedeflerimiz</Link>
                <Link to="/basin" className="dropdown-item" onClick={closeMobileMenu}>Basın</Link>
                <Link to="/ziyaretci-defteri" className="dropdown-item" onClick={closeMobileMenu}>Ziyaretçi Defteri</Link>
              </div>
            </div>

            <Link to="/egitim" className="nav-link" onClick={closeMobileMenu}>Eğitim</Link>
            <Link to="/okullarimiz" className="nav-link" onClick={closeMobileMenu}>Okullarımız</Link>
            <Link to="/bolumlerimiz" className="nav-link" onClick={closeMobileMenu}>Bölümlerimiz</Link>
            <Link to="/akademik-takvim" className="nav-link" onClick={closeMobileMenu}>Akademik Takvim</Link>
            <Link to="/onur-tablomuz" className="nav-link" onClick={closeMobileMenu}>Onur Tablomuz</Link>
            
            {/* Galeri Dropdown */}
            <div className={`dropdown ${openDropdown === 'galeri' ? 'open' : ''}`}>
              <button 
                className="nav-link dropdown-toggle" 
                onClick={(e) => toggleDropdown('galeri', e)}
                aria-expanded={openDropdown === 'galeri'}
                aria-controls="galeri-menu"
              >
                Galeri <ChevronDown size={18} className="chevron" />
              </button>
              <div id="galeri-menu" className="dropdown-menu">
                <Link to="/foto-galeriler" className="dropdown-item" onClick={closeMobileMenu}>Foto Galeri</Link>
                <Link to="/video-galeri" className="dropdown-item" onClick={closeMobileMenu}>Video Galeri</Link>
              </div>
            </div>

            {/* Medya Dropdown */}
            <div className={`dropdown ${openDropdown === 'medya' ? 'open' : ''}`}>
              <button 
                className="nav-link dropdown-toggle" 
                onClick={(e) => toggleDropdown('medya', e)}
                aria-expanded={openDropdown === 'medya'}
                aria-controls="medya-menu"
              >
                Medya <ChevronDown size={18} className="chevron" />
              </button>
              <div id="medya-menu" className="dropdown-menu">
                <Link to="/haberler" className="dropdown-item" onClick={closeMobileMenu}>Haberler</Link>
                <Link to="/duyurular" className="dropdown-item" onClick={closeMobileMenu}>Duyurular</Link>
                <Link to="/etkinlikler" className="dropdown-item" onClick={closeMobileMenu}>Etkinlikler</Link>
                <Link to="/basin" className="dropdown-item" onClick={closeMobileMenu}>Basın</Link>
              </div>
            </div>

            <Link to="/iletisim" className="nav-link" onClick={closeMobileMenu}>İletişim</Link>
          </div>
        </nav>

        <div className="nav-actions">
          {/* Giriş Dropdown */}
          <div className={`dropdown ${openDropdown === 'giris' ? 'open' : ''}`}>
            <button 
              className="btn-header-glass dropdown-toggle" 
              onClick={(e) => toggleDropdown('giris', e)}
              aria-expanded={openDropdown === 'giris'}
              aria-controls="giris-menu"
            >
              Giriş <ChevronDown size={18} className="chevron" />
            </button>
            <div id="giris-menu" className="dropdown-menu">
              <Link to="/ogrenci-veli-giris" className="dropdown-item" onClick={closeMobileMenu}>Öğrenci / Veli Girişi</Link>
              <Link to="/ogretmen-giris" className="dropdown-item" onClick={closeMobileMenu}>Öğretmen Girişi</Link>
            </div>
          </div>
          
          {/* Hamburger Menu Toggle */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      
      {/* Dim Overlay to close menu on outside click */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={closeMobileMenu}
          aria-hidden="true"
        ></div>
      )}
    </header>
  );
};

export default Header;
