import type { ReactNode } from "react";
import { ISchemaState } from "~/state/schema/typings";
import { ISchemaOpt } from "~/typings/schemaopt";

interface PillProps {
  id?: ISectionOpt["id"];
  selected?: boolean;
  maxWidth?: number;
  children?: ReactNode;
  schema: any;
  navKey?: string;
  isFullPage?: boolean;
  onClick?: (evt: any) => void;
}

export { PillProps };
