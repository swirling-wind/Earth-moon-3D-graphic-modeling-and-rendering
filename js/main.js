var isFrustum = true; // 默认是平行投影

var clockwiseAngle = 0;// 顺时针
var anticlockAngle = 0;// 逆时针
var rotateSpeed = 0;

var distance = 50;
var sunAngle = 0;

//光源坐标
var sunX = 100;
var sunZ = 0;

//鼠标旋转
var yPreviousPosition;//上次的触控位置Y坐标
var xPreviousPosition;//上次的触控位置X坐标
var thetaAngle = 0;//摄像机上下旋转的角度
var phiAngle = 0;//摄像机左右旋转的角度
var down = false;//是否按下鼠标
var ROTATE_SCALE = 180.0 / 320;//旋转角度与光标移动距离的比例

function setProjection() {
    // modelMatrix.setProjectFrustum
    if (isFrustum) { // 透视投影
        modelMatrix.setProjectFrustum(-1.5, 1.5, -1, 1, 2, 200);
    } else {			// 平行投影（正投影）
        modelMatrix.setProjectOrtho(-30, 30, -20, 20, 2, 200);
    }
}

function calCameraPosition(theta_angle, phi_angle, camera_distance) {
    var sin_theta = Math.sin(Math.PI / 180 * theta_angle);
    var cos_theta = Math.cos(Math.PI / 180 * theta_angle);
    var sin_phi = Math.sin(Math.PI / 180 * phi_angle);
    var cos_phi = Math.cos(Math.PI / 180 * phi_angle);
    // theta=0   phi=0
    // -90 < theta < 90; 0 < phi < 360
    var cameraX = camera_distance * cos_theta * cos_phi;
    var cameraY = camera_distance * cos_theta * sin_phi;
    var cameraHeight = camera_distance * sin_theta; // * sin_theta * cos_phi;

    var upX = 0;//cos_theta * cos_phi;
    var upY = 1;//cos_theta * sin_phi;
    var upZ = 0;//-sin_theta * sin_phi;
    modelMatrix.setCamera(cameraX, cameraHeight, cameraY, 0, 0, 0, upX, upY, upZ); 	//设置摄像机位置
}

document.onmousemove = function (event) {
    if (down) {//按下鼠标
        var dx = event.pageX - xPreviousPosition;//计算触控笔x位移
        var dy = event.pageY - yPreviousPosition;//计算触控笔y位移 
        thetaAngle += dy * ROTATE_SCALE;//设置摄像机绕x轴旋转的角度
        phiAngle += dx * ROTATE_SCALE;//设置光源绕y轴旋转的角度
        if (thetaAngle > 90) {
            thetaAngle = 90;	//设置旋转的角度为90
        }
        else if (thetaAngle < -90) {
            thetaAngle = -90;	//设置旋转的角度为-90
        }
        calCameraPosition(thetaAngle, phiAngle, distance);
    }
    xPreviousPosition = event.pageX;	//记录此次触控点的x坐标
    yPreviousPosition = event.pageY;	//记录此次触控点的y坐标
}
document.onmousedown = function (event) {//按下鼠标
    xPreviousPosition = event.pageX;//获取触控点x坐标
    yPreviousPosition = event.pageY;//获取触控点y坐标
    down = true;
}
document.onmouseup = function (event) {//抬起鼠标
    xPreviousPosition = event.pageX;//获取抬起点x坐标
    yPreviousPosition = event.pageY;//获取抬起点y坐标
    down = false;
}

