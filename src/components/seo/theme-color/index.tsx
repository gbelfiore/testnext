"use client";
import React, { memo } from "react";
import useTemplate from "~/hooks/use-template";
import { BrowserService } from "~/utilities/browser-service";

const ThemeColorComponent: React.FC = () => {
  const template = useTemplate();
  const bodyBackgroundColor = template?.cssVars?.bodyBackgroundColor;

  if (!bodyBackgroundColor || BrowserService.isBackoffice) return null;

  return <meta name="theme-color" content={bodyBackgroundColor} />;
};

const ThemeColor = memo(ThemeColorComponent);

export { ThemeColor };
