export default function HamburgerMenu({ setTheme, setScreen }) {
  const themes = ["forest", "ocean", "desert","kitchen"];

  return (
    <div className="menu">
      {themes.map((t) => (
        <div key={t} style={{ marginBottom: 16 }}>
          
          <h3 style={{ textTransform: "capitalize" }}>{t}</h3>

          {/*THEME PREVIEW */}
          <button
            onClick={() => {
              setTheme(t);
              setScreen("preview");
            }}
          >
            Theme
          </button>

          {/* DIRECT PLAY */}
          <button
            onClick={() => {
              setTheme(t);
              setScreen("game");
            }}
            style={{ marginLeft: 8 }}
          >
            Play
          </button>

        </div>
      ))}
    </div>
  );
}