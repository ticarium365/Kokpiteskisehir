import { useApi } from "@/hooks/useQuery";
import type { SayfaIcerigi } from "@/lib/api";

export default function HakkimizdaPage() {
  const { data: hakkimizda } = useApi<SayfaIcerigi>("/sayfa-icerikleri/hakkimizda");
  const { data: misyon } = useApi<SayfaIcerigi>("/sayfa-icerikleri/misyon-vizyon");
  const { data: hedefler } = useApi<SayfaIcerigi>("/sayfa-icerikleri/hedeflerimiz");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative bg-blue-900 text-white py-20 overflow-hidden">
        {hakkimizda?.resimUrl && (
          <div className="absolute inset-0">
            <img src={hakkimizda.resimUrl} alt="" className="w-full h-full object-cover opacity-20" />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-blue-300 text-sm font-medium mb-3">🏫 Hakkımızda</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {hakkimizda?.baslik || "Kokpit Okulları"}
          </h1>
          {hakkimizda?.altBaslik && (
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">{hakkimizda.altBaslik}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Hakkımızda metni */}
        {hakkimizda?.icerik && (
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 mb-8">
            <div
              className="prose prose-gray max-w-none text-gray-700 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: hakkimizda.icerik.replace(/\n/g, "<br />") }}
            />
            {hakkimizda.ekIcerik && (
              <div
                className="mt-6 pt-6 border-t border-gray-100 prose prose-gray max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: hakkimizda.ekIcerik.replace(/\n/g, "<br />") }}
              />
            )}
          </div>
        )}

        {/* Misyon - Vizyon */}
        {(misyon?.icerik || misyon?.ekIcerik) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {misyon.icerik && (
              <div className="bg-blue-700 text-white rounded-2xl p-8">
                <div className="text-4xl mb-4">🎯</div>
                <h2 className="text-xl font-bold mb-4">{misyon.baslik || "Misyonumuz"}</h2>
                <div
                  className="text-blue-100 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: misyon.icerik.replace(/\n/g, "<br />") }}
                />
              </div>
            )}
            {misyon.ekIcerik && (
              <div className="bg-gray-900 text-white rounded-2xl p-8">
                <div className="text-4xl mb-4">🔭</div>
                <h2 className="text-xl font-bold mb-4">Vizyonumuz</h2>
                <div
                  className="text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: misyon.ekIcerik.replace(/\n/g, "<br />") }}
                />
              </div>
            )}
          </div>
        )}

        {/* Hedeflerimiz */}
        {hedefler?.icerik && (
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100">
            <div className="text-3xl mb-2">📈</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{hedefler.baslik || "Hedeflerimiz"}</h2>
            <div
              className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: hedefler.icerik.replace(/\n/g, "<br />") }}
            />
          </div>
        )}

        {/* Hiç içerik yoksa varsayılan */}
        {!hakkimizda?.icerik && !misyon?.icerik && !hedefler?.icerik && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-4">🏫</div>
            <p className="text-lg">İçerik yükleniyor...</p>
            <p className="text-sm mt-2">Admin panelinden "Sayfa İçerikleri" bölümünde içerik ekleyebilirsiniz.</p>
          </div>
        )}
      </div>
    </div>
  );
}
