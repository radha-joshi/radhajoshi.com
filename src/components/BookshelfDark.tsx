import { useState } from 'react';
import OchreWindow from './OchreWindow';
import { useSound } from '../context/SoundContext';

type RectDef = [number, number, number, number];

function PixelLetter({
  id,
  rects,
  highlights,
  color,
  highlightColor,
}: {
  id: string;
  rects: RectDef[];
  highlights: RectDef[];
  color: string;
  highlightColor: string;
}) {
  return (
    <g id={id}>
      <g stroke="#2B2833" strokeWidth={18} strokeLinejoin="miter" fill="none">
        {rects.map(([x, y, w, h], i) => (
          <rect key={`o-${i}`} x={x} y={y} width={w} height={h} />
        ))}
      </g>
      <g fill={color}>
        {rects.map(([x, y, w, h], i) => (
          <rect key={`f-${i}`} x={x} y={y} width={w} height={h} />
        ))}
      </g>
      <g fill={highlightColor}>
        {highlights.map(([x, y, w, h], i) => (
          <rect key={`h-${i}`} x={x} y={y} width={w} height={h} />
        ))}
      </g>
    </g>
  );
}

export default function BookshelfDark() {
  const [isLampOn, setIsLampOn] = useState(true);
  const [isLampHovered, setIsLampHovered] = useState(false);
  const [isOchrePressed, setIsOchrePressed] = useState(false);
  const [isOchreWindowOpen, setIsOchreWindowOpen] = useState(false);
  const { playSound } = useSound();

  const handleOchreBookClick = () => {
    setIsOchrePressed(true);
    playSound('window-open', 0.45);
    window.setTimeout(() => {
      setIsOchrePressed(false);
      setIsOchreWindowOpen(true);
    }, 160);
  };

  const bookHover =
    'cursor-pointer transition-transform duration-150 ease-out hover:-translate-y-3';

  const handleLampClick = () => {
    const next = !isLampOn;
    setIsLampOn(next);
    playSound(next ? 'lamp-on' : 'lamp-off', 0.6);
  };

  return (
    <div className="w-full max-w-2xl mx-auto select-none">
      <svg
        viewBox="0 0 1120 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        className={`w-full h-auto overflow-visible transition-opacity duration-300 ${
          isLampOn ? 'opacity-100' : 'opacity-60'
        }`}
        role="img"
        aria-label="Pixel art bookshelf with books, radha, and a desk lamp"
      >
        {isLampOn && (
          <g id="lamp-glow" className="pointer-events-none" transform="translate(90, 0)">
            <rect x="720" y="106" width="256" height="216" fill="#F7DC88" fillOpacity="0.08" />
            <rect x="748" y="130" width="204" height="184" fill="#F7DC88" fillOpacity="0.12" />
            <rect x="780" y="158" width="144" height="148" fill="#F7DC88" fillOpacity="0.16" />
            <rect x="768" y="234" width="168" height="72" fill="#F7DC88" fillOpacity="0.12" />
          </g>
        )}

        <g id="shelf">
          <rect x="23" y="306" width="1040" height="10" fill="#2B2833" />
          <rect x="13" y="316" width="10" height="43" fill="#2B2833" />
          <rect x="23" y="359" width="1040" height="9" fill="#2B2833" />
          <rect x="1063" y="316" width="10" height="43" fill="#2B2833" />
          <rect x="63" y="368" width="10" height="18" fill="#2B2833" />
          <rect x="963" y="368" width="10" height="18" fill="#2B2833" />
          <rect x="73" y="386" width="40" height="10" fill="#2B2833" />
          <rect x="973" y="386" width="40" height="10" fill="#2B2833" />
          <rect x="113" y="368" width="10" height="18" fill="#2B2833" />
          <rect x="1013" y="368" width="10" height="18" fill="#2B2833" />
          <rect x="23" y="315" width="1040" height="44" fill="#9C5F30" />
          <rect x="23" y="315" width="1040" height="4" fill="#C58C63" />
          <rect x="23" y="350" width="1040" height="9" fill="#7D4822" />
          <rect x="853" y="333" width="125" height="5" fill="#7D4822" />
          <rect x="788" y="333" width="25" height="5" fill="#7D4822" />
          <rect x="973" y="328" width="90" height="5" fill="#7D4822" />
          <rect x="23" y="329" width="200" height="5" fill="#7D4822" />
          <rect x="223" y="334" width="114" height="5" fill="#7D4822" />
          <rect x="355" y="334" width="20" height="5" fill="#7D4822" />
          <rect x="813" y="333" width="8" height="5" fill="#8D5429" />
          <rect x="348" y="334" width="7" height="5" fill="#8D5429" />
          <rect x="73" y="366" width="40" height="20" fill="#9C5F30" />
          <rect x="73" y="366" width="40" height="11" fill="#7D4822" />
          <rect x="106" y="376" width="7" height="10" fill="#8D5429" />
          <rect x="973" y="366" width="40" height="20" fill="#9C5F30" />
          <rect x="973" y="366" width="40" height="10" fill="#7D4822" />
          <rect x="1008" y="376" width="5" height="10" fill="#7D4822" />
        </g>

        <g
          id="ochre-book"
          onMouseEnter={() => playSound('book-hop', 0.35)}
          onClick={handleOchreBookClick}
          style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
          className={`cursor-pointer transition-transform duration-150 ease-out ${
            isOchrePressed
              ? 'translate-y-0 scale-y-90 scale-x-95'
              : 'hover:-translate-y-3'
          }`}
        >
          <rect x="40" y="86" width="10" height="220" fill="#2B2833" />
          <rect x="50" y="76" width="75" height="10" fill="#2B2833" />
          <rect x="125" y="86" width="10" height="220" fill="#2B2833" />
          <rect x="50" y="86" width="75" height="220" fill="#D49443" />
          <rect x="110" y="86" width="15" height="220" fill="#AC6E35" />
          <rect x="50" y="93" width="10" height="200" fill="#EBC369" />
          <rect x="60" y="301" width="50" height="5" fill="#AC6E35" />
          <rect x="60" y="86" width="50" height="7" fill="#EBC369" />
          <rect x="60" y="111" width="50" height="5" fill="#966029" />
          <rect x="60" y="266" width="50" height="5" fill="#966029" />
          <rect x="60" y="121" width="50" height="5" fill="#EBC369" />
          <rect x="60" y="276" width="50" height="5" fill="#EBC369" />
          <rect x="70" y="156" width="30" height="6" fill="#AC6E35" />
          <rect x="70" y="230" width="30" height="6" fill="#AC6E35" />
          <rect x="69" y="156" width="6" height="80" fill="#AC6E35" />
          <rect x="94" y="156" width="6" height="80" fill="#AC6E35" />
          <rect x="75" y="182" width="19" height="13" fill="#EBC369" />
          <rect x="80" y="177" width="8" height="5" fill="#EBC369" />
          <rect x="80" y="195" width="8" height="5" fill="#EBC369" />
          <rect x="80" y="214" width="8" height="5" fill="#966029" />
          <rect x="50" y="306" width="75" height="9" fill="#2B2833" />
        </g>

        <g id="teal-book" className={bookHover}>
          <rect x="140" y="110" width="50" height="6" fill="#2B2833" />
          <rect x="130" y="116" width="10" height="190" fill="#2B2833" />
          <rect x="190" y="116" width="10" height="190" fill="#2B2833" />
          <rect x="140" y="116" width="50" height="190" fill="#4B8B88" />
          <rect x="178" y="116" width="12" height="190" fill="#2C6268" />
          <rect x="140" y="120" width="5" height="174" fill="#83B3A4" />
          <rect x="145" y="301" width="33" height="5" fill="#2C6268" />
          <rect x="145" y="116" width="33" height="4" fill="#83B3A4" />
          <rect x="145" y="128" width="33" height="4" fill="#F2DFAF" />
          <rect x="145" y="136" width="33" height="4" fill="#83B3A4" />
          <rect x="145" y="277" width="33" height="4" fill="#F2DFAF" />
          <rect x="145" y="285" width="33" height="4" fill="#83B3A4" />
          <rect x="145" y="166" width="33" height="48" fill="#2C6268" />
          <rect x="154" y="243" width="15" height="5" fill="#83B3A4" />
          <rect x="149" y="171" width="25" height="37" fill="#F2DFAF" />
          <rect x="154" y="180" width="15" height="6" fill="#B87837" />
          <rect x="154" y="189" width="15" height="6" fill="#B87837" />
          <rect x="154" y="198" width="15" height="6" fill="#B87837" />
          <rect x="140" y="306" width="50" height="9" fill="#2B2833" />
        </g>

        <g id="teracotta-book" className={bookHover}>
          <rect x="195" y="102" width="10" height="204" fill="#2B2833" />
          <rect x="205" y="93" width="59" height="9" fill="#2B2833" />
          <rect x="264" y="102" width="10" height="204" fill="#2B2833" />
          <rect x="205" y="102" width="59" height="204" fill="#C85A43" />
          <rect x="254" y="102" width="10" height="204" fill="#9B3F41" />
          <rect x="210" y="102" width="44" height="4" fill="#E58962" />
          <rect x="205" y="106" width="5" height="188" fill="#E58962" />
          <rect x="210" y="301" width="44" height="5" fill="#9B3F41" />
          <rect x="210" y="281" width="44" height="4" fill="#9B3F41" />
          <rect x="210" y="273" width="44" height="4" fill="#F2DFAF" />
          <rect x="210" y="128" width="44" height="4" fill="#9B3F41" />
          <rect x="210" y="119" width="44" height="4" fill="#F2DFAF" />
          <rect x="210" y="181" width="44" height="4" fill="#F2DFAF" />
          <rect x="214" y="185" width="36" height="4" fill="#F2DFAF" />
          <rect x="218" y="189" width="28" height="4" fill="#F2DFAF" />
          <rect x="218" y="173" width="28" height="4" fill="#F2DFAF" />
          <rect x="214" y="177" width="36" height="4" fill="#F2DFAF" />
          <rect x="230" y="176" width="4" height="14" fill="#9B3F41" />
          <rect x="223" y="212" width="19" height="4" fill="#E58962" />
          <rect x="220" y="224" width="25" height="4" fill="#E58962" />
          <rect x="205" y="306" width="59" height="9" fill="#2B2833" />
        </g>

        <PixelLetter
          id="r-ochre"
          color="#D49443"
          highlightColor="#EBC369"
          rects={[
            [302, 210, 24, 96],
            [326, 222, 12, 12],
            [338, 210, 24, 24],
          ]}
          highlights={[
            [302, 210, 24, 4],
            [338, 210, 24, 4],
            [326, 222, 12, 4],
          ]}
        />

        <PixelLetter
          id="a-ochre"
          color="#D49443"
          highlightColor="#EBC369"
          rects={[
            [386, 210, 60, 12],
            [434, 222, 24, 84],
            [386, 246, 48, 12],
            [374, 258, 24, 36],
            [422, 282, 12, 12],
            [386, 294, 36, 12],
          ]}
          highlights={[
            [386, 210, 60, 4],
            [386, 246, 48, 4],
            [374, 258, 12, 4],
          ]}
        />

        <PixelLetter
          id="d-teal"
          color="#4B8B88"
          highlightColor="#83B3A4"
          rects={[
            [546, 162, 24, 144],
            [498, 210, 36, 12],
            [534, 222, 12, 12],
            [486, 222, 24, 72],
            [534, 282, 12, 12],
            [498, 294, 36, 12],
          ]}
          highlights={[
            [546, 162, 24, 4],
            [498, 210, 36, 4],
            [486, 222, 12, 4],
          ]}
        />

        <PixelLetter
          id="h-teracotta"
          color="#C85A43"
          highlightColor="#E58962"
          rects={[
            [598, 162, 24, 144],
            [622, 222, 12, 12],
            [634, 210, 36, 12],
            [658, 222, 24, 84],
          ]}
          highlights={[
            [598, 162, 24, 4],
            [634, 210, 36, 4],
            [622, 222, 12, 4],
          ]}
        />

        <PixelLetter
          id="a-teracotta"
          color="#C85A43"
          highlightColor="#E58962"
          rects={[
            [722, 210, 60, 12],
            [770, 222, 24, 84],
            [722, 246, 48, 12],
            [710, 258, 24, 36],
            [758, 282, 12, 12],
            [722, 294, 36, 12],
          ]}
          highlights={[
            [722, 210, 60, 4],
            [722, 246, 48, 4],
            [710, 258, 12, 4],
          ]}
        />

        {/* Clickable Desk Lamp */}
        <g
          id="lamp"
          onClick={handleLampClick}
          onMouseEnter={() => setIsLampHovered(true)}
          onMouseLeave={() => setIsLampHovered(false)}
          className="cursor-pointer"
          transform="translate(90, 0)"
        >
          <rect x="844" y="170" width="16" height="8" fill="#2B2833" />
          <rect x="848" y="172" width="8" height="6" fill="#D49443" />

          <rect x="828" y="178" width="48" height="8" fill="#2B2833" />
          <rect x="820" y="186" width="64" height="8" fill="#2B2833" />
          <rect x="812" y="194" width="80" height="16" fill="#2B2833" />
          <rect x="804" y="210" width="96" height="24" fill="#2B2833" />

          <rect x="828" y="186" width="48" height="8" fill={isLampOn ? '#EBC369' : '#4B8B88'} />
          <rect x="820" y="194" width="64" height="16" fill={isLampOn ? '#F7DC88' : '#4B8B88'} />
          <rect x="812" y="210" width="80" height="16" fill={isLampOn ? '#F7DC88' : '#2C6268'} />
          {isLampOn ? (
            <>
              <rect x="836" y="198" width="32" height="24" fill="#FFF3C4" />
              <rect x="812" y="222" width="80" height="4" fill="#FFF3C4" />
            </>
          ) : (
            <rect x="820" y="194" width="12" height="28" fill="#83B3A4" />
          )}

          <rect x="870" y="234" width="4" height="16" fill="#D49443" />
          <rect x="868" y="250" width="8" height="8" fill={isLampOn ? '#F7DC88' : '#EBC369'} />

          <rect x="836" y="234" width="32" height="48" fill="#2B2833" />
          <rect x="844" y="234" width="8" height="48" fill="#EBC369" />
          <rect x="852" y="234" width="8" height="48" fill="#D49443" />

          <rect x="828" y="282" width="48" height="8" fill="#2B2833" />
          <rect x="836" y="282" width="32" height="8" fill="#D49443" />
          <rect x="820" y="290" width="64" height="16" fill="#2B2833" />
          <rect x="828" y="290" width="48" height="8" fill="#AC6E35" />
          <rect x="828" y="290" width="16" height="8" fill="#D49443" />

          {/* Hover-only big loopy ochre arrow & note to the right of the lamp */}
          <g
            aria-hidden="true"
            className="pointer-events-none transition-opacity duration-200"
            style={{ opacity: isLampHovered ? 1 : 0 }}
          >
            <path
              d="M 1030 148 C 1002 134, 982 162, 1000 180 C 1018 198, 1038 168, 1012 154 C 974 134, 922 146, 908 192"
              stroke="#D49443"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M 900 176 L 908 194 L 924 184"
              stroke="#D49443"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            <text
              x="1132"
              y="146"
              fill="#D49443"
              fontSize="74"
              fontWeight="700"
              fontStyle="italic"
              transform="rotate(-8 1132 146)"
              style={{ fontFamily: "'Caveat', 'Bradley Hand', 'Comic Sans MS', cursive" }}
            >
              click to
              <tspan x="1048" dy="50">turn lamp</tspan>
              <tspan x="1052" dy="50">{isLampOn ? 'off' : 'on'}</tspan>
            </text>
          </g>
        </g>
      </svg>
      <OchreWindow
        isOpen={isOchreWindowOpen}
        onClose={() => setIsOchreWindowOpen(false)}
        title="ochre-book"
      >
        {/* Your custom content here */}
      </OchreWindow>
    </div>
  );
}