
// window.addEventListener('DOMContentLoaded', (event) => {

    const squaretable = {} // this section of code is an optimization for use of the hypotenuse function on Line and LineOP objects
    for(let t = 0;t<10000000;t++){
        squaretable[`${t}`] = Math.sqrt(t)
        if(t > 999){
            t+=9
        }
    }
    const gamepadAPI = {
        controller: {},
        turbo: true,
        connect: function (evt) {
            if (navigator.getGamepads()[0] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            } else if (navigator.getGamepads()[1] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            } else if (navigator.getGamepads()[2] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            } else if (navigator.getGamepads()[3] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            }
            for (let i = 0; i < gamepads.length; i++) {
                if (gamepads[i] === null) {
                    continue;
                }
                if (!gamepads[i].connected) {
                    continue;
                }
            }
        },
        disconnect: function (evt) {
            gamepadAPI.turbo = false;
            delete gamepadAPI.controller;
        },
        update: function () {
            gamepadAPI.controller = navigator.getGamepads()[0]
            gamepadAPI.buttonsCache = [];// clear the buttons cache
            for (var k = 0; k < gamepadAPI.buttonsStatus.length; k++) {// move the buttons status from the previous frame to the cache
                gamepadAPI.buttonsCache[k] = gamepadAPI.buttonsStatus[k];
            }
            gamepadAPI.buttonsStatus = [];// clear the buttons status
            var c = gamepadAPI.controller || {}; // get the gamepad object
            var pressed = [];
            if (c.buttons) {
                for (var b = 0, t = c.buttons.length; b < t; b++) {// loop through buttons and push the pressed ones to the array
                    if (c.buttons[b].pressed) {
                        pressed.push(gamepadAPI.buttons[b]);
                    }
                }
            }
            var axes = [];
            if (c.axes) {
                for (var a = 0, x = c.axes.length; a < x; a++) {// loop through axes and push their values to the array
                    axes.push(c.axes[a].toFixed(2));
                }
            }
            gamepadAPI.axesStatus = axes;// assign received values
            gamepadAPI.buttonsStatus = pressed;
            // //console.log(pressed); // return buttons for debugging purposes
            return pressed;
        },
        buttonPressed: function (button, hold) {
            var newPress = false;
            for (var i = 0, s = gamepadAPI.buttonsStatus.length; i < s; i++) {// loop through pressed buttons
                if (gamepadAPI.buttonsStatus[i] == button) {// if we found the button we're looking for...
                    newPress = true;// set the boolean variable to true
                    if (!hold) {// if we want to check the single press
                        for (var j = 0, p = gamepadAPI.buttonsCache.length; j < p; j++) {// loop through the cached states from the previous frame
                            if (gamepadAPI.buttonsCache[j] == button) { // if the button was already pressed, ignore new press
                                newPress = false;
                            }
                        }
                    }
                }
            }
            return newPress;
        },
        buttons: [
            'A', 'B', 'X', 'Y', 'LB', 'RB', 'Left-Trigger', 'Right-Trigger', 'Back', 'Start', 'Axis-Left', 'Axis-Right', 'DPad-Up', 'DPad-Down', 'DPad-Left', 'DPad-Right', "Power"
        ],
        buttonsCache: [],
        buttonsStatus: [],
        axesStatus: []
    };
    
let video_recorder
let recording = 0
    
