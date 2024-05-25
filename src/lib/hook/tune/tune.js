import { useRef, useEffect, useCallback, useState } from "react";
import RecordManager from "../../record/recordManager";

function useTune(handleFreqChange, tunerProps) {
  const recordManagerRef = useRef();
  const targetNodeRef = useRef();
  const [tuning, setTuning] = useState(false);

  const onFreqChange = useCallback(freqData => {
    const targetNode = targetNodeRef.current;
    if (targetNode) {
      handleFreqChange(targetNode, freqData);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (recordManagerRef.current) {
      recordManagerRef.current.setProps(tunerProps);
    }
  }, [tunerProps]);

  useEffect(() => {
    const recordManager = new RecordManager();
    recordManager.onFreqChange = onFreqChange;
    recordManagerRef.current = recordManager;
    // eslint-disable-next-line
  }, []);

  const start = useCallback(() => {
    const recordManager = recordManagerRef.current;
    recordManager.start();
    setTuning(recordManager.tuning);
  }, []);

  const stop = useCallback(() => {
    const recordManager = recordManagerRef.current;
    recordManager.stop();
    setTuning(recordManager.tuning);
  }, []);

  return { startTuner: start, stopTuner: stop, tuning, targetNodeRef };
}

export default useTune;
