import * as React from "react";
import Svg, { Path, Rect, SvgProps } from "react-native-svg";

function IcnDefaultProfile(props: SvgProps) {
  return (
    <Svg width={29} height={29} viewBox="0 0 29 29" fill="none" {...props}>
      <Rect
        x={0.934982}
        y={0.479996}
        width={27.99}
        height={27.99}
        rx={13.995}
        fill="#A8B2D1"
        fillOpacity={0.1}
      />
      <Path
        d="M19.008 19.718v-1.166a2.33 2.33 0 00-2.33-2.33h-3.496a2.33 2.33 0 00-2.33 2.33v1.166M14.93 13.893a2.33 2.33 0 100-4.66 2.33 2.33 0 000 4.66z"
        stroke="#A8B2D1"
        strokeWidth={1.165}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default IcnDefaultProfile;
