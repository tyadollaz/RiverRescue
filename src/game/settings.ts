export const GAME_W = 960
export const GAME_H = 540
export const RUN_TIME = 60 // seconds

export const SCORE_VALUES: Record<string, number> = { bottle: 10, can: 15, bag: 25 }
export const HIT_PENALTY = 20
export const TIME_BOOST = 10 // seconds for Eco Boost

// Background gets cleaner past these score thresholds
export const CLEAN_THRESHOLDS = [0, 100, 200, 350, 500, 700, 900]
