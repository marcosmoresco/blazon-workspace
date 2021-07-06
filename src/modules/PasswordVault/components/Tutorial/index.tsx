import React, { FC } from "react";
import Tutorial from "@components/Tutorial";
import type { TutorialProps } from "./types";

const PasswordVaultTutorial: FC<TutorialProps> = () => {
  return (
    <Tutorial
      title="passwordVault.tutorial.title"
      text="passwordVault.tutorial.text"
    />
  );
};

export default PasswordVaultTutorial;
