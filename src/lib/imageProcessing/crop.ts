export const CROP_RATIOS: Record<string, [number, number] | null> = {
	original: null,
	'1:1': [1, 1],
	'2:3': [2, 3],
	'3:2': [3, 2],
	'4:5': [4, 5],
	'5:4': [5, 4],
	'4:3': [4, 3],
	'3:4': [3, 4],
	'16:9': [16, 9],
	'9:16': [9, 16]
};

export function computeCropRect(
	imgW: number,
	imgH: number,
	ratioKey: string,
	centerX: number,
	centerY: number
): { x: number; y: number; w: number; h: number } {
	const ratio = CROP_RATIOS[ratioKey];
	let w: number, h: number;
	if (!ratio) {
		w = imgW;
		h = imgH;
	} else {
		const [rw, rh] = ratio;
		// Largest rect of this ratio that fits in the image
		if (imgW / rw <= imgH / rh) {
			w = imgW;
			h = Math.round((imgW * rh) / rw);
		} else {
			h = imgH;
			w = Math.round((imgH * rw) / rh);
		}
	}
	// Center at given point, then clamp
	let x = Math.round(centerX - w / 2);
	let y = Math.round(centerY - h / 2);
	x = Math.max(0, Math.min(imgW - w, x));
	y = Math.max(0, Math.min(imgH - h, y));
	return { x, y, w, h };
}

export function drawCropOverlay(
	ctx: CanvasRenderingContext2D,
	cropX: number,
	cropY: number,
	cropW: number,
	cropH: number
): void {
	const cw = ctx.canvas.width;
	const ch = ctx.canvas.height;
	ctx.save();
	ctx.fillStyle = 'rgba(0,0,0,0.55)';
	// Top
	ctx.fillRect(0, 0, cw, cropY);
	// Bottom
	ctx.fillRect(0, cropY + cropH, cw, ch - cropY - cropH);
	// Left strip
	ctx.fillRect(0, cropY, cropX, cropH);
	// Right strip
	ctx.fillRect(cropX + cropW, cropY, cw - cropX - cropW, cropH);
	// Border
	ctx.strokeStyle = 'rgba(255,255,255,0.9)';
	ctx.lineWidth = 1.5;
	ctx.strokeRect(cropX, cropY, cropW, cropH);
	ctx.restore();
}
