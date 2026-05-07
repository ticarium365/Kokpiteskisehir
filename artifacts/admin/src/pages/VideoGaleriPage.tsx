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

const empty = { baslik: "", youtubeId: "", kategori: "genel", yayinda: true, sira: 0 };

export default function VideoGaleriPage() {
  const [data, setData] = useState<VideoGaleri[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<Partial<VideoGaleri>>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/video-galeri", { credentials: "include" });
    setData(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function openAdd() { setForm({ ...empty }); setModal("add"); setError(""); }
  function openEdit(row: Record<string, unknown>) { setForm(row as unknown as VideoGaleri); setModal("edit"); setError(""); }

  async function save() {
    setSaving(true); setError("");
    try {
      const url = modal === "edit" ? `/api/video-galeri/${form.id}` : "/api/video-galeri";
      const method = modal === "edit" ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(form) });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Hata"); return; }
      setModal(null); load();
    } finally { setSaving(false); }
  }

  async function del(row: Record<string, unknown>) {
    await fetch(`/api/video-galeri/${row.id}`, { method: "DELETE", credentials: "include" });
    load();
  }

  const columns = [
    { key: "youtubeId", label: "Önizleme", render: (v: unknown) => <img src={`https://img.youtube.com/vi/${v}/default.jpg`} alt="" className="w-16 h-10 object-cover rounded" /> },
    { key: "baslik", label: "Başlık", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "youtubeId", label: "YouTube ID", render: (v: unknown) => <a href={`https://youtube.com/watch?v=${v}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs">{String(v)}</a> },
    { key: "kategori", label: "Kategori", render: (v: unknown) => <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded text-xs">{String(v)}</span> },
    { key: "yayinda", label: "Durum", render: (v: unknown) => <span className={`px-2 py-0.5 rounded text-xs font-medium ${v ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Yayında" : "Gizli"}</span> },
  ];

  return (
    <>
      <ContentTable title="Video Galerisi" data={data as unknown as Record<string, unknown>[]} columns={columns} loading={loading} onAdd={openAdd} onEdit={openEdit} onDelete={del} addLabel="Video Ekle" />
      {modal && (
        <Modal title={modal === "add" ? "Yeni Video" : "Videoyu Düzenle"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlık *</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.baslik || ""} onChange={e => setForm(f => ({ ...f, baslik: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video ID *</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.youtubeId || ""} onChange={e => setForm(f => ({ ...f, youtubeId: e.target.value }))} placeholder="dQw4w9WgXcQ" />
              <p className="text-xs text-gray-400 mt-1">YouTube linkindeki v= parametresindeki kısa kod (örn: youtube.com/watch?v=<strong>dQw4w9WgXcQ</strong>)</p>
              {form.youtubeId && (
                <div className="mt-2 aspect-video w-full max-w-xs">
                  <img src={`https://img.youtube.com/vi/${form.youtubeId}/hqdefault.jpg`} alt="Önizleme" className="w-full h-full object-cover rounded-lg" />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Sıra No</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.sira ?? 0} onChange={e => setForm(f => ({ ...f, sira: Number(e.target.value) }))} />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.yayinda ?? true} onChange={e => setForm(f => ({ ...f, yayinda: e.target.checked }))} className="rounded" />Yayında</label>
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
