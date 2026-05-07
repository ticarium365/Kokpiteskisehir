import { useState, useEffect, useCallback } from "react";

interface Ayar {
  anahtar: string;
  deger: string;
  aciklama?: string;
}

const AYAR_GRUPLARI = [
  {
    grup: "Genel Bilgiler",
    icon: "🏫",
    ayarlar: [
      { anahtar: "okul_adi", label: "Okul Adı", tip: "text", aciklama: "Site başlığında ve logoda görünür" },
      { anahtar: "okul_slogan", label: "Slogan", tip: "text", aciklama: "Ana sayfada görünür kısa slogan" },
      { anahtar: "okul_logo_url", label: "Logo URL", tip: "text", aciklama: "Logo resmi için URL" },
      { anahtar: "kurulis_yili", label: "Kuruluş Yılı", tip: "text" },
    ],
  },
  {
    grup: "İletişim Bilgileri",
    icon: "📞",
    ayarlar: [
      { anahtar: "adres", label: "Adres", tip: "textarea", aciklama: "Tam okul adresi" },
      { anahtar: "telefon", label: "Telefon", tip: "text" },
      { anahtar: "telefon2", label: "Telefon 2", tip: "text" },
      { anahtar: "email", label: "E-posta", tip: "text" },
      { anahtar: "harita_url", label: "Google Maps Embed URL", tip: "text", aciklama: "Google Maps iframe src değeri" },
    ],
  },
  {
    grup: "Sosyal Medya",
    icon: "📱",
    ayarlar: [
      { anahtar: "instagram_url", label: "Instagram URL", tip: "text" },
      { anahtar: "facebook_url", label: "Facebook URL", tip: "text" },
      { anahtar: "twitter_url", label: "Twitter / X URL", tip: "text" },
      { anahtar: "youtube_url", label: "YouTube Kanal URL", tip: "text" },
      { anahtar: "whatsapp_no", label: "WhatsApp Numarası", tip: "text", aciklama: "Uluslararası format: +905xxxxxxxxx" },
    ],
  },
  {
    grup: "SEO & Meta",
    icon: "🔍",
    ayarlar: [
      { anahtar: "meta_aciklama", label: "Meta Açıklama", tip: "textarea", aciklama: "Arama motorlarında görünen açıklama (max 160 karakter)" },
      { anahtar: "meta_anahtar_kelimeler", label: "Anahtar Kelimeler", tip: "text", aciklama: "Virgülle ayrılmış kelimeler" },
    ],
  },
];

export default function SiteAyarlariPage() {
  const [ayarlar, setAyarlar] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/site-ayarlari", { credentials: "include" });
    const data: Ayar[] = await res.json();
    const map: Record<string, string> = {};
    data.forEach(a => { map[a.anahtar] = a.deger; });
    setAyarlar(map);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function save() {
    setSaving(true); setError(""); setSaved(false);
    try {
      const res = await fetch("/api/site-ayarlari/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(ayarlar),
      });
      if (!res.ok) { setError("Kaydedilemedi"); return; }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally { setSaving(false); }
  }

  function set(anahtar: string, deger: string) {
    setAyarlar(prev => ({ ...prev, [anahtar]: deger }));
  }

  if (loading) return <div className="text-gray-400 text-sm">Yükleniyor...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Site Ayarları</h2>
          <p className="text-sm text-gray-500 mt-1">Genel bilgiler, iletişim ve sosyal medya</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi!" : "Kaydet"}
        </button>
      </div>

      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}

      <div className="space-y-6">
        {AYAR_GRUPLARI.map(grup => (
          <div key={grup.grup} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <span>{grup.icon}</span>
              <h3 className="font-semibold text-gray-800 text-sm">{grup.grup}</h3>
            </div>
            <div className="p-6 space-y-4">
              {grup.ayarlar.map(a => (
                <div key={a.anahtar}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {a.label}
                  </label>
                  {a.tip === "textarea" ? (
                    <textarea
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={ayarlar[a.anahtar] || ""}
                      onChange={e => set(a.anahtar, e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={ayarlar[a.anahtar] || ""}
                      onChange={e => set(a.anahtar, e.target.value)}
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
