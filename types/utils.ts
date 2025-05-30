export type KeysWithValsOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: P
}
export type Without<T, K> = Pick<T, Exclude<keyof T, K>>
