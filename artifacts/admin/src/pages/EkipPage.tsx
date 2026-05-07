import { useState, useEffect, useCallback } from "react";
import ContentTable from "@/components/ContentTable";
import Modal from "@/components/Modal";
import DosyaYukle from "@/components/DosyaYukle";

interface EkipUye {
  id: number;
  ad: string;
  unvan: string;
  bolum: string | null;
  resimUrl: string | null;
  email: string | null;
  telefon: string | null;
  biyografi: string | null;
  sira: number;
  yayinda: boolean;
}

const bos = { ad: "", unvan: "", bolum: "", resimUrl: "", email: "", telefon: "", biyografi: "", sira: 0, yayinda: true };

export default function EkipPage() {
  const [data, setData] = useState<EkipUye[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"ekle" | "duzenle" | null>(null);
  const [form, setForm] = useState<Partial<EkipUye>>(bos);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [hata, setHata] = useState("");

  const yukle = useCallback(async () => {
    setLoading(true);
    const r = await fetch("/api/ekip", { credentials: "include" });
    setData(await r.json());
    setLoading(false);
  }, []);

  useEffect(() => { yukle(); }, [yukle]);

  function ekleAc() { setForm({ ...bos }); setModal("ekle"); setHata(""); }
  function duzenleAc(row: Record<string, unknown>) { setForm(row as unknown as EkipUye); setModal("duzenle"); setHata(""); }

  async function kaydet() {
    setKaydediliyor(true); setHata("");
    try {
      const url = modal === "duzenle" ? `/api/ekip/${form.id}` : "/api/ekip";
      const method = modal === "duzenle" ? "PATCH" : "POST";
      const payload = {
        ...form,
        bolum: form.bolum || null,
        resimUrl: form.resimUrl || null,
        email: form.email || null,
        telefon: form.telefon || null,
        biyografi: form.biyografi || null,
      };
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(payload) });
      if (!r.ok) { const d = await r.json(); setHata(d.error || "Bir hata oluştu"); return; }
      setModal(null); yukle();
    } finally { setKaydediliyor(false); }
  }

  async function sil(row: Record<string, unknown>) {
    await fetch(`/api/ekip/${row.id}`, { method: "DELETE", credentials: "include" });
    yukle();
  }

  const kolonlar = [
    {
      key: "resimUrl", label: "Fotoğraf",
      render: (v: unknown) => v
        ? <img src={String(v)} alt="" className="w-10 h-10 object-cover rounded-full" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
        : <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">?</div>
    },
    { key: "ad", label: "Ad Soyad", render: (_: unknown, row: Record<string, unknown>) => <span className="font-medium">{row.ad as string}</span> },
    { key: "unvan", label: "Ünvan", render: (v: unknown) => <span className="text-gray-600 text-xs">{String(v)}</span> },
    { key: "bolum", label: "Bölüm", render: (v: unknown) => v ? <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{String(v)}</span> : "—" },
    { key: "yayinda", label: "Durum", render: (v: unknown) => <span className={`px-2 py-0.5 rounded text-xs font-medium ${v ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Görünür" : "Gizli"}</span> },
  ];

  return (
    <>
      <ContentTable
        title="Eğitim Kadrosu" data={data as unknown as Record<string, unknown>[]}
        columns={kolonlar} loading={loading} onAdd={ekleAc} onEdit={duzenleAc} onDelete={sil}
        addLabel="Üye Ekle"
        description="Öğretmen ve yöneticileri ekleyin. Fotoğraf yükleyebilirsiniz."
      />
      {modal && (
        <Modal title={modal === "ekle" ? "Yeni Üye" : "Üyeyi Düzenle"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {hata && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{hata}</div>}

            <DosyaYukle
              etiket="Profil Fotoğrafı"
              deger={form.resimUrl || null}
              onTamamlandi={yol => setForm(f => ({ ...f, resimUrl: yol || null }))}
              tip="resim"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad *</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.ad || ""} onChange={e => setForm(f => ({ ...f, ad: e.target.value }))} placeholder="Ahmet Yılmaz" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ünvan *</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.unvan || ""} onChange={e => setForm(f => ({ ...f, unvan: e.target.value }))} placeholder="Müdür, Öğretmen..." />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bölüm / Branş</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.bolum || ""} onChange={e => setForm(f => ({ ...f, bolum: e.target.value }))} placeholder="Havacılık, Yazılım, Sağlık..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.email || ""} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.telefon || ""} onChange={e => setForm(f => ({ ...f, telefon: e.target.value }))} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kısa Biyografi</label>
              <textarea rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.biyografi || ""} onChange={e => setForm(f => ({ ...f, biyografi: e.target.value }))} placeholder="Kısa tanıtım metni..." />
            </div>

            <div className="flex items-center gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sıra No</label>
                <input type="number" className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.sira ?? 0} onChange={e => setForm(f => ({ ...f, sira: Number(e.target.value) }))} />
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer mt-5">
                <input type="checkbox" checked={form.yayinda ?? true} onChange={e => setForm(f => ({ ...f, yayinda: e.target.checked }))} className="rounded" />
                Sitede göster
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
