export const hexToRgbA = (hex: string, opacity = 1) => {
  let c: string[] = [];
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    const res: any = "0x" + c.join("");
    return (
      "rgba(" +
      // tslint:disable-next-line:no-bitwise
      [(res >> 16) & 255, (res >> 8) & 255, res & 255].join(",") +
      ", " +
      opacity +
      ")"
    );
  }
  return "rgb(255,255,255)";
};
