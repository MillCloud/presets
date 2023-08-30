type AnyRecord_ = Record<string, any>;

export type { AnyRecord_ as AnyRecord };

declare global {
  type AnyRecord = AnyRecord_;
}
