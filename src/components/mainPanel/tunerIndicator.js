import React from "react";
import {
  freqToMusicalAlphabet,
  getPrevSoundName,
  getNextSoundName,
  distanceInCents,
  soundNameToFreq
} from "../../lib/record/toneCalculator";

function formatZoneInfo(zoneNumber, soundName) {
  return `${soundName}${zoneNumber}`;
}

export function handleFreqChange(targetNode, freqValue) {
  if (!freqValue) return;
  const changeNode = targetNode.lastChild.lastChild;
  const textChildren = targetNode.firstChild.childNodes;
  const zoneInfo = freqToMusicalAlphabet(freqValue);
  const prevZoneInfo = getPrevSoundName(
    zoneInfo.zoneNumber,
    zoneInfo.soundName
  );
  const nextZoneInfo = getNextSoundName(
    zoneInfo.zoneNumber,
    zoneInfo.soundName
  );
  const targetFreq = soundNameToFreq(zoneInfo.zoneNumber, zoneInfo.soundName);
  const targetDistanceInCents = distanceInCents(freqValue, targetFreq);
  if (targetDistanceInCents > 0) {
    changeNode.style.left = "50%";
    changeNode.style.right = `${50 - targetDistanceInCents}%`;
  } else {
    changeNode.style.right = "50%";
    changeNode.style.left = `${50 - Math.abs(targetDistanceInCents)}%`;
  }
  textChildren[1].firstChild.innerHTML = `${formatZoneInfo(
    zoneInfo.zoneNumber,
    zoneInfo.soundName
  )}(${Math.round(targetFreq)})Hz`;
  textChildren[0].innerHTML = formatZoneInfo(
    prevZoneInfo.zoneNumber,
    prevZoneInfo.soundName
  );
  textChildren[2].innerHTML = formatZoneInfo(
    nextZoneInfo.zoneNumber,
    nextZoneInfo.soundName
  );
}

function TunerIndicator({ targetNodeRef }) {
  return (
    <div ref={targetNodeRef}>
      <div className="flex text-gray-600 text-1xl leading-normal h-6 relative justify-between">
        <div></div>
        <div className="absolute top-0 bottom-0 w-full h-full flex justify-center">
          <div className="text-1xl "></div>
        </div>

        <div></div>
      </div>
      <div className="relative h-2 bg-color-main overflow-hidden">
        <div
          className="absolute bg-green-200 h-full top-0 text-center flex justify-center"
          style={{ left: "40%", right: "40%" }}
        >
          <div className="bg-gray-500 h-full w-1"></div>
        </div>
        <div
          className="absolute bg-red-200 h-full top-0"
          style={{ transition: "all 0.2s" }}
        />
      </div>
    </div>
  );
}

export default TunerIndicator;
