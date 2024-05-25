import useStorage from "./utils/storage";

function useWaveTypeSelect(initWaveType = "sine") {
  const [waveType, setWaveType] = useStorage("sine", initWaveType, x => x);
  return {
    waveType,
    setWaveType
  };
}

export default useWaveTypeSelect;
