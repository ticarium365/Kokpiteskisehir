import { useState, useEffect } from "react";
import DosyaYukle from "@/components/DosyaYukle";

interface SayfaIcerigi {
  sayfa: string;
  baslik: string;
  altBaslik: string | null;
  icerik: string;
  ekIcerik: string | null;
  resimUrl: string | null;
}

const SAYFALAR = [
  { key: "hakkimizda", label: "Hakkımızda", icon: "🏫", aciklama: "Okulun genel tanıtım metni" },
  { key: "misyon-vizyon", label: "Misyon & Vizyon", icon: "🎯", aciklama: "Misyon ve vizyon metinleri" },
  { key: "hedeflerimiz", label: "Hedeflerimiz", icon: "📈", aciklama: "Eğitim hedefleri metni" },
  { key: "egitim-kadromuz", label: "Eğitim Kadromuz", icon: "👩‍🏫", aciklama: "Kadro sayfası başlık ve açıklaması" },
  { key: "okullarimiz", label: "Okullarımız", icon: "🏛️", aciklama: "Bölümler ve okullar sayfası" },
  { key: "iletisim", label: "İletişim", icon: "📞", aciklama: "İletişim sayfası başlık metni" },
  { key: "kvkk", label: "KVKK Metni", icon: "📋", aciklama: "Kişisel verilerin korunması" },
  { key: "insan-kaynaklari", label: "İnsan Kaynakları", icon: "👥", aciklama: "İş başvurusu ve kariyer sayfası" },
];

export default function SayfaIcerikleriPage() {
  const [secilenSayfa, setSecilenSayfa] = useState(SAYFALAR[0].key);
  const [form, setForm] = useState<Partial<SayfaIcerigi>>({});
  const [loading, setLoading] = useState(false);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [kaydedildi, setKaydedildi] = useState(false);
  const [hata, setHata] = useState("");

  useEffect(() => {
    setLoading(true); setHata(""); setKaydedildi(false);
    fetch(`/api/sayfa-icerikleri/${secilenSayfa}`, { credentials: "include" })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        setForm(d || { sayfa: secilenSayfa, baslik: "", icerik: "" });
        setLoading(false);
      })
      .catch(() => { setForm({ sayfa: secilenSayfa, baslik: "", icerik: "" }); setLoading(false); });
  }, [secilenSayfa]);

  async function kaydet() {
    setKaydediliyor(true); setHata(""); setKaydedildi(false);
    try {
      const r = await fetch(`/api/sayfa-icerikleri/${secilenSayfa}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!r.ok) { const d = await r.json(); setHata(d.error || "Bir hata oluştu"); return; }
      setKaydedildi(true);
      setTimeout(() => setKaydedildi(false), 3000);
    } finally { setKaydediliyor(false); }
  }

  const secili = SAYFALAR.find(p => p.key === secilenSayfa)!;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sayfa İçerikleri</h2>
        <p className="text-sm text-gray-500 mt-1">Sol taraftan bir sayfa seçin ve içeriğini düzenleyin.</p>
      </div>

      <div className="flex gap-6">
        <div className="w-52 shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-4">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sayfalar</p>
            </div>
            <nav className="py-1">
              {SAYFALAR.map(s => (
                <button
                  key={s.key}
                  onClick={() => setSecilenSayfa(s.key)}
                  className={`w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                    secilenSayfa === s.key
                      ? "bg-blue-50 text-blue-700 font-medium border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{s.icon}</span>
                  <span className="text-xs">{s.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{secili.icon} {secili.label}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{secili.aciklama}</p>
            </div>
            <button
              onClick={kaydet}
              disabled={kaydediliyor || loading}
              className={`shrink-0 ml-4 px-5 py-2 text-white text-sm font-medium rounded-lg transition-colors ${
                kaydedildi ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
              } disabled:opacity-60`}
            >
              {kaydedildi ? "✓ Kaydedildi!" : kaydediliyor ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>

          {hata && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{hata}</div>}

          {loading ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm">Yükleniyor...</div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <DosyaYukle
                etiket="Kapak Görseli"
                deger={form.resimUrl || null}
                onTamamlandi={yol => setForm(f => ({ ...f, resimUrl: yol || null }))}
                tip="resim"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sayfa Başlığı *</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.baslik || ""}
                  onChange={e => setForm(f => ({ ...f, baslik: e.target.value }))}
                  placeholder="Sayfanın ana başlığı..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.altBaslik || ""}
                  onChange={e => setForm(f => ({ ...f, altBaslik: e.target.value || null }))}
                  placeholder="Başlığın altında görünecek kısa açıklama..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ana Metin *</label>
                <textarea
                  rows={10}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.icerik || ""}
                  onChange={e => setForm(f => ({ ...f, icerik: e.target.value }))}
                  placeholder="Sayfa içeriğini buraya yazın..."
                />
                <p className="text-xs text-gray-400 mt-1">Kalın yapmak için &lt;b&gt;metin&lt;/b&gt;, yeni satır için &lt;br&gt; yazabilirsiniz.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ek Metin <span className="text-gray-400 font-normal">(opsiyonel)</span></label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.ekIcerik || ""}
                  onChange={e => setForm(f => ({ ...f, ekIcerik: e.target.value || null }))}
                  placeholder="İkinci bölüm için ek metin..."
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
