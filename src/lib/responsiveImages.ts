import imageWidths from "../data/imageWidths.json";
// Vite resolves these URLs at build time; importing URLs does not fetch images.
const sources = import.meta.glob<string>("../assets/**/*.webp", { eager: true, query: "?url", import: "default" });
const smallSources = new Map<string, { src: string; width: number; smallWidth: number }>();
for (const [file, url] of Object.entries(sources)) {
  const small = sources[file.replace(/\.webp$/, "-480.webp")];
  if (small) smallSources.set(url, { src: small, width: imageWidths[file as keyof typeof imageWidths], smallWidth: imageWidths[file.replace(/\.webp$/, "-480.webp") as keyof typeof imageWidths] });
}
smallSources.set("/images/church-building.webp", { src: "/images/church-building-480.webp", width: 960, smallWidth: 480 });

/** Keep remote API photos intact; serve responsive variants of local photos. */
export function responsiveImage(src: string, sizes = "(max-width: 640px) 45vw, 25vw") {
  const small = smallSources.get(src);
  return { src, ...(small ? { srcSet: small.src + " " + small.smallWidth + "w, " + src + " " + small.width + "w", sizes } : {}) };
}
