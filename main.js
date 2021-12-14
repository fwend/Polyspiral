const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const g = canvas.getContext("2d");

let inc = 0;

function drawSpiral(len, angleIncrement) {
    let x1 = canvas.width / 2;
    let y1 = canvas.height / 2;
    let angle = angleIncrement;

    for (let i = 0; i < 150; i++) {

        const x2 = x1 + Math.cos(angle) * len;
        const y2 = y1 - Math.sin(angle) * len;

        g.strokeStyle = HSVtoRGB(i / 150, 1.0, 1.0);
        g.beginPath();
        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        g.stroke();

        x1 = x2;
        y1 = y2;

        len += 3;

        angle = (angle + angleIncrement) % (Math.PI * 2);
    }
}

/* copied from stackoverflow */
function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    return "rgb("
        + Math.round(r * 255) + ","
        + Math.round(g * 255) + ","
        + Math.round(b * 255) + ")";
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

setInterval(function () {
    inc = (inc + 0.05) % 360;
    g.clearRect(0, 0, canvas.width, canvas.height);
    drawSpiral(5, toRadians(inc));
}, 40);
