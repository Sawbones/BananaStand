function Game()
{
	canvas = document.getElementById('game');
	c = canvas.getContext('2d');

	this.player 		= new Player(0, 0, 'player', 'player', 'stand_down');
	this.world 			= new World('timmer', 'timmer', this.player);
}

Game.prototype.update = function(delta)
{
	this.world.update(delta);
}

Game.prototype.draw = function(delta)
{
	c.fillStyle = '#000';
	c.clearRect(0, 0, canvas.width, canvas.height);
	this.world.draw(delta);
}