//  function CanvasCaptureToWEBM(canvas, bitrate) {
//     // it uses the same canvas as the rest of the file.
//     // to start a recording call .record() on video_recorder
//     this.record = Record
//     this.stop = Stop
//     this.download = saveToDownloads
//     let blobCaptures = []
//     let outputFormat = {}
//     let recorder = {}
//     let canvasInput = canvas.captureStream()
//     if (typeof canvasInput == undefined || !canvasInput) {
//         return
//     }
//     const video = document.createElement('video')
//     video.style.display = 'none'
// 
// 
//     function Record() {
//         let formats = [
//             "video/webm\;codecs=h264",
//             "video/webm\;codecs=vp8",
//             'video/vp8',
//             "video/webm",
//             'video/webm,codecs=vp9',
//             "video/webm\;codecs=daala",
//             "video/mpeg"
//         ];
//         for (let t = 0; t < formats.length; t++) {
//             if (MediaRecorder.isTypeSupported(formats[t])) {
//                 outputFormat = formats[t]
//                 break
//             }
//         }
//         if (typeof outputFormat != "string") {
//             return
//         } else {
//             let videoSettings = {
//                 mimeType: outputFormat,
//                 videoBitsPerSecond: bitrate || 2000000
// 
//             };
//             blobCaptures = []
//             try {
//                 recorder = new MediaRecorder(canvasInput, videoSettings)
//             } catch (error) {
//                 return;
//             }
//             recorder.onstop = handleStop
//             recorder.ondataavailable = handleAvailableData
//             recorder.start(100)
//         }
//     }
// 
//     function handleAvailableData(event) {
//         if (event.data && event.data.size > 0) {
//             blobCaptures.push(event.data)
//         }
//     }
// 
//     function handleStop() {
//         const superBuffer = new Blob(blobCaptures, { type: outputFormat, duration: rectime })
//         video.src = window.URL.createObjectURL(superBuffer)
//     }
// 
//     function Stop() {
//         recorder.stop()
//         video.controls = true
//         video.duration = rectime
//     }
// 
//     function saveToDownloads(input) { // specifying a file name for the output
//         const name = input || 'video_out.webm'
//         const blob = new Blob(blobCaptures, { type: outputFormat, duration: rectime })
//         blob.duration = rectime
//         //////////////////console.log(blob)
//         const url = window.URL.createObjectURL(blob)
//         const storageElement = document.createElement('a')
//         storageElement.style.display = 'none'
//         storageElement.href = url
//         storageElement.download = name
//         document.body.appendChild(storageElement)
//         storageElement.click()
//         setTimeout(() => {
//             document.body.removeChild(storageElement)
//             window.URL.revokeObjectURL(url)
//         }, 100)
//     }
// }



    let canvas
    let canvas_context
    let keysPressed = {}
    let FLEX_engine
    let TIP_engine = {}
    let XS_engine
    let YS_engine
    TIP_engine.x = 1000
    TIP_engine.y = 350
    class Point {
        constructor(x, y) {
            this.x = x
            this.y = y
            this.radius = 0
        }
        pointDistance(point) {
            return (new LineOP(this, point, "transparent", 0)).hypotenuse()
        }
    }

    class Vector{ // vector math and physics if you prefer this over vector components on circles
        constructor(object = (new Point(0,0)), xmom = 0, ymom = 0){
            this.xmom = xmom
            this.ymom = ymom
            this.object = object
        }
        isToward(point){
            let link = new LineOP(this.object, point)
            let dis1 = link.sqrDis()
            let dummy = new Point(this.object.x+this.xmom, this.object.y+this.ymom)
            let link2 = new LineOP(dummy, point)
            let dis2 = link2.sqrDis()
            if(dis2 < dis1){
                return true
            }else{
                return false
            }
        }
        rotate(angleGoal){
            let link = new Line(this.xmom, this.ymom, 0,0)
            let length = link.hypotenuse()
            let x = (length * Math.cos(this.angleGoal))
            let y = (length * Math.sin(this.angleGoal))
            this.xmom = x
            this.ymom = y
        }
        magnitude(){
            return (new Line(this.xmom, this.ymom, 0,0)).hypotenuse()
        }
        normalize(size = 1){
            let magnitude = this.magnitude()
            this.xmom/=magnitude
            this.ymom/=magnitude
            this.xmom*=size
            this.ymom*=size
        }
        multiply(vect){
            let point = new Point(0,0)
            let end = new Point(this.xmom+vect.xmom, this.ymom+vect.ymom)
            return point.pointDistance(end)
        }
        add(vect){
            return new Vector(this.object, this.xmom+vect.xmom, this.ymom+vect.ymom)
        }
        subtract(vect){
            return new Vector(this.object, this.xmom-vect.xmom, this.ymom-vect.ymom)
        }
        divide(vect){
            return new Vector(this.object, this.xmom/vect.xmom, this.ymom/vect.ymom) //be careful with this, I don't think this is right
        }
        draw(){
            let dummy = new Point(this.object.x+this.xmom, this.object.y+this.ymom)
            let link = new LineOP(this.object, dummy, "#FFFFFF", 1)
            link.draw()
        }
    }
    class Line {
        constructor(x, y, x2, y2, color, width) {
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        angle() {
            return Math.atan2(this.y1 - this.y2, this.x1 - this.x2)
        }
        squareDistance() {
            let xdif = this.x1 - this.x2
            let ydif = this.y1 - this.y2
            let squareDistance = (xdif * xdif) + (ydif * ydif)
            return squareDistance
        }
        hypotenuse() {
            let xdif = this.x1 - this.x2
            let ydif = this.y1 - this.y2
            let hypotenuse = (xdif * xdif) + (ydif * ydif)
            if(hypotenuse < 10000000-1){
                if(hypotenuse > 1000){
                    return squaretable[`${Math.round(10*Math.round((hypotenuse*.1)))}`]
                }else{
                return squaretable[`${Math.round(hypotenuse)}`]
                }
            }else{
                return Math.sqrt(hypotenuse)
            }
        }
        draw() {
            let linewidthstorage = canvas_context.lineWidth
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = this.width
            canvas_context.beginPath()
            canvas_context.moveTo(this.x1, this.y1)
            canvas_context.lineTo(this.x2, this.y2)
            canvas_context.stroke()
            canvas_context.lineWidth = linewidthstorage
        }
    }
    class LineOP {
        constructor(object, target, color, width) {
            this.object = object
            this.target = target
            this.color = color
            this.width = width
        }
        squareDistance() {
            let xdif = this.object.x - this.target.x
            let ydif = this.object.y - this.target.y
            let squareDistance = (xdif * xdif) + (ydif * ydif)
            return squareDistance
        }
        hypotenuse() {
            let xdif = this.object.x - this.target.x
            let ydif = this.object.y - this.target.y
            let hypotenuse = (xdif * xdif) + (ydif * ydif)
//             if(hypotenuse < 10000000-1){
//                 if(hypotenuse > 1000){
//                     return squaretable[`${Math.round(10*Math.round((hypotenuse*.1)))}`]
//                 }else{
//                 return squaretable[`${Math.round(hypotenuse)}`]
//                 }
//             }else{
                return Math.sqrt(hypotenuse)
//             }
        }
        angle() {
            return Math.atan2(this.object.y - this.target.y, this.object.x - this.target.x)
        }
        draw() {
            let linewidthstorage = canvas_context.lineWidth
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = this.width
            canvas_context.beginPath()
            canvas_context.moveTo(this.object.x, this.object.y)
            canvas_context.lineTo(this.target.x, this.target.y)
            canvas_context.stroke()
            canvas_context.lineWidth = linewidthstorage
        }
    }
    class Triangle {
        constructor(x, y, color, length, fill = 0, strokeWidth = 0, leg1Ratio = 1, leg2Ratio = 1, heightRatio = 1) {
            this.x = x
            this.y = y
            this.color = color
            this.length = length
            this.x1 = this.x + this.length * leg1Ratio
            this.x2 = this.x - this.length * leg2Ratio
            this.tip = this.y - this.length * heightRatio
            this.accept1 = (this.y - this.tip) / (this.x1 - this.x)
            this.accept2 = (this.y - this.tip) / (this.x2 - this.x)
            this.fill = fill
            this.stroke = strokeWidth
        }
        draw() {
            canvas_context.strokeStyle = this.color
            canvas_context.stokeWidth = this.stroke
            canvas_context.beginPath()
            canvas_context.moveTo(this.x, this.y)
            canvas_context.lineTo(this.x1, this.y)
            canvas_context.lineTo(this.x, this.tip)
            canvas_context.lineTo(this.x2, this.y)
            canvas_context.lineTo(this.x, this.y)
            if (this.fill == 1) {
                canvas_context.fill()
            }
            canvas_context.stroke()
            canvas_context.closePath()
        }
        isPointInside(point) {
            if (point.x <= this.x1) {
                if (point.y >= this.tip) {
                    if (point.y <= this.y) {
                        if (point.x >= this.x2) {
                            this.accept1 = (this.y - this.tip) / (this.x1 - this.x)
                            this.accept2 = (this.y - this.tip) / (this.x2 - this.x)
                            this.basey = point.y - this.tip
                            this.basex = point.x - this.x
                            if (this.basex == 0) {
                                return true
                            }
                            this.slope = this.basey / this.basex
                            if (this.slope >= this.accept1) {
                                return true
                            } else if (this.slope <= this.accept2) {
                                return true
                            }
                        }
                    }
                }
            }
            return false
        }
    }
    class Rectangle {
        constructor(x, y, width, height, color, fill = 1, stroke = 0, strokeWidth = 1) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
            this.stroke = stroke
            this.strokeWidth = strokeWidth
            this.fill = fill
        }
        draw() {
            canvas_context.strokeStyle = "white"
            canvas_context.fillStyle = this.color
            canvas_context.lineWidth = "1"
            canvas_context.fillRect(this.x, this.y, this.width, this.height)
            canvas_context.strokeRect(this.x, this.y, this.width, this.height)
        }
        sdraw() {
            canvas_context.strokeStyle = "white"
            canvas_context.lineWidth = "6"
            canvas_context.strokeRect(this.x, this.y, this.width, this.height)
        }
        move() {
            this.x += this.xmom
            this.y += this.ymom
        }
        isPointInside(point) {
            if (point.x >= this.x) {
                if (point.y >= this.y) {
                    if (point.x <= this.x + this.width) {
                        if (point.y <= this.y + this.height) {
                            return true
                        }
                    }
                }
            }
            return false
        }
        doesPerimeterTouch(point) {
            if (point.x + point.radius >= this.x) {
                if (point.y + point.radius >= this.y) {
                    if (point.x - point.radius <= this.x + this.width) {
                        if (point.y - point.radius <= this.y + this.height) {
                            return true
                        }
                    }
                }
            }
            return false
        }
    }
    class Circle {
        constructor(x, y, radius, color, xmom = 0, ymom = 0, friction = 1, reflect = 0, strokeWidth = 0, strokeColor = "transparent") {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.friction = friction
            this.reflect = reflect
            this.strokeWidth = strokeWidth
            this.strokeColor = strokeColor
        }
        ddraw(){
            
            guy.canvas_context.lineWidth = this.strokeWidth
            guy.canvas_context.strokeStyle = "black"
            guy.canvas_context.beginPath();
                guy.canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true)
                guy.canvas_context.fillStyle = this.color
                guy.canvas_context.fill()
//                 guy.canvas_context.stroke();
        }
        draw() {
            canvas_context.lineWidth = this.strokeWidth
            canvas_context.strokeStyle = this.color
            canvas_context.beginPath();
            if (this.radius > 0) {
                canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true)
                canvas_context.fillStyle = this.color
                canvas_context.fill()
                canvas_context.stroke();
            } else {
                //console.log("The circle is below a radius of 0, and has not been drawn. The circle is:", this)
            }
        }
        move() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
        }
        unmove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x -= this.xmom
            this.y -= this.ymom
        }
        frictiveMove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
            this.xmom *= this.friction
            this.ymom *= this.friction
        }
        frictiveunMove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.xmom /= this.friction
            this.ymom /= this.friction
            this.x -= this.xmom
            this.y -= this.ymom
        }
        isPointInside(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= (this.radius * this.radius)) {
                return true
            }
            return false
        }
        doesPerimeterTouch(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= ((this.radius + point.radius) * (this.radius + point.radius))) {
                return true
            }
            return false
        }
    } 
    class CircleRing {
        constructor(x, y, radius, color, xmom = 0, ymom = 0, friction = 1, reflect = 0, strokeWidth = 0, strokeColor = "transparent") {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.friction = friction
            this.reflect = reflect
            this.strokeWidth = 1
            this.strokeColor = strokeColor
        }
        draw() {
            canvas_context.lineWidth = this.strokeWidth
            canvas_context.strokeStyle = this.color
            canvas_context.beginPath();
            if (this.radius > 0) {
                canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true)
                canvas_context.fillStyle = this.color
//                 canvas_context.fill()
                canvas_context.stroke();
            } else {
                //console.log("The circle is below a radius of 0, and has not been drawn. The circle is:", this)
            }
        }
        move() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
        }
        unmove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x -= this.xmom
            this.y -= this.ymom
        }
        frictiveMove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
            this.xmom *= this.friction
            this.ymom *= this.friction
        }
        frictiveunMove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.xmom /= this.friction
            this.ymom /= this.friction
            this.x -= this.xmom
            this.y -= this.ymom
        }
        isPointInside(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= (this.radius * this.radius)) {
                return true
            }
            return false
        }
        doesPerimeterTouch(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= ((this.radius + point.radius) * (this.radius + point.radius))) {
                return true
            }
            return false
        }
    } class Polygon {
        constructor(x, y, size, color, sides = 3, xmom = 0, ymom = 0, angle = 0, reflect = 0) {
            if (sides < 2) {
                sides = 2
            }
            this.reflect = reflect
            this.xmom = xmom
            this.ymom = ymom
            this.body = new Circle(x, y, size - (size * .293), "transparent")
            this.nodes = []
            this.angle = angle
            this.size = size
            this.color = color
            this.angleIncrement = (Math.PI * 2) / sides
            this.sides = sides
            for (let t = 0; t < sides; t++) {
                let node = new Circle(this.body.x + (this.size * (Math.cos(this.angle))), this.body.y + (this.size * (Math.sin(this.angle))), 0, "transparent")
                this.nodes.push(node)
                this.angle += this.angleIncrement
            }
        }
        isPointInside(point) { // rough approximation
            this.body.radius = this.size - (this.size * .293)
            if (this.sides <= 2) {
                return false
            }
            this.areaY = point.y - this.body.y
            this.areaX = point.x - this.body.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= (this.body.radius * this.body.radius)) {
                return true
            }
            return false
        }
        move() {
            if (this.reflect == 1) {
                if (this.body.x > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.body.y > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.body.x < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.body.y < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.body.x += this.xmom
            this.body.y += this.ymom
        }
        draw() {
            this.nodes = []
            this.angleIncrement = (Math.PI * 2) / this.sides
            this.body.radius = this.size - (this.size * .293)
            for (let t = 0; t < this.sides; t++) {
                let node = new Circle(this.body.x + (this.size * (Math.cos(this.angle))), this.body.y + (this.size * (Math.sin(this.angle))), 0, "transparent")
                this.nodes.push(node)
                this.angle += this.angleIncrement
            }
            canvas_context.strokeStyle = this.color
            canvas_context.fillStyle = this.color
            canvas_context.lineWidth = 0
            canvas_context.beginPath()
            canvas_context.moveTo(this.nodes[0].x, this.nodes[0].y)
            for (let t = 1; t < this.nodes.length; t++) {
                canvas_context.lineTo(this.nodes[t].x, this.nodes[t].y)
            }
            canvas_context.lineTo(this.nodes[0].x, this.nodes[0].y)
            canvas_context.fill()
            canvas_context.strokeStyle = "black"
            canvas_context.stroke()
            canvas_context.closePath()
            canvas_context.fillStyle = "black"         
            canvas_context.font = "14px comic sans ms"   
            
            let sum = 0
            for(let t= 0;t<this.parent.dist.length;t++){
                sum += this.parent.dist[t]
            }
            
            
            if(hand.dieSel == this.parent && this.parent.rolled == 1){
                
                           canvas_context.font = "20px comic sans ms"   
            }
            
                           
                           
            canvas_context.fillText(sum +"/"+this.sides, this.body.x-15, this.body.y+5)
            
            
        }
    }
    class Shape {
        constructor(shapes) {
            this.shapes = shapes
        }
        draw() {
            for (let t = 0; t < this.shapes.length; t++) {
                this.shapes[t].draw()
            }
        }
        isPointInside(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].isPointInside(point)) {
                    return true
                }
            }
            return false
        }
        doesPerimeterTouch(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].doesPerimeterTouch(point)) {
                    return true
                }
            }
            return false
        }
        innerShape(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].doesPerimeterTouch(point)) {
                    return this.shapes[t]
                }
            }
            return false
        }
        isInsideOf(box) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (box.isPointInside(this.shapes[t])) {
                    return true
                }
            }
            return false
        }
        adjustByFromDisplacement(x,y) {
            for (let t = 0; t < this.shapes.length; t++) {
                if(typeof this.shapes[t].fromRatio == "number"){
                    this.shapes[t].x+=x*this.shapes[t].fromRatio
                    this.shapes[t].y+=y*this.shapes[t].fromRatio
                }
            }
        }
        adjustByToDisplacement(x,y) {
            for (let t = 0; t < this.shapes.length; t++) {
                if(typeof this.shapes[t].toRatio == "number"){
                    this.shapes[t].x+=x*this.shapes[t].toRatio
                    this.shapes[t].y+=y*this.shapes[t].toRatio
                }
            }
        }
        mixIn(arr){
            for(let t = 0;t<arr.length;t++){
                for(let k = 0;k<arr[t].shapes.length;k++){
                    this.shapes.push(arr[t].shapes[k])
                }
            }
        }
        push(object) {
            this.shapes.push(object)
        }
    }

    class Spring {
        constructor(x, y, radius, color, body = 0, length = 1, gravity = 0, width = 1) {
            if (body == 0) {
                this.body = new Circle(x, y, radius, color)
                this.anchor = new Circle(x, y, radius, color)
                this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", width)
                this.length = length
            } else {
                this.body = body
                this.anchor = new Circle(x, y, radius, color)
                this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", width)
                this.length = length
            }
            this.gravity = gravity
            this.width = width
        }
        balance() {
            this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", this.width)
            if (this.beam.hypotenuse() < this.length) {
                this.body.xmom += (this.body.x - this.anchor.x) / this.length
                this.body.ymom += (this.body.y - this.anchor.y) / this.length
                this.anchor.xmom -= (this.body.x - this.anchor.x) / this.length
                this.anchor.ymom -= (this.body.y - this.anchor.y) / this.length
            } else {
                this.body.xmom -= (this.body.x - this.anchor.x) / this.length
                this.body.ymom -= (this.body.y - this.anchor.y) / this.length
                this.anchor.xmom += (this.body.x - this.anchor.x) / this.length
                this.anchor.ymom += (this.body.y - this.anchor.y) / this.length
            }
            let xmomentumaverage = (this.body.xmom + this.anchor.xmom) / 2
            let ymomentumaverage = (this.body.ymom + this.anchor.ymom) / 2
            this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
            this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
            this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
            this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2
        }
        draw() {
            this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", this.width)
            this.beam.draw()
            this.body.draw()
            this.anchor.draw()
        }
        move() {
            this.anchor.ymom += this.gravity
            this.anchor.move()
        }

    }  
    class SpringOP {
        constructor(body, anchor, length, width = 3, color = body.color) {
            this.body = body
            this.anchor = anchor
            this.beam = new LineOP(body, anchor, color, width)
            this.length = length
        }
        balance() {
            if (this.beam.hypotenuse() < this.length) {
                this.body.xmom += ((this.body.x - this.anchor.x) / this.length) 
                this.body.ymom += ((this.body.y - this.anchor.y) / this.length) 
                this.anchor.xmom -= ((this.body.x - this.anchor.x) / this.length) 
                this.anchor.ymom -= ((this.body.y - this.anchor.y) / this.length) 
            } else if (this.beam.hypotenuse() > this.length) {
                this.body.xmom -= (this.body.x - this.anchor.x) / (this.length)
                this.body.ymom -= (this.body.y - this.anchor.y) / (this.length)
                this.anchor.xmom += (this.body.x - this.anchor.x) / (this.length)
                this.anchor.ymom += (this.body.y - this.anchor.y) / (this.length)
            }

            let xmomentumaverage = (this.body.xmom + this.anchor.xmom) / 2
            let ymomentumaverage = (this.body.ymom + this.anchor.ymom) / 2
            this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
            this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
            this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
            this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2
        }
        draw() {
            this.beam.draw()
        }
        move() {
            //movement of SpringOP objects should be handled separate from their linkage, to allow for many connections, balance here with this object, move nodes independently
        }
    }

    class Color {
        constructor(baseColor, red = -1, green = -1, blue = -1, alpha = 1) {
            this.hue = baseColor
            if (red != -1 && green != -1 && blue != -1) {
                this.r = red
                this.g = green
                this.b = blue
                if (alpha != 1) {
                    if (alpha < 1) {
                        this.alpha = alpha
                    } else {
                        this.alpha = alpha / 255
                        if (this.alpha > 1) {
                            this.alpha = 1
                        }
                    }
                }
                if (this.r > 255) {
                    this.r = 255
                }
                if (this.g > 255) {
                    this.g = 255
                }
                if (this.b > 255) {
                    this.b = 255
                }
                if (this.r < 0) {
                    this.r = 0
                }
                if (this.g < 0) {
                    this.g = 0
                }
                if (this.b < 0) {
                    this.b = 0
                }
            } else {
                this.r = 0
                this.g = 0
                this.b = 0
            }
        }
        normalize() {
            if (this.r > 255) {
                this.r = 255
            }
            if (this.g > 255) {
                this.g = 255
            }
            if (this.b > 255) {
                this.b = 255
            }
            if (this.r < 0) {
                this.r = 0
            }
            if (this.g < 0) {
                this.g = 0
            }
            if (this.b < 0) {
                this.b = 0
            }
        }
        randomLight() {
            var letters = '0123456789ABCDEF';
            var hash = '#';
            for (var i = 0; i < 6; i++) {
                hash += letters[(Math.floor(Math.random() * 12) + 4)];
            }
            var color = new Color(hash, 55 + Math.random() * 100, 55 + Math.random() * 100, 55 + Math.random() * 100)
            return color;
        }
        randomDark() {
            var letters = '0123456789ABCDEF';
            var hash = '#';
            for (var i = 0; i < 6; i++) {
                hash += letters[(Math.floor(Math.random() * 12))];
            }
            var color = new Color(hash, Math.random() * 100, Math.random() * 100, Math.random() * 100)
            return color;
        }
        random() {
            var letters = '0123456789ABCDEF';
            var hash = '#';
            for (var i = 0; i < 6; i++) {
                hash += letters[(Math.floor(Math.random() * 16))];
            }
            var color = new Color(hash, Math.random() * 255, Math.random() * 255, Math.random() * 255)
            return color;
        }
    }
    class Softbody { //buggy, spins in place
        constructor(x, y, radius, color, size, members = 10, memberLength = 5, force = 10, gravity = 0) {
            this.springs = []
            this.pin = new Circle(x, y, radius, color)
            this.points = []
            this.flop = 0
            let angle = 0
            this.size = size 
            let line = new Line((Math.cos(this.angle)*size), (Math.sin(this.angle)*size), (Math.cos(this.angle+ ((Math.PI*2)/members))*size), (Math.sin(this.angle+ ((Math.PI*2)/members))*size) )
            let distance = line.hypotenuse()
            for(let t =0;t<members;t++){
                let circ = new Circle(x+(Math.cos(this.angle)*size), y+(Math.sin(this.angle)*size), radius, color)
                circ.reflect = 1
                circ.bigbody = new Circle(x+(Math.cos(this.angle)*size), y+(Math.sin(this.angle)*size), distance, color)
                circ.draw()
                circ.touch = []
                this.points.push(circ)
                angle += ((Math.PI*2)/members)
            }

            for(let t =0;t<this.points.length;t++){
                for(let k =0;k<this.points.length;k++){
                    if(t!=k){
                        if(this.points[k].bigbody.doesPerimeterTouch(this.points[t])){
                        if(!this.points[k].touch.includes(t) && !this.points[t].touch.includes(k)){
                                let spring = new SpringOP(this.points[k], this.points[t], (size*Math.PI)/members, 2, color)
                                this.points[k].touch.push(t)
                                this.points[t].touch.push(k)
                                this.springs.push(spring)
                                spring.beam.draw()
                            }
                        }
                    }
                }
            }

            //console.log(this)

            // this.spring = new Spring(x, y, radius, color, this.pin, memberLength, gravity)
            // this.springs.push(this.spring)
            // for (let k = 0; k < members; k++) {
            //     this.spring = new Spring(x, y, radius, color, this.spring.anchor, memberLength, gravity)
            //     if (k < members - 1) {
            //         this.springs.push(this.spring)
            //     } else {
            //         this.spring.anchor = this.pin
            //         this.springs.push(this.spring)
            //     }
            // }
            this.forceConstant = force
            this.centroid = new Circle(0, 0, 10, "red")
        }
        circularize() {
            this.xpoint = 0
            this.ypoint = 0
            for (let s = 0; s < this.springs.length; s++) {
                this.xpoint += (this.springs[s].anchor.x / this.springs.length)
                this.ypoint += (this.springs[s].anchor.y / this.springs.length)
            }
            this.centroid.x = this.xpoint
            this.centroid.y = this.ypoint
            this.angle = 0
            this.angleIncrement = (Math.PI * 2) / this.springs.length
            for (let t = 0; t < this.points.length; t++) {
                this.points[t].x = this.centroid.x + (Math.cos(this.angle) * this.forceConstant)
                this.points[t].y = this.centroid.y + (Math.sin(this.angle) * this.forceConstant)
                this.angle += this.angleIncrement 
            }
        }
        balance() {
            this.xpoint = 0
            this.ypoint = 0
            for (let s = 0; s < this.points.length; s++) {
                this.xpoint += (this.points[s].x / this.points.length)
                this.ypoint += (this.points[s].y / this.points.length)
            }
            this.centroid.x = this.xpoint
            this.centroid.y = this.ypoint
            // this.centroid.x += TIP_engine.x / this.points.length
            // this.centroid.y += TIP_engine.y / this.points.length
            for (let s = 0; s < this.points.length; s++) {
                this.link = new LineOP(this.points[s], this.centroid, 0, "transparent")
                if (this.link.hypotenuse() != 0) {

                    if(this.size < this.link.hypotenuse()){
                        this.points[s].xmom -= (Math.cos(this.link.angle())*(this.link.hypotenuse())) * this.forceConstant*.1
                        this.points[s].ymom -= (Math.sin(this.link.angle())*(this.link.hypotenuse())) * this.forceConstant*.1
                    }else{
                        this.points[s].xmom += (Math.cos(this.link.angle())*(this.link.hypotenuse())) * this.forceConstant*.1
                        this.points[s].ymom += (Math.sin(this.link.angle())*(this.link.hypotenuse())) * this.forceConstant*.1
                    }

                    // this.points[s].xmom += (((this.points[s].x - this.centroid.x) / (this.link.hypotenuse()))) * this.forceConstant
                    // this.points[s].ymom += (((this.points[s].y - this.centroid.y) / (this.link.hypotenuse()))) * this.forceConstant
                }
            }
            if(this.flop%2 == 0){
                for (let s =  0; s < this.springs.length; s++) {
                    this.springs[s].balance()
                }
            }else{
                for (let s = this.springs.length-1;s>=0; s--) {
                    this.springs[s].balance()
                }
            }
            for (let s = 0; s < this.points.length; s++) {
                this.points[s].move()
                this.points[s].draw()
            }
            for (let s =  0; s < this.springs.length; s++) {
                this.springs[s].draw()
            }
            this.centroid.draw()
        }
    }
    class Observer {
        constructor(x, y, radius, color, range = 100, rays = 10, angle = (Math.PI * .125)) {
            this.body = new Circle(x, y, radius, color)
            this.color = color
            this.ray = []
            this.rayrange = range
            this.globalangle = Math.PI
            this.gapangle = angle
            this.currentangle = 0
            this.obstacles = []
            this.raymake = rays
        }
        beam() {
            this.currentangle = this.gapangle / 2
            for (let k = 0; k < this.raymake; k++) {
                this.currentangle += (this.gapangle / Math.ceil(this.raymake / 2))
                let ray = new Circle(this.body.x, this.body.y, 1, "white", (((Math.cos(this.globalangle + this.currentangle)))), (((Math.sin(this.globalangle + this.currentangle)))))
                ray.collided = 0
                ray.lifespan = this.rayrange - 1
                this.ray.push(ray)
            }
            for (let f = 0; f < this.rayrange; f++) {
                for (let t = 0; t < this.ray.length; t++) {
                    if (this.ray[t].collided < 1) {
                        this.ray[t].move()
                        for (let q = 0; q < this.obstacles.length; q++) {
                            if (this.obstacles[q].isPointInside(this.ray[t])) {
                                this.ray[t].collided = 1
                            }
                        }
                    }
                }
            }
        }
        draw() {
            this.beam()
            this.body.draw()
            canvas_context.lineWidth = 1
            canvas_context.fillStyle = this.color
            canvas_context.strokeStyle = this.color
            canvas_context.beginPath()
            canvas_context.moveTo(this.body.x, this.body.y)
            for (let y = 0; y < this.ray.length; y++) {
                canvas_context.lineTo(this.ray[y].x, this.ray[y].y)
                canvas_context.lineTo(this.body.x, this.body.y)
            }
            canvas_context.stroke()
            canvas_context.fill()
            this.ray = []
        }
    }
    function setUp(canvas_pass, style = "#000900") {
        canvas = canvas_pass
        canvas_context = canvas.getContext('2d');
        
//     video_recorder = new CanvasCaptureToWEBM(canvas, 5000000);
        canvas.style.background = style
        window.setInterval(function () {
            
    if (keysPressed['.'] && recording == 0) {
        rectime = Date.now()
        recording = 1
        video_recorder.record()
    }
    if (keysPressed['='] && recording == 1) {
        rectime = Date.now() - rectime
        recording = 0
        video_recorder.stop()
        video_recorder.download('dino.webm')
    }
            main()
        },40)
        document.addEventListener('keydown', (event) => {
            keysPressed[event.key] = true;
            
    if(keysPressed['c']){
        cn++
        keysPressed['c'] = false
    }
        });
        document.addEventListener('keyup', (event) => {
            delete keysPressed[event.key];
        });
        window.addEventListener('pointerdown', e => {
            FLEX_engine = canvas.getBoundingClientRect();
            XS_engine = e.clientX - FLEX_engine.left;
            YS_engine = e.clientY - FLEX_engine.top;
            TIP_engine.x = XS_engine
            TIP_engine.y = YS_engine
            TIP_engine.body = TIP_engine
//             hand.check(TIP_engine)

if(start == 0){
start = 1
return
}

        avey.check(TIP_engine)

//         scanner.stretch(TIP_engine)
            // example usage: if(object.isPointInside(TIP_engine)){ take action }
        });
        window.addEventListener('pointermove', continued_stimuli);

        window.addEventListener('pointerup', e => {
            // window.removeEventListener("pointermove", continued_stimuli);
        })
        function continued_stimuli(e) {
            FLEX_engine = canvas.getBoundingClientRect();
            XS_engine = e.clientX - FLEX_engine.left;
            YS_engine = e.clientY - FLEX_engine.top;
            TIP_engine.x = XS_engine
            TIP_engine.y = YS_engine
            TIP_engine.body = TIP_engine
//             hand.subCheck(TIP_engine)

//         scanner.stretch(TIP_engine)


//         avey.check(TIP_engine)
            
        }
    }
    function gamepad_control(object, speed = 1) { // basic control for objects using the controler
//         //console.log(gamepadAPI.axesStatus[1]*gamepadAPI.axesStatus[0]) //debugging
        if (typeof object.body != 'undefined') {
            if(typeof (gamepadAPI.axesStatus[1]) != 'undefined'){
                if(typeof (gamepadAPI.axesStatus[0]) != 'undefined'){
                object.body.x += (gamepadAPI.axesStatus[0] * speed)
                object.body.y += (gamepadAPI.axesStatus[1] * speed)
                }
            }
        } else if (typeof object != 'undefined') {
            if(typeof (gamepadAPI.axesStatus[1]) != 'undefined'){
                if(typeof (gamepadAPI.axesStatus[0]) != 'undefined'){
                object.x += (gamepadAPI.axesStatus[0] * speed)
                object.y += (gamepadAPI.axesStatus[1] * speed)
                }
            }
        }
    }
    function control(object, speed = 1) { // basic control for objects
        if (typeof object.body != 'undefined') {
            if (keysPressed['w']) {
                object.body.ymom -= speed
            }
            if (keysPressed['d']) {
                object.body.xmom += speed
            }
            if (keysPressed['s']) {
                object.body.ymom += speed
            }
            if (keysPressed['a']) {
                object.body.xmom -= speed
            }
        } else if (typeof object != 'undefined') {
            if (keysPressed['w']) {
                object.ymom -= speed
            }
            if (keysPressed['d']) {
                object.xmom += speed
            }
            if (keysPressed['s']) {
                object.ymom += speed
            }
            if (keysPressed['a']) {
                object.xmom -= speed
            }
        }
    }
    function getRandomLightColor() { // random color that will be visible on  black background
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 12) + 4)];
        }
        return color;
    }
    function getRandomColor() { // random color
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 16) + 0)];
        }
        return color;
    }
    function getRandomDarkColor() {// color that will be visible on a black background
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 12))];
        }
        return color;
    }
    function castBetween(from, to, granularity = 10, radius = 1) { //creates a sort of beam hitbox between two points, with a granularity (number of members over distance), with a radius defined as well
            let limit = granularity
            let shape_array = []
            for (let t = 0; t < limit; t++) {
                let circ = new Circle((from.x * (t / limit)) + (to.x * ((limit - t) / limit)), (from.y * (t / limit)) + (to.y * ((limit - t) / limit)), radius, "red")
                circ.toRatio = t/limit
                circ.fromRatio = (limit-t)/limit
                shape_array.push(circ)
            }
            return (new Shape(shape_array))
    }

    let setup_canvas = document.getElementById('canvas') //getting canvas from document

    setUp(setup_canvas) // setting up canvas refrences, starting timer. 

    // object instantiation and creation happens here 
    
    
    class Bullet {
        constructor(x,y, angle){
            this.x = x
            this.y = y
            this.angle = angle
            this.z = .01
            this.time = 0
            this.shot = new Circle(x,y,2, "#FFDD11", Math.cos(this.angle)*5, Math.sin(this.angle)*5)
        this.angle += ((Math.random()-.5)/2)
        }
        ddraw(){
            if(this.drawn != 1){
                if(Math.random() < .3){
                    
                this.drawn = 1
                }
            let circle2 = new Circle(this.x+1, this.y+2, 2, "#00000088")
            circle2.ddraw() 
            let circle = new Circle(this.x, this.y, 6, "#aa6600")
            circle.ddraw()      
            
            }
        }
        shaddraw(){
            
            if(this.z <= 0 ){
                if(Math.random() <.1){
                this.ddraw()
                return
                }
            }
             if(this.drawn == 1){
                return
            }

                this.time += .0075 + (Math.random()/100)
            let shadx = (Math.cos(this.angle)*this.z*10)*(Math.cos(this.angle)*this.z*1)
            let shady = (Math.sin(this.angle)*this.z*10)*(Math.sin(this.angle)*this.z*1)
            this.z += this.time - (this.time*this.time)
             if(this.z <= 0){
                this.z = 0
          }
            this.x -= Math.cos(this.angle) + ((Math.random()-.5)/2)
            this.y -= Math.sin(this.angle) + ((Math.random()-.5)/2)
            let circle = new Circle(this.x, this.y, 6, "#00000088")
            circle.draw()
            
        }
        draw(){
            if(this.z <= 0 ){
                if(Math.random() <.015){
                this.ddraw()
                return
                }
            }
             if(this.drawn == 1){
                return
            }
            let p = new Point(this.shot.x, this.shot.y)
            
            this.shot.move()
//             this.shot.draw()
//             let l = new LineOP(p, this.shot, "yellow", 3)
//             l.draw()
//             this.shot.y += 15
//             this.shot.color = "#00000088"
//             this.shot.draw()
//             this.shot.y -= 15
//             this.shot.color = "#FFDD11"
    
            
            let circle = new Circle(this.x, this.y-(10*this.z), 6, "#aa6600")
            circle.draw()       
        }
    }
    
    class Guy {
        constructor(){
            this.body = new Circle(360,360,10,"pink")
            this.canvas = document.createElement('canvas');
            this.canvas.width = 720
            this.canvas.height = 720
            this.canvas_context = this.canvas.getContext('2d');
            this.bullets = []
            for(let t = 0;t<1;t++){
                this.bullets.push(new Bullet(this.body.x, this.body.y, 0))
            }
//             document.body.appendChild(this.canvas);
        }
        draw(){
            control(this.body, .9)
            canvas_context.drawImage(this.canvas,0,0)
            this.body.draw()
            if(keysPressed[' '] && Math.random()<1){
            for(let t = 0;t<1;t++){
                this.bullets.push(new Bullet(this.body.x, this.body.y, (new LineOP(TIP_engine, this.body)).angle()))
            }
            }
            
            for(let t = 0;t<this.bullets.length;t++){
                this.bullets[t].shaddraw()
            }
            for(let t = 0;t<this.bullets.length;t++){
                this.bullets[t].draw()
                if(this.bullets[t].drawn != 1 && t > 0){
                    let xmom = (this.bullets[t-1].shot.xmom + this.bullets[t].shot.xmom)/2
                    let ymom = (this.bullets[t-1].shot.ymom + this.bullets[t].shot.ymom)/2
                    this.bullets[t-1].shot.ymom = ymom
                    this.bullets[t-1].shot.xmom = xmom
                    this.bullets[t].shot.ymom = ymom
                    this.bullets[t].shot.xmom = xmom
                    let l = new LineOP(this.bullets[t].shot, this.bullets[t-1].shot, "#FFFF0088",3)
                    l.draw()
                }
            }
        }
    }

