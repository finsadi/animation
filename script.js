const canvas = document.getElementById('animation');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numIcons = 50;
const iconSize = 50;

const iconsSrc = [
    'https://www.logo.wine/a/logo/Tesla%2C_Inc./Tesla%2C_Inc.-Logo.wine.svg',
    'https://www.logo.wine/a/logo/Apple_Inc./Apple_Inc.-Logo.wine.svg',
    'https://www.logo.wine/a/logo/Microsoft/Microsoft-Logo.wine.svg',
    'https://www.logo.wine/a/logo/Amazon_(company)/Amazon_(company)-Logo.wine.svg',
    'https://www.logo.wine/a/logo/Meta_Platforms/Meta_Platforms-Logo.wine.svg'
];

class StockIcon {
    constructor() {
        this.image = new Image();
        this.image.src = iconsSrc[Math.floor(Math.random() * iconsSrc.length)];
        this.width = iconSize;
        this.height = iconSize;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.speedX = (Math.random() * 2 - 1) * 2;
        this.speedY = (Math.random() * 2 - 1) * 2;
    }

    draw() {
        ctx.save();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x + this.width > canvas.width) {
            this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y + this.height > canvas.height) {
            this.speedY = -this.speedY;
        }
    }
}

const stockIcons = [];

for (let i = 0; i < numIcons; i++) {
    stockIcons.push(new StockIcon());
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const stockIcon of stockIcons) {
        stockIcon.draw();
        stockIcon.update();
    }

    requestAnimationFrame(animate);
}

animate();
