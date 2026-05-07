import { useState, useEffect } from "react";

interface SayfaIcerigi {
  sayfa: string;
  baslik: string;
  altBaslik: string | null;
  icerik: string;
  ekIcerik: string | null;
  resimUrl: string | null;
}

const SAYFALAR = [
  { key: "hakkimizda", label: "Hakkımızda", icon: "🏫", aciklama: "Okulun genel tanıtım sayfası" },
  { key: "misyon-vizyon", label: "Misyon & Vizyon", icon: "🎯", aciklama: "Okulun misyon ve vizyon metinleri" },
  { key: "hedeflerimiz", label: "Hedeflerimiz", icon: "📈", aciklama: "Eğitim hedefleri sayfası" },
  { key: "egitim-kadromuz", label: "Eğitim Kadromuz", icon: "👩‍🏫", aciklama: "Öğretmen kadrosu sayfası başlık metni" },
  { key: "okullarimiz", label: "Okullarımız", icon: "🏛️", aciklama: "Bölümler ve okullar sayfası" },
  { key: "iletisim", label: "İletişim Sayfası", icon: "📞", aciklama: "İletişim formu sayfası başlık metni" },
  { key: "kvkk", label: "KVKK Metni", icon: "📋", aciklama: "Kişisel verilerin korunması metni" },
  { key: "insan-kaynaklari", label: "İnsan Kaynakları", icon: "👥", aciklama: "İK ve iş başvurusu sayfası" },
];

export default function SayfaIcerikleriPage() {
  const [secilenSayfa, setSecilenSayfa] = useState(SAYFALAR[0].key);
  const [form, setForm] = useState<Partial<SayfaIcerigi>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`/api/sayfa-icerikleri/${secilenSayfa}`, { credentials: "include" })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        setForm(d || { sayfa: secilenSayfa, baslik: "", icerik: "" });
        setLoading(false);
      })
      .catch(() => { setForm({ sayfa: secilenSayfa, baslik: "", icerik: "" }); setLoading(false); });
  }, [secilenSayfa]);

  async function save() {
    setSaving(true); setError(""); setSaved(false);
    try {
      const res = await fetch(`/api/sayfa-icerikleri/${secilenSayfa}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Hata"); return; }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally { setSaving(false); }
  }

  const secili = SAYFALAR.find(p => p.key === secilenSayfa)!;

  return (
    <div className="flex gap-6">
      <div className="w-56 shrink-0">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sayfalar</p>
          </div>
          <nav className="py-1">
            {SAYFALAR.map(s => (
              <button
                key={s.key}
                onClick={() => { setSecilenSayfa(s.key); setSaved(false); }}
                className={`w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${secilenSayfa === s.key ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <span>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{secili.icon} {secili.label}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{secili.aciklama}</p>
          </div>
          <button
            onClick={save}
            disabled={saving || loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi!" : "Kaydet"}
          </button>
        </div>

        {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}

        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm">Yükleniyor...</div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlık *</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.baslik || ""} onChange={e => setForm(f => ({ ...f, baslik: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.altBaslik || ""} onChange={e => setForm(f => ({ ...f, altBaslik: e.target.value || null }))} placeholder="Kısa açıklama veya özet..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ana İçerik *</label>
              <textarea rows={8} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" value={form.icerik || ""} onChange={e => setForm(f => ({ ...f, icerik: e.target.value }))} placeholder="Sayfa içeriğini buraya yazın..." />
              <p className="text-xs text-gray-400 mt-1">HTML etiketleri kullanabilirsiniz: &lt;b&gt;, &lt;br&gt;, &lt;ul&gt;, &lt;li&gt; vb.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ek İçerik</label>
              <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" value={form.ekIcerik || ""} onChange={e => setForm(f => ({ ...f, ekIcerik: e.target.value || null }))} placeholder="İkinci bölüm içeriği (opsiyonel)..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kapak Resmi URL</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.resimUrl || ""} onChange={e => setForm(f => ({ ...f, resimUrl: e.target.value || null }))} placeholder="https://..." />
              {form.resimUrl && <img src={form.resimUrl} alt="" className="mt-2 h-24 object-cover rounded-lg" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
