interface PixelIconProps {
  className?: string;
}

const OUTLINE = '#2B2833';

export function PixelLangIcon({ className = 'w-7 h-7' }: PixelIconProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
    >
      {/* Top-left "文" character (slightly thicker strokes) */}
      <rect x="2.5" y="1" width="2" height="1" fill={OUTLINE} />
      <rect x="1" y="2" width="5.5" height="1.2" fill={OUTLINE} />
      <rect x="1.8" y="3" width="1.4" height="1.2" fill={OUTLINE} />
      <rect x="3.8" y="3" width="1.4" height="1.2" fill={OUTLINE} />
      <rect x="2.6" y="4" width="1.6" height="1.2" fill={OUTLINE} />
      <rect x="1" y="5" width="2.5" height="1.2" fill={OUTLINE} />
      <rect x="3.8" y="5" width="1.4" height="1.2" fill={OUTLINE} />

      {/* Bottom-right "A" in teal */}
      <rect x="7.8" y="5" width="2.4" height="1.2" className="fill-[#2E7D78] dark:fill-[#4B8B88]" />
      <rect x="6.8" y="6" width="1.4" height="5" className="fill-[#2E7D78] dark:fill-[#4B8B88]" />
      <rect x="9.8" y="6" width="1.4" height="5" className="fill-[#2E7D78] dark:fill-[#4B8B88]" />
      <rect x="7" y="8" width="4.2" height="1.2" className="fill-[#2E7D78] dark:fill-[#4B8B88]" />
    </svg>
  );
}

export function PixelSunIcon({ className = 'w-7 h-7' }: PixelIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
    >
      {/* Rays Outline */}
      <path
        d="M19.5 1.5H28.5V4.5H30V10.5H27V13.5H21V10.5H18V4.5H19.5V1.5ZM6 6H12V9H15V12H16.5V16.5H12V15H9V12H6V6ZM36 6H42V12H39V15H36V16.5H31.5V12H33V9H36V6ZM1.5 19.5H4.5V18H10.5V21H13.5V27H10.5V30H4.5V28.5H1.5V19.5ZM37.5 18H43.5V19.5H46.5V28.5H43.5V30H37.5V27H34.5V21H37.5V18ZM12 31.5H16.5V36H15V39H12V42H6V36H9V33H12V31.5ZM31.5 31.5H36V33H39V36H42V42H36V39H33V36H31.5V31.5ZM21 34.5H27V37.5H30V43.5H28.5V46.5H19.5V43.5H18V37.5H21V34.5Z"
        fill={OUTLINE}
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      {/* Rays Fill */}
      <path
        d="M21 4.5H27V10.5H21V4.5ZM9 9H12V12H15V15H12V12H9V9ZM36 9H39V12H36V15H33V12H36V9ZM4.5 21H10.5V27H4.5V21ZM37.5 21H43.5V27H37.5V21ZM12 33H15V36H12V39H9V36H12V33ZM33 33H36V36H39V39H36V36H33V33ZM21 37.5H27V43.5H21V37.5Z"
        className="fill-[#C97F28] dark:fill-[#D49443]"
      />
      {/* Center Ring Outline */}
      <path
        d="M18 10.5H30V13.5H34.5V18H37.5V30H34.5V34.5H30V37.5H18V34.5H13.5V30H10.5V18H13.5V13.5H18V10.5Z"
        fill={OUTLINE}
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      {/* Center Sun Fill */}
      <path
        d="M18 13.5H30V16.5H33V19.5H34.5V28.5H31.5V31.5H22.5V30H18V27H15V19.5H16.5V16.5H18V13.5Z"
        className="fill-[#C97F28] dark:fill-[#D49443]"
      />
      {/* Top-edge highlight */}
      <path
        d="M18 13.5H27V16.5H18V21H15V16.5H18V13.5Z"
        className="fill-[#F2C14E] dark:fill-[#EBC369]"
      />
    </svg>
  );
}

export function PixelMoonIcon({ className = 'w-7 h-7' }: PixelIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
    >
      {/* Crisp crescent outline */}
      <path
        d="M21 4.5H31.5V7.5H28.5V10.5H27V15H25.5V24H27V28.5H30V31.5H34.5V33H40.5V31.5H43.5V37.5H40.5V40.5H36V43.5H19.5V40.5H13.5V37.5H10.5V33H7.5V18H10.5V12H15V7.5H21V4.5Z"
        fill={OUTLINE}
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      {/* Crescent body */}
      <path
        d="M21 7.5H27V10.5H25.5V15H24V24H25.5V28.5H28.5V31.5H33V34.5H40.5V37.5H36V40.5H19.5V37.5H13.5V33H10.5V18H13.5V12H18V9H21V7.5Z"
        className="fill-[#C97F28] dark:fill-[#D49443]"
      />
      {/* Top-edge highlight */}
      <path
        d="M21 7.5H27V10.5H22.5V13.5H16.5V16.5H13.5V12H18V9H21V7.5Z"
        className="fill-[#F2C14E] dark:fill-[#EBC369]"
      />
    </svg>
  );
}

