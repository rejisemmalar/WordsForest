import { useEffect, useRef, useState } from "react";
import "../styles/forest.css";

import bf1 from "../assets/images/forest/BF1.svg";
import bf2 from "../assets/images/forest/BF2.svg";
import bgImg from "../assets/images/forest/BGIMG.svg";
import blueLightTree from "../assets/images/forest/BLUELIGHTTREE.svg";
import blueTree from "../assets/images/forest/BLUETREE.svg";
import cauliFlowerTree from "../assets/images/forest/CAULIFLOWERTREE.svg";
import greenGrass1 from "../assets/images/forest/GREENGRASS1.svg";
import greenGrass2 from "../assets/images/forest/GREENGRASS2.svg";
import greenGrass3 from "../assets/images/forest/GREENGRASS3.svg";
import greenLightTree from "../assets/images/forest/GREENLIGHTTREE.svg";
import mashroom1 from "../assets/images/forest/MASHROOM1.svg";
import mashroom2 from "../assets/images/forest/MASHROOM2.svg";
import mashroom3 from "../assets/images/forest/MASHROOM3.svg";
import mashroomTree from "../assets/images/forest/MASHROOMTREE.svg";
import moon from "../assets/images/forest/MOON.svg";
import redTree from "../assets/images/forest/REDTREE.svg";
// import bird from "../assets/images/BIRD.svg";
import bird1 from "../assets/images/forest/bird1.png";
import bird2 from "../assets/images/forest/bird2.png";
import bird3 from "../assets/images/forest/bird3.png";
import rosetree from "../assets/images/forest/ROSETREE.svg";
import greenTree2 from "../assets/images/forest/GREENTREE2.svg";
import greentree3 from "../assets/images/forest/GREENTREE3.svg";

export default function Forest({ opacity = 1, parallax = true }) {
  
  const mouseX = useRef(0);
  const currentX = useRef(0);
  const animationFrame = useRef(null);
  const frames = [bird1, bird2, bird3];
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 140);

    return () => clearInterval(id);
  }, [frames.length]);

  useEffect(() => {
    if (!parallax) return; 

    const handleMouseMove = (e) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
    };

    const animate = () => {
      currentX.current += (mouseX.current - currentX.current) * 0.03;

      const layers = document.querySelectorAll(".forestScene img");

      layers.forEach((layer) => {
        const speed = layer.getAttribute("data-speed");
        if (speed) {
          layer.style.transform = `translateX(${currentX.current * speed}px) translateZ(${speed * 0.5}px)`;
        }
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [parallax]);

  return (
    
    <div className="forestScene" style={{ opacity }}>
      <div
      className={parallax ? "forest-parallax" : "forest-static"}
      style={{ opacity }}
    />
      <img src={bgImg} className="bg" data-speed="10" alt="BackgroundImage" />

      <div className="birdWrapper" data-speed="80">
        <img src={frames[frame]} className="birdFly" alt="BirdImage" />
      </div>
      <img src={moon} className="moon" data-speed="40" alt="MoonImage" />

      <img src={bf1} className="bf1" data-speed="100" alt="ButterflyImage" />
      <img src={bf2} className="bf2" data-speed="110" alt="ButterflyImage" />

      <img
        src={blueLightTree}
        className="bluelighttree"
        data-speed="60"
        alt="BluelightImage"
      />
      <img
        src={blueTree}
        className="bluetree"
        data-speed="90"
        alt="BlueImage"
      />
      <img
        src={redTree}
        className="redtree"
        data-speed="70"
        alt="RedtreeImage"
      />
      <img
        src={cauliFlowerTree}
        className="cauliflowertree"
        data-speed="65"
        alt="cauliflowerImage"
      />
      <img
        src={greenLightTree}
        className="greenlighttree"
        data-speed="95"
        alt="GreenLighttreeImage"
      />
      <img
        src={rosetree}
        className="rosetree"
        data-speed="120"
        alt="rosetreeImage"
      />
      <img
        src={greenTree2}
        className="greentree2"
        data-speed="70"
        alt="greentreeImage"
      />
      <img
        src={greentree3}
        className="greentree3"
        data-speed="20"
        alt="greentreeImage"
      />

      <img
        src={mashroomTree}
        className="mashroomtree"
        data-speed="30"
        alt="mashroomImage"
      />

      <img
        src={greenGrass1}
        className="greengrass1"
        data-speed="150"
        alt="greengrassImage"
      />
      <img
        src={greenGrass1}
        className="greengrasss1"
        data-speed="160"
        alt="greengrassImage"
      />
      <img
        src={greenGrass2}
        className="greengrass2"
        data-speed="170"
        alt="greengrassImage"
      />
      <img
        src={greenGrass3}
        className="greengrass3"
        data-speed="180"
        alt="greengrassImage"
      />

      <img
        src={mashroom1}
        className="mashroom1"
        data-speed="200"
        alt="mashrromImage"
      />
      <img
        src={mashroom2}
        className="mashroom2"
        data-speed="210"
        alt="mashrromImage"
      />
      <img
        src={mashroom3}
        className="mashroom3"
        data-speed="220"
        alt="mashrromImage"
      />
    </div>
  );
}
