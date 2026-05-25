  "use client";

  import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
  type Task = {
    id: number;
    title: string;
    xp: number;
    done: boolean;
  };

  type DailyQuest = {
    id: number;
    title: string;
    xp: number;
    done: boolean;
  };

  type AchievementQuest = {
    id: number;
    title: string;
    xp: number;
    unlocked: boolean;
  };

  type Achievement = {
    title: string;
    description: string;
    unlocked: boolean;
  };

  function XPBar({
    xp,
    requiredXP,
  }: {
    xp: number;
    requiredXP: number;
  }) {
    const percentage = (xp / requiredXP) * 100;

    return (
      <div className="w-full">
        <div className="flex justify-between text-sm text-zinc-400 mb-3">
          <span>XP Progress</span>

          <span>
            {xp} / {requiredXP} XP
          </span>
        </div>

        <div className="w-full h-5 bg-zinc-800 rounded-full overflow-hidden border border-purple-500/20">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 transition-all duration-500"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>
    );
  }

  function FloatingXP({
    amount,
  }: {
    amount: number;
  }) {
    return (
      <div className="fixed top-10 right-10 z-50 animate-bounce">
        <div className="text-4xl font-black text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">
          +{amount} XP
        </div>
      </div>
    );
  }

  function FocusTimer({ 
    addXP,
    attackBoss,
  }: {
    addXP: (amount: number) => void;
    attackBoss: () => void;
  }) {
    const [minutesInput, setMinutesInput] =
  useState(25);

const [time, setTime] = useState(25 * 60);

    const [running, setRunning] =
      useState(false);

    useEffect(() => {
      let interval: ReturnType<typeof setInterval>;

      if (running && time > 0) {
        interval = setInterval(() => {
          setTime((prev) => prev - 1);
        }, 1000);
      }

      if (time === 0) {
        setRunning(false);

        addXP(25);

        attackBoss();

        alert(
          "⚡ Focus Session Complete +25 XP"
        );

        setTime(minutesInput * 60);
      }

      return () => clearInterval(interval);
    }, [
      running,
      time,
      addXP,
      attackBoss,
      minutesInput,
    ]);

    const minutes = Math.floor(time / 60);

    const seconds = time % 60;

    return (
      <div className="bg-zinc-900/70 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 md:p-8 mb-10 shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:border-purple-400 transition-all">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

          <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">

            Focus Session

          </h2>

          <div className="flex gap-3">

            <input
              type="number"
              min={1}
              value={minutesInput}
              onChange={(e) =>
                setMinutesInput(
                  Number(e.target.value)
                )
              }
              className="w-24 bg-black/60 border border-purple-500/20 rounded-xl px-4 py-2 outline-none text-white"
            />

            <button
              onClick={() =>
                setTime(minutesInput * 60)
              }
              className="bg-purple-500 hover:bg-purple-400 transition-all px-5 py-2 rounded-xl font-bold hover:scale-105"
            >
              Set
            </button>

          </div>

        </div>

        <div className="text-5xl md:text-7xl font-black text-center mb-8 tracking-wider text-white drop-shadow-[0_0_25px_rgba(168,85,247,0.8)]">

          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}

        </div>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => setRunning(true)}
            className="bg-purple-500 hover:bg-purple-400 transition-all px-6 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-105"
          >
            Start
          </button>

          <button
            onClick={() => setRunning(false)}
            className="bg-zinc-700 hover:bg-zinc-600 transition-all px-6 py-3 rounded-xl font-bold hover:scale-105"
          >
            Pause
          </button>

          <button
            onClick={() => {
              setRunning(false);
              setTime(minutesInput * 60);
            }}
            className="bg-zinc-700 hover:bg-zinc-600 transition-all px-6 py-3 rounded-xl font-bold hover:scale-105"
          >
            Reset
          </button>

        </div>

      </div>
    );
  }
  const questPool = [
  {
    title: "Complete 1 Focus Session",
    xp: 20,
  },
  {
    title: "No TikTok For 30 Minutes",
    xp: 15,
  },
  {
    title: "Drink 2L Water",
    xp: 15,
  },
  {
    title: "Read 10 Pages",
    xp: 25,
  },
  {
    title: "Meditate 10 Minutes",
    xp: 20,
  },
  {
    title: "Wake Up Before 8AM",
    xp: 30,
  },
  {
    title: "No Shorts/Reels For 1 Hour",
    xp: 35,
  },
  {
    title: "Exercise For 20 Minutes",
    xp: 30,
  },
  {
    title: "Clean Your Desk",
    xp: 15,
  },
  {
    title: "Write Your Goals",
    xp: 20,
  },
  {
    title: "Journal Your Thoughts",
    xp: 20,
  },
  {
    title: "Take A Cold Shower",
    xp: 30,
  },
  {
    title: "Sleep Before 11PM",
    xp: 25,
  },
  {
    title: "Learn A New Skill For 20 Min",
    xp: 35,
  },
  {
    title: "Go Outside For 15 Minutes",
    xp: 15,
  },
  {
    title: "No Sugar Today",
    xp: 40,
  },
  {
    title: "Do 50 Pushups",
    xp: 35,
  },
  {
    title: "Delete 10 Unused Photos",
    xp: 10,
  },
  {
    title: "Listen To A Podcast",
    xp: 20,
  },
  {
    title: "Spend 1 Hour Without Phone",
    xp: 50,
  },
];

  export default function Home() {
    const [xp, setXp] = useState(0);
const dailyQuotes = [
  "Discipline is choosing your future over comfort.",
  "Small progress is still progress.",
  "Your habits shape your identity.",
  "Focus builds power.",
  "Consistency beats motivation.",
  "Every day is a new chance to improve.",
  "The hardest part is starting.",
  "You become what you repeat daily.",
  "Distraction steals your potential.",
  "Level up your mind every day.",
  "The future depends on what you do today.",
  "One focused hour can change everything.",
];

const [quote, setQuote] = useState("");

useEffect(() => {
  const randomQuote =
    dailyQuotes[
      Math.floor(
        Math.random() *
          dailyQuotes.length
      )
    ];

  setQuote(randomQuote);
}, []);
    const [level, setLevel] =
      useState(1);

    const [bossHp, setBossHp] =
      useState(100);

    const [bossName, setBossName] =
      useState("TikTok Demon");

    const [taskInput, setTaskInput] =
      useState("");
  const [timeLeft, setTimeLeft] =
  useState("");
const [rerollsLeft, setRerollsLeft] =
  useState(3);
  
    const [showAchievements, setShowAchievements] =
      useState(false);

    const [floatingXP, setFloatingXP] =
      useState(0);
  const [activeTab, setActiveTab] =
  useState("daily");
  const leaderboard = [
  {
    name: "Shadow",
    level: 52,
    xp: 18200,
    rank: "MYTHIC ⚡",
  },
  {
    name: "Nova",
    level: 41,
    xp: 14020,
    rank: "MASTER 👑",
  },
  {
    name: "Zenith",
    level: 33,
    xp: 10900,
    rank: "DIAMOND 🔷",
  },
  {
    name: "Cipher",
    level: 24,
    xp: 7600,
    rank: "PLATINUM 💎",
  },
  {
    name: "Blaze",
    level: 17,
    xp: 4200,
    rank: "GOLD 🥇",
  },
];  
      const xpSound =
    typeof Audio !== "undefined"
      ? new Audio("/sounds/xp.mp3")
      : null;

  const levelSound =
    typeof Audio !== "undefined"
      ? new Audio("/sounds/levelup.mp3")
      : null;

  const bossSound =
    typeof Audio !== "undefined"
      ? new Audio("/sounds/boss.mp3")
      : null;

  const clickSound =
    typeof Audio !== "undefined"
      ? new Audio("/sounds/click.mp3")
      : null; 
     
      const [streak, setStreak] = useState(1);
  

      const [showLevelUp, setShowLevelUp] =

  useState(false);
  const [bestStreak, setBestStreak] =
        
  useState(1);
useEffect(() => {
  const interval = setInterval(() => {
    const now = new Date();

    const tomorrow = new Date();

    tomorrow.setHours(
      24,
      0,
      0,
      0
    );

    const diff =
      tomorrow.getTime() -
      now.getTime();

    const hours = Math.floor(
      diff / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (diff %
        (1000 * 60 * 60)) /
        (1000 * 60)
    );

    setTimeLeft(
      `${hours}h ${minutes}m`
    );
  }, 1000);

  return () =>
    clearInterval(interval);
}, []);
  const [lastLogin, setLastLogin] = 
    useState("");
    const [tasks, setTasks] = useState<Task[]>([]);

    const [dailyQuests, setDailyQuests] =
  
    useState<DailyQuest[]>([
     
      {
        id: 1,
        title:
          "Complete 1 Focus Session",
        xp: 20,
        done: false,
      },

      {
        id: 2,
        title:
          "No TikTok For 30 Minutes",
        xp: 15,
        done: false,
      },

      {
        id: 3,
        title: "Drink Water",
        xp: 10,
        done: false,
      },

      {
        id: 4,
        title:
          "Read 10 Pages",
        xp: 25,
        done: false,
      },

      {
        id: 5,
        title:
          "Exercise For 15 Minutes",
        xp: 30,
        done: false,
      },
    ]);
    const [
      achievementQuests,
      setAchievementQuests,
    ] = useState<AchievementQuest[]>([
      {
        id: 1,
        title: "Reach Level 5",
        xp: 100,
        unlocked: false,
      },

      {
        id: 2,
        title: "Reach Level 10",
        xp: 200,
        unlocked: false,
      },

      {
        id: 3,  
        title: "Complete 25 Tasks",
        xp: 150,
        unlocked: false,
      },
    ]);

    const requiredXP =
      50 + level * 25;
const completedTasks =
  tasks.filter((t) => t.done)
    .length +
  dailyQuests.filter((q) => q.done)
    .length;

const totalTasks =
  tasks.length +
  dailyQuests.length;

const completionRate =
  totalTasks > 0
    ? Math.round(
        (completedTasks /
          totalTasks) *
          100
      )
    : 0;

const totalXP =
  level * requiredXP + xp;
    const currentRank =
      level >= 50
        ? "MYTHIC ⚡"
        : level >= 40
        ? "MASTER 👑"
        : level >= 30
        ? "DIAMOND 🔷"
        : level >= 20
        ? "PLATINUM 💎"
        : level >= 15
        ? "GOLD 🥇"
        : level >= 10
        ? "SILVER 🥈"
        : "BRONZE 🥉";
const achievements: Achievement[] =
  Array.from({ length: 10 }, (_, i) => {
    const levelRequired = (i + 1) * 10;

    let title = "";

    if (levelRequired === 10) {
      title = "Bronze Warrior 🥉";
    } else if (levelRequired === 20) {
      title = "Silver Champion 🥈";
    } else if (levelRequired === 30) {
      title = "Gold Elite 🥇";
    } else if (levelRequired === 40) {
      title = "Diamond Master 💎";
    } else if (levelRequired === 50) {
      title = "Mythic Lord ⚡";
    } else if (levelRequired === 60) {
      title = "Ascended King 👑";
    } else if (levelRequired === 70) {
      title = "Celestial Titan 🌌";
    } else if (levelRequired === 80) {
      title = "Void Conqueror 🕳️";
    } else if (levelRequired === 90) {
      title = "God Slayer 🔥";
    } else if (levelRequired === 100) {
      title = "SYNTRIX GOD ☠️";
    }

    return {
      title,
      description: `Reach Level ${levelRequired}`,
      unlocked: level >= levelRequired,
    };
  });
    function generateDailyQuests() {
    const shuffled = [...questPool]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    const quests = shuffled.map(
      (quest, index) => ({
        id: index + 1,
        title: quest.title,
        xp: quest.xp,
        done: false,
      })
    );

    setDailyQuests(quests);

    localStorage.setItem(
      "dailyQuests",
      JSON.stringify(quests)
    );

    localStorage.setItem(
      "lastQuestReset",
      new Date().toDateString()
    );
  }
    useEffect(() => {
    const savedXP =
      localStorage.getItem("xp");
const savedRerolls =
  localStorage.getItem(
    "rerollsLeft"
  );

if (savedRerolls) {
  setRerollsLeft(
    Number(savedRerolls)
  );
}
    const savedLevel =
      localStorage.getItem("level");

    const savedTasks =
      localStorage.getItem("tasks");

    const savedDailyQuests =
      localStorage.getItem("dailyQuests");

    const lastReset =
      localStorage.getItem(
        "lastQuestReset"
      );

    const today =
      new Date().toDateString();

    if (savedXP)
      setXp(Number(savedXP));

    if (savedLevel)
      setLevel(Number(savedLevel));

    if (savedTasks)
      setTasks(JSON.parse(savedTasks));

    if (
  !lastReset ||
  lastReset !== today
) {
  generateDailyQuests();

  setRerollsLeft(3);

  localStorage.setItem(
    "rerollsLeft",
    "3"
  );
}
    
    else if (savedDailyQuests) {
      setDailyQuests(
        JSON.parse(savedDailyQuests)
      );
    }
  }, []);

    useEffect(() => {
      localStorage.setItem(
        "xp",
        String(xp)
      );

      localStorage.setItem(
        "level",
        String(level)
      );

      localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
      );
    localStorage.setItem(
    "dailyQuests",
    JSON.stringify(dailyQuests)
  );

  localStorage.setItem(
  "rerollsLeft",
  String(rerollsLeft)
);

}, [
  xp,
  level,
  tasks,
  dailyQuests,
  rerollsLeft,
]);
  
   useEffect(() => {
  const today = new Date();

  const todayString =
    today.toDateString();

  const savedLastLogin =
    localStorage.getItem(
      "lastLogin"
    );

  const savedStreak =
    Number(
      localStorage.getItem(
        "streak"
      ) || 1
    );

  const savedBestStreak =
    Number(
      localStorage.getItem(
        "bestStreak"
      ) || 1
    );

  setStreak(savedStreak);
  setBestStreak(savedBestStreak);

  if (!savedLastLogin) {
    localStorage.setItem(
      "lastLogin",
      todayString
    );

    return;
  }

  const lastDate = new Date(
    savedLastLogin
  );

  // RESET HOURS
  lastDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime =
    today.getTime() -
    lastDate.getTime();

  const diffDays =
    diffTime /
    (1000 * 60 * 60 * 24);

  // NEXT DAY LOGIN
  if (diffDays === 1) {
    const newStreak =
      savedStreak + 1;

    setStreak(newStreak);

    localStorage.setItem(
      "streak",
      String(newStreak)
    );

    if (
      newStreak >
      savedBestStreak
    ) {
      setBestStreak(newStreak);

      localStorage.setItem(
        "bestStreak",
        String(newStreak)
      );
    }
  }

  // MISSED DAY
  else if (diffDays > 1) {
    setStreak(1);

    localStorage.setItem(
      "streak",
      "1"
    );
  }

  localStorage.setItem(
    "lastLogin",
    todayString
  );
}, []);
    useEffect(() => {
      setAchievementQuests((prev) =>
        prev.map((quest) => {
          if (
            quest.title ===
              "Reach Level 5" &&
            level >= 5
          ) {
            return {
              ...quest,
              unlocked: true,
            };
          }

          if (
            quest.title ===
              "Reach Level 10" &&
            level >= 10
          ) {
            return {
              ...quest,
              unlocked: true,
            };
          }

          if (
            quest.title ===
              "Complete 25 Tasks" &&
            tasks.filter((t) => t.done)
              .length >= 25
          ) {
            return {
              ...quest,
              unlocked: true,
            };
          }

          return quest;
        })
      );
    }, [level, tasks]);
  function addXP(amount: number) {
    setFloatingXP(amount);
      xpSound?.play();
    setTimeout(() => {
      setFloatingXP(0);
    }, 1500);

    setXp((prevXP) => {
      let totalXP = prevXP + amount;

      if (totalXP >= requiredXP) {
        totalXP -= requiredXP;

        setLevel((prev) => prev + 1);

        setShowLevelUp(true);
            levelSound?.play();
        setTimeout(() => {
          setShowLevelUp(false);
        }, 3000);
      }

      return totalXP;
    });
  }
    function attackBoss() {
      setBossHp((prev) => {
        const newHp = prev - 20;

        if (newHp <= 0) {
          addXP(150);
        bossSound?.play();
          alert(
            `🏆 ${bossName} Defeated`
          );

          if (
            bossName === "TikTok Demon"
          ) {
            setBossName(
              "YouTube Monster"
            );
          } else if (
            bossName ===
            "YouTube Monster"
          ) {
            setBossName(
              "Netflix Beast"
            );
          } else {
            setBossName(
              "TikTok Demon"
            );
          }

          return 100;
        }

        return newHp;
      });
    }

    function completeDailyQuest(id: number) {
      setDailyQuests((prev) =>
        prev.map((quest) => {
          if (
            quest.id === id &&
            !quest.done
          ) {
            addXP(quest.xp);

            attackBoss();

            return {
              ...quest,
              done: true,
            };
          }

          return quest;
        })
      );
    }

    function addTask() {
      if (!taskInput.trim()) return;

      const newTask = {
        id: Date.now(),
        title: taskInput,
        xp: 20,
        done: false,
      };

      setTasks((prev) => [
        ...prev,
        newTask,
      ]);

      setTaskInput("");
    }

    function completeTask(id: number) {
      setTasks((prev) =>
        prev.map((task) => {
          if (
            task.id === id &&
            !task.done
          ) {
            addXP(task.xp);

            attackBoss();

            return {
              ...task,
              done: true,
            };
          }

          return task;
        })
      );
    }

    return (
      <main className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-purple-500/40">
  {/* LEVEL UP POPUP */}

  {showLevelUp && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md">

      <div className="relative animate-bounce">

        {/* GLOW */}
        <div className="absolute inset-0 bg-purple-500 blur-[120px] opacity-40 rounded-full" />

        {/* CARD */}
        <div className="relative bg-zinc-900 border border-purple-500/30 rounded-[40px] px-16 py-12 text-center shadow-[0_0_80px_rgba(168,85,247,0.5)]">

          <p className="text-purple-400 text-xl tracking-[0.4em] uppercase mb-4">
            LEVEL UP
          </p>

          <h1 className="text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">

            LEVEL {level}

          </h1>

          <p className="text-zinc-400 mt-5 text-lg">
            Your power grows stronger ⚡
          </p>

        </div>

      </div>

    </div>
  )}
        {/* FLOATING XP */}
        {floatingXP > 0 && (
          <FloatingXP
            amount={floatingXP}
          />
        )}

        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden">
  {/* PARTICLES */}

  {[...Array(60)].map((_, i) => (
  <div
    key={i}
    className="absolute rounded-full bg-white/20 animate-pulse"
    style={{
      width: "3px",
      height: "3px",
      top: `${(i * 7) % 100}%`,
      left: `${(i * 13) % 100}%`,
      animationDuration: "4s",
      animationDelay: `${i * 0.1}s`,
      boxShadow:
        "0 0 10px rgba(255,255,255,0.8)",
    }}
  />
))}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize:
                "40px 40px",
            }}
          />

          <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-purple-500 opacity-20 blur-[140px] rounded-full" />

          <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-pink-500 opacity-20 blur-[140px] rounded-full" />

          <div className="absolute top-[40%] left-[35%] w-[400px] h-[400px] bg-cyan-500 opacity-10 blur-[120px] rounded-full" />
  {/* FLOATING ORBS */}

  <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />

  <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />

  <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 p-5 md:p-10 pb-32">
         {/* REPORT BUG BUTTON */}
