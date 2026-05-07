import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import { useApi } from "@/hooks/useQuery";
import type { SiteAyar } from "@/lib/api";

export default function IletisimPage() {
  const { data: ayarlar = [] } = useApi<SiteAyar[]>("/site-ayarlari");
  const m: Record<string, string> = {};
  ayarlar.forEach(a => { m[a.anahtar] = a.deger; });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-blue-300 text-sm font-medium mb-2">📞 İletişim</p>
          <h1 className="text-4xl font-bold mb-3">Bize Ulaşın</h1>
          <p className="text-blue-200">Sorularınız için her zaman buradayız</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* İletişim bilgileri */}
          <div className="space-y-5">
            {m["adres"] && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-4">
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Adres</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{m["adres"]}</p>
                </div>
              </div>
            )}

            {m["telefon"] && (
              <a href={`tel:${m["telefon"]}`} className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-4 hover:border-blue-200 hover:shadow-md transition-all group">
                <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Telefon</h3>
                  <p className="text-gray-600 text-sm group-hover:text-blue-600 transition-colors">{m["telefon"]}</p>
                  {m["telefon2"] && <p className="text-gray-500 text-sm mt-0.5">{m["telefon2"]}</p>}
                </div>
              </a>
            )}

            {m["email"] && (
              <a href={`mailto:${m["email"]}`} className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-4 hover:border-blue-200 hover:shadow-md transition-all group">
                <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">E-posta</h3>
                  <p className="text-gray-600 text-sm group-hover:text-blue-600 transition-colors">{m["email"]}</p>
                </div>
              </a>
            )}

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex gap-4 mb-4">
                <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Çalışma Saatleri</h3>
                  <p className="text-gray-600 text-sm">Pazartesi – Cuma: 08:00 – 17:00</p>
                  <p className="text-gray-500 text-sm">Cumartesi: 09:00 – 13:00</p>
                </div>
              </div>
            </div>

            {/* Sosyal medya */}
            {(m["instagram_url"] || m["facebook_url"] || m["youtube_url"]) && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4 text-sm">Sosyal Medya</h3>
                <div className="flex gap-3">
                  {m["instagram_url"] && (
                    <a href={m["instagram_url"]} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-pink-600 transition-colors bg-gray-50 hover:bg-pink-50 px-3 py-2 rounded-xl">
                      <Instagram size={16} /> Instagram
                    </a>
                  )}
                  {m["facebook_url"] && (
                    <a href={m["facebook_url"]} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-xl">
                      <Facebook size={16} /> Facebook
                    </a>
                  )}
                  {m["youtube_url"] && (
                    <a href={m["youtube_url"]} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 px-3 py-2 rounded-xl">
                      <Youtube size={16} /> YouTube
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Harita */}
          <div className="lg:col-span-2">
            {m["harita_url"] ? (
              <div className="rounded-2xl overflow-hidden border border-gray-200 h-full min-h-[400px]">
                <iframe
                  src={m["harita_url"]}
                  width="100%"
                  height="100%"
                  className="w-full h-full min-h-[400px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Okul Konumu"
                />
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 h-full min-h-[400px] flex flex-col items-center justify-center text-gray-400 gap-3">
                <MapPin size={48} className="text-gray-300" />
                <div className="text-center">
                  <p className="font-medium text-gray-500">Harita henüz eklenmedi</p>
                  <p className="text-sm mt-1">Admin panelinden Google Harita bağlantısı ekleyebilirsiniz</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* WhatsApp */}
        {m["whatsapp_no"] && (
          <div className="mt-10 text-center">
            <a
              href={`https://wa.me/${m["whatsapp_no"].replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-2xl transition-colors shadow-lg text-lg"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp ile Ulaşın
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
