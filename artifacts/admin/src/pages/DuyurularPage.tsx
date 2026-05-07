import { useState, useEffect, useCallback } from "react";
import ContentTable from "@/components/ContentTable";
import Modal from "@/components/Modal";

interface Duyuru {
  id: number;
  baslik: string;
  icerik: string;
  kategori: string;
  onemli: boolean;
  yayinda: boolean;
  yayinTarihi: string;
  bitisTarihi: string | null;
}

const bos: Omit<Duyuru, "id"> = {
  baslik: "", icerik: "", kategori: "genel", onemli: false, yayinda: true,
  yayinTarihi: new Date().toISOString().slice(0, 10), bitisTarihi: null,
};

export default function DuyurularPage() {
  const [data, setData] = useState<Duyuru[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"ekle" | "duzenle" | null>(null);
  const [form, setForm] = useState<Partial<Duyuru>>(bos);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [hata, setHata] = useState("");

  const yukle = useCallback(async () => {
    setLoading(true);
    const r = await fetch("/api/duyurular", { credentials: "include" });
    setData(await r.json());
    setLoading(false);
  }, []);

  useEffect(() => { yukle(); }, [yukle]);

  function ekleAc() { setForm({ ...bos, yayinTarihi: new Date().toISOString().slice(0, 10) }); setModal("ekle"); setHata(""); }
  function duzenleAc(row: Record<string, unknown>) {
    const d = row as unknown as Duyuru;
    setForm({ ...d, yayinTarihi: d.yayinTarihi?.slice(0, 10), bitisTarihi: d.bitisTarihi?.slice(0, 10) ?? null });
    setModal("duzenle"); setHata("");
  }

  async function kaydet() {
    setKaydediliyor(true); setHata("");
    try {
      const url = modal === "duzenle" ? `/api/duyurular/${form.id}` : "/api/duyurular";
      const method = modal === "duzenle" ? "PATCH" : "POST";
      const r = await fetch(url, {
        method, headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify({
          ...form,
          yayinTarihi: form.yayinTarihi ? new Date(form.yayinTarihi + "T00:00:00").toISOString() : undefined,
          bitisTarihi: form.bitisTarihi ? new Date(form.bitisTarihi + "T00:00:00").toISOString() : null,
        }),
      });
      if (!r.ok) { const d = await r.json(); setHata(d.error || "Bir hata oluştu"); return; }
      setModal(null); yukle();
    } finally { setKaydediliyor(false); }
  }

  async function sil(row: Record<string, unknown>) {
    await fetch(`/api/duyurular/${row.id}`, { method: "DELETE", credentials: "include" });
    yukle();
  }

  const kolonlar = [
    { key: "baslik", label: "Başlık", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "kategori", label: "Kategori", render: (v: unknown) => <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded text-xs capitalize">{String(v)}</span> },
    { key: "onemli", label: "", render: (v: unknown) => v ? <span className="text-red-500 text-xs font-bold bg-red-50 px-2 py-0.5 rounded">Acil</span> : null },
    { key: "yayinda", label: "Durum", render: (v: unknown) => <span className={`px-2 py-0.5 rounded text-xs font-medium ${v ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Aktif" : "Pasif"}</span> },
    { key: "yayinTarihi", label: "Başlangıç", render: (v: unknown) => v ? new Date(String(v)).toLocaleDateString("tr-TR") : "-" },
    { key: "bitisTarihi", label: "Bitiş", render: (v: unknown) => v ? new Date(String(v)).toLocaleDateString("tr-TR") : "—" },
  ];

  return (
    <>
      <ContentTable
        title="Duyurular" data={data as unknown as Record<string, unknown>[]}
        columns={kolonlar} loading={loading} onAdd={ekleAc} onEdit={duzenleAc} onDelete={sil}
        addLabel="Duyuru Ekle"
        description="Veli ve öğrencilere yönelik duyuruları buradan yönetin."
      />
      {modal && (
        <Modal title={modal === "ekle" ? "Yeni Duyuru" : "Duyuruyu Düzenle"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {hata && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{hata}</div>}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duyuru Başlığı *</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.baslik || ""} onChange={e => setForm(f => ({ ...f, baslik: e.target.value }))} placeholder="Duyurunun başlığını yazın..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duyuru Metni *</label>
              <textarea rows={6} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.icerik || ""} onChange={e => setForm(f => ({ ...f, icerik: e.target.value }))} placeholder="Duyuru içeriğini buraya yazın..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.kategori || "genel"} onChange={e => setForm(f => ({ ...f, kategori: e.target.value }))}>
                <option value="genel">Genel</option>
                <option value="sinav">Sınav & Ölçme</option>
                <option value="kayit">Kayıt & Başvuru</option>
                <option value="tatil">Tatil & Resmi Gün</option>
                <option value="veli">Veli Toplantısı</option>
                <option value="burs">Burs</option>
                <option value="saglik">Sağlık</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Yayın Başlangıcı</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.yayinTarihi?.slice(0, 10) || ""} onChange={e => setForm(f => ({ ...f, yayinTarihi: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Yayın Bitişi <span className="text-gray-400 font-normal">(opsiyonel)</span></label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.bitisTarihi?.slice(0, 10) || ""} onChange={e => setForm(f => ({ ...f, bitisTarihi: e.target.value || null }))} />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.yayinda ?? true} onChange={e => setForm(f => ({ ...f, yayinda: e.target.checked }))} className="rounded" />
                Sitede yayınla
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.onemli ?? false} onChange={e => setForm(f => ({ ...f, onemli: e.target.checked }))} className="rounded" />
                Acil / Önemli duyuru
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
