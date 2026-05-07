import { useState, useEffect, useCallback } from "react";
import ContentTable from "@/components/ContentTable";
import Modal from "@/components/Modal";
import DosyaYukle from "@/components/DosyaYukle";

interface Slider {
  id: number;
  baslik: string;
  altBaslik: string | null;
  resimUrl: string;
  butonYazi: string | null;
  butonLink: string | null;
  sira: number;
  yayinda: boolean;
}

const bos = { baslik: "", altBaslik: "", resimUrl: "", butonYazi: "", butonLink: "", sira: 0, yayinda: true };

export default function SliderPage() {
  const [data, setData] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"ekle" | "duzenle" | null>(null);
  const [form, setForm] = useState<Partial<Slider>>(bos);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [hata, setHata] = useState("");

  const yukle = useCallback(async () => {
    setLoading(true);
    const r = await fetch("/api/slider", { credentials: "include" });
    setData(await r.json());
    setLoading(false);
  }, []);

  useEffect(() => { yukle(); }, [yukle]);

  function ekleAc() { setForm({ ...bos }); setModal("ekle"); setHata(""); }
  function duzenleAc(row: Record<string, unknown>) { setForm(row as unknown as Slider); setModal("duzenle"); setHata(""); }

  async function kaydet() {
    setKaydediliyor(true); setHata("");
    try {
      const url = modal === "duzenle" ? `/api/slider/${form.id}` : "/api/slider";
      const method = modal === "duzenle" ? "PATCH" : "POST";
      const payload = {
        ...form,
        altBaslik: form.altBaslik || null,
        butonYazi: form.butonYazi || null,
        butonLink: form.butonLink || null,
      };
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(payload) });
      if (!r.ok) { const d = await r.json(); setHata(d.error || "Bir hata oluştu"); return; }
      setModal(null); yukle();
    } finally { setKaydediliyor(false); }
  }

  async function sil(row: Record<string, unknown>) {
    await fetch(`/api/slider/${row.id}`, { method: "DELETE", credentials: "include" });
    yukle();
  }

  const kolonlar = [
    {
      key: "resimUrl", label: "Görsel",
      render: (v: unknown) => <img src={String(v)} alt="" className="w-20 h-12 object-cover rounded-lg" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
    },
    { key: "baslik", label: "Başlık", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "altBaslik", label: "Alt Başlık", render: (v: unknown) => <span className="text-gray-500 text-xs line-clamp-1">{String(v || "—")}</span> },
    { key: "sira", label: "Sıra" },
    { key: "yayinda", label: "Durum", render: (v: unknown) => <span className={`px-2 py-0.5 rounded text-xs font-medium ${v ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Aktif" : "Gizli"}</span> },
  ];

  return (
    <>
      <ContentTable
        title="Ana Sayfa Slider" data={data as unknown as Record<string, unknown>[]}
        columns={kolonlar} loading={loading} onAdd={ekleAc} onEdit={duzenleAc} onDelete={sil}
        addLabel="Slide Ekle"
        description="Ana sayfada dönen görselleri buradan yönetin. Sıra numarası küçük olan önce gösterilir."
      />
      {modal && (
        <Modal title={modal === "ekle" ? "Yeni Slide" : "Slide'ı Düzenle"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {hata && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{hata}</div>}

            <DosyaYukle
              etiket="Arka Plan Görseli *"
              deger={form.resimUrl || null}
              onTamamlandi={yol => setForm(f => ({ ...f, resimUrl: yol || "" }))}
              tip="resim"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlık *</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.baslik || ""} onChange={e => setForm(f => ({ ...f, baslik: e.target.value }))} placeholder="Ana başlık metni..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.altBaslik || ""} onChange={e => setForm(f => ({ ...f, altBaslik: e.target.value }))} placeholder="Açıklayıcı alt metin..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buton Yazısı</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.butonYazi || ""} onChange={e => setForm(f => ({ ...f, butonYazi: e.target.value }))} placeholder="Daha Fazla Bilgi" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buton Linki</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.butonLink || ""} onChange={e => setForm(f => ({ ...f, butonLink: e.target.value }))} placeholder="/hakkimizda" />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sıra Numarası</label>
                <input type="number" className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.sira ?? 0} onChange={e => setForm(f => ({ ...f, sira: Number(e.target.value) }))} />
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer mt-5">
                <input type="checkbox" checked={form.yayinda ?? true} onChange={e => setForm(f => ({ ...f, yayinda: e.target.checked }))} className="rounded" />
                Ana sayfada göster
              </label>
            </div>

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
