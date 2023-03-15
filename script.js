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

const iconSize = 75;
const numIcons = 50;

class StockIcon {
    constructor() {
        this.image = new Image();
        this.image.src = iconsSrc[Math.floor(Math.random() * iconsSrc.length)];
        this.size = iconSize;
        this.x = Math.random() * (canvas.width - this.size);
        this.y = Math.random() * (canvas.height - this.size);
        this.speedX = (Math.random() * 2 - 1) * 2;
        this.speedY = (Math.random() * 2 - 1) * 2;
    }

    draw() {
        ctx.save();
        ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        ctx.restore();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x + this.size > canvas.width) {
            this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y + this.size > canvas.height) {
            this.speedY = -this.speedY;
        }
    }
}

const stockIcons = [];
for (let i = 0; i < numIcons; i++) {
    stockIcons.push(new StockIcon());
}

function animate() {
    // Create radial gradient
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
    );

    gradient.addColorStop(0, '#00E091');
    gradient.addColorStop(1, 'black');

    // Set the gradient as the background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw and update the stock icons
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
