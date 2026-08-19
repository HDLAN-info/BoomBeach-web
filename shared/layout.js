class BoomBeachSiteShell extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;

    const root = this.attachShadow({ mode: "open" });
    const currentPath = window.location.pathname.toLowerCase();
    const activeRoute = currentPath.split("/").filter(Boolean)[0] || "aktuality";
    const menu = [
      ["AKTUALITY", "/index.html#content", "aktuality"],
      ["REKORDY", "/rekordy/index.html", "rekordy"],
      ["VIDEA Z OP", "/videa/index.html", "videa"],
      ["YOUTUBE VIDEA", "/youtube-videa/index.html", "youtube-videa"],
      ["JEDNOTKY", "/jednotky/index.html", "jednotky"],
      ["BUDOVY", "/budovy/index.html", "budovy"],
      ["TIPY", "/tipy/index.html", "tipy"],
      ["UPGRADE", "/strategie/index.html", "strategie"],
    ];

    root.innerHTML = `
      <style>
        @font-face {
          font-family: "BroshK";
          src: url("/shared/BroshK.ttf") format("truetype");
          font-display: swap;
        }

        :host {
          display: block;
          position: static !important;
          inset: auto !important;
          width: 100%;
          color: white;
          background: #4187a9;
          font-family: Arial, Helvetica, sans-serif;
        }

        * { box-sizing: border-box; }

        .shell {
          width: min(100%, 1366px);
          margin: 0 auto;
          overflow: hidden;
          background: #4187a9;
        }

        .topbar {
          min-height: 93px;
          padding: 6px 22px;
          display: grid;
          grid-template-columns: 92px 175px 92px minmax(260px, 1fr) minmax(260px, 1fr);
          gap: 12px;
          align-items: center;
          background:
            linear-gradient(rgba(65, 135, 169, .88), rgba(65, 135, 169, .88)),
            url("/_assets/media/2e21313f54411db15427afa28163cc37.png") center / 420px repeat;
        }

        .brand-link {
          height: 80px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          overflow: hidden;
          transition: transform .18s ease, filter .18s ease;
        }

        .brand-link:hover,
        .brand-link:focus-visible,
        .menu-link:hover,
        .menu-link:focus-visible {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .brand-link:focus-visible,
        .menu-link:focus-visible {
          outline: 3px solid #ffd342;
          outline-offset: 2px;
        }

        .brand-link img {
          display: block;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .supercell { background: #000; border-radius: 0; }
        .youtube { background: #17384a; padding: 8px; }
        .session { background: #17384a; padding: 5px; }
        .team { height: 70px; background: #f3e7be; }
        .team img { width: 100%; object-fit: fill; }

        .island-nav {
          position: relative;
          aspect-ratio: 1366 / 748;
          background: url("/_assets/media/c9cde6ce25413fea0c702baa76c6f7af.png") center / cover no-repeat;
          isolation: isolate;
        }

        .menu-grid {
          position: absolute;
          z-index: 2;
          left: 6%;
          top: 13%;
          width: 58%;
          height: 73%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: repeat(4, 1fr);
          gap: 6%;
        }

        .menu-link {
          display: grid;
          place-items: center;
          padding: .35em .6em;
          color: white;
          text-decoration: none;
          text-align: center;
          font: 400 clamp(19px, 3vw, 45px) / .95 "BroshK", Impact, sans-serif;
          text-shadow: 3px 4px 0 #000;
          background: rgba(0, 0, 0, .72);
          border: 1px solid rgba(255, 255, 255, .05);
          clip-path: polygon(4% 5%, 95% 0, 100% 88%, 92% 96%, 7% 100%, 0 88%, 1% 13%);
          transition: transform .18s ease, filter .18s ease, background .18s ease;
        }

        .menu-link[aria-current="page"] {
          color: #ffe45c;
          background: rgba(8, 30, 42, .86);
        }

        .construction {
          position: absolute;
          z-index: 2;
          top: 26%;
          right: 10%;
          width: 17%;
          min-width: 145px;
          padding: 1.15em .7em;
          color: #172631;
          text-align: center;
          font: 900 clamp(13px, 1.8vw, 25px) / 1.05 Impact, sans-serif;
          background: #e7af15;
          border: 9px solid transparent;
          border-image: repeating-linear-gradient(135deg, #111 0 14px, #e7af15 14px 28px) 9;
          transform: rotate(-1deg);
          box-shadow: 0 5px 10px rgba(0, 0, 0, .45);
        }

        @media (max-width: 900px) {
          .topbar {
            grid-template-columns: 64px 120px 64px 1fr 1fr;
            min-height: 72px;
            padding: 5px 10px;
            gap: 7px;
          }
          .brand-link { height: 62px; }
          .team { height: 52px; }
          .menu-grid { left: 4%; width: 64%; gap: 4%; }
          .construction { right: 5%; }
        }

        @media (max-width: 620px) {
          .topbar {
            grid-template-columns: repeat(3, 1fr);
          }
          .team { grid-column: span 3; height: 48px; }
          .island-nav { min-height: 410px; background-position: 43% center; }
          .menu-grid { left: 3%; top: 8%; width: 70%; height: 84%; gap: 3%; }
          .menu-link { font-size: clamp(15px, 5vw, 25px); }
          .construction { display: none; }
        }
      </style>

      <div class="shell">
        <nav class="topbar" aria-label="Hlavní odkazy">
          <a class="brand-link supercell" href="https://supercell.com/en/games/boombeach/" target="_blank" rel="noopener" aria-label="Boom Beach na webu Supercell">
            <img src="/_assets/media/3513ea64ade4772a9fd7f254f9361754.png" alt="Supercell">
          </a>
          <a class="brand-link youtube" href="https://www.youtube.com/@czechelite/playlists" target="_blank" rel="noopener" aria-label="YouTube kanál">
            <img src="/_assets/media/9b1329ac5522c9533fc85bec03027c21.svg" alt="YouTube">
          </a>
          <a class="brand-link session" href="/session/index.html" aria-label="Session komunita">
            <img src="/_assets/media/9fae08e6062ad5dcb5351be9d10debfe.png" alt="Session">
          </a>
          <a class="brand-link team" href="/team-czech/index.html" aria-label="Tým CZECH">
            <img src="/_assets/media/f5e472347e54892b32bb8f09cb30d90e.png" alt="CZECH #PV9LJUQ2">
          </a>
          <a class="brand-link team" href="/team-czech-elite/index.html" aria-label="Tým CZECH ELITE">
            <img src="/_assets/media/3e3f99dd77547cba99100650c104bdb7.jpg" alt="CZECH ELITE #U0RLR">
          </a>
        </nav>

        <nav class="island-nav" aria-label="Obsah webu">
          <div class="menu-grid">
            ${menu.map(([label, href, route]) => `
              <a class="menu-link" href="${href}" ${activeRoute === route ? 'aria-current="page"' : ""}>${label}</a>
            `).join("")}
          </div>
          <div class="construction" aria-label="Připravujeme další obsah">UNDER<br>CONSTRUCTION</div>
        </nav>
      </div>
    `;
  }
}

customElements.define("boom-beach-shell", BoomBeachSiteShell);

const mountShell = () => {
  const canvaRoot = document.getElementById("root");
  if (!canvaRoot) return;
  if (!document.querySelector("boom-beach-shell")) {
    const shell = document.createElement("boom-beach-shell");
    const contentAnchor = document.createElement("span");
    contentAnchor.id = "content";
    canvaRoot.before(shell, contentAnchor);

    const pageFlowStyle = document.createElement("style");
    pageFlowStyle.textContent = `
      html, body {
        height: auto !important;
        min-height: 100% !important;
        overflow-y: auto !important;
      }
      boom-beach-shell {
        position: static !important;
        inset: auto !important;
      }
      #root {
        margin-top: -841px !important;
        clip-path: inset(841px 0 0 0);
      }
    `;
    document.head.append(pageFlowStyle);

  }
};
mountShell();
