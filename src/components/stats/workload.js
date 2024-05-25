import React from "react";

function Workload({ data, dataRef = 1 }) {
  const width = (data / dataRef) * 100;
  return (
    <div className="bg-gray-300">
      <div
        style={{ width: `${width > 100 ? 100 : width}%` }}
        className="bg-blue-300 h-3 hover:bg-blue-200"
      />
    </div>
  );
}

export default Workload;

