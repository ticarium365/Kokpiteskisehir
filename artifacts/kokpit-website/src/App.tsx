import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import AnaSayfa from "@/pages/AnaSayfa";
import HaberlerListePage from "@/pages/HaberlerListePage";
import HaberDetayPage from "@/pages/HaberDetayPage";
import DuyurularPage from "@/pages/DuyurularPage";
import EtkinliklerPage from "@/pages/EtkinliklerPage";
import GaleriPage from "@/pages/GaleriPage";
import EkipPage from "@/pages/EkipPage";
import HakkimizdaPage from "@/pages/HakkimizdaPage";
import IletisimPage from "@/pages/IletisimPage";
import KvkkPage from "@/pages/KvkkPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 60_000 } },
});

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={AnaSayfa} />
        <Route path="/haberler" component={HaberlerListePage} />
        <Route path="/haberler/:id" component={HaberDetayPage} />
        <Route path="/duyurular" component={DuyurularPage} />
        <Route path="/etkinlikler" component={EtkinliklerPage} />
        <Route path="/galeri" component={GaleriPage} />
        <Route path="/ekip" component={EkipPage} />
        <Route path="/hakkimizda" component={HakkimizdaPage} />
        <Route path="/iletisim" component={IletisimPage} />
        <Route path="/kvkk" component={KvkkPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={BASE}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