<a
  href="https://docs.google.com/forms/d/e/1FAIpQLSdB7peb3nb-ImvUsB4-yK9NO-0QdOzlk_SZfIDOFPlN5aN5HQ/viewform?usp=dialog"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed top-6 right-6 z-50 bg-red-500 hover:bg-red-400 text-white font-black px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all hover:scale-105 text-sm md:text-base"
>
  🐞 Report Bug
</a>
          {/* HEADER */}
          
          <div className="mb-10">

            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 drop-shadow-[0_0_35px_rgba(168,85,247,0.8)]">

              SYNTRIX

            </h1>

            <p className="text-zinc-400 mt-3 text-sm md:text-lg tracking-[0.3em] uppercase">

              Human Optimization System

            </p>

          </div>
  {/* STREAK SECTION */}

  <div className="grid md:grid-cols-2 gap-5 mb-10">

    {/* CURRENT STREAK */}
    <div className="bg-zinc-900/70 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-6 shadow-[0_0_30px_rgba(249,115,22,0.15)]">

      <div className="flex items-center gap-4">

        <div className="text-5xl">
          🔥
        </div>

        <div>

          <p className="text-zinc-400 text-sm uppercase tracking-widest">
            Current Streak
          </p>

          <h2 className="text-4xl font-black text-orange-400">
            {streak} Days
          </h2>

        </div>

      </div>

    </div>

    {/* BEST STREAK */}
    <div className="bg-zinc-900/70 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-6 shadow-[0_0_30px_rgba(250,204,21,0.15)]">

      <div className="flex items-center gap-4">

        <div className="text-5xl">
          👑
        </div>

        <div>

          <p className="text-zinc-400 text-sm uppercase tracking-widest">
            Best Streak
          </p>

          <h2 className="text-4xl font-black text-yellow-400">
            {bestStreak} Days
          </h2>

        </div>

      </div>

    </div>

  </div>
  
  {/* DAILY QUOTE */}

<div className="bg-zinc-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 mb-10 shadow-[0_0_30px_rgba(34,211,238,0.15)]">

  <p className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-3">
    Daily Quote
  </p>

  <h2 className="text-2xl md:text-3xl font-black leading-relaxed text-white">
    {quote}
  </h2>

</div>
          {/* XP */}
          <div className="bg-zinc-900/70 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 md:p-8 mb-10 shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:border-purple-400 transition-all">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

              <span className="text-purple-400 font-black text-2xl md:text-3xl">
                Level {level}
              </span>

              <span className="text-zinc-400 text-lg">
                {currentRank}
              </span>

            </div>

            <XPBar
              xp={xp}
              requiredXP={requiredXP}
            />

          </div>
{/* STATISTICS DASHBOARD */}

<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

  {/* TOTAL XP */}
  <div className="bg-zinc-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 shadow-[0_0_30px_rgba(34,211,238,0.15)]">

    <p className="text-zinc-400 text-sm uppercase tracking-widest mb-2">
      Total XP
    </p>

    <h2 className="text-4xl font-black text-cyan-400">
      {totalXP}
    </h2>

  </div>

  {/* TASKS DONE */}
  <div className="bg-zinc-900/70 backdrop-blur-xl border border-green-500/20 rounded-3xl p-6 shadow-[0_0_30px_rgba(34,197,94,0.15)]">

    <p className="text-zinc-400 text-sm uppercase tracking-widest mb-2">
      Completed Tasks
    </p>

    <h2 className="text-4xl font-black text-green-400">
      {completedTasks}
    </h2>

  </div>

  {/* TOTAL TASKS */}
  <div className="bg-zinc-900/70 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 shadow-[0_0_30px_rgba(168,85,247,0.15)]">

    <p className="text-zinc-400 text-sm uppercase tracking-widest mb-2">
      Total Tasks
    </p>

    <h2 className="text-4xl font-black text-purple-400">
      {totalTasks}
    </h2>

  </div>

  {/* COMPLETION RATE */}
  <div className="bg-zinc-900/70 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-6 shadow-[0_0_30px_rgba(250,204,21,0.15)]">

    <p className="text-zinc-400 text-sm uppercase tracking-widest mb-2">
      Completion Rate
    </p>

    <h2 className="text-4xl font-black text-yellow-400">
      {completionRate}%
    </h2>

  </div>

</div>
         
{/* FOCUS */}
{activeTab === "focus" && (
  <FocusTimer
    addXP={addXP}
    attackBoss={attackBoss}
  />
)}
{/* TAB BUTTONS */}
<div className="flex gap-2 overflow-x-auto mb-8 bg-zinc-900/60 border border-white/10 p-2 rounded-3xl w-full max-w-full scrollbar-hide">

  <button
    onClick={() => setActiveTab("daily")}
    className={`px-4 py-3 text-sm md:text-base rounded-2xl font-bold whitespace-nowrap transition-all ${
      activeTab === "daily"
        ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
    }`}
  >
    Daily
  </button>

  <button
    onClick={() => setActiveTab("custom")}
    className={`px-4 py-3 rounded-2xl font-bold whitespace-nowrap transition-all ${
      activeTab === "custom"
        ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
    }`}
  >
    Custom
  </button>

  <button
    onClick={() => setActiveTab("focus")}
    className={`px-4 py-3 text-sm md:text-base rounded-2xl font-bold whitespace-nowrap transition-all ${
      activeTab === "focus"
        ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30"
        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
    }`}
  >
    Focus
  </button>

  <button
    onClick={() => setActiveTab("achievement")}
    className={`px-4 py-3 text-sm md:text-base rounded-2xl font-bold whitespace-nowrap transition-all ${
      activeTab === "achievement"
        ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/30"
        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
    }`}
  >
    Achievement
  </button>
