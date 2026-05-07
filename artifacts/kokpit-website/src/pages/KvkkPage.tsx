import { useApi } from "@/hooks/useQuery";
import type { SayfaIcerigi } from "@/lib/api";

export default function KvkkPage() {
  const { data: icerik } = useApi<SayfaIcerigi>("/sayfa-icerikleri/kvkk");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-800 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-gray-400 text-sm font-medium mb-2">📋 Yasal</p>
          <h1 className="text-4xl font-bold mb-3">{icerik?.baslik || "KVKK & Gizlilik Politikası"}</h1>
          {icerik?.altBaslik && <p className="text-gray-300">{icerik.altBaslik}</p>}
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100">
          {icerik?.icerik ? (
            <div
              className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: icerik.icerik.replace(/\n/g, "<br />") }}
            />
          ) : (
            <p className="text-gray-400 text-center py-10">İçerik henüz eklenmedi.</p>
          )}
        </div>
      </div>
    </div>
  );
}
