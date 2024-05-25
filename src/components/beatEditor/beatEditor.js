import React from "react";
import BeatValueRenderer from "./beatValueRenderer";
import CollapseSelector from "../utils/selector/collapseSelector";

function BeatEditor({ upBeat, downBeat, setUpBeat, setDownBeat }) {
  return (
    <div>
      <div className="w-20 flex justify-center">
        <CollapseSelector
          value={upBeat}
          onChange={setUpBeat}
          allowValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          ValueComponent={BeatValueRenderer}
        />
      </div>
      <div
        style={{ height: "3px" }}
        className="rounded-full bg-color-main m-2"
      ></div>
      <div className="w-20 flex justify-center">
        <CollapseSelector
          value={downBeat}
          onChange={setDownBeat}
          allowValues={[1, 2, 3, 4, 5, 6, 7, 8]}
          ValueComponent={BeatValueRenderer}
        />
      </div>
    </div>
  );
}

export default BeatEditor;
