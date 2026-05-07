import { useState, useEffect, useCallback } from "react";

interface Ayar {
  anahtar: string;
  deger: string;
}

const AYAR_GRUPLARI = [
  {
    grup: "Okul Bilgileri",
    icon: "🏫",
    ayarlar: [
      { anahtar: "okul_adi", label: "Okulun Adı", tip: "text", placeholder: "Kokpit Okulları" },
      { anahtar: "okul_slogan", label: "Slogan", tip: "text", placeholder: "Geleceği Birlikte İnşa Ediyoruz", aciklama: "Ana sayfada gösterilecek kısa slogan" },
      { anahtar: "kurulis_yili", label: "Kuruluş Yılı", tip: "text", placeholder: "2015" },
    ],
  },
  {
    grup: "İletişim Bilgileri",
    icon: "📞",
    ayarlar: [
      { anahtar: "adres", label: "Adres", tip: "textarea", placeholder: "Örnek Mah. Atatürk Cad. No:1, Eskişehir" },
      { anahtar: "telefon", label: "Telefon", tip: "text", placeholder: "0222 123 45 67" },
      { anahtar: "telefon2", label: "İkinci Telefon", tip: "text", placeholder: "0532 000 00 00" },
      { anahtar: "email", label: "E-posta", tip: "text", placeholder: "info@kokpitokullari.com" },
      { anahtar: "harita_url", label: "Google Harita Bağlantısı", tip: "text", placeholder: "https://maps.google.com/...", aciklama: "Google Maps'ten 'Haritayı Paylaş > Haritayı Göm' bölümündeki src değeri" },
    ],
  },
  {
    grup: "Sosyal Medya",
    icon: "📱",
    ayarlar: [
      { anahtar: "instagram_url", label: "Instagram", tip: "text", placeholder: "https://instagram.com/kokpitokullari" },
      { anahtar: "facebook_url", label: "Facebook", tip: "text", placeholder: "https://facebook.com/kokpitokullari" },
      { anahtar: "twitter_url", label: "Twitter / X", tip: "text", placeholder: "https://twitter.com/kokpitokullari" },
      { anahtar: "youtube_url", label: "YouTube", tip: "text", placeholder: "https://youtube.com/..." },
      { anahtar: "whatsapp_no", label: "WhatsApp Numarası", tip: "text", placeholder: "+905220000000", aciklama: "Başında + ve ülke kodu ile yazın" },
    ],
  },
  {
    grup: "Arama Motoru Ayarları",
    icon: "🔍",
    ayarlar: [
      { anahtar: "meta_aciklama", label: "Site Açıklaması", tip: "textarea", placeholder: "Kokpit Okulları, havacılık, yazılım ve sağlık alanlarında...", aciklama: "Google aramasında görünür. En fazla 160 karakter yazın." },
      { anahtar: "meta_anahtar_kelimeler", label: "Anahtar Kelimeler", tip: "text", placeholder: "kokpit okul, havacılık, eskişehir", aciklama: "Virgülle ayırarak yazın" },
    ],
  },
];

export default function SiteAyarlariPage() {
  const [ayarlar, setAyarlar] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [kaydedildi, setKaydedildi] = useState(false);
  const [hata, setHata] = useState("");

  const yukle = useCallback(async () => {
    setLoading(true);
    const r = await fetch("/api/site-ayarlari", { credentials: "include" });
    const data: Ayar[] = await r.json();
    const map: Record<string, string> = {};
    data.forEach(a => { map[a.anahtar] = a.deger; });
    setAyarlar(map);
    setLoading(false);
  }, []);

  useEffect(() => { yukle(); }, [yukle]);

  async function kaydet() {
    setKaydediliyor(true); setHata(""); setKaydedildi(false);
    try {
      const r = await fetch("/api/site-ayarlari/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(ayarlar),
      });
      if (!r.ok) { setHata("Kaydedilemedi, lütfen tekrar deneyin."); return; }
      setKaydedildi(true);
      setTimeout(() => setKaydedildi(false), 3000);
    } finally { setKaydediliyor(false); }
  }

  function degerDegistir(anahtar: string, deger: string) {
    setAyarlar(prev => ({ ...prev, [anahtar]: deger }));
  }

  if (loading) return <div className="text-gray-400 text-sm p-6">Yükleniyor...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Site Ayarları</h2>
          <p className="text-sm text-gray-500 mt-1">Okul bilgileri, iletişim ve sosyal medya ayarları</p>
        </div>
        <button
          onClick={kaydet}
          disabled={kaydediliyor}
          className={`px-5 py-2 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
            kaydedildi ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
          } disabled:opacity-60`}
        >
          {kaydedildi ? "✓ Kaydedildi!" : kaydediliyor ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </button>
      </div>

      {hata && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{hata}</div>}

      <div className="space-y-5">
        {AYAR_GRUPLARI.map(grup => (
          <div key={grup.grup} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <span>{grup.icon}</span>
              <h3 className="font-semibold text-gray-800 text-sm">{grup.grup}</h3>
            </div>
            <div className="p-6 space-y-4">
              {grup.ayarlar.map(a => (
                <div key={a.anahtar}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{a.label}</label>
                  {a.tip === "textarea" ? (
                    <textarea
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={ayarlar[a.anahtar] || ""}
                      onChange={e => degerDegistir(a.anahtar, e.target.value)}
                      placeholder={a.placeholder}
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={ayarlar[a.anahtar] || ""}
                      onChange={e => degerDegistir(a.anahtar, e.target.value)}
                      placeholder={a.placeholder}
                    />
                  )}
                  {a.aciklama && <p className="text-xs text-gray-400 mt-1">{a.aciklama}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
