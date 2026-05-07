import { useQuery as useTQ } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export function useApi<T>(path: string, params?: Record<string, string>) {
  return useTQ<T>({
    queryKey: [path, params],
    queryFn: () => apiFetch<T>(path, params),
    staleTime: 60_000,
  });
}
