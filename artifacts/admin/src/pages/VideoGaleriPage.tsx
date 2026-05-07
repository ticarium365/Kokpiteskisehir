import { useState, useEffect, useCallback } from "react";
import ContentTable from "@/components/ContentTable";
import Modal from "@/components/Modal";

interface VideoGaleri {
  id: number;
  baslik: string;
  youtubeId: string;
  kategori: string;
  yayinda: boolean;
  sira: number;
}

const bos = { baslik: "", youtubeId: "", kategori: "genel", yayinda: true, sira: 0 };

function youtubeIdCikar(girdi: string): string {
  if (!girdi) return "";
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = girdi.match(p);
    if (m) return m[1];
  }
  return girdi;
}

export default function VideoGaleriPage() {
  const [data, setData] = useState<VideoGaleri[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"ekle" | "duzenle" | null>(null);
  const [form, setForm] = useState<Partial<VideoGaleri>>(bos);
  const [youtubeGirdi, setYoutubeGirdi] = useState("");
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [hata, setHata] = useState("");

  const yukle = useCallback(async () => {
    setLoading(true);
    const r = await fetch("/api/video-galeri", { credentials: "include" });
    setData(await r.json());
    setLoading(false);
  }, []);

  useEffect(() => { yukle(); }, [yukle]);

  function ekleAc() { setForm({ ...bos }); setYoutubeGirdi(""); setModal("ekle"); setHata(""); }
  function duzenleAc(row: Record<string, unknown>) {
    const v = row as unknown as VideoGaleri;
    setForm(v); setYoutubeGirdi(v.youtubeId || "");
    setModal("duzenle"); setHata("");
  }

  function youtubeGirdiDegisti(deger: string) {
    setYoutubeGirdi(deger);
    const id = youtubeIdCikar(deger);
    setForm(f => ({ ...f, youtubeId: id }));
  }

  async function kaydet() {
    setKaydediliyor(true); setHata("");
    try {
      const url = modal === "duzenle" ? `/api/video-galeri/${form.id}` : "/api/video-galeri";
      const method = modal === "duzenle" ? "PATCH" : "POST";
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(form) });
      if (!r.ok) { const d = await r.json(); setHata(d.error || "Bir hata oluştu"); return; }
      setModal(null); yukle();
    } finally { setKaydediliyor(false); }
  }

  async function sil(row: Record<string, unknown>) {
    await fetch(`/api/video-galeri/${row.id}`, { method: "DELETE", credentials: "include" });
    yukle();
  }

  const kolonlar = [
    {
      key: "youtubeId", label: "Önizleme",
      render: (v: unknown) => <img src={`https://img.youtube.com/vi/${v}/mqdefault.jpg`} alt="" className="w-20 h-12 object-cover rounded-lg" />
    },
    { key: "baslik", label: "Video Başlığı", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    {
      key: "youtubeId", label: "YouTube",
      render: (v: unknown) => <a href={`https://youtube.com/watch?v=${v}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs">İzle →</a>
    },
    { key: "kategori", label: "Kategori", render: (v: unknown) => <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded text-xs capitalize">{String(v)}</span> },
    { key: "yayinda", label: "Durum", render: (v: unknown) => <span className={`px-2 py-0.5 rounded text-xs font-medium ${v ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Görünür" : "Gizli"}</span> },
  ];

  return (
    <>
      <ContentTable
        title="Video Galerisi" data={data as unknown as Record<string, unknown>[]}
        columns={kolonlar} loading={loading} onAdd={ekleAc} onEdit={duzenleAc} onDelete={sil}
        addLabel="Video Ekle"
        description="YouTube videolarınızı buraya ekleyin. Sadece YouTube linkini yapıştırmanız yeterli."
      />
      {modal && (
        <Modal title={modal === "ekle" ? "Yeni Video" : "Videoyu Düzenle"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {hata && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{hata}</div>}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video Başlığı *</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.baslik || ""} onChange={e => setForm(f => ({ ...f, baslik: e.target.value }))} placeholder="Videonun başlığını yazın..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Linki *</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={youtubeGirdi}
                onChange={e => youtubeGirdiDegisti(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <p className="text-xs text-gray-400 mt-1">YouTube sayfasından kopyaladığınız linki yapıştırın.</p>
              {form.youtubeId && (
                <div className="mt-3 rounded-xl overflow-hidden border border-gray-200">
                  <img src={`https://img.youtube.com/vi/${form.youtubeId}/hqdefault.jpg`} alt="Önizleme" className="w-full object-cover max-h-44" />
                  <div className="px-3 py-2 bg-gray-50 text-xs text-gray-500 flex items-center gap-2">
                    <span>🎬</span> Video bulundu
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.kategori || "genel"} onChange={e => setForm(f => ({ ...f, kategori: e.target.value }))}>
                  <option value="genel">Genel</option>
                  <option value="havacilik">Havacılık</option>
                  <option value="yazilim">Yazılım</option>
                  <option value="saglik">Sağlık</option>
                  <option value="etkinlik">Etkinlik</option>
                  <option value="tanitim">Tanıtım</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sıra Numarası</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.sira ?? 0} onChange={e => setForm(f => ({ ...f, sira: Number(e.target.value) }))} />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.yayinda ?? true} onChange={e => setForm(f => ({ ...f, yayinda: e.target.checked }))} className="rounded" />
              Galeride göster
            </label>

            <div className="flex gap-3 pt-2">
              <button onClick={kaydet} disabled={kaydediliyor} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg">{kaydediliyor ? "Kaydediliyor..." : "Kaydet"}</button>
              <button onClick={() => setModal(null)} className="px-5 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">İptal</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
