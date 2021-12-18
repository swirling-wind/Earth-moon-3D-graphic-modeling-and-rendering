// 加载图片作为纹理
function load_image_texture(gl, imageName) {
    var texture = gl.createTexture();
    var image = new Image();
    image.onload = function () {
        // gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    }
    image.src = imageName;
    return texture;
}

//加载着色器的方法
function load_shader(vertexName, fragmentName, index)
{
    var vertexStr = document.getElementById(vertexName).innerHTML;
    // console.log(vertexStr);
    var fragmentStr = document.getElementById(fragmentName).innerHTML;
    // load_shader(fragmentStr);

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexStr);
    gl.compileShader(vertexShader);
    var compiled = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    if (!compiled && !gl.isContextLost()) {
        var error = gl.getShaderInfoLog(vertexShader);
        console.log("Error! Compiling vertexName shader :" + error);
        gl.deleteShader(vertexShader);
    }

    //片元着色器
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentStr);
    gl.compileShader(fragmentShader);
    var compiled = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
    if (!compiled && !gl.isContextLost()) {
        console.log(gl.getShaderInfoLog(fragmentShader));
        gl.deleteShader(fragmentShader);
    }

    //结合顶点着色器和片元着色器并连接
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    //检查链接是否成功
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked && !gl.isContextLost())
    {
        console.log(gl.getProgramInfoLog(program));

        gl.deleteProgram(program);
        gl.deleteProgram(fragmentShader);
        gl.deleteProgram(vertexShader);
    }
    gl.useProgram(program);
    shaderPartArray[index] = program;
}
