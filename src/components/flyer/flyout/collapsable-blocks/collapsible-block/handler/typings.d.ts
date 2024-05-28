import { Dispatch, SetStateAction } from "react";

import { ICollapsibleSectionOpt } from "~/typings/schemaopt";

interface HandlerProps {
  isOpen?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: ICollapsibleSectionOpt["title"];
}

export { HandlerProps };
