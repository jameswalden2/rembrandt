export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
	const rn = r / 255;
	const gn = g / 255;
	const bn = b / 255;
	const max = Math.max(rn, gn, bn);
	const min = Math.min(rn, gn, bn);
	const l = (max + min) / 2;
	if (max === min) return { h: 0, s: 0, l };
	const d = max - min;
	const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	let h: number;
	if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
	else if (max === gn) h = ((bn - rn) / d + 2) / 6;
	else h = ((rn - gn) / d + 4) / 6;
	return { h: h * 360, s, l };
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
	if (s === 0) {
		const v = Math.round(l * 255);
		return { r: v, g: v, b: v };
	}
	const hue2rgb = (p: number, q: number, t: number) => {
		let tn = t;
		if (tn < 0) tn += 1;
		if (tn > 1) tn -= 1;
		if (tn < 1 / 6) return p + (q - p) * 6 * tn;
		if (tn < 1 / 2) return q;
		if (tn < 2 / 3) return p + (q - p) * (2 / 3 - tn) * 6;
		return p;
	};
	const hn = h / 360;
	const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;
	return {
		r: Math.round(hue2rgb(p, q, hn + 1 / 3) * 255),
		g: Math.round(hue2rgb(p, q, hn) * 255),
		b: Math.round(hue2rgb(p, q, hn - 1 / 3) * 255)
	};
}

export function rgbToHex(r: number, g: number, b: number): string {
	return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

export function getCanvasPos(e: MouseEvent, canvas: HTMLCanvasElement): { x: number; y: number } {
	const rect = canvas.getBoundingClientRect();
	const scaleX = canvas.width / rect.width;
	const scaleY = canvas.height / rect.height;
	return {
		x: (e.clientX - rect.left) * scaleX,
		y: (e.clientY - rect.top) * scaleY
	};
}

export function downloadImage(canvas: HTMLCanvasElement, filename = 'painting'): void {
	const link = document.createElement('a');
	link.download = `${filename}.png`;
	link.href = canvas.toDataURL('image/png');
	link.click();
}

export function rotateHue(r: number, g: number, b: number, degrees: number) {
	const { h, s, l } = rgbToHsl(r, g, b);
	const newH = (((h + degrees) % 360) + 360) % 360;
	const { r: nr, g: ng, b: nb } = hslToRgb(newH, s, l);
	return { r: nr, g: ng, b: nb, hex: rgbToHex(nr, ng, nb) };
}

export function shiftHSL(
	r: number,
	g: number,
	b: number,
	targetHue: number,
	hueStrength: number,
	lightnessShift: number,
	saturationShift: number
): { r: number; g: number; b: number; hex: string } {
	const hsl = rgbToHsl(r, g, b);
	let hueDiff = targetHue - hsl.h;
	if (hueDiff > 180) hueDiff -= 360;
	if (hueDiff < -180) hueDiff += 360;
	const newH = (hsl.h + hueStrength * hueDiff + 360) % 360;
	const newL = Math.max(0, Math.min(1, hsl.l + lightnessShift));
	const newS = Math.max(0, Math.min(1, hsl.s + saturationShift));
	const { r: nr, g: ng, b: nb } = hslToRgb(newH, newS, newL);
	return { r: nr, g: ng, b: nb, hex: rgbToHex(nr, ng, nb) };
}
