function loadFile(e) {
    dragHover(e);

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var countNumIpt = document.getElementById("countNum");

    var original = e.dataTransfer.files[0];

    var img = new Image();
    img.src = URL.createObjectURL(original);

    img.onload = function() {
        ctx.drawImage(img, 0, 640 - 576, 576, 576);
        
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


document.addEventListener("dragenter", dragHover, false);
document.addEventListener("dragover", dragHover, false);
document.addEventListener("drop", loadFile, false);