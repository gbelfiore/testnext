import { ICollapsibleSectionContentOpt } from "~/typings/schemaopt";

interface ContentsProps {
  isOpen?: boolean;
  contents: ICollapsibleSectionContentOpt<any>[];
  title: ICollapsibleSectionContentOpt["title"];
}

export { ContentsProps };
