import { useState, useEffect, useContext } from "react";
import { HiBadgeCheck } from "react-icons/hi";

import { ChallengesContext } from "../context/ChallengesContext";

import styles from "../styles/components/CountDown.module.css";

let countDownTimeOut: NodeJS.Timeout;

export function CountDown() {
  const { startNewChallange } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinish, setHasFinish] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  function startCountDown() {
    setIsActive(true);
  }

  function resetCountDown() {
    setIsActive(false);
    clearTimeout(countDownTimeOut);
    setTime(0.05 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinish(true);
      setIsActive(false);

      startNewChallange();
    }
  }, [isActive, time]);

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinish ? (
        <button
          disabled
          className={`${styles.startCountDownButton} ${styles.startCountDownButtonActive}`}
          onClick={resetCountDown}
        >
          Ciclo Encerrado <HiBadgeCheck />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.startCountDownButton} ${styles.startCountDownButtonActive}`}
              onClick={resetCountDown}
            >
              Abandonar Ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.startCountDownButton}
              onClick={startCountDown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
