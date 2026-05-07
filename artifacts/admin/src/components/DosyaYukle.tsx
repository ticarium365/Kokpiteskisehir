import { useState, useRef } from "react";

interface Props {
  deger: string | null;
  onTamamlandi: (yol: string) => void;
  tip?: "resim" | "video";
  etiket?: string;
}

export default function DosyaYukle({ deger, onTamamlandi, tip = "resim", etiket }: Props) {
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");
  const [ilerleme, setIlerleme] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const kabul = tip === "resim"
    ? "image/jpeg,image/png,image/webp,image/gif"
    : "video/mp4,video/webm,video/ogg";

  const maxBoyut = tip === "resim" ? 10 * 1024 * 1024 : 200 * 1024 * 1024;
  const maxBoyutYazi = tip === "resim" ? "10 MB" : "200 MB";

  async function dosyaSec(dosya: File) {
    if (dosya.size > maxBoyut) {
      setHata(`Dosya çok büyük. Maksimum boyut: ${maxBoyutYazi}`);
      return;
    }
    setHata("");
    setYukleniyor(true);
    setIlerleme(10);

    try {
      const urlRes = await fetch("/api/storage/uploads/request-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: dosya.name,
          size: dosya.size,
          contentType: dosya.type || "application/octet-stream",
        }),
      });

      if (!urlRes.ok) throw new Error("Yükleme başlatılamadı");
      const { uploadURL, objectPath } = await urlRes.json();

      setIlerleme(30);

      const uploadRes = await fetch(uploadURL, {
        method: "PUT",
        body: dosya,
        headers: { "Content-Type": dosya.type || "application/octet-stream" },
      });

      if (!uploadRes.ok) throw new Error("Dosya yüklenemedi");

      setIlerleme(100);
      onTamamlandi(`/api/storage${objectPath}`);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Yükleme hatası");
    } finally {
      setYukleniyor(false);
      setIlerleme(0);
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dosya = e.dataTransfer.files[0];
    if (dosya) dosyaSec(dosya);
  };

  return (
    <div>
      {etiket && <label className="block text-sm font-medium text-gray-700 mb-1">{etiket}</label>}

      {deger && tip === "resim" && (
        <div className="relative mb-2 inline-block">
          <img
            src={deger}
            alt="Mevcut görsel"
            className="h-28 rounded-lg object-cover border border-gray-200"
            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <button
            type="button"
            onClick={() => onTamamlandi("")}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
            title="Görseli kaldır"
          >×</button>
        </div>
      )}

      {deger && tip === "video" && (
        <div className="mb-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2">
          <span>🎬</span>
          <span className="truncate flex-1">Video yüklendi</span>
          <button type="button" onClick={() => onTamamlandi("")} className="text-red-500 hover:text-red-700 text-xs">Kaldır</button>
        </div>
      )}

      <div
        onDragOver={e => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => !yukleniyor && inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer
          ${yukleniyor ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={kabul}
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) dosyaSec(f); e.target.value = ""; }}
        />

        {yukleniyor ? (
          <div>
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-blue-600 font-medium">Yükleniyor...</p>
            <div className="mt-2 bg-gray-200 rounded-full h-1.5 w-32 mx-auto overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full transition-all duration-300" style={{ width: `${ilerleme}%` }} />
            </div>
          </div>
        ) : (
          <div>
            <div className="text-3xl mb-2">{tip === "resim" ? "🖼️" : "🎬"}</div>
            <p className="text-sm font-medium text-gray-700">
              {deger ? "Değiştirmek için tıklayın" : (tip === "resim" ? "Resim yükle" : "Video yükle")}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {tip === "resim" ? "JPG, PNG, WEBP · Maks. 10 MB" : "MP4, WEBM · Maks. 200 MB"}
            </p>
            <p className="text-xs text-gray-400">veya sürükleyip bırakın</p>
          </div>
        )}
      </div>

      {hata && <p className="mt-1.5 text-xs text-red-600">{hata}</p>}
    </div>
  );
}
