let canvas;

function setup() {
  let container = document.querySelector('.author__avatar');
  let containerWidth = container.offsetWidth;
  let containerHeight = container.offsetHeight;

  canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(container);
  canvas.style('position', 'absolute');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '-1');
}

function draw() {
  background(255);
  noStroke();

  let tileCount = 10;
  let tileSize = width / tileCount;

  for (let gridY = 0; gridY < tileCount; gridY++) {
    for (let gridX = 0; gridX < tileCount; gridX++) {
      let posX = tileSize * gridX + tileSize / 2;
      let posY = tileSize * gridY + tileSize / 2;

      let d = dist(mouseX, mouseY, posX, posY);
      let diameter = (d / width) * 30;

      fill(0, 50);
      ellipse(posX, posY, diameter, diameter);
    }
  }
}

function windowResized() {
  let container = document.querySelector('.author__avatar');
  let containerWidth = container.offsetWidth;
  let containerHeight = container.offsetHeight;
  resizeCanvas(containerWidth, containerHeight);
}
