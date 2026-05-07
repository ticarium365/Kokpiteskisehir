import { Link, useParams } from "wouter";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import { useApi } from "@/hooks/useQuery";
import type { Haber } from "@/lib/api";

const KATEGORİ_ETİKET: Record<string, string> = {
  genel: "Genel", havacilik: "Havacılık", yazilim: "Yazılım", saglik: "Sağlık",
  burs: "Burs & Ödül", etkinlik: "Etkinlik", basin: "Basın",
};

export default function HaberDetayPage() {
  const params = useParams<{ id: string }>();
  const { data: haberler = [], isLoading } = useApi<Haber[]>("/haberler", { yayinda: "true" });

  const haber = haberler.find(h => h.id === Number(params.id));
  const diger = haberler.filter(h => h.id !== Number(params.id)).slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6" />
          <div className="h-72 bg-gray-200 rounded-2xl mb-8" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => <div key={i} className="h-4 bg-gray-200 rounded" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!haber) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Haber bulunamadı</h1>
          <Link href="/haberler" className="text-blue-600 hover:underline">← Haberlere dön</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero görseli */}
      {haber.resimUrl && (
        <div className="h-72 md:h-96 overflow-hidden bg-gray-900">
          <img src={haber.resimUrl} alt={haber.baslik} className="w-full h-full object-cover opacity-90" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-10">
          {/* Ana içerik */}
          <article className="flex-1 min-w-0">
            <Link href="/haberler" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 mb-6 transition-colors font-medium">
              <ArrowLeft size={16} /> Haberlere Dön
            </Link>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="flex items-center gap-1.5 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                  <Tag size={13} /> {KATEGORİ_ETİKET[haber.kategori] || haber.kategori}
                </span>
                {haber.onemli && <span className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">⭐ Öne Çıkan</span>}
                <span className="flex items-center gap-1.5 text-sm text-gray-400 ml-auto">
                  <Calendar size={14} />
                  {new Date(haber.yayinTarihi).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 leading-snug">{haber.baslik}</h1>

              {haber.ozet && (
                <p className="text-lg text-gray-600 leading-relaxed mb-6 pb-6 border-b border-gray-100 font-medium">{haber.ozet}</p>
              )}

              <div
                className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: haber.icerik.replace(/\n/g, "<br />") }}
              />
            </div>
          </article>

          {/* Yan panel */}
          {diger.length > 0 && (
            <aside className="hidden lg:block w-80 shrink-0">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-20">
                <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wider">Diğer Haberler</h3>
                <div className="space-y-4">
                  {diger.map(h => (
                    <Link key={h.id} href={`/haberler/${h.id}`} className="group flex gap-3">
                      {h.resimUrl ? (
                        <img src={h.resimUrl} alt="" className="w-16 h-16 object-cover rounded-xl shrink-0" />
                      ) : (
                        <div className="w-16 h-16 bg-blue-50 rounded-xl shrink-0 flex items-center justify-center text-xl">📰</div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">{h.baslik}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(h.yayinTarihi).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