// let guy = new Guy()


    function calculateSilverWeight(x,y,z){
        let vol = x*y*z
        let mass = vol*10.49
        //console.log(vol+" cubic centimeters", mass+ " grams", (mass/28.3495)+"oz")
    }

    let x = 0
    let y = 0
    let z = 0

    calculateSilverWeight(x,y,z)
function indexer(t) {
    let p = {};
    p.x = (t / 4) % 720;
    p.y = Math.floor(t / (4 * 720));
    
    return p;
}
function tout(x, y) {
    return Math.round(Math.floor((y * 720 + x) * 4));
}

   let pom = new Image()
   pom.src = "newbl.png"
   
   canvas_context.drawImage(pom, 0,0,pom.width,pom.height,0,0,720,720)
let pix = canvas_context.getImageData(0,0,720,720)
 let pix2 = canvas_context.getImageData(0,0,720,720)
   let d = pix.data
   let d2 = pix2.data
   let c = 0
   canvas_context.drawImage(pom, 0,0,pom.width,pom.height,0,0,720,720)
   pix = canvas_context.getImageData(0,0,720,720)
   
//         for(let t= 0;t<d.length;t+=4){
//             c+=.004
//                 d[t] = 1*((t%(720*4))/(720*4))*360
//                 d[t+1] = 1*(c/10)
//                 d[t+2] = 1*(c/10)*((t%(720*4))/(720*4))*255
//                 d[t+3] = 255
//                 
//                 if(t > d.length*0){
//                     
//                 d[t] = 0
//                 d[t+1] =255
//                 d[t+2] = 255
//                 d[t+3] = 255
//                 }
//                 if(t > d.length*.17){
//                     
//                 d[t] = 255
//                 d[t+1] =0
//                 d[t+2] = 255
//                 d[t+3] = 255
//                 }
//                 if(t > d.length*.34){
//                     
//                 d[t] = 255
//                 d[t+1] =255
//                 d[t+2] =0
//                 d[t+3] = 255
//                 }
//                 
//                 
//                 if(t > d.length*.5){
//                     
//                 d[t] = 0
//                 d[t+1] =255
//                 d[t+2] = 255
//                 d[t+3] = 255
//                 }
//                 if(t > d.length*.67){
//                     
//                 d[t] = 255
//                 d[t+1] =0
//                 d[t+2] = 255
//                 d[t+3] = 255
//                 }
//                 if(t > d.length*.85){
//                     
//                 d[t] = 255
//                 d[t+1] =255
//                 d[t+2] =0
//                 d[t+3] = 255
//                 }
//                 d2[t] = Math.random()*255
//                 d2[t+1] = Math.random()*255
//                 d2[t+2] = Math.random()*255
//                 d2[t+3] = 255
//         }   
//         canvas_context.putImageData(pix,0,0)
    let angle = 0
    let step = Math.PI/100
    let lf = new Circle(360, 360, 3600)
    
    let egg2 = new Image()
    egg2.src = "eggbar2.png"
    let egg = new Image()
    egg.src = "eggbar.png"
    
    let growrate = 10
    let cn = 3
    
    canvas_context.imageSmoothingEnabled = false
    
    let stats =  []// [.9,.8,.3,.75,.8,.3,.5]
    let center = new Point(360,360)
    let outerColor = "red"
    let innerColor = "white"
    
    
    class Knocktapus {
        constructor(){
            this.body = new Circle(360,360, 10, "purple")
            this.body.friction = .99
            this.tentacleEnds = []
            this.angle = 0
            for(let t= 0;t<8;t++){
                this.angle += Math.PI/4
                let circ = new Circle(360+(Math.cos(this.angle)*20), 360+(Math.sin(this.angle)*20), 3, "purple")
                circ.link = new LineOP(circ,this.body)
                this.tentacleEnds.push(circ)
            }
        }
        draw(){
            this.body.draw()
            for(let t= 0;t<8;t++){
                this.tentacleEnds[t].draw()
            }
            control(this.body, .1)
            this.body.frictiveMove()
            
            for(let t= 0;t<8;t++){
                if(this.tentacleEnds[t].link.hypotenuse() < 100){
                this.tentacleEnds[t].x += this.body.xmom
                this.tentacleEnds[t].y += this.body.ymom
                }else{
                this.tentacleEnds[t].x += this.body.xmom*1.1
                this.tentacleEnds[t].y += this.body.ymom*1.1
                }
            }
        }
    }
    
