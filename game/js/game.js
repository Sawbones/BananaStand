function Game()
{
	var canvas 				= document.getElementById('game');
	var c 					= canvas.getContext('2d');

	var player_image 		= loadImage('resources/images/player.png');
	var player_json			= require('./resources/sprites/player.json');
	var player_sprite		= new Sprite(player_image, player_json);

	var player_object 		= {
		username : sessionStorage.username,
		x : parseInt(sessionStorage.x),
		y : parseInt(sessionStorage.y),
		animation : sessionStorage.animation,
		id : sessionStorage.id
	};
	var player 				= new GameObject(player_object, player_sprite);

	var other_players 		= new Array();

	var direction 			= {
		up 		: false,
		down 	: false,
		left 	: false,
		right 	: false
	};
	var last_direction = player_object.animation;

	var world = new World('resources/maps/test_world');

	var velocity = 1.5/10;

	var clickable_objects = [];

	socket.on('update', server_update);

	this.update = function(delta)
	{
		world.update(delta);
		player.update(delta);
		if(direction.up)
		{
			player.sprite.setAnimation('walk_up');
			player.params.y -= (velocity * delta);
		}
		else if(direction.down)
		{
			player.sprite.setAnimation('walk_down');
			player.params.y += (velocity * delta);
		}
		else if(direction.left)
		{
			player.sprite.setAnimation('walk_left');
			player.params.x -= (velocity * delta);

		}
		else if(direction.right)
		{
			player.sprite.setAnimation('walk_right');
			player.params.x += (velocity * delta);
		}
		else
		{
			switch(last_direction)
			{
				case 'up':
					player.sprite.setAnimation('stand_up');
					break;
				case 'left':
					player.sprite.setAnimation('stand_left');
					break;
				case 'right':
					player.sprite.setAnimation('stand_right');
					break;
				case 'down':
					player.sprite.setAnimation('stand_down');
					break;
			}
		}
		player.params.animation = player.sprite.selected_animation;
		socket.emit('update', player.params);
	}

	this.draw = function(delta)
	{
		c.fillStyle = '#333';
		c.fillRect(0, 0, canvas.width, canvas.height);

		world.draw(c, delta);

		for(var user_id in other_players)
		{
			other_players[user_id].draw(c, delta);
		}

		player.draw(c, delta);
	}

	function server_update(server_objects)
	{
		for(var user_id in server_objects)
		{
			var server_object = server_objects[user_id];

			if(server_object.username == sessionStorage.username)
			{
				continue;
			}

			if(typeof other_players[user_id] != 'undefined')
			{
				other_players[user_id].params = server_object;
				other_players[user_id].sprite.setAnimation(server_object.animation);
				continue;
			}
			else
			{
				var other_sprite = new Sprite(player_image, player_json);
				var object = new GameObject(server_object, other_sprite);

				object.sprite.setAnimation(server_object.animation);

				other_players[user_id] = object;
			}
		}
	}

	function loadImage(loc)
	{
		var image = new Image();
		image.src = loc;
		return image;
	}

	function keydown(e)
	{
		var character = String.fromCharCode( e.which );
		switch(character)
		{
			case 'W':
				direction.up = true;
				break;
			case 'S':
				direction.down = true;
				break;
			case 'A':
				direction.left = true;
				break;
			case 'D':
				direction.right = true;
				break;
		}
	}

	function keyup(e)
	{
		var character = String.fromCharCode( e.which );
		switch(character)
		{
			case 'W':
				direction.up = false;
				last_direction = 'up';
				break;
			case 'S':
				direction.down = false;
				last_direction = 'down';
				break;
			case 'A':
				direction.left = false;
				last_direction = 'left';
				break;
			case 'D':
				direction.right = false;
				last_direction = 'right';
				break;
		}
	}

	function mousedown(e)
	{
		console.log(e);

		for(var i = 0; i < click_manager.objects.length; i++)
		{
			click_manager[i].events;
		}
	}

	$(document).keydown(keydown);
	$(document).keyup(keyup);
	$(document).click(mousedown);
}