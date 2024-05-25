import { useState, useEffect, useRef } from "react";
import TimeAnalyzer from "../../stats/timeAnalyzer";

function useTimeCount(playing) {
  const [counted, setCounted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [todayUsage, setTodayUsage] = useState(0);
  const [historyData, setHistoryData] = useState({ data: [], stats: {} });

  const analyzerRef = useRef();
  useEffect(() => {
    if (!analyzerRef.current) {
      const timeAnalyzer = new TimeAnalyzer();
      timeAnalyzer.onHistoryChange = setHistoryData;
      setHistoryData(timeAnalyzer.historyData);
      setLoading(false);
      analyzerRef.current = timeAnalyzer;
    }
  }, []);

  const intervalTaskRef = useRef();
  useEffect(() => {
    return () => {
      if (intervalTaskRef.current === null) return;
      clearInterval(intervalTaskRef.current);
      intervalTaskRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (playing) {
      if (intervalTaskRef.current !== null) return;
      const analyzer = analyzerRef.current;
      analyzer.feed();
      setCounted(analyzer.accumulated);
      setTodayUsage(analyzer.todayUsage);
      intervalTaskRef.current = setInterval(() => {
        const analyzer = analyzerRef.current;
        analyzer.feed();
        setCounted(analyzer.accumulated);
        setTodayUsage(analyzer.todayUsage);
      }, 1000);
    } else {
      const analyzer = analyzerRef.current;
      analyzer.feed();
      setCounted(analyzer.accumulated);
      setTodayUsage(analyzer.todayUsage);
      analyzer.stop();
      if (intervalTaskRef.current === null) return;
      clearInterval(intervalTaskRef.current);
      intervalTaskRef.current = null;
    }
  }, [playing]);

  return { counted, todayUsage, historyData, loading };
}

export default useTimeCount;
