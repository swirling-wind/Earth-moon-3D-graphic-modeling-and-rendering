<a href="https://swirling-wind.github.io/Earth-moon-3D-graphic-modeling-and-rendering/">![Try it online](https://img.shields.io/badge/try%20it-online-blue.svg)</a>
# Earth-Moon 3D Graphic Modeling and Rendering

[English](#english) | [中文](#chinese)

<a name="english"></a>
## English

### 1. Project Overview

In this project, both camera and model rotations are performed in a polar coordinate system centered on the Earth.

The project includes three main models (with their corresponding names in code): Earth (`earth`), Moon (`moon`), and a starry skybox (`starBox`).

For lighting, the project uses a non-negative Blinn-Phong model, combining ambient, specular, and diffuse light. There is one movable light source (`sun`) which only affects reflections and shadows on Earth. Lighting and shadows on the Moon are not affected by the movement of the `sun` light source.

Initially, the Earth, Moon, camera, and light source are aligned. The default projection mode is perspective projection.

By default, all three objects (Earth, Moon, and skybox) rotate together counterclockwise at a constant speed on the horizontal plane where the Earth and Moon are located, with the Earth as the origin.

### 2. Interactive Operations

- **Object Rotation**
  - Press `X`: All objects immediately move clockwise on the horizontal plane.
  - Press `V`: All objects immediately move counterclockwise on the horizontal plane.

- **Camera Movement**
  - Mouse drag: The camera moves up, down, left, or right in the polar coordinate system centered on the Earth.
  - Press `Z`: The camera moves forward in the polar coordinate system.
  - Press `C`: The camera moves backward in the polar coordinate system.

- **Light Source Movement**
  - Press `Q`: The light source moves counterclockwise on the horizontal plane.
  - Press `E`: The light source moves clockwise on the horizontal plane.

- **Switch Projection Mode**
  - Press `P`: Toggles between parallel projection and perspective projection.

- **Auto Rotation**
  - Press `T`: Stops the automatic counterclockwise rotation of all objects or resumes automatic clockwise rotation.

- **Reset Camera State**
  - Press `R`: Resets the camera's position and movement state.

### 3. Project Design

#### 3.1 Project Platform

This project is based on the WebGL drawing protocol and GLSL ES 3.0. It runs on 64-bit Chrome v87 (official version), configured to allow cross-origin file access.

#### 3.2 Main Work

The main work of this project involves modeling, rendering, and projecting the Earth, Moon, and starry skybox.

- **Modeling**: Consists of sphere modeling and cube modeling. Polygon mesh modeling is used for the Earth and Moon (spheres) and the skybox (cube).
- **Rendering**: Includes 2D texture mapping, multi-texturing, lighting models, and shadow mapping. Multi-texturing is used to render the Earth with both day and night textures. The lighting model uses a non-negative Blinn-Phong model with a movable directional light source to simulate sunlight. Shadow mapping calculates the final fragment color by multiplying the original texture color and light intensity (sum of ambient, specular, and diffuse light).
- **Projection**: Includes model transformation, view transformation, and projection switching. Camera movement and object rotation are controlled via keyboard interactions. The camera always points toward the Earth by converting polar coordinates to Cartesian coordinates before each frame is rendered. Two projection modes are supported: parallel projection and perspective projection (default).

#### 3.3 Design Structure

The overall design structure of the project is as follows:

##### 3.3.1 Scene Object Model Design

The project includes three models: Earth (`earth`), Moon (`moon`), and skybox (`starBox`). The Earth and Moon are modeled as spheres, while the skybox is modeled as a cube. No external models are imported.

- **Building a 3D Sphere Model**: A sphere with origin-centered radius R is represented parametrically. The sphere's surface is divided into small quadrilateral patches along latitude and longitude lines, each further divided into two triangles for modeling. The step size between adjacent lines is set to 1° for smoothness.
- **Building a Cube Model**: The cube model is defined by specifying the coordinates of its 8 vertices. The cube's side length is set to 150 units.

##### 3.3.2 Transformation Design for Observation

- **Object Transformation (Model Transformation)**: Object transformations occur in a 3D polar coordinate system, primarily involving rotation around the y-axis (zox plane). The `rotateMatrix` function handles rotation based on the `rotateAngle` variable, which changes over time (auto-rotation) or via keyboard input (manual rotation).
- **Camera Transformation (View Transformation)**: Transformations are performed in a 3D polar coordinate system. Before projection, polar coordinates are converted to Cartesian coordinates (in degrees, ranging [0°, 360°]).
- **Canonical Projection Transformation**: Different homogeneous coordinate matrices are used for parallel projection and perspective projection.

##### 3.3.3 Realistic Shading Design

- **Lighting**: A simplified non-negative Blinn-Phong lighting model is used.
- **Texturing**: Texture mapping, stretching, and linear sampling are applied to map 2D textures onto the spheres. Multi-texturing (day and night textures) is used for the Earth to simulate night lights. Procedural texturing is applied at the "terminator" to create smooth transitions between day and night textures.
- **Shadows**: Simplified Phong shading is used. The normal vectors at each vertex of the sphere are stored in `Sphere.normalArray`. After normalization, the light intensity is calculated to determine the final color. For the Earth, multi-texturing is used: if the diffuse light intensity is below 0.05, the night texture is used; above 0.25, the day texture is used; between 0.05 and 0.25, a blend of both textures is applied for natural visuals.

Textures are sourced from Solar System Scope, including "EARTH DAY MAP", "EARTH NIGHT MAP", "STARS", and "MOON", with necessary cropping and resizing.

<a name="chinese"></a>
## 中文

### 1. 项目简介

本项目中的摄像机和模型的旋转运动都是在以地球为原点的极坐标系中进行的。

模型方面，本项目中出现三个物体的模型（括号内表示该物体在代码中的对应命名）：地球(earth)、月球(moon)、星空贴图的天空盒(starBox)。

光源方面，光照模型采用取正值的Blinn-Phong模型，叠加环境光、镜面反射光和漫反射光。本项目只出现一个可移动的光源（sun），该光源只考虑作用在地球上产生的反射和阴影。月球上的光照和阴影不受到sun光源的移动影响。

初始状况下，地球、月球、摄像头、光源位于同一条直线上。投影模式为透视投影。

默认状况下，所有的三个物体（地球、月球以及天空盒）以地球为原点、在地月所在的水平面上一起自动做逆时针匀速旋转运动。

### 2. 交互操作

- **物体旋转**
  - 按下X键，所有物体立刻在地月所在的水平面上沿顺时针方向移动；
  - 按下V键，所有物体立刻在地月所在的水平面上沿逆时针方向移动；
- **摄像头移动**
  - 鼠标拖拽，摄像头立刻在以地球为原点极坐标系中上、下、左、右移动；
  - 按下Z键，摄像头立刻在以地球为原点极坐标系中向前移动；
  - 按下C键，摄像头立刻在以地球为原点极坐标系中向后移动；
- **光源移动**
  - 按下Q键，光源立刻在地月所在的水平面上沿逆时针方向移动；
  - 按下E键，光源立刻在地月所在的水平面上沿顺时针方向移动；
- **切换投影模式**
  - 按下P键，投影模式在平行投影和透视投影之间来回切换。
- **自动旋转**
  - 按下T键，所有物体立刻停止自动的逆时针旋转，或是立刻开始自动的顺时针旋转。
- **重置摄像头状态**
  - 按下R键，重置摄像头的位置距离和运动状态。

### 3. 项目设计

#### 3.1 项目平台

本项目基于WebGL绘图协议和GLSL ES 3.0版本，运行平台为64位的Chrome v87正式版，并配置为允许跨域文件。

#### 3.2 主要工作

本项目中完成的主要工作是地球、月球、星空天空盒的建模、渲染和投影。

- **建模部分**由球体建模和正方体建模这两大部分构成。建模部分使用了多边形网格建模方法来完成地球、月球这两个球体的建模，以及天空盒这一个正方体的建模。
- **渲染部分**由2D纹理贴图、多重纹理、光照模型、阴影贴图这四大部分构成。渲染部分，2D纹理经由拓扑变换和拉伸变换映射到对应的球面上。使用多重纹理，用白天和黑夜两张纹理来同时渲染地球。光照模型采用了取正值的Blinn-Phong光照模型，搭建一个可移动的定向光光源来模拟太阳的平行光照射。阴影贴图通过计算纹理原来的颜色和光线强度（环境光、镜面反射光和漫反射之和），二者相乘来得到片元的实际颜色。
- **投影部分**由模型变换、视点变换和投影切换这三大部分构成。投影部分，通过键盘的操作交互方式来移动摄像头的位置或旋转地月系来观察模型。为了保证摄像头一直指向地球，摄像头的位置移动以三维极坐标系下的弧度来计算，当渲染每一帧前，需要将极坐标系下的角度转换为直角坐标系下的坐标。观察分为有平行投影、透视投影两种投影方式，为了符合真实感，默认状况下为透视投影。

#### 3.3 设计结构图

本项目的设计结构如下：

##### 3.3.1 场景物体模型设计

本项目中一共出现了三个物体的模型（括号内表示该物体在代码中的对应命名）：地球(earth)、月球(moon)、星空贴图的天空盒(starBox)。其中，地球和月球都使用三位球体作为物体模型，而天空盒则使用正方体作为物体模型。本项目无导入模型。

- **构建三维球体模型**：一个球心位于原点，半径为R的球面三维坐标系可以通过参数方程来表示，换句话说，球面上的每一个三角形的顶点坐标也可以通过参数方程来表示。因此，球面的曲面可以按照经纬线的思路划分为若干个小四边形面片，而每个四边形又可以进一步划分为建模所需的两个小三角形，并通过参数方程来得到三角形的顶点坐标。所有的小三角形坐标共同构成了球面的顶点坐标。在做划分时，相邻两条纬线或经线之间的长度大小可以定义为步长。步长越小，球面的曲面越平滑。本项目中，根据实际需要，步长的大小被设定为1°。
- **构建正方体模型**：正方形模型只需指定8个顶点的坐标即可。本项目中，正方体的边长被设定为150个单位，并依据这一长度来计算顶点的坐标。

##### 3.3.2 观察种的各种变换设计

- **物体变换（模型变换）**：本项目中的物体变换发生在三维极坐标系中，物体的变换以旋转为主，并且主要使用绕y轴（zox平面）的旋转变换。`rotateMatrix`函数负责旋转的流程如下：本项目中，旋转角度（`rotateAngle`）会因为时间变化（自动旋转）或键盘输入（手动旋转）的变化而改变该变量的数值，再根据当前的旋转角度（`rotateAngle`）数值计算出当前表示标准旋转变换的齐次坐标矩阵（`inputMatrix`），最后在视点变换之前根据该矩阵进行模型变换，以实现物体位置的变换。
- **相机变换（视点变换）**：场景中的物体变换都是在三维极坐标系中完成的，而模型的顶点坐标都是直角坐标系下的。因此，当进行相机变换或规范化投影变换时，需要将极坐标转换为直角坐标，其中，都以度数为单位，范围是[0°, 360°]。当达到360时，重新回到为0。
- **规范化投影变换**：与相机变换部分的思路类似，根据平行投影、透视投影两种投影方式得到不同的齐次坐标矩阵（`inputMatrix`），以实现投影变换。

##### 3.3.3 真实感着色设计

- **光照**：光照模型采用了简化后的取正值Blinn-Phong光照模型。
- **纹理**：纹理方面采用了纹理映射、纹理拉伸和线形纹理采样，将2D贴图通过拓扑变换和拉伸变换的方式映射到对应的球面上再进行线形纹理采样。为了提高真实性和美观性，地球模型上采用了多重纹理（白天纹理和夜晚纹理）来额外模拟夜晚的灯光，并运用过程纹理的技术，在"晨昏线"处根据白天纹理和夜晚纹理二者的比例生成图形纹理，以实现平滑的过渡效果。项目中的2D贴图均来自Solar System Scope网站，使用了其中的" EARTH DAY MAP", "EARTH NIGHT MAP", "STARS"以及"MOON"共计四张贴图，并且经过必要的切割和大小调整。
- **阴影**：表面绘制（明暗处理）使用了简化后的Phong Shading，在构建三维球体模型时，球体上的每个多边形的顶点处的法向量都记录在`Sphere.normalArray`中。法向量被送入渲染管线后，先进行归一化后转为单位法向量，再按照光照模型来确定最终的光强，通过公式的计算得到阴影纹理的显示颜色。此外，地球使用了多重纹理，因此地球的阴影处的纹理会由单独的夜晚纹理来替代。当片元的漫反射光强度低于0.05时，就用夜晚的纹理来渲染，作为地球的阴影。反之，当漫反射光光强度高于0.25时，则用白天的纹理进行渲染。当漫反射光在0.05和0.25之间时，使用过程纹理技术，对白天纹理和夜晚纹理进行叠加处理，使视觉效果更为自然。