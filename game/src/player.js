var up = false, down = false, left = false, right = false;
var event_animation;

function F(){};
F.prototype = Entity.prototype;

Player.prototype = new F();

function Player(x, y, image, name, animation)
{
	Entity.apply(this, [x, y, image, name, animation]);
	this.health = 100;
	this.mind 	= 100;

	this.velocity = .15;

	event_animation = animation; 

	//Set world offset based on where he is
	//world_x_offset = this.x + (canvas.width/2 - this.entity.draw.width/2);
	//world_y_offset = this.y + (canvas.height/2 - this.entity.draw.height/2);

	$(document).on('keydown', this.keydown);
	$(document).on('keyup', this.keyup);
}

Player.prototype.update = function(delta)
{
	if(up)
	{
		this.y -= this.velocity * delta;
		world_y_offset += this.velocity * delta;
	}
	else if(down)
	{
		this.y += this.velocity * delta;
		world_y_offset -= this.velocity * delta;
	}
	else if(left)
	{
		this.x -= this.velocity * delta;
		world_x_offset += this.velocity * delta;
	}
	else if(right)
	{
		this.x += this.velocity * delta;
		world_x_offset -= this.velocity * delta;
	}

	this.animation = event_animation;
	Entity.prototype.update.apply(this, [delta]);

}

Player.prototype.draw = function(delta)
{
	var srcX = this.animation_mods[this.sprite_x_index][0] * this.entity.draw.width;
	var srcY = this.animation_mods[this.sprite_x_index][1] * this.entity.draw.height;
	c.drawImage(
		assets[this.image],
		srcX + this.entity.draw.xOffset,
		srcY + this.entity.draw.yOffset,
		this.entity.draw.width,
		this.entity.draw.height,
		this.x + world_x_offset, 
		this.y + world_y_offset, 
		this.entity.draw.width * this.entity.scale, 
		this.entity.draw.height * this.entity.scale
	);

	c.strokeStyle = '#000';
	c.lineWidth = 2;

	if(false)
	{
		c.fillRect(
			this.x + (this.entity.bounds.x * this.entity.scale) + world_x_offset,
			this.y + (this.entity.bounds.y * this.entity.scale) + world_y_offset,
			this.entity.bounds.width * this.entity.scale,
			this.entity.bounds.height * this.entity.scale
		);
	}
}

Player.prototype.onhit = function(entity)
{
	this.velocity = 0;
}

Player.prototype.keydown = function(e)
{
	var character = String.fromCharCode( e.which );
	switch(character)
	{
		case 'W':
			up = true;
			event_animation = 'walk_up';
			break;
		case 'S':
			down = true;
			event_animation = 'walk_down';
			break;
		case 'A':
			left = true;
			event_animation = 'walk_left';
			break;
		case 'D':
			right = true;
			event_animation = 'walk_right';
			break;
	}
}

Player.prototype.keyup = function(e)
{
	var character = String.fromCharCode( e.which );
	switch(character)
	{
		case 'W':
			up = false;
			event_animation = 'stand_up';
			break;
		case 'S':
			down = false;
			event_animation = 'stand_down';
			break;
		case 'A':
			left = false;
			event_animation = 'stand_left';
			break;
		case 'D':
			right = false;
			event_animation = 'stand_right';
			break;
	}
}