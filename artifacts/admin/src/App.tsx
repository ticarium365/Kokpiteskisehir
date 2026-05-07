import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import HaberlerPage from "@/pages/HaberlerPage";
import DuyurularPage from "@/pages/DuyurularPage";
import EtkinliklerPage from "@/pages/EtkinliklerPage";
import FotoGaleriPage from "@/pages/FotoGaleriPage";
import VideoGaleriPage from "@/pages/VideoGaleriPage";
import SiteAyarlariPage from "@/pages/SiteAyarlariPage";
import SliderPage from "@/pages/SliderPage";
import EkipPage from "@/pages/EkipPage";
import SayfaIcerikleriPage from "@/pages/SayfaIcerikleriPage";
import KullanicilarPage from "@/pages/KullanicilarPage";
import Layout from "@/components/Layout";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
});

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    fetch(`/api/auth/me`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        setLoggedIn(d.loggedIn);
        if (!d.loggedIn) navigate("/giris");
      })
      .catch(() => { setLoggedIn(false); navigate("/giris"); });
  }, []);

  if (loggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-sm">Yükleniyor...</div>
      </div>
    );
  }
  return <>{children}</>;
}

function GuardedPage({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <Layout>{children}</Layout>
    </AuthGuard>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/giris" component={LoginPage} />
      <Route path="/">{() => <GuardedPage><DashboardPage /></GuardedPage>}</Route>
      <Route path="/haberler">{() => <GuardedPage><HaberlerPage /></GuardedPage>}</Route>
      <Route path="/duyurular">{() => <GuardedPage><DuyurularPage /></GuardedPage>}</Route>
      <Route path="/etkinlikler">{() => <GuardedPage><EtkinliklerPage /></GuardedPage>}</Route>
      <Route path="/foto-galeri">{() => <GuardedPage><FotoGaleriPage /></GuardedPage>}</Route>
      <Route path="/video-galeri">{() => <GuardedPage><VideoGaleriPage /></GuardedPage>}</Route>
      <Route path="/slider">{() => <GuardedPage><SliderPage /></GuardedPage>}</Route>
      <Route path="/ekip">{() => <GuardedPage><EkipPage /></GuardedPage>}</Route>
      <Route path="/sayfa-icerikleri">{() => <GuardedPage><SayfaIcerikleriPage /></GuardedPage>}</Route>
      <Route path="/kullanicilar">{() => <GuardedPage><KullanicilarPage /></GuardedPage>}</Route>
      <Route path="/site-ayarlari">{() => <GuardedPage><SiteAyarlariPage /></GuardedPage>}</Route>
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={BASE}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}
