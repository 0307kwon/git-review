import React, { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../../asset/icon/logo.svg";
import FloatingActionButton from "../@common/FloatingActionButton/FloatingActionButton";

interface Props {
  className?: string;
}

const PWAAddButton = ({ className }: Props) => {
  const [handleAddPWA, setHandleAddPWA] = useState<(() => void) | null>(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();

      setHandleAddPWA(() => () => {
        event.prompt();
      });
    });

    window.addEventListener("appinstalled", () => {
      setHandleAddPWA(null);
    });
  }, []);

  if (!handleAddPWA) {
    return null;
  }

  return (
    <FloatingActionButton
      onClick={handleAddPWA}
      className={className}
      size="5rem"
    >
      <Logo />
    </FloatingActionButton>
  );
};

export default PWAAddButton;