//     let nock = new Knocktapus()

    let handimg = new Image()
    handimg.src = "handeaux.png"
    
    let bodies = []
    for(let t= 0;t<100;t++){
        bodies.push(new Polygon(360, 360, 25, getRandomColor(), t))
    }
    
    
    
    
    
    class EnemyDice {
        constructor(sides, dist, ord = 0, ){
            this.sides = sides 
            this.dist = [...dist]
            this.body = new Polygon(1100, 360, 20, getRandomColor(), sides)
            this.body.parent = this
            this.realBody = new Rectangle(900, 360-(ord*100), 48,48)
            this.color = getRandomColor()
            this.realBody.color = this.color
            this.flags = []
            this.rolled = 0
            this.die = 1
        }
        rollx(){
            let face = Math.floor(Math.random()*this.sides)
            return {d:this.dist[this.upface], f:this.flags}
        }
        draw(){
               this.moving--
                    if(this.moving > 0){
                     
                    this.body.move()
                    }
            if(this.rewarded == 1){
            this.realBody.draw()
            }else{
                this.body.draw()
            }
            if(this.read == 1){
             if(this.rolled == 1){
                 
                           canvas_context.font = "20px comic sans ms"   
                canvas_context.fillStyle = "white"
                canvas_context.fillRect((this.body.body.x+50)-15, (this.body.body.y+5)-30, canvas_context.measureText(this.dist[this.upface]).width + 45, 50)
                
                canvas_context.fillStyle = "black"
                if(this.rollx().f.includes("healing")){
                    
                canvas_context.fillStyle = "green"
                }
                
                
                     canvas_context.fillText(this.dist[this.upface], this.body.body.x+50, this.body.body.y+5)
                    
                    
                 
              }else{
                  
                           canvas_context.font = "20px comic sans ms"   
                canvas_context.fillStyle = "white"
                canvas_context.fillRect((this.body.body.x+50)-15, (this.body.body.y+5)-30, canvas_context.measureText(this.dist).width + 45, 50)
                canvas_context.fillStyle = "black"
                
                     canvas_context.fillText(this.dist, this.body.body.x+50, this.body.body.y+5)
                    
                    
                }
            }
            if(this.read == 2){
                           canvas_context.font = "20px comic sans ms"   
                canvas_context.fillStyle = "white"
                canvas_context.fillRect((this.realBody.x+50)-15, (this.realBody.y+5)-30, canvas_context.measureText(this.dist).width + 45, 50)
                canvas_context.fillStyle = "black"
                     canvas_context.fillText(this.dist, this.realBody.x+50, this.realBody.y+5)
                    
                    
            }
            
             if(this.rolled == 1){
//                 if(this.body.isPointInside(point)){
                hand.enemies[0].dieSel = this
                hand.enemies[0].enemSel = hand
                if(hand.enemies[0].enemSel.health > 0 && this.moving <= -30){
                    this.rolled = 0
                    this.body.body.x += 400
                    
                    
                    hand.enemies[0].enemSel.health -= this.dist[this.upface]
                    hand.enemies[0].dieSel = {}
                }
//                 }
            }
        }
        invdraw(){
            
        }
        subCheck(point){
            if(this.rewarded == 1){
                if(this.realBody.isPointInside(point)){
                    this.dist = this.dist.sort((a,b) => a>b?-1:1)
                        this.read = 2
                }else{
                      this.read = 0

                }
                return
            }else{
                if(this.body.body.isPointInside(point)){
                    this.dist = this.dist.sort((a,b) => a>b?-1:1)
                        this.read = 1
                }else{
                      this.read = 0

                }
            }
            
        }
        check(point){
            if(this.rewarded == 1){
                if(this.realBody.isPointInside(point)){
                    this.rewarded = 0
//                     hand.rewards = []
//                     hand.reward(this)
//             hand.generateReward()
                    return
                }
            }
        }
        roll(){
            if(this.rolled != 1){
                
                
            this.upface = Math.floor(Math.random()*this.sides)
            this.rolled = 1
            this.body.xmom = -12
            this.moving = 33
            
            }
        }
    }




    
    class Dice {
        constructor(sides, dist, ord = 0, flaglist = []){
            this.sides = sides 
            this.dist = [...dist]
            this.flagDist = []
            this.flaglist = flaglist
            for(let t = 0;t<dist.length;t++){
                if(Math.random()< .05){ //.05 is 1/20 
                    this.flagDist[t] = "healing" 
                }else {
                    if(this.flaglist.length > 0){
                           this.flagDist[t] = this.flaglist[Math.floor(Math.random()*this.flaglist.length)]
                    }
                }
            }
            
            
            this.body = new Polygon(100, 360, 20, getRandomColor(), sides)
            this.body.parent = this
            this.realBody = new Rectangle(500, 360-(ord*100), 48,48)
            this.color = getRandomColor()
            this.realBody.color = this.color
            this.flags = ["healing" ]
            this.rolled = 0
            this.die = 1
            this.moving = 0
        }
        rollx(){
            let face = Math.floor(Math.random()*this.sides)
            let falseFlags = [...this.flags]
            if(this.flags[this.upface] != this.flagDist){
               falseFlags[this.upface] =  this.flagDist
                }
            return {d:this.dist[this.upface], f:falseFlags}
        }
        draw(){
                        this.moving--
                    if(this.moving > 0){
                    this.body.move()
                    }
            if(this.rewarded == 1){
            this.realBody.draw()
            }else{
                
                this.body.draw()
            }
            if(this.read == 1){
             if(this.rolled == 1){
                 
                           canvas_context.font = "20px comic sans ms"   
                canvas_context.fillStyle = "white"
                canvas_context.fillRect((this.body.body.x+50)-15, (this.body.body.y+5)-30, canvas_context.measureText(this.dist[this.upface]).width + 45, 50)
                canvas_context.fillStyle = "black"
                canvas_context.fillStyle = "black"
                if(this.rollx().f.includes("healing")){
                    
                canvas_context.fillStyle = "green"
                }
                
                
                     canvas_context.fillText(this.dist[this.upface], this.body.body.x+50, this.body.body.y+5)
                    
                    
                 
              }else{
                  
                           canvas_context.font = "20px comic sans ms"   
                canvas_context.fillStyle = "white"
                canvas_context.fillRect((this.body.body.x+50)-15, (this.body.body.y+5)-30, canvas_context.measureText(this.dist).width + 45, 50)
                canvas_context.fillStyle = "black"
                
                     canvas_context.fillText(this.dist, this.body.body.x+50, this.body.body.y+5)
                    
                    
                }
            }
            if(this.read == 2){
                           canvas_context.font = "20px comic sans ms"   
                canvas_context.fillStyle = "white"
                canvas_context.fillRect((this.realBody.x+50)-15, (this.realBody.y+5)-30, canvas_context.measureText(this.dist).width + 45, 50)
                canvas_context.fillStyle = "black"
                     canvas_context.fillText(this.dist, this.realBody.x+50, this.realBody.y+5)
                    
                    
            }
        }
        invdraw(){
            
        }
        subCheck(point){
            if(this.rewarded == 1){
                if(this.realBody.isPointInside(point)){
                    this.dist = this.dist.sort((a,b) => a>b?-1:1)
                        this.read = 2
                }else{
                      this.read = 0

                }
                return
            }else{
                if(this.body.body.isPointInside(point)){
                    this.dist = this.dist.sort((a,b) => a>b?-1:1)
                        this.read = 1
                }else{
                      this.read = 0

                }
            }
            
        }
        check(point){
            if(this.rewarded == 1){
                if(this.realBody.isPointInside(point)){
                    this.rewarded = 0
                    hand.rewards = []
                    hand.reward(this)
//             hand.generateReward()
                    return
                }
            }
            //console.log(this.rolled)
             if(this.rolled == 1){
                if(this.body.isPointInside(point)){
                hand.dieSel = this
                if(hand.enemSel.has == 1 && hand.enemSel.health > 0){
                    this.rolled = 0
                    this.body.body.x -= 400
                    let obj = this.rollx()
                    hand.enemSel.health -= obj.d           
                    if(obj.f.includes("healing")){
                        hand.health += obj.d
                    }
    
                }
                }
            }
        }
        roll(){
            if(this.rolled != 1){
                
            this.upface = Math.floor(Math.random()*this.sides)
            this.rolled = 1
            this.body.xmom = 12
            this.moving = 33
            }
        }
    }
    
    class Enemy {
        constructor(level){
            this.has = 1
            this.body = new Circle(1000,360, 24, "red")
            this.frames = Math.floor(89)
            this.frame = 0
            this.health = Math.round(5 + (level*5))
            this.attack = level 
            this.maxhealth = this.health
            this.dicecup = []
            this.level = level
            for(let t= 0;t<2+(Math.floor(this.level/4));t++){
                
            let fd1 = Math.floor(Math.random()*6)+3
            let fdist1 = []
            for(let t= 0;t<fd1;t++){
                fdist1.push(Math.floor(Math.random()*this.level*2)+1)
            }
            let d1 = new EnemyDice(fd1, fdist1, t)
            this.dicecup.push(d1)
            }
            this.rewards = []
        }   
        check(point){
            if(this.body.isPointInside(point)){
                hand.enemSel = this
                
                if(hand.dieSel.die == 1 && hand.dieSel.rolled == 1){
                    hand.dieSel.rolled = 0
                    hand.dieSel.body.body.x -= 400
                    
                    
                    hand.enemSel.health -= hand.dieSel.dist[hand.dieSel.upface]
                    hand.dieSel = {}
                }
                
                return
            }
        }
        draw(){
            this.enemSel = hand
            this.body.y = ((720/(hand.enemies.length+1))*hand.enemies.indexOf(this)) + (720/(hand.enemies.length+1)) 
            this.body.draw()
            canvas_context.fillStyle = "#00FF00"
            canvas_context.fillRect(this.body.x-24, this.body.y-34, 48*(this.health/this.maxhealth), 10)
            
            canvas_context.strokeStyle = "black"
            canvas_context.fillStyle = "black"
            
            if(hand.enemSel == this){
                
                           canvas_context.font = "20px comic sans ms"   
            }else{
                
                           canvas_context.font = "10px comic sans ms"   
                    }
                     canvas_context.fillText(this.health, this.body.x-64 + 50, this.body.y-50)
                     
                     
                     
            canvas_context.strokeStyle = "black"
            canvas_context.lineWidth = "1"
            canvas_context.strokeRect(this.body.x-24, this.body.y-34, 48, 10)
            
            for(let t = 0;t<this.dicecup.length;t++){
               if(Math.random()<.01 && this.dicecup[t].rolled ==0){
               this.dicecup[t].body.body.x = 1280 - ((Math.random()*100)+ 44)
               this.dicecup[t].body.body.y =   this.body.y + (((Math.random()-.5)*100))
            }
                   this.dicecup[t].draw()
              }
        }
    }
    
    class Handeaux {
        constructor(){
            this.body = new Circle(360,360, 64, "red")
            this.frames = Math.floor(89)
            this.frame = 0
            this.health = 69
            this.maxhealth = this.health
            this.dicecup = []
            this.level = 1
            this.rewards = []
            this.generateReward()
            this.enemies = [new Enemy(this.level), new Enemy(this.level)]
            this.rollButton = new Rectangle(this.body.x-64, this.body.y +100, 89, 50, "red")
            this.dieSel = {}
            this.enemSel = {}
            
        }   
        generateReward(){
        for(let t= 0;t<3;t++){
            let fd1 = Math.floor(Math.random()*6)+3
            let fdist1 = []
            for(let t= 0;t<fd1;t++){
                fdist1.push(Math.floor(Math.random()*this.level*3)+1)
            }
            let d1 = new Dice(fd1, fdist1, t)
            d1.rewarded = 1
        
            this.rewards.push(d1)
        }
        }
        check(point){
            
        for(let t= 0;t<this.enemies.length;t++){
            this.enemies[t].check(point)
        }
        for(let t= 0;t<this.dicecup.length;t++){
            this.dicecup[t].check(point)
        }
        for(let t= 0;t<this.rewards.length;t++){
            this.rewards[t].check(point)
        }
        if(this.rollButton.isPointInside(point)){
            this.dieSel = {}
            this.enemSel = {}
           for(let t = 0;t<this.dicecup.length;t++){
                this.dicecup[t].roll()
          }
           for(let t = 0;t<this.dicecup.length;t++){
                this.dicecup[t].roll()
          }
          for(let k = 0;k<this.enemies.length;k++){
           for(let t = 0;t<this.enemies[k].dicecup.length;t++){
                this.enemies[k].dicecup[t].roll()
          }
            }
        }
        }
        subCheck(point){
            
        for(let t= 0;t<this.rewards.length;t++){
            this.rewards[t].subCheck(point)
        }
        for(let t= 0;t<this.dicecup.length;t++){
            this.dicecup[t].subCheck(point)
        }
        }
        displayRewards(){   
        for(let t= 0;t<this.rewards.length;t++){
            this.rewards[t].draw()
        }
        }
        reward(selection){
            this.dicecup.push(selection)    
        }
        draw(){
            this.rollButton.draw()
                           canvas_context.font = "20px comic sans ms"   
                canvas_context.fillStyle = "white"
            canvas_context.fillText("roll", this.rollButton.x+15, this.rollButton.y+25)
            
            
            
            
            this.frame+= .25
            canvas_context.drawImage(handimg, 64*(Math.floor(this.frame)%(this.frames)), 0, 48,48, this.body.x-64, this.body.y-64, 89, 89)
            canvas_context.fillStyle = "#00FF00"
            canvas_context.fillRect(this.body.x-64, this.body.y-74, 89*(this.health/this.maxhealth), 10)
            
            
            
                     canvas_context.fillText(this.health, this.body.x-64 + 50, this.body.y-100)
                     
                     
                     
                                 canvas_context.strokeStyle = "black"
            canvas_context.lineWidth = "1"
            canvas_context.strokeRect(this.body.x-66, this.body.y-76, 130, 12)
           this.displayRewards() 
           for(let t = 0;t<this.enemies.length;t++){
              this.enemies[t].draw()
            }
           for(let t = this.enemies.length-1;t>=0;t--){
               if(this.enemies[t].health <= 0){
                        this.enemies.splice(t,1)
                  }
            }
           for(let t = 0;t<this.dicecup.length;t++){
               if(Math.random()<.01 && this.dicecup[t].rolled ==0){
               this.dicecup[t].body.body.x = (Math.random()*100)+ 44
               this.dicecup[t].body.body.y = (Math.random()*620)+50
                  }
                   this.dicecup[t].draw()
              }
              
              if(this.enemies.length==0){
                  this.level+=.5
                  this.generateReward()
                  
                  
           for(let t = 0;t<this.dicecup.length;t++){
               
               this.dicecup[t].body.body.x = (Math.random()*100)+ 44
               this.dicecup[t].body.body.y = (Math.random()*620)+50
               this.dicecup[t].rolled = 0
              }
              
                    this.enemies = [new Enemy(this.level), new Enemy(this.level), new Enemy(this.level)] 
                }
        }  
        
    }
    
    let hand = new Handeaux()
    
    class Projector {
        constructor(){
            this.body = new Circle(640, 360, 10,"red")
            this.ball = new Circle(640, 360, 6,"white")
            this.len = 0
            this.ang = 0
            this.link = new LineOP(this.body, this.ball, "yellow", 3)
            this.xvec = .03
            this.yvec = .01
            this.obstacles = []
//             for(let t = 0; t<100;t++){
//                 this.obstacles.push(new Circle((Math.random()*1000) + 140, Math.random()*480, 15, "orange"))
//             }
            for(let t = 0; t<100;t++){
                let c = new Circle((Math.floor(t/10)*90) + (70) + (t*1) + ((t%3)*40) ,30+ ((t%5) * 90) + 240 + ((t%3)*40), 15, "orange")
//                 this.obstacles.push(c)
            }
            this.friction = 1
            this.restitution = .01
        }
        reflectDot(){
let l = new LineOP(this.dot, this.dot);
for (let t = 0; t < this.obstacles.length; t++) {
    l.target = this.obstacles[t];
    let h = l.hypotenuse();
    let rad = this.dot.radius + this.obstacles[t].radius;
    if (h < rad) {
        let nx = l.target.x - this.dot.x;
        let ny = l.target.y - this.dot.y;
        let length = Math.sqrt(nx * nx + ny * ny);
        nx /= length; 
        ny /= length;
        let overlap = rad - h;
        this.dot.x -= nx * overlap * 1; 
        this.dot.y -= ny * overlap * 1;
        let dotSpeed = Math.sqrt(this.dot.xmom * this.dot.xmom + this.dot.ymom * this.dot.ymom);
        let dotVelocity = { x: this.dot.xmom / dotSpeed, y: this.dot.ymom / dotSpeed };
        let dotProduct = dotVelocity.x * nx + dotVelocity.y * ny;
        this.dot.xmom -= 2 * dotProduct * nx * (1 -  this.restitution);
        this.dot.ymom -= 2 * dotProduct * ny * (1 - this.restitution);
        this.dot.xmom *= this.friction;
        this.dot.ymom *= this.friction;
        break
    }
}

        }
        draw(){
            this.body.draw()
            this.link.draw()
            this.ball.draw()
            for(let t = 0; t<this.obstacles.length;t++){
            this.obstacles[t].draw()
            }
             this.dot = new Circle(this.ball.x, this.ball.y, 4, "magenta")
             this.dot.xmom = Math.cos(this.ang)*this.len/50
             this.dot.ymom = Math.sin(this.ang)*this.len/50
            for(let k = 0;k<300;k++){
                this.ndot = new Circle(this.dot.x, this.dot.y)
            for(let t = 0;t<5;t++){
                this.dot.xmom += this.xvec
                 this.dot.ymom += this.yvec
                 this.dot.move()
                this.reflectDot()
            }
            
              this.dot.draw()
              let lx = new LineOP(this.ndot, this.dot, "pink", 2)
              lx.draw()
              
             }
            
            
            
        }
        stretch(point){
            this.ball.x = point.x
            this.ball.y = point.y
            this.len = this.link.hypotenuse()
            this.ang = this.link.angle()
        }
    }
    
    let scanner = new Projector()
    
    let dtx = 0
    let buff1 = canvas_context.getImageData(0,0,16,16)
    let destinationImageData;

function addImageDataAtPosition(sourceImageData, offsetX, offsetY) {
  const sourceData = sourceImageData.data;
  const destData = destinationImageData.data;
  
  const sourceWidth = sourceImageData.width;
  const sourceHeight = sourceImageData.height;
  
  // Define pixel byte positions (RGBA = 4 bytes)
  const sourceWidth4 = sourceWidth * 4;
  const destWidth = destinationImageData.width;
  const destWidth4 = destWidth * 4;

  // Start mddain loop to merge source data into destination data
  for (let y = 0; y < sourceHeight; y++) {
    // Precompute row start positions
    const sourceRowStart = y * sourceWidth4;
    const destRowStart = (y + offsetY) * destWidth4 + offsetX * 4;

    for (let x = 0; x < sourceWidth; x++) {
      // Compute pixel start positions for source and destination
      const sourcePixelIndex = sourceRowStart + x * 4;
      const destPixelIndex = destRowStart + x * 4;

      // Directly copy RGBA values (no need for intermediary operations)
      destData[destPixelIndex]     = sourceData[sourcePixelIndex];     // Red
      destData[destPixelIndex + 1] = sourceData[sourcePixelIndex + 1]; // Green
      destData[destPixelIndex + 2] = sourceData[sourcePixelIndex + 2]; // Blue
      destData[destPixelIndex + 3] = sourceData[sourcePixelIndex + 3]; // Alpha
    }
  }

  // Put the modified image data back onto the canvas
//   canvas_context.putImageData(destinationImageData, 0, 0);
}

// Example usage
// Assume destinationImageData and sourceImageData are already defined
// with proper sizes and pixel data

// Initialize destinationImageData if not yet initialized
destinationImageData = canvas_context.getImageData(0, 0, canvas.width, canvas.height);

// Adding source data at offset (50, 50)
    
    let sporeball2 = new Image()
    sporeball2.src = "sporeball2.png"
    
    
    
    
    
//     if(keysPressed[' ']){
//     }
    
