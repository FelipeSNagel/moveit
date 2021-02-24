import { useContext } from "react";

import { ChallengesContext } from "../context/ChallengesContext";

import styles from "../styles/components/CompletedChallenges.module.css";

export function CompletedChallenges() {
  const { challangesCompleted } = useContext(ChallengesContext);

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{challangesCompleted}</span>
    </div>
  );
}
