import { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { useApi } from "@/hooks/useQuery";
import type { Etkinlik } from "@/lib/api";

const KATEGORİLER = ["Tümü", "genel", "havacilik", "yazilim", "saglik", "spor", "kultur"];
const KATEGORİ_ETİKET: Record<string, string> = {
  genel: "Genel", havacilik: "Havacılık", yazilim: "Yazılım",
  saglik: "Sağlık", spor: "Spor", kultur: "Kültür & Sanat",
};

export default function EtkinliklerPage() {
  const { data: etkinlikler = [], isLoading } = useApi<Etkinlik[]>("/etkinlikler", { yayinda: "true" });
  const [seciliKat, setSeciliKat] = useState("Tümü");
  const [gosterGecmis, setGosterGecmis] = useState(false);

  const bugun = new Date(); bugun.setHours(0, 0, 0, 0);

  const filtered = etkinlikler.filter(e => {
    const katFiltre = seciliKat === "Tümü" || e.kategori === seciliKat;
    const tarihFiltre = gosterGecmis || new Date(e.tarih) >= bugun;
    return katFiltre && tarihFiltre;
  });

  const yaklasan = filtered.filter(e => new Date(e.tarih) >= bugun);
  const gecmis = filtered.filter(e => new Date(e.tarih) < bugun);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-800 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-green-300 text-sm font-medium mb-2">🎯 Etkinlikler</p>
          <h1 className="text-4xl font-bold mb-3">Etkinlikler</h1>
          <p className="text-green-100">Okul etkinlikleri ve organizasyonlar</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {KATEGORİLER.map(k => (
            <button
              key={k}
              onClick={() => setSeciliKat(k)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                seciliKat === k ? "bg-green-700 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {KATEGORİ_ETİKET[k] || k}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-5 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {yaklasan.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-green-600 rounded-full inline-block" />
                  Yaklaşan Etkinlikler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {yaklasan.map(e => <EtkinlikKarti key={e.id} etkinlik={e} />)}
                </div>
              </div>
            )}

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-6 bg-gray-400 rounded-full inline-block" />
                Geçmiş Etkinlikler
              </h2>
              <button
                onClick={() => setGosterGecmis(g => !g)}
                className="text-sm text-blue-600 hover:underline"
              >
                {gosterGecmis ? "Gizle" : `Göster (${gecmis.length})`}
              </button>
            </div>
            {gosterGecmis && gecmis.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-70">
                {gecmis.map(e => <EtkinlikKarti key={e.id} etkinlik={e} gecmis />)}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <div className="text-5xl mb-4">📅</div>
                <p>Etkinlik bulunamadı</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function EtkinlikKarti({ etkinlik: e, gecmis }: { etkinlik: Etkinlik; gecmis?: boolean }) {
  const tarih = new Date(e.tarih);
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all ${gecmis ? "opacity-75" : ""}`}>
      {e.resimUrl ? (
        <div className="overflow-hidden">
          <img src={e.resimUrl} alt={e.baslik} className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300" />
        </div>
      ) : (
        <div className="w-full h-44 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center text-5xl">🎯</div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-blue-600 text-white rounded-xl px-3 py-2 text-center min-w-[52px]">
            <div className="text-xl font-bold leading-none">{tarih.getDate()}</div>
            <div className="text-xs leading-none mt-0.5 opacity-90">{tarih.toLocaleDateString("tr-TR", { month: "short" })}</div>
          </div>
          <div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full block mb-1">{KATEGORİ_ETİKET[e.kategori] || e.kategori}</span>
            <span className="text-xs text-gray-400">{tarih.getFullYear()}</span>
          </div>
        </div>
        <h3 className="font-bold text-gray-900 mb-2 leading-snug line-clamp-2">{e.baslik}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{e.aciklama}</p>
        {e.yer && (
          <p className="flex items-center gap-1.5 text-xs text-gray-400">
            <MapPin size={12} className="shrink-0" /> {e.yer}
          </p>
        )}
      </div>
    </div>
  );
}
