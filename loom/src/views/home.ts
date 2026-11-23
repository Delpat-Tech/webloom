import { BANDS, CONTACT, MILESTONES, PROOF, SCENES } from '../story';
import type { StoryHud } from '../thread';
import { el } from '../dom';

/** The home story: one pinned screen, one line per scene, labels that ride on the thread. */
export function homeView(into: HTMLElement): StoryHud {
  const stage = el('div', 'stage');
  const caps: HTMLElement[] = [];
  const labels = new Map<string, HTMLElement>();
  const spotName = el('strong');
  const spotResult = el('span');
  const spotLink = el('a', 'spot');
  spotLink.dataset.cursor = 'Read';
  spotLink.append(spotName, spotResult);

  const counter = el('p', 'counter');
  const cue = el('p', 'cue', 'Scroll to pull the thread');
  stage.append(counter, cue);

  const hud: StoryHud = { caps, labels, counter, cue, spotName, spotResult, spotLink, hoverBand: -1, spotLock: -1 };

  SCENES.forEach((sc, i) => {
    const cap = el('section', `cap c${i}`);
    const box = el('div', 'cap-in');
    const [a, b] = sc.line.split('|');
    box.append(el(i === 0 ? 'h1' : 'h2', 'line', `${a} <em>${b}</em>`));
    if (sc.sub) box.append(el('p', 'sub', sc.sub));
    if (i === 3) {
      const more = el('a', 'more', 'How we work <span>→</span>');
      more.href = '/how-we-work';
      more.dataset.cursor = 'Open';
      box.append(more);
    }
    if (i === 5) {
      const cta = el('a', 'cta', 'Book a discovery call <span>→</span>');
      cta.href = CONTACT;
      cta.dataset.cursor = 'Go';
      box.append(cta, el('p', 'hint', 'Touch the cloth'));
    }
    cap.append(box);
    if (i === 4) cap.append(spotLink); // the result of the swatch in the spotlight
    stage.append(cap);
    caps.push(cap);
  });

  const layer = el('div', 'labels');
  BANDS.forEach((b, i) => {
    const a = el('a', 'chip', `<i class="g${i}"></i>${b.label}`);
    a.href = b.href;
    a.dataset.cursor = 'Open';
    a.addEventListener('pointerenter', () => (hud.hoverBand = i));
    a.addEventListener('pointerleave', () => (hud.hoverBand = -1));
    a.addEventListener('focus', () => (hud.hoverBand = i));
    a.addEventListener('blur', () => (hud.hoverBand = -1));
    labels.set(`b${i}`, a);
    layer.append(a);
  });
  MILESTONES.forEach((m, i) => {
    const d = el('div', 'chip tag', `<b>${m.when}</b>${m.what}`);
    labels.set(`m${i}`, d);
    layer.append(d);
  });
  PROOF.forEach((p, i) => {
    const a = el('a', 'chip', `<i class="${i === 6 ? 'g2' : 'g1'}"></i>${p.name}`);
    a.href = p.href;
    a.dataset.cursor = 'Read';
    a.addEventListener('pointerenter', () => (hud.spotLock = i));
    a.addEventListener('pointerleave', () => (hud.spotLock = -1));
    labels.set(`p${i}`, a);
    layer.append(a);
  });
  stage.append(layer);

  into.append(stage);
  return hud;
}
