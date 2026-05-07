import { useState, useMemo } from 'react';
import { Search, X, Play, ArrowRight, Calendar, Camera, ZoomIn } from 'lucide-react';
import SEO from '../components/SEO';
import './PhotoGalleryPage.css';

const PhotoGalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [brokenImages, setBrokenImages] = useState(new Set());

  // Photo data - replace with CMS data later
  const photos = [
    { id: 1, title: 'Kampüs Girişi', category: 'campus', image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800', description: 'Kokpit Okulları kampüs girişi' },
    { id: 2, title: 'Havacılık Simülatörü', category: 'aviation', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800', description: 'Uçuş simülasyon eğitimi' },
    { id: 3, title: 'Yazılım Laboratuvarı', category: 'software', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800', description: 'Modern yazılım geliştirme ortamı' },
    { id: 4, title: 'Sağlık Laboratuvarı', category: 'health', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800', description: 'Tıbbi uygulama laboratuvarı' },
    { id: 5, title: 'Mezuniyet Töreni', category: 'events', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800', description: '2024 mezuniyet töreni' },
    { id: 6, title: 'Sınıf İçi Eğitim', category: 'campus', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800', description: 'Sınıf içi etkileşimli eğitim' },
    { id: 7, title: 'Uçak Bakım Atölyesi', category: 'aviation', image: 'https://images.unsplash.com/photo-1559628233-100c798642d4?q=80&w=800', description: 'Pratik uçak bakım eğitimi' },
    { id: 8, title: 'Kodlama Atölyesi', category: 'software', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800', description: 'Öğrenci projeleri ve kodlama' },
    { id: 9, title: 'Hasta Bakım Uygulaması', category: 'health', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800', description: 'Uygulamalı hasta bakım eğitimi' },
    { id: 10, title: 'Spor Etkinliği', category: 'events', image: 'https://images.unsplash.com/photo-1461896836934-5b6e820cf324?q=80&w=800', description: 'Okul spor turnuvası' },
    { id: 11, title: 'Kütüphane', category: 'campus', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800', description: 'Modern kütüphane ve çalışma alanı' },
    { id: 12, title: 'Proje Sunumu', category: 'software', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800', description: 'Öğrenci proje sunumları' },
  ];

  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'campus', label: 'Kampüs' },
    { id: 'aviation', label: 'Havacılık' },
    { id: 'software', label: 'Yazılım' },
    { id: 'health', label: 'Sağlık' },
    { id: 'events', label: 'Etkinlikler' },
  ];

  const filteredPhotos = useMemo(() => {
    return selectedCategory === 'all' 
      ? photos 
      : photos.filter(photo => photo.category === selectedCategory);
  }, [selectedCategory]);

  const getCategoryLabel = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.label : categoryId;
  };

  const openLightbox = (photo) => {
    setSelectedImage(photo);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
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

      {/* Category Filter */}
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
                      src={photo.image} 
                      alt={photo.title}
                      loading="lazy"
                      onError={() => handleImageError(photo.id)}
                    />
                  )}
                  <div className="photo-overlay">
                    <div className="photo-overlay-icon">
                      <ZoomIn size={24} />
                    </div>
                    <div className="photo-overlay-content">
                      <span className="category-tag">{getCategoryLabel(photo.category)}</span>
                      <h3>{photo.title}</h3>
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
            <img src={selectedImage.image} alt={selectedImage.title} />
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              <span className="lightbox-category">{getCategoryLabel(selectedImage.category)}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PhotoGalleryPage;
