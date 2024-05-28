"use client";
import React, { memo } from "react";
import { useTplStaticPath } from "~/hooks/use-static-path";
import useTemplate from "~/hooks/use-template";

import { BrowserService } from "~/utilities/browser-service";

const FaviconComponent: React.FC = () => {
  const template = useTemplate();
  const retailerInfo = template?.retailerInfo;
  const favicon = retailerInfo?.favicon;

  const faviconPath = useTplStaticPath(favicon);

  if (!favicon || BrowserService.isBackoffice) return null;

  return <link rel="icon" href={faviconPath} type="image/x-icon" />;
};

const Favicon = memo(FaviconComponent);

export { Favicon };
