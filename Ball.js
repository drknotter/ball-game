function Ball(x,y,r,m,s,f,w) {

		this.position = [x,y];
		this.velocity = [0.0,0.0];
		this.acceleration = [0.0,0.0];
		this.radius = r;
		this.mass = m;
		this.spring = s;
		this.friction = f;
		this.color = "rgba(255,0,0,1.0)";
		this.world = w;

		this.sides = new Array();
		for( var i=0; i<this.world.wall_list.length; i++ ) {
				normal_side = this.world.wall_list[i].get_normal_and_side(this.position[0],this.position[1]);
				this.sides[i] = normal_side[2];
		}		

		this.draw = function() {

				context.save();

				context.fillStyle = this.color;

				context.beginPath();
				context.arc(this.position[0],this.position[1],this.radius,0,2*Math.PI,true);
				context.closePath();
				context.fill();

				context.restore();

		}

		this.update = function() {
				
				this.velocity[0] += (w.gravity[0] + this.acceleration[0])*DT;
				this.velocity[1] += (w.gravity[1] + this.acceleration[1])*DT;
				
				this.position[0] += this.velocity[0]*DT;
				this.position[1] += this.velocity[1]*DT;

		}

		this.apply_force = function(fx,fy) {
				this.acceleration[0] += fx/this.mass;
				this.acceleration[1] += fy/this.mass;
		}

		this.calculate_force = function() {

				this.acceleration[0] = 0.0; this.acceleration[1] = 0.0;
				var normal_side, dist_squared, dist, sign;
				
				// wall forces
				for( var i=0; i<this.world.wall_list.length; i++ ) {

						normal_side = this.world.wall_list[i].get_normal_and_side(this.position[0],this.position[1]);
						
						sign = 1;
						if( this.sides[i] != 0 && normal_side[2] != 0 )
								sign = this.sides[i]*normal_side[2];
						
						if( sign == -1 ) {
								dist = Math.sqrt(normal_side[0]*normal_side[0]
																 +normal_side[1]*normal_side[1]);
								normal_side[0] += 2*this.radius*normal_side[0]/dist;
								normal_side[1] += 2*this.radius*normal_side[1]/dist;
						} else {
								this.sides[i] = normal_side[2];
						}
						
						dist_squared = normal_side[0]*normal_side[0] + normal_side[1]*normal_side[1];
						
						if( dist_squared < this.radius*this.radius || sign == -1 ) {
								
								dist = Math.sqrt(dist_squared);
								
								dot = (this.velocity[0]*normal_side[0]
											 +this.velocity[1]*normal_side[1])/dist_squared;
								this.acceleration[0] += (this.spring*(this.radius-dist)/dist
																				 - this.friction*dot)*normal_side[0]/this.mass;
								this.acceleration[1] += (this.spring*(this.radius-dist)/dist
																				 - this.friction*dot)*normal_side[1]/this.mass;
								
						}
						
				} // end wall forces

				// ball forces
				for( var i=0; i<this.world.ball_list.length; i++ ) {

						if( this.world.ball_list[i] == this ) continue;
						
						dist = Math.sqrt((this.position[0] - this.world.ball_list[i].position[0])
														 *(this.position[0] - this.world.ball_list[i].position[0]) 
														 + (this.position[1] - this.world.ball_list[i].position[1])
														 *(this.position[1] - this.world.ball_list[i].position[1]));
						normal_side[0] = (this.position[0] - this.world.ball_list[i].position[0])
						            *(this.radius-this.world.ball_list[i].radius+dist)/(2.0*dist);
						normal_side[1] = (this.position[1] - this.world.ball_list[i].position[1])
						            *(this.radius-this.world.ball_list[i].radius+dist)/(2.0*dist);
						dist_squared = normal_side[0]*normal_side[0] + normal_side[1]*normal_side[1];

						if( dist_squared < this.radius*this.radius ) {

								dist = Math.sqrt(dist_squared);
								dot = (this.velocity[0]*normal_side[0]+this.velocity[1]*normal_side[1])/dist_squared;
								this.acceleration[0] += (this.spring*(this.radius-dist)/dist 
																				 - this.friction*dot)*normal_side[0]/this.mass;
								this.acceleration[1] += (this.spring*(this.radius-dist)/dist 
																				 - this.friction*dot)*normal_side[1]/this.mass;
								
						}						

				} // end ball forces

				for( var i=0; i<this.world.force_circle_list.length; i++ ) { // well forces

						var force = this.world.force_circle_list[i].get_force(this.position[0],
																																	this.position[1],
																																	this.velocity[0],
																																	this.velocity[1]);
						this.acceleration[0] += force[0]/this.mass;
						this.acceleration[1] += force[1]/this.mass;

				} // end well forces
				
				for( var i=0; i<this.world.force_rect_list.length; i++ ) { // rectangle forces

						var force = this.world.force_rect_list[i].get_force(this.position[0],
																																this.position[1],
																																this.velocity[0],
																																this.velocity[1]);
						this.acceleration[0] += force[0]/this.mass;
						this.acceleration[1] += force[1]/this.mass;

				} // end rectangle forces
				
		}
		
}
