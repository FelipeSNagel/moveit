import { createContext, useState, useEffect, ReactNode } from "react";
import challanges from "../../challanges.json";
import Cookies from "js-cookie";

import { LevelUpModal } from "../components/LevelUpModal";

interface ChallangeProps {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallangesContextData {
  level: number;
  currentExperience: number;
  challangesCompleted: number;
  activeChallange: ChallangeProps;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallange: () => void;
  resetChallange: () => void;
  completeChallange: () => void;
  closeLevelUpModal: () => void;
}

interface ChallangesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challangesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallangesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallangesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challangesCompleted, setChallangesCompleted] = useState(
    rest.challangesCompleted ?? 0
  );

  const [activeChallange, setActiveChallange] = useState(null);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [activeChallange]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challangesCompleted", String(challangesCompleted));
  }, [level, currentExperience, challangesCompleted]);

  function startNewChallange() {
    const randomChallangeIndex = Math.floor(Math.random() * challanges.length);
    const challange = challanges[randomChallangeIndex];

    setActiveChallange(challange);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${challange.amount}xp;`,
        icon: "/favicon.png",
      });
    }
  }

  function resetChallange() {
    setActiveChallange(null);
  }

  function completeChallange() {
    if (!activeChallange) {
      return;
    }

    const { amount } = activeChallange;

    let finalExperience = currentExperience + amount;

    if (finalExperience > experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallange(null);
    setChallangesCompleted(challangesCompleted + 1);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challangesCompleted,
        activeChallange,
        experienceToNextLevel,
        levelUp,
        startNewChallange,
        resetChallange,
        completeChallange,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
