export function getContrastColor(hex: string) {
    const r = Number.parseInt(hex.substring(1, 3), 16);
    const g = Number.parseInt(hex.substring(3, 5), 16);
    const b = Number.parseInt(hex.substring(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "#000000" : "#FFFFFF";
}