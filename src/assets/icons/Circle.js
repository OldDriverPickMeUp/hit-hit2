import React from "react";

function SvgCircle(props) {
  return (
    <svg width={110} height={110} viewBox="0 0 29.104 29.104" {...props}>
      <defs>
        <linearGradient id="circle_svg__a">
          <stop offset={0} stopColor="#6f84ff" />
          <stop offset={1} stopColor="#d2b5e6" stopOpacity={0.992} />
        </linearGradient>
      </defs>
      <circle
        cx={105.833}
        cy={118.406}
        r={13.229}
        opacity={0.99}
        stroke="#a2e5f0"
        strokeWidth={2.646}
        strokeLinecap="round"
        strokeLinejoin="round"
        paintOrder="stroke fill markers"
        transform="translate(-91.281 -103.854)"
        fill="#78c5d2"
        fillOpacity={0.992}
      />
    </svg>
  );
}

export default SvgCircle;
