import { useState, useEffect, useCallback } from "react";
import Modal from "@/components/Modal";

interface Kullanici {
  id: number;
  ad: string;
  soyad: string;
  email: string;
  telefon: string | null;
  rol: string;
  sinif: string | null;
  aktif: boolean;
  notlar: string | null;
  createdAt: string;
}

const bos = { ad: "", soyad: "", email: "", telefon: "", rol: "veli", sinif: "", sifre: "", aktif: true, notlar: "" };

const ROL_ETIKET: Record<string, string> = {
  veli: "Veli",
  ogrenci: "Öğrenci",
  ogretmen: "Öğretmen",
  yonetici: "Yönetici",
};

const ROL_RENK: Record<string, string> = {
  veli: "bg-blue-50 text-blue-700",
  ogrenci: "bg-green-50 text-green-700",
  ogretmen: "bg-purple-50 text-purple-700",
  yonetici: "bg-red-50 text-red-700",
};

export default function KullanicilarPage() {
  const [data, setData] = useState<Kullanici[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"ekle" | "duzenle" | null>(null);
  const [form, setForm] = useState<Partial<Kullanici & { sifre: string }>>(bos);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [hata, setHata] = useState("");
  const [filtre, setFiltre] = useState({ rol: "", arama: "" });
  const [silinecekId, setSilinecekId] = useState<number | null>(null);

  const yukle = useCallback(async () => {
    setLoading(true);
    let url = "/api/kullanicilar";
    if (filtre.rol) url += `?rol=${filtre.rol}`;
    const r = await fetch(url, { credentials: "include" });
    setData(await r.json());
    setLoading(false);
  }, [filtre.rol]);

  useEffect(() => { yukle(); }, [yukle]);

  function ekleAc() { setForm({ ...bos }); setModal("ekle"); setHata(""); }
  function duzenleAc(k: Kullanici) { setForm({ ...k, sifre: "" }); setModal("duzenle"); setHata(""); }

  async function kaydet() {
    setKaydediliyor(true); setHata("");
    try {
      const url = modal === "duzenle" ? `/api/kullanicilar/${form.id}` : "/api/kullanicilar";
      const method = modal === "duzenle" ? "PATCH" : "POST";
      const payload: Record<string, unknown> = { ...form };
      if (!payload.sifre) delete payload.sifre;
      payload.telefon = payload.telefon || null;
      payload.sinif = payload.sinif || null;
      payload.notlar = payload.notlar || null;
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(payload) });
      if (!r.ok) { const d = await r.json(); setHata(d.error || "Bir hata oluştu"); return; }
      setModal(null); yukle();
    } finally { setKaydediliyor(false); }
  }

  async function sil(id: number) {
    await fetch(`/api/kullanicilar/${id}`, { method: "DELETE", credentials: "include" });
    setSilinecekId(null); yukle();
  }

  const gorunenler = data.filter(k => {
    if (!filtre.arama) return true;
    const q = filtre.arama.toLowerCase();
    return k.ad.toLowerCase().includes(q) || k.soyad.toLowerCase().includes(q) || k.email.toLowerCase().includes(q);
  });

  const sayilar = {
    toplam: data.length,
    veli: data.filter(k => k.rol === "veli").length,
    ogrenci: data.filter(k => k.rol === "ogrenci").length,
    ogretmen: data.filter(k => k.rol === "ogretmen").length,
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Kullanıcı Yönetimi</h2>
            <p className="text-sm text-gray-500 mt-1">Veli, öğrenci ve öğretmen hesaplarını buradan yönetin.</p>
          </div>
          <button onClick={ekleAc} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center gap-2">
            + Kullanıcı Ekle
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Toplam", value: sayilar.toplam, bg: "bg-gray-50", text: "text-gray-700" },
            { label: "Veli", value: sayilar.veli, bg: "bg-blue-50", text: "text-blue-700" },
            { label: "Öğrenci", value: sayilar.ogrenci, bg: "bg-green-50", text: "text-green-700" },
            { label: "Öğretmen", value: sayilar.ogretmen, bg: "bg-purple-50", text: "text-purple-700" },
          ].map(s => (
            <div key={s.label} className={`${s.bg} ${s.text} rounded-xl p-4`}>
              <div className="text-2xl font-bold">{loading ? "—" : s.value}</div>
              <div className="text-sm font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Ad, soyad veya e-posta ile ara..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filtre.arama}
            onChange={e => setFiltre(f => ({ ...f, arama: e.target.value }))}
          />
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filtre.rol}
            onChange={e => setFiltre(f => ({ ...f, rol: e.target.value }))}
          >
            <option value="">Tüm Roller</option>
            <option value="veli">Veli</option>
            <option value="ogrenci">Öğrenci</option>
            <option value="ogretmen">Öğretmen</option>
            <option value="yonetici">Yönetici</option>
          </select>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">Yükleniyor...</div>
        ) : gorunenler.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-400 text-sm">Kullanıcı bulunamadı.</p>
            <button onClick={ekleAc} className="mt-3 text-blue-600 text-sm hover:underline">İlk kullanıcıyı ekle →</button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Ad Soyad</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">E-posta</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Rol</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Sınıf</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Durum</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {gorunenler.map(k => (
                  <tr key={k.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{k.ad} {k.soyad}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{k.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${ROL_RENK[k.rol] || "bg-gray-100 text-gray-600"}`}>
                        {ROL_ETIKET[k.rol] || k.rol}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{k.sinif || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${k.aktif ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {k.aktif ? "Aktif" : "Pasif"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {silinecekId === k.id ? (
                        <span className="flex items-center gap-2 justify-end">
                          <span className="text-xs text-gray-500">Silinsin mi?</span>
                          <button onClick={() => sil(k.id)} className="text-xs text-red-600 hover:underline font-medium">Evet, sil</button>
                          <button onClick={() => setSilinecekId(null)} className="text-xs text-gray-500 hover:underline">Vazgeç</button>
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 justify-end">
                          <button onClick={() => duzenleAc(k)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Düzenle</button>
                          <button onClick={() => setSilinecekId(k.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Sil</button>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <Modal title={modal === "ekle" ? "Yeni Kullanıcı" : "Kullanıcıyı Düzenle"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            {hata && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{hata}</div>}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad *</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.ad || ""} onChange={e => setForm(f => ({ ...f, ad: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Soyad *</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.soyad || ""} onChange={e => setForm(f => ({ ...f, soyad: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-posta *</label>
              <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.email || ""} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {modal === "duzenle" ? "Yeni Şifre" : "Şifre *"}
                  {modal === "duzenle" && <span className="text-gray-400 font-normal ml-1">(boş = değişmez)</span>}
                </label>
                <input type="password" autoComplete="new-password" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.sifre || ""} onChange={e => setForm(f => ({ ...f, sifre: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.telefon || ""} onChange={e => setForm(f => ({ ...f, telefon: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol *</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.rol || "veli"} onChange={e => setForm(f => ({ ...f, rol: e.target.value }))}>
                  <option value="veli">Veli</option>
                  <option value="ogrenci">Öğrenci</option>
                  <option value="ogretmen">Öğretmen</option>
                  <option value="yonetici">Yönetici</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sınıf / Şube</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.sinif || ""} onChange={e => setForm(f => ({ ...f, sinif: e.target.value }))} placeholder="10-A, 11-B..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notlar</label>
              <textarea rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.notlar || ""} onChange={e => setForm(f => ({ ...f, notlar: e.target.value }))} placeholder="Yalnızca admin tarafından görülen notlar..." />
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.aktif ?? true} onChange={e => setForm(f => ({ ...f, aktif: e.target.checked }))} className="rounded" />
              Hesap aktif (sisteme giriş yapabilir)
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