document.onkeydown = function (event) {
    switch (event.keyCode) {
        // case 68: // D键
        //     console.log("D");
        //     // console.log("D phiAngle " + phiAngle);
        //     phiAngle -= 5;
        //     if (phiAngle < 0)
        //         phiAngle = 360 - phiAngle;
        //     calCameraPosition(thetaAngle, phiAngle, distance);
        //     break;

        // case 65: // A键
        //     console.log("A");
        //     // console.log("A phiAngle " + phiAngle);
        //     phiAngle += 5;
        //     if (phiAngle > 360)
        //         phiAngle = phiAngle % 360;
        //     calCameraPosition(thetaAngle, phiAngle, distance);
        //     break;

        // case 87: // W键
        //     console.log("W");
        //     // console.log("W thetaAngle " + thetaAngle);
        //     thetaAngle += 5;
        //     if (thetaAngle > 90)
        //         thetaAngle = 90;
        //     else if (thetaAngle < -90)
        //         thetaAngle = -90;
        //     calCameraPosition(thetaAngle, phiAngle, distance);
        //     break

        // case 83: // S键
        //     console.log("S");
        //     // console.log("S thetaAngle " + thetaAngle);
        //     thetaAngle -= 5;
        //     if (thetaAngle > 90)
        //         thetaAngle = 90;
        //     else if (thetaAngle < -90)
        //         thetaAngle = -90;
        //     calCameraPosition(thetaAngle, phiAngle, distance);
        //     break

        case 80: // P键
            console.log("P");
            isFrustum = !isFrustum;
            setProjection();
            break;

        case 84: // T键
            console.log("T");
            rotateSpeed = (rotateSpeed == 1) ? 0 : 1;
            break;

        case 81: // Q键
            console.log("Q");
            // 光源旋转
            sunAngle = (sunAngle + 10) % 360;
            // console.log(sunAngle);
            sunX = (Math.cos(Math.PI / 180 * sunAngle) * 100);//计算光源坐标
            sunZ = -(Math.sin(Math.PI / 180 * sunAngle) * 100);
            break;

        case 69: // E键
            console.log("E");
            //	光源旋转
            sunAngle = (sunAngle - 10) % 360;
            // console.log(sunAngle);
            sunX = (Math.cos(Math.PI / 180 * sunAngle) * 100);//计算光源坐标
            sunZ = -(Math.sin(Math.PI / 180 * sunAngle) * 100);
            break;

        case 88: // X键
            console.log("X");
            anticlockAngle = -6;
            modelMatrix.rotate(anticlockAngle, 0, 1, 0);
            // anticlockAngle=(anticlockAngle-0.5)%360;
            break;

        case 86: // V键
            console.log("V");
            clockwiseAngle = 6;
            modelMatrix.rotate(clockwiseAngle, 0, 1, 0);
            // clockwiseAngle=(clockwiseAngle+0.5)%360;
            break;

        case 90: // Z键
            console.log("Z");
            distance += 2;
            if (distance > 70)
                distance = 70;
            if (distance < 30)
                distance = 30;
            calCameraPosition(thetaAngle, phiAngle, distance);
            break;

        case 67: // C键
            console.log("C");
            distance -= 2;
            if (distance > 70)
                distance = 70;
            if (distance < 30)
                distance = 30;
            calCameraPosition(thetaAngle, phiAngle, distance);
            break;

        case 82: // R键
            console.log("R")
            thetaAngle = 0;
            phiAngle = 0;
            sunAngle = 0;
            rotateSpeed = 1;
            modelMatrix.setCamera(50, 0, 0, 0, 0, -1, 0, 1, 0);
            setProjection();
            break;
    }
}

var gl;
var modelMatrix = new MV();
var shaderPartArray = new Array();

var starBox;

var earthSphere;
var earthDayTexture;
var earthNightTexture;
var moonSphere;
var moonTexture;

var back_texture;
var down_texture;
var front_texture;
var left_texture;
var right_texture;
var up_texture;