//     canvas_context.putImageData(destinationImageData, 0, 0)
    
    
    class Terrain {
        constructor(){
            this.grid = []
            this.linear = []
            for(let t =0;t<25;t++){
                let fr = []
            for(let k =0;k<25;k++){
                let r = new Rectangle(100+(t*20), 100+(k*20), 20,20,"white")
                fr.push(r)
                this.linear.push(r)
                if(k == 24){
                    r.block = 1
                }
            }
            this.grid.push(fr)
            }
        }
        draw(){
            for(let t= 0;t<this.linear.length;t++){
                this.linear[t].draw()
                if(t%25 < 1){
                    if(Math.random()<.03){
                        this.linear[t].wet = 1
                    }
                }
            }
            for(let t= 0;t<this.grid.length;t++){
            for(let k =0;k<this.grid.length;k++){
                if(this.grid[t][k].isPointInside(TIP_engine)){
                    this.grid[t][k].block = 1
                }
                if(this.grid[t][k].wet == 1){
                    this.grid[t][k].color = "blue"
                }else{
                    this.grid[t][k].color = "white"
                    
                }
                if(this.grid[t][k].block == 1){
                    this.grid[t][k].color = "black"
                }
                this.grid[t][k].draw()
            }
            }
            for(let t= this.grid.length-1;t>=0;t--){
            for(let k = this.grid.length-1;k>=0;k--){
                if(t < 24){
                    if(k < 24){
                if(this.grid[t][k].wet == 1){
                    if(this.grid[t][k+1].block != 1 && this.grid[t][k+1].wet!=1){
                    this.grid[t][k].wet = 0
                    this.grid[t][k+1].wet=1
                    }else{
                        
                           if(t > 0){
                    if(k > 0){ 
                        if(Math.random()<.7){
                            if(this.grid[t-1][k].block != 1 && this.grid[t-1][k].wet != 1){
                    this.grid[t][k].wet = 0
                                this.grid[t-1][k].wet = 1
                            }else{
                                
                            if(this.grid[t+1][k].block != 1 && this.grid[t+1][k].wet != 1){
                    this.grid[t][k].wet = 0
                                this.grid[t+1][k].wet = 1
                            }
                            }
                            
                        }else{
                    
                            if(this.grid[t+1][k].block != 1 && this.grid[t+1][k].wet != 1){
                    this.grid[t][k].wet = 0
                                this.grid[t+1][k].wet = 1
                            }else{
                                
                                  if(this.grid[t-1][k].block != 1 && this.grid[t-1][k].wet != 1){
                    this.grid[t][k].wet = 0
                                this.grid[t-1][k].wet = 1
                            }
                            }
                            
                        }
                    }else{
                         this.grid[t][k].wet = 0
                    }
                }else{
                    this.grid[t][k].wet = 0 
                }
                    }
                }
            }
            }
            }
            }
            
            
            
            for(let t= this.grid.length-1;t>=0;t--){
            for(let k = this.grid.length-1;k>=0;k--){
                if(t == 0 || t > 23){
                    this.grid[t][k].wet = 0
                }
            }
            }
        }
    }
    
    
    let g = new Terrain()
    
    let sheet = new Image()
    sheet.src = "starssheet.png"
    
    class Tile {
        constructor(x, y){
            this.improvements = []
            this.redarmy = []
            this.greenarmy = []
            this.x =  x
            this.y =  y
            this.width = 100
            this.height = 100
            this.owner = -1
            this.castle = 0
            this.ten = Math.floor(Math.random()*9)
            this.twen = Math.floor(Math.random()*9)
        }
        
        isPointInside(point) {
            if (point.x >= this.x) {
                if (point.y >= this.y) {
                    if (point.x <= this.x + this.width) {
                        if (point.y <= this.y + this.height) {
                            return true
                        }
                    }
                }
            }
            return false
        }
        draw(){
            this.rect = new Rectangle(this.x, this.y, this.width, this.height, "black")
            
            if(this.owner == 1){
                this.rect.color = "#00ff0044"
            }
            if(this.owner == 0){
                this.rect.color = "#ff000044"
            }
            
            this.rect.draw()
            if(avey.players[avey.turn].select == this){
                  this.rect.sdraw()

            }
            canvas_context.drawImage(sheet, this.ten*32,  this.twen*32, 32,32, this.rect.x+(this.rect.width*.33), this.rect.y+(this.rect.width*.33), (this.rect.width*.33), (this.rect.width*.33))
            
            
                if(this.castle == 1){ 
                
                        let r = new Rectangle(this.x + 25 , this.y+ 25, 50,50, "black")
                        r.color = "#0000ff44"
                        r.draw()
                    
                    
                    }
                    
                    
            if(this.improvements.length > 0){
                for(let t =0;t<this.improvements.length;t++){
                        let r = new Rectangle(this.x + 15 + (17*t), this.y+ 50, 15,15, "black")
                    if(this.improvements[t] == 0){ 
                        r.color = "#0000ff88"
                        r.draw()
                    }
                    if(this.improvements[t] == 1){
                        r.color = "#FFAA0088"
                        r.draw()
                        
                    }
                    if(this.improvements[t] == 2){
                        r.color = "#AA00FF88"
                        r.draw()
                        
                    }
                    if(this.improvements[t] == 3){
                        r.color = "#ffffff88"
                        r.draw()
                        
                    }
                }
            }
            
            
            this.rhash = {}
            this.ghash = {}
            for(let t = 0;t<this.redarmy.length;t++){
                if(this.rhash[this.redarmy[t].type]){
                    this.rhash[this.redarmy[t].type]++
                }else{
                    this.rhash[this.redarmy[t].type] = 1
                }
            }
            
            for(let t = 0;t<this.greenarmy.length;t++){
                if(this.ghash[this.greenarmy[t].type]){
                    this.ghash[this.greenarmy[t].type]++
                }else{
                    this.ghash[this.greenarmy[t].type] = 1
                }
            }
            
            
            if(this.owner == 0){
                
            for(let t = 0;t<5;t++){
            if(this.rhash[t] > 0){
                
                        let r = new Rectangle(this.x + 0 + (0), this.y+ (t*16), 34,17, "pink")
                        r.draw()
                canvas_context.fillStyle = "#000000"
            canvas_context.font = "12px comic sans ms"
            
            canvas_context.fillText(this.rhash[t], this.x+5,  this.y+ (t*16) + 10)
            }
            
            }
            }else if (this.owner == 1){
                
            for(let t = 0;t<5;t++){
            if(this.ghash[t] > 0){
                
                        let r = new Rectangle(this.x + 0 + (0), this.y+ (t*16), 34,17, "#aaffaa")
                        r.draw()
                canvas_context.fillStyle = "#000000"
            canvas_context.font = "12px comic sans ms"
            
            canvas_context.fillText(this.ghash[t], this.x+5,  this.y+ (t*16) + 10)
            }
            
            }
            
            }
            
            
        }
        account(mode){ //catj
        this.mode = mode
                if(this.castle == 1){ 
                
//                                  avey.players[this.owner].cash[0] += 1
//                                  avey.players[this.owner].cash[1] += 1
//                                  avey.players[this.owner].cash[2] += 1
//                                  avey.players[this.owner].cash[3] += 1
                }
            if(this.mode == 0){
            if(this.improvements.length > 0){
                for(let t =0;t<this.improvements.length;t++){
                             if(this.improvements[t] == 0){
                                 avey.players[this.owner].cash[0] += 1
                              }
                             if(this.improvements[t] == 1){
                                 avey.players[this.owner].cash[0] += 1
                                 avey.players[this.owner].cash[2] += 1
                              }
                             if(this.improvements[t] == 2){
                                 avey.players[this.owner].cash[2] += 1
                              }
                             if(this.improvements[t] == 3){
                                 avey.players[this.owner].cash[3] += 1
                                 avey.players[this.owner].cash[1] += 1
                              }
                }
            }
            }

            if(this.mode == 1){
            if(this.improvements.length > 0){
                for(let t =0;t<this.improvements.length;t++){
                             if(this.improvements[t] == 0){
                                 avey.players[this.owner].cash[0] += 1
                              }
                             if(this.improvements[t] == 1){
                                 avey.players[this.owner].cash[0] += 1
                                 avey.players[this.owner].cash[2] += 1
                              }
                             if(this.improvements[t] == 2){
                                 avey.players[this.owner].cash[2] += 1
                              }
                             if(this.improvements[t] == 3){
                                 avey.players[this.owner].cash[3] += 1
                                 avey.players[this.owner].cash[1] += 1
                              }
                }
            }
            }
            if(this.mode == 2){
            if(this.improvements.length > 0){
                for(let t =0;t<this.improvements.length;t++){
                             if(this.improvements[t] == 0){
                                 avey.players[this.owner].cash[0] += 1
                              }
                             if(this.improvements[t] == 1){
                                 avey.players[this.owner].cash[0] += 1
                                 avey.players[this.owner].cash[2] += 1
                              }
                             if(this.improvements[t] == 2){
                                 avey.players[this.owner].cash[2] += 1
                              }
                             if(this.improvements[t] == 3){
                                 avey.players[this.owner].cash[3] += 1
                                 avey.players[this.owner].cash[1] += 1
                              }
                }
            }
            }
            if(this.mode == 3){
            if(this.improvements.length > 0){
                for(let t =0;t<this.improvements.length;t++){
                         
                             if(this.improvements[t] == 0){
                                 avey.players[this.owner].cash[0] += 1
                              }
                             if(this.improvements[t] == 1){
                                 avey.players[this.owner].cash[0] += 1
                                 avey.players[this.owner].cash[2] += 1
                              }
                             if(this.improvements[t] == 2){
                                 avey.players[this.owner].cash[2] += 1
                              }
                             if(this.improvements[t] == 3){
                                 avey.players[this.owner].cash[3] += 1
                                 avey.players[this.owner].cash[1] += 1
                              }
                }
            }
            }
            if(this.mode == 4){
            if(this.improvements.length > 0){
                for(let t =0;t<this.improvements.length;t++){
                             if(this.improvements[t] == 0){
                                 avey.players[this.owner].cash[0] += 1
                              }
                             if(this.improvements[t] == 1){
                                 avey.players[this.owner].cash[0] += 1
                                 avey.players[this.owner].cash[2] += 1
                              }
                             if(this.improvements[t] == 2){
                                 avey.players[this.owner].cash[2] += 1
                              }
                             if(this.improvements[t] == 3){
                                 avey.players[this.owner].cash[3] += 1
                                 avey.players[this.owner].cash[1] += 1
                              }
                }
            }
            }
            
            
        }
    }
    
    class Giy {
        constructor(type){
            this.type = type
        }
    }
    
    class Owners {
        constructor(n){
            this.fac = n
            this.cash = [3, 3, 3, 3]
        }
    }
    class Avey {
        constructor(){
            this.aistep =0 
            this.aitick =0
            this.aiPlayers = [0,1]
            this.combattimer = 100
            this.combat = 0
            this.blonk = 0
            this.moding = 0
            this.moveSegment = 0
            this.turn = 0
            this.modeButtons = []
            this.modeDisp = []
            this.modeList = [-1,-1,-1]
            this.submode = -1
            for(let t= 0;t<6;t++){
                let rect = new Rectangle(1000+(t*40), 500, 30, 30, "red")
                       if(t == 1){
                    rect.color = "yellow"
                }      if(t == 2){
                    rect.color = "#00ff00"
                }    if(t == 3){
                    rect.color = "#ff00ff"
                }    if(t == 4){
                    rect.color = "#00ffff"
                }    if(t == 5){
                    rect.color = "#0000ff"
                }
                this.modeButtons.push(rect)
            }
            for(let t= 0;t<3;t++){
                let rect = new Rectangle(800, 10+(220*t), 200, 220, "red")
                if(t == 1){
                    rect.color = "yellow"
                }      if(t == 2){
                    rect.color = "#00ff00"
                }
                this.modeDisp.push(rect)
            }

            this.grid = []
            this.linear = []
            this.players = []
            this.players.push(new Owners(0))
            this.players.push(new Owners(1))
            for(let t= 0;t<7;t++){
                let g = []
            for(let k= 0;k<7;k++){
                let tile = new Tile(10+(100*t), 10+(100*k))
                tile.t = t
                tile.k = k
                g.push(tile)
                this.linear.push(tile)
            }
            this.grid.push(g)
        }
        
            let c = 0
            let r = 0
            let b = 0
            for(let d= 0;c<7;d++){
                let t = Math.floor(Math.random()*7)
                let k = Math.floor(Math.random()*7)
                
                    if(r == 0){
                        t = 0
                        k = 0 
                    }
                    if(r == 1){
                        if(b == 0){
                        t = 6
                        k = 6
                        }else{
                            k = 6-t
                            
                        }
                    }
                let n = this.neighbors(this.grid[t][k])
                let f = [...n]
                
//                 //console.log(n)
                for(let s = 0;s<n.length;s++){
                    let g = this.neighbors(n[s])
                    for(let x = 0;x<g.length;x++){
                        if(Math.random() < .2){
                            
                            
                        f.push(g[x])
                        }
                    }
                }
                n = [...f]
//                 //console.log(n)
                let w = 0
                for(let s = 0;s<n.length;s++){
                    if(n[s].castle == 1 || this.grid[t][k].castle == 1){
                        w++
                    }
                }
                if(w == 0){ 
                    this.grid[t][k].castle = 1
                    if(r == 0){
                        this.grid[t][k].owner = 0
                        this.grid[t][k].redarmy.push(new Giy(0))
                        this.grid[t][k].redarmy.push(new Giy(0))
                        this.grid[t][k].improvements = [3,2,1]
                        r = 1
                    }else{
                        if(b == 0){
                            this.grid[t][k].owner = 1
                        this.grid[t][k].greenarmy.push(new Giy(0))
                        this.grid[t][k].greenarmy.push(new Giy(0))
                        this.grid[t][k].improvements = [3,2,1]
                             b = 1
                        }
                    }
                    c++
                    continue
                }
            }
        }
        aiPlay(){
            
            if(this.blonk >= 3){
                
            this.blonk = 0
            this.moding = 0
            this.moveSegment = 0
            this.turn++
            this.turn%=2
            return
            }
            this.cleanoutrec()
            this.point = new Circle(0,0,1,"white")
            if(Math.random() < .001){
                
            this.check(this.point)
            }
            this.point.draw()
            
            this.pointertile = {}
            
            if(this.moding == 0){
            this.card = Math.floor(Math.random()*6)
            this.set = 0
            if(this.players[this.turn].cash[0] >= 14){      //
             if( (this.players[this.turn].cash[0] < 30)){   
            if(Math.random() < .3){
            this.card = 5
            this.set = 1
            }
            if(Math.random() < .2){
            this.card = 4
            this.set = 1
            }
            }
            if( (this.players[this.turn].cash[2] > 11 &&  this.players[this.turn].cash[1] > 11)){    
            
             if( (this.players[this.turn].cash[2] < 40)){      
             if(Math.random() < .3){
            this.card = 5
            this.set = 1
            }
            
            if(Math.random() < .4){
            this.card = 3
            this.set = 1
            }
            }
            }
            }
              if( (this.players[this.turn].cash[3] > 11 &&  this.players[this.turn].cash[0] > 11)){      
             if( (this.players[this.turn].cash[3] < 40)){      
       
            if(Math.random() < .34){
            this.card = 0
            this.set = 1
            }
            if(Math.random() < .34){
            this.card = 2
            this.set = 1
            }
                    }
            }
             if( (this.players[this.turn].cash[2] > 19 &&  this.players[this.turn].cash[3] > 9)){      
             if(Math.random() < .4){
            this.card = 1
            this.set = 1
            }
             if(Math.random() < .4){
            this.card = 2
            this.set = 1
            }
             if(Math.random() < .4){
            this.card = 3
            this.set = 1
            }
            }else if( (this.players[this.turn].cash[2] >11&&  this.players[this.turn].cash[1] > 11)){    
             if(Math.random() < .66){
            this.card = 5
            this.set = 1
            }
            }
            
            if( (this.players[this.turn].cash[2] > 19 &&  this.players[this.turn].cash[3] > 9)){      
             if(Math.random() < .4){
            this.card = 1
            this.set = 1
            }
             if(Math.random() < .4){
            this.card = 2
            this.set = 1
            }
             if(Math.random() < .4){
            this.card = 3
            this.set = 1
            }
            }
             if( (this.players[this.turn].cash[2] > 11 &&  this.players[this.turn].cash[1] > 11)){    
             if(Math.random() < .66){
            this.card = 5
            this.set = 1
            }
            }
            
            if(this.set == 0){
                
                   if(Math.random() < .55){
            this.card = Math.floor(Math.random()*3)
                }
                   if(Math.random() < .15){
                    
                this.card = 4
                }
            }
            
            
                this.point.x = this.modeButtons[this.card].x+10
                this.point.y = this.modeButtons[this.card].y+10
            }
            
            if(this.moding == 1){
                if(this.submode == -1){
            this.card = Math.floor(Math.random()*3)
            this.card = this.blonk
     
            if(this.blonk >= 3){
                
            this.blonk = 0
            this.moding = 0
            this.moveSegment = 0
            this.turn++
            this.turn%=2
            return
            }
                            this.point.x = this.modeDisp[this.card].x+10
                this.point.y = this.modeDisp[this.card].y+10
                    this.c = 0
                }else{
                    
            this.card = Math.floor(Math.random()*7)
            this.card2 = Math.floor(Math.random()*7)
            if(this.submode == 1){
                
                let few = 0
                for(let w = 0;w<20;w++){
                    
                let n = this.neighbors(this.grid[this.card][this.card2])
                let wet = 0
                    if(this.turn == 0){
                    for(let d = 0;d<n.length;d++){
                        if(this.grid[this.card][this.card2].redarmy.length > 0){
                            continue
                        }
                        if(wet == 1){
                            continue   
                        }
                        if(n[d].greenarmy.length > 0){
                            wet = 1
                           this.card = Math.floor(Math.random()*7)
                           this.card2 = Math.floor(Math.random()*7) 
                        }
                    }
                    if(wet == 0){
                        few = 1
                    }
                    }else{
                        
                    for(let d = 0;d<n.length;d++){
                        if(this.grid[this.card][this.card2].greenarmy.length > 0){
                            continue
                        }
                        if(wet == 1){
                            continue   
                        }
                        if(n[d].redarmy.length > 0){
                            wet = 1
                           this.card = Math.floor(Math.random()*7)
                           this.card2 = Math.floor(Math.random()*7) 
                        }
                    }
                    if(wet == 0){
                        few = 1
                    }
                    }
                    if(few == 1){
                        break
                    }
                }

                
            }else  if(this.submode > 1){ 
                
                let few = 0
                for(let w = 0;w<20;w++){
                    
                let n = this.neighbors(this.grid[this.card][this.card2])
                let wet = 0
                    if(this.turn == 0){
                    for(let d = 0;d<n.length;d++){
                        if(wet == 1){
                            continue   
                        }
                        if(n[d].greenarmy.length > 0){
                            wet = 1
                           this.card = Math.floor(Math.random()*7)
                           this.card2 = Math.floor(Math.random()*7) 
                        }
                        if(n[d].owner != this.turn){
                            if(Math.random() <.1){
                                
                            wet = 1
                           this.card = Math.floor(Math.random()*7)
                           this.card2 = Math.floor(Math.random()*7)
                            }
                        }
                    }
                    if(wet == 0){
                        few = 1
                    }
                    }else{
                        
                    for(let d = 0;d<n.length;d++){
                        if(wet == 1){
                            continue   
                        }
                        if(n[d].redarmy.length > 0){
                            wet = 1
                           this.card = Math.floor(Math.random()*7)
                           this.card2 = Math.floor(Math.random()*7)
                        }
                        
                        if(n[d].owner != this.turn){
                            if(Math.random() <.1){
                                
                            wet = 1
                           this.card = Math.floor(Math.random()*7)
                           this.card2 = Math.floor(Math.random()*7)
                            }
                        }
                    }
                    if(wet == 0){
                        few = 1
                    }
                    
                    }
                    if(few == 1){
                        break
                    }
                }
            }else if(this.submode == 0){
                    let f = []
                    
                    let g = this.neighbors(this.players[this.turn].select)
                    
                    let cet = 0
                    for(let r = 0;r<g.length;r++){
                        if(g[r].owner == this.turn){
                            cet++
                        }
                    }
                    console.log(g,cet)
                    if(cet == g.length && g.length > 0){
                        if(Math.random() < .1){
                            
                this.players[this.turn].select = {}
                delete this.players[this.turn].select
                        }
                    }
                    
                    
                    if(this.players[this.turn].select){
                        
                    if(this.turn == 0){
                        
            for(let t= 0;t<this.grid.length;t++){
            for(let k= 0;k<this.grid[t].length;k++){
                if(this.grid[t][k].redarmy.length > 0){
//                     let n = this.neighbors(this.grid[t][k])

                    let n = this.neighbors(this.players[this.turn].select)
//                     n.push(this.grid[t][k])
let cf = 0
                    for(let d = 0;d<n.length;d++){
                        if(cf >0){
                            
                                continue
                        }
                        if(n[d].redarmy.length > 0){
                            if(Math.random() < .8){
                                continue
                            }
                            
                        }
                        if(n[d].owner ==  this.turn){
                            if(Math.random() < .8){
                                continue
                            }
                            
                        }
                        f.push(n[d])
           
                        if(n[d].castle == 1 && n[d].greenarmy.length*1.1 < this.grid[t][k].redarmy.length && n[d].owner !=  this.turn){
                            f = [n[d]]
                            cf = 1
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                                       f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                                    f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                                    f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])

                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                                       f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                                    f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                                    f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                            
                        }
                        if(n[d].greenarmy.length  == 0 && n[d].owner != this.turn){
                            
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                                 if(n[d].castle == 1 && n[d].greenarmy.length*1.1 < this.grid[t][k].redarmy.length  && n[d].owner !=  this.turn){
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])

                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])

                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])

                            
                        }
                        }
                        if(n[d].greenarmy.length*1.1 < this.grid[t][k].redarmy.length && n[d].greenarmy.length > 0){
                            
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])

                        }
                    }
                }
            }
            }
                    }else{
                        
            for(let t= 0;t<this.grid.length;t++){
            for(let k= 0;k<this.grid[t].length;k++){
                if(this.grid[t][k].greenarmy.length > 0){
//                     let n = this.neighbors(this.grid[t][k])

                    let n = this.neighbors(this.players[this.turn].select)
//                     n.push(this.grid[t][k])
let cf = 0
                    for(let d = 0;d<n.length;d++){
                        if(cf >0){
                            
                                continue
                        }
                        if(n[d].greenarmy.length > 0){
                            if(Math.random() < .8){
                                continue
                            }
                            
                        }
                        if(n[d].owner ==  this.turn){
                            if(Math.random() < .8){
                                continue
                            }
                            
                        }
                        f.push(n[d])
           
                        if(n[d].castle == 1 && n[d].redarmy.length*1.1 < this.grid[t][k].greenarmy.length && n[d].owner !=  this.turn){
                            f = [n[d]]
                            cf = 1
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                                       f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                                    f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                                    f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])

                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                                       f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                                    f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                                    f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                            
                        }
                        if(n[d].redarmy.length  == 0 && n[d].owner != this.turn){
                            
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                                 if(n[d].castle == 1 && n[d].redarmy.length*1.1 < this.grid[t][k].greenarmy.length  && n[d].owner !=  this.turn){
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])

                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])

                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])

                            
                        }
                        }
                        if(n[d].redarmy.length*1.1 < this.grid[t][k].greenarmy.length && n[d].redarmy.length > 0){
                            
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])
                         f.push(n[d])

                        }
                    }
                }
            }
            }
            }
                    }else{
                        
                        
                    if(this.turn == 0){
                        
            for(let t= 0;t<this.grid.length;t++){
            for(let k= 0;k<this.grid[t].length;k++){
                if(this.grid[t][k].redarmy.length > 0){
                    let n = this.neighbors(this.grid[t][k])
                    for(let d = 0;d<n.length;d++){
                         if(this.grid[t][k].castle == 1 || this.grid[t][k].improvements.includes(2)){
                                      if(Math.random() < .5){
                                 continue
                              }
                             
                        f.push(this.grid[t][k])
                          }else{
                              
                            let n = this.neighbors(this.grid[t][k])
                            
                            let cf2 = 1
                    for(let d = 0;d<n.length;d++){
                        if(n[d].owner != this.turn){
                            cf2+=Math.round(this.grid[t][k].redarmy.length/2)
                        }else{
                            cf2+=Math.floor(this.grid[t][k].redarmy.length/3)
                        }
                    }
                    
                    for(let s = 0;s<cf2*cf2;s++){
                        f.push(this.grid[t][k])
                    }
                        
                        
                        
                            }
                    }
                }
            }
            }
                    }else{
                        
                        
            for(let t= 0;t<this.grid.length;t++){
            for(let k= 0;k<this.grid[t].length;k++){
                if(this.grid[t][k].greenarmy.length > 0){
                    let n = this.neighbors(this.grid[t][k])
                    for(let d = 0;d<n.length;d++){
                         if(this.grid[t][k].castle == 1|| this.grid[t][k].improvements.includes(2)){
                             if(Math.random() < .5){
                                 continue
                              }
                        f.push(this.grid[t][k])
                          }else{
           
                              
                            let n = this.neighbors(this.grid[t][k])
                            
                            let cf2 = 1
                    for(let d = 0;d<n.length;d++){
                        if(n[d].owner != this.turn){
                            cf2+=Math.round(this.grid[t][k].greenarmy.length/2)
                        }else{
                            cf2+=Math.floor(this.grid[t][k].greenarmy.length/3)
                        }
                    }
                    
                    for(let s = 0;s<cf2*cf2;s++){
                        f.push(this.grid[t][k])
                    }
                        
                        

                            }
                    }
                }
            }
            }
            }
            
            
                    }
                let sd = Math.floor(Math.random()*f.length)
                console.log(f,sd)
                this.point.x = f[sd].x + 10
                this.point.y = f[sd].y + 10
                this.card = f[sd].t
                this.card2 = f[sd].k
            }
                this.point.x = this.grid[this.card][this.card2].x+10
                this.point.y = this.grid[this.card][this.card2].y + 10
                this.c++
                if(this.c > 100){
                    
            this.card = this.blonk
                this.point.x = this.modeDisp[this.card].x+10
                this.point.y = this.modeDisp[this.card].y+10
                }
                }
            }
            this.aistep++
            if(this.aistep > this.aitick){
                this.aistep = 0
            this.check(this.point)
            }
            
            
            
        }
        cleanoutrec(){
            
            if(this.submode == 6 && this.players[this.turn].cash[0] < 15){         
                                  this.submode = -1
                                  this.blonk++
                                  return
            }
            if(this.submode == 3 && (this.players[this.turn].cash[3] < 12 ||  this.players[this.turn].cash[0] < 12)){         
                                  this.submode = -1
                                  this.blonk++
                                  return
            }
            if(this.submode == 1 && (this.players[this.turn].cash[2] < 20 ||  this.players[this.turn].cash[3] < 10)){         
                                  this.submode = -1
                                  this.blonk++
                                  return
            }
            
            
            if(this.submode == 5 && (this.players[this.turn].cash[2] < 12 ||  this.players[this.turn].cash[1] < 12)){         
                                  this.submode = -1
                                  this.blonk++
                                  return
            }
        }
        check(point){
            if(this.blonk >= 3){
                
            this.blonk = 0
            this.moding = 0
            this.moveSegment = 0
            this.turn++
            this.turn%=2
            return
            }
            this.cleanoutrec()
            
            
                let fer = 0
            for(let t= 0;t<this.grid.length;t++){
            for(let k= 0;k<this.grid[t].length;k++){
                
                    if(this.grid[t][k].isPointInside(point)){
                        fer++
                    }
            }
            }
            if(fer == 0){
                if(this.submode > -1 && this.moding > 0){
                
                if(this.submode ==0){
            if(!this.players[this.turn].select){
                                  this.submode = -1
                                  this.blonk++
                                return
            }
                }else{
                    if(this.submode != 4 && this.submode != 2){
                        
                                  this.submode = -1
                                  this.blonk++
                                return
                                        }
                    
                }
            }
            }
            
            
            
            if(this.moding == 2){
                this.moding = 0
                return
            }
            if(this.moding == 0){ 
                let wet = 0
            for(let k= 0;k<this.modeButtons.length;k++){
            if(this.modeButtons[k].isPointInside(point)){
                for(let t = 0;t<this.linear.length;t++){
                    if(this.linear[t].owner == this.turn){
//                         this.linear[t].account(t)
                        this.players[this.turn].gid = k
                        wet = 1
                        
                    }
                }
            }
            }
            if(wet == 1){
                        this.moding++
                
            }
                return
            }
            if(this.moding == 1){
                if(this.moveSegment == 0){
                    
            for(let k= 0;k<this.modeDisp.length;k++){
            if(this.modeDisp[k].isPointInside(point) && k <= this.blonk){
                this.submode = this.modeList[k]      
                return   
            }
            }
                }
            }
            
            if(this.submode == 0){
                              if(this.turn == 0){
                let fet = 0

            for(let t= 0;t<this.grid.length;t++){
            for(let k= 0;k<this.grid[t].length;k++){
                fet+=this.grid[t][k].redarmy.length
                //console.log(fet,t,k)
            }
            } 
            //console.log(fet)
                            if(fet == 0){
                                
                                  this.submode = -1
                                  this.blonk++
                                  return
                            }
                  
                }
                              if(this.turn == 1){
                let fet = 0

            for(let t= 0;t<this.grid.length;t++){
            for(let k= 0;k<this.grid[t].length;k++){
                fet+=this.grid[t][k].greenarmy.length
                //console.log(fet,t,k)
            }
            }
            
            //console.log(fet)
                            if(fet == 0){
                                
                                  this.submode = -1
                                  this.blonk++
                                  return
                            }
                  
                }
                
                
                
                let fe = 0
            for(let t= 0;t<this.grid.length;t++){
            for(let k= 0;k<this.grid[t].length;k++){
                
                    if(this.grid[t][k].isPointInside(point)){
                        fe++
                    }
            }
            }
            if(fe == 0){
                this.players[this.turn].select = {}
                delete this.players[this.turn].select
                return
            }
                let wet = 0

            
            if(!this.players[this.turn].select){
                
            for(let t= 0;t<this.grid.length;t++){
            for(let k= 0;k<this.grid[t].length;k++){
                if(this.grid[t][k].owner == this.turn){
                    if(this.grid[t][k].isPointInside(point)){
                        if(this.grid[t][k].redarmy.length+this.grid[t][k].greenarmy.length){
                        this.grid[t][k].selected = 1 
                        this.players[this.turn].select = this.grid[t][k]
                        }
                    } 
                }
            }
            }
            return
            }
                        let wtt = 0
            for(let t= 0;t<this.grid.length;t++){
            for(let k= 0;k<this.grid[t].length;k++){
                    if(this.grid[t][k].isPointInside(point) && this.players[this.turn].select){
                        if(this.grid[t][k] != this.players[this.turn].select){
                            if(this.turn == 0 && this.neighbors(this.players[this.turn].select).includes(this.grid[t][k])){
                                for(let f = 0;f<this.players[this.turn].select.redarmy.length;f++){
                                  this.grid[t][k].redarmy.push(this.players[this.turn].select.redarmy[f])
                                
                                 if(this.grid[t][k].owner == -1){
                                      wtt =0
                                      
                                  this.grid[t][k].owner = this.turn
                                }else if(this.grid[t][k].owner == 0){
                                      
                                      wtt =0 
                                  this.grid[t][k].owner = this.turn
                                    }else if(this.grid[t][k].greenarmy.length == 0){
                                      
                                      wtt =0
                                  this.grid[t][k].owner = this.turn
                                    }else{
                                        wtt = 1
                                        //combat
                                    }
                                }
                                //console.log("l", wtt, this.grid[t][k])

                                if(wtt == 1){
                                        this.combat = 1
                                        ships = []
                         
                                        for(let e= 0;e<this.grid[t][k].redarmy.length;e++){
                                            ships.push(new Ship(0, 0))
                                        }
                                        for(let e = 0;e<this.grid[t][k].greenarmy.length;e++){
                                            ships.push(new Ship(0, 1))
                                        }
                                   this.contest = this.grid[t][k]
                                  this.players[this.turn].select.redarmy = []
                                  this.players[this.turn].select.greenarmy = []
                                  this.players[this.turn].select = {}
                                  this.submode = -1
//                                   this.blonk++
                                   wet = 1
                                    break
                                }
                                  this.players[this.turn].select.redarmy = []
                                  this.players[this.turn].select = {}
                                  this.submode = -1
//                                   this.blonk++
                                   wet = 1
                                    break

                            }else if(this.turn == 1 &&  this.neighbors(this.players[this.turn].select).includes(this.grid[t][k])){
                                
                                for(let f = 0;f<this.players[this.turn].select.greenarmy.length;f++){
                                  this.grid[t][k].greenarmy.push(this.players[this.turn].select.greenarmy[f])
                                
                                 if(this.grid[t][k].owner == -1){
                                      
                                      wtt =0
                                  this.grid[t][k].owner = this.turn
                                }else if(this.grid[t][k].owner == 1){
                                      wtt =0
                                  this.grid[t][k].owner = this.turn
                                    }else if(this.grid[t][k].redarmy == 1){
                                      wtt =0
                                  this.grid[t][k].owner = this.turn
                                    }else{
                                        wtt = 1
                                        //combat
                                    }
                                }
                                //console.log("l")
                                //console.log("l", wtt, this.grid[t][k])
                                if(wtt == 1){
                                        this.combat = 1
                                        ships = []
                                        for(let e= 0;e<this.grid[t][k].redarmy.length;e++){
                                            ships.push(new Ship(0, 0))
                                        }
                                        for(let e = 0;e<this.grid[t][k].greenarmy.length;e++){
                                            ships.push(new Ship(0, 1))
                                        }
                                   this.contest = this.grid[t][k]
                                  this.players[this.turn].select.redarmy = []
                                  this.players[this.turn].select.greenarmy = []
                                  this.players[this.turn].select = {}
                                  this.submode = -1
                                   wet = 1
//                                   this.blonk++
                                    break

                                }
                                  this.players[this.turn].select.greenarmy = []
                                  this.players[this.turn].select = {}
                                  this.submode = -1
                                   wet = 1
                                   this.contest = this.grid[t][k]
//                                   this.blonk++
                                    break

                            }
                        }
                       }
                    
            }
            }
                
                if(wet == 1){
                    
                this.players[this.turn].select = {}
                delete this.players[this.turn].select
                                  this.blonk++
                                  return
                }
            }
//             //console.log(this.submode)
            if(this.submode == 2){
                
                let wet = 0
//             //console.log(this.submode)
            for(let t= 0;t<this.grid.length;t++){
//             //console.log(this.submode)
            for(let k= 0;k<this.grid[t].length;k++){
//             //console.log(this.submode)
                if(this.grid[t][k].owner == this.turn){
                        if(this.turn == 0){ 
                        if(this.grid[t][k].castle == 1){
                            
                                  this.submode = -1
//                             this.grid[t][k].redarmy.push(new Giy(0))
                        }
                        
                        
                        for(let r = 0;r<this.grid[t][k].improvements.length;r++){
                            if( this.grid[t][k].improvements[r] == 2){
                                
                                  this.submode = -1
                                console.log(this)
                            this.grid[t][k].redarmy.push(new Giy(0))
                            }
                        } 
                        
                                  this.submode = -1
                                   wet = 1

                        }else{
                        if(this.grid[t][k].castle == 1){
                                  this.submode = -1
//                             this.grid[t][k].greenarmy.push(new Giy(0))
                        }
                        
                        for(let r = 0;r<this.grid[t][k].improvements.length;r++){
                            if( this.grid[t][k].improvements[r] == 2){
                                  this.submode = -1
                                console.log(this)
                            this.grid[t][k].greenarmy.push(new Giy(0))
                            }
                        }
                        
                        
                                  this.submode = -1
                             wet = 1
                             

                        }
                }
                        
                    }
                }
                
                if(wet == 1){
                    
                                  this.blonk++
                                  return
                }
            }
            
            if(this.submode == 4){
                
                let wet = 0
                for(let t = 0;t<this.linear.length;t++){
                    if(this.linear[t].owner == this.turn){
                        console.log(this.players[this.turn].gid)
                        this.linear[t].account(this.players[this.turn].gid)
                                  this.submode = -1
                                  wet = 1
                    }
                }
                if(wet == 1){
                    
                                  this.blonk++
                                  return
                }
            }
            
            
            
            if(this.submode == 3){
                
                let wet = 0

                
            for(let t= 0;t<this.grid.length;t++){
            for(let k= 0;k<this.grid[t].length;k++){
                if(this.grid[t][k].owner == this.turn){
                    if(this.grid[t][k].isPointInside(point)){
                        if(this.grid[t][k].improvements.length <4){
                            
                        this.grid[t][k].improvements.push(3)         
                                  this.submode = -1
                                wet = 1
                                  this.players[this.turn].cash[3] -= 12
                                  this.players[this.turn].cash[0] -= 12

                        }
                    }
                }
            }
            }
                if(wet == 1){
                    
                                  this.blonk++
                                  return
                }
            }
            
            
            
            
            if(this.submode == 1){
                
                let wet = 0
                
            for(let t= 0;t<this.grid.length;t++){
            for(let k= 0;k<this.grid[t].length;k++){
                if(this.grid[t][k].owner == this.turn){
                    if(this.grid[t][k].isPointInside(point)){
                        if(this.grid[t][k].improvements.length <4){
                        this.grid[t][k].improvements.push(2)         
                                  this.submode = -1
                                  this.players[this.turn].cash[3] -= 10
                                  this.players[this.turn].cash[2] -= 20
//                                   this.blonk++
 wet = 1

                              }
                    }
                }
            }
            }
            
                if(wet == 1){
                    
                                  this.blonk++
                                  return
                }
            }
            
            
            if(this.submode == 5){
                
                let wet = 0
                
            for(let t= 0;t<this.grid.length;t++){
            for(let k= 0;k<this.grid[t].length;k++){
                if(this.grid[t][k].owner == this.turn){
                    if(this.grid[t][k].isPointInside(point)){
                        if(this.grid[t][k].improvements.length <4){
                        this.grid[t][k].improvements.push(1)          
                                  this.submode = -1
                                  this.players[this.turn].cash[2] -= 12
                                  this.players[this.turn].cash[1] -= 12
//                                   this.blonk++
 wet = 1
}
                               
                    }
                }
            }
            }
            
                if(wet == 1){
                    
                                  this.blonk++
                                  return
                }
            }
            
            if(this.submode == 6){
                
                let wet = 0
                
            for(let t= 0;t<this.grid.length;t++){
            for(let k= 0;k<this.grid[t].length;k++){
                if(this.grid[t][k].owner == this.turn){
                    if(this.grid[t][k].isPointInside(point)){
                        if(this.grid[t][k].improvements.length <4){
                        this.grid[t][k].improvements.push(0)          
                                  this.submode = -1
                                  this.players[this.turn].cash[0]-= 15
//                                   this.blonk++
 wet = 1
}
                               
                    }
                }
            }
            }
            
                if(wet == 1){
                    
                                  this.blonk++
                                  return
                }
            }
            
            
            if(this.blonk >= 3){
                
            this.blonk = 0
            this.moding = 0
            this.moveSegment = 0
            this.turn++
            this.turn%=2
            }
            
        }
    neighbors(node) {
        
        if(node){
            
        }else{
            return []
        }
        var ret = [];
        var x = node.t;
        var y = node.k;
        var grid = this.grid;
        this.diagonal = false
        // West
        if (grid[x - 1] && grid[x - 1][y]) {
            // if (grid[x - 1][y].type == node.type || (node.type2 == -1 && grid[x - 1][y].type2 == -1)) {
            // if (grid[x - 1][y].marked == 1) {
            ret.push(grid[x - 1][y]);
            // }
            // }
        }
        // East
        if (grid[x + 1] && grid[x + 1][y]) {
            // if (grid[x + 1][y].type == node.type || (node.type2 == -1 && grid[x + 1][y].type2 == -1)) {
            // if (grid[x + 1][y].marked == 1) {
            ret.push(grid[x + 1][y]);
            // }
            // }
        }
        // South
        if (grid[x] && grid[x][y - 1]) {
            // if (grid[x][y - 1].type == node.type || (node.type2 == -1 && grid[x][y - 1].type2 == -1)) {
            // if (grid[x][y - 1].marked == 1) {
            ret.push(grid[x][y - 1]);
            // }
            // }
        }
        // North
        if (grid[x] && grid[x][y + 1]) {
            // if (grid[x][y + 1].type == node.type || (node.type2 == -1 && grid[x][y + 1].type2 == -1)) {
            // if (grid[x][y + 1].marked == 1) {
            ret.push(grid[x][y + 1]);
            // }
            // }
        }
        if (this.diagonal) {
            // Southwest
            if (grid[x - 1] && grid[x - 1][y - 1]) {
                // if (grid[x - 1][y - 1].marked == 1) {
                ret.push(grid[x - 1][y - 1]);
                // }
            }
            // Southeast
            if (grid[x + 1] && grid[x + 1][y - 1]) {
                // if (grid[x + 1][y - 1].marked == 1) {
                ret.push(grid[x + 1][y - 1]);
                // }
            }
            // Northwest
            if (grid[x - 1] && grid[x - 1][y + 1]) {
                // if (grid[x - 1][y + 1].marked == 1) {
                ret.push(grid[x - 1][y + 1]);
                // }
            }
            // Northeast
            if (grid[x + 1] && grid[x + 1][y + 1]) {
                // if (grid[x + 1][y + 1].marked == 1) {
                ret.push(grid[x + 1][y + 1]);
                // }
            }
        }
                return ret;
    }


        draw(){
            
            if(this.blonk >= 3){
                
            this.blonk = 0
            this.moding = 0
            this.moveSegment = 0
            this.turn++
            this.turn%=2
            }
            this.cleanoutrec()
            if(this.moding == 2){
                this.moding = 0
                return
            }
            
            if(this.moding == 0){
                
            for(let k= 0;k<this.modeButtons.length;k++){
            this.modeButtons[k].draw()
            if(k == 0){
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("MSC", this.modeButtons[k].x , this.modeButtons[k].y + 60)  
            }
            if(k == 1){
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("FMS", this.modeButtons[k].x, this.modeButtons[k].y + 60)  
            }
            if(k == 2){
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("RCM", this.modeButtons[k].x, this.modeButtons[k].y + 60)  
            }
            if(k == 3){
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("StRF", this.modeButtons[k].x, this.modeButtons[k].y + 60)  
            }
            if(k == 4){
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("SDR", this.modeButtons[k].x, this.modeButtons[k].y + 60)  
            }
            if(k == 5){
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("DMSt", this.modeButtons[k].x, this.modeButtons[k].y + 60)  
            }
            
            
            }
            }
            if(this.moding == 1){
                
            for(let k= 0;k<this.modeDisp.length;k++){
                if(k >= this.blonk){
            this.modeDisp[k].draw()
            if(k == this.blonk  && this.submode != -1){
                this.modeDisp[k].sdraw()

            }
                    
                }else{
                    continue
                }
            if(k == 0){
                if(this.players[this.turn].gid == 0){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Move", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("Move One group of Ships", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60)  
            this.modeList[0] = 0
            }
                if(this.players[this.turn].gid == 1){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Fortify", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("For [0,0,20,10] Place Fort", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60)   
            this.modeList[0] = 1
            }
                if(this.players[this.turn].gid == 2){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Recruit", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("Gain 1 Ship Zone/Fort", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60) 
            this.modeList[0] = 2
            }
                if(this.players[this.turn].gid == 3){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Station", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("For [0,12,12,0] Place Station", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60) 
            this.modeList[0] = 5
            }
                if(this.players[this.turn].gid == 4){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Scrounge", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)   
            canvas_context.font = "12px comic sans ms"
            //canvas_context.fillText("Gain [1,1,1,1] Per Zone", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60)   
            canvas_context.fillText("Gain [1,0,0,0] Per Depot", this.modeDisp[k].x + 10, this.modeDisp[k].y + 80)   
            canvas_context.fillText("Gain [1,0,1,0] Per Station", this.modeDisp[k].x + 10, this.modeDisp[k].y + 100)   
            canvas_context.fillText("Gain [0,0,1,0] Per Fort", this.modeDisp[k].x + 10, this.modeDisp[k].y + 120)   
            canvas_context.fillText("Gain [0,1,0,1] Per Colony", this.modeDisp[k].x + 10, this.modeDisp[k].y + 140) 
            
            this.modeList[0] = 4
            }
            
                if(this.players[this.turn].gid == 5){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Depot", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("For [15,0,0,0] Place Depot", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60)   
            this.modeList[0] = 6
            }
            }
            if(k == 1){
                if(this.players[this.turn].gid == 1){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Move", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("Move One group of Ships", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60)   
            
            this.modeList[1] = 0
            }
                if(this.players[this.turn].gid == 2){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Colony", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("For [12,0,0,12] Place Colony", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60) 
            this.modeList[1] = 3
            }
                if(this.players[this.turn].gid == 3){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Recruit", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("Gain 1 Ship Zone/Fort", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60)   
            this.modeList[1] = 2 
            }
                if(this.players[this.turn].gid == 4){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Depot", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("For [15,0,0,0] Place Depot", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60)   
            this.modeList[1] = 6
            }
                if(this.players[this.turn].gid == 0){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Scrounge", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            //canvas_context.fillText("Gain [1,1,1,1] Per Zone", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60)   
            canvas_context.fillText("Gain [1,0,0,0] Per Depot", this.modeDisp[k].x + 10, this.modeDisp[k].y + 80)   
            canvas_context.fillText("Gain [1,0,1,0] Per Station", this.modeDisp[k].x + 10, this.modeDisp[k].y + 100)    
            canvas_context.fillText("Gain [0,0,1,0] Per Fort", this.modeDisp[k].x + 10, this.modeDisp[k].y + 120)   
            canvas_context.fillText("Gain [0,1,0,1] Per Colony", this.modeDisp[k].x + 10, this.modeDisp[k].y + 140) 
            
            this.modeList[1] = 4 
            }
            
                if(this.players[this.turn].gid == 5){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Move", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("Move One group of Ships", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60)  
            this.modeList[1] = 0
            }
            
            }
            if(k == 2){
                if(this.players[this.turn].gid == 2){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Move", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("Move One group of Ships", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60)  
            
            this.modeList[2] = 0
            }
                if(this.players[this.turn].gid == 3){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Fortify", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("For [0,0,20,10] Place Fort", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60) 
            this.modeList[2] = 1 
            }
                if(this.players[this.turn].gid == 4){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Recruit", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("Gain 1 Ship Zone/Fort", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60) 
            this.modeList[2] = 2
            }
                if(this.players[this.turn].gid == 5){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Station", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("For [0,12,12,0] Place Station", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60) 
            this.modeList[2] = 5
            }
                if(this.players[this.turn].gid == 0){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Colony", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            canvas_context.fillText("For [12,0,0,12] Place Colony", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60) 
            this.modeList[2] = 3
            }
                if(this.players[this.turn].gid == 1){
            canvas_context.fillStyle = "black"
            canvas_context.font = "30px comic sans ms"
            canvas_context.fillText("Scrounge", this.modeDisp[k].x + 10, this.modeDisp[k].y + 30)    
            canvas_context.font = "12px comic sans ms"
            //canvas_context.fillText("Gain [1,1,1,1] Per Zone", this.modeDisp[k].x + 10, this.modeDisp[k].y + 60)   
            canvas_context.fillText("Gain [1,0,0,0] Per Depot", this.modeDisp[k].x + 10, this.modeDisp[k].y + 80)   
            canvas_context.fillText("Gain [1,0,1,0] Per Station", this.modeDisp[k].x + 10, this.modeDisp[k].y + 100)      
            canvas_context.fillText("Gain [0,0,1,0] Per Fort", this.modeDisp[k].x + 10, this.modeDisp[k].y + 120)   
            canvas_context.fillText("Gain [0,1,0,1] Per Colony", this.modeDisp[k].x + 10, this.modeDisp[k].y + 140) 
            this.modeList[2] = 4
            }
            }
            }
            }
            for(let t= 0;t<this.grid.length;t++){
            for(let k= 0;k<this.grid[t].length;k++){
                this.grid[t][k].draw()
            }
            }
            canvas_context.fillStyle = "red"
            if(this.turn == 1){
                canvas_context.fillStyle = "#00ff00"
            }
            
            canvas_context.font = "30px comic sans ms"
            
            
            canvas_context.fillText(this.players[this.turn].cash[0] +" Scrap", 1000, 100)
            
            canvas_context.fillText(this.players[this.turn].cash[1] +" Fuel", 1000, 200)
            
            canvas_context.fillText(this.players[this.turn].cash[2] +" Ammo", 1000, 300)
            
            canvas_context.fillText(this.players[this.turn].cash[3] +" Crewmen", 1000, 400)
            
            
            if(this.aiPlayers[this.turn] == 1){
                this.aiPlay()
            }
            
            
        }
    }
    let avey = new Avey()
    
    let ship1 = new Image()
    ship1.src = "ship1.png"
    
    let ship1l = new Image()
    ship1l.src = "ship1l.png"
    
    let ship1g = new Image()
    ship1g.src = "ship1g.png"
    
    let ship1gl = new Image()
    ship1gl.src = "ship1gl.png"
    
    function drawRotatedSprite(ctx, image, x, y, width, height, angle, ship) {
    // Save the current canvas state
    ctx.save();

    // Move the canvas origin to the center of the sprite
    ctx.translate(x + width / 2, y + height / 2);

    // Rotate the canvas by the specified angle
    ctx.rotate(angle);

    // Draw the sprite, adjusting for the translation
    ctx.drawImage(image,89*Math.round(Math.abs(ship.tilt)), 0, 89,89, -width / 2, -height / 2, width, height);

    // Restore the canvas state (undo the translation and rotation)
    ctx.restore();
}


