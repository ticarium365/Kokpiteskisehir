import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HealthHighSchool from './pages/HealthHighSchool'
import AviationHighSchool from './pages/AviationHighSchool'
import SoftwareCollege from './pages/SoftwareCollege'
import HonorBoardPage from './pages/HonorBoardPage'
import PhotoGalleryPage from './pages/PhotoGalleryPage'
import VideoGalleryPage from './pages/VideoGalleryPage'
import NewsPage from './pages/NewsPage'
import NewsDetailPage from './pages/NewsDetailPage'
import StudentParentLoginPage from './pages/StudentParentLoginPage'
import TeacherLoginPage from './pages/TeacherLoginPage'
import HaberlerPage from './pages/HaberlerPage'
import DuyurularPage from './pages/DuyurularPage'
import EtkinliklerPage from './pages/EtkinliklerPage'
import BasinPage from './pages/BasinPage'
import AkademikTakvimPage from './pages/AkademikTakvimPage'
import KvkkPage from './pages/KvkkPage'
import ZiyaretciDefteriPage from './pages/ZiyaretciDefteriPage'
import BolumlerimizPage from './pages/BolumlerimizPage'
import OkullarimizPage from './pages/OkullarimizPage'
import EgitimPage from './pages/EgitimPage'
import HedeflerimizPage from './pages/HedeflerimizPage'
import EgitimKadromuzPage from './pages/EgitimKadromuzPage'
import InsanKaynaklariPage from './pages/InsanKaynaklariPage'
import PlaceholderPage from './pages/PlaceholderPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        {/* Kurumsal */}
        <Route path="hakkimizda" element={<AboutPage />} />
        <Route path="insan-kaynaklari" element={<InsanKaynaklariPage />} />
        <Route path="egitim-kadromuz" element={<EgitimKadromuzPage />} />
        <Route path="hedeflerimiz" element={<HedeflerimizPage />} />
        
        {/* Diğer Menüler */}
        <Route path="egitim" element={<EgitimPage />} />
        <Route path="okullarimiz" element={<OkullarimizPage />} />
        <Route path="bolumlerimiz" element={<BolumlerimizPage />} />
        <Route path="akademik-takvim" element={<AkademikTakvimPage />} />
        <Route path="onur-tablomuz" element={<HonorBoardPage />} />
        <Route path="haberler" element={<HaberlerPage />} />
        <Route path="duyurular" element={<DuyurularPage />} />
        <Route path="etkinlikler" element={<EtkinliklerPage />} />
        <Route path="basin" element={<BasinPage />} />
        <Route path="ziyaretci-defteri" element={<ZiyaretciDefteriPage />} />
        
        {/* Galeri */}
        <Route path="foto-galeri" element={<PhotoGalleryPage />} />
        <Route path="foto-galeriler" element={<PhotoGalleryPage />} />
        <Route path="video-galeri" element={<VideoGalleryPage />} />
        
        {/* Liseler ve Bölümler */}
        <Route path="saglik-meslek-lisesi" element={<HealthHighSchool />} />
        <Route path="havacilik-lisesi" element={<AviationHighSchool />} />
        <Route path="matrix-yazilim-koleji" element={<SoftwareCollege />} />
        <Route path="bolum/2/hemsire-yardimciligi" element={<HealthHighSchool />} />
        <Route path="bolum/3/ebe-yardimciligi" element={<HealthHighSchool />} />
        <Route path="bolum/6/saglik-bakim-teknisyenligi" element={<HealthHighSchool />} />
        
        {/* Footer & İletişim */}
        <Route path="iletisim" element={<ContactPage />} />
        <Route path="kvkk-ve-aydinlatma-metni" element={<KvkkPage />} />
        
        {/* Login Pages */}
        <Route path="ogrenci-veli-giris" element={<StudentParentLoginPage />} />
        <Route path="ogretmen-giris" element={<TeacherLoginPage />} />
      </Route>
    </Routes>
  )
}

export default App
