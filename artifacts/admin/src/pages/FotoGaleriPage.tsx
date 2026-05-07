import { useState, useEffect, useCallback } from "react";
import ContentTable from "@/components/ContentTable";
import Modal from "@/components/Modal";
import DosyaYukle from "@/components/DosyaYukle";

interface FotoGaleri {
  id: number;
  baslik: string;
  resimUrl: string;
  kategori: string;
  yayinda: boolean;
  sira: number;
}

const bos = { baslik: "", resimUrl: "", kategori: "genel", yayinda: true, sira: 0 };

export default function FotoGaleriPage() {
  const [data, setData] = useState<FotoGaleri[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"ekle" | "duzenle" | null>(null);
  const [form, setForm] = useState<Partial<FotoGaleri>>(bos);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [hata, setHata] = useState("");

  const yukle = useCallback(async () => {
    setLoading(true);
    const r = await fetch("/api/foto-galeri", { credentials: "include" });
    setData(await r.json());
    setLoading(false);
  }, []);

  useEffect(() => { yukle(); }, [yukle]);

  function ekleAc() { setForm({ ...bos }); setModal("ekle"); setHata(""); }
  function duzenleAc(row: Record<string, unknown>) { setForm(row as unknown as FotoGaleri); setModal("duzenle"); setHata(""); }

  async function kaydet() {
    setKaydediliyor(true); setHata("");
    try {
      const url = modal === "duzenle" ? `/api/foto-galeri/${form.id}` : "/api/foto-galeri";
      const method = modal === "duzenle" ? "PATCH" : "POST";
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(form) });
      if (!r.ok) { const d = await r.json(); setHata(d.error || "Bir hata oluştu"); return; }
      setModal(null); yukle();
    } finally { setKaydediliyor(false); }
  }

  async function sil(row: Record<string, unknown>) {
    await fetch(`/api/foto-galeri/${row.id}`, { method: "DELETE", credentials: "include" });
    yukle();
  }

  const kolonlar = [
    {
      key: "resimUrl", label: "Fotoğraf",
      render: (v: unknown) => <img src={String(v)} alt="" className="w-16 h-12 object-cover rounded-lg" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
    },
    { key: "baslik", label: "Başlık", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "kategori", label: "Kategori", render: (v: unknown) => <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs capitalize">{String(v)}</span> },
    { key: "sira", label: "Sıra" },
    { key: "yayinda", label: "Durum", render: (v: unknown) => <span className={`px-2 py-0.5 rounded text-xs font-medium ${v ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Görünür" : "Gizli"}</span> },
  ];

  return (
    <>
      <ContentTable
        title="Fotoğraf Galerisi" data={data as unknown as Record<string, unknown>[]}
        columns={kolonlar} loading={loading} onAdd={ekleAc} onEdit={duzenleAc} onDelete={sil}
        addLabel="Fotoğraf Yükle"
        description="Galeriye fotoğraf ekleyin, düzenleyin veya kaldırın."
      />
      {modal && (
        <Modal title={modal === "ekle" ? "Yeni Fotoğraf" : "Fotoğrafı Düzenle"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {hata && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{hata}</div>}

            <DosyaYukle
              etiket="Fotoğraf *"
              deger={form.resimUrl || null}
              onTamamlandi={yol => setForm(f => ({ ...f, resimUrl: yol || "" }))}
              tip="resim"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlık *</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.baslik || ""} onChange={e => setForm(f => ({ ...f, baslik: e.target.value }))} placeholder="Fotoğrafın açıklaması..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.kategori || "genel"} onChange={e => setForm(f => ({ ...f, kategori: e.target.value }))}>
                  <option value="genel">Genel</option>
                  <option value="kampus">Kampüs</option>
                  <option value="havacilik">Havacılık</option>
                  <option value="yazilim">Yazılım</option>
                  <option value="saglik">Sağlık</option>
                  <option value="etkinlik">Etkinlik</option>
                  <option value="mezuniyet">Mezuniyet</option>
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
