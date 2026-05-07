import { useState, useEffect, useCallback } from "react";
import ContentTable from "@/components/ContentTable";
import Modal from "@/components/Modal";

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

const empty = { ad: "", unvan: "", bolum: "", resimUrl: "", email: "", telefon: "", biyografi: "", sira: 0, yayinda: true };

export default function EkipPage() {
  const [data, setData] = useState<EkipUye[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<Partial<EkipUye>>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/ekip", { credentials: "include" });
    setData(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function openAdd() { setForm({ ...empty }); setModal("add"); setError(""); }
  function openEdit(row: Record<string, unknown>) { setForm(row as unknown as EkipUye); setModal("edit"); setError(""); }

  async function save() {
    setSaving(true); setError("");
    try {
      const url = modal === "edit" ? `/api/ekip/${form.id}` : "/api/ekip";
      const method = modal === "edit" ? "PATCH" : "POST";
      const payload = {
        ...form,
        bolum: form.bolum || null,
        resimUrl: form.resimUrl || null,
        email: form.email || null,
        telefon: form.telefon || null,
        biyografi: form.biyografi || null,
      };
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(payload) });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Hata"); return; }
      setModal(null); load();
    } finally { setSaving(false); }
  }

  async function del(row: Record<string, unknown>) {
    await fetch(`/api/ekip/${row.id}`, { method: "DELETE", credentials: "include" });
    load();
  }

  const columns = [
    { key: "resimUrl", label: "Fotoğraf", render: (v: unknown) => v ? <img src={String(v)} alt="" className="w-10 h-10 object-cover rounded-full" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} /> : <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs">?</div> },
    { key: "ad", label: "Ad Soyad", render: (_: unknown, row: Record<string, unknown>) => <span className="font-medium">{row.ad as string}</span> },
    { key: "unvan", label: "Ünvan" },
    { key: "bolum", label: "Bölüm", render: (v: unknown) => v ? <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{String(v)}</span> : "-" },
    { key: "yayinda", label: "Durum", render: (v: unknown) => <span className={`px-2 py-0.5 rounded text-xs font-medium ${v ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Görünür" : "Gizli"}</span> },
  ];

  return (
    <>
      <ContentTable title="Eğitim Kadrosu & Ekip" data={data as unknown as Record<string, unknown>[]} columns={columns} loading={loading} onAdd={openAdd} onEdit={openEdit} onDelete={del} addLabel="Üye Ekle" />
      {modal && (
        <Modal title={modal === "add" ? "Yeni Üye" : "Üyeyi Düzenle"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad *</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.ad || ""} onChange={e => setForm(f => ({ ...f, ad: e.target.value }))} />
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fotoğraf URL</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.resimUrl || ""} onChange={e => setForm(f => ({ ...f, resimUrl: e.target.value }))} placeholder="https://..." />
              {form.resimUrl && <img src={form.resimUrl} alt="" className="mt-2 w-16 h-16 object-cover rounded-full" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Biyografi / Hakkında</label>
              <textarea rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.biyografi || ""} onChange={e => setForm(f => ({ ...f, biyografi: e.target.value }))} />
            </div>
            <div className="flex items-center gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sıra No</label>
                <input type="number" className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.sira ?? 0} onChange={e => setForm(f => ({ ...f, sira: Number(e.target.value) }))} />
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer mt-5">
                <input type="checkbox" checked={form.yayinda ?? true} onChange={e => setForm(f => ({ ...f, yayinda: e.target.checked }))} className="rounded" />
                Sitede Göster
              </label>
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
