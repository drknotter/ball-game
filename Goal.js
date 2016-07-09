function Goal(x,y,r,w) {

		this.position = [x,y];
		this.radius = r;
		this.color = "rgba(255,255,255,1.0)";
		this.in_timer = 0;

		this.world = w;

		this.draw = function() {
				
				context.save();

				context.beginPath();
				context.arc(this.position[0],this.position[1],this.radius,0,2*Math.PI,true);
				context.closePath();

				context.lineWidth = 3;
				context.strokeStyle = this.color;
				context.stroke();

				context.restore();

				for( var i=0; i<this.world.ball_list.length; i++ ) {

						if( this.color == this.world.ball_list[i].color ) {

								var dx = this.position[0]-this.world.ball_list[i].position[0];
								var dy = this.position[1]-this.world.ball_list[i].position[1];
								var dist = Math.sqrt(dx*dx+dy*dy);

								if( dist < this.radius - this.world.ball_list[i].radius ) {
										this.in_timer += DT/10;
										var rem = this.in_timer%1;
										var sec = this.in_timer-rem+1;

										context.save();
										
										context.fillStyle = "rgba(255,255,255,"+(1.0-rem)+")";
										//context.strokeStyle = "rgba(0,0,0,"+(1.0-rem)+")";
										context.lineWidth = 2;
										context.textAlign = "center";
										context.textBaseline = "middle";
										context.font = "bold "+(2*this.radius)+"px Helvetica,sans-serif";
										
										context.translate(this.position[0],this.position[1]+this.radius/6);
										context.fillText(sec,0,0);
										//context.strokeText(sec,0,0);

										context.restore();

								} else {
										this.in_timer = 0;
								}

								break;
						}

				}
				
		}

}

