# Kokpit Okulları - Proje Dokümantasyonu

## Proje Özeti

Kokpit Okulları, Eskişehir, Kocaeli ve Muğla kampüslerinde havacılık, sağlık, yazılım ve genel lise eğitimi veren özel bir eğitim kurumu için geliştirilmiş modern bir web sitesidir.

---

## 1. Tema ve Tasarım Dili

### Renk Paleti
- **Ana Renk (Secondary):** `#FF204E` (Kırmızı) - Havacılık ve enerjiyi temsil eder
- **Havacılık Okulu:** `#FF204E` (Kırmızı)
- **Sağlık Okulu:** `#00B4D8` (Mavi)
- **Yazılım Koleji:** `#00C896` (Yeşil)
- **Arka Plan:** `#07101A` (Koyu lacivert/siyah)
- **Metin:** Beyaz ve açık gri tonları

### Tasarım Stili
- **Dark Mode:** Tüm site koyu tema üzerine kurulu
- **Glassmorphism:** Cam efektli kartlar ve paneller (`glass-card`, `glass-panel`, `glass-input`, `glass-textarea`)
- **Modern ve Profesyonel:** Kurumsal ama öğrenci dostu
- **Animasyonlar:** Hover efektleri, yavaş zoom animasyonları, smooth transitions

---

## 2. UX/UI Tasarım

### Navigasyon Yapısı

#### Ana Menü (Header)
- **Logo:** Sol tarafta, home'a yönlendirir
- **Ana Menü Öğeleri:**
  - Anasayfa
  - Kurumsal (Dropdown)
    - Hakkımızda
    - Vizyon & Misyon
    - Hedeflerimiz
    - Eğitim Kadromuz
    - İnsan Kaynakları
  - Eğitim
  - Okullarımız
  - Bölümlerimiz
  - Akademik Takvim (Tek başına link)
  - Onur Tablomuz
  - Galeri (Dropdown)
    - Foto Galeri
    - Video Galeri
  - Medya (Dropdown)
    - Haberler
    - Duyurular
    - Etkinlikler
    - Basın
  - Ziyaretçi Defteri
  - İletişim
- **Giriş (Dropdown):**
  - Öğrenci / Veli Girişi
  - Öğretmen Girişi

#### Responsive Tasarım
- **Desktop:** Full navigation with dropdowns
- **Tablet:** Hamburger menu, grid 2 sütun
- **Mobile:** Hamburger menu, grid 1 sütun, stacked layout

### Bileşenler

#### Ortak Bileşenler (`src/components/`)
- **Header.jsx:** Ana navigasyon, mobil menu, scroll detection
- **Footer.jsx:** Alt bilgi, sosyal medya linkleri, hızlı linkler
- **SEO.jsx:** Her sayfa için dinamik SEO meta tags
- **AcademicCalendar.jsx:** Akademik takvim bileşeni

#### Özel Bileşenler
- **Glass Cards:** `glass-card` class ile cam efektli kartlar
- **Glass Panels:** `glass-panel` class ile cam efektli paneller
- **Glass Inputs:** Form inputları için cam efekt
- **Buttons:** 
  - `btn-primary-glow` - Ana buton
  - `btn-secondary-glow` - İkincil buton
  - `btn-header-glass` - Header butonları

---

## 3. İçerik Yapısı

### Sayfalar (`src/pages/`)

#### 1. HomePage (Anasayfa)
- **Hero Section:** Ana başlık, CTA butonları
- **Features Section:** Okul özellikleri (Havacılık, Sağlık, Yazılım)
- **Educational Pathways:** Eğitim yolları
- **Careers Section:** Kariyer fırsatları
- **Success Stories:** Başarı hikayeleri
- **Testimonials:** Öğrenci yorumları
- **Campus Life:** Kampüs hayatı
- **Final CTA:** Tanıtım randevusu formu

#### 2. AboutPage (Hakkımızda)
- Hero Section
- Okul Hakkında
- Vizyon & Misyon
- Değerler
- Campus Tour (Kampüs turu bölümü)

#### 3. HedeflerimizPage (Hedeflerimiz)
- Hero Section
- Misyon & Vizyon
- Stratejik Hedefler
- Yol Haritası
- Temel Değerler
- Final CTA

#### 4. EgitimPage (Eğitim)
- Hero Section
- Eğitim Avantajları
- Program Grid (İHA programı dahil)
- Final CTA

