const fileInput = document.getElementById("fileUpload");
const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
    };
});

function pixelate(scale) {
    if (canvas.width === 0 || canvas.height === 0) return;
    const w = canvas.width;
    const h = canvas.height;

    const tempCanvas = document.createElement('canvas');
    const tctx = tempCanvas.getContext('2d');

    tempCanvas.width = w * scale;
    tempCanvas.height = h * scale;

    tctx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);

    ctx.imageSmoothingEnabled = false;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, w, h);
}

const pixelSlider = document.getElementById("pixelSlider");

pixelSlider.addEventListener("input", () => {
    const scale = pixelSlider.value / 50; 
    pixelate(scale);
});


const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "pixelated.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
