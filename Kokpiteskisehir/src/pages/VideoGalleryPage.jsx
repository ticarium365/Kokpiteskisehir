import { useState, useMemo } from 'react';
import { Play, X, Search, Camera, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { useApi } from '../hooks/useApi';
import './VideoGalleryPage.css';

const VideoGalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [brokenThumbnails, setBrokenThumbnails] = useState(new Set());

  const { data: videos, loading, error } = useApi('/video-galeri?yayinda=true');

  const categories = useMemo(() => {
    if (!videos || videos.length === 0) return [{ id: 'all', label: 'Tümü' }];
    const unique = [...new Set(videos.map(v => v.kategori).filter(Boolean))];
    return [
      { id: 'all', label: 'Tümü' },
      ...unique.map(k => ({ id: k, label: k }))
    ];
  }, [videos]);

  const filteredVideos = useMemo(() => {
    if (!videos) return [];
    return selectedCategory === 'all'
      ? videos
      : videos.filter(v => v.kategori === selectedCategory);
  }, [selectedCategory, videos]);

  const openVideoModal = (video) => {
    if (!video.youtubeId) return;
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeVideoModal();
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

      {loading && (
        <section className="gallery-section">
          <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <Loader2 size={40} style={{ animation: 'spin 1s linear infinite', opacity: 0.5 }} />
          </div>
        </section>
      )}

      {!loading && !error && videos && videos.length > 0 && (
        <>
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

          <section className="gallery-section">
            <div className="container">
              <div className="video-grid">
                {filteredVideos.map(video => (
                  <div
                    key={video.id}
                    className="video-card glass-card"
                    onClick={() => openVideoModal(video)}
                    style={{ cursor: video.youtubeId ? 'pointer' : 'default' }}
                  >
                    <div className="video-thumbnail">
                      {video.youtubeId && !brokenThumbnails.has(video.id) ? (
                        <img
                          src={getThumbnailUrl(video.youtubeId)}
                          alt={video.baslik}
                          loading="lazy"
                          onError={() => handleThumbnailError(video.id)}
                        />
                      ) : (
                        <div className="image-placeholder">
                          <Camera size={48} />
                          <span>Video Önizlemesi</span>
                        </div>
                      )}
                      {video.youtubeId && (
                        <div className="play-button-overlay">
                          <div className="play-button">
                            <Play size={32} />
                          </div>
                        </div>
                      )}
                      {video.kategori && (
                        <div className="video-overlay">
                          <span className="category-tag">{video.kategori}</span>
                        </div>
                      )}
                    </div>
                    <div className="video-info">
                      <h3>{video.baslik}</h3>
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
        </>
      )}

      {!loading && !error && (!videos || videos.length === 0) && (
        <section className="gallery-section">
          <div className="container">
            <div className="no-results glass-card">
              <Play size={48} />
              <p>Henüz video eklenmedi.</p>
            </div>
          </div>
        </section>
      )}

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
                title={selectedVideo.baslik}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-player"
              ></iframe>
            </div>
            <div className="video-modal-info">
              <h3>{selectedVideo.baslik}</h3>
              {selectedVideo.kategori && <span className="modal-category">{selectedVideo.kategori}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGalleryPage;
