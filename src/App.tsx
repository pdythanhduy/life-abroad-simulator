import { useGame } from "./hooks/useGame";
import HomeScreen from "./components/HomeScreen";
import HowToPlayScreen from "./components/HowToPlayScreen";
import DifficultyScreen from "./components/DifficultyScreen";
import ChatScreen from "./components/ChatScreen";
import HistoryScreen from "./components/HistoryScreen";
import SettingsScreen from "./components/SettingsScreen";
import EndingScreen from "./components/EndingScreen";
import DayRecapScreen from "./components/DayRecapScreen";

export default function App() {
  const {
    state,
    screen,
    setScreen,
    currentEvent,
    start,
    pick,
    reset,
    hasSave,
    tutorialSeen,
    markTutorialSeen,
    continueFromRecap,
    unlockedEndings,
  } = useGame();

  const safeStart = (d: Parameters<typeof start>[0]) => {
    if (hasSave && !window.confirm("Bắt đầu game mới sẽ ghi đè game đang chơi. Tiếp tục?")) return;
    start(d);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="w-full h-full sm:w-[420px] sm:h-[860px] sm:rounded-[36px] sm:border sm:border-line bg-ink overflow-hidden relative">
        {screen === "home" && (
          <HomeScreen
            hasSave={hasSave}
            tutorialSeen={tutorialSeen}
            onContinue={() => setScreen("chat")}
            onNew={() => setScreen("difficulty")}
            setScreen={setScreen}
          />
        )}
        {screen === "howto" && (
          <HowToPlayScreen
            onBack={() => setScreen("home")}
            onContinue={() => {
              markTutorialSeen();
              setScreen("difficulty");
            }}
          />
        )}
        {screen === "difficulty" && (
          <DifficultyScreen onPick={safeStart} onBack={() => setScreen("home")} />
        )}
        {screen === "chat" && state && (
          state.pendingRecap ? (
            <DayRecapScreen recap={state.pendingRecap} onContinue={continueFromRecap} />
          ) : (
            <ChatScreen
              state={state}
              event={currentEvent}
              onPick={pick}
              setScreen={setScreen}
            />
          )
        )}
        {screen === "history" && state && (
          <HistoryScreen state={state} onBack={() => setScreen("chat")} />
        )}
        {screen === "settings" && (
          <SettingsScreen onBack={() => setScreen("home")} onReset={reset} />
        )}
        {screen === "ending" && state && (
          <EndingScreen
            state={state}
            unlockedEndings={unlockedEndings}
            onRestart={reset}
          />
        )}
      </div>
    </div>
  );
}