#### 5. OkullarimizPage (Okullarımız)
- Hero Section
- **3 Kampüs Kartı:**
  - Eskişehir (Yesevi) Kampüsü
    - Havacılık Lisesi
    - Sağlık Lisesi
    - Anadolu Lisesi
    - Yazılım Lisesi
  - Kocaeli Kampüsü
    - Mesleki Teknik Anadolu Lisesi
    - Anadolu Lisesi
    - Ortaokul
    - İlkokul
  - Muğla Kampüsü
    - Mesleki Teknik Anadolu Lisesi
    - Sağlık Lisesi
    - Anadolu Lisesi
- Kampüs Olanakları (4 özellik kartı)
- Final CTA

#### 6. BolumlerimizPage (Bölümlerimiz)
- Hero Section
- Okul Filtresi (Tab navigation)
- Bölüm Grid (Havacılık, Sağlık, Yazılım bölümleri)
- Info Panel
- Final CTA

#### 7. EgitimKadromuzPage (Eğitim Kadromuz)
- Hero Section
- İstatistikler
- Öğretmen Grid
- Değerler Bölümü
- Final CTA

#### 8. InsanKaynaklariPage (İnsan Kaynakları)
- Hero Section
- Avantajlar Grid
- Açık Pozisyonlar
- Başvuru Süreci
- Final CTA

#### 9. HonorBoardPage (Onur Tablomuz)
- Hero Section
- Öğrenci Başarıları Grid
- Final CTA

#### 10. AkademikTakvimPage (Akademik Takvim)
- Hero Section
- AcademicCalendar bileşeni

#### 11. HaberlerPage (Haberler)
- Hero Section
- Haberler Grid

