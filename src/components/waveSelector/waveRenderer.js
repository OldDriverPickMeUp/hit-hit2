import React from "react";
import SvgSine from "../../assets/icons/Sine";
import SvgSquare from "../../assets/icons/Square";
import SvgTriangle from "../../assets/icons/Triangle";
import SvgSawtooth from "../../assets/icons/Sawtooth";

function ContentRenderer({ value }) {
  if (value === "sine") return <SvgSine className="w-full h-full"/>;
  if (value === "square") return <SvgSquare className="w-full h-full"/>;
  if (value === "triangle") return <SvgTriangle className="w-full h-full"/>;
  if (value === "sawtooth") return <SvgSawtooth className="w-full h-full"/>;
  return <SvgSine className="w-full h-full"/>;
}

function WaveRenderer({ value }) {
  return (
    <div className="bg-red-200 py-3 w-20 px-2 hover:bg-red-300">
      <ContentRenderer value={value} />
    </div>
  );
}

export default WaveRenderer;
