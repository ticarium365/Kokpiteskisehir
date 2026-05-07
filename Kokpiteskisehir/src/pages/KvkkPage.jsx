import SEO from '../components/SEO';
import { Shield, CheckCircle2, AlertCircle, FileText, Mail, Phone } from 'lucide-react';
import './KvkkPage.css';

const KvkkPage = () => {
  return (
    <div className="kvkk-page-container">
      <SEO 
        title="KVKK ve Aydınlatma Metni"
        description="Kokpit Okulları KVKK ve aydınlatma metni. Kişisel verilerin korunması ve gizlilik politikası."
        keywords="KVKK, aydınlatma metni, gizlilik politikası, kişisel verilerin korunması"
      />
      
      {/* Hero Section */}
      <section className="kvkk-hero-section">
        <div className="kvkk-hero-bg"></div>
        <div className="kvkk-hero-overlay"></div>
        <div className="container relative-z">
          <div className="kvkk-hero-content">
            <div className="kvkk-badge">Yasal Bilgiler</div>
            <h1 className="kvkk-hero-title">KVKK ve Aydınlatma Metni</h1>
            <p className="kvkk-hero-subtitle">
              Kişisel verilerinizin korunması ve gizlilik politikamız hakkında bilgi alın.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="kvkk-section">
        <div className="container">
          <div className="kvkk-content-wrapper">
            <div className="kvkk-main-content glass-panel">
              <div className="kvkk-section-header">
                <Shield size={32} />
                <h2>Kişisel Verilerin Korunması Hakkında</h2>
              </div>

              <div className="kvkk-text-block">
                <p>
                  Kokpit Okulları olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, 
                  kişisel verilerinizin güvenliği ve gizliliği en üst düzeyde önemsemekteyiz. 
                  Bu aydınlatma metni, kişisel verilerinizin nasıl işlendiği, korunması ve kullanımı hakkında bilgi vermektedir.
                </p>
              </div>

              <div className="kvkk-section-header">
                <FileText size={32} />
                <h2>Veri İşleme Amaçları</h2>
              </div>

              <div className="kvkk-list-block">
                <ul>
                  <li>
                    <CheckCircle2 size={20} />
                    <span>Öğrenci kayıt ve kabul işlemleri</span>
                  </li>
                  <li>
                    <CheckCircle2 size={20} />
                    <span>Eğitim öğretim faaliyetlerinin yürütülmesi</span>
                  </li>
                  <li>
                    <CheckCircle2 size={20} />
                    <span>Veli iletişim ve bilgilendirme</span>
                  </li>
                  <li>
                    <CheckCircle2 size={20} />
                    <span>Öğrenci gelişim takibi ve rehberlik</span>
                  </li>
                  <li>
                    <CheckCircle2 size={20} />
                    <span>Mali işlemler ve ödeme takibi</span>
                  </li>
                  <li>
                    <CheckCircle2 size={20} />
                    <span>Mezuniyet ve iş yerleştirme hizmetleri</span>
                  </li>
                </ul>
              </div>

              <div className="kvkk-section-header">
                <AlertCircle size={32} />
                <h2>Verilerin Toplanma Yöntemi</h2>
              </div>

              <div className="kvkk-text-block">
                <p>
                  Kişisel verileriniz, aşağıdaki yöntemlerle toplanmaktadır:
                </p>
                <ul className="kvkk-inner-list">
                  <li>• Öğrenci kayıt formu ve başvuru formları aracılığıyla</li>
                  <li>• Veli görüşmeleri ve iletişim kanalları aracılığıyla</li>
                  <li>• Okul içi faaliyetler ve etkinlikler sırasında</li>
                  <li>• Web sitemiz ve dijital platformlar üzerinden</li>
                  <li>• Yazılı ve sözlü beyanlar aracılığıyla</li>
                </ul>
              </div>

              <div className="kvkk-section-header">
                <Shield size={32} />
                <h2>Verilerin Saklama Süresi</h2>
              </div>

              <div className="kvkk-text-block">
                <p>
                  Kişisel verileriniz, ilgili amaç için gerekli olan süre boyunca saklanacaktır. 
                  KVKK kapsamında belirlenen saklama sürelerine uyulmakta, amaç gerçekleştiğinde 
                  veya gereklilik ortadan kalktığında veriler silinmekte veya anonimleştirilmektedir.
                </p>
              </div>

              <div className="kvkk-section-header">
                <AlertCircle size={32} />
                <h2>Verilerin Aktarımı</h2>
              </div>

              <div className="kvkk-text-block">
                <p>
                  Kişisel verileriniz, KVKK'nın 8. ve 9. maddelerinde belirtilen koşullar çerçevesinde,
                  yurt içi ve yurt dışındaki ilgili kurum ve kuruluşlarla aktarılabilmektedir.
                </p>
              </div>

              <div className="kvkk-section-header">
                <Shield size={32} />
                <h2>Haklarınız</h2>
              </div>

              <div className="kvkk-text-block">
                <p>
                  KVKK kapsamında, kişisel verileriniz üzerinde aşağıdaki haklara sahipsiniz:
                </p>
                <ul className="kvkk-inner-list">
                  <li>• Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>• Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                  <li>• Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı kişileri bilme</li>
                  <li>• Kişisel verilerinizin eksik veya yanlış işlenmesi halinde düzeltilmesini isteme</li>
                  <li>• Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                  <li>• Otomatik sistemlerle analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkması durumunda itiraz etme</li>
                  <li>• Kanuna aykırı olarak işlenmesi sonucunda zarara uğramanız halinde tazmin talep etme</li>
                </ul>
              </div>

              <div className="kvkk-notice-block">
                <AlertCircle size={24} />
                <div>
                  <h4>Başvuru Yöntemleri</h4>
                  <p>
                    Haklarınızı kullanmak için aşağıdaki yöntemlerle başvurabilirsiniz:
                  </p>
                </div>
              </div>

              <div className="kvkk-contact-grid">
                <div className="kvkk-contact-card glass-card">
                  <Mail size={32} />
                  <h3>E-posta</h3>
                  <p>kvkk@kokpitokullari.com</p>
                </div>
                <div className="kvkk-contact-card glass-card">
                  <Phone size={32} />
                  <h3>Telefon</h3>
                  <p>(0222) 260 00 00</p>
                </div>
                <div className="kvkk-contact-card glass-card">
                  <FileText size={32} />
                  <h3>Adres</h3>
                  <p>Şeker Mh. Gazi Yakup Satar Cd. No:90, 26120 Tepebaşı/Eskişehir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="kvkk-footer-section">
        <div className="container">
          <div className="kvkk-footer-note glass-panel">
            <p>
              Bu aydınlatma metni, Kokpit Okulları tarafından hazırlanmış olup, 
              KVKK kapsamında kişisel verilerin işlenmesi hakkında bilgi vermektedir. 
              Metinde yapılan değişiklikler web sitemizde yayınlanacaktır.
            </p>
            <p className="kvkk-footer-date">
              Son Güncelleme: Ocak 2024
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KvkkPage;
