export interface RequestState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function initialRequestState<T>(): RequestState<T> {
  return { data: null, loading: false, error: null };
}
