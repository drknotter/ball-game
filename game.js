var canvas;
var context;

var mouse_x, mouse_y, previous_x, previous_y;

var paused = 0;
var int_id;

var DT = 0.25;

var DIR = 0;
var PUSH = 10;
var LEFT=65; var RIGHT=68; var DOWN=83; var UP=87;
var LEFT_PRESS=0; var RIGHT_PRESS=0; var DOWN_PRESS=0; var UP_PRESS=0;

var world = new World();
var goals = new Array();

var debugBox = new TextBox(795,395);

function init() {

		canvas = document.getElementById("canvas");

		if( canvas.getContext ) {

				canvas.width = 800;
				canvas.height = 400;
				context = canvas.getContext("2d");
				mouse_x = 400; mouse_y = 200;

				world.wall_list[0] = new Wall(-200,canvas.height,canvas.width+200,canvas.height);
				world.wall_list[1] = new Wall(0,-200,0,canvas.height+200);
				world.wall_list[2] = new Wall(canvas.width,-200,canvas.width,canvas.height+200);
				world.wall_list[3] = new Wall(-200,0,canvas.width+200,0);
				
				world.ball_list[0] = new Ball(canvas.width/2,canvas.height/2,10,2,30.0,2,world);
				world.ball_list[0].color = "rgba(255,255,255,1.0)";
				world.ball_list[1] = new Ball(canvas.width/2+30,canvas.height/2,10,2,30.0,2,world);
				world.ball_list[1].color = "rgba(0,0,255,1.0)";
				world.ball_list[2] = new Ball(canvas.width/2+60,canvas.height/2,10,2,30.0,2,world);

				//world.spring_list[0] = new Spring(world.ball_list[0],world.ball_list[1],30,15,2);
				//world.spring_list[1] = new Spring(world.ball_list[1],world.ball_list[2],30,15,2);

				var x = Math.random()*800;
				var y = Math.random()*400;
				world.force_circle_list[0] = new ForceCircle("well",x,y,50,15,-10);
				world.force_circle_list[1] = new ForceCircle("friction",x,y,25,0,-0.5);
				world.force_circle_list[2] = new ForceCircle("well",x,y,100,50,10);
				goals[0] = new Goal(x,y,25,world);

				x = Math.random()*800;
				y = Math.random()*400;
				world.force_circle_list[3] = new ForceCircle("well",x,y,50,15,-10);
				world.force_circle_list[4] = new ForceCircle("friction",x,y,25,0,-0.5);
				goals[1] = new Goal(x,y,25,world);
				goals[1].color = "rgba(255,0,0,1.0)";

				x = Math.random()*800;
				y = Math.random()*400;
				world.force_circle_list[5] = new ForceCircle("well",x,y,50,15,-10);
				world.force_circle_list[6] = new ForceCircle("friction",x,y,25,0,-0.5);
				goals[2] = new Goal(x,y,25,world);
				goals[2].color = "rgba(0,0,255,1.0)";

				//world.force_rect_list[0] = new ForceRect(400,250,Math.PI/2,50,400,10);

				world.gravity[0] = 0;
				world.gravity[1] = 0;

				debugBox = new TextBox(canvas.width-5,canvas.height-5);

				int_id = setInterval(draw,DT*100);

		}
}

function draw() {
		
		erase();

		world.calculate_forces();

		if( LEFT_PRESS == 1 ) {
				world.ball_list[0].acceleration[0] -= PUSH;
		} 
		if( UP_PRESS == 1 ) {
				world.ball_list[0].acceleration[1] -= PUSH;
		} 
		if( RIGHT_PRESS == 1 ) {
				world.ball_list[0].acceleration[0] += PUSH;
		} 
		if( DOWN_PRESS == 1 ) {
				world.ball_list[0].acceleration[1] += PUSH;
		}

		world.update_positions();
		world.draw();

		for( var i=0; i<goals.length; i++ ) 
				goals[i].draw();

		debugBox.draw();

}

function erase() {		
		context.clearRect(0,0,canvas.width,canvas.height);
		context.fillStyle = "rgba(0,0,0,1.0)";
		context.fillRect(0,0,canvas.width,canvas.height);
}

function mouse_move(event) {
		previous_x = mouse_x;
		previous_y = mouse_y;
		mouse_x = event.clientX-canvas.offsetLeft;
		mouse_y = event.clientY-canvas.offsetTop;
}

function mouse_click(event) {

}

function mouse_down(event) {

}

function mouse_up(event) {

}

function key_press(event) {

		var code = event.keyCode?event.keyCode:event.which;

		switch( code ) {
		case 112:
				if( paused == 0 ) {
						clearInterval(int_id);

						context.save();
						
						context.fillStyle = "rgba(255,255,255,0.7)";						
						context.fillRect(0,0,canvas.width,canvas.height);

						context.fillStyle = "rgba(0,0,0,0.7)";						
						context.textAlign = "center";
						context.textBaseline = "middle";
						context.font = "bold 50px/50px sans-serif";
						context.fillText("PAUSED",canvas.width/2,canvas.height/2+6);

						context.restore();

						paused = 1;
				}	else {
						int_id = setInterval(draw,DT*100);
						paused = 0;
				}
				break;
				//case 115:
				//if( paused == 1 ) 
				//draw();
				//break;
		case LEFT:
        LEFT_PRESS = 1;
				break;
		case UP: // up
        UP_PRESS = 1;
				break;
		case RIGHT: // right
        RIGHT_PRESS = 1;
				break;
		case DOWN: // down
        DOWN_PRESS = 1;
				break;
		}

    console.log('key down: '+code+', DIR: '+DIR);

}

function key_up(event) {

		var code = event.keyCode?event.keyCode:event.which;

		switch( code ) {
		case LEFT: // left
        LEFT_PRESS = 0;
				break;
		case UP: // up
        UP_PRESS = 0;
				break;
		case RIGHT: // right
        RIGHT_PRESS = 0;
				break;
		case DOWN: // down
        DOWN_PRESS = 0;
				break;
		}

    console.log('key up: '+code+', DIR: '+DIR);

}