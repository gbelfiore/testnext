class StringManipulatorClass {
  private static _instance: StringManipulatorClass;

  public static get instance(): StringManipulatorClass {
    if (!this._instance) this._instance = new StringManipulatorClass();
    return this._instance;
  }

  public capitalizeFirstLetter(string: string, trim?: boolean): string {
    string = string || "";
    if (trim) {
      string = string.trim();
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public capitalize(string: string, trim?: boolean): string {
    if (trim) {
      string = string.trim();
    }
    return string?.replace(/\w\S*/g, (w) =>
      w.replace(/^\w/, (c) => c.toUpperCase()),
    );
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }

  public replaceAll(str?: string, find: string = "", replace: string = "") {
    str = str || "";
    return str.replace(new RegExp(this.escapeRegExp(find), "g"), replace);
  }

  public getFileNameFromUrl(url: string): string {
    if (url) {
      const urlLastPart = url.split("/").pop();
      if (urlLastPart) {
        return urlLastPart.split("#")[0]?.split("?")[0] ?? "";
      }
    }
    return (
      url
        ?.substring(url.lastIndexOf("/") + 1)
        ?.split("#")[0]
        ?.split("?")[0] ?? ""
    );
  }
}

const StringManipulator = StringManipulatorClass.instance;

export { StringManipulator };
