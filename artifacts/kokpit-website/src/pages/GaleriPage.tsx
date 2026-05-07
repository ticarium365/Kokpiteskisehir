import { useState } from "react";
import { Play, X } from "lucide-react";
import { useApi } from "@/hooks/useQuery";
import type { FotoGaleri, VideoGaleri } from "@/lib/api";

export default function GaleriPage() {
  const { data: fotolar = [], isLoading: fotoLoading } = useApi<FotoGaleri[]>("/foto-galeri", { yayinda: "true" });
  const { data: videolar = [] } = useApi<VideoGaleri[]>("/video-galeri", { yayinda: "true" });
  const [sekme, setSekme] = useState<"foto" | "video">("foto");
  const [seciliKat, setSeciliKat] = useState("Tümü");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const fotoKategoriler = ["Tümü", ...Array.from(new Set(fotolar.map(f => f.kategori)))];
  const videoKategoriler = ["Tümü", ...Array.from(new Set(videolar.map(v => v.kategori)))];

  const filteredFoto = seciliKat === "Tümü" ? fotolar : fotolar.filter(f => f.kategori === seciliKat);
  const filteredVideo = seciliKat === "Tümü" ? videolar : videolar.filter(v => v.kategori === seciliKat);

  function kategoríDegistir(kat: string) {
    setSeciliKat(kat);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-purple-300 text-sm font-medium mb-2">📷 Galeri</p>
          <h1 className="text-4xl font-bold mb-3">Medya Galerisi</h1>
          <p className="text-purple-200">Okul hayatından fotoğraf ve videolar</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Sekme */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => { setSekme("foto"); setSeciliKat("Tümü"); }}
            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-colors ${sekme === "foto" ? "bg-purple-700 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
          >
            📷 Fotoğraflar {fotolar.length > 0 && `(${fotolar.length})`}
          </button>
          <button
            onClick={() => { setSekme("video"); setSeciliKat("Tümü"); }}
            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-colors ${sekme === "video" ? "bg-red-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
          >
            🎬 Videolar {videolar.length > 0 && `(${videolar.length})`}
          </button>
        </div>

        {/* Kategori filtre */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(sekme === "foto" ? fotoKategoriler : videoKategoriler).map(k => (
            <button
              key={k}
              onClick={() => kategoríDegistir(k)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${
                seciliKat === k
                  ? sekme === "foto" ? "bg-purple-700 text-white" : "bg-red-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        {/* Fotoğraflar */}
        {sekme === "foto" && (
          fotoLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filteredFoto.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">📷</div>
              <p>Fotoğraf bulunamadı</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredFoto.map(f => (
                <button
                  key={f.id}
                  onClick={() => setLightbox(f.resimUrl)}
                  className="group relative aspect-square overflow-hidden rounded-xl focus:outline-none"
                >
                  <img src={f.resimUrl} alt={f.baslik} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-3 opacity-0 group-hover:opacity-100">
                    <span className="text-white text-xs font-medium line-clamp-1 text-left">{f.baslik}</span>
                  </div>
                </button>
              ))}
            </div>
          )
        )}

        {/* Videolar */}
        {sekme === "video" && (
          filteredVideo.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">🎬</div>
              <p>Video bulunamadı</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideo.map(v => (
                <a
                  key={v.id}
                  href={`https://youtube.com/watch?v=${v.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                      alt={v.baslik}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play size={22} className="text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-red-600 bg-red-50 px-2.5 py-1 rounded-full capitalize font-medium">{v.kategori}</span>
                    <h3 className="font-semibold text-gray-900 mt-2 line-clamp-2 group-hover:text-red-700 transition-colors">{v.baslik}</h3>
                  </div>
                </a>
              ))}
            </div>
          )
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X size={20} />
          </button>
          <img
            src={lightbox}
            alt="Büyük görsel"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
