import React from "react";
import TempoEditor from "../components/tempoEditor/tempoEditor";
import MainPanel from "../components/mainPanel/mainPanel";
import BeatEditor from "../components/beatEditor/beatEditor";
import WaveSelector from "../components/waveSelector/waveSelector";
import Stats from "../components/stats/stats";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

function Metronome({
  speedEdit,
  soundPlay,
  beatEdit,
  waveTypeSelect,
  counted,
  todayUsage,
  historyData,
  historyTrends,
  historyTime
}) {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-wrap sm:flex-no-wrap mb-6">
        <Helmet>
          <title>{t("metronome:title")}</title>
          <meta name="description" content={t("metronome:desc")} />
        </Helmet>
        <div className="w-full sm:w-auto sm:mr-5 mb-5 sm:mb-0">
          <div className="mb-4 sm:mb-6">
            <TempoEditor {...speedEdit} />
          </div>
          <div className="flex-1">
            <MainPanel {...soundPlay} counted={counted} />
            <div className="h-3 sm:h-5"></div>
          </div>
        </div>
        <div className="mr-5">
          <BeatEditor {...beatEdit} />
          <div className="m-4 "></div>
          <WaveSelector {...waveTypeSelect} />
        </div>
        <div className="mr-0 flex-1 sm:flex-none sm:w-auto">
          <Stats
            todayUsage={todayUsage}
            historyData={historyData}
            historyTime={historyTime}
            trends={historyTrends}
          />
        </div>
      </div>
    </>
  );
}

export default Metronome;
