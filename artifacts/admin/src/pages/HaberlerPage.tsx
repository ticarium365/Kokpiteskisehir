import { useState, useEffect, useCallback } from "react";
import ContentTable from "@/components/ContentTable";
import Modal from "@/components/Modal";
import DosyaYukle from "@/components/DosyaYukle";

interface Haber {
  id: number;
  baslik: string;
  ozet: string;
  icerik: string;
  resimUrl: string | null;
  kategori: string;
  yayinda: boolean;
  onemli: boolean;
  yayinTarihi: string;
}

const bos: Omit<Haber, "id" | "createdAt" | "updatedAt"> = {
  baslik: "", ozet: "", icerik: "", resimUrl: null,
  kategori: "genel", yayinda: true, onemli: false,
  yayinTarihi: new Date().toISOString().slice(0, 10),
};

export default function HaberlerPage() {
  const [data, setData] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"ekle" | "duzenle" | null>(null);
  const [form, setForm] = useState<Partial<Haber>>(bos);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [hata, setHata] = useState("");

  const yukle = useCallback(async () => {
    setLoading(true);
    const r = await fetch("/api/haberler", { credentials: "include" });
    setData(await r.json());
    setLoading(false);
  }, []);

  useEffect(() => { yukle(); }, [yukle]);

  function ekleAc() { setForm({ ...bos, yayinTarihi: new Date().toISOString().slice(0, 10) }); setModal("ekle"); setHata(""); }
  function duzenleAc(row: Record<string, unknown>) {
    const h = row as unknown as Haber;
    setForm({ ...h, yayinTarihi: h.yayinTarihi?.slice(0, 10) });
    setModal("duzenle"); setHata("");
  }

  async function kaydet() {
    setKaydediliyor(true); setHata("");
    try {
      const url = modal === "duzenle" ? `/api/haberler/${form.id}` : "/api/haberler";
      const method = modal === "duzenle" ? "PATCH" : "POST";
      const r = await fetch(url, {
        method, headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify({ ...form, yayinTarihi: form.yayinTarihi ? new Date(form.yayinTarihi + "T00:00:00").toISOString() : undefined }),
      });
      if (!r.ok) { const d = await r.json(); setHata(d.error || "Bir hata oluştu"); return; }
      setModal(null); yukle();
    } finally { setKaydediliyor(false); }
  }

  async function sil(row: Record<string, unknown>) {
    await fetch(`/api/haberler/${row.id}`, { method: "DELETE", credentials: "include" });
    yukle();
  }

  const kolonlar = [
    {
      key: "resimUrl", label: "Görsel",
      render: (v: unknown) => v
        ? <img src={String(v)} alt="" className="w-14 h-10 object-cover rounded-lg" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
        : <div className="w-14 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs">—</div>
    },
    { key: "baslik", label: "Başlık", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "kategori", label: "Kategori", render: (v: unknown) => <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs capitalize">{String(v)}</span> },
    { key: "yayinda", label: "Durum", render: (v: unknown) => <span className={`px-2 py-0.5 rounded text-xs font-medium ${v ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Yayında" : "Taslak"}</span> },
    { key: "onemli", label: "", render: (v: unknown) => v ? <span className="text-yellow-500 text-base" title="Öne çıkan">★</span> : null },
    { key: "yayinTarihi", label: "Tarih", render: (v: unknown) => v ? new Date(String(v)).toLocaleDateString("tr-TR") : "-" },
  ];

  return (
    <>
      <ContentTable
        title="Haberler" data={data as unknown as Record<string, unknown>[]}
        columns={kolonlar} loading={loading} onAdd={ekleAc} onEdit={duzenleAc} onDelete={sil}
        addLabel="Haber Ekle"
        description="Okul haberlerini buradan yönetebilirsiniz."
      />
      {modal && (
        <Modal title={modal === "ekle" ? "Yeni Haber" : "Haberi Düzenle"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {hata && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{hata}</div>}

            <DosyaYukle
              etiket="Kapak Görseli"
              deger={form.resimUrl || null}
              onTamamlandi={yol => setForm(f => ({ ...f, resimUrl: yol || null }))}
              tip="resim"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Haber Başlığı *</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.baslik || ""} onChange={e => setForm(f => ({ ...f, baslik: e.target.value }))} placeholder="Haberin başlığını yazın..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kısa Özet *</label>
              <textarea rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.ozet || ""} onChange={e => setForm(f => ({ ...f, ozet: e.target.value }))} placeholder="Liste görünümünde çıkacak kısa açıklama..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Haber İçeriği *</label>
              <textarea rows={7} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.icerik || ""} onChange={e => setForm(f => ({ ...f, icerik: e.target.value }))} placeholder="Haberin tamamını buraya yazın..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.kategori || "genel"} onChange={e => setForm(f => ({ ...f, kategori: e.target.value }))}>
                  <option value="genel">Genel</option>
                  <option value="havacilik">Havacılık</option>
                  <option value="yazilim">Yazılım</option>
                  <option value="saglik">Sağlık</option>
                  <option value="burs">Burs & Ödül</option>
                  <option value="etkinlik">Etkinlik</option>
                  <option value="basin">Basın</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Yayın Tarihi</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.yayinTarihi?.slice(0, 10) || ""} onChange={e => setForm(f => ({ ...f, yayinTarihi: e.target.value }))} />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.yayinda ?? true} onChange={e => setForm(f => ({ ...f, yayinda: e.target.checked }))} className="rounded" />
                Sitede yayınla
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.onemli ?? false} onChange={e => setForm(f => ({ ...f, onemli: e.target.checked }))} className="rounded" />
                Öne çıkan haber
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={kaydet} disabled={kaydediliyor} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors">
                {kaydediliyor ? "Kaydediliyor..." : "Kaydet"}
              </button>
              <button onClick={() => setModal(null)} className="px-5 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">İptal</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
