var cam
var searchColor = [255,0,0]
var n = 0
var d = 0
var pixel
var r
var g
var b 
var bestB
var blobs = []
var distthreshold = 8
var threshold = 10

var circleX = 0
var circleY = 0
var image1
var points = []
var penSize = 20
function setup() {
	createCanvas(680,480)
	cam = createCapture(VIDEO)
	cam.size((width*5)/10,(height*5/10))
	cam.hide()
	// frameRate(1)

}

function dist(x1,y1,x2,y2){
	var d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1)
	return d
}

function getScore(x1,y1,z1,x2,y2,z2){
	var d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) +(z2-z1)*(z2-z1)
	return d
}

function mousePressed() {
	var loc = (mouseX + mouseY*width) * 4
	var r = image1.pixels[loc]
	var g = image1.pixels[loc+1]
	var b = image1.pixels[loc+2]
	searchColor = [r,g,b]
	circleY = mouseY
	circleX = mouseX
	console.log(r,g,b)
	points = []
}

function keyPressed(){
	background(0)
	points = []
}

function draw() {
	n++
	background(200,0.5)
	image1 = cam.get()
	var w = 680
	var h = 480
	image1.resize(w,h)  
	image(image1,0,0,w,h)
	image1.loadPixels()
	blobs = []


	var bestScore = 3 * (255**2)+100

	var avgx = 0
	var avgY = 0
	var count = 0


	for (var x=0; x<w;x++) {
		for (var y=0; y<h;y++) {
			i = (x + y * w) * 4
			r = image1.pixels[i]			
			g = image1.pixels[i+1]
			b = image1.pixels[i+2]
			tr = searchColor[0]
			tg = searchColor[1]
			tb = searchColor[2]

			let d = getScore(r,g,b,tr,tg,tb)

			if (d < threshold**2) {
				var found = false

				for (var i=0; i<blobs.length; i++){
					let b = blobs[i]
					if (b.isNear(x,y)){
						b.add(x,y)
						found = true
						break
					}
				}

				if (!found){
					blobs.push(new blob(x,y))
				}


				// stroke(255)
				// // ellipse(x,y,1,1)
				// avgx += x
				// avgY += y
				// count++
				// // console.log(x,y)
			}
		}
	}

	// if (count > 0) {
	// 	avgx = avgx/count
	// 	avgY = avgY/count
	// 	fill(0)
	// 	// ellipse(avgx,avgY,2,2)
	// 	points.push([avgx,avgY])

	// }

	if (blobs.length == 1){
		var p = blobs[0].getAverage()
		points.push(p)

	}

	// // fill(tr,tg,tb)
	// // ellipse(circleX,circleY,2,2)
	stroke(51)
	for (var i=0; i<points.length; i++){
		ellipse(points[i][0],points[i][1],penSize,penSize)
	}

	 for (var i = 0; i<blobs.length; i++){
	 	blobs[i].show()
	 }


}

/**

Ideas:
	 Calculate velocity of projectile. -> works better if no screen drawing
	 Improve ojbect detection.

*/