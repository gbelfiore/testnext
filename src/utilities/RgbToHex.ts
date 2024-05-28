const RGBToHex = (rgb?: string): string | null => {
	if (!rgb) return null;
	// Choose correct separator
	const sep = rgb.indexOf(',') > -1 ? ',' : ' ';
	// Turn "rgb(r,g,b)" into [r,g,b]
	const rgbSplit = rgb.replace('rgb(', '').replace('rgba(', '').split(')')[0]?.split(sep);

	let r = rgbSplit?.[0] ? (+rgbSplit[0]).toString(16) : "",
		g = rgbSplit?.[1] ? (+rgbSplit[1]).toString(16) : "",
		b = rgbSplit?.[2] ? (+rgbSplit[2]).toString(16) : "";

	if (r.length === 1) r = '0' + r;
	if (g.length === 1) g = '0' + g;
	if (b.length === 1) b = '0' + b;

	return '%23' + r + g + b;
};

const ColorToSvgFill = (color?: string): string | null => {
	if (!color) return null;
	if (color.includes('rgb(') || color.includes('rgba(')) return RGBToHex(color);
	if (color.includes('#')) return color.replace('#', '%23');
	return color;
};

export { RGBToHex, ColorToSvgFill };
