// View Transition API TypeScript declarations
interface ViewTransition {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition(): void;
}

interface Document {
  startViewTransition?: (callback: () => void) => ViewTransition;
}

declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => ViewTransition;
  }
}

export {}; 