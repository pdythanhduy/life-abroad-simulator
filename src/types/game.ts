export type Difficulty = "easy" | "normal" | "hard";

export type StatKey = "money" | "energy" | "stress" | "language" | "relationship";

export interface Stats {
  money: number;
  energy: number;
  stress: number;
  language: number;
  relationship: number;
}

export type EndingId = "survive" | "burnout" | "gohome" | "growth" | "belonging";

export type EventType = "chat" | "mail" | "notification" | "system";

export type SenderId =
  | "mom"
  | "manager"
  | "friend"
  | "ex"
  | "neighbor"
  | "colleague"
  | "cityhall"
  | "bank"
  | "system"
  | "self";

export type StatEffect = Partial<Stats>;

export interface DelayedConsequence {
  delayDays: number;
  eventId: string;
}

export interface Choice {
  id: string;
  text: string;
  statEffects: StatEffect;
  nextEventId?: string;
  delayedConsequences?: DelayedConsequence[];
  setFlags?: string[];
  tags?: string[];
}

export interface EventVariant {
  requireFlags?: string[];
  forbidFlags?: string[];
  messages: string[];
  choices?: Choice[];
}

export interface GameEvent {
  id: string;
  day: number;
  type: EventType;
  sender: SenderId;
  senderName: string;
  avatar?: string;
  background?: string;
  messages: string[];
  choices: Choice[];
  variants?: EventVariant[];
  tags?: string[];
  difficultyModifier?: Partial<Record<Difficulty, StatEffect>>;
}

export interface HistoryEntry {
  eventId: string;
  day: number;
  senderName: string;
  message: string;
  choiceText: string;
  statEffects: StatEffect;
  timestamp: number;
}

export interface PendingEvent {
  eventId: string;
  triggerDay: number;
}

export interface DayRecap {
  day: number;
  before: Stats;
  after: Stats;
}

export interface SaveState {
  difficulty: Difficulty;
  day: number;
  stats: Stats;
  flags: Record<string, boolean>;
  history: HistoryEntry[];
  pending: PendingEvent[];
  completedEventIds: string[];
  queue: string[];
  currentEventId: string | null;
  ending: EndingId | null;
  startedAt: number;
  dayStartStats: Stats;
  pendingRecap: DayRecap | null;
}
