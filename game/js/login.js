$(document).ready(function(){
	var socket	= io.connect('http://127.0.0.1:8080');
	socket.on('login', user_connect);
	
	var submitButton = $("#signin");
	var error = $(".error-output");

	var user_data = {};

	submitButton.click(function(){
		user_data = { 
			username : $("#username").val(), 
			password : $("#password").val()
		};

		if(user_data.username == '')
		{
			showError('You need to enter your username');
			return;
		}
		else if(user_data.password == '')
		{			
			showError('You need to enter your password');
			return;
		}
		else
		{
			socket.emit('login', user_data);
		}
	});

	function user_connect(data)
	{
		if(!data.success)
		{
			showError('Username and Password not recognized');
		}
		else
		{
			for(var key in data.output)
			{
				sessionStorage[key] = data.output[key];
				console.log("Typeof for " + key + " " + typeof data.output[key]);
			}

			window.location = 'index.html';
		}
	}

	function showError(value)
	{
		var error = $(".error-output");

		error.text(value);
		error.show();
	}

	function hideError()
	{
		var error = $(".error-output");
		error.text('');
		error.hide();
	}
});