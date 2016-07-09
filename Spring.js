function Spring(h,t,l,k,b) {

		this.head = h;
		this.tail = t;
		this.length = l;
		this.dist = 0;
		this.spring = k;
		this.friction = b;
		this.velocity = 0;

		this.pull = function() {

				var dx = this.head.position[0] - this.tail.position[0];
				var dy = this.head.position[1] - this.tail.position[1];
				this.dist = Math.sqrt(dx*dx+dy*dy+0.001);
				var disp = this.dist - this.length;

				var fx = (this.spring*disp + this.friction*this.velocity)*dx/this.dist;
				var fy = (this.spring*disp + this.friction*this.velocity)*dy/this.dist;

				this.head.acceleration[0] -= fx/this.head.mass;
				this.head.acceleration[1] -= fy/this.head.mass;
				this.tail.acceleration[0] += fx/this.tail.mass;
				this.tail.acceleration[1] += fy/this.tail.mass;

		}

		this.update_velocity = function() {

				var dx = this.head.position[0] - this.tail.position[0];
				var dy = this.head.position[1] - this.tail.position[1];
				var dist_new = Math.sqrt(dx*dx+dy*dy);

				this.velocity = (dist_new - this.dist)/DT;

		}

		this.draw = function() {
				
				context.save();

				context.beginPath();
				context.moveTo(this.head.position[0],this.head.position[1]);
				context.lineTo(this.tail.position[0],this.tail.position[1]);
				context.closePath();

				context.lineWidth = 2;
				context.lineCap = "round";
				context.stroke();
				
				context.restore();

		}

}
