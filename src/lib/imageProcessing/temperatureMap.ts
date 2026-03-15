import { rgbToHsl, hslToRgb } from '$lib/canvasUtils';

export function applyTemperatureMap(ctx: CanvasRenderingContext2D) {
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;
	const imageData = ctx.getImageData(0, 0, w, h);
	const data = imageData.data;

	for (let i = 0; i < data.length; i += 4) {
		const { h: hue, l } = rgbToHsl(data[i], data[i + 1], data[i + 2]);

		// Warm: hues 300–360 and 0–120; Cool: hues 120–300
		const isWarm = hue < 120 || hue >= 300;
		const outH = isWarm ? 30 : 210;
		const { r, g, b } = hslToRgb(outH, 0.75, l);

		data[i] = r;
		data[i + 1] = g;
		data[i + 2] = b;
	}

	ctx.putImageData(imageData, 0, 0);
}
