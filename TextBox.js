function TextBox(X,Y) {

		this.x = X;
		this.y = Y;
		this.text = "";

		this.draw = function() {
				
				context.save();

				context.textAlign = "end";
				context.fillStyle = "rgb(255,255,255)";
				context.fillText(this.text+" x="+mouse_x+", y="+mouse_y,this.x,this.y);

				context.restore();

		}

}
