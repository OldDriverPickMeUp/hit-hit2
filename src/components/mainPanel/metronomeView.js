import React from "react";

import PlayButton from "./playButton";
import { parseTimePeriod } from "../../lib/stats/timeFormattor";
import TimePeriodView from "./timePeriodView";
import TunerView from "./tunerView";

function MetronomeView({ play, stop, playing, counted,tuneData }) {
  return (
    <div className="flex justify-center items-center relative  h-32 sm:h-56">
      <div className="absolute w-full h-full top-0 left-0 p-2">
        <TimePeriodView {...parseTimePeriod(counted)} />
      </div>
      <PlayButton play={play} playing={playing} stop={stop} />
      <div className="absolute w-full bottom-0 left-0">
        <TunerView {...tuneData} />
      </div>
    </div>
  );
}

export default MetronomeView;
