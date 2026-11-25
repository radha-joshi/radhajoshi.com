import { useState } from 'react';

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
      <g stroke="#2B2833" strokeWidth={10} strokeLinejoin="miter" fill="none">
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

function playLampClick(turningOn: boolean) {
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return;
  const ctx = new AudioCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(turningOn ? 900 : 650, now);
  osc.frequency.exponentialRampToValueAtTime(140, now + 0.035);

  gain.gain.setValueAtTime(0.22, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.045);
}

export default function BookshelfDark() {
  const [isLampOn, setIsLampOn] = useState(true);

  const bookHover =
    'cursor-pointer transition-transform duration-150 ease-out hover:-translate-y-3';

  const handleLampClick = () => {
    const next = !isLampOn;
    setIsLampOn(next);
    playLampClick(next);
  };

  return (
    <div className="w-full max-w-2xl mx-auto select-none">
      <svg
        viewBox="0 0 1000 400"
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
          <g id="lamp-glow" className="pointer-events-none">
            <rect x="720" y="106" width="256" height="216" fill="#F7DC88" fillOpacity="0.08" />
            <rect x="748" y="130" width="204" height="184" fill="#F7DC88" fillOpacity="0.12" />
            <rect x="780" y="158" width="144" height="148" fill="#F7DC88" fillOpacity="0.16" />
            <rect x="768" y="234" width="168" height="72" fill="#F7DC88" fillOpacity="0.12" />
          </g>
        )}

        <g id="shelf">
          <rect x="23" y="306" width="920" height="10" fill="#2B2833" />
          <rect x="13" y="316" width="10" height="43" fill="#2B2833" />
          <rect x="23" y="359" width="920" height="9" fill="#2B2833" />
          <rect x="943" y="316" width="10" height="43" fill="#2B2833" />
          <rect x="63" y="368" width="10" height="18" fill="#2B2833" />
          <rect x="843" y="368" width="10" height="18" fill="#2B2833" />
          <rect x="73" y="386" width="40" height="10" fill="#2B2833" />
          <rect x="853" y="386" width="40" height="10" fill="#2B2833" />
          <rect x="113" y="368" width="10" height="18" fill="#2B2833" />
          <rect x="893" y="368" width="10" height="18" fill="#2B2833" />
          <rect x="23" y="315" width="920" height="44" fill="#9C5F30" />
          <rect x="23" y="315" width="920" height="4" fill="#C58C63" />
          <rect x="23" y="350" width="920" height="9" fill="#7D4822" />
          <rect x="733" y="333" width="125" height="5" fill="#7D4822" />
          <rect x="668" y="333" width="25" height="5" fill="#7D4822" />
          <rect x="853" y="328" width="90" height="5" fill="#7D4822" />
          <rect x="23" y="329" width="200" height="5" fill="#7D4822" />
          <rect x="223" y="334" width="114" height="5" fill="#7D4822" />
          <rect x="355" y="334" width="20" height="5" fill="#7D4822" />
          <rect x="693" y="333" width="8" height="5" fill="#8D5429" />
          <rect x="348" y="334" width="7" height="5" fill="#8D5429" />
          <rect x="73" y="366" width="40" height="20" fill="#9C5F30" />
          <rect x="73" y="366" width="40" height="11" fill="#7D4822" />
          <rect x="106" y="376" width="7" height="10" fill="#8D5429" />
          <rect x="853" y="366" width="40" height="20" fill="#9C5F30" />
          <rect x="853" y="366" width="40" height="10" fill="#7D4822" />
          <rect x="888" y="376" width="5" height="10" fill="#7D4822" />
          {isLampOn && (
            <rect x="772" y="315" width="156" height="4" fill="#F7DC88" fillOpacity="0.65" />
          )}
        </g>

        <g id="ochre-book" className={bookHover}>
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
            [296, 210, 24, 96],
            [320, 222, 12, 12],
            [332, 210, 24, 24],
          ]}
          highlights={[
            [296, 210, 24, 4],
            [332, 210, 24, 4],
            [320, 222, 12, 4],
          ]}
        />

        <PixelLetter
          id="a-ochre"
          color="#D49443"
          highlightColor="#EBC369"
          rects={[
            [380, 210, 60, 12],
            [428, 222, 24, 84],
            [380, 246, 48, 12],
            [368, 258, 24, 36],
            [416, 282, 12, 12],
            [380, 294, 36, 12],
          ]}
          highlights={[
            [380, 210, 60, 4],
            [380, 246, 48, 4],
            [368, 258, 12, 4],
          ]}
        />

        <PixelLetter
          id="d-teal"
          color="#4B8B88"
          highlightColor="#83B3A4"
          rects={[
            [524, 162, 24, 144],
            [476, 210, 36, 12],
            [512, 222, 12, 12],
            [464, 222, 24, 72],
            [512, 282, 12, 12],
            [476, 294, 36, 12],
          ]}
          highlights={[
            [524, 162, 24, 4],
            [476, 210, 36, 4],
            [464, 222, 12, 4],
          ]}
        />

        <PixelLetter
          id="h-teracotta"
          color="#C85A43"
          highlightColor="#E58962"
          rects={[
            [560, 162, 24, 144],
            [584, 222, 12, 12],
            [596, 210, 36, 12],
            [620, 222, 24, 84],
          ]}
          highlights={[
            [560, 162, 24, 4],
            [596, 210, 36, 4],
            [584, 222, 12, 4],
          ]}
        />

        <PixelLetter
          id="a-teracotta"
          color="#C85A43"
          highlightColor="#E58962"
          rects={[
            [668, 210, 60, 12],
            [716, 222, 24, 84],
            [668, 246, 48, 12],
            [656, 258, 24, 36],
            [704, 282, 12, 12],
            [668, 294, 36, 12],
          ]}
          highlights={[
            [668, 210, 60, 4],
            [668, 246, 48, 4],
            [656, 258, 12, 4],
          ]}
        />

        {/* Clickable Desk Lamp */}
        <g id="lamp" onClick={handleLampClick} className="cursor-pointer">
          <title>{isLampOn ? 'Click to turn lamp off' : 'Click to turn lamp on'}</title>

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
        </g>
      </svg>
    </div>
  );
}