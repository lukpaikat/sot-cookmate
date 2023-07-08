import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Button } from "@/components/ui/button";
import { Stop, ArrowCounterClockwise } from "@phosphor-icons/react";
import { useTimer } from "react-timer-hook";
import useSound from "use-sound";
import formatSeconds from "../lib/formatSeconds";
import limitSeconds from "../lib/limitSeconds";
import visualAlarmBackgroundColor from "../global/visualAlarmBackground";
import { foodCookTimes, foodDescription } from "../global/foodData";
import FoodDialog from "../components/ui/foodDialog";
import cookedSound from "../sounds/cooked-sound.mp3";
import burntSound from "../sounds/burnt-sound.mp3";
import onFireSound from "../sounds/on-fire-sound.mp3";

const IndexPage = () => {
  const [audioContext, setAudioContext] = React.useState(null);
  const [foodStatus, setFoodStatus] = React.useState("raw"); // raw, cooked, burnt, onFire
  const [isStarted, setIsStarted] = React.useState(false);
  const [selectedFood, setSelectedFood] = React.useState("meat"); // fish, trophyFish, meat, beastMeat

  /* Sound hooks */
  const [playCooked] = useSound(cookedSound);
  const [playBurnt] = useSound(burntSound);
  const [playOnFire] = useSound(onFireSound);

  const timeToCooked = foodCookTimes[selectedFood].cooked;
  const timeToBurnt = foodCookTimes[selectedFood].burnt;
  const timeToOnFire = 300;

  const getMaxCookingTime = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + timeToOnFire);
    return time;
  };

  /* Cooking timer */
  const { start, pause, resume, restart, totalSeconds, isRunning } = useTimer({
    expiryTimestamp: getMaxCookingTime,
    autoStart: false,
    onExpire: () => {
      setFoodStatus("onFire");
      playOnFire();
    },
  });

  const timerStart = () => {
    if (isRunning) {
      return;
    }
    if (isStarted) {
      resume();
      return;
    }
    if (audioContext === null) {
      initializeAudioContext();
    }
    start();
    setIsStarted(true);
  };

  const timerPause = () => {
    pause();
  };

  const timerRestart = () => {
    setFoodStatus("raw");
    setIsStarted(false);
    restart(getMaxCookingTime(), true);
  };

  const timerStop = () => {
    setFoodStatus("raw");
    setIsStarted(false);
    restart(getMaxCookingTime(), false);
  };

  const toCookedSeconds = limitSeconds({
    seconds: totalSeconds,
    initialSeconds: timeToOnFire,
    limit: timeToCooked,
  });
  const toBurntSeconds = limitSeconds({
    seconds: totalSeconds,
    initialSeconds: timeToOnFire,
    limit: timeToBurnt,
  });

  const initializeAudioContext = () => {
    // Check if the window object is available
    if (typeof window === 'undefined' || !window.AudioContext) {
      return;
    }

    // Create a new AudioContext instance
    const context = new (window.AudioContext || window.webkitAudioContext)();

    // Play a silent sound to activate the audio context
    const buffer = context.createBuffer(1, 1, context.sampleRate);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start();

    // Set the initialized audio context to the state
    setAudioContext(context)
  }

  React.useEffect(() => {
    if (foodStatus === "raw" && toCookedSeconds === 0) {
      setFoodStatus("cooked");
      playCooked();
    }
    if (foodStatus === "cooked" && toBurntSeconds === 0) {
      setFoodStatus("burnt");
      playBurnt();
    }
  }, [foodStatus, toBurntSeconds, toCookedSeconds, playBurnt, playCooked]);

  return (
    <Layout>
      {/* Timer Container */}
      <div className="mx-auto flex max-w-xs flex-col">
        {/* Food Label */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {foodDescription[selectedFood].label}
            </h1>
            <p>{foodDescription[selectedFood].description}</p>
          </div>
          {/* <Button variant="ghost" size="icon">
            <DotsThreeVertical
              size={32}
              weight="bold"
              className="text-stone-50"
            />
          </Button> */}
          <FoodDialog
            onFoodSelected={setSelectedFood}
            currentFood={selectedFood}
            stopTimer={timerStop}
          />
        </div>
        {/* Cooked Time Display */}
        <div className="overflow-hidden">
          <section className={`relative my-6 w-full py-8`}>
            <div
              className={`absolute inset-0 ${
                visualAlarmBackgroundColor[foodStatus]
              } ${
                foodStatus !== "raw"
                  ? "visible animate-horizontal-pulse"
                  : "hidden"
              }`}
            />
            <p className="relative z-10 text-center font-mono text-6xl">
              {formatSeconds(toCookedSeconds)}
            </p>
          </section>
        </div>
        {/* burnt and burning timer */}
        <section>
          <div className="flex justify-between">
            <p className="text-2xl">Burnt</p>
            <p className={`font-mono text-2xl`}>
              {formatSeconds(toBurntSeconds)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-2xl">On Fire</p>
            <p className="font-mono text-2xl">{formatSeconds(totalSeconds)}</p>
          </div>
        </section>
        {/* Controls */}
        <section className="mx-auto my-8 flex items-center gap-8">
          <Button variant="ghost" size="icon" onClick={timerStop}>
            <Stop size={32} className="text-stone-50" alt="stop" />
          </Button>
          <Button
            variant={isRunning ? "secondary" : "default"}
            size="default"
            onClick={() => {
              if (isRunning) {
                timerPause();
                return;
              }
              timerStart();
            }}
          >
            <span className="text-base">
              {isRunning ? "Pause" : isStarted ? "Resume" : "Start"}
            </span>
          </Button>
          <Button variant="ghost" size="icon" onClick={timerRestart}>
            <ArrowCounterClockwise size={32} className="text-stone-50" alt="repeat" />
          </Button>
        </section>
      </div>
    </Layout>
  );
};

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo />;

export default IndexPage;
