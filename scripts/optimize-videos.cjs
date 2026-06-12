const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const ffmpegPath = require("ffmpeg-static");

const portfolioDir = path.join(__dirname, "..", "public", "portfolio");
const portraitVideos = new Set([
  "match-cut.mp4",
  "podkast-vizualizatsiya.mp4",
  "stim-rils.mp4",
]);

const presetByOrientation = {
  portrait: {
    width: 720,
    crf: 30,
    maxrate: "1800k",
    bufsize: "3600k",
  },
  landscape: {
    width: 960,
    crf: 29,
    maxrate: "2200k",
    bufsize: "4400k",
  },
};

function formatMegabytes(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function buildScaleFilter(width) {
  return `scale='min(${width},iw)':-2:flags=lanczos`;
}

function optimizeVideo(filename) {
  const inputPath = path.join(portfolioDir, filename);
  const tempPath = path.join(portfolioDir, `${path.parse(filename).name}.optimized.mp4`);
  const beforeSize = fs.statSync(inputPath).size;
  const orientation = portraitVideos.has(filename) ? "portrait" : "landscape";
  const preset = presetByOrientation[orientation];

  const args = [
    "-y",
    "-i",
    inputPath,
    "-map_metadata",
    "-1",
    "-movflags",
    "+faststart",
    "-pix_fmt",
    "yuv420p",
    "-vf",
    buildScaleFilter(preset.width),
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-profile:v",
    "high",
    "-level",
    "4.1",
    "-crf",
    String(preset.crf),
    "-maxrate",
    preset.maxrate,
    "-bufsize",
    preset.bufsize,
    "-c:a",
    "aac",
    "-b:a",
    "96k",
    "-ac",
    "2",
    tempPath,
  ];

  const result = spawnSync(ffmpegPath, args, { stdio: "pipe" });

  if (result.status !== 0) {
    throw new Error(`ffmpeg failed for ${filename}\n${result.stderr?.toString() ?? ""}`);
  }

  const afterSize = fs.statSync(tempPath).size;

  if (afterSize >= beforeSize) {
    fs.rmSync(tempPath, { force: true });
    return {
      filename,
      orientation,
      beforeSize,
      afterSize: beforeSize,
      changed: false,
    };
  }

  fs.renameSync(tempPath, inputPath);
  return {
    filename,
    orientation,
    beforeSize,
    afterSize,
    changed: true,
  };
}

function main() {
  const files = fs
    .readdirSync(portfolioDir)
    .filter((filename) => filename.endsWith(".mp4"))
    .sort();

  const results = files.map(optimizeVideo);
  const totalBefore = results.reduce((sum, item) => sum + item.beforeSize, 0);
  const totalAfter = results.reduce((sum, item) => sum + item.afterSize, 0);

  for (const item of results) {
    const marker = item.changed ? "optimized" : "kept";
    console.log(
      `${marker.padEnd(9)} ${item.filename} (${item.orientation}) ${formatMegabytes(item.beforeSize)} -> ${formatMegabytes(item.afterSize)}`,
    );
  }

  console.log("");
  console.log(`Total: ${formatMegabytes(totalBefore)} -> ${formatMegabytes(totalAfter)}`);
}

main();
