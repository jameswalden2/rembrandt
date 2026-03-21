import { describe, expect, it } from 'vitest';
import { hslToRgb } from '$lib/canvasUtils';
import { applyTemperatureMap } from './temperatureMap';
import { createMockCtx, getCapturedPixels, makePixels } from './testUtils';

describe('applyTemperatureMap', () => {
	it('maps red (hue 0°, warm) to warm orange output', () => {
		const ctx = createMockCtx(1, 1, makePixels([[255, 0, 0, 255]]));
		applyTemperatureMap(ctx);
		const out = getCapturedPixels(ctx);
		// rgbToHsl(255,0,0) = {h:0, s:1, l:0.5}; warm → outH=30, s=0.75, same l
		const { r: er, g: eg, b: eb } = hslToRgb(30, 0.75, 0.5);
		expect(out[0]).toBe(er);
		expect(out[1]).toBe(eg);
		expect(out[2]).toBe(eb);
	});

	it('maps blue (hue 240°, cool) to cool cyan output', () => {
		const ctx = createMockCtx(1, 1, makePixels([[0, 0, 255, 255]]));
		applyTemperatureMap(ctx);
		const out = getCapturedPixels(ctx);
		// rgbToHsl(0,0,255) = {h:240, s:1, l:0.5}; cool → outH=210, s=0.75
		const { r: er, g: eg, b: eb } = hslToRgb(210, 0.75, 0.5);
		expect(out[0]).toBe(er);
		expect(out[1]).toBe(eg);
		expect(out[2]).toBe(eb);
	});

	it('hue 120° (green) is classified as cool (not warm)', () => {
		// Pure green: rgbToHsl(0,255,0) → h=120; isWarm = (120 < 120 || 120 >= 300) = false → cool
		const ctx = createMockCtx(1, 1, makePixels([[0, 255, 0, 255]]));
		applyTemperatureMap(ctx);
		const out = getCapturedPixels(ctx);
		const { r: er, g: eg, b: eb } = hslToRgb(210, 0.75, 0.5);
		expect(out[0]).toBe(er);
		expect(out[1]).toBe(eg);
		expect(out[2]).toBe(eb);
	});

	it('hue 300° is classified as warm (>= 300)', () => {
		// [255,0,255] is magenta: hue=300; isWarm = (300 < 120 || 300 >= 300) = true → warm
		const ctx = createMockCtx(1, 1, makePixels([[255, 0, 255, 255]]));
		applyTemperatureMap(ctx);
		const out = getCapturedPixels(ctx);
		// l = 0.5 for magenta
		const { r: er, g: eg, b: eb } = hslToRgb(30, 0.75, 0.5);
		expect(out[0]).toBe(er);
		expect(out[1]).toBe(eg);
		expect(out[2]).toBe(eb);
	});

	it('output saturation is always 0.75 regardless of input saturation', () => {
		// Gray [128,128,128] has saturation 0 — should still get warm orange at s=0.75
		const ctx = createMockCtx(1, 1, makePixels([[128, 128, 128, 255]]));
		applyTemperatureMap(ctx);
		const out = getCapturedPixels(ctx);
		// gray hue=0 → warm, s forced to 0.75
		// If s were 0 the output would also be gray; check it's not gray
		const isGray = out[0] === out[1] && out[1] === out[2];
		expect(isGray).toBe(false);
	});

	it('preserves alpha channel', () => {
		const ctx = createMockCtx(1, 1, makePixels([[255, 0, 0, 180]]));
		applyTemperatureMap(ctx);
		const out = getCapturedPixels(ctx);
		expect(out[3]).toBe(180);
	});
});
