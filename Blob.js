class blob{

	constructor(x,y){
		this.minx = x
		this.miny = y
		this.maxx = x
		this.maxy = y
	}

	getAverage(){
		return [(this.minx + this.maxx)/2,(this.miny + this.maxy)/2]
	}

	isNear(x,y){
		var cx = (this.minx + this.maxx)/2
		var cy = (this.miny + this.maxy)/2
		var d = dist(cx,cy,x,y)

		if (d < distthreshold**2){
			return true
		}else{
			return false
		}
	} 

	add(x,y){
		this.minx = min(this.minx, x)
		this.miny = min(this.miny, y)
		this.maxx = max(this.maxx, x)
		this.maxy = max(this.maxy, y)
	}

	show(){
		stroke(0)
		fill(200)
		strokeWeight(2)
		rectMode(CORNERS)
		rect(this.minx,this.miny,this.maxx,this.maxy)
	}

}