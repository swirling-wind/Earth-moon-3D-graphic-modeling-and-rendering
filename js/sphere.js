function Sphere(gl, programIn, radius)
{
    const degree2radian = Math.PI / 180;
    this.calVertexPosition = function (vertical, horizontal) {
        var xVertex = radius * Math.cos(vertical * degree2radian) * Math.cos(horizontal * degree2radian);
        var yVertex = radius * Math.cos(vertical * degree2radian) * Math.sin(horizontal * degree2radian);
        var zVertex = radius * Math.sin(vertical * degree2radian);
        this.vertexArray.push(xVertex, yVertex, zVertex);
    }
    this.vertexArray = new Array();
    this.initVertexArray = function () {
        for (var verticalAngle = -90; verticalAngle < 90; verticalAngle++) {
            for (var horizontalAngle = 0; horizontalAngle < 360; horizontalAngle++)
            {
                this.calVertexPosition(verticalAngle, horizontalAngle + 1);
                this.calVertexPosition(verticalAngle + 1, horizontalAngle);
                this.calVertexPosition(verticalAngle, horizontalAngle);

                this.calVertexPosition(verticalAngle, horizontalAngle + 1);
                this.calVertexPosition(verticalAngle + 1, horizontalAngle + 1);
                this.calVertexPosition(verticalAngle + 1, horizontalAngle);
            }
        }
    };
    // console.log(this.vertexArray);
    this.initVertexArray();
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexArray), gl.STATIC_DRAW);

    this.normalArray = this.vertexArray;
    this.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalArray), gl.STATIC_DRAW);

    this.texturePosition = new Array();
    this.ColorsD = function () {
        var horizontalSize = 1.0 / 360.0, verticalSize = 1.0 / 180.0;
        var counter = 0;
        for (var i = 0; i < 180; i++) {
            for (var j = 0; j < 360; j++) {
                var horizontalSerial = j * horizontalSize;
                var verticalSerial = i * verticalSize;
                this.texturePosition[counter++] = horizontalSerial;
                this.texturePosition[counter++] = verticalSerial;
                this.texturePosition[counter++] = horizontalSerial;
                this.texturePosition[counter++] = verticalSerial + verticalSize;
                this.texturePosition[counter++] = horizontalSerial + horizontalSize;
                this.texturePosition[counter++] = verticalSerial;

                this.texturePosition[counter++] = horizontalSerial + horizontalSize;
                this.texturePosition[counter++] = verticalSerial;
                this.texturePosition[counter++] = horizontalSerial;
                this.texturePosition[counter++] = verticalSerial + verticalSize;
                this.texturePosition[counter++] = horizontalSerial + horizontalSize;
                this.texturePosition[counter++] = verticalSerial + verticalSize;
            }
        }
    }
    this.ColorsD();
    // this.colorsArray = [];
    this.colorsArray = this.texturePosition;
    this.vcount = this.texturePosition.length / 2;
    this.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorsArray), gl.STATIC_DRAW);

    //初始化着色器id
    this.program = programIn;

    //绘制地球
    this.drawEarth = function (ms, textureDay, textureNight)
    {
        gl.useProgram(this.program);

        // MVP的变换矩阵
        var transformMatrixHandle = gl.getUniformLocation(this.program, "transformMatrix");
        gl.uniformMatrix4fv(transformMatrixHandle, false, new Float32Array(ms.getFinalMatrix()));

        // MVP
        var modelTransformMatrixHandle = gl.getUniformLocation(this.program, "modelVertexPosition");
        gl.uniformMatrix4fv(modelTransformMatrixHandle, false, new Float32Array(ms.currentTransformMatrix));

        //光源位置
        var sunlightLocationHandle = gl.getUniformLocation(this.program, "sunlightLocation");
        gl.uniform3fv(sunlightLocationHandle, new Float32Array([sunX, 5, sunZ]));

        //摄像机位置
        var cameraLocationHandle = gl.getUniformLocation(this.program, "cameraLocation");
        gl.uniform3fv(cameraLocationHandle, new Float32Array([ms.cx, ms.cy, ms.cz]));

        //顶点坐标
        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "vertexPosition"));
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "vertexPosition"), 3, gl.FLOAT, false, 0, 0);

        //顶点法向量
        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "normalVector"));
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "normalVector"), 3, gl.FLOAT, false, 0, 0);

        //顶点纹理坐标
        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "originalVertexCoordinates"));
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "originalVertexCoordinates"), 2, gl.FLOAT, false, 0, 0);

        //白天纹理
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureDay);

        //夜晚纹理
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, textureNight);

        gl.uniform1i(gl.getUniformLocation(this.program, "sampleTexture"), 0);
        gl.uniform1i(gl.getUniformLocation(this.program, "sampleNightTexture"), 1);

        gl.drawArrays(gl.TRIANGLES, 0, this.vcount);
    }

    //绘制月球
    this.drawMoon = function (ms, texture)
    {
        gl.useProgram(this.program);

        //获取总变换矩阵引用id
        var transformMatrixHandle = gl.getUniformLocation(this.program, "transformMatrix");
        gl.uniformMatrix4fv(transformMatrixHandle, false, new Float32Array(ms.getFinalMatrix()));

        // MVP
        var modelTransformMatrixHandle = gl.getUniformLocation(this.program, "modelVertexPosition");
        gl.uniformMatrix4fv(modelTransformMatrixHandle, false, new Float32Array(ms.currentTransformMatrix));

        //光源位置
        var sunlightLocationHandle = gl.getUniformLocation(this.program, "uLightLocation");
        //将光源位置送入渲染管线
        gl.uniform3fv(sunlightLocationHandle, new Float32Array([sunX, 5, sunZ]));

        //摄像机位置
        var cameraLocationHandle = gl.getUniformLocation(this.program, "cameraLocation");
        gl.uniform3fv(cameraLocationHandle, new Float32Array([ms.cx, ms.cy, ms.cz]));

        //顶点坐标
        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "vertexPosition"));
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "vertexPosition"), 3, gl.FLOAT, false, 0, 0);

        //顶点法向量
        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "normalVector"));
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "normalVector"), 3, gl.FLOAT, false, 0, 0);

        //顶点纹理坐标
        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "originalVertexCoordinates"));
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "originalVertexCoordinates"), 2, gl.FLOAT, false, 0, 0);

        //绑定纹理
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.uniform1i(gl.getUniformLocation(this.program, "sampleTexture"), 0);

        gl.drawArrays(gl.TRIANGLES, 0, this.vcount);
    }
}
