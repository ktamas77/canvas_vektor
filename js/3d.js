var scale = 2.5;              // normalize object size
var horizontalShift = 150;  // horizontal center
var verticalShift = 150;    // vertical center

var sinMax = 1024;
var multiplier = 32000;
var sinA = Array();
var cosA = Array();

// -- init rotation arrays
var pipi = (sinMax/2)/Math.PI;
for (var i = 0;i < sinMax; i++) {
    sinA[i] = Math.floor(Math.sin(i/(pipi))*multiplier); 
    cosA[i] = Math.floor(Math.cos(i/(pipi))*multiplier);
}

function rotateX(vertexObj, angle)
{   
    targetObj = Array();
    for (var i in vertexObj) {
        v = vertexObj[i];
        sourceX = v[2];
        sourceY = v[3];
        sourceZ = v[4];
        sinAngle = sinA[angle];
        cosAngle = cosA[angle];
        targetObj[i] = Array();
        targetObj[i][2] = sourceX;
        targetObj[i][3] = Math.floor(((cosAngle * sourceY) + (sinAngle * sourceZ)) / multiplier);
        targetObj[i][4] = Math.floor(((sinAngle * sourceY) - (cosAngle * sourceZ)) / multiplier);
    }
    return targetObj;
}

function rotateY(vertexObj, angle)
{   
    targetObj = Array();
    for (var i in vertexObj) {
        v = vertexObj[i];
        sourceX = v[2];
        sourceY = v[3];
        sourceZ = v[4];
        sinAngle = sinA[angle];
        cosAngle = cosA[angle];
        targetObj[i] = Array();
        targetObj[i][2] = Math.floor(((cosAngle * sourceX) + (sinAngle * sourceZ)) / multiplier);
        targetObj[i][3] = sourceY;
        targetObj[i][4] = Math.floor(((sinAngle * sourceX) - (cosAngle * sourceZ)) / multiplier);
    }
    return targetObj;
}

function rotateZ(vertexObj, angle)
{   
    targetObj = Array();
    for (var i in vertexObj) {
        v = vertexObj[i];
        sourceX = v[2];
        sourceY = v[3];
        sourceZ = v[4];
        sinAngle = sinA[angle];
        cosAngle = cosA[angle];
        targetObj[i] = Array();
        targetObj[i][2] = Math.floor(((cosAngle * sourceX) + (sinAngle * sourceY)) / multiplier);
        targetObj[i][3] = Math.floor(((sinAngle * sourceX) - (cosAngle * sourceY)) / multiplier);
        targetObj[i][4] = sourceZ;
    }
    return targetObj;
}

function shiftX(vertexObj, amount)
{
    targetObj = Array();
    for (var i in vertexObj) {
        v = vertexObj[i];
        targetObj[i] = Array();
        targetObj[i][2] = parseFloat(v[2]) + amount;
        targetObj[i][3] = v[3];
        targetObj[i][4] = v[4];
    }
    return targetObj;
}

function shiftY(vertexObj, amount)
{
    targetObj = Array();
    for (var i in vertexObj) {
        v = vertexObj[i];
        targetObj[i] = Array();
        targetObj[i][2] = v[2];
        targetObj[i][3] = parseFloat(v[3]) + amount;
        targetObj[i][4] = v[4];
    }
    return targetObj;
}

function shiftZ(vertexObj, amount)
{
    targetObj = Array();
    for (var i in vertexObj) {
        v = vertexObj[i];
        targetObj[i] = Array();
        targetObj[i][2] = v[2];
        targetObj[i][3] = v[3];
        targetObj[i][4] = parseFloat(v[4]) + amount;
    }
    return targetObj;
}


function renderVertex(vertexObj, canvasName)
{
    canvas = $('#' + canvasName)[0].getContext('2d');
    canvas.fillStyle = '#00f';            
    for (var i in vertexObj) {
        v = vertexObj[i];
        x = Math.round(v[2] / scale);
        y = Math.round(v[3] / scale);
        canvas.fillRect(x + horizontalShift, y + verticalShift, 1, 1);
    }                
}

