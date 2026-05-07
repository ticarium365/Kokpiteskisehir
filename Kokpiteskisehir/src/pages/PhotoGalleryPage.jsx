import { useState, useMemo } from 'react';
import { Search, X, Camera, ZoomIn, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { useApi } from '../hooks/useApi';
import './PhotoGalleryPage.css';

const PhotoGalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [brokenImages, setBrokenImages] = useState(new Set());

  const { data: photos, loading, error } = useApi('/foto-galeri?yayinda=true');

  const categories = useMemo(() => {
    if (!photos || photos.length === 0) return [{ id: 'all', label: 'Tümü' }];
    const unique = [...new Set(photos.map(p => p.kategori).filter(Boolean))];
    return [
      { id: 'all', label: 'Tümü' },
      ...unique.map(k => ({ id: k, label: k }))
    ];
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (!photos) return [];
    return selectedCategory === 'all'
      ? photos
      : photos.filter(photo => photo.kategori === selectedCategory);
  }, [selectedCategory, photos]);

  const openLightbox = (photo) => {
    setSelectedImage(photo);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
  };

  const handleImageError = (photoId) => {
    setBrokenImages(prev => new Set(prev).add(photoId));
  };

  return (
    <div className="photo-gallery-page-container">
      <SEO 
        title="Foto Galeri"
        description="Kokpit Okulları kampüs yaşamı, laboratuvarlar, etkinlikler ve eğitim ortamlarından kareler. Fotoğraf galerisi."
        keywords="Kokpit Okulları fotoğraf galerisi, kampüs fotoğrafları, okul etkinlikleri, eğitim ortamları, kampüs yaşamı"
      />
      
      {/* Hero Section */}
      <section className="gallery-hero-section">
        <div className="gallery-hero-bg"></div>
        <div className="gallery-hero-overlay"></div>
        <div className="container relative-z">
          <div className="gallery-hero-content">
            <div className="gallery-badge">Foto Galeri</div>
            <h1 className="gallery-hero-title">Kampüs Yaşamından Kareler</h1>
            <p className="gallery-hero-subtitle">
              Kokpit Okulları'nda eğitim, uygulama, etkinlik ve sosyal yaşamdan anlar.
            </p>
          </div>
        </div>
      </section>

      {loading && (
        <section className="gallery-section">
          <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <Loader2 size={40} style={{ animation: 'spin 1s linear infinite', opacity: 0.5 }} />
          </div>
        </section>
      )}

      {!loading && !error && photos && photos.length > 0 && (
        <>
          {/* Category Filter */}
          {categories.length > 1 && (
            <section className="gallery-section">
              <div className="container">
                <div className="category-filter">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Photo Grid */}
          <section className="gallery-section">
            <div className="container">
              <div className="photo-grid">
                {filteredPhotos.map(photo => (
                  <div
                    key={photo.id}
                    className="photo-card glass-card"
                    onClick={() => openLightbox(photo)}
                  >
                    <div className="photo-image-wrapper">
                      {brokenImages.has(photo.id) ? (
                        <div className="image-placeholder">
                          <Camera size={48} />
                          <span>Görsel Yüklenemedi</span>
                        </div>
                      ) : (
                        <img
                          src={photo.resimUrl}
                          alt={photo.baslik}
                          loading="lazy"
                          onError={() => handleImageError(photo.id)}
                        />
                      )}
                      <div className="photo-overlay">
                        <div className="photo-overlay-icon">
                          <ZoomIn size={24} />
                        </div>
                        <div className="photo-overlay-content">
                          {photo.kategori && <span className="category-tag">{photo.kategori}</span>}
                          <h3>{photo.baslik}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPhotos.length === 0 && (
                <div className="no-results glass-card">
                  <Search size={48} />
                  <p>Bu kategoride fotoğraf bulunamadı.</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {!loading && !error && (!photos || photos.length === 0) && (
        <section className="gallery-section">
          <div className="container">
            <div className="no-results glass-card">
              <Camera size={48} />
              <p>Henüz fotoğraf eklenmedi.</p>
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="lightbox-modal"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Galeriyi kapat">
            <X size={24} />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.resimUrl} alt={selectedImage.baslik} />
            <div className="lightbox-info">
              <h3>{selectedImage.baslik}</h3>
              {selectedImage.kategori && <span className="lightbox-category">{selectedImage.kategori}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGalleryPage;
