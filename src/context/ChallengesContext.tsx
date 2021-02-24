import { createContext, useState, ReactNode } from "react";
import challanges from "../../challanges.json";

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
}

interface ChallangesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallangesContextData);

export function ChallengesProvider({ children }: ChallangesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challangesCompleted, setChallangesCompleted] = useState(0);

  const [activeChallange, setActiveChallange] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallange() {
    const randomChallangeIndex = Math.floor(Math.random() * challanges.length);
    const challange = challanges[randomChallangeIndex];

    setActiveChallange(challange);
  }

  function resetChallange() {
    setActiveChallange(null);
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
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
