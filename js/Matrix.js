function translateMatrix(inputMatrix, tempRotate, rotateX, rotateY, rotateZ) {
    var currentRotate;
    for (var i = 0; i < 4; i++) {
        currentRotate = tempRotate + i;
        inputMatrix[12 + currentRotate] += inputMatrix[currentRotate] * rotateX + inputMatrix[4 + currentRotate] * rotateY + inputMatrix[8 + currentRotate] * rotateZ;
    }
}

function length(rotateX, rotateY, rotateZ) {
    return Math.sqrt(rotateX * rotateX + rotateY * rotateY + rotateZ * rotateZ);
}

function setIdentityMatrix(inputMatrix) {
    for (var i = 0; i < 16; i++) {
        inputMatrix[i] = 0;
    }
    inputMatrix[0] = 1;
    inputMatrix[5] = 1;
    inputMatrix[10] = 1;
    inputMatrix[15] = 1;
}

function multiplyMatrix(MVPMatrix, tempMultiply, inputMatrix, multiStep, currentMatrix, currentStep) {
    var tempInputMatrix = new Array(16);
    var tempCurrentMatrix = new Array(16);
    for (var i = 0; i < 16; i++) {
        tempInputMatrix[i] = inputMatrix[i];
        tempCurrentMatrix[i] = currentMatrix[i];
    }
    MVPMatrix[0 + tempMultiply] = tempInputMatrix[0 + multiStep] * tempCurrentMatrix[0 + currentStep] + tempInputMatrix[4 + multiStep] * tempCurrentMatrix[1 + currentStep] + tempInputMatrix[8 + multiStep] * tempCurrentMatrix[2 + currentStep] + tempInputMatrix[12 + multiStep] * tempCurrentMatrix[3 + currentStep];
    MVPMatrix[1 + tempMultiply] = tempInputMatrix[1 + multiStep] * tempCurrentMatrix[0 + currentStep] + tempInputMatrix[5 + multiStep] * tempCurrentMatrix[1 + currentStep] + tempInputMatrix[9 + multiStep] * tempCurrentMatrix[2 + currentStep] + tempInputMatrix[13 + multiStep] * tempCurrentMatrix[3 + currentStep];
    MVPMatrix[2 + tempMultiply] = tempInputMatrix[2 + multiStep] * tempCurrentMatrix[0 + currentStep] + tempInputMatrix[6 + multiStep] * tempCurrentMatrix[1 + currentStep] + tempInputMatrix[10 + multiStep] * tempCurrentMatrix[2 + currentStep] + tempInputMatrix[14 + multiStep] * tempCurrentMatrix[3 + currentStep];
    MVPMatrix[3 + tempMultiply] = tempInputMatrix[3 + multiStep] * tempCurrentMatrix[0 + currentStep] + tempInputMatrix[7 + multiStep] * tempCurrentMatrix[1 + currentStep] + tempInputMatrix[11 + multiStep] * tempCurrentMatrix[2 + currentStep] + tempInputMatrix[15 + multiStep] * tempCurrentMatrix[3 + currentStep];
    MVPMatrix[4 + tempMultiply] = tempInputMatrix[0 + multiStep] * tempCurrentMatrix[4 + currentStep] + tempInputMatrix[4 + multiStep] * tempCurrentMatrix[5 + currentStep] + tempInputMatrix[8 + multiStep] * tempCurrentMatrix[6 + currentStep] + tempInputMatrix[12 + multiStep] * tempCurrentMatrix[7 + currentStep];
    MVPMatrix[5 + tempMultiply] = tempInputMatrix[1 + multiStep] * tempCurrentMatrix[4 + currentStep] + tempInputMatrix[5 + multiStep] * tempCurrentMatrix[5 + currentStep] + tempInputMatrix[9 + multiStep] * tempCurrentMatrix[6 + currentStep] + tempInputMatrix[13 + multiStep] * tempCurrentMatrix[7 + currentStep];
    MVPMatrix[6 + tempMultiply] = tempInputMatrix[2 + multiStep] * tempCurrentMatrix[4 + currentStep] + tempInputMatrix[6 + multiStep] * tempCurrentMatrix[5 + currentStep] + tempInputMatrix[10 + multiStep] * tempCurrentMatrix[6 + currentStep] + tempInputMatrix[14 + multiStep] * tempCurrentMatrix[7 + currentStep];
    MVPMatrix[7 + tempMultiply] = tempInputMatrix[3 + multiStep] * tempCurrentMatrix[4 + currentStep] + tempInputMatrix[7 + multiStep] * tempCurrentMatrix[5 + currentStep] + tempInputMatrix[11 + multiStep] * tempCurrentMatrix[6 + currentStep] + tempInputMatrix[15 + multiStep] * tempCurrentMatrix[7 + currentStep];
    MVPMatrix[8 + tempMultiply] = tempInputMatrix[0 + multiStep] * tempCurrentMatrix[8 + currentStep] + tempInputMatrix[4 + multiStep] * tempCurrentMatrix[9 + currentStep] + tempInputMatrix[8 + multiStep] * tempCurrentMatrix[10 + currentStep] + tempInputMatrix[12 + multiStep] * tempCurrentMatrix[11 + currentStep];
    MVPMatrix[9 + tempMultiply] = tempInputMatrix[1 + multiStep] * tempCurrentMatrix[8 + currentStep] + tempInputMatrix[5 + multiStep] * tempCurrentMatrix[9 + currentStep] + tempInputMatrix[9 + multiStep] * tempCurrentMatrix[10 + currentStep] + tempInputMatrix[13 + multiStep] * tempCurrentMatrix[11 + currentStep];
    MVPMatrix[10 + tempMultiply] = tempInputMatrix[2 + multiStep] * tempCurrentMatrix[8 + currentStep] + tempInputMatrix[6 + multiStep] * tempCurrentMatrix[9 + currentStep] + tempInputMatrix[10 + multiStep] * tempCurrentMatrix[10 + currentStep] + tempInputMatrix[14 + multiStep] * tempCurrentMatrix[11 + currentStep];
    MVPMatrix[11 + tempMultiply] = tempInputMatrix[3 + multiStep] * tempCurrentMatrix[8 + currentStep] + tempInputMatrix[7 + multiStep] * tempCurrentMatrix[9 + currentStep] + tempInputMatrix[11 + multiStep] * tempCurrentMatrix[10 + currentStep] + tempInputMatrix[15 + multiStep] * tempCurrentMatrix[11 + currentStep];
    MVPMatrix[12 + tempMultiply] = tempInputMatrix[0 + multiStep] * tempCurrentMatrix[12 + currentStep] + tempInputMatrix[4 + multiStep] * tempCurrentMatrix[13 + currentStep] + tempInputMatrix[8 + multiStep] * tempCurrentMatrix[14 + currentStep] + tempInputMatrix[12 + multiStep] * tempCurrentMatrix[15 + currentStep];
    MVPMatrix[13 + tempMultiply] = tempInputMatrix[1 + multiStep] * tempCurrentMatrix[12 + currentStep] + tempInputMatrix[5 + multiStep] * tempCurrentMatrix[13 + currentStep] + tempInputMatrix[9 + multiStep] * tempCurrentMatrix[14 + currentStep] + tempInputMatrix[13 + multiStep] * tempCurrentMatrix[15 + currentStep];
    MVPMatrix[14 + tempMultiply] = tempInputMatrix[2 + multiStep] * tempCurrentMatrix[12 + currentStep] + tempInputMatrix[6 + multiStep] * tempCurrentMatrix[13 + currentStep] + tempInputMatrix[10 + multiStep] * tempCurrentMatrix[14 + currentStep] + tempInputMatrix[14 + multiStep] * tempCurrentMatrix[15 + currentStep];
    MVPMatrix[15 + tempMultiply] = tempInputMatrix[3 + multiStep] * tempCurrentMatrix[12 + currentStep] + tempInputMatrix[7 + multiStep] * tempCurrentMatrix[13 + currentStep] + tempInputMatrix[11 + multiStep] * tempCurrentMatrix[14 + currentStep] + tempInputMatrix[15 + multiStep] * tempCurrentMatrix[15 + currentStep];
};


