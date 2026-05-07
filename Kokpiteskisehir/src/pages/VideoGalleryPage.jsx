import { useState, useMemo } from 'react';
import { Play, X, ArrowRight, Calendar, Search, Camera } from 'lucide-react';
import SEO from '../components/SEO';
import './VideoGalleryPage.css';

const VideoGalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [brokenThumbnails, setBrokenThumbnails] = useState(new Set());

  const videos = [
    { 
      id: 1, 
      title: 'Sağlık Meslek Lisesi Tanıtım', 
      category: 'intro',
      // TODO: Replace PLACEHOLDER_ID with real YouTube video ID
      youtubeId: 'PLACEHOLDER_ID',
      description: 'Sağlık Meslek Lisesi eğitim programı ve olanakları hakkında tanıtım videosu'
    },
    { 
      id: 2, 
      title: 'Havacılık Lisesi Tanıtım', 
      category: 'intro',
      // TODO: Replace PLACEHOLDER_ID with real YouTube video ID
      youtubeId: 'PLACEHOLDER_ID',
      description: 'Havacılık Lisesi simülasyon ve uçuş eğitimi hakkında tanıtım videosu'
    },
    { 
      id: 3, 
      title: 'Matrix Yazılım Koleji Tanıtım', 
      category: 'intro',
      // TODO: Replace PLACEHOLDER_ID with real YouTube video ID
      youtubeId: 'PLACEHOLDER_ID',
      description: 'Matrix Yazılım Koleji programlama ve teknoloji eğitimi hakkında tanıtım videosu'
    },
    { 
      id: 4, 
      title: 'Uçuş Simülasyon Eğitimi', 
      category: 'aviation',
      // TODO: Replace PLACEHOLDER_ID with real YouTube video ID
      youtubeId: 'PLACEHOLDER_ID',
      description: 'Havacılık simülatöründe öğrenci uygulamaları'
    },
    { 
      id: 5, 
      title: 'Yazılım Proje Sunumları', 
      category: 'software',
      // TODO: Replace PLACEHOLDER_ID with real YouTube video ID
      youtubeId: 'PLACEHOLDER_ID',
      description: 'Öğrenci yazılım projeleri ve sunumları'
    },
    { 
      id: 6, 
      title: 'Sağlık Uygulamaları', 
      category: 'health',
      // TODO: Replace PLACEHOLDER_ID with real YouTube video ID
      youtubeId: 'PLACEHOLDER_ID',
      description: 'Sağlık laboratuvarında uygulamalı eğitimler'
    },
    { 
      id: 7, 
      title: 'Kampüs Turu', 
      category: 'campus',
      // TODO: Replace PLACEHOLDER_ID with real YouTube video ID
      youtubeId: 'PLACEHOLDER_ID',
      description: 'Kokpit Okulları kampüs tanıtım turu'
    },
    { 
      id: 8, 
      title: 'Mezuniyet Töreni 2024', 
      category: 'campus',
      // TODO: Replace PLACEHOLDER_ID with real YouTube video ID
      youtubeId: 'PLACEHOLDER_ID',
      description: '2024 mezuniyet töreni görüntüleri'
    },
    { 
      id: 9, 
      title: 'Laboratuvar Eğitimi', 
      category: 'health',
      // TODO: Replace PLACEHOLDER_ID with real YouTube video ID
      youtubeId: 'PLACEHOLDER_ID',
      description: 'Sağlık laboratuvarında detaylı eğitim anlatımı'
    },
    { 
      id: 10, 
      title: 'Kodlama Atölyesi', 
      category: 'software',
      // TODO: Replace PLACEHOLDER_ID with real YouTube video ID
      youtubeId: 'PLACEHOLDER_ID',
      description: 'Yazılım atölyesinde öğrenci çalışmaları'
    },
  ];

  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'intro', label: 'Tanıtım' },
    { id: 'aviation', label: 'Havacılık' },
    { id: 'software', label: 'Yazılım' },
    { id: 'health', label: 'Sağlık' },
    { id: 'campus', label: 'Kampüs' },
  ];

  const filteredVideos = useMemo(() => {
    return selectedCategory === 'all' 
      ? videos 
      : videos.filter(video => video.category === selectedCategory);
  }, [selectedCategory]);

  const getCategoryLabel = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.label : categoryId;
  };

  const openVideoModal = (video) => {
    if (video.youtubeId === 'PLACEHOLDER_ID') return;
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
    }
  };

  const handleThumbnailError = (videoId) => {
    setBrokenThumbnails(prev => new Set(prev).add(videoId));
  };

  const getThumbnailUrl = (youtubeId) => {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  };

  return (
    <div className="video-gallery-page-container">
      <SEO 
        title="Video Galeri"
        description="Kokpit Okulları tanıtım videoları, kampüs yaşamı ve eğitim alanlarından görüntüler. Video galerisi."
        keywords="Kokpit Okulları video galerisi, tanıtım videoları, kampüs yaşamı, eğitim videoları, okul tanıtımı"
      />
      
      {/* Hero Section */}
      <section className="gallery-hero-section">
        <div className="gallery-hero-bg"></div>
        <div className="gallery-hero-overlay"></div>
        <div className="container relative-z">
          <div className="gallery-hero-content">
            <div className="gallery-badge">Video Galeri</div>
            <h1 className="gallery-hero-title">Kokpit Okulları'nı Yakından Tanıyın</h1>
            <p className="gallery-hero-subtitle">
              Tanıtım videoları, kampüs yaşamı ve eğitim alanlarımızdan görüntüler.
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

      {/* Video Grid */}
      <section className="gallery-section">
        <div className="container">
          <div className="video-grid">
            {filteredVideos.map(video => (
              <div 
                key={video.id} 
                className="video-card glass-card"
                onClick={() => openVideoModal(video)}
              >
                <div className="video-thumbnail">
                  {brokenThumbnails.has(video.id) ? (
                    <div className="image-placeholder">
                      <Camera size={48} />
                      <span>Görsel Yüklenemedi</span>
                    </div>
                  ) : (
                    <img 
                      src={getThumbnailUrl(video.youtubeId)}
                      alt={video.title}
                      loading="lazy"
                      onError={() => handleThumbnailError(video.id)}
                    />
                  )}
                  {video.youtubeId !== 'PLACEHOLDER_ID' && (
                    <div className="play-button-overlay">
                      <div className="play-button">
                        <Play size={32} />
                      </div>
                    </div>
                  )}
                  {video.youtubeId === 'PLACEHOLDER_ID' && (
                    <div className="play-button-overlay">
                      <div className="play-button coming-soon-play" style={{ fontSize: '0.75rem', width: 'auto', padding: '8px 16px', borderRadius: '20px', gap: '6px', display: 'flex', alignItems: 'center' }}>
                        Yakında
                      </div>
                    </div>
                  )}
                  <div className="video-overlay">
                    <span className="category-tag">{getCategoryLabel(video.category)}</span>
                  </div>
                </div>
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {filteredVideos.length === 0 && (
            <div className="no-results glass-card">
              <Search size={48} />
              <p>Bu kategoride video bulunamadı.</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="video-modal" 
          onClick={closeVideoModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button className="modal-close" onClick={closeVideoModal} aria-label="Videoyu kapat">
            <X size={24} />
          </button>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-player-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-player"
              ></iframe>
            </div>
            <div className="video-modal-info">
              <h3>{selectedVideo.title}</h3>
              <p>{selectedVideo.description}</p>
              <span className="modal-category">{getCategoryLabel(selectedVideo.category)}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default VideoGalleryPage;
