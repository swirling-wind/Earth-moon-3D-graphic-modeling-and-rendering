function StarBox(gl, programIn)
{
    //初始化顶点坐标
    this.vertexArray = [-75, 75, 0, -75, -75, 0, 75, -75, 0, 75, -75, 0, 75, 75, 0, -75, 75, 0];
    this.vertexCount = this.vertexArray.length / 3;
	// console.log(this.vertexCount);
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexArray), gl.STATIC_DRAW);

    this.colorsArray = [1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0];
    this.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorsArray), gl.STATIC_DRAW);

    //初始化着色器id
    this.program = programIn;

    this.drawBox = function (ms, texture)
    {
        gl.useProgram(this.program);

        var transformMatrixHandle = gl.getUniformLocation(this.program, "transformMatrix");
        gl.uniformMatrix4fv(transformMatrixHandle, false, new Float32Array(ms.getFinalMatrix()));
		// console.log(transformMatrixHandle);

        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "vertexPosition"));
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "vertexPosition"), 3, gl.FLOAT, false, 0, 0);

        //顶点纹理坐标
        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "originalVertexCoordinates"));
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "originalVertexCoordinates"), 2, gl.FLOAT, false, 0, 0);

        //绑定纹理
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(gl.getUniformLocation(this.program, "sampleTexture"), 0);

        gl.drawArrays(gl.TRIANGLES, 0, this.vertexCount);
    }
}
