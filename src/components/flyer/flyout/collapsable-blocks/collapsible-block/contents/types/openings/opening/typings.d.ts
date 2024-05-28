import { IOpeningOpt } from "~/typings/schemaopt";

interface OpeningProps extends IOpeningOpt {
  isLast: boolean;
  id: number;
}

export { OpeningProps };