#### 12. DuyurularPage (Duyurular)
- Hero Section
- Duyurular Grid (Öne çıkan duyuru badge'i)

#### 13. EtkinliklerPage (Etkinlikler)
- Hero Section
- Etkinlikler Grid

#### 14. BasinPage (Basın)
- Hero Section
- Basın Haberleri Grid

#### 15. PhotoGalleryPage (Foto Galeri)
- Hero Section
- Fotoğraf Grid (Lightbox ile)

#### 16. VideoGalleryPage (Video Galeri)
- Hero Section
- Video Grid

#### 17. ZiyaretciDefteriPage (Ziyaretçi Defteri)
- Hero Section
- Testimonials Grid
- İletişim Formu
- Kurallar Bölümü

#### 18. KvkkPage (KVKK)
- Hero Section
- KVKK İlkeleri
- Veri İşleme
- Kullanıcı Hakları
- İletişim Bilgileri

#### 19. ContactPage (İletişim)
- Hero Section
- İletişim Formu
- İletişim Bilgileri
- Harita

#### 20. AviationHighSchool (Havacılık Lisesi)
- Hero Section
- Programlar
- Özellikler
- Başarılar
- Final CTA

#### 21. HealthHighSchool (Sağlık Meslek Lisesi)
- Hero Section
- Programlar
- Özellikler
- Başarılar
- Final CTA

#### 22. SoftwareCollege (Matrix Yazılım Koleji)
- Hero Section
- Programlar
- Özellikler
- Başarılar
- Final CTA

#### Login Sayfaları
- **StudentParentLoginPage:** Öğrenci/Veli giriş
- **TeacherLoginPage:** Öğretmen giriş

#### 23. PlaceholderPage
- Henüz içerik eklenmemiş sayfalar için placeholder

---

## 4. Teknik Altyapı

### Teknoloji Stack
- **Framework:** React (Vite)
- **Routing:** React Router
- **Styling:** CSS Modules
- **Icons:** Lucide React
- **Language:** JavaScript (JSX)

### Proje Yapısı
```
src/
├── components/        # Ortak bileşenler
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── SEO.jsx
│   └── AcademicCalendar.jsx
├── pages/            # Sayfa bileşenleri
│   ├── HomePage.jsx
│   ├── AboutPage.jsx
│   ├── OkullarimizPage.jsx
│   └── ... (diğer sayfalar)
├── styles/           # Ortak stiller
│   └── shared.css
├── App.jsx           # Ana routing
├── main.jsx          # Entry point
└── index.css         # Global CSS
```

### Routing Yapısı (App.jsx)
- `/` - HomePage
- `/hakkimizda` - AboutPage
- `/hedeflerimiz` - HedeflerimizPage
- `/egitim` - EgitimPage
- `/okullarimiz` - OkullarimizPage
- `/bolumlerimiz` - BolumlerimizPage
- `/akademik-takvim` - AkademikTakvimPage
- `/onur-tablomuz` - HonorBoardPage
- `/haberler` - HaberlerPage
- `/duyurular` - DuyurularPage
- `/etkinlikler` - EtkinliklerPage
- `/basin` - BasinPage
- `/foto-galeriler` - PhotoGalleryPage
- `/video-galeri` - VideoGalleryPage
- `/ziyaretci-defteri` - ZiyaretciDefteriPage
- `/kvkk-ve-aydinlatma-metni` - KvkkPage
- `/iletisim` - ContactPage
- `/havacilik-lisesi` - AviationHighSchool
- `/saglik-meslek-lisesi` - HealthHighSchool
- `/matrix-yazilim-koleji` - SoftwareCollege
- `/ogrenci-veli-giris` - StudentParentLoginPage
- `/ogretmen-giris` - TeacherLoginPage

---

## 5. CSS Sınıfları

### Global CSS Değişkenleri (index.css)
```css
--color-bg: #07101a
--color-secondary: #FF204E
--color-text: #ffffff
```

### Ortak CSS Sınıfları (shared.css)
- `.container` - Ortak container
- `.relative-z` - Z-index kontrolü
- `.text-center` - Metin ortala
- `.glass-card` - Cam efektli kart
- `.glass-panel` - Cam efektli panel
- `.glass-input` - Cam efektli input
- `.glass-textarea` - Cam efektli textarea
- `.btn-primary-glow` - Ana buton
- `.btn-secondary-glow` - İkincil buton

---

## 6. Önemli Notlar

### Blog Yapısı
- Blog/News yapısı "kurumsal" görünümünden kaçınmak için 4 ayrı sayfaya bölündü:
  - Haberler
  - Duyurular
  - Etkinlikler
  - Basın
- "Medya" dropdown altında gruplandırıldı

### Akademik Takvim
- "Akademik Takvim" linki "Hakkımızda" dropdown'ından çıkarıldı
- Ana menüde bağımsız bir link olarak eklendi
- `/akademik-takvim` route'u oluşturuldu
- AkademikTakvimPage.jsx oluşturuldu

### Okullarımız Sayfası
- 3 kampüs (Eskişehir, Kocaeli, Muğla)
- Her kampüs için okul listesi, adres, e-posta, telefon
- Glassmorphism efektli kartlar
- Responsive grid layout

### SEO
- Her sayfa için SEO bileşeni kullanılır
- Dinamik title, description, keywords

---

## 7. Geliştirme Notları

### Başlangıç
```bash
npm install
npm run dev
```

### Port
- Development server: `http://localhost:5173/`

### Sorunlar ve Çözümler
- **Port Çakışması:** Eğer 5173 portu kullanımdaysa, process'i kill edip yeniden başlatın
- **Boş Sayfa:** Import hatalarını kontrol edin (özellikle icon importları)
- **CSS Çakışması:** Aynı isimli CSS sınıflarını farklı isimlendirin

---

## 8. Dağıtım

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Hosting
- Vercel, Netlify veya benzeri platformlara deploy edilebilir
- Build klasörü (`dist`) statik hosting'e yüklenir

---

## 9. İletişim Bilgileri

### Kampüsler

#### Eskişehir (Yesevi) Kampüsü
- Adres: Şeker Mah. Gazi Yakup Satar Cd. No:90 26120 Tepebaşı-Eskişehir
- E-Mail: bilgi@kokpitokullari.com
- Telefon: 0222 260 00 00

#### Kocaeli Kampüsü
- Adres: Barbaros Mah. Mahmut Çavuş Caddesi No: 13 Başiskele-Kocaeli
- E-Mail: info@kokpitkoleji.com
- Telefon: 0262 41 434 41

#### Muğla Kampüsü
- Adres: Köprübaşı Mah. Şebboy Sokak No:1 Ula/ Muğla
- E-Mail: bilgi@kokpitokullari.com
- Telefon: 0252 242 20 51 – 52 – 53

---

## 10. Sonraki Adımlar

### Eksik Sayfalar
- Haber detay sayfaları (`/haberler/:slug`)
- Duyuru detay sayfaları (`/duyurular/:slug`)
- Etkinlik detay sayfaları (`/etkinlikler/:slug`)
- Basın detay sayfaları (`/basin/:slug`)

### İyileştirmeler
- Lightbox galeri entegrasyonu
- Form validation
- API entegrasyonu (gerçek veri)
- CMS entegrasyonu
- SEO optimizasyonu
- Performance optimizasyonu

---

*Dokümantasyon Tarihi: 7 Mayıs 2026*
*Versiyon: 1.0*
