import { useEffect, useRef, useState } from "react";
import "../styles/forestarea.css";

const LETTERS = ["F", "O", "R", "E", "S", "T", "A", "N"];

const WORDS = [
  "FOREST",
  "STONE",
  "STAR",
  "TONE",
  "NEAR",
  "EARN",
  "NOTE",
  "TEAR",
  "SORE",
  "ROSE",
  "EAST",
  "SEAT",
  "RATE",
  "TARE",
  "TEN",
  "STORE",
  "ANT",
  "ROAST",
  "FARE",
  "FAT",
  "FEAR",
  "FONT",
  "FORT",
  "FAN",
  "TAN",
  "REST",
  "NET",
  "NEST",
];

const RADIUS = 120;

export default function ForestArea({ onBack }) {
  const wheelRef = useRef(null);

  const [selected, setSelected] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [pathPoints, setPathPoints] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const stop = () => setIsDragging(false);
    window.addEventListener("pointerup", stop);
    return () => window.removeEventListener("pointerup", stop);
  }, []);

  useEffect(() => {
  const saved = localStorage.getItem("forest_found_words");

  if (saved) {
    setFoundWords(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "forest_found_words",
    JSON.stringify(foundWords)
  );
}, [foundWords]);

  const triggerShake = () => {
    if (foundWords.length === 0) return;

    setIsShaking(true);

    setTimeout(() => {
      setIsShaking(false);
    }, 3000);
  };

  const getLetterPos = (index, total) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    return {
      x: Math.cos(angle) * RADIUS,
      y: Math.sin(angle) * RADIUS,
    };
  };

  const addPointFromButton = (btn) => {
    if (!wheelRef.current) return;

    const btnRect = btn.getBoundingClientRect();
    const wheelRect = wheelRef.current.getBoundingClientRect();

    return {
      x: btnRect.left + btnRect.width / 2 - wheelRect.left,
      y: btnRect.top + btnRect.height / 2 - wheelRect.top,
    };
  };

  const handlePointerDown = (letter, e) => {
    setIsDragging(true);
    setSelected([letter]);

    const point = addPointFromButton(e.currentTarget);
    if (point) setPathPoints([point]);
  };

  const handlePointerEnter = (letter, e) => {
    if (!isDragging) return;

    setSelected((prev) => (prev.includes(letter) ? prev : [...prev, letter]));

    const point = addPointFromButton(e.currentTarget);
    if (point) setPathPoints((prev) => [...prev, point]);
  };

  const handlePointerUp = () => {
    if (selected.length) {
      const word = selected.join("");

      if (WORDS.includes(word)) {
        setFoundWords((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            word,
            count: prev.filter((w) => w.word === word).length + 1,
            left: Math.floor(Math.random() * 70) + 15,
            stackIndex: prev.length,
          },
        ]);
      }
    }

    setIsDragging(false);
    setSelected([]);
    setPathPoints([]);
  };

  return (
    <div className="gameUI">
      {/* Back Button */}
      <button
        className="back-btn-3d"
        onClick={onBack}
        style={{ position: "fixed", top: 20, left: 20, zIndex: 99999 }}
      >
        <i className="bi bi-arrow-left"></i>
      </button>

      {/* Shake Button */}
      <button className="shake-btn-glass" onClick={triggerShake}>
        <i className="bi bi-tree-fill"></i>
        <span>Shake Forest</span>
      </button>

      {/* Leaves Layer */}
      <div className="forest">
        {foundWords.map((w) => (
          <div
            key={w.id}
            className={`leaf 
              ${w.count > 1 ? "leaf-repeat" : "leaf-first"} 
              ${isShaking ? "shake-fall" : ""}`}
            // style={{
            //   left: `${w.left}%`,
            //   bottom: `${w.stackIndex * 52}px`,
            // }}
          >
            {w.word}
          </div>
        ))}
      </div>

      {/* Wheel */}
      <div ref={wheelRef} className="wheel3d" onPointerUp={handlePointerUp}>
        <svg
          width="100%"
          height="100%"
          className="drag-line"
          style={{ position: "absolute", inset: 0 }}
        >
          <polyline
            points={pathPoints.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="#22c55e"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {LETTERS.map((l, i) => {
          const pos = getLetterPos(i, LETTERS.length);

          return (
            <button
              key={i}
              className={`letter3d ${selected.includes(l) ? "active" : ""}`}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
              }}
              onPointerDown={(e) => handlePointerDown(l, e)}
              onPointerEnter={(e) => handlePointerEnter(l, e)}
            >
              {l}
            </button>
          );
        })}
      </div>
    </div>
  );
}
