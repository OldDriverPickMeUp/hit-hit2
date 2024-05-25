import useStorage from "./utils/storage";

function useBeatEdit(initUpBeat = 4, initDownBeat = 4) {
  const [upBeat, setUpBeat] = useStorage("upBeat", initUpBeat, parseInt);
  const [downBeat, setDownBeat] = useStorage("downBeat", initDownBeat, parseInt);
  return {
    upBeat,
    downBeat,
    setUpBeat,
    setDownBeat
  };
}

export default useBeatEdit;
