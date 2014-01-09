function Entity(x, y, image, json_object, animation)
{
	this.x = x;
	this.y = y;
	this.image = image;
	this.entity = require('./assets/entities/' + json_object + '.json');

	this.animation = animation;

	this.sprite_time = 0;
	this.sprite_x_index = 0;

	this.top 	= this.y + (this.entity.bounds.y * this.entity.scale) + world_y_offset
	this.left 	= this.x + (this.entity.bounds.x * this.entity.scale) + world_x_offset;

	this.width 	= this.entity.bounds.width * this.entity.scale;
	this.height = this.entity.bounds.height * this.entity.scale;

	this.bottom = this.top + this.width;
	this.right 	= this.left + this.height;
}

Entity.prototype.setAnimation = function(name)
{
	this.animation = name;
	this.sprite_time = 0;
}

Entity.prototype.intersects = function(entity)
{
	return !(
		entity.left > this.right ||
		entity.right < this.left||
		entity.top > this.bottom ||
		entity.bottom < this.top
		);
}

Entity.prototype.update = function(delta)
{
	this.animation_mods = this.entity.animations[this.animation];

	if(this.sprite_time > (this.entity.duration - delta))
	{
		this.sprite_time = 0;
		this.sprite_x_index += 1;
	}
	else
	{
		this.sprite_time += delta;
	}

	if(this.sprite_x_index > (this.animation_mods.length - 1))
	{
		this.sprite_x_index = 0;
	}

	this.left 	= this.x + (this.entity.bounds.x * this.entity.scale) + world_x_offset;
	this.top 	= this.y + (this.entity.bounds.y * this.entity.scale) + world_y_offset;

	this.width = this.entity.bounds.width * this.entity.scale;
	this.height = this.entity.bounds.height * this.entity.scale;

	this.bottom = this.top + this.width;
	this.right 	= this.left + this.height;
}

Entity.prototype.draw = function(delta)
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
	if(true)
	{
		c.strokeRect(
			this.left,
			this.top,
			this.width,
			this.height
		);
	}
}

