function World() {

		this.ball_list = new Array();
		this.wall_list = new Array();
		this.spring_list = new Array();
		this.force_circle_list = new Array();
		this.force_rect_list = new Array();
		this.gravity = [0, 9.8];

		this.calculate_forces = function() {

				for( var i=0; i<this.ball_list.length; i++ ) {
						this.ball_list[i].calculate_force();
				}
				for( var i=0; i<this.spring_list.length; i++ ) {
						this.spring_list[i].pull();
				}
				
		}

		this.update_positions = function() {

				for( var i=0; i<this.ball_list.length; i++ ) {
						this.ball_list[i].update();
				}
				for( var i=0; i<this.spring_list.length; i++ ) {
						this.spring_list[i].update_velocity();
				}
				
		}

		this.draw = function() {

				for( var i=0; i<this.wall_list.length; i++ ) {
						this.wall_list[i].draw();
				}
				for( var i=0; i<this.force_circle_list.length; i++ ) {
						this.force_circle_list[i].draw();
				}
				for( var i=0; i<this.force_rect_list.length; i++ ) {
						this.force_rect_list[i].draw();
				}
				for( var i=0; i<this.spring_list.length; i++ ) {
						this.spring_list[i].draw();
				}
				for( var i=0; i<this.ball_list.length; i++ ) {
						this.ball_list[i].draw();
				}
				
		}

}