import { useState } from "react";

interface Column {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface Props {
  title: string;
  description?: string;
  data: Record<string, unknown>[];
  columns: Column[];
  loading?: boolean;
  onAdd: () => void;
  onEdit: (row: Record<string, unknown>) => void;
  onDelete: (row: Record<string, unknown>) => void;
  addLabel?: string;
}

export default function ContentTable({ title, description, data, columns, loading, onAdd, onEdit, onDelete, addLabel = "Yeni Ekle" }: Props) {
  const [deleteId, setDeleteId] = useState<unknown>(null);

  function confirmDelete(row: Record<string, unknown>) {
    onDelete(row);
    setDeleteId(null);
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
        <button
          onClick={onAdd}
          className="shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ml-4"
        >
          <span>+</span> {addLabel}
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
          Yükleniyor...
        </div>
      ) : data.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-sm">Henüz içerik yok.</p>
          <button onClick={onAdd} className="mt-3 text-blue-600 text-sm hover:underline">
            İlk içeriği ekle →
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {columns.map((col) => col.label ? (
                    <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {col.label}
                    </th>
                  ) : <th key={col.key} className="px-4 py-3" />)}
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((row) => (
                  <tr key={row.id as string} className="hover:bg-gray-50">
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-gray-700">
                        {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      {deleteId === row.id ? (
                        <span className="flex items-center gap-2 justify-end">
                          <span className="text-xs text-gray-500">Silinsin mi?</span>
                          <button onClick={() => confirmDelete(row)} className="text-xs text-red-600 hover:underline font-medium">Evet, sil</button>
                          <button onClick={() => setDeleteId(null)} className="text-xs text-gray-500 hover:underline">Vazgeç</button>
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 justify-end">
                          <button onClick={() => onEdit(row)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Düzenle</button>
                          <button onClick={() => setDeleteId(row.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Sil</button>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
