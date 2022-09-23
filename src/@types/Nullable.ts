export type Nullable<T = unknown> = { [K in keyof T]: Nullable<T[K]> } | null

