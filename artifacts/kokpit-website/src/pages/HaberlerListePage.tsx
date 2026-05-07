import { useState } from "react";
import { Link } from "wouter";
import { Calendar, ArrowRight, Search } from "lucide-react";
import { useApi } from "@/hooks/useQuery";
import type { Haber } from "@/lib/api";

const KATEGORİLER = ["Tümü", "genel", "havacilik", "yazilim", "saglik", "burs", "etkinlik", "basin"];
const KATEGORİ_ETİKET: Record<string, string> = {
  genel: "Genel", havacilik: "Havacılık", yazilim: "Yazılım", saglik: "Sağlık",
  burs: "Burs & Ödül", etkinlik: "Etkinlik", basin: "Basın",
};

export default function HaberlerListePage() {
  const { data: haberler = [], isLoading } = useApi<Haber[]>("/haberler", { yayinda: "true" });
  const [seciliKat, setSeciliKat] = useState("Tümü");
  const [arama, setArama] = useState("");

  const filtered = haberler.filter(h => {
    const katFiltre = seciliKat === "Tümü" || h.kategori === seciliKat;
    const aramaFiltre = !arama || h.baslik.toLowerCase().includes(arama.toLowerCase()) || h.ozet?.toLowerCase().includes(arama.toLowerCase());
    return katFiltre && aramaFiltre;
  });

  const onemli = haberler.find(h => h.onemli);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sayfa başlığı */}
      <div className="bg-blue-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-blue-300 text-sm font-medium mb-2">📰 Haberler</p>
          <h1 className="text-4xl font-bold mb-3">Güncel Haberler</h1>
          <p className="text-blue-200">Okul ve eğitim dünyasından son gelişmeler</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Öne çıkan haber */}
        {onemli && (
          <Link href={`/haberler/${onemli.id}`} className="group block mb-10 bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
            <div className="md:flex">
              {onemli.resimUrl && (
                <div className="md:w-1/2 overflow-hidden">
                  <img src={onemli.resimUrl} alt={onemli.baslik} className="w-full h-72 md:h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <span className="inline-block text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full mb-4">⭐ Öne Çıkan Haber</span>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">{onemli.baslik}</h2>
                <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">{onemli.ozet}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-gray-400">
                    <Calendar size={14} />
                    {new Date(onemli.yayinTarihi).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1 text-blue-600 text-sm font-medium">Devamını oku <ArrowRight size={15} /></span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Filtreler */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Haber ara..."
              value={arama}
              onChange={e => setArama(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {KATEGORİLER.map(k => (
              <button
                key={k}
                onClick={() => setSeciliKat(k)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  seciliKat === k ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {KATEGORİ_ETİKET[k] || k}
              </button>
            ))}
          </div>
        </div>

        {/* Haber listesi */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-lg font-medium">Haber bulunamadı</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(h => (
              <Link key={h.id} href={`/haberler/${h.id}`} className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all overflow-hidden flex flex-col">
                {h.resimUrl ? (
                  <div className="overflow-hidden">
                    <img src={h.resimUrl} alt={h.baslik} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-4xl">📰</div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{KATEGORİ_ETİKET[h.kategori] || h.kategori}</span>
                    {h.onemli && <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">⭐</span>}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2 flex-1">{h.baslik}</h3>
                  {h.ozet && <p className="text-sm text-gray-500 line-clamp-2 mb-4">{h.ozet}</p>}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={12} />
                      {new Date(h.yayinTarihi).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="text-blue-600 text-xs font-medium flex items-center gap-0.5">Oku <ArrowRight size={12} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