function setRotateM(inputMatrix, tempLook, rotateAngle, rotateX, rotateY, rotateZ) {
    for (var i = 0; i < 16; i++) {
        inputMatrix[i] = 0;
    }
    inputMatrix[tempLook + 15] = 1;
    rotateAngle *= (Math.PI / 180.0);
    rotateAngleSin = Math.sin(rotateAngle);
    rotateAngleCos = Math.cos(rotateAngle);
    if (1.0 == rotateX && 0.0 == rotateY && 0.0 == rotateZ) {
        inputMatrix[tempLook + 5] = rotateAngleCos;
        inputMatrix[tempLook + 10] = rotateAngleCos;
        inputMatrix[tempLook + 6] = rotateAngleSin;
        inputMatrix[tempLook + 9] = -rotateAngleSin;
        inputMatrix[tempLook + 0] = 1;
    } else {
        if (0.0 == rotateX && 1.0 == rotateY && 0.0 == rotateZ) {
            inputMatrix[tempLook + 0] = rotateAngleCos;
            inputMatrix[tempLook + 10] = rotateAngleCos;
            inputMatrix[tempLook + 8] = rotateAngleSin;
            inputMatrix[tempLook + 2] = -rotateAngleSin;
            inputMatrix[tempLook + 5] = 1;
        } else {
            if (0.0 == rotateX && 0.0 == rotateY && 1.0 == rotateZ) {
                inputMatrix[tempLook + 0] = rotateAngleCos;
                inputMatrix[tempLook + 5] = rotateAngleCos;
                inputMatrix[tempLook + 1] = rotateAngleSin;
                inputMatrix[tempLook + 4] = -rotateAngleSin;
                inputMatrix[tempLook + 10] = 1;
            } else {
                len = length(rotateX, rotateY, rotateZ);
                if (1.0 != len) {
                    recipLen = 1.0 / len;
                    rotateX *= recipLen;
                    rotateY *= recipLen;
                    rotateZ *= recipLen;
                }
                var nc = 1.0 - rotateAngleCos;
                var xy = rotateX * rotateY;
                var yz = rotateY * rotateZ;
                var zx = rotateZ * rotateX;
                var xs = rotateX * rotateAngleSin;
                var ys = rotateY * rotateAngleSin;
                var zs = rotateZ * rotateAngleSin;
                inputMatrix[tempLook + 0] = rotateX * rotateX * nc + rotateAngleCos;
                inputMatrix[tempLook + 4] = xy * nc - zs;
                inputMatrix[tempLook + 8] = zx * nc + ys;
                inputMatrix[tempLook + 1] = xy * nc + zs;
                inputMatrix[tempLook + 5] = rotateY * rotateY * nc + rotateAngleCos;
                inputMatrix[tempLook + 9] = yz * nc - xs;
                inputMatrix[tempLook + 2] = zx * nc - ys;
                inputMatrix[tempLook + 6] = yz * nc + xs;
                inputMatrix[tempLook + 10] = rotateZ * rotateZ * nc + rotateAngleCos;
            }
        }
    }
}

