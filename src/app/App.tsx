import { useEffect, useState } from "react";
import { RegistrationAvatarField } from "../pages/registration/registration-avatar";
import { ProfileAvatar } from "../pages/profile/personal-data/avatar";

function App() {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (avatarUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarUrl]);

  const handleAvatarChange = (file: File | null) => {
    if (!file) {
      if (avatarUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarUrl);
      }
      setAvatarUrl(undefined);
      return;
    }

    if (avatarUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(avatarUrl);
    }

    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  return (
    <div style={{ padding: "40px", display: "flex", gap: "40px" }}>
      <div>
        <h2>Маленькая аватарка (регистрация)</h2>
        <RegistrationAvatarField
          avatarUrl={avatarUrl}
          onAvatarChange={handleAvatarChange}
        />
      </div>

      <div>
        <h2>Большая аватарка (профиль)</h2>
        <ProfileAvatar
          avatarUrl={avatarUrl}
          onAvatarChange={handleAvatarChange}
        />
      </div>
    </div>
  );
}

export default App;
