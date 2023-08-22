import themes from '../../public/ui-config/themes';

function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function setCSSVars(colors: object, node: any) {
  for (const key in colors) {
    if (Object.prototype.hasOwnProperty.call(colors, key)) {
      if (colors[key]) {
        node.style.setProperty(`--${key}`, colors[key]);
      }
      const rgbColors = hexToRgb(colors[key]);
      if (rgbColors) {
        const color = [rgbColors.r, rgbColors.g, rgbColors.b].join(', ');
        node.style.setProperty(`--${key}_rgb`, color);
      }
    }
  }
}

function connectThemes(element: any, currentTheme: string | null) {
	if (!currentTheme) {
		console.warn('current theme is null');
		return;
	}
	const theme = themes[currentTheme];
	if (!theme || typeof theme !== 'string') {
		console.warn(`theme isn't found`);
		return;
	}
	Object.keys(theme.colors).forEach((key) => {
		element.style.setProperty(`--${key}`, theme.colors[key]);
	});
}

export {
	connectThemes,
	hexToRgb,
	setCSSVars,
};