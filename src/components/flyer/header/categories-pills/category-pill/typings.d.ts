import { ISectionOpt } from "~/typings/schemaopt";

interface CategoryPillProps {
  id: ISectionOpt["id"];
  name: ISectionOpt["name"];
  openSection: (id: ISectionOpt["id"]) => void;
  navKey?: string;
}

export { CategoryPillProps };
