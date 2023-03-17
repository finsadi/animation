const canvas = document.getElementById('stockAnimation');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const screenSizeFactor = Math.min(canvas.width, canvas.height) / 1080;
const iconSize = 100 * screenSizeFactor;
const speedFactor = screenSizeFactor;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const ellipseParams = [
    {
        width: Math.min(canvas.width * 0.9, 1105.13 * screenSizeFactor),
        height: Math.min(canvas.height * 0.9, 507.96 * screenSizeFactor),
        rotation: -2.35 * (Math.PI / 180)
    },
    {
        width: Math.min(canvas.width * 0.9, 1090 * screenSizeFactor),
        height: Math.min(canvas.height * 0.9, 641 * screenSizeFactor),
        rotation: 15.45 * (Math.PI / 180)
    }
];

const iconsSrc = [
    [
        'https://static.wixstatic.com/media/7f220a_0509f35f325b46e98bad1a96a603399b~mv2.png',
        'https://static.wixstatic.com/media/7f220a_c8ef01789e914a97a3c05b449afa7d0c~mv2.png',
        'https://static.wixstatic.com/media/7f220a_8b64d76032f04718ae00b1715aaaa2ef~mv2.png',
    ],
    [
        'https://static.wixstatic.com/media/7f220a_b0b0cd00f4e243a589dc6fe0d51d0fef~mv2.png',
        'https://static.wixstatic.com/media/7f220a_56412b2e91ef44cc82d94473316c339a~mv2.png',
        'https://static.wixstatic.com/media/7f220a_3887544aea9e47f2992b599f04600b55~mv2.png',
    ]
];

class StockIcon {
    constructor(angle, ellipseIndex, iconIndex) {
        this.image = new Image();
        this.image.src = iconsSrc[ellipseIndex][iconIndex];
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
for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
        const angle = (j / 3) * (2 * Math.PI);
        stockIcons.push(new StockIcon(angle, i, j));
    }
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

    ellipseParams[0].width = Math.min(canvas.width * 0.9, 1105.13 * screenSizeFactor);
    ellipseParams[0].height = Math.min(canvas.height * 0.9, 507.96 * screenSizeFactor);

    ellipseParams[1].width = Math.min(canvas.width * 0.9, 1090 * screenSizeFactor);
    ellipseParams[1].height = Math.min(canvas.height * 0.9, 641 * screenSizeFactor);

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
});
