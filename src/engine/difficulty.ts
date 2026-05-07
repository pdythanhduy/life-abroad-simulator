import type { Difficulty, Stats } from "../types/game";

export const STARTING_STATS: Record<Difficulty, Stats> = {
  easy:   { money: 70, energy: 80, stress: 20, language: 40, relationship: 60 },
  normal: { money: 50, energy: 60, stress: 35, language: 25, relationship: 45 },
  hard:   { money: 30, energy: 50, stress: 55, language: 15, relationship: 30 },
};

export const SLEEP_TICK: Record<Difficulty, { energy: number; stress: number }> = {
  easy:   { energy: 18, stress: -7 },
  normal: { energy: 15, stress: -5 },
  hard:   { energy: 10, stress: -3 },
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy:   "Easy — có người đỡ",
  normal: "Normal — tự lập",
  hard:   "Hard — không ai đỡ",
};

export const DIFFICULTY_DESC: Record<Difficulty, string> = {
  easy:   "Người chơi mới. Tiền nhiều hơn, ít stress, có sẵn quan hệ.",
  normal: "Trải nghiệm chuẩn. Tự xoay sở, đánh đổi mỗi lựa chọn.",
  hard:   "Không ai đỡ. Tiền ít, stress cao, dễ bad ending. Chỉ chơi khi muốn đau.",
};
