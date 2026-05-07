import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (menuName, e) => {
    e.preventDefault();
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  const isActive = (path) => location.pathname === path;

  const isDropdownActive = (paths) => paths.some((p) => location.pathname.startsWith(p));

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
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMobileMenu}>Ana Sayfa</Link>

            <div className={`dropdown ${openDropdown === 'kurumsal' ? 'open' : ''}`}>
              <button
                className={`nav-link dropdown-toggle ${isDropdownActive(['/hakkimizda', '/insan-kaynaklari', '/egitim-kadromuz', '/hedeflerimiz', '/basin', '/ziyaretci-defteri']) ? 'active' : ''}`}
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

            <Link to="/egitim" className={`nav-link ${isActive('/egitim') ? 'active' : ''}`} onClick={closeMobileMenu}>Eğitim</Link>
            <Link to="/okullarimiz" className={`nav-link ${isActive('/okullarimiz') ? 'active' : ''}`} onClick={closeMobileMenu}>Okullarımız</Link>
            <Link to="/bolumlerimiz" className={`nav-link ${isActive('/bolumlerimiz') ? 'active' : ''}`} onClick={closeMobileMenu}>Bölümlerimiz</Link>
            <Link to="/akademik-takvim" className={`nav-link ${isActive('/akademik-takvim') ? 'active' : ''}`} onClick={closeMobileMenu}>Akademik Takvim</Link>
            <Link to="/onur-tablomuz" className={`nav-link ${isActive('/onur-tablomuz') ? 'active' : ''}`} onClick={closeMobileMenu}>Onur Tablomuz</Link>

            <div className={`dropdown ${openDropdown === 'galeri' ? 'open' : ''}`}>
              <button
                className={`nav-link dropdown-toggle ${isDropdownActive(['/foto-galeri', '/video-galeri']) ? 'active' : ''}`}
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

            <div className={`dropdown ${openDropdown === 'medya' ? 'open' : ''}`}>
              <button
                className={`nav-link dropdown-toggle ${isDropdownActive(['/haberler', '/duyurular', '/etkinlikler', '/basin']) ? 'active' : ''}`}
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

            <Link to="/iletisim" className={`nav-link ${isActive('/iletisim') ? 'active' : ''}`} onClick={closeMobileMenu}>İletişim</Link>
          </div>
        </nav>

        <div className="nav-actions">
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
