function Sprite(sprite_image, sprite)
{

	this.sprite_image = sprite_image;
	this.sprite = sprite;

	var sprite_time = 0;
	var sprite_x_index = 0;
	var sprite_y_index = 0;

	this.selected_animation = 'stand_down';

	this.delta = 0;

	this.setAnimation = function(animation_name)
	{
		this.selected_animation = animation_name;
	}

	this.update = function(delta)
	{

	}

	this.getSpriteTime = function()
	{
		return sprite_time;
	}

	this.getTime = function()
	{
		return sprite_time > (sprite.duration - this.delta);
	}

	this.getDuration = function()
	{
		return sprite.duration;
	}

	this.draw = function(c, delta, x, y)
	{
		var animation_mods = sprite.animations[this.selected_animation];

		this.delta = delta;

		if(sprite_time > (sprite.duration - delta))
		{
			sprite_time = 0;
			sprite_x_index += 1;
		}
		else
		{
			sprite_time += delta;
		}

		if(sprite_x_index > (animation_mods.length - 1))
		{
			sprite_x_index = 0;
		}

		c.drawImage(
			this.sprite_image,
			animation_mods[sprite_x_index][0] * sprite.sprite.width, 
			animation_mods[sprite_x_index][1] * sprite.sprite.height,
			sprite.sprite.width, 
			sprite.sprite.height, 
			x, 
			y, 
			sprite.sprite.width, 
			sprite.sprite.height
		);
	}
}