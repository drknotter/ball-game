function ForceRect(x,y,a,d,w,f) {

		this.position = [x,y];
		this.angle = a;
		this.distance = d;
		this.width = w;
		this.force = f;

		this.timer = Math.random()*35;
		this.max_timer = 35;

		this.draw = function() {

				var t = this.timer/this.max_timer;
				var opacity = 16.0*t*t*(t-1)*(t-1);
				var t_d = this.distance*t;

				context.save();
				
				//context.translate(this.position[0],this.position[1]);
				//context.rotate(-this.angle);
				
				var x = this.position[0]+ t_d*Math.cos(-this.angle)
				          + this.width/2*Math.cos(-this.angle-Math.PI/2);
				var y = this.position[1]+ t_d*Math.sin(-this.angle)
				          + this.width/2*Math.sin(-this.angle-Math.PI/2);
				var dx = this.width*Math.cos(-this.angle-Math.PI/2);
				var dy = this.width*Math.sin(-this.angle-Math.PI/2);
				
				context.beginPath();
				context.moveTo(x,y);
				context.lineTo(x-dx,y-dy);
				context.closePath();
				
				context.strokeStyle = "rgba(255,128,0,"+opacity+")";
				context.lineWidth = 5;
				context.lineCap = "round";
				context.lineJoin = "round";
				context.stroke();
				
				context.restore();
				
				this.timer = (this.timer+1)%this.max_timer;				
				
		}

		this.get_force = function(x,y,vx,vy) {
				var force = [0,0];

				return force;
		}

}