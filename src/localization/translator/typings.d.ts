import { TOptions, StringMap } from "i18next";
import { Tkeys } from "~/localization/languages/enum";

interface TranslatorProps {
  tKey: Tkeys;
  capitalizeFirst?: boolean;
  capitalizeAll?: boolean;
  options?: TOptions<StringMap>;
}

export { TranslatorProps };
