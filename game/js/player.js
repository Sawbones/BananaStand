function Player(username, sprite)
{
	this.username = username;
	this.x = x;
	this.y = y;

	//var sprite = new Sprite(player_image, '');
	this.update = function(delta)
	{
		sprite.update(delta);
	}

	this.draw = function(c, delta)
	{
		sprite.draw(c, delta);
	}
}