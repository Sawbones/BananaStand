var utility =  
{
		inherit : function(parent)
		{
			function F(){};
			F.prototype = parent.prototype;
			return new F();
		}
};

$(document).ready(function(){
	//socket = io.connect('http://localhost:8080');

	//Load images
	assets = {};

	assets['player'] = new Image();
	assets['player'].src = 'assets/images/player.png';

	assets['timmer'] = new Image();
	assets['timmer'].src = 'assets/images/basic.png';

	assets['oak_trees'] = new Image();
	assets['oak_trees'].src = 'assets/images/oak_trees.png';

	assets['houses'] = new Image();
	assets['houses'].src = 'assets/images/houses.png';

	world_x_offset = 0;
	world_y_offset = 0;

	debug = true;


	var game = new Game();
	var time = new Date().getTime();
	var oldTime = time;
	var delta = 16

	setInterval(function(){

		time = new Date().getTime();
		delta = time - oldTime;

		game.update(delta);
		game.draw(delta);

		oldTime = time;
	}, 16);
});