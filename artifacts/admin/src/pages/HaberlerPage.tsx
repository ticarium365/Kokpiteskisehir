import { useState, useEffect, useCallback } from "react";
import ContentTable from "@/components/ContentTable";
import Modal from "@/components/Modal";

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

const empty: Omit<Haber, "id" | "yayinTarihi" | "createdAt" | "updatedAt"> = {
  baslik: "", ozet: "", icerik: "", resimUrl: null, kategori: "genel", yayinda: true, onemli: false,
};

export default function HaberlerPage() {
  const [data, setData] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<Partial<Haber>>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/haberler", { credentials: "include" });
    setData(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function openAdd() { setForm({ ...empty, yayinTarihi: new Date().toISOString().slice(0, 10) }); setModal("add"); setError(""); }
  function openEdit(row: Record<string, unknown>) {
    const h = row as unknown as Haber;
    setForm({ ...h, yayinTarihi: h.yayinTarihi?.slice(0, 10) });
    setModal("edit");
    setError("");
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const url = modal === "edit" ? `/api/haberler/${form.id}` : "/api/haberler";
      const method = modal === "edit" ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...form, yayinTarihi: form.yayinTarihi ? new Date(form.yayinTarihi + "T00:00:00").toISOString() : undefined }),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Hata oluştu"); return; }
      setModal(null);
      load();
    } finally { setSaving(false); }
  }

  async function del(row: Record<string, unknown>) {
    await fetch(`/api/haberler/${row.id}`, { method: "DELETE", credentials: "include" });
    load();
  }

  const columns = [
    { key: "baslik", label: "Başlık", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "kategori", label: "Kategori", render: (v: unknown) => <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{String(v)}</span> },
    { key: "yayinda", label: "Durum", render: (v: unknown) => <span className={`px-2 py-0.5 rounded text-xs font-medium ${v ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Yayında" : "Taslak"}</span> },
    { key: "onemli", label: "Önemli", render: (v: unknown) => v ? <span className="text-yellow-500">★</span> : <span className="text-gray-300">☆</span> },
    { key: "yayinTarihi", label: "Tarih", render: (v: unknown) => v ? new Date(String(v)).toLocaleDateString("tr-TR") : "-" },
  ];

  return (
    <>
      <ContentTable title="Haberler" data={data as unknown as Record<string, unknown>[]} columns={columns} loading={loading} onAdd={openAdd} onEdit={openEdit} onDelete={del} />
      {modal && (
        <Modal title={modal === "add" ? "Yeni Haber Ekle" : "Haberi Düzenle"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlık *</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.baslik || ""} onChange={e => setForm(f => ({ ...f, baslik: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Özet *</label>
              <textarea rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.ozet || ""} onChange={e => setForm(f => ({ ...f, ozet: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">İçerik *</label>
              <textarea rows={6} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.icerik || ""} onChange={e => setForm(f => ({ ...f, icerik: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resim URL</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.resimUrl || ""} onChange={e => setForm(f => ({ ...f, resimUrl: e.target.value || null }))} placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.kategori || "genel"} onChange={e => setForm(f => ({ ...f, kategori: e.target.value }))}>
                  <option value="genel">Genel</option>
                  <option value="havacilik">Havacılık</option>
                  <option value="yazilim">Yazılım</option>
                  <option value="saglik">Sağlık</option>
                  <option value="burs">Burs</option>
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
                Yayında
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.onemli ?? false} onChange={e => setForm(f => ({ ...f, onemli: e.target.checked }))} className="rounded" />
                Önemli / Öne Çıkan
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={save} disabled={saving} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors">
                {saving ? "Kaydediliyor..." : "Kaydet"}
              </button>
              <button onClick={() => setModal(null)} className="px-5 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">İptal</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