function rotateModelMatrix(inputMatrix, tempRotate, rotateAngle, rotateX, rotateY, rotateZ) {
    var rotateModelMatrix = new Array(16);
    setRotateM(rotateModelMatrix, 0, rotateAngle, rotateX, rotateY, rotateZ);
    var rotateMultiplyM = new Array(16);
    multiplyMatrix(rotateMultiplyM, 0, inputMatrix, 0, rotateModelMatrix, 0);
    for (var i = 0; i < 16; i++) {
        inputMatrix[i] = rotateMultiplyM[i];
    }
}

function frustumViewMatrix(inputMatrix, tempFrustum, left, right, bottom, top, near, far) {
    if (left == right || top == bottom || near == far || near <= 0.0 || far <= 0.0) {
        alert("wrong input");
    }
    var originalWidth = 1.0 / (right - left);
    var originalHeight = 1.0 / (top - bottom);
    var originalDepth = 1.0 / (near - far);
    for (var i = 0; i < 16; i++) {
        inputMatrix[i] = 0;
    }
    inputMatrix[tempFrustum + 0] = 2.0 * (near * originalWidth);
    inputMatrix[tempFrustum + 5] = 2.0 * (near * originalHeight);
    inputMatrix[tempFrustum + 8] = 2.0 * ((right + left) * originalWidth);
    inputMatrix[tempFrustum + 9] =(top + bottom) * originalHeight;
    inputMatrix[tempFrustum + 10] = (far + near) * originalDepth;
    inputMatrix[tempFrustum + 14] = 2.0 * (far * near * originalDepth);
    inputMatrix[tempFrustum + 11] = -1.0;
}

