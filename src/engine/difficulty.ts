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
  easy:   "Easy — dễ thở hơn",
  normal: "Normal — cân bằng",
  hard:   "Hard — áp lực nặng hơn",
};

// Cả 3 độ khó dùng chung 30+ sự kiện và 5 ending. Khác biệt duy nhất:
// chỉ số khởi đầu (stats lúc Day 1) và mức hồi phục mỗi đêm (sleep tick).
export const DIFFICULTY_DESC: Record<Difficulty, string> = {
  easy:   "Cùng câu chuyện. Stat khởi đầu cao, mỗi đêm hồi phục mạnh. Có buffer để thử nghiệm lựa chọn.",
  normal: "Cùng câu chuyện. Stat khởi đầu cân bằng, hồi phục vừa đủ. Mỗi lựa chọn thật sự là đánh đổi.",
  hard:   "Cùng câu chuyện. Stat khởi đầu thấp, hồi phục ít. Một lựa chọn sai có thể đẩy thẳng tới bad ending.",
};
