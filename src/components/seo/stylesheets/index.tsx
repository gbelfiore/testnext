import { useMemo } from "react";
import { getStaticPath } from "~/hooks/use-static-path";
import { type ITplSchema, type ITplFont } from "~/typings/template";

interface IStylesheetsProps {
  template: ITplSchema | null;
  templateSections: ITplSchema[] | null;
  onlyPrelod?: boolean;
}

const Stylesheets = ({
  template,
  templateSections,
  onlyPrelod,
}: IStylesheetsProps) => {
  const fontSources = useMemo(() => {
    const sources: string[] = [];
    let otherSource: string[] = [];
    //fonts schema
    const fonts = template?.fonts;
    const fontsSource = getStaticPath(fonts?.source, template?.basePath);
    if (fontsSource) sources.push(fontsSource);

    otherSource =
      fonts?.families
        ?.map((family: ITplFont) =>
          getStaticPath(family.source, template?.basePath),
        )
        .filter(Boolean) ?? [];
    //fonts for sections

    templateSections?.forEach((template) => {
      const fonts = template?.fonts;
      const fontsSource = getStaticPath(fonts?.source, template.basePath);
      if (fontsSource) sources.push(fontsSource);

      otherSource = [
        ...otherSource,
        ...(fonts?.families
          ?.map((family: ITplFont) =>
            getStaticPath(family.source, template.basePath),
          )
          .filter(Boolean) ?? []),
      ];
    });
    return { sources, otherSource };
  }, [template, templateSections]);

  if (
    !fontSources ||
    fontSources.sources.length === 0 ||
    fontSources.otherSource.length === 0
  )
    return null;

  // return null;

  return (
    <>
      {onlyPrelod &&
        fontSources.otherSource.map((fontSource, idx) => {
          //--- only WOFF2 ---
          if (fontSource.includes(".woff2")) {
            return (
              <link
                key={`${fontSource}_${idx}`}
                // type="text/css"
                rel="preload"
                as="font"
                href={fontSource}
                crossOrigin="anonymous"
              />
            );
          }
        })}

      {!onlyPrelod &&
        fontSources.sources.map((source, idx) => {
          return (
            <link
              key={`${source}_${idx}`}
              type="text/css"
              rel="stylesheet"
              href={source}
            />
          );
        })}
    </>
  );
};

export { Stylesheets };
