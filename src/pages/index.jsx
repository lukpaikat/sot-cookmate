import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Button } from "@/components/ui/button";
import {
  DotsThreeVertical,
  Stop,
  Play,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";
import { useTimer } from "react-timer-hook";
import { padSeconds } from "../tools/padSeconds";

const IndexPage = () => {
  const getMeatCookTime = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 60);
    return time;
  };

  const getMeatBurntTime = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 120);
    return time;
  };

  const [isCooked, setIsCooked] = React.useState(false);
  const [isBurnt, setIsBurnt] = React.useState(false);

  /* Cooked Timer */
  const {
    start: cookStart,
    restart: cookRestart,
    seconds: cookSeconds,
    minutes: cookMinutes,
    isRunning,
  } = useTimer({
    expiryTimestamp: () => getMeatCookTime(),
    onExpire: () => setIsCooked(true),
    autoStart: false,
  });

  /* Burnt Timer */
  const {
    start: burntStart,
    restart: burntRestart,
    seconds: burntSeconds,
    minutes: burntMinutes,
  } = useTimer({
    expiryTimestamp: () => getMeatBurntTime(),
    onExpire: () => setIsBurnt(true),
    autoStart: false,
  });

  const allTimerStart = () => {
    if (isRunning) return;
    cookStart();
    burntStart();
  };

  const allTimerRestart = () => {
    setIsCooked(false);
    setIsBurnt(false);
    cookRestart(getMeatCookTime(), true);
    burntRestart(getMeatBurntTime(), true);
  };

  const allTimerStop = () => {
    setIsCooked(false);
    setIsBurnt(false);
    cookRestart(getMeatCookTime(), false);
    burntRestart(getMeatBurntTime(), false);
  };

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
          <section
            className={`py-8} my-6 w-full ${
              isCooked ? "animate-bounce text-green-400" : ""
            }`}
          >
            <p className="text-center font-mono text-6xl">
              {cookMinutes}:{padSeconds(cookSeconds)}
            </p>
          </section>
        </div>
        {/* burnt and burning timer */}
        <section>
          <div className="flex justify-between">
            <p className="text-2xl">Burnt</p>
            <p
              className={`font-mono text-2xl ${
                isBurnt ? "animate-bounce text-yellow-400" : ""
              }`}
            >
              {burntMinutes}:{padSeconds(burntSeconds)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-2xl">Burning</p>
            <p className="font-mono text-2xl">5:00</p>
          </div>
        </section>
        {/* Controls */}
        <section className="mx-auto my-8 space-x-10">
          <Button variant="ghost" size="icon" onClick={allTimerStop}>
            <Stop size={32} className="text-stone-50" weight="fill" />
          </Button>
          <Button variant="ghost" size="icon" onClick={allTimerStart}>
            <Play size={32} className="text-stone-50" weight="fill" />
          </Button>
          <Button variant="ghost" size="icon" onClick={allTimerRestart}>
            <ArrowCounterClockwise
              size={32}
              className="text-stone-50"
              weight="fill"
            />
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
