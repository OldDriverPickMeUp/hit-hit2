import { useCallback, useEffect } from "react";
import useStorage from "./utils/storage";

function limitSpeed(newSpeed) {
  const speed = Math.round(newSpeed);
  const maxSpeed = 300;
  const minSpeed = 20;
  return speed > maxSpeed ? maxSpeed : speed < minSpeed ? minSpeed : speed;
}

function useSpeedEdit(initSpeed = 120) {
  const [speed, setSpeed] = useStorage("speed", initSpeed, parseInt);
  useEffect(() => {
    if (!isNaN(speed)) return;
    setSpeed(initSpeed);
  }, [speed, setSpeed, initSpeed]);

  // const doubleSpeed = useCallback(() => {
  //   setSpeed((speed) => limitSpeed(speed * 2));
  //   // eslint-disable-next-line
  // }, []);
  // const halfSpeed = useCallback(() => {
  //   setSpeed((speed) => limitSpeed(speed / 2));
  //   // eslint-disable-next-line
  // }, []);

  const increaseSpeed = useCallback(() => {
    setSpeed((speed) => limitSpeed(Number(speed) + 1));
  }, [setSpeed]);
  const decreaseSpeed = useCallback(() => {
    setSpeed((speed) => limitSpeed(speed - 1));
  }, [setSpeed]);

  const increaseSpeedByTen = useCallback(() => {
    setSpeed((speed) => limitSpeed(Number(speed) + 10));
  }, [setSpeed]);
  const decreaseSpeedByTen = useCallback(() => {
    setSpeed((speed) => limitSpeed(speed - 10));
  }, [setSpeed]);
  return {
    speed,
    setSpeed,
    // doubleSpeed,
    // halfSpeed,
    increaseSpeed,
    decreaseSpeed,
    increaseSpeedByTen,
    decreaseSpeedByTen,
  };
}

export default useSpeedEdit;
