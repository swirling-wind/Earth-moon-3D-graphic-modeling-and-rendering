function MV() {
    this.currentTransformMatrix = new Array(16);//变换矩阵

    this.setInitStack = function () {
        this.currentTransformMatrix = new Array(16);
        setIdentityMatrix(this.currentTransformMatrix);
    }

    this.mStack = new Array(100);//矩阵栈
    this.pushMatrix = function () {
        this.mStack.push(this.currentTransformMatrix.slice(0));
    }

    this.popMatrix = function () {
        this.currentTransformMatrix = this.mStack.pop();
    }

    this.translate = function (x, y, z)
    {
        translateMatrix(this.currentTransformMatrix, 0, x, y, z);
    }

    this.rotate = function (angle, x, y, z)
    {
        rotateModelMatrix(this.currentTransformMatrix, 0, angle, x, y, z);
    }

    this.cx = 0;//摄像机x坐标q
    this.cy = 0;//摄像机y坐标
    this.cz = 0;//摄像机z坐标
    this.mVMatrix = new Array(16);
    this.projectionMatrix = new Array(16);//投影矩阵
    this.setCamera = function(cx, cy, cz, tx, ty, tz, upx, upy, upz) {
        setLookAtM(this.mVMatrix, 0, cx, cy, cz, tx, ty, tz, upx, upy, upz);
        this.cx = cx;
        this.cy = cy;
        this.cz = cz;
    }

    this.setProjectFrustum = function(left,	right, bottom, top, near, far) {
        frustumViewMatrix(this.projectionMatrix, 0, left, right, bottom, top, near, far);
    }

    this.setProjectOrtho = function(left, right, bottom, top, near,	far) {
        orthoViewMatrix(this.projectionMatrix, 0, left, right, bottom, top, near, far);
    }

    this.getFinalMatrix = function () {
        var mMVPMatrix = new Array(16);
        multiplyMatrix(mMVPMatrix, 0, this.mVMatrix, 0, this.currentTransformMatrix, 0);
        multiplyMatrix(mMVPMatrix, 0, this.projectionMatrix, 0, mMVPMatrix, 0);
        return mMVPMatrix;
    }
}
