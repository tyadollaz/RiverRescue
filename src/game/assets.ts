// Map asset keys to their image file paths. 
// The BASE_URL automatically adjusts for GitHub Pages (e.g., /RiverRescue/ in production).

const BASE = import.meta.env.BASE_URL;

export const ASSETS = {
  boat: `${BASE}assets/boat.png`,
  bottle: `${BASE}assets/bottle.png`,
  can: `${BASE}assets/can.png`,
  bag: `${BASE}assets/bag.png`,
  log: `${BASE}assets/log.png`,
  net: `${BASE}assets/net.png`,
  sub: `${BASE}assets/sub.png`,
  magnet: `${BASE}assets/magnet.png`,
  shield: `${BASE}assets/shield.png`,
  time: `${BASE}assets/time.png`,
  backgrounds: [
    `${BASE}assets/backgrounds/bg_stage0.png`,
    `${BASE}assets/backgrounds/bg_stage1.png`,
    `${BASE}assets/backgrounds/bg_stage2.png`,
    `${BASE}assets/backgrounds/bg_stage3.png`,
    `${BASE}assets/backgrounds/bg_stage4.png`,
    `${BASE}assets/backgrounds/bg_stage5.png`,
    `${BASE}assets/backgrounds/bg_stage6.png`
  ]
} as const;
