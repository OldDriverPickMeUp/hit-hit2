import React, { useEffect } from "react";
import useSpeedEdit from "./lib/hook/speedEdit";
import useBeatEdit from "./lib/hook/beatEdit";
import useWaveTypeSelect from "./lib/hook/waveTypeSelect";
import usePlaySound from "./lib/hook/metro/playSound";
import useTimeCount from "./lib/hook/utils/timeCount";
import { Transition, TransitionGroup } from "react-transition-group";
import { Switch, Route, useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Metronome from "./pages/Metronome";
import Dashboard from "./pages/Dashboard";
import Tools from "./pages/Tools";
import Support from "./pages/Support";

function getClassNameByState(state) {
  if (state === "entered") return "static opacity-100";
  return "absolute top-0 left-0 w-full opacity-0 h-64";
}

function Routes() {
  const speedEdit = useSpeedEdit(120);
  const beatEdit = useBeatEdit(4, 4);
  const waveTypeSelect = useWaveTypeSelect();
  const soundPlay = usePlaySound(
    speedEdit.speed,
    beatEdit.upBeat,
    waveTypeSelect.waveType
  );
  const { counted, todayUsage, historyData, loading } = useTimeCount(
    soundPlay.playing
  );
  const location = useLocation();
  const soundPlayToggle = soundPlay.toggle;
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.onkeypress = function(e) {
      if (!["Space", "Enter"].includes(e.code)) return;
      soundPlayToggle();
    };
  }, [soundPlayToggle]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sm:mr-5 relative">
      <TransitionGroup appear={true}>
        <Transition key={location.key} timeout={300}>
          {(state) => (
            <div
              style={{ transition: "opacity 0.3s linear" }}
              className={getClassNameByState(state)}
            >
              <Switch location={location}>
                <Route exact={true} path="/">
                  <Metronome
                    speedEdit={speedEdit}
                    soundPlay={soundPlay}
                    beatEdit={beatEdit}
                    waveTypeSelect={waveTypeSelect}
                    counted={counted}
                    todayUsage={todayUsage}
                    historyData={historyData.data}
                    historyTrends={historyData.trends}
                    historyTime={historyData.stats.totalTime}
                  />
                </Route>
                <Route exact={true} path="/dashboard">
                  <Dashboard
                    todayUsage={todayUsage}
                    historyData={historyData}
                  />
                </Route>
                <Route exact={true} path="/tools">
                  <Tools />
                </Route>
                <Route exact={true} path="/support">
                  <Support />
                </Route>
                <Route path="/">
                  <NotFound />
                </Route>
              </Switch>
            </div>
          )}
        </Transition>
      </TransitionGroup>
    </div>
  );
}

export default Routes;