export function PixelVolumeIcon({
  muted,
  className = 'w-7 h-7',
}: PixelIconProps & { muted: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
    >
      {/* Speaker Outline */}
      <path
        d="M19.5 9H27V39H19.5V36H15V33H6V30H3V18H6V15H15V12H19.5V9Z"
        fill={OUTLINE}
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      {/* Speaker Cone in teal */}
      <path
        d="M21 12H24V36H21V33H16.5V30H7.5V27H6V19.5H7.5V18H16.5V15H21V12Z"
        className="fill-[#2E7D78] dark:fill-[#4B8B88]"
      />
      {/* Top highlight on cone */}
      <path
        d="M21 12H24V16.5H21V18H16.5V15H21V12Z"
        className="fill-[#6EC2B8] dark:fill-[#83B3A4]"
      />
      {/* Speaker Base */}
      <path d="M6 19.5H12V28.5H6V19.5Z" className="fill-[#C97F28] dark:fill-[#D49443]" />

      {muted ? (
        <>
          {/* Mute X Outline */}
          <path
            d="M30 15H36V18H39V15H45V21H42V27H45V33H39V30H36V33H30V27H33V21H30V15Z"
            fill={OUTLINE}
            stroke={OUTLINE}
            strokeWidth="1.5"
            strokeLinejoin="miter"
          />
          {/* Mute X Fill in terracotta */}
          <path
            d="M31.5 16.5H34.5V19.5H37.5V21H39V19.5H40.5V16.5H43.5V19.5H40.5V22.5H39V25.5H40.5V28.5H43.5V31.5H40.5V28.5H37.5V27H36V28.5H34.5V31.5H31.5V28.5H34.5V25.5H36V22.5H34.5V19.5H31.5V16.5Z"
            className="fill-[#BD432B] dark:fill-[#C85A43]"
          />
          <path
            d="M31.5 16.5H34.5V18H31.5V16.5ZM40.5 16.5H43.5V18H40.5V16.5Z"
            className="fill-[#F07A5E] dark:fill-[#E58962]"
          />
        </>
      ) : (
        <>
          {/* Waves Outline */}
          <path
            d="M30 15H34.5V18H37.5V30H34.5V33H30V27H33V21H30V15ZM37.5 7.5H42V12H45V16.5H46.5V31.5H45V36H42V40.5H37.5V34.5H40.5V30H42V18H40.5V13.5H37.5V7.5Z"
            fill={OUTLINE}
            stroke={OUTLINE}
            strokeWidth="1.5"
            strokeLinejoin="miter"
          />
          {/* Waves Fill in terracotta */}
          <path
            d="M31.5 16.5H33V19.5H36V28.5H33V31.5H31.5V28.5H34.5V19.5H31.5V16.5ZM39 9H40.5V13.5H43.5V18H45V30H43.5V34.5H40.5V39H39V36H42V31.5H43.5V16.5H42V12H39V9Z"
            className="fill-[#BD432B] dark:fill-[#C85A43]"
          />
          <path d="M39 9H40.5V12H39V9Z" className="fill-[#F07A5E] dark:fill-[#E58962]" />
        </>
      )}
    </svg>
  );
}

export function PixelSearchIcon({ className = 'w-6 h-6' }: PixelIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
    >
      {/* Outline */}
      <path
        d="M13.5 4.5H30V7.5H36V13.5H39V30H36V34.5H37.5V36H40.5V39H43.5V45H36V42H33V39H30V37.5H13.5V34.5H7.5V28.5H4.5V15H7.5V9H13.5V4.5Z"
        fill={OUTLINE}
      />
      {/* Handle */}
      <path
        d="M30 31.5H34.5V36H37.5V39H40.5V42H37.5V40.5H34.5V37.5H31.5V34.5H30V31.5Z"
        className="fill-[#C97F28] dark:fill-[#D49443]"
      />
      {/* Ochre Frame */}
      <path
        d="M13.5 7.5H30V10.5H34.5V15H36V28.5H33V33H28.5V34.5H15V31.5H10.5V27H7.5V16.5H10.5V12H13.5V7.5Z"
        className="fill-[#C97F28] dark:fill-[#D49443]"
      />
      {/* Top-edge highlight on frame */}
      <path
        d="M13.5 7.5H30V10.5H13.5V15H10.5V12H13.5V7.5Z"
        className="fill-[#F2C14E] dark:fill-[#EBC369]"
      />
      {/* Lens in teal */}
      <path
        d="M15 12H28.5V15H31.5V18H33V27H30V30H27V31.5H16.5V28.5H13.5V25.5H12V18H15V12Z"
        className="fill-[#2E7D78] dark:fill-[#4B8B88]"
      />
      {/* Simple top-left glass highlight */}
      <path
        d="M16.5 13.5H22.5V16.5H18V21H15V16.5H16.5V13.5Z"
        className="fill-[#6EC2B8] dark:fill-[#83B3A4]"
      />
    </svg>
  );
}