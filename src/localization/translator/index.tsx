import React, { memo } from "react";
import { useMemo } from "react";
import { TranslatorProps } from "~/localization/translator/typings";
import { Localization } from "~/localization/config";

const TranslatorComponent: React.FC<TranslatorProps> = ({
  tKey,
  capitalizeAll,
  capitalizeFirst,
  options,
}) => {
  const translation = useMemo(
    () => Localization.t({ tKey, capitalizeAll, capitalizeFirst, options }),
    [capitalizeAll, capitalizeFirst, tKey, options],
  );

  return <>{translation}</>;
};

export const Translator = memo(TranslatorComponent);
