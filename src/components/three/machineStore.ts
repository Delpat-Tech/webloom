// Tiny shared store so HTML (service cards, scroll HUD) and the 3D machine can talk
// without React re-renders on every frame.
type Listener = () => void;

const hoverListeners = new Set<Listener>();
const stageListeners = new Set<Listener>();
let hover = -1;
let stage = 0;

export const STAGE_LABELS = ['Core', 'Problem', 'Engines', 'Process', 'Launch'] as const;

export const machine = {
  /** Highlighted engine: -1 for none, 0..2 for MVP / Internal OS / Automation. */
  get hover() {
    return hover;
  },
  setHover(i: number) {
    if (hover === i) return;
    hover = i;
    hoverListeners.forEach((l) => l());
  },
  subscribe(fn: Listener) {
    hoverListeners.add(fn);
    return () => {
      hoverListeners.delete(fn);
    };
  },

  /** Nearest whole scroll stage, for the HUD. */
  get stage() {
    return stage;
  },
  setStage(s: number) {
    if (stage === s) return;
    stage = s;
    stageListeners.forEach((l) => l());
  },
  subscribeStage(fn: Listener) {
    stageListeners.add(fn);
    return () => {
      stageListeners.delete(fn);
    };
  },
};
