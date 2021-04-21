import { VertexArray } from './VertexArray';
import { VertexAttributes } from './VertexAttributes';
import { ShaderProgram } from './ShaderProgram';
import { Matrix4 } from './Matrix4';

// get our canvas
const canvas = document.getElementById('canvas');
window.gl = canvas.getContext('webgl2');

// declare variables
let shaderProgram;
let vertexArray;
let worldToClip;
let modelToWorld;
let positions = [];
let faces = [];
let colors = [];

function render() {
  // set screen up
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.7, 0.7, 0.7, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  //draw the points/shapes
  shaderProgram.bind();
  shaderProgram.setUniformMatrix4('worldToClip', worldToClip);
  shaderProgram.setUniformMatrix4('modelToWorld', modelToWorld);
  vertexArray.bind();
  vertexArray.drawIndexed(gl.TRIANGLES);
  vertexArray.unbind();
  shaderProgram.unbind();
}

function onSizeChanged() {
  // resize to correct
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  const aspectRatio = canvas.width / canvas.height;
  let right;
  let top;

  if (aspectRatio < 1) {
    right = 3;
    top = right / aspectRatio;
  } else {
    top = 3;
    right = top * aspectRatio;
  }
  worldToClip = Matrix4.ortho(-right, right, -top, top, -10, 10);
  render();
}

function centerSculpture() {
  let xmax = 0;
  let xmin = 0;
  let ymax = 0;
  let ymin = 0;
  let zmax = 0;
  let zmin = 0;

  for(var i = 0; i < positions.length; i+=3) {
    if(positions[i] > xmax) {
      xmax = positions[i];
    }
    if(positions[i] < xmin) {
      xmin = positions[i];
    }
    if(positions[i+1] > ymax) {
      ymax = positions[i+1];
    }
    if(positions[i+1] < ymin) {
      ymin = positions[i+1];
    }
    if(positions[i+2] > zmax) {
      zmax = positions[i+2];
    }
    if(positions[i+2] < zmin) {
      zmin = positions[i+2];
    }
  }

  const xadj = (xmin + xmax) / 2;
  const yadj = (ymin + ymax) / 2;
  const zadj = (zmin + zmax) / 2;

  for(var j = 0; j < positions.length; j+=3) {
    let tempx = positions[j];
    let tempy = positions[j+1];
    let tempz = positions[j+2];

    positions[j] = tempx - xadj;
    positions[j+1] = tempy - yadj;
    positions[j+2] = tempz - zadj;
  }
}

function putPositionsFacesColors(boxInfo, index) {
    const numbers = boxInfo.split(' ');
    const x = parseFloat(numbers[0]);
    const y = parseFloat(numbers[1]);
    const z = parseFloat(numbers[2]);
    const width = parseFloat(numbers[3]);
    const height = parseFloat(numbers[4]);
    const depth = parseFloat(numbers[5]);

    //vertex 1 position
    positions.push(-1 * (x - (width/2.0)));
    positions.push(-1 * (y - (height/2.0)));
    positions.push(-1 * (z + (depth/2.0)));
    //vertex 2 position
    positions.push(-1 * (x + (width/2.0)));
    positions.push(-1 * (y - (height/2.0)));
    positions.push(-1 * (z + (depth/2.0)));
    //vertex 3 position
    positions.push(-1 * (x - (width/2.0)));
    positions.push(-1 * (y + (height/2.0)));
    positions.push(-1 * (z + (depth/2.0)));
    //vertex 4 position
    positions.push(-1 * (x + (width/2.0)));
    positions.push(-1 * (y + (height/2.0)));
    positions.push(-1 * (z + (depth/2.0)));
    //vertex 5 position
    positions.push(-1 * (x - (width/2.0)));
    positions.push(-1 * (y - (height/2.0)));
    positions.push(-1 * (z - (depth/2.0)));
    //vertex 6 position
    positions.push(-1 * (x + (width/2.0)));
    positions.push(-1 * (y - (height/2.0)));
    positions.push(-1 * (z - (depth/2.0)));
    //vertex 7 position
    positions.push(-1 * (x - (width/2.0)));
    positions.push(-1 * (y + (height/2.0)));
    positions.push(-1 * (z - (depth/2.0)));
    //vertex 8 position
    positions.push(-1 * (x + (width/2.0)));
    positions.push(-1 * (y + (height/2.0)));
    positions.push(-1 * (z - (depth/2.0)));

    //front face
    faces.push(0+(index*8));
    faces.push(1+(index*8));
    faces.push(2+(index*8));
    faces.push(1+(index*8));
    faces.push(3+(index*8));
    faces.push(2+(index*8));
    //back face
    faces.push(4+(index*8));
    faces.push(5+(index*8));
    faces.push(6+(index*8));
    faces.push(5+(index*8));
    faces.push(7+(index*8));
    faces.push(6+(index*8));
    //top face
    faces.push(2+(index*8));
    faces.push(3+(index*8));
    faces.push(6+(index*8));
    faces.push(3+(index*8));
    faces.push(7+(index*8));
    faces.push(6+(index*8));
    //bottom face
    faces.push(4+(index*8));
    faces.push(5+(index*8));
    faces.push(0+(index*8));
    faces.push(5+(index*8));
    faces.push(1+(index*8));
    faces.push(0+(index*8));
    //right face
    faces.push(1+(index*8));
    faces.push(5+(index*8));
    faces.push(3+(index*8));
    faces.push(5+(index*8));
    faces.push(7+(index*8));
    faces.push(3+(index*8));
    //left face
    faces.push(4+(index*8));
    faces.push(0+(index*8));
    faces.push(6+(index*8));
    faces.push(0+(index*8));
    faces.push(2+(index*8));
    faces.push(6+(index*8));

    //vertex 1 color
    colors.push(0);
    colors.push(0);
    colors.push(0);
    //vertex 2 color
    colors.push(1);
    colors.push(0);
    colors.push(0);
    //vertex 3 color
    colors.push(0);
    colors.push(1);
    colors.push(0);
    //vertex 4 color
    colors.push(1);
    colors.push(1);
    colors.push(0);
    //vertex 5 color
    colors.push(0);
    colors.push(0);
    colors.push(1);
    //vertex 6 color
    colors.push(1);
    colors.push(0);
    colors.push(1);
    //vertex 7 color
    colors.push(0);
    colors.push(1);
    colors.push(1);
    //vertex 8 color
    colors.push(1);
    colors.push(1);
    colors.push(1);
}

async function initialize() {
  // get input and split into boxes
  const response = await fetch('storageshelf');
  const text = await response.text();
  const boxes = text.split('\n');

  // call putPositionsFacesColors() for each box to generate positions, faces, and colors
  for(var i = 0; i < boxes.length; i++) {
    putPositionsFacesColors(boxes[i],i);
  }

  centerSculpture();

  // add points and faces to attributes
  const attributes = new VertexAttributes();
  attributes.addAttribute('position', (8*boxes.length), 3, positions);
  attributes.addAttribute('color',(8*boxes.length), 3, colors);
  attributes.addIndices(faces);

  // vertex shader
  const vertexSource = `
    uniform mat4 worldToClip;
    uniform mat4 modelToWorld;

    in vec3 position;
    in vec3 color;

    out vec3 fcolor;

    void main() {
      gl_Position = worldToClip * modelToWorld * vec4(position, 1.0);
      fcolor = color;
    }
  `;

  //fragment shader
  const fragmentSource = `
    in vec3 fcolor;

    out vec4 fragmentColor;

    void main() {
      fragmentColor = vec4(fcolor, 1.0);
    }
  `;

  // pair the vertex and fragment shaders
  shaderProgram = new ShaderProgram(vertexSource, fragmentSource);
  vertexArray = new VertexArray(shaderProgram, attributes);

  modelToWorld = Matrix4.identity();

  window.addEventListener('keydown', event => {
    if(event.key === 'ArrowUp') {
     modelToWorld = Matrix4.multiplyMatrix4(Matrix4.rotateX(-25), modelToWorld);
      render();
    } else if(event.key === 'ArrowDown') {
      modelToWorld = Matrix4.multiplyMatrix4(Matrix4.rotateX(25), modelToWorld);
      render();
    } else if(event.key === 'ArrowRight') {
      modelToWorld = Matrix4.multiplyMatrix4(Matrix4.rotateY(25), modelToWorld);
      render();
    } else if(event.key === 'ArrowLeft') {
      modelToWorld = Matrix4.multiplyMatrix4(Matrix4.rotateY(-25), modelToWorld);
      render();
    }
  });

  // add resize listner and resize
  window.addEventListener('resize', onSizeChanged);
  onSizeChanged();
}

// call intialize to draw everything
initialize();