let points = [],
  newPoints = [],
  _numberOfAgents = 7,
  numOfPoints = 8,
  count = 0,
  delay = 150,
  speed = 9,
  colSpeed = 5,
  starting = true,
  col = {
    r: 0,
    g: 0,
    b: 0
  },
  newCol = {
    r: 0,
    g: 0,
    b: 0
  }

var agents = []

function mousePressed() {
  agents = points = []
  noLoop()
  background(0)
  socket.emit('Reset', _numberOfAgents)
}

function keyPressed() {
  if (key == ' ') {
    saveCanvas('waterSong' + count, 'png')
    count += 1
  }
  if (key == 'r') resetSim()
}

function makePoints() {
  points = newPoints.slice()
  col.r = newCol.r;
  col.g = newCol.g;
  col.b = newCol.b
  newPoints = []

  for (let i = 0; i < numOfPoints; i++) {
    newPoints.push({
      x: random(width),
      y: random(height)
    })
  }
  newCol.r = random(255)
  newCol.g = random(255)
  newCol.b = random(255)
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(20)
  for (k = 0; k < _numberOfAgents; k++) agents.push(new Agent(true))
  socket.on('send', (reset) => resetSim())
}

function resetSim() {
  background(0)
  points = []
  starting = true
  agents = []
  for (k = 0; k < _numberOfAgents; k++) agents.push(new Agent(true))
  // agents.push(new Agent(true, 'Janell'))
}

function draw() {
  frameRate(20);

  if (starting) {
    makePoints()
    background(0)
    starting = false
    makePoints()
  }

  if (frameCount % delay == 0) makePoints()

  if (points.length != 0) {
    for (let i = 0; i < points.length; i++) {
      points[i].x += (newPoints[i].x - points[i].x) / (delay / speed)
      points[i].y += (newPoints[i].y - points[i].y) / (delay / speed)
    }
  }

  col.r += (newCol.r - col.r) / (delay / colSpeed)
  col.g += (newCol.g - col.g) / (delay / colSpeed)
  col.b += (newCol.b - col.b) / (delay / colSpeed)

  fill(col.r, col.g, col.b)

  // noStroke()
  beginShape();
  for (let i = 0; i < points.length; i++) vertex(points[i].x, points[i].y)
  endShape(CLOSE);

  stroke(0)
  // for (let b = 0; b < points.length; b++) {
  //      if (b % 2 == 1 && points[b + 1]) line(points[b].x, points[b].y, points[b + 1].x, points[b + 1].y)
  //  }
let al = agents.length
  for (i = 0; i < al; i++) {
    agents[i].show()
    for (let z = 0; z < 1; z++) agents[i].go()
  }
}