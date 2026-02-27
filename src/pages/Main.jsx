import { useState } from "react";
import "../styles/main.css"
import HamburgerMenu from "../components/HamburgerMenu";
import ForestArea from "../gamestheme/ForestArea";
import Forest from "../theme/Forest";
import Ocean from "../theme/ocean";

export default function MainPage() {
  const [theme, setTheme] = useState(null);
  const [screen, setScreen] = useState("home");

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {screen === "preview" && theme === "forest" && <Forest parallax />}
      {screen === "preview" && theme === "ocean" && <Ocean parallax />}

      {screen === "game" && theme === "forest" && (
        <>
          <Forest parallax={false} />
          <ForestArea onBack={() => setScreen("home")}/>
        </>
      )}

      {screen === "game" && theme === "forest" && (
        <>
          <Ocean parallax={false} />
          {/* <ForestArea onBack={() => setScreen("home")}/> */}
        </>
      )}

      {screen === "home" && (
        <HamburgerMenu setTheme={setTheme} setScreen={setScreen} />
      )}

      {screen === "preview" && (
        <button className="back-btn-3d" onClick={() => setScreen("home")}>
          <i className="bi bi-arrow-left"></i>
        </button>
      )}
    </div>
  );
}
