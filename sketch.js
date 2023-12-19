 let p;
 let points = [];

 let trainingIndex = 0;

function setup() {
  createCanvas(500, 300);
  p = new Perceptron();
  
  for (let i = 0; i < 100; i++) {
    points[i] = new Point();
  }

}

function draw() {
  background(0,100,0);
  stroke(0);
  
  let p1 = new Point(-1, f(-1));
  let p2 = new Point(1, f(1));
  line(width/2 ,  0 , width/2 , height);
  line(0 , height/2 , width , height/2);
  line(p1.getPixelX(), p1.getPixelY(), p2.getPixelX(), p2.getPixelY());


  let p1_ = new Point(-1, p.guessY(-1));
  let p2_ = new Point(1, p.guessY(1));

  line(p1_.getPixelX(), p1_.getPixelY(), p2_.getPixelX(), p2_.getPixelY());

  for (let i = 0; i < points.length; i++) {
    points[i].show();
  }

  for (let i = 0; i < points.length; i++) {

    let inputs = [points[i].x , points[i].y, points[i].bias];
    let target = points[i].label;

    let guess = p.guess(inputs);

    if(guess == target) {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
    }
    noStroke();
    ellipse(points[i].getPixelX(), points[i].getPixelY(), 8, 8);

  }

  let training = points[trainingIndex];
  let inputs = [training.x , training.y , training.bias];
  let target = training.label
  p.train(inputs, target);
  trainingIndex++;

  if(trainingIndex == points.length) {
    trainingIndex = 0;
  }

}


function f(x) {
  return 2 * x  ;
}


function sign(n) {

  if (n >= 0) {
    return 1;
  } else {
    return -1;
  }
}

class Perceptron {


constructor() {
  this.weights = [];
  this.learning_rate = 0.10;

  //initialize the weigths randomly
  for (let i = 0; i < 3; i++) {
    this.weights[i] = random(-1, 1);

  }
}

  guess = function(inputs) {

    let sum = 0;

    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }

    let output = sign(sum);
    return output;

  }

  train = function(inputs , target) {

    let guess = this.guess(inputs);

    let error = target - guess;

    //tune all the weights
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.learning_rate;
    }
  }

  guessY = function (x) {

    
    let w0 = this.weights[0];
    let w1 = this.weights[1];
    let w2 = this.weights[2];

    return -(w2 / w1) - (w0 / w1) * x;

  }

   }



   class Point {
    constructor(x, y, bias) {
      if (x !== undefined && y !== undefined) {
        // If x and y are provided, use them directly
        this.x = x;
        this.y = y;
        this.bias = bias;

      } else {
        // If x and y are not provided, generate random values
        this.x = random(-1, 1);
        this.y = random(-1, 1);
        this.bias = 1;
      }
  
      let lineY = f(this.x);
      // Determine the label based on the generated or provided values
      this.label = this.y> lineY ? 1 : -1;
    }
  
    getPixelX() {
      return map(this.x, -1, 1, 0, width);
    }
  
    getPixelY() {
      return map(this.y, -1, 1, height, 0);
    }
  
    show() {
      stroke(0);
      if (this.label == 1) {
        fill(255);
      } else {
        fill(0);
      }
  
      noStroke();
      ellipse(this.getPixelX(), this.getPixelY(), 8, 8);
    }
  }
  