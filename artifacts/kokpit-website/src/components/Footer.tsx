import { Link } from "wouter";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { useApi } from "@/hooks/useQuery";
import type { SiteAyar } from "@/lib/api";

export default function Footer() {
  const { data: ayarlar } = useApi<SiteAyar[]>("/site-ayarlari");
  const m: Record<string, string> = {};
  ayarlar?.forEach(a => { m[a.anahtar] = a.deger; });

  const yil = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-6 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Kurum bilgisi */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">K</div>
              <span className="text-white font-bold text-lg">{m["okul_adi"] || "Kokpit Okulları"}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-sm">
              {m["meta_aciklama"] || "Geleceğin mesleklerine bugünden hazırlayan, öğrenci odaklı eğitim anlayışıyla hizmet veriyoruz."}
            </p>
            <div className="flex items-center gap-3">
              {m["instagram_url"] && (
                <a href={m["instagram_url"]} target="_blank" rel="noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors">
                  <Instagram size={16} />
                </a>
              )}
              {m["facebook_url"] && (
                <a href={m["facebook_url"]} target="_blank" rel="noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Facebook size={16} />
                </a>
              )}
              {m["youtube_url"] && (
                <a href={m["youtube_url"]} target="_blank" rel="noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                  <Youtube size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Hızlı bağlantılar */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Sayfalar</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Hakkımızda", href: "/hakkimizda" },
                { label: "Haberler", href: "/haberler" },
                { label: "Duyurular", href: "/duyurular" },
                { label: "Etkinlikler", href: "/etkinlikler" },
                { label: "Galeri", href: "/galeri" },
                { label: "Kadromuz", href: "/ekip" },
                { label: "İletişim", href: "/iletisim" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">İletişim</h4>
            <ul className="space-y-3">
              {m["adres"] && (
                <li className="flex items-start gap-2.5 text-sm text-gray-400">
                  <MapPin size={15} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>{m["adres"]}</span>
                </li>
              )}
              {m["telefon"] && (
                <li>
                  <a href={`tel:${m["telefon"]}`} className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                    <Phone size={15} className="text-blue-400 shrink-0" />
                    {m["telefon"]}
                  </a>
                </li>
              )}
              {m["email"] && (
                <li>
                  <a href={`mailto:${m["email"]}`} className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                    <Mail size={15} className="text-blue-400 shrink-0" />
                    {m["email"]}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© {yil} {m["okul_adi"] || "Kokpit Okulları"}. Tüm hakları saklıdır.</p>
          <Link href="/kvkk" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">KVKK & Gizlilik</Link>
        </div>
      </div>
    </footer>
  );
}
