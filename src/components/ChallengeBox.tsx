import { useContext } from "react";

import { ChallengesContext } from "../context/ChallengesContext";
import { CountDownContext } from "../context/CountDownContext";

import styles from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {
  const { activeChallange, resetChallange, completeChallange } = useContext(
    ChallengesContext
  );
  const { resetCountDown } = useContext(CountDownContext);

  function handleChallangeSucceeded() {
    completeChallange();
    resetCountDown();
  }

  function handleChallangeFailed() {
    resetChallange();
    resetCountDown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallange ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallange.amount} xp</header>

          <main>
            <img src={`icons/${activeChallange.type}.svg`} />
            <strong>Novo Desafio</strong>
            <p>{activeChallange.description}</p>
          </main>

          <footer>
            <button
              className={styles.challengeFailedButton}
              type="button"
              onClick={handleChallangeFailed}
            >
              Falhei
            </button>
            <button
              className={styles.challengeSuccededButton}
              type="button"
              onClick={handleChallangeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios!
          </p>
        </div>
      )}
    </div>
  );
}
