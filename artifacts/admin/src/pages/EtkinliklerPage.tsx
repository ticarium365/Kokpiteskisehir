import { useState, useEffect, useCallback } from "react";
import ContentTable from "@/components/ContentTable";
import Modal from "@/components/Modal";

interface Etkinlik {
  id: number;
  baslik: string;
  aciklama: string;
  resimUrl: string | null;
  tarih: string;
  yer: string | null;
  kategori: string;
  yayinda: boolean;
}

const empty = { baslik: "", aciklama: "", resimUrl: null, tarih: "", yer: null, kategori: "genel", yayinda: true };

export default function EtkinliklerPage() {
  const [data, setData] = useState<Etkinlik[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<Partial<Etkinlik>>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/etkinlikler", { credentials: "include" });
    setData(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function openAdd() { setForm({ ...empty, tarih: new Date().toISOString().slice(0, 10) }); setModal("add"); setError(""); }
  function openEdit(row: Record<string, unknown>) { setForm({ ...row as unknown as Etkinlik, tarih: (row.tarih as string)?.slice(0, 10) }); setModal("edit"); setError(""); }

  async function save() {
    setSaving(true); setError("");
    try {
      const url = modal === "edit" ? `/api/etkinlikler/${form.id}` : "/api/etkinlikler";
      const method = modal === "edit" ? "PATCH" : "POST";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify({ ...form, tarih: form.tarih ? new Date(form.tarih + "T00:00:00").toISOString() : undefined }),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Hata"); return; }
      setModal(null); load();
    } finally { setSaving(false); }
  }

  async function del(row: Record<string, unknown>) {
    await fetch(`/api/etkinlikler/${row.id}`, { method: "DELETE", credentials: "include" });
    load();
  }

  const columns = [
    { key: "baslik", label: "Başlık", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "tarih", label: "Tarih", render: (v: unknown) => v ? new Date(String(v)).toLocaleDateString("tr-TR") : "-" },
    { key: "yer", label: "Yer", render: (v: unknown) => String(v || "-") },
    { key: "kategori", label: "Kategori", render: (v: unknown) => <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs">{String(v)}</span> },
    { key: "yayinda", label: "Durum", render: (v: unknown) => <span className={`px-2 py-0.5 rounded text-xs font-medium ${v ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Yayında" : "Taslak"}</span> },
  ];

  return (
    <>
      <ContentTable title="Etkinlikler" data={data as unknown as Record<string, unknown>[]} columns={columns} loading={loading} onAdd={openAdd} onEdit={openEdit} onDelete={del} />
      {modal && (
        <Modal title={modal === "add" ? "Yeni Etkinlik" : "Etkinliği Düzenle"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlık *</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.baslik || ""} onChange={e => setForm(f => ({ ...f, baslik: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama *</label>
              <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.aciklama || ""} onChange={e => setForm(f => ({ ...f, aciklama: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resim URL</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.resimUrl || ""} onChange={e => setForm(f => ({ ...f, resimUrl: e.target.value || null }))} placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tarih *</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.tarih?.slice(0, 10) || ""} onChange={e => setForm(f => ({ ...f, tarih: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Yer</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.yer || ""} onChange={e => setForm(f => ({ ...f, yer: e.target.value || null }))} placeholder="Okul kampüsü..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.kategori || "genel"} onChange={e => setForm(f => ({ ...f, kategori: e.target.value }))}>
                <option value="genel">Genel</option>
                <option value="havacilik">Havacılık</option>
                <option value="yazilim">Yazılım</option>
                <option value="saglik">Sağlık</option>
                <option value="spor">Spor</option>
                <option value="kultur">Kültür & Sanat</option>
              </select>
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
