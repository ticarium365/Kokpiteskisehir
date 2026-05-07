import { useState } from "react";
import { Mail } from "lucide-react";
import { useApi } from "@/hooks/useQuery";
import type { EkipUye } from "@/lib/api";

export default function EkipPage() {
  const { data: ekip = [], isLoading } = useApi<EkipUye[]>("/ekip", { yayinda: "true" });
  const [seciliBolum, setSeciliBolum] = useState("Tümü");

  const bolumler = ["Tümü", ...Array.from(new Set(ekip.map(u => u.bolum).filter(Boolean) as string[]))];
  const filtered = seciliBolum === "Tümü" ? ekip : ekip.filter(u => u.bolum === seciliBolum);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-blue-300 text-sm font-medium mb-2">👩‍🏫 Kadromuz</p>
          <h1 className="text-4xl font-bold mb-3">Eğitim Kadromuz</h1>
          <p className="text-blue-200">Uzman ve deneyimli öğretmenlerimiz</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {bolumler.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {bolumler.map(b => (
              <button
                key={b}
                onClick={() => setSeciliBolum(b)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  seciliBolum === b ? "bg-blue-700 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">👤</div>
            <p>Üye bulunamadı</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.sort((a, b) => a.sira - b.sira).map(u => (
              <div key={u.id} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all text-center">
                {u.resimUrl ? (
                  <img
                    src={u.resimUrl}
                    alt={u.ad}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-gray-100 group-hover:border-blue-100 transition-colors"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-blue-600">{u.ad.charAt(0)}</span>
                  </div>
                )}
                <h3 className="font-bold text-gray-900 text-base mb-1">{u.ad}</h3>
                <p className="text-sm text-blue-600 font-medium mb-1">{u.unvan}</p>
                {u.bolum && (
                  <span className="inline-block text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full mb-3">{u.bolum}</span>
                )}
                {u.biyografi && (
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-3">{u.biyografi}</p>
                )}
                {u.email && (
                  <a
                    href={`mailto:${u.email}`}
                    className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Mail size={12} /> {u.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