let shippy = {}
shippy.tilt = 0
    let dot = new Circle(360,360, 10, "white")
let link = new LineOP(TIP_engine, dot)
let la = 0

 class Ship {
     constructor(type, owner){
         this.shipin = 0
         this.a =   0
         this.clock = Math.floor((Math.random()-.5)*3)
         this.click = Math.floor((Math.random()-.5)*3)
         this.tilt = 0
         this.owner = owner
         this.x = 640
         this.y = 360
         this.target = {}
         this.target.x = this.x+50
         this.target.y = this.y
         if(this.owner == 0){
             this.x =89
             this.y = 64+(Math.random()*(720-89))
             this.target.x = this.x+50
          }else{
             this.x =1280-89
             this.target.x = this.x-50
             this.y = 64+(Math.random()*(720-89))
          }
         this.type = type
         this.link = new LineOP(this.target,this )
         this.health = 8
         this.range = 192
         this.pops = []
         this.po = 0
         
      }
      pop(){
          if(this.po == 0){
              
          for(let t =0 ;t<18;t++){
              this.pops.push(new Circle(this.x, this.y, 5, (this.owner == 1? "#00ff00" : "#ff0000"), Math.cos((t/18)*Math.PI*2), Math.sin((t/18)*Math.PI*2)))
            }
            this.po =1
            this.time = 30
            }
          
        }
      draw(){
//           this.target.x += (Math.random()-.5)*14
//           this.target.y += (Math.random()-.5)*14


            if(this.po == 1){
                
                for(let t= 0;t<this.pops.length;t++){
                    this.pops[t].draw()
                    this.pops[t].move()
                    this.pops[t].radius*=.95
                }
                this.time--
                return
            }
            let w = 0
            for(let t = 0;t<ships.length;t++){
                if(this.owner != ships[t].owner && ships[t].po == 0){
                    if(Math.random() < (2/ships.length) + .03){
                         w = 1
                        this.target = new Point(ships[t].x, ships[t].y + (this.clock*189))
                        this.target.x = ships[t].x - (this.click*189)
                        this.target.y = ships[t].y + (this.clock*189)
                        this.shipin = t
                        if(Math.random()<.05){
         this.clock = Math.floor((Math.random()-.5)*3)
         this.click = Math.floor((Math.random()-.5)*3)
                            
                        }
                        this.link.object = this.target
                        if(Math.random()<.25){
                            let l2 = new LineOP(this, ships[t], "white", 1.5)
                            let l = new LineOP(this, ships[t], "red", 3)
                            if(this.owner == 0){
                                l.color = "red"
                            }else{
                                l.color = "#00ff00"
                            }
                            if(l.hypotenuse() < this.range){
                            l.draw()
                            l2.draw()
                            ships[t].health--
                            }
                        }
                    }
                }
            }
          if(w == 0){
              
            for(let t = 0;t<ships.length;t++){
                if(this.owner != ships[t].owner && ships[t].po == 0){
//                     if(Math.random() < .1){
                         w = 1
                        this.target = new Point(ships[t].x, ships[t].y + (this.clock*189))
                        this.target.x = ships[t].x - (this.click*189)
                        this.target.y = ships[t].y + (this.clock*189)
                        this.shipin = t
                        if(Math.random()<.15){
         this.clock = Math.floor((Math.random()-.5)*3)
         this.click = Math.floor((Math.random()-.5)*3)
                            
                        }
                        this.link.object = this.target
//                     }
                }else{
                    if(this.owner != ships[t].owner){
                         w = 1
                    }
                }
            }
            }
          
          if(ships.length > 0 && this.shipin < ships.length){
              
                        this.target.x = ships[this.shipin].x - (this.click*189) 
                        this.target.y = ships[this.shipin].y + (this.clock*189)
                        this.link.object = this.target
            }
          if(w == 0 && avey.combattimer < 0 && this.po == 0){
//               avey.combattimer = 100
            }
    let a = this.link.angle()
    let z = la-this.a
    la = this.a
    if((z) > .1){
        this.tilt+=.5
        if(this.tilt > 5){
            this.tilt = 5
        }
    }else    if((z) < -.1){
        
        this.tilt-=.5
        if(this.tilt < -5){
            this.tilt = -5
        }
    }else{
        this.tilt = (Math.abs(this.tilt)-1)*Math.sign(this.tilt)
    }
    this.a =  easeAngle(this.a,a, .15)
    //console.log(this.a)
    for(let m = 0;m<2;m++){
        
    this.x += Math.cos(this.a)*2.5

    this.y += Math.sin(this.a)*2.5
    
    let wet = 0
            for(let t = 0;t<ships.length;t++){
                
                            let l = new LineOP(this, ships[t], "red", 2)
                            if(l.hypotenuse()<48 && this != ships[t]){
                                let a = l.angle()
                                this.x += Math.cos(a)*6.5
                                this.y += Math.sin(a)*6.5
                                if(wet == 0){
                                    
        this.a +=Math.PI/2
                                }
                                wet+=.5
                            }
                            if(l.hypotenuse()<128 && this != ships[t]){
                                wet+=.25
                                
                                if(wet == 0){
                                    
        this.a +=Math.PI/5
                                }
                            }
                
            }
            let speed = Math.max(0,12-wet)
            
    this.x += Math.cos(this.a)*speed
    this.y += Math.sin(this.a)*speed
    
            for(let t = 0;t<ships.length;t++){
                
                            let l = new LineOP(this, ships[t], "red", 2)
                            if(l.hypotenuse()<48 && this != ships[t]){
                                let a = l.angle()
                                this.x += Math.cos(a)*6.5
                                this.y += Math.sin(a)*6.5
                                wet+=3
                            }
                            if(l.hypotenuse()<128 && this != ships[t]){
                                wet++
                                
                            }
                
            }
    let c = new Point(640+((Math.random()-.5)*100),360+((Math.random()-.5)*100))
    let d = new LineOP(c,this)
    let sd = d.angle()
    this.x += Math.cos(sd)*.5
    this.y += Math.sin(sd)*.5
    let re = new Rectangle(200,200,1280-400, 720-400)
    if(re.isPointInside(this)){
        
    }else{
        
    this.x += Math.cos(sd)*.75*speed
    this.y += Math.sin(sd)*.75*speed
    }
    
    }
    
    
    
    
    if(this.x > 1280-24){
        this.x = 1280-24
        this.a +=Math.PI
    }
    if(this.x < 32){
        this.x = 32
        this.a +=Math.PI

    }
    if(this.y > 720-24){
        this.y = 720-24
        this.a +=Math.PI

    }
    if(this.y< 32){
        this.y = 32
        this.a +=Math.PI

    }
    if(this.tilt >= 0){
        if(this.owner == 0){
            
    drawRotatedSprite(canvas_context, ship1,this.x-24, this.y-24, 48,48, this.a, this)
        }else{
            
    drawRotatedSprite(canvas_context, ship1g,this.x-24, this.y-24, 48,48, this.a, this)
        }
    
    }else{
        
        if(this.owner == 0){
            
    drawRotatedSprite(canvas_context, ship1l,this.x-24, this.y-24, 48,48, this.a, this)
        }else{
            
    drawRotatedSprite(canvas_context, ship1gl,this.x-24, this.y-24, 48,48, this.a, this)
        }
    
    }

        }
  }
  
