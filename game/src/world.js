var draw_entities;
function World(name, image, player)
{
	this.name = name;
	this.image = image;
	this.map = require('./assets/maps/' + this.name + '.json');
	this.entities = [];

	this.player = player;

	world_x_offset = this.player.x + (canvas.width/2 - this.player.entity.draw.width/2);
	world_y_offset = this.player.y + (canvas.height/2 - this.player.entity.draw.height/2);

	//Builds trees
	for(var i = 0; i < this.map.objects.length; i++)
	{
		//Calculate tree's next placement
		var world_ent = this.map.objects[i];
		this.entities.push( new Entity(
			world_ent.x,
			world_ent.y,
			world_ent.image,
			world_ent.name,
			world_ent.animation
		));
	}
}

World.prototype.update = function(delta)
{

	for(var i = 0; i < this.entities.length; i++)
	{
		var hits = this.player.intersects(this.entities[i]);
		if(hits)
		{
			this.player.onhit();
		}
	}
	draw_entities = this.entities.concat([this.player]); //Pass it as an array because concat is stupid.
	draw_entities = _.sortBy(draw_entities, function(ent){
		ent.update(delta);
		return ent.y + (ent.entity.bounds.y * ent.entity.scale) + world_y_offset;
	});
}

World.prototype.draw = function(delta)
{
	for(var row = 0; row < this.map.tiles.length; row++)
	{
		for(var col = 0; col < this.map.tiles[row].length; col++)
		{
			var tile = this.map.tiles[row][col];

			c.drawImage(
				assets[this.image], 
				tile[0] * this.map.tileWidth, 
				tile[1] * this.map.tileHeight,
				this.map.tileWidth,
				this.map.tileHeight,
				col * this.map.tileDrawWidth + world_x_offset,
				row * this.map.tileDrawHeight + world_y_offset,
				this.map.tileDrawWidth,
				this.map.tileDrawHeight
			);
		}
	}

	for(var i = 0; i < draw_entities.length; i++)
	{	
		
		draw_entities[i].draw(delta);
	}
}