<button
  onClick={() =>
    setActiveTab("leaderboard")
  }
  className={`px-4 py-3 text-sm md:text-base rounded-2xl font-bold whitespace-nowrap transition-all ${
    activeTab === "leaderboard"
      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
      : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
  }`}
>
  Leaderboard
</button>
</div>

{/* TAB CONTENT */}
<AnimatePresence mode="wait">
{/* LEADERBOARD */}
{activeTab === "leaderboard" && (
  <motion.div
    key="leaderboard"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.35 }}
    className="grid gap-5 mb-10"
  >

    {leaderboard.map((user, index) => (
      <div
        key={index}
        className="bg-zinc-900/70 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-6 shadow-[0_0_30px_rgba(249,115,22,0.15)]"
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">
              Rank #{index + 1}
            </p>

            <h2 className="text-3xl font-black text-orange-400">
              {user.name}
            </h2>

            <p className="text-zinc-400 mt-2">
              {user.rank}
            </p>

          </div>

          <div className="text-right">

            <p className="text-cyan-400 font-black text-2xl">
              LVL {user.level}
            </p>

            <p className="text-zinc-500 mt-2">
              {user.xp} XP
            </p>

          </div>

        </div>

      </div>
    ))}

  </motion.div>
)}
  {/* DAILY */}
  {activeTab === "daily" && (
    <motion.div
      key="daily"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >

      <div className="flex justify-start mb-5">
        <button
          onClick={() => {
            if (rerollsLeft <= 0) return;

            generateDailyQuests();

            setRerollsLeft((prev) => prev - 1);
          }}
          disabled={rerollsLeft <= 0}
          className={`px-4 py-3 text-sm md:text-base rounded-2xl font-bold transition-all ${
            rerollsLeft <= 0
              ? "bg-zinc-700 text-zinc-500"
              : "bg-purple-500 hover:bg-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          }`}
        >
          🔄 Reroll ({rerollsLeft})
        </button>
      </div>

      <p className="text-zinc-400 mb-6 text-sm tracking-widest uppercase">
        Resets in {timeLeft}
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {dailyQuests.map((quest) => (
          <div
            key={quest.id}
            className={`backdrop-blur-xl rounded-3xl p-8 border transition-all duration-300 ${
              quest.done
                ? "bg-green-500/10 border-green-400 shadow-[0_0_40px_rgba(74,222,128,0.5)] scale-[1.02]"
                : "bg-zinc-900/70 border-purple-500/20 hover:border-purple-400"
            }`}
          >
            <h3 className="text-3xl font-black mb-4">
              {quest.title}
            </h3>

            <p className="text-zinc-500 text-lg mb-8">
              Reward: +{quest.xp} XP
            </p>

            <button
              onClick={() => {
                clickSound?.play();
                completeDailyQuest(quest.id);
              }}
              disabled={quest.done}
              className={`w-full py-4 rounded-2xl font-black text-lg transition-all ${
                quest.done
                  ? "bg-green-500 text-black"
                  : "bg-purple-500 hover:bg-purple-400"
              }`}
            >
              {quest.done
                ? "COMPLETED"
                : "COMPLETE QUEST"}
            
            </button> 
          
          </div>
        
        ))}

     
      </div>

    </motion.div>
  )}

  {/* CUSTOM */}
  {activeTab === "custom" && (
    <motion.div
      key="custom"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="mb-10"
    >

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={taskInput}
          onChange={(e) =>
            setTaskInput(e.target.value)
          }
          placeholder="Create mission..."
          className="bg-zinc-900 border border-cyan-500/20 rounded-xl px-4 py-3 text-sm md:text-base outline-none w-full"
        />

        <button
          onClick={addTask}
          className="bg-cyan-500 text-black px-4 py-3 text-sm md:text-base rounded-xl font-bold"
        >
          Add
        </button>
      </div>

      <div className="grid gap-5">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-zinc-900/70 border border-cyan-500/20 rounded-3xl p-6"
          >
            <h3 className="text-2xl font-black mb-3">
              {task.title}
            </h3>

            <button
              onClick={() =>
                completeTask(task.id)
              }
              disabled={task.done}
              className={`w-full py-4 rounded-2xl font-black ${
                task.done
                  ? "bg-green-500 text-black"
                  : "bg-cyan-500 text-black"
              }`}
            >
              {task.done
                ? "COMPLETED"
                : "COMPLETE"}
            </button>

            <button
              onClick={() =>
                setTasks((prev) =>
                  prev.filter(
                    (t) => t.id !== task.id
                  )
                )
              }
              className="w-full mt-3 py-4 rounded-2xl font-black bg-red-500 hover:bg-red-400 transition-all"
            >
              DELETE
            </button>
          {task.done && (
  <button
    onClick={() =>
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id
            ? { ...t, done: false }
            : t
        )
      )
    }
    className="w-full mt-3 py-4 rounded-2xl font-black bg-yellow-500 hover:bg-yellow-400 text-black transition-all"
  >
    RESET QUEST
  </button>
)}
          </div>
        ))}
      </div>

    </motion.div>
  )}

  

  {/* ACHIEVEMENTS */}
  {activeTab === "achievement" && (
    <motion.div
      key="achievement"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="grid gap-5 mb-10"
    >
      {achievements.map((achievement, index) => (
        <div
          key={index}
          className={`rounded-3xl p-6 border transition-all ${
  achievement.unlocked
    ? "bg-green-500/10 border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.4)]"
    : "bg-zinc-900/70 border-zinc-700"
}`}
        >
          <h3 className="text-2xl font-black mb-2">
            {achievement.title}
          </h3>

          <p className="text-zinc-400">
            {achievement.description}
          </p>
        <p
  className={`mt-4 font-black ${
    achievement.unlocked
      ? "text-green-400"
      : "text-zinc-500"
  }`}
>
  {achievement.unlocked
    ? "✅ ACHIEVED"
    : "🔒 LOCKED"}
</p>
        </div>
      ))}
    </motion.div>
  )}

</AnimatePresence>
  
          {/* MODAL */}
          {showAchievements && (
  <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 overflow-y-auto p-5 md:p-10">

    <div className="max-w-5xl mx-auto">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Achievements
        </h1>

        <button
          onClick={() => setShowAchievements(false)}
          className="bg-red-500 hover:bg-red-400 transition-all px-6 py-3 rounded-xl font-bold w-fit"
        >
          Close
        </button>

      </div>

      <div className="grid gap-5">

        {achievements
          .filter((achievement) => achievement.unlocked)
          .map((achievement, index) => (
            <div
              key={index}
              className="rounded-3xl p-6 border bg-yellow-500/10 border-yellow-500/20 backdrop-blur-xl"
            >

              <h2 className="text-2xl font-black mb-2">
                {achievement.title}
              </h2>

              <p className="text-zinc-400">
                {achievement.description}
              </p>

            </div>
          ))}

      

                    </div>

              </div>

            </div>
          )}
{/* FLOATING MOBILE NAVBAR */}  
</div> {/* closes relative z-10 */}

</main>
  );
} 