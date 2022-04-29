
const crazyBatchOfPointClouds = (width,height) =>{
	//pointClouds.push(new PointCloud({pointRange:{wmin:0,wmax:width,hmin:0,hmax:height}}))
	pointClouds.push(new PointCloud({colRange:{min:0,max:100},delay:20,pointRange:{wmin:0,wmax:width/2,hmin:0,hmax:height/2}}))
	pointClouds.push(new PointCloud({speed:1,pointRange:{wmin:width/2,wmax:width,hmin:0,hmax:height/2}}))
	pointClouds.push(new PointCloud({pointCount:4,delay: 150,speed:30, pointRange:{wmin:0,wmax:width/2,hmin:height/2,hmax:height}}))
	pointClouds.push(new PointCloud({colRange:{min:150,max:255},pointCount:23,pointRange:{wmin:width/2,wmax:width,hmin:height/2,hmax:height}}))
//	pointClouds.push(new PointCloud({pointRange:{wmin:5*width/11,wmax:6*width/11,hmin:5*height/11,hmax:6*height/11}}))
}


class PointCloud{
	constructor({speed=7, colSpeed= 5, delay=100,
		pointCount = 12, colRange = {min:50,max:250},
		points = [], newPoints = [], col = [0,0,0], 
		newCol = [255,0,0], pointRange = {wmin:0,wmax:1,hmin:0,hmax:1}, paused = 0}={}){
		this.speed = speed
		this.colSpeed = colSpeed
		this.delay = delay
		this.pointCount = pointCount
		this.colRange = colRange
		this.pointRange = pointRange
		this.points = points
		this.newPoints = newPoints
		this.col = col 
		this.newCol = newCol
		this.paused = paused
		this.nextTransition(this.newPoints,this.newCol,this.pointRange,this.colRange)
		this.nextTransition(this.newPoints,this.newCol,this.pointRange,this.colRange)
} //61

	nextTransition(nextPoints, newColor, pointRange, colRange){
		this.points = nextPoints.slice()
		this.newPoints = this.updatePoints(pointRange)
		this.col = newColor.slice()
		this.newCol = this.updateColor(colRange) //33
	}

	changeColor(){
 		this.col.forEach((val,i)=>{
			this.col[i] += this.colorTransitionAmt(this.col[i],this.newCol[i], this.delay, this.colSpeed)
		})
	}

	pointTransitionAmt(point1, point2, delay, speed){
		return (point1 - point2) / (delay/speed)
	}

	colorTransitionAmt(val1, val2, delay, colSpeed){
		return (val2 - val1) / (delay / colSpeed)
	}

	updateColor({min,max}){
		const newCol = []
  		for(let i = 0; i < 3; i++) newCol[i] = random(min,max)
		return newCol
	}

	updatePoints({wmin,wmax,hmin,hmax}){
 		const newPoints = []
		for(let j = 0; j < this.pointCount; j++) newPoints.push([random(wmin,wmax),random(hmin,hmax)])
		return newPoints
	}

	show(){
		this.changeColor()
		fill(this.col[0], this.col[1], this.col[2])
		beginShape();
  			this.points.forEach((point,i)=>{
				point.forEach((val,j)=>{
					this.points[i][j] += this.pointTransitionAmt(this.newPoints[i][j], this.points[i][j], this.delay, this.speed)
				})
				vertex(this.points[i][0], this.points[i][1])
			})
  		endShape();
	}
}


