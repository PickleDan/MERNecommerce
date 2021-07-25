
export type Link = string;
export type Brand<T, U> = T & { __brand: U };
export type RequestStatuses = 'idle' | 'loading' | 'succeeded' | 'failed';