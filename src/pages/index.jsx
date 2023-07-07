import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Button } from "@/components/ui/button";
import {
  DotsThreeVertical,
  Stop,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";
import { useTimer } from "react-timer-hook";
import formatSeconds from "../lib/formatSeconds";
import limitSeconds from "../lib/limitSeconds";
import visualAlarmBackgroundColor from '../global/visualAlarmBackground';
import foodCookTimes from '../global/foodCookTimes';

const IndexPage = () => {
  const [foodStatus, setFoodStatus] = React.useState("raw"); // raw, cooked, burnt, onFire
  const [isStarted, setIsStarted] = React.useState(false);
  const [selectedFood, setSelectedFood] = React.useState("meat"); // fish, trophyFish, meat, beastMeat
  
  const timeToCooked = 60;
  const timeToBurnt = 120;
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
    onExpire: () => setFoodStatus("onFire"),
  });

  const timerStart = () => {
    if (isRunning) {
      return;
    }
    if (isStarted) {
      resume();
      return;
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

  React.useLayoutEffect(() => {
    if (foodStatus === "raw" && toCookedSeconds === 0) {
      setFoodStatus("cooked");
    }
    if (foodStatus === "cooked" && toBurntSeconds === 0) {
      setFoodStatus("burnt");
    }
  }, [foodStatus, toBurntSeconds, toCookedSeconds]);

  return (
    <Layout>
      {/* Timer Container */}
      <div className="mx-auto flex max-w-xs flex-col">
        {/* Food Label */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Meat</h1>
            <p>Chicken, Pork, Snake & Shark</p>
          </div>
          <Button variant="ghost" size="icon">
            <DotsThreeVertical
              size={32}
              weight="bold"
              className="text-stone-50"
            />
          </Button>
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
            <Stop size={32} className="text-stone-50" />
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
            <ArrowCounterClockwise size={32} className="text-stone-50" />
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
export const Head = () => <Seo title="Home" />;

export default IndexPage;
