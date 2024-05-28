import { ISectionOpt } from "~/typings/schemaopt";

interface MainHeaderProps {
  openSection: (id: ISectionOpt["id"]) => void;
}

export { MainHeaderProps };
