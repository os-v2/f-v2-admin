export type tApiDefault<T> = {
  id: number;
  statusCode: number;
  message: string;
  data: {
    data: T;
  };
  error: string;
};
export type tApiPostDefault = {
  id: number;
  statusCode: number;
  message: string;
  data: [] | null;
  error: string;
};
