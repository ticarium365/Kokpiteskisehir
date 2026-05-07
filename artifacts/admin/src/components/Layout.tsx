import { useLocation, Link } from "wouter";
import { useState } from "react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const menuGroups = [
  {
    grup: "Genel Bakış",
    items: [
      { path: "/", label: "Ana Sayfa", icon: "🏠" },
    ],
  },
  {
    grup: "Dinamik İçerikler",
    items: [
      { path: "/haberler", label: "Haberler", icon: "📰" },
      { path: "/duyurular", label: "Duyurular", icon: "📢" },
      { path: "/etkinlikler", label: "Etkinlikler", icon: "📅" },
      { path: "/foto-galeri", label: "Fotoğraf Galerisi", icon: "🖼️" },
      { path: "/video-galeri", label: "Video Galerisi", icon: "🎬" },
    ],
  },
  {
    grup: "Site Yönetimi",
    items: [
      { path: "/slider", label: "Ana Sayfa Slider", icon: "🖥️" },
      { path: "/sayfa-icerikleri", label: "Sayfa İçerikleri", icon: "📄" },
      { path: "/ekip", label: "Eğitim Kadrosu", icon: "👩‍🏫" },
      { path: "/site-ayarlari", label: "Site Ayarları", icon: "⚙️" },
    ],
  },
  {
    grup: "Kullanıcılar",
    items: [
      { path: "/kullanicilar", label: "Kullanıcı Yönetimi", icon: "👥" },
    ],
  },
];

const allItems = menuGroups.flatMap(g => g.items);

async function logout() {
  await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
  window.location.href = BASE + "/giris";
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentItem = allItems.find((m) => m.path === location);

  return (
    <div className="flex h-screen bg-gray-100">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-60 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">K</div>
          <div className="min-w-0">
            <div className="font-semibold text-gray-900 text-sm truncate">Kokpit Okulları</div>
            <div className="text-xs text-gray-500">Admin Paneli</div>
          </div>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {menuGroups.map((group) => (
            <div key={group.grup} className="mb-1">
              <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {group.grup}
              </div>
              {group.items.map((item) => {
                const isActive = location === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <a
                      className={`flex items-center gap-2.5 px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="text-base">{item.icon}</span>
                      {item.label}
                    </a>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <span>🚪</span>
            Çıkış Yap
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center gap-3">
          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-gray-900 font-semibold text-sm">
            {currentItem ? `${currentItem.icon} ${currentItem.label}` : "Yönetim Paneli"}
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
