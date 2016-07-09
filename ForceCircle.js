function ForceCircle(t,x,y,R,r,f) {

		this.type = t;
		this.position = [x,y];
		this.outer_radius = R;
		this.inner_radius = r;
		this.force = f;

		this.timer = Math.random()*35;
		this.max_timer = 35;

		this.draw = function() {

				context.save();
				
				if( this.type == "well" ) {

						var t = this.timer/this.max_timer;
						var opacity = 16.0*t*t*(t-1)*(t-1);

						context.lineWidth = 5;

						if( this.force < 0 ) {
								context.beginPath();
								context.arc(this.position[0],this.position[1],this.outer_radius*(1.0-t)+this.inner_radius,0,2*Math.PI,true);
								context.closePath();
								context.strokeStyle = "rgba(255,128,0,"+opacity+")";
								context.stroke();

						} else {
								context.beginPath();
								context.arc(this.position[0],this.position[1],this.inner_radius*(t-1.0)+this.outer_radius,0,2*Math.PI,true);
								context.closePath();
								context.strokeStyle = "rgba(255,128,0,"+opacity+")";
								context.stroke();

						}

						this.timer = (this.timer+1)%this.max_timer;

				} else if( this.type == "friction" ) {

						context.beginPath();
						context.arc(this.position[0],this.position[1],this.outer_radius,0,2*Math.PI,true);
						context.arc(this.position[0],this.position[1],this.inner_radius,0,2*Math.PI,false);
						context.closePath();

						context.fillStyle = "rgba(0,0,128,0.7)";
						context.fill();
						
				}
				
				context.restore();
				
		}

		this.get_force = function(x,y,vx,vy) {

				if( this.type == "well" ) {

						var dx = x-this.position[0];
						var dy = y-this.position[1];
						var dist = Math.sqrt(dx*dx+dy*dy);

						var force = [0,0];
						if( dist < this.outer_radius &&
								dist > this.inner_radius &&
								dist > 0 )
								force = [this.force*dx/dist,this.force*dy/dist];
								
						return force;

				} else if( this.type == "friction" ) {

						var dx = x-this.position[0];
						var dy = y-this.position[1];
						var dist = Math.sqrt(dx*dx+dy*dy);

						var force = [0,0];
						if( dist < this.outer_radius &&
								dist > this.inner_radius )
								force = [this.force*vx,this.force*vy];
						
						return force;

				}

		}

}