function orthoViewMatrix(inputMatrix, tempRotate, left, right, bottom, top, near, far) {
    if (left == right || top == bottom || near == far) {
        alert("Wrong input");
    }
    var originalWidth = 1.0 / (right - left);
    var originalHeight = 1.0 / (top - bottom);
    var originalDepth = 1.0 / (far - near);
    for (var i = 0; i < 16; i++) {
        inputMatrix[i] = 0;
    }
    inputMatrix[tempRotate + 0] = 2.0 * (originalWidth);
    inputMatrix[tempRotate + 5] = 2.0 * (originalHeight);
    inputMatrix[tempRotate + 10] = -2.0 * (originalDepth);
    inputMatrix[tempRotate + 12] = -(right + left) * originalWidth;
    inputMatrix[tempRotate + 13] = -(top + bottom) * originalHeight;
    inputMatrix[tempRotate + 14] = -(far + near) * originalDepth;
    inputMatrix[tempRotate + 15] = 1.0;
}


function setLookAtM(inputMatrix, tempLook, cx, cy, cz, tx, ty, tz, upx, upy, upz) {
    var xDiff = tx - cx;
    var yDiff = ty - cy;
    var zDiff = tz - cz;
    var rlf = 1.0 / length(xDiff, yDiff, zDiff);
    xDiff *= rlf;
    yDiff *= rlf;
    zDiff *= rlf;
    sx = yDiff * upz - zDiff * upy;
    sy = zDiff * upx - xDiff * upz;
    sz = xDiff * upy - yDiff * upx;
    rls = 1.0 / length(sx, sy, sz);
    sx *= rls;
    sy *= rls;
    sz *= rls;
    ux = sy * zDiff - sz * yDiff;
    uy = sz * xDiff - sx * zDiff;
    uz = sx * yDiff - sy * xDiff;
    for (var i = 0; i < 16; i++) {
        inputMatrix[i] = 0;
    }
    inputMatrix[tempLook + 0] = sx;
    inputMatrix[tempLook + 1] = ux;
    inputMatrix[tempLook + 2] = -xDiff;
    inputMatrix[tempLook + 4] = sy;
    inputMatrix[tempLook + 5] = uy;
    inputMatrix[tempLook + 6] = -yDiff;
    inputMatrix[tempLook + 8] = sz;
    inputMatrix[tempLook + 9] = uz;
    inputMatrix[tempLook + 10] = -zDiff;
    inputMatrix[tempLook + 15] = 1.0;
    translateMatrix(inputMatrix, tempLook, -cx, -cy, -cz);
}
