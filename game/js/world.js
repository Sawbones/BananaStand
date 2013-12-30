function World(url)
{
	var world = require('./' + url + '.json');

	var tilesets = new Array();
	var tile_images = new Array();
	for(var i = 0; i < world.tileMaps.length; i++)
	{
		tilesets.push( require('./resources/tilesets/' + world.tileMaps[i] + ".json") );
	}

	for(var i = 0; i < tilesets.length; i++)
	{
		var image = new Image();
		image.src = process.env.PWD + '/game/resources/images/' + tilesets[i].filename;
		tile_images.push(image);
	}

	this.update = function(delta)
	{

	}

	this.draw = function(c, delta)
	{
		var blocks = world.blocks

		//Loops through block layers
		for(var layer_index = 0; layer_index < blocks.length; layer_index++)
		{
			//Loops through data in block layer
			var layer = blocks[layer_index];
			for(var col = 0; col < layer.data.length; col++)
			{
				for(var row = 0; row < layer.data[col].length; row++)
				{
					var texture_id = layer.data[col][row];

					var tilemap = tilesets[0];
					var tile = tilesets[0].tiles[texture_id];


					if(tile.type == 'transparent')
					{
						continue;
					}
					c.drawImage(
						tile_images[0],
						tile.coord[0] * tilemap.tileWidth,
						tile.coord[1] * tilemap.tileHeight,
						tilemap.tileWidth,
						tilemap.tileHeight,
						tilemap.tileWidth * row,
						tilemap.tileHeight * col,
						tilemap.tileWidth,
						tilemap.tileHeight
					);
				}

			}

		}
	}
}