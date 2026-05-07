import { useState } from "react";
import { Bell, Calendar, ChevronDown } from "lucide-react";
import { useApi } from "@/hooks/useQuery";
import type { Duyuru } from "@/lib/api";

const KATEGORİLER = ["Tümü", "genel", "sinav", "kayit", "tatil", "veli", "burs", "saglik"];
const KATEGORİ_ETİKET: Record<string, string> = {
  genel: "Genel", sinav: "Sınav", kayit: "Kayıt & Başvuru",
  tatil: "Tatil", veli: "Veli Toplantısı", burs: "Burs", saglik: "Sağlık",
};

export default function DuyurularPage() {
  const { data: duyurular = [], isLoading } = useApi<Duyuru[]>("/duyurular", { yayinda: "true" });
  const [seciliKat, setSeciliKat] = useState("Tümü");
  const [acilanId, setAcilanId] = useState<number | null>(null);

  const filtered = seciliKat === "Tümü" ? duyurular : duyurular.filter(d => d.kategori === seciliKat);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-orange-200 text-sm font-medium mb-2">🔔 Duyurular</p>
          <h1 className="text-4xl font-bold mb-3">Duyurular</h1>
          <p className="text-orange-100">Öğrenci ve velilere yönelik güncel bilgilendirmeler</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Kategoriler */}
        <div className="flex flex-wrap gap-2 mb-8">
          {KATEGORİLER.map(k => (
            <button
              key={k}
              onClick={() => setSeciliKat(k)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                seciliKat === k ? "bg-orange-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {KATEGORİ_ETİKET[k] || k}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-20 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">📭</div>
            <p>Duyuru bulunamadı</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(d => (
              <div key={d.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-shadow hover:shadow-md">
                <button
                  className="w-full text-left flex items-start gap-4 p-5"
                  onClick={() => setAcilanId(acilanId === d.id ? null : d.id)}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${d.onemli ? "bg-red-50" : "bg-orange-50"}`}>
                    <Bell size={18} className={d.onemli ? "text-red-500" : "text-orange-400"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {d.onemli && <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">ACİL</span>}
                      <span className="text-xs text-gray-400">{KATEGORİ_ETİKET[d.kategori] || d.kategori}</span>
                    </div>
                    <p className="font-semibold text-gray-900">{d.baslik}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar size={11} />
                        {new Date(d.yayinTarihi).toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}
                      </span>
                      {d.bitisTarihi && (
                        <span className="text-xs text-gray-400">
                          → {new Date(d.bitisTarihi).toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 shrink-0 transition-transform ${acilanId === d.id ? "rotate-180" : ""}`}
                  />
                </button>
                {acilanId === d.id && (
                  <div className="px-5 pb-5">
                    <div className="pt-4 border-t border-gray-50 text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {d.icerik}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
