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
import Layout from "@/components/Layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30000 },
  },
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
      .catch(() => {
        setLoggedIn(false);
        navigate("/giris");
      });
  }, []);

  if (loggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/giris" component={LoginPage} />
      <Route path="/">
        {() => (
          <AuthGuard>
            <Layout>
              <DashboardPage />
            </Layout>
          </AuthGuard>
        )}
      </Route>
      <Route path="/haberler">
        {() => (
          <AuthGuard>
            <Layout>
              <HaberlerPage />
            </Layout>
          </AuthGuard>
        )}
      </Route>
      <Route path="/duyurular">
        {() => (
          <AuthGuard>
            <Layout>
              <DuyurularPage />
            </Layout>
          </AuthGuard>
        )}
      </Route>
      <Route path="/etkinlikler">
        {() => (
          <AuthGuard>
            <Layout>
              <EtkinliklerPage />
            </Layout>
          </AuthGuard>
        )}
      </Route>
      <Route path="/foto-galeri">
        {() => (
          <AuthGuard>
            <Layout>
              <FotoGaleriPage />
            </Layout>
          </AuthGuard>
        )}
      </Route>
      <Route path="/video-galeri">
        {() => (
          <AuthGuard>
            <Layout>
              <VideoGaleriPage />
            </Layout>
          </AuthGuard>
        )}
      </Route>
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
