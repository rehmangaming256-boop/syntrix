"use client";

import { useState } from "react";

type Props = {
  title: string;
  xp: number;
};

export default function QuestCard({ title, xp }: Props) {
  const [done, setDone] = useState(false);

  return (
    <div className="bg-zinc-900 border border-purple-500/20 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">
            {title}
          </h3>

          <p className="text-zinc-400 text-sm">
            +{xp} XP
          </p>
        </div>

        <button
          onClick={() => setDone(!done)}
          className="bg-purple-500 px-4 py-2 rounded-xl"
        >
          {done ? "Done" : "Complete"}
        </button>
      </div>
    </div>
  );
}