declare global {
  interface ImportMeta {
    env: {
      MODE: 'development' | 'production';
    };
    hot: {
      accept(): void;
      dispose(callback: () => void): void;
    };
  }
}

export {};
