import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { useApi } from "@/hooks/useQuery";
import type { SiteAyar } from "@/lib/api";

const MENU = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Haberler", href: "/haberler" },
  { label: "Duyurular", href: "/duyurular" },
  { label: "Etkinlikler", href: "/etkinlikler" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kadromuz", href: "/ekip" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  const { data: ayarlar } = useApi<SiteAyar[]>("/site-ayarlari");
  const ayarMap: Record<string, string> = {};
  ayarlar?.forEach(a => { ayarMap[a.anahtar] = a.deger; });
  const okulAdi = ayarMap["okul_adi"] || "Kokpit Okulları";
  const telefon = ayarMap["telefon"] || "";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-md shadow-sm"}`}>
      {/* Üst bilgi şeridi */}
      {telefon && (
        <div className="bg-blue-900 text-white text-xs py-1.5 px-4 hidden md:flex items-center justify-end gap-6">
          <a href={`tel:${telefon}`} className="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
            <Phone size={12} /> {telefon}
          </a>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-blue-800 transition-colors">
            K
          </div>
          <span className="font-bold text-gray-900 text-lg leading-tight">{okulAdi}</span>
        </Link>

        {/* Masaüstü menü */}
        <nav className="hidden lg:flex items-center gap-1">
          {MENU.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location === item.href
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobil menü butonu */}
        <button
          onClick={() => setOpen(o => !o)}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobil menü */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-3 shadow-lg">
          {MENU.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors ${
                location === item.href
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
