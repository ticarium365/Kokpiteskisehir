const BASE = "/api";

export async function apiFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(BASE + path, window.location.origin);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API hatası: ${res.status}`);
  return res.json();
}

export interface Slider {
  id: number; baslik: string; altBaslik: string | null;
  resimUrl: string; butonYazi: string | null; butonLink: string | null;
  sira: number; yayinda: boolean;
}
export interface Haber {
  id: number; baslik: string; ozet: string; icerik: string;
  resimUrl: string | null; kategori: string; yayinda: boolean;
  onemli: boolean; yayinTarihi: string;
}
export interface Duyuru {
  id: number; baslik: string; icerik: string; kategori: string;
  onemli: boolean; yayinda: boolean; yayinTarihi: string; bitisTarihi: string | null;
}
export interface Etkinlik {
  id: number; baslik: string; aciklama: string; resimUrl: string | null;
  tarih: string; yer: string | null; kategori: string; yayinda: boolean;
}
export interface FotoGaleri {
  id: number; baslik: string; resimUrl: string; kategori: string;
  yayinda: boolean; sira: number;
}
export interface VideoGaleri {
  id: number; baslik: string; youtubeId: string; kategori: string;
  yayinda: boolean; sira: number;
}
export interface EkipUye {
  id: number; ad: string; unvan: string; bolum: string | null;
  resimUrl: string | null; email: string | null; biyografi: string | null;
  sira: number; yayinda: boolean;
}
export interface SayfaIcerigi {
  sayfa: string; baslik: string; altBaslik: string | null;
  icerik: string; ekIcerik: string | null; resimUrl: string | null;
}
export interface SiteAyar { anahtar: string; deger: string; }
