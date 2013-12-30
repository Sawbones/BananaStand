function GameObject(params, sprite)
{
	this.params = params;
	this.sprite = sprite;

	this.x = function(x)
	{
		this.params.x = parseInt(x);
	};

	this.y = function(y)
	{
		this.params.y = parseInt(y);
	};

	this.setSprite = function(sprite)
	{
		this.sprite = sprite;
	};

	this.update = function(delta)
	{

	};

	this.draw = function(c, delta)
	{
		this.sprite.draw(c, delta, this.params.x, this.params.y);
		
		c.font = '12px Verdana';
		c.fillStyle = '#FFF';

		var text_length = c.measureText(this.params.username);

		var sprite_middle = this.params.x + this.sprite.sprite.sprite.width/2;

		var textX = sprite_middle - text_length.width / 2;
		c.fillText(this.params.username, textX, this.params.y - 6);
	};
}