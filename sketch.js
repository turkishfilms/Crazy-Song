let paused = 0, 
    cellSize =50,
    _numberOfAgents = 7,
    count = 0,
    starting = true,
    pointClouds = [],
    agents = []

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



function setup() {
  createCanvas(windowWidth, windowHeight)
  background(20)
  for (k = 0; k < _numberOfAgents; k++) agents.push(new Agent(true))
  socket.on('send', (reset) => resetSim())
  	for(let i = 0; i < floor(width/cellSize); i++){
		for(let j = 0; j < floor(height/cellSize); j++){
			pointClouds.push(new PointCloud({delay:10,speed:2,pointCount:5,pointRange:{wmin:i*cellSize,wmax:(i+1)*cellSize,hmin:j*cellSize,hmax:(j+1)*cellSize}}))
		}
	}

}

function resetSim() {
  background(0)
  points = []
  starting = true
  agents = []
  for (k = 0; k < _numberOfAgents; k++) agents.push(new Agent(true))
  // agents.push(new Agent(true, 'Janell'))
}

const initPointClouds = () =>{
	pointClouds.forEach((pointCloud)=>{
		pointCloud.nextTransition(pointCloud.newPoints,pointCloud.newCol,
									pointCloud.pointRange,pointCloud.colRange)
		pointCloud.nextTransition(pointCloud.newPoints,pointCloud.newCol,
									pointCloud.pointRange,pointCloud.colRange)
	})
}
function draw() {
  frameRate(20);
  
  if (starting) {
    initPointClouds()
    background(0)
    starting = false
  }

 pointClouds.forEach((pointCloud)=>{
		if(frameCount % pointCloud.delay == 0){
			pointCloud.nextTransition(pointCloud.newPoints,pointCloud.newCol,
											pointCloud.pointRange,pointCloud.colRange)
			}
		pointCloud.show()
	})
  // noStroke()

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