import { useState, useRef } from "react";
import { PopupMenu } from "../shared/ui/popup-menu";
import { SkillsMenu } from "../widgets/skills-menu";
import { NotificationsMenu } from "../widgets/notifications-menu";
import "./styles/index.css";
import "./styles/variables.css";
import "./styles/fonts.css";

function App() {
  const [isSkillsMenuOpen, setIsSkillsMenuOpen] = useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const skillsButtonRef = useRef<HTMLButtonElement>(null);
  const notificationsButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      style={{ padding: "48px", minHeight: "150vh", paddingBottom: "800px" }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingTop: "0",
        }}
      >
        <button
          ref={skillsButtonRef}
          onClick={() => setIsSkillsMenuOpen(!isSkillsMenuOpen)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
            backgroundColor: "var(--card-input-color)",
          }}
        >
          Все навыки
        </button>

        <button
          ref={notificationsButtonRef}
          onClick={() => setIsNotificationsMenuOpen(!isNotificationsMenuOpen)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
            backgroundColor: "var(--card-input-color)",
          }}
        >
          Уведомления
        </button>
      </div>

      <PopupMenu
        isOpen={isSkillsMenuOpen}
        onClose={() => setIsSkillsMenuOpen(false)}
        anchorRef={skillsButtonRef}
        position="bottom-left"
      >
        <SkillsMenu />
      </PopupMenu>

      <PopupMenu
        isOpen={isNotificationsMenuOpen}
        onClose={() => setIsNotificationsMenuOpen(false)}
        position="fixed-top-right"
      >
        <NotificationsMenu />
      </PopupMenu>
    </div>
  );
}

export default App;
