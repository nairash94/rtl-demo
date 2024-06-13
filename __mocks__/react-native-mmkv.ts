export class MMKV {
  private store = new Map<string, string>();

  set(key: string, value: string | number | boolean) {
    this.store.set(key, value.toString());
  }

  getString(key: string): string | undefined {
    return this.store.get(key);
  }

  contains(key: string): boolean {
    return this.store.has(key);
  }

  delete(key: string) {
    this.store.delete(key);
  }

  clearAll() {
    this.store.clear();
  }
}
