const canvas = document.getElementById('stockAnimation');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const iconsSrc = [
    'https://www.logo.wine/a/logo/Tesla%2C_Inc./Tesla%2C_Inc.-Logo.wine.svg',
    'https://www.logo.wine/a/logo/Apple_Inc./Apple_Inc.-Logo.wine.svg',
    'https://www.logo.wine/a/logo/Microsoft/Microsoft-Logo.wine.svg',
    'https://www.logo.wine/a/logo/Amazon_(company)/Amazon_(company)-Logo.wine.svg',
    'https://www.logo.wine/a/logo/Meta_Platforms/Meta_Platforms-Logo.wine.svg',
];

const screenSizeFactor = Math.min(canvas.width, canvas.height) / 1080;
const iconSize = 100 * screenSizeFactor;
const numIcons = 25;

const speedFactor = screenSizeFactor;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const ellipseParams = [
    {
        width: 1105.13 * screenSizeFactor,
        height: 507.96 * screenSizeFactor,
        rotation: -2.35 * (Math.PI / 180)
    },
    {
        width: 1090 * screenSizeFactor,
        height: 641 * screenSizeFactor,
        rotation: 15.45 * (Math.PI / 180)
    }
];

class StockIcon {
    constructor(angle, ellipseIndex) {
        this.image = new Image();
        this.image.src = iconsSrc[Math.floor(Math.random() * iconsSrc.length)];
        this.size = iconSize;
        this.angle = angle;
        this.speed = (Math.random() * 2 - 1) * 0.02 * speedFactor;
        this.ellipseIndex = ellipseIndex;
    }

    draw() {
        ctx.save();
        ctx.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        ctx.restore();
    }

    update() {
        this.angle += this.speed;

        const ellipse = ellipseParams[this.ellipseIndex];
        this.x = centerX + (ellipse.width / 2) * Math.cos(this.angle) * Math.cos(ellipse.rotation) - (ellipse.height / 2) * Math.sin(this.angle) * Math.sin(ellipse.rotation);
        this.y = centerY + (ellipse.width / 2) * Math.cos(this.angle) * Math.sin(ellipse.rotation) + (ellipse.height / 2) * Math.sin(this.angle) * Math.cos(ellipse.rotation);
    }
}

const stockIcons = [];
for (let i = 0; i < numIcons; i++) {
    const angle = (i / numIcons) * (2 * Math.PI);
    const ellipseIndex = i % 2;
    stockIcons.push(new StockIcon(angle, ellipseIndex));
}

function drawEllipse(ellipse) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, ellipse.width / 2, ellipse.height / 2, ellipse.rotation, 0, 2 * Math.PI);
    ctx.filter = 'blur(1px)';
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function animate() {
    const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.max(canvas.width, canvas.height)
    );

    gradient.addColorStop(0, '#00E091');
    gradient.addColorStop(1, 'black');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ellipseParams.forEach(ellipse => drawEllipse(ellipse));

    stockIcons.forEach(stockIcon => {
        stockIcon.update();
        stockIcon.draw();
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

