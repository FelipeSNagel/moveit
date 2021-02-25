import { useContext } from "react";

import { HiBadgeCheck } from "react-icons/hi";

import { CountDownContext } from "../context/CountDownContext";

import styles from "../styles/components/CountDown.module.css";

export function CountDown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountDown,
    resetCountDown,
  } = useContext(CountDownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

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

      {hasFinished ? (
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
