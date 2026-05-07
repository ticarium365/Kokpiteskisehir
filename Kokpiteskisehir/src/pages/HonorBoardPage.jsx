import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Award,
  Target,
  Globe,
  Heart,
  Plane,
  Code,
  Calendar,
  MapPin,
  Send,
  Search,
  Filter
} from 'lucide-react';
import SEO from '../components/SEO';
import './HonorBoardPage.css';

const HonorBoardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Student placement data
  const students = [
    { name: 'Muzaffer Safa Aydın', university: 'Afyon Sağlık Bilimleri Üniversitesi', department: 'İlk ve Acil Yardım', category: 'health' },
    { name: 'Cemile Köksoy', university: 'Afyon Sağlık Bilimleri Üniversitesi', department: 'Tıbbi Görüntüleme Teknikleri', category: 'health' },
    { name: 'Ceren Tanyel', university: 'Eskişehir Osmangazi Üniversitesi', department: 'Yaşlı Bakımı', category: 'health' },
    { name: 'Mehmet Turgut', university: 'Afyon Sağlık Bilimleri Üniversitesi', department: 'Tıbbi Görüntüleme Teknikleri', category: 'health' },
    { name: 'İlayda Öztürk', university: 'İzmir Dokuz Eylül Üniversitesi', department: 'Tıbbi Görüntüleme Teknikleri', category: 'health' },
    { name: 'Büşra Bayraş', university: 'Afyon Sağlık Bilimleri Üniversitesi', department: 'Tıbbi Görüntüleme Teknikleri', category: 'health' },
    { name: 'Şeyma Özer', university: 'Eskişehir Osmangazi Üniversitesi', department: 'Tıbbi Görüntüleme Teknikleri', category: 'health' },
    { name: 'Gülcan Biçer', university: 'Eskişehir Osmangazi Üniversitesi', department: 'Tıbbi Görüntüleme Teknikleri', category: 'health' },
    { name: 'Kaan Can', university: 'Toros Üniversitesi', department: 'Diyaliz', category: 'health' },
    { name: 'Ayşe Şalgam', university: 'Eskişehir Osmangazi Üniversitesi', department: 'Yaşlı Bakımı', category: 'health' },
    { name: 'Merve Ceren Ortaç', university: 'Kütahya Sağlık Bilimleri Üniversitesi', department: 'Fizyoterapi', category: 'health' },
    { name: 'Merve Uyguner', university: 'Muğla Sıtkı Koçman Üniversitesi', department: 'Tıbbi Laboratuvar Teknikleri', category: 'health' },
    { name: 'İlayda Yağımlı', university: 'Ankara Gazi Üniversitesi', department: 'Tıbbi Görüntüleme Teknikleri', category: 'health' },
    { name: 'Aleyna Dinç', university: 'Eskişehir Anadolu Üniversitesi', department: 'Acil Durum ve Afet Yönetimi', category: 'health' },
    { name: 'Ahmet Yakışır', university: 'Nevşehir Hacı Bektaş Veli Üniversitesi', department: 'İş ve Uğraşı Terapisi', category: 'health' },
    { name: 'Furkan Silahşor', university: 'Gelişim Üniversitesi', department: 'Radyoterapi', category: 'health' },
    { name: 'Ferhat Serintürk', university: 'Ankara Yıldırım Üniversitesi', department: 'Engelli Bakımı ve Rehabilitasyon', category: 'health' },
    { name: 'Kaan Özkurt', university: 'Çanakkale 18 Mart Üniversitesi', department: 'Laboratuvar Teknolojisi', category: 'health' },
    { name: 'Buket Kamber', university: 'Eskişehir Anadolu Üniversitesi', department: 'Engelli Bakımı ve Rehabilitasyon', category: 'health' },
    { name: 'Sinem Conker', university: 'Eskişehir Anadolu Üniversitesi', department: 'Laborant ve Veteriner Sağlık', category: 'health' },
    { name: 'Özlem Kaptan', university: 'Eskişehir Anadolu Üniversitesi', department: 'Halkla İlişkiler', category: 'other' },
    { name: 'Merve Bayraktar', university: 'Dicle Üniversitesi', department: 'İşletme Yönetimi', category: 'other' },
    { name: 'Nazife Ekin Özer', university: 'Eskişehir Osmangazi Üniversitesi', department: 'İlk ve Acil Yardım', category: 'health' },
    { name: 'Ayşe Kurt', university: 'Eskişehir Osmangazi Üniversitesi', department: 'İlk ve Acil Yardım', category: 'health' },
    { name: 'Enes Tekeli', university: 'Bolu Abant İzzet Baysal Üniversitesi', department: 'Elektrik Elektronik Mühendisliği', category: 'technology' },
    { name: 'Beria Nur Uçak', university: 'Aksaray Üniversitesi Sağlık Bilim Fakültesi', department: 'Acil Yardım ve Afet Yönetimi (Lisans)', category: 'health' },
    { name: 'Hüseyin Kuşcu', university: 'Eskişehir Anadolu Üniversitesi', department: 'Acil Durum ve Afet Yönetimi', category: 'health' },
    { name: 'Nevin Şamal', university: 'Isparta Süleyman Demirel Üniversitesi', department: 'Tıbbi Laboratuvar Teknikleri', category: 'health' },
    { name: 'Kübra Güreş', university: 'Eskişehir Anadolu Üniversitesi', department: 'Acil Durum ve Afet Yönetimi', category: 'health' },
    { name: 'Neslihan Zengin', university: 'Eskişehir Anadolu Üniversitesi', department: 'Acil Durum ve Afet Yönetimi', category: 'health' },
    { name: 'Ömer Çimendağ', university: 'Kars Kafkas Üniversitesi', department: 'Anestezi', category: 'health' },
    { name: 'İlayda Diker', university: 'Mersin Üniversitesi', department: 'Anestezi', category: 'health' },
    { name: 'İrem Atak', university: 'Kütahya Sağlık Bilimleri Üniversitesi', department: 'Tıbbi Laboratuvar Teknikleri', category: 'health' },
    { name: 'Selin Çetin', university: 'Doğu Akdeniz Üniversitesi', department: 'Gastronomi ve Mutfak Sanatları', category: 'other' },
    { name: 'Gayenur Güneş', university: 'Doğu Akdeniz Üniversitesi', department: 'İlk ve Acil Yardım', category: 'health' },
    { name: 'Sezer Karakaya', university: 'Doğu Akdeniz Üniversitesi', department: 'Sivil Havacılık Yer Hizmetleri', category: 'aviation' },
    { name: 'Berat Cıngıl', university: 'Erzurum Atatürk Üniversitesi', department: 'İnşaat Teknolojisi', category: 'other' },
    { name: 'Berkan Karaca', university: 'İstanbul Sağlık Bilimleri Üniversitesi', department: 'Denizci Sağlığı', category: 'health' },
    { name: 'Burak Çetinkaya', university: 'Burdur Mehmet Akif Ersoy Üniversitesi', department: 'Bilgisayar Programcılığı', category: 'technology' },
    { name: 'Selinay Köseoğlu', university: 'İstanbul Arel Üniversitesi', department: 'Anestezi', category: 'health' },
    { name: 'Tuğçe Yavuz', university: 'İstanbul Sağlık Bilimleri Üniversitesi', department: 'Yaşlı Bakımı', category: 'health' },
    { name: 'Onur Şamal', university: 'Eskişehir Anadolu Üniversitesi', department: 'Laborant ve Veteriner Sağlık', category: 'health' },
    { name: 'Hüseyin Gündüz', university: 'Eskişehir Anadolu Üniversitesi', department: 'Acil Durum ve Afet Yönetimi', category: 'health' },
    { name: 'Muhterem Can Kaygısız', university: 'Eskişehir Anadolu Üniversitesi', department: 'İlahiyat', category: 'other' },
    { name: 'M. Eren Niğdelioğlu', university: 'Eskişehir Anadolu Üniversitesi', department: 'Halkla İlişkiler', category: 'other' },
  ];

  // Filter students based on search and category
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = searchTerm === '' || 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || student.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const getInitials = (name) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'health': return <Heart size={20} />;
      case 'aviation': return <Plane size={20} />;
      case 'technology': return <Code size={20} />;
      default: return <Award size={20} />;
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'health': return 'Sağlık';
      case 'aviation': return 'Havacılık';
      case 'technology': return 'Teknoloji';
      default: return 'Diğer';
    }
  };

  const getCategoryClass = (category) => {
    switch (category) {
      case 'health': return 'category-health';
      case 'aviation': return 'category-aviation';
      case 'technology': return 'category-technology';
      default: return 'category-other';
    }
  };

  return (
    <div className="honor-board-page-container">
      <SEO 
        title="Onur Tablomuz"
        description="Kokpit Okulları mezunlarının üniversite yerleşimleri ve başarı hikayelerini inceleyin. Mezunlarımızın başarıları."
        keywords="onur tablosu, mezun başarıları, üniversite yerleşimleri, Kokpit Okulları mezunları, öğrenci başarı hikayeleri"
      />
      
      {/* 1. Hero Section */}
      <section className="honor-hero-section">
        <div className="honor-hero-bg"></div>
        <div className="honor-hero-overlay"></div>
        <div className="container relative-z">
          <div className="honor-hero-content">
            <div className="honor-badge">Onur Tablomuz</div>
            <h1 className="honor-hero-title">Mezunlarımızın Başarı Yolculuğu</h1>
            <p className="honor-hero-subtitle">
              Kokpit Okulları öğrencileri, farklı üniversite ve bölümlerde geleceklerine güçlü bir adım atıyor.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Statistics Section */}
      <section className="honor-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card glass-card">
              <div className="stat-icon"><GraduationCap size={32} /></div>
              <div className="stat-number">43+</div>
              <div className="stat-label">Üniversite Yerleşimi</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-icon"><Target size={32} /></div>
              <div className="stat-number">20+</div>
              <div className="stat-label">Farklı Bölüm</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-icon"><Globe size={32} /></div>
              <div className="stat-number">Türkiye Geneli</div>
              <div className="stat-label">Üniversite Başarıları</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-icon"><Award size={32} /></div>
              <div className="stat-number">3</div>
              <div className="stat-label">Kariyer Alanları</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Student Placement Grid */}
      <section className="honor-section">
        <div className="container">
          <div className="filter-bar">
            <div className="filter-group">
              <label htmlFor="category-filter">Kategori:</label>
              <select 
                id="category-filter" 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">Tümü</option>
                <option value="health">Sağlık</option>
                <option value="aviation">Havacılık</option>
                <option value="technology">Teknoloji</option>
                <option value="other">Diğer</option>
              </select>
            </div>
          </div>
          <div className="students-grid">
            {filteredStudents.map((student, index) => (
              <div key={index} className="student-card glass-card">
                <div className="student-avatar">
                  <div className="avatar-initials">{getInitials(student.name)}</div>
                </div>
                <div className={`category-badge ${getCategoryClass(student.category)}`}>
                  {getCategoryIcon(student.category)}
                  <span>{getCategoryLabel(student.category)}</span>
                </div>
                <div className="student-name">{student.name}</div>
                <div className="student-university">{student.university}</div>
                <div className="student-department">{student.department}</div>
                <div className="student-achievement">
                  <Award size={16} />
                  <span>Üniversite Başarısı</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="honor-final-cta">
        <div className="cta-overlay"></div>
        <div className="container relative-z text-center">
          <h2>Senin Başarı Hikayen de Burada Başlayabilir</h2>
          <p>Kokpit Okulları ile geleceğine güçlü bir adım atmak için tanıtım randevusu al.</p>
          <div className="honor-hero-actions justify-center">
            <Link to="/iletisim" className="btn-primary-glow">
              <Calendar size={18} style={{ marginRight: '8px' }} /> Tanıtım Randevusu Al
            </Link>
            <Link to="/iletisim" className="btn-glass">
              <Send size={18} style={{ marginRight: '8px' }} /> Bursluluk Başvurusu
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HonorBoardPage;
