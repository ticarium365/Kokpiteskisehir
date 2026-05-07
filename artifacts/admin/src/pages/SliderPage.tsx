import { useState, useEffect, useCallback } from "react";
import ContentTable from "@/components/ContentTable";
import Modal from "@/components/Modal";

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

const empty = { baslik: "", altBaslik: "", resimUrl: "", butonYazi: "", butonLink: "", sira: 0, yayinda: true };

export default function SliderPage() {
  const [data, setData] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<Partial<Slider>>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/slider", { credentials: "include" });
    setData(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function openAdd() { setForm({ ...empty }); setModal("add"); setError(""); }
  function openEdit(row: Record<string, unknown>) { setForm(row as unknown as Slider); setModal("edit"); setError(""); }

  async function save() {
    setSaving(true); setError("");
    try {
      const url = modal === "edit" ? `/api/slider/${form.id}` : "/api/slider";
      const method = modal === "edit" ? "PATCH" : "POST";
      const payload = {
        ...form,
        altBaslik: form.altBaslik || null,
        butonYazi: form.butonYazi || null,
        butonLink: form.butonLink || null,
      };
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(payload) });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Hata"); return; }
      setModal(null); load();
    } finally { setSaving(false); }
  }

  async function del(row: Record<string, unknown>) {
    await fetch(`/api/slider/${row.id}`, { method: "DELETE", credentials: "include" });
    load();
  }

  const columns = [
    { key: "resimUrl", label: "Görsel", render: (v: unknown) => <img src={String(v)} alt="" className="w-16 h-10 object-cover rounded" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} /> },
    { key: "baslik", label: "Başlık", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "altBaslik", label: "Alt Başlık", render: (v: unknown) => <span className="text-gray-500 text-xs">{String(v || "-")}</span> },
    { key: "sira", label: "Sıra" },
    { key: "yayinda", label: "Durum", render: (v: unknown) => <span className={`px-2 py-0.5 rounded text-xs font-medium ${v ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Aktif" : "Gizli"}</span> },
  ];

  return (
    <>
      <ContentTable title="Ana Sayfa Slider" data={data as unknown as Record<string, unknown>[]} columns={columns} loading={loading} onAdd={openAdd} onEdit={openEdit} onDelete={del} addLabel="Slide Ekle" />
      {modal && (
        <Modal title={modal === "add" ? "Yeni Slide" : "Slide Düzenle"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlık *</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.baslik || ""} onChange={e => setForm(f => ({ ...f, baslik: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.altBaslik || ""} onChange={e => setForm(f => ({ ...f, altBaslik: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resim URL *</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.resimUrl || ""} onChange={e => setForm(f => ({ ...f, resimUrl: e.target.value }))} placeholder="https://..." />
              {form.resimUrl && <img src={form.resimUrl} alt="Önizleme" className="mt-2 h-28 w-full object-cover rounded-lg" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buton Yazısı</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.butonYazi || ""} onChange={e => setForm(f => ({ ...f, butonYazi: e.target.value }))} placeholder="Daha Fazla..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buton Linki</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.butonLink || ""} onChange={e => setForm(f => ({ ...f, butonLink: e.target.value }))} placeholder="/hakkimizda" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sıra No</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.sira ?? 0} onChange={e => setForm(f => ({ ...f, sira: Number(e.target.value) }))} />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.yayinda ?? true} onChange={e => setForm(f => ({ ...f, yayinda: e.target.checked }))} className="rounded" />
                  Aktif (Göster)
                </label>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={save} disabled={saving} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg">{saving ? "Kaydediliyor..." : "Kaydet"}</button>
              <button onClick={() => setModal(null)} className="px-5 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">İptal</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
