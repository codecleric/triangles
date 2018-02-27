// This depends on triangle.js to be loaded
drawTriangle = (aTriangle) => {
    var canvas = document.getElementById('tsquare');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(aTriangle.v1.x, aTriangle.v1.y);
        ctx.lineTo(aTriangle.v2.x, aTriangle.v2.y);
        ctx.lineTo(aTriangle.v3.x, aTriangle.v3.y);
        ctx.fill();
    }
};

update = () => {
    let rowVal = document.getElementById("row").value
    let colVal = document.getElementById("col").value
    console.log("Updating...", rowNameForRow(rowVal), colVal)
    drawTriangle(getTriangleForPosition(rowVal, colVal))
}

