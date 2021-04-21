//CS 488 Lab 6
//2-26-2021
//Chase Vestal
//Kush Gupta
//Nick Koldys
//Sami Kommu

let mouseSphere0 = null;
let rotation = null;
let previousRotation = null;

//Register this click as our anchor point
function start(mousePixels){
    this.mouseSphere0 = this.pixelsToSphere(mousePixels);
}

//Make the rotation based off where the mouse goes after
function drag(mousePixels, multiplier){
    mouseSphere = this.pixelsToSphere(mousePixels);
    dot = this.mouseSphere0.dot(mouseSphere);
    if (Math.abs(dot) < 0.9999) {
      radians = acos(dot) * multiplier;
      axis = this.mouseSphere0.cross(mouseSphere).normalize();
      currentRotation = Matrix4.rotateAroundAxis(axis, radians * 180 / pi);
      this.rotation = currentRotation * this.previousRotation;
    }
}

//Commit the rotation and clean up stale data.
function end(){
    this.previousRotation = this.previousRotation;
    this.mouseSphere0 = null;
}

// Restore the previous rotation.
function cancel(){
  this.rotation = this.previousRotation;
  this.mouseSphere0 = null;
}