function renderPolygon(vertexObj, faceObj, canvasName)
{
    var canvas = $('#' + canvasName)[0].getContext('2d');
    
    var orderedFaces = Array();
    for (var i in faceObj) {
        f = faceObj[i];
        a = f[2];
        b = f[3];
        c = f[4];
        vertexA = vertexObj[a];
        vertexB = vertexObj[b];
        vertexC = vertexObj[c];
        z1 = vertexA[4];
        z2 = vertexB[4];
        z3 = vertexC[4];
        zSum = z1 + z2 + z3;        
        orderedItem = Array(i, zSum);        
        orderedFaces[i] = orderedItem;
    }
    
    orderedFaces.sort(function(a, b) {
        return a[1] - b[1]
    });
    
    for (var i in orderedFaces) {
        faceIndex = orderedFaces[i][0];
        f = faceObj[faceIndex];
        a = f[2];
        b = f[3];
        c = f[4];
        vertexA = vertexObj[a];
        vertexB = vertexObj[b];
        vertexC = vertexObj[c];
        x1 = vertexA[2] / scale;
        y1 = vertexA[3] / scale;
        x2 = vertexB[2] / scale;
        y2 = vertexB[3] / scale;
        x3 = vertexC[2] / scale;
        y3 = vertexC[3] / scale;
        canvas.beginPath();
        canvas.fillStyle = 'rgba(' + faceIndex + ', 45, 21, 255)';
        canvas.moveTo(x1 + horizontalShift, y1 + verticalShift);
        canvas.lineTo(x2 + horizontalShift, y2 + verticalShift);
        canvas.lineTo(x3 + horizontalShift, y3 + verticalShift);
        canvas.closePath();
        canvas.fill();
    }               
}

function renderMesh(vertexObj, faceObj, canvasName)
{
    var canvas = $('#' + canvasName)[0].getContext('2d');
    canvas.fillStyle = '#0f0';            
    canvas.lineWidth = 1;
    for (var i in faceObj) {
        f = faceObj[i];
        a = f[2];
        b = f[3];
        c = f[4];
        ab = f[5];
        bc = f[6];
        ca = f[7];
        vertexA = vertexObj[a];
        vertexB = vertexObj[b];
        vertexC = vertexObj[c];
        x1 = vertexA[2] / scale;
        y1 = vertexA[3] / scale;
        x2 = vertexB[2] / scale;
        y2 = vertexB[3] / scale;
        x3 = vertexC[2] / scale;
        y3 = vertexC[3] / scale;
        if (ab) {
            canvas.beginPath();
            canvas.moveTo(x1 + horizontalShift, y1 + verticalShift);
            canvas.lineTo(x2 + horizontalShift, y2 + verticalShift);
            canvas.stroke();
        }
        if (bc) {
            canvas.beginPath();
            canvas.moveTo(x2 + horizontalShift, y2 + verticalShift);
            canvas.lineTo(x3 + horizontalShift, y3 + verticalShift);
            canvas.stroke();
        }
        if (ca) {
            canvas.beginPath();
            canvas.moveTo(x3 + horizontalShift, y3 + verticalShift);
            canvas.lineTo(x1 + horizontalShift, y1 + verticalShift);
            canvas.stroke();
        }
    }

}

function center3d(vertexObj)
{
    minX = 0;
    maxX = 0;
    minY = 0;
    maxY = 0;
    minZ = 0;
    maxZ = 0;
    for (var i in vertexObj) {
        v = vertexObj[i];
        x = v[2];
        y = v[3];
        z = v[4];
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
        minZ = Math.min(minZ, z);
        maxZ = Math.max(maxZ, z);
    }
    width = maxX-minX;
    height = maxY-minY;
    depth = maxZ-minZ;
    centerX = minX + (width / 2);
    centerY = minY + (height / 2);
    centerZ = minZ + (depth / 2);
    targetObj = shiftZ(shiftY(shiftX(vertexObj, -centerX), -centerY), -centerZ);
    return targetObj;
}
