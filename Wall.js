function Wall(bx,by,ex,ey) {

		this.begin_x = bx;
		this.begin_y = by;
		this.end_x = ex;
		this.end_y = ey;

		this.get_normal_and_side = function(p_x, p_y) {

				var r_numerator = (p_x-this.begin_x)*(this.end_x-this.begin_x) + (p_y-this.begin_y)*(this.end_y-this.begin_y);
        var r_denomenator = (this.end_x-this.begin_x)*(this.end_x-this.begin_x) + (this.end_y-this.begin_y)*(this.end_y-this.begin_y);
        var r = r_numerator / r_denomenator;

				if( r < 0 ) { 
						return [p_x-this.begin_x,p_y-this.begin_y,0];
				} else if( r > 1 ) {
						return [p_x-this.end_x,p_y-this.end_y,0];
				} else {
						var sign = (this.end_x-this.begin_x)*(p_y-this.begin_y)
						           -(this.end_y-this.begin_y)*(p_x-this.begin_x);
						if( sign > 0 ) {
								return [p_x - this.begin_x - r*(this.end_x-this.begin_x),p_y - this.begin_y - r*(this.end_y-this.begin_y),1];
						} else if( sign < 0 ) {
								return [p_x - this.begin_x - r*(this.end_x-this.begin_x),p_y - this.begin_y - r*(this.end_y-this.begin_y),-1];
						} else { 
								return [p_x - this.begin_x - r*(this.end_x-this.begin_x),p_y - this.begin_y - r*(this.end_y-this.begin_y),2];
						}
						
				}

		}

		this.draw = function() {
				
				context.save();

				context.lineWidth = 3;
				context.lineCap = 'round';

				context.beginPath();
				context.moveTo(this.begin_x,this.begin_y);
				context.lineTo(this.end_x,this.end_y);
				context.stroke();

				context.restore();

		}

}
