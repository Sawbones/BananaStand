function GameObject(params, sprite)
{
	this.params = params;
	this.sprite = sprite;

	this.events = {};

	this.x = function(x)
	{
		this.params.x = parseInt(x);
	};

	this.y = function(y)
	{
		this.params.y = parseInt(y);
	};

	this.inside = function(x, y)
	{
		in_x = (this.params.x >= x && this.params.x <= x);
		in_y = (this.params.y >= y && this.params.y <= y);

		return (in_x && in_y);
	}

	this.distance = function(x, y)
	{
		var x_diff = this.params.x - x;
		var y_diff = this.params.y - y;

		return x_diff / y_diff;
	}

	this.setEvent = function(event_name, func)
	{
		this.events[event_name] = func;
	}

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