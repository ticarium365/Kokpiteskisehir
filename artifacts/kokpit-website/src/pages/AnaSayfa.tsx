import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Calendar, Bell, ArrowRight, MapPin } from "lucide-react";
import { useApi } from "@/hooks/useQuery";
import type { Slider, Haber, Duyuru, Etkinlik, FotoGaleri } from "@/lib/api";

// ─── Slider ────────────────────────────────────────────────────────────────
function HeroSlider() {
  const { data: slides = [] } = useApi<Slider[]>("/slider", { yayinda: "true" });
  const [idx, setIdx] = useState(0);

  const prev = useCallback(() => setIdx(i => (i - 1 + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % slides.length), [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, slides.length]);

  if (!slides.length) {
    return (
      <div className="h-[520px] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center">
        <div className="text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Kokpit Okulları</h1>
          <p className="text-xl text-blue-200">Geleceğin mesleklerine bugünden hazırlanın</p>
        </div>
      </div>
    );
  }

  const slide = slides[idx];
  return (
    <div className="relative h-[520px] md:h-[620px] overflow-hidden bg-gray-900">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
        >
          <img src={s.resimUrl} alt={s.baslik} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
      ))}
      <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
        <div className="max-w-xl text-white">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">{slide.baslik}</h1>
          {slide.altBaslik && <p className="text-lg text-white/85 mb-8 drop-shadow">{slide.altBaslik}</p>}
          {slide.butonYazi && slide.butonLink && (
            <Link href={slide.butonLink} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl transition-colors shadow-lg">
              {slide.butonYazi} <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </div>
      {slides.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm">
            <ChevronLeft size={22} />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm">
            <ChevronRight size={22} />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === idx ? "bg-white w-7" : "bg-white/50"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Haberler ──────────────────────────────────────────────────────────────
function HaberlerSection() {
  const { data: haberler = [] } = useApi<Haber[]>("/haberler", { yayinda: "true" });
  const son = haberler.slice(0, 6);
  if (!son.length) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">Son Haberler</p>
            <h2 className="text-3xl font-bold text-gray-900">Güncel Haberler</h2>
          </div>
          <Link href="/haberler" className="hidden sm:flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
            Tüm haberler <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {son.map(h => (
            <Link key={h.id} href={`/haberler/${h.id}`} className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all overflow-hidden flex flex-col">
              {h.resimUrl ? (
                <div className="overflow-hidden">
                  <img src={h.resimUrl} alt={h.baslik} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <span className="text-5xl">📰</span>
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full capitalize">{h.kategori}</span>
                  {h.onemli && <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">Öne çıkan</span>}
                </div>
                <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-blue-700 transition-colors line-clamp-2 flex-1">{h.baslik}</h3>
                {h.ozet && <p className="text-sm text-gray-500 line-clamp-2 mb-3">{h.ozet}</p>}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-auto">
                  <Calendar size={13} />
                  {new Date(h.yayinTarihi).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/haberler" className="inline-flex items-center gap-1.5 text-blue-600 font-medium text-sm">Tüm haberler <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}

// ─── Duyurular ─────────────────────────────────────────────────────────────
function DuyurularSection() {
  const { data: duyurular = [] } = useApi<Duyuru[]>("/duyurular", { yayinda: "true" });
  const son = duyurular.slice(0, 5);
  if (!son.length) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider mb-2">Duyurular</p>
            <h2 className="text-3xl font-bold text-gray-900">Önemli Duyurular</h2>
          </div>
          <Link href="/duyurular" className="hidden sm:flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
            Tüm duyurular <ArrowRight size={16} />
          </Link>
        </div>
        <div className="space-y-3">
          {son.map(d => (
            <Link key={d.id} href="/duyurular" className="group flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:border-orange-100 hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${d.onemli ? "bg-red-50" : "bg-orange-50"}`}>
                <Bell size={18} className={d.onemli ? "text-red-500" : "text-orange-400"} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {d.onemli && <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">ACİL</span>}
                  <span className="text-xs text-gray-400 capitalize">{d.kategori}</span>
                </div>
                <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors line-clamp-1">{d.baslik}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{d.icerik}</p>
              </div>
              <span className="text-xs text-gray-400 shrink-0 mt-1">
                {new Date(d.yayinTarihi).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Etkinlikler ───────────────────────────────────────────────────────────
function EtkinliklerSection() {
  const { data: etkinlikler = [] } = useApi<Etkinlik[]>("/etkinlikler", { yayinda: "true" });
  const yakinda = etkinlikler
    .filter(e => new Date(e.tarih) >= new Date(new Date().setHours(0, 0, 0, 0)))
    .slice(0, 3);
  if (!yakinda.length) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">Yaklaşan</p>
            <h2 className="text-3xl font-bold text-gray-900">Etkinlikler</h2>
          </div>
          <Link href="/etkinlikler" className="hidden sm:flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
            Tüm etkinlikler <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {yakinda.map(e => {
            const tarih = new Date(e.tarih);
            return (
              <div key={e.id} className="group bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all overflow-hidden">
                {e.resimUrl ? (
                  <div className="overflow-hidden">
                    <img src={e.resimUrl} alt={e.baslik} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                ) : (
                  <div className="w-full h-44 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                    <span className="text-5xl">🎯</span>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-blue-600 text-white rounded-xl px-3 py-1.5 text-center">
                      <div className="text-lg font-bold leading-none">{tarih.getDate()}</div>
                      <div className="text-xs leading-none mt-0.5">{tarih.toLocaleDateString("tr-TR", { month: "short" })}</div>
                    </div>
                    <span className="text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full font-medium capitalize">{e.kategori}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">{e.baslik}</h3>
                  {e.yer && (
                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                      <MapPin size={12} /> {e.yer}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Fotoğraf Galerisi ─────────────────────────────────────────────────────
function GaleriSection() {
  const { data: fotolar = [] } = useApi<FotoGaleri[]>("/foto-galeri", { yayinda: "true" });
  const son = fotolar.slice(0, 8);
  if (!son.length) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-purple-600 font-semibold text-sm uppercase tracking-wider mb-2">Fotoğraflar</p>
            <h2 className="text-3xl font-bold text-gray-900">Galeri</h2>
          </div>
          <Link href="/galeri" className="hidden sm:flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
            Tüm fotoğraflar <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {son.map(f => (
            <Link key={f.id} href="/galeri" className="group relative aspect-square overflow-hidden rounded-xl">
              <img src={f.resimUrl} alt={f.baslik} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-3 opacity-0 group-hover:opacity-100">
                <span className="text-white text-xs font-medium line-clamp-1">{f.baslik}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AnaSayfa() {
  return (
    <>
      <HeroSlider />
      <HaberlerSection />
      <DuyurularSection />
      <EtkinliklerSection />
      <GaleriSection />
    </>
  );
}