//   let s = new Ship(0,0)

let ships = []
for(let t = 0;t<4;t++){
    let s = new Ship(0,t%2)
//     ships.push(s)
}
function easeAngle(current, target, easeFactor) {
    // Normalize angles to be within [0, 2π)
    const TWO_PI = 2 * Math.PI;
    current = (current % TWO_PI + TWO_PI) % TWO_PI;
    target = (target % TWO_PI + TWO_PI) % TWO_PI;

    // Find the shortest difference between the two angles
    let difference = target - current;

    // Ensure the difference is in the range [-π, π)
    if (difference > Math.PI) {
        difference -= TWO_PI;
    } else if (difference < -Math.PI) {
        difference += TWO_PI;
    }

    // Ease the current angle towards the target by a fraction of the difference
    let easedAngle = current + difference * easeFactor;

    // Normalize the eased angle back to [0, 2π)
    return (easedAngle % TWO_PI + TWO_PI) % TWO_PI;
}
function averageAngles(angle1, angle2) {
    // Convert degrees to radians
    const rad1 = angle1 * (Math.PI / 180);
    const rad2 = angle2 * (Math.PI / 180);

    // Compute the average of the sine and cosine of both angles
    const x = (Math.cos(rad1) + Math.cos(rad2)) / 2;
    const y = (Math.sin(rad1) + Math.sin(rad2)) / 2;

    // Convert the result back to degrees and use atan2 to find the resulting angle
    let result = Math.atan2(y, x) * (180 / Math.PI);

    // Ensure the angle is between 0 and 360 degrees
    if (result < 0) {
        result += 360;
    }

    return result*(Math.PI / 180);
}
let start = 0
    function main() {    
    if(start == 2){
        
            canvas_context.fillText("You are victorious!", 100, 300)
        return
    }else if(start == 3){
        
            canvas_context.fillText("You have been defeated!", 100, 300)
        return
    }else if(start == 0){
        
            canvas_context.fillStyle = "red"
            
            canvas_context.font = "30px comic sans ms"
            
            
            canvas_context.fillText("Click to start, you will play as red", 100, 100)
            
            canvas_context.fillStyle = "#00ff00"

            canvas_context.fillText("Green will be AI against you", 100,200)
            
            canvas_context.fillStyle = "red"

            canvas_context.fillText("Capture 6 of 7 zones to win!", 100, 300)
        return
    }else if(start ==1){
        let rc = 0
        let gc = 0
        for(let t = 0;t<avey.linear.length;t++){
            if(avey.linear[t].castle == 1){
                if(avey.linear[t].owner == 0){
                    rc++
                }
                if(avey.linear[t].owner == 1){
                    gc++
                }
            }
        }
        if(gc == 6){
            start = 3
        }
        if(rc == 6){
            start = 2
        }
        
    canvas_context.clearRect(0, 0, canvas.width, canvas.height)
          if(avey.combat == 1 || avey.timec > 0 ){
           
       for(let t = 0;t<ships.length;t++){
           ships[t].draw()
          }
       for(let t = 0;t<ships.length;t++){
                if(ships[t].health <= 0 && ships[t].time <=0){
                    ships.splice(t,1)
                }else{
                    if(ships[t].health <= 0){
                        ships[t].pop()
                    }
                    
                }
          }
          if(avey.combat == 0){
              console.log(avey, ships)
              if(avey.markend == 1){
              console.log(avey.markend)
                  avey.markend = 0
                  if(ships.length>0){
                      
                  if(ships[0].owner == 0){
              console.log(avey.contest)
                        avey.contest.greenarmy = []
                        avey.contest.redarmy = []
                      for(let t =0;t<ships.length;t++){
                          
                          if(ships[t].owner == 0 && ships[t].po != 1){
                        avey.contest.redarmy.push(new Giy(0))
                        }
                        }
                  avey.contest.owner = 0
                        ships = []
                  
                    }else{
              console.log(avey.contest)
                        avey.contest.redarmy = []
                        avey.contest.greenarmy = []
                      for(let t =0;t<ships.length;t++){
                          if(ships[t].owner == 1&& ships[t].po != 1){
                        avey.contest.greenarmy.push(new Giy(0))
                            }
                    }
                  avey.contest.owner = 1
                        ships = []
                  
                    }

                    }else{
                        
                        avey.contest.redarmy = []
                        avey.contest.greenarmy = []
                        if(avey.contest.greenarmy.length == 0 && avey.contest.redarmy.length == 0){
                            
                  avey.contest.owner = -1
                        }

                    }              
                      }
              
          avey.timec--
            }else{
          
          
          
          
          
          avey.timec = 1
                
                
       for(let t = 0;t<ships.length;t++){
//            ships[t].draw()
          }
          let e = 0
       for(let t = 0;t<ships.length;t++){
           e+= ships[t].owner
          }
          //console.log(e, ships)
          if(e == 0 || e == ships.length){
//               if(avey.combattimer <= 0){
              avey.combat = 0
              avey.markend = 1
//               }
            }
            }
            
          }else{
              
       avey.draw()

            }
    return
    }
    
    canvas_context.clearRect(0, 0, canvas.width, canvas.height)  
    
    
    g.draw()
    
    return
    if(keysPressed[' ']){
        canvas_context.drawImage(sporeball2, 0,0,sporeball2.width, sporeball2.height, 0,0,sporeball2.width, sporeball2.height)
        buff1 = canvas_context.getImageData(0,0,16,16)
    //console.time("Buffer")
    for(let t = 0;t<100000;t++){
        addImageDataAtPosition(buff1, Math.floor(Math.random()*300), Math.floor(Math.random()*720))
    }
    canvas_context.putImageData(destinationImageData, 0, 0)

    //console.timeEnd("Buffer")
    //console.time("imgDraw")
    for(let t = 0;t<100000;t++){
        canvas_context.drawImage(sporeball2, 0,0,sporeball2.width, sporeball2.height, 640+Math.floor(Math.random()*300), Math.floor(Math.random()*720),16,16)
    }
    
    //console.timeEnd("imgDraw")
    }
//     canvas_context.clearRect(0, 0, canvas.width, canvas.height)  // refreshes the image
    
    // Get the ImageData objects for the source and destination

// // Offsets for the position where you want to place the source image
// const offsetX = 50; // X position
// const offsetY = 50; // Y position
// 
// // Cache data array references for performance
// const sourceData = sourceImageData.data;
// const destData = destinationImageData.data;
// 
// // Define pixel byte positions (RGBA = 4 bytes)
// const sourceWidth4 = sourceWidth * 4;
// const destWidth4 = canvasWidth * 4;
// 
// // Start dmdain loop to merge source data into destination data
// for (let y = 0; y < sourceHeight; y++) {
//   // Precompute row start positions
//   const sourceRowStart = y * sourceWidth4;
//   const destRowStart = (y + offsetY) * destWidth4 + offsetX * 4;
// 
//   for (let x = 0; x < sourceWidth; x++) {
//     // Compute pixel start positions for source and destination
//     const sourcePixelIndex = sourceRowStart + x * 4;
//     const destPixelIndex = destRowStart + x * 4;
// 
//     // Directly copy RGBA values (no need for intermediary operations)
//     destData[destPixelIndex]     = sourceData[sourcePixelIndex];     // Red
//     destData[destPixelIndex + 1] = sourceData[sourcePixelIndex + 1]; // Green
//     destData[destPixelIndex + 2] = sourceData[sourcePixelIndex + 2]; // Blue
//     destData[destPixelIndex + 3] = sourceData[sourcePixelIndex + 3]; // Alpha
//   }
// }
// 
// // Put the modified image data back onto the canvas
// ctx.putImageData(destinationImageData, 0, 0);


    
    
    return
    
//         scanner.stretch(dt)    
        scanner.draw()    
    
    if(keysPressed[' ']){
        dtx+=.5
    }
    if(keysPressed['r']){
        dtx-=.5
    }
    let dt = new Point(500+dtx, 100)
    return
//     //console.log(hand)
        hand.draw()
//     nock.draw()


    return
    
    
    stats =  []
    for(let t = 0;t<(Math.random()*1)+cn;t++){
        stats.push((Math.random()+.1)/1.1)
    }
    
    
    let ps =[]
    let zs = []
    for(let t= 0;t<stats.length;t++){
        let a = (t/stats.length)*2*Math.PI;
        let p = new Point(360+(Math.cos(this.a)*100), 360+(Math.sin(this.a)*100))
        ps.push(p)
        let z = new Point(360+(Math.cos(this.a)*100*stats[t]), 360+(Math.sin(this.a)*100*stats[t]))
        zs.push(z)
    }
    canvas_context.beginPath();
// set ctx styles
canvas_context.moveTo( ps[0].x, ps[0].y );

    for(let t= 0;t<stats.length;t++){
        canvas_context.lineTo(ps[t].x, ps[t].y)
    }
canvas_context.lineTo(  ps[0].x, ps[0].y  );
canvas_context.closePath(); // automatically moves back to bottom left corner
canvas_context.fillStyle = "white"
canvas_context.fill();




    canvas_context.beginPath();
// set ctx styles
canvas_context.moveTo( zs[0].x, zs[0].y );

    for(let t= 0;t<stats.length;t++){
        canvas_context.lineTo(zs[t].x, zs[t].y)
    }

canvas_context.lineTo(  zs[0].x, zs[0].y );
canvas_context.closePath(); // automatically moves back to bottom left corner

let grad = canvas_context.createRadialGradient(360,360, 0, 360,360, 100)
grad.addColorStop(.07, "#FF0000")
grad.addColorStop(.25, "#FFFF00")
grad.addColorStop(.47, "#00FF00")
grad.addColorStop(.53, "#00FFFF")
grad.addColorStop(.80, "#0000FF")
grad.addColorStop(.9, "#FF00FF")
grad.addColorStop(1, "#FF00FF")
canvas_context.fillStyle = grad
canvas_context.fill();




    for(let t= 0;t<stats.length;t++){
            let l = new LineOP(center, ps[t], "black", 2)
            l.draw()
    }
    for(let t= 0;t<11;t++){

            let ring = new CircleRing(360, 360, 100*(t/10), "black")
            ring.draw()
    }
    
    
    
    }
    if(false){
    
    let f = (1280/720)
//         canvas_context.drawImage(egg,0,0,1280,720, 624-(growrate*f), 344-growrate, (32+(growrate*2*f)) , 20+(growrate*.2))
        canvas_context.drawImage(egg,0,0,1280,720, -16+640-((growrate/40)*f), -9+360-(growrate/40), 32+((growrate/40)*f)*2, 20+(growrate/40)*2)
        
                 f = 1280/720
//         canvas_context.drawImage(egg2,0,0,1280,720, 0-(1280*((growrate-1)%20)), 0-(720*((growrate-1)%20)), (1*(1280*(growrate%20))), (1*(720*(growrate%20))))

        canvas_context.drawImage(egg2,0,0,1280,720,-growrate*f,-growrate,(1280+(growrate*2*f)) ,720+(growrate*2))        
        growrate*=1.01
        growrate += ((1280*25)-growrate)/3000
        growrate+= 1
//         growrate+=40
        if(growrate >= 1280*10){
            growrate = 10
        }
//         if(keysPressed[' ']){

//             
//    canvas_context.drawImage(pom, 0,0,pom.width,pom.height,0,0,720,720)
//    pix = canvas_context.getImageData(0,0,720,720)
//             return
//         }
//         canvas_context.putImageData(pix,0,0)
// //         canvas_context.clearRect(0, 0, canvas.width, canvas.height)  // refreshes the image
//         gamepadAPI.update() //checks for button presses/stick movement on the connected     
// //             pix = canvas_context.getImageData(0,0,720,720)
//  pix2 = canvas_context.getImageData(0,0,720,720)
// 
//         let d = pix.data
//         let d2 = pix2.data
//         let l = new LineOP(new Point(360,360), new Point(360,360))
//         for(let t= 0;t<d.length;t+=4){
//             let p=indexer(t)
//             l.target = p
// //             if(Math.random() < .001){
// //                 
// //             //console.log(l)
// //             }
//             let a = l.angle()-Math.PI
//             let h = l.hypotenuse()
//             if(h <= 1360){
//                 
//             let k = new Point((Math.cos(this.a+(step/((h/360)+1)))*h)+360, (Math.sin(this.a+(step/((h/360)+1)))*h) +360)
// 
//             if(lf.isPointInside(k)){
//                             let pt = tout(Math.floor(k.x),Math.floor(k.y))
//                                     if(Math.random() < .001){ 
// //             //console.log(t,pt)
//             }
//             if(pt%4 == 0){
//                 
//             d[t] = d2[pt]
//             d[t+1] = d2[pt+1]
//             d[t+2] = d2[pt+2]
//             d[t+3] =  255
//             }
//             }
//     
//             }else{
//                 
//             d[t] = 0
//             d[t+1] = 0
//             d[t+2] = 0
//             d[t+3] =  255
//             }
//         }
//         canvas_context.putImageData(pix,0,0)
    }

// })