import React from "react";

function BeatValueRenderer({ value, selected = false }) {
  return (
    <div
      className={`w-14 text-4xl text-center bg-white px-4 py-2 ${!selected ?
        "hover:bg-gray-200 text-color-main":"hover:bg-blue-200 text-gray-600"}`}
    >
      <span>{value}</span>
    </div>
  );
}

export default BeatValueRenderer;