function initializer() {
    var canvas = document.getElementById('myCanvas');
    gl = canvas.getContext('webgl2', { antialias: true });
    if (!gl) //若失败
    {
        alert("WebGL isn't available!");
        return;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.enable(gl.DEPTH_TEST); // 开启深度检测
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    modelMatrix.setInitStack();
    modelMatrix.setCamera(50, 0, 0, 0, 0, -1, 0, 1, 0);
    setProjection();

    load_shader("earth-vertex", "earth-fragment", 0);//加载地球顶点/片元着色器
    earthDayTexture = load_image_texture(gl, "image/earth_day.png");
    earthNightTexture = load_image_texture(gl, "image/earth_night.png");

    load_shader("moon-vertex", "moon-fragment", 1);//加载月球顶点/片元着色器
    moonTexture = load_image_texture(gl, "image/the_moon.png");

    load_shader("starbox-vertex", "starbox-fragment", 2);//加载月球顶点/片元着色器
    back_texture = load_image_texture(gl, "image/star_back.jpg");
    down_texture = load_image_texture(gl, "image/star_down.jpg");
    front_texture = load_image_texture(gl, "image/star_front.jpg");
    left_texture = load_image_texture(gl, "image/star_left.jpg");
    right_texture = load_image_texture(gl, "image/star_right.jpg");
    up_texture = load_image_texture(gl, "image/star_up.jpg");

    //若加载完毕
    if (!shaderPartArray[2]) {
        setTimeout(function () {
            earthSphere = new Sphere(gl, shaderPartArray[0], 7);
            moonSphere = new Sphere(gl, shaderPartArray[1], 3.5);
            starBox = new StarBox(gl, shaderPartArray[2]);
        }, 200);

    } else {
        earthSphere = new Sphere(gl, shaderPartArray[0], 7);
        moonSphere = new Sphere(gl, shaderPartArray[1], 3.5);
        starBox = new StarBox(gl, shaderPartArray[2]);
    }
    rotateSpeed = 1;

    setInterval("drawOneFrame();", 24);
}

//绘制一帧画面的方法
function drawOneFrame() {
    if ((!earthSphere) || (!moonSphere) || (!starBox)) {
        console.log("Shader isn't available!");
        return;
    }
    // console.log("加载完成")
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    modelMatrix.rotate(rotateSpeed, 0, 1, 0);
    modelMatrix.pushMatrix();
    modelMatrix.translate(0, 0, -75 + 0.35);
    starBox.drawBox(modelMatrix, back_texture);
    modelMatrix.popMatrix();

    modelMatrix.pushMatrix();
    modelMatrix.translate(0, 0, 75 - 0.35);
    modelMatrix.rotate(180, 0, 1, 0);
    starBox.drawBox(modelMatrix, front_texture);
    modelMatrix.popMatrix();

    modelMatrix.pushMatrix();
    modelMatrix.translate(-75 + 0.35, 0, 0);
    modelMatrix.rotate(90, 0, 1, 0);
    starBox.drawBox(modelMatrix, left_texture);
    modelMatrix.popMatrix();

    modelMatrix.pushMatrix();
    modelMatrix.translate(75 - 0.35, 0, 0);
    modelMatrix.rotate(-90, 0, 1, 0);
    starBox.drawBox(modelMatrix, right_texture);
    modelMatrix.popMatrix();

    modelMatrix.pushMatrix();
    modelMatrix.translate(0, -75 + 0.35, 0);
    modelMatrix.rotate(-90, 1, 0, 0);
    starBox.drawBox(modelMatrix, down_texture);
    modelMatrix.popMatrix();

    modelMatrix.pushMatrix();
    modelMatrix.translate(0, 75 - 0.35, 0);
    modelMatrix.rotate(90, 1, 0, 0);
    starBox.drawBox(modelMatrix, up_texture);
    modelMatrix.popMatrix();

    modelMatrix.pushMatrix();
    modelMatrix.rotate(90, 1, 0, 0);
    earthSphere.drawEarth(modelMatrix, earthDayTexture, earthNightTexture);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);//混合
    gl.disable(gl.BLEND);
    modelMatrix.popMatrix();
    modelMatrix.pushMatrix();

    modelMatrix.translate(20, 0, 0);
    modelMatrix.rotate(90, 1, 0, 0);
    moonSphere.drawMoon(modelMatrix, moonTexture);
    modelMatrix.popMatrix();
}
