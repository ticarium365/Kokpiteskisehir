import { useState, useEffect, useCallback } from "react";
import ContentTable from "@/components/ContentTable";
import Modal from "@/components/Modal";

interface Duyuru {
  id: number;
  baslik: string;
  icerik: string;
  onemli: boolean;
  yayinda: boolean;
  yayinTarihi: string;
}

const empty = { baslik: "", icerik: "", onemli: false, yayinda: true };

export default function DuyurularPage() {
  const [data, setData] = useState<Duyuru[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<Partial<Duyuru>>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/duyurular", { credentials: "include" });
    setData(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function openAdd() { setForm({ ...empty, yayinTarihi: new Date().toISOString().slice(0, 10) }); setModal("add"); setError(""); }
  function openEdit(row: Record<string, unknown>) { setForm({ ...row as unknown as Duyuru, yayinTarihi: (row.yayinTarihi as string)?.slice(0, 10) }); setModal("edit"); setError(""); }

  async function save() {
    setSaving(true); setError("");
    try {
      const url = modal === "edit" ? `/api/duyurular/${form.id}` : "/api/duyurular";
      const method = modal === "edit" ? "PATCH" : "POST";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify({ ...form, yayinTarihi: form.yayinTarihi ? new Date(form.yayinTarihi + "T00:00:00").toISOString() : undefined }),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Hata"); return; }
      setModal(null); load();
    } finally { setSaving(false); }
  }

  async function del(row: Record<string, unknown>) {
    await fetch(`/api/duyurular/${row.id}`, { method: "DELETE", credentials: "include" });
    load();
  }

  const columns = [
    { key: "baslik", label: "Başlık", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "onemli", label: "Öncelik", render: (v: unknown) => v ? <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded text-xs font-medium">ÖNEMLİ</span> : <span className="text-gray-400 text-xs">Normal</span> },
    { key: "yayinda", label: "Durum", render: (v: unknown) => <span className={`px-2 py-0.5 rounded text-xs font-medium ${v ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Yayında" : "Taslak"}</span> },
    { key: "yayinTarihi", label: "Tarih", render: (v: unknown) => v ? new Date(String(v)).toLocaleDateString("tr-TR") : "-" },
  ];

  return (
    <>
      <ContentTable title="Duyurular" data={data as unknown as Record<string, unknown>[]} columns={columns} loading={loading} onAdd={openAdd} onEdit={openEdit} onDelete={del} />
      {modal && (
        <Modal title={modal === "add" ? "Yeni Duyuru" : "Duyuruyu Düzenle"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlık *</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.baslik || ""} onChange={e => setForm(f => ({ ...f, baslik: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">İçerik *</label>
              <textarea rows={6} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.icerik || ""} onChange={e => setForm(f => ({ ...f, icerik: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Yayın Tarihi</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.yayinTarihi?.slice(0, 10) || ""} onChange={e => setForm(f => ({ ...f, yayinTarihi: e.target.value }))} />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.yayinda ?? true} onChange={e => setForm(f => ({ ...f, yayinda: e.target.checked }))} className="rounded" />Yayında</label>
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.onemli ?? false} onChange={e => setForm(f => ({ ...f, onemli: e.target.checked }))} className="rounded" />Önemli Duyuru</label>
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
