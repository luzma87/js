//https://youtu.be/axve3EgJlYI?list=TLPQMDQwMjIwMjBFCqPdKJETtw&t=577
const canvas = document.querySelector('.canvas');
const generateButton = document.querySelector('.generate');

let curve1, curve2;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const drawTree = (startX, startY, len, angle, branchWidth, color1, color2) => {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    // ctx.shadowBlur = 15;
    // ctx.shadowColor = 'rgba(255, 255, 255, .5)';
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    // ctx.lineTo(0, -len);
    if (angle > 0) {
        ctx.bezierCurveTo(20, -len / 2, 10, -len / 2, 0, -len);
    } else {
        ctx.bezierCurveTo(20, -len / 2, -10, -len / 2, 0, -len);
    }
    ctx.stroke();

    if (len < 10) {
        ctx.beginPath();
        ctx.arc(0, -len, 10, 0, Math.PI / 2);
        ctx.fill()

        ctx.restore();
        return;
    }
    curve1 = (Math.random() * 10) + 10;
    curve2 = (Math.random() * 10) + 10;

    drawTree(0, -len, len * 0.75, angle + curve1, branchWidth * 0.6);
    drawTree(0, -len, len * 0.75, angle - curve2, branchWidth * 0.6);

    ctx.restore();
}
drawTree(canvas.width / 2, canvas.height - 50, 110, 0, 25, 'brown', 'lightpink');

const generateRandomTree = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerPointX = canvas.width / 2;
    const startY = canvas.height - 50;
    const len = Math.floor((Math.random() * 20) + 100);
    const sign = Math.random() > 0.5 ? 1 : -1;
    let angle = (Math.random() * 20) * sign;
    const branchWidth = Math.floor((Math.random() * 100) + 1);
    const color1 = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    const color2 = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    drawTree(centerPointX, startY, len, angle, branchWidth, color1, color2);
}

generateButton.addEventListener('click', generateRandomTree);