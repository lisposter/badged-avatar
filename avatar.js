function loadFile(e) {
    dragHover(e);

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var countNumIpt = document.getElementById("countNum");

    var original = e.dataTransfer.files[0];

    var img = new Image();
    img.src = URL.createObjectURL(original);

    img.onload = function() {
        ctx.save();

        roundedImage(ctx, 0, 640 - 576, 576, 576, 13);
        ctx.clip();
        ctx.drawImage(img, 0, 640 - 576, 576, 576);
        
        ctx.restore();
        var size = 640 * 0.38 / 2;
        var x = 640 * 0.81;
        var y = 640 * 0.19;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#f00";
        ctx.fill();
        ctx.font = "bold " + size + "px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";

        var countNum = parseInt(countNumIpt.value);
        var number = (countNum && typeof countNum === 'number') ? (countNum > 99 ? '99+' : countNum) : 1;
        ctx.fillText(number, x, y + y / 3);
    };
}

function dragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type == "dragover" ? "hover" : "");
}

function roundedImage(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

document.addEventListener("dragenter", dragHover, false);
document.addEventListener("dragover", dragHover, false);
document.addEventListener("drop", loadFile, false);