const canvas = document.getElementById('stockAnimation');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const screenSizeFactor = Math.min(canvas.width, canvas.height) / 1080;
const iconSize = 100 * screenSizeFactor;
const speedFactor = Math.min(canvas.width, canvas.height) / 1080;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const ellipseParams = [
    {
        width: Math.min(canvas.width * 0.9, 1310.73 * screenSizeFactor),
        height: Math.min(canvas.height * 0.9, 508.33 * screenSizeFactor),
        rotation: -2.35 * (Math.PI / 180)
    },
    {
        width: Math.min(canvas.width * 0.9, 1027.36 * screenSizeFactor),
        height: Math.min(canvas.height * 0.9, 593.42 * screenSizeFactor),
        rotation: 20.87 * (Math.PI / 180)
    }
];

const iconsSrc = [
    [
        'https://static.wixstatic.com/media/7f220a_3ec1f70b36734641953984743ccb710d~mv2.png',
        'https://static.wixstatic.com/media/7f220a_3d4d84a1636745f096385b4f284c9e3d~mv2.png',
        'https://static.wixstatic.com/media/7f220a_317d91e479ba485bb6e1e50e7996098b~mv2.png',
        'https://static.wixstatic.com/media/7f220a_8afc0acaae9249b48ac4e27b36d194ba~mv2.png',
        'https://static.wixstatic.com/media/7f220a_9971ac5495bf41918f210f570419a6fd~mv2.png',
    ],
    [
        'https://static.wixstatic.com/media/7f220a_2962da97a26246298035eebd212de50d~mv2.png',
        'https://static.wixstatic.com/media/7f220a_537b78cb090346d8b12a894acdb8c11e~mv2.png',
        'https://static.wixstatic.com/media/7f220a_77f9b530122e45ae8cd46e18c22964c2~mv2.png',
        'https://static.wixstatic.com/media/7f220a_340411b7fcba4c699a41de16366d934c~mv2.png',
        'https://static.wixstatic.com/media/7f220a_e423f4c9303b4c7087c6e1e84d64312d~mv2.png',
    ]
];


class StockIcon {
    constructor(angle, ellipseIndex, iconIndex) {
        this.image = new Image();
        this.image.src = iconsSrc[ellipseIndex][iconIndex];
        this.size = iconSize;
        this.angle = angle;
        this.speed = 0.02 * speedFactor;
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
    for (let j = 0; j < 5; j++) {
        const angle = (j / 5) * (2 * Math.PI);
        stockIcons.push(new StockIcon(angle, i, j));
    }
}


function drawEllipse(ellipse) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, ellipse.width / 2, ellipse.height / 2, ellipse.rotation, 0, 2 * Math.PI);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.filter = 'blur(1px)';
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    const speedFactor = Math.min(canvas.width, canvas.height) / 1080;
    stockIcons.forEach(stockIcon => {
        stockIcon.speed = 0.02 * speedFactor;
    });
});
