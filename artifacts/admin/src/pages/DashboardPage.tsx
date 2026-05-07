import { useEffect, useState } from "react";

interface Stats {
  haberler: number;
  duyurular: number;
  etkinlikler: number;
  fotolar: number;
  videolar: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/haberler", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/duyurular", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/etkinlikler", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/foto-galeri", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/video-galeri", { credentials: "include" }).then((r) => r.json()),
    ]).then(([haberler, duyurular, etkinlikler, fotolar, videolar]) => {
      setStats({
        haberler: Array.isArray(haberler) ? haberler.length : 0,
        duyurular: Array.isArray(duyurular) ? duyurular.length : 0,
        etkinlikler: Array.isArray(etkinlikler) ? etkinlikler.length : 0,
        fotolar: Array.isArray(fotolar) ? fotolar.length : 0,
        videolar: Array.isArray(videolar) ? videolar.length : 0,
      });
    });
  }, []);

  const cards = [
    { label: "Haberler", value: stats?.haberler, icon: "📰", color: "bg-blue-50 text-blue-700", href: "/haberler" },
    { label: "Duyurular", value: stats?.duyurular, icon: "📢", color: "bg-yellow-50 text-yellow-700", href: "/duyurular" },
    { label: "Etkinlikler", value: stats?.etkinlikler, icon: "📅", color: "bg-green-50 text-green-700", href: "/etkinlikler" },
    { label: "Fotoğraflar", value: stats?.fotolar, icon: "🖼️", color: "bg-purple-50 text-purple-700", href: "/foto-galeri" },
    { label: "Videolar", value: stats?.videolar, icon: "🎬", color: "bg-red-50 text-red-700", href: "/video-galeri" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Genel Bakış</h2>
        <p className="text-gray-500 text-sm mt-1">Site içeriklerinizin özeti</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((card) => (
          <a
            key={card.label}
            href={import.meta.env.BASE_URL.replace(/\/$/, "") + card.href}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow block"
          >
            <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center text-xl mb-3`}>
              {card.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {stats ? card.value : "—"}
            </div>
            <div className="text-sm text-gray-500 mt-1">{card.label}</div>
          </a>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Hızlı Başlangıç</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Sol menüden yönetmek istediğiniz içerik türünü seçin. Her bölümde içerik ekleyebilir, düzenleyebilir ve silebilirsiniz. 
          İçerikleri yayınlamak veya gizlemek için "Yayında" durumunu değiştirebilirsiniz.
        </p>
      </div>
    </div>
  );
}
