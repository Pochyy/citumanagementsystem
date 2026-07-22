// Draws a certificate onto an off-screen canvas and returns a PNG data URL.
// Keeping this framework-free (plain Canvas API) means no extra npm installs.

function wrapLines(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  });
  if (current) lines.push(current);
  return lines;
}

export function generateCertificateDataUrl({
  internName,
  hours,
  period,
  signatoryName,
  signatoryPosition,
  orgName = "TECHCORP INC.",
}) {
  const canvas = document.createElement("canvas");
  canvas.width = 1400;
  canvas.height = 990;
  const ctx = canvas.getContext("2d");

  const maroon = "#7a2331";
  const ink = "#14151a";
  const inkSoft = "#4b5261";
  const inkFaint = "#9aa0aa";

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = maroon;
  ctx.lineWidth = 10;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  ctx.strokeStyle = "#c9ccd2";
  ctx.lineWidth = 2;
  ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110);

  ctx.textAlign = "center";

  ctx.fillStyle = inkFaint;
  ctx.font = "700 24px Arial";
  ctx.fillText(orgName, canvas.width / 2, 170);

  
  ctx.fillStyle = ink;
  ctx.font = "700 46px Georgia";
  ctx.fillText("Certificate of Internship Completion", canvas.width / 2, 250);

  ctx.strokeStyle = maroon;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 90, 285);
  ctx.lineTo(canvas.width / 2 + 90, 285);
  ctx.stroke();

  const bodyText = `This certifies that ${internName} has successfully completed ${hours} hours of internship at ${orgName} from ${period}.`;
  ctx.fillStyle = inkSoft;
  ctx.font = "24px Arial";
  const lines = wrapLines(ctx, bodyText, canvas.width - 300);
  let y = 400;
  lines.forEach((line) => {
    ctx.fillText(line, canvas.width / 2, y);
    y += 40;
  });

  const sigY = canvas.height - 220;
  ctx.strokeStyle = inkFaint;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 140, sigY);
  ctx.lineTo(canvas.width / 2 + 140, sigY);
  ctx.stroke();

  ctx.fillStyle = ink;
  ctx.font = "700 26px Arial";
  ctx.fillText(signatoryName, canvas.width / 2, sigY + 40);

  ctx.fillStyle = inkFaint;
  ctx.font = "20px Arial";
  ctx.fillText(signatoryPosition, canvas.width / 2, sigY + 70);

  return canvas.toDataURL("image/png");
}

export function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
