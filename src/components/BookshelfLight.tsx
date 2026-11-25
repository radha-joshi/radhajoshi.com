import { useState, useRef } from 'react';

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

function playCatPurr() {
  const audio = new Audio('/sounds/cat-purr.mp3');
  audio.volume = 0.6;
  audio.play().catch(() => {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(28, now);
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(18, now);
    lfoGain.gain.setValueAtTime(8, now);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    lfo.start(now);
    osc.stop(now + 1.25);
    lfo.stop(now + 1.25);
  });
}

export default function BookshelfLight() {
  const [isPurring, setIsPurring] = useState(false);
  const [isCatHovered, setIsCatHovered] = useState(false);
  const purrTimeout = useRef<number | null>(null);

  const bookHover =
    'cursor-pointer transition-transform duration-150 ease-out hover:-translate-y-3';

  const handleCatClick = () => {
    playCatPurr();
    setIsPurring(true);
    if (purrTimeout.current) window.clearTimeout(purrTimeout.current);
    purrTimeout.current = window.setTimeout(() => setIsPurring(false), 1300);
  };

  return (
    <div className="w-full max-w-2xl mx-auto select-none">
      <svg
        viewBox="0 0 1120 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Pixel art bookshelf with books, radha, and a loafing cat"
      >
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

        {/* Clickable Purring Cat (Calico loaf pose with orange + light orange spots) */}
        <g
          id="cat"
          onClick={handleCatClick}
          onMouseEnter={() => setIsCatHovered(true)}
          onMouseLeave={() => setIsCatHovered(false)}
          className={`cursor-pointer transition-transform duration-150 ${
            isPurring ? '-translate-y-1' : 'hover:-translate-y-0.5'
          }`}
        >
          <g transform="translate(937, 306) scale(1.8) translate(-850, -306)">

            {/* Floating pixel "purrr" when purring */}
            {isPurring && (
              <g id="cat-purrr" fill="#2B2833">
                {/* p */}
                <rect x="782" y="213" width="3" height="15" />
                <rect x="785" y="213" width="6" height="3" />
                <rect x="791" y="216" width="3" height="6" />
                <rect x="785" y="222" width="6" height="3" />

                {/* u */}
                <rect x="798" y="216" width="3" height="9" />
                <rect x="807" y="216" width="3" height="9" />
                <rect x="801" y="222" width="6" height="3" />

                {/* r */}
                <rect x="814" y="216" width="3" height="9" />
                <rect x="817" y="216" width="6" height="3" />

                {/* r */}
                <rect x="827" y="216" width="3" height="9" />
                <rect x="830" y="216" width="6" height="3" />

                {/* r */}
                <rect x="840" y="216" width="3" height="9" />
                <rect x="843" y="216" width="6" height="3" />
              </g>
            )}

            {/* Outer charcoal silhouette */}
            <rect x="800" y="236" width="5" height="5" fill="#2B2833" />
            <rect x="840" y="236" width="5" height="5" fill="#2B2833" />
            <rect x="795" y="241" width="15" height="5" fill="#2B2833" />
            <rect x="835" y="241" width="15" height="5" fill="#2B2833" />
            <rect x="795" y="246" width="20" height="5" fill="#2B2833" />
            <rect x="830" y="246" width="20" height="5" fill="#2B2833" />
            <rect x="795" y="251" width="90" height="5" fill="#2B2833" />
            <rect x="795" y="256" width="95" height="5" fill="#2B2833" />
            <rect x="790" y="261" width="105" height="10" fill="#2B2833" />
            <rect x="790" y="271" width="110" height="10" fill="#2B2833" />
            <rect x="795" y="281" width="115" height="5" fill="#2B2833" />
            <rect x="800" y="286" width="110" height="5" fill="#2B2833" />
            <rect x="800" y="291" width="110" height="15" fill="#2B2833" />

            {/* Ears (light orange left, warm orange right, pink inner) */}
            <rect x="800" y="241" width="5" height="5" fill="#F0B665" />
            <rect x="840" y="241" width="5" height="5" fill="#D49443" />
            <rect x="800" y="246" width="5" height="5" fill="#E8A298" />
            <rect x="805" y="246" width="5" height="5" fill="#F0B665" />
            <rect x="835" y="246" width="5" height="5" fill="#D49443" />
            <rect x="840" y="246" width="5" height="5" fill="#E8A298" />

            {/* Head base (cream-white) */}
            <rect x="800" y="251" width="45" height="5" fill="#FDFBF7" />
            <rect x="795" y="256" width="55" height="25" fill="#FDFBF7" />
            <rect x="800" y="281" width="45" height="5" fill="#FDFBF7" />
            <rect x="805" y="286" width="35" height="5" fill="#FDFBF7" />

            {/* Head spots: light orange on left, warm orange on right */}
            <rect x="800" y="251" width="15" height="5" fill="#F0B665" />
            <rect x="795" y="256" width="20" height="15" fill="#F0B665" />
            <rect x="795" y="271" width="10" height="5" fill="#F0B665" />

            <rect x="830" y="251" width="15" height="5" fill="#D49443" />
            <rect x="825" y="256" width="25" height="10" fill="#D49443" />
            <rect x="835" y="266" width="15" height="15" fill="#D49443" />

            {/* Sleepy eyes & pink nose */}
            <rect x="800" y="266" width="10" height="5" fill="#2B2833" />
            <rect x="830" y="266" width="10" height="5" fill="#2B2833" />
            <rect x="820" y="271" width="5" height="5" fill="#E8A298" />
            {isPurring && (
              <>
                <rect x="795" y="271" width="5" height="5" fill="#E8A298" />
                <rect x="840" y="271" width="5" height="5" fill="#E8A298" />
              </>
            )}

            {/* Soft chin shadow & tucked front paws */}
            <rect x="810" y="291" width="25" height="5" fill="#8E8B92" />
            <rect x="805" y="296" width="15" height="10" fill="#FDFBF7" />
            <rect x="825" y="296" width="20" height="10" fill="#FDFBF7" />
            <rect x="820" y="296" width="5" height="10" fill="#2B2833" />

            {/* Loafing body base (cream-white) */}
            <rect x="850" y="256" width="35" height="40" fill="#FDFBF7" />
            <rect x="885" y="266" width="10" height="30" fill="#FDFBF7" />
            <rect x="850" y="296" width="55" height="10" fill="#FDFBF7" />

            {/* Back spots (light orange + warm orange matching reference) */}
            <rect x="855" y="256" width="10" height="10" fill="#F0B665" />
            <rect x="865" y="256" width="15" height="25" fill="#D49443" />
            <rect x="880" y="261" width="10" height="15" fill="#F0B665" />

            {/* Hind leg & curled striped tail */}
            <rect x="855" y="296" width="20" height="10" fill="#D49443" />
            <rect x="885" y="281" width="10" height="5" fill="#2B2833" />
            <rect x="895" y="281" width="10" height="10" fill="#D49443" />
            <rect x="890" y="286" width="10" height="5" fill="#FDFBF7" />
            <rect x="895" y="291" width="10" height="5" fill="#FDFBF7" />
            <rect x="885" y="296" width="10" height="10" fill="#D49443" />
          </g>

          {/* Hover-only big legible note to the right of the cat with a loopy arrow */}
          <g
            aria-hidden="true"
            className="pointer-events-none transition-opacity duration-200"
            style={{ opacity: isCatHovered ? 1 : 0 }}
          >
            <path
              d="M 1120 186 C 1092 170, 1072 198, 1090 216 C 1108 234, 1128 204, 1102 190 C 1070 174, 1049 180, 1041 215"
              stroke="#D49443"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M 1032 200 L 1041 217 L 1057 207"
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
              <tspan x="1136" dy="64">pet him</tspan>
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}