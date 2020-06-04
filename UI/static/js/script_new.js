// on input/text enter--------------------------------------------------------------------------------------
$('.usrInput').on('keyup keypress', function (e) {
	var keyCode = e.keyCode || e.which;
	var text = $(".usrInput").val();
	if (keyCode === 13) {
		if (text == "" || $.trim(text) == '') {
			e.preventDefault();
			return false;
		} else {
			$(".usrInput").blur();
			setUserResponse(text);
			send(text);
			e.preventDefault();
			return false;
		}
	}
});


//------------------------------------- Set user response------------------------------------
function setUserResponse(val) {


	var UserResponse = '<img class="userAvatar" src=' + "./static/img/userAvatar.jpg" + '><p class="userMsg">' + val + ' </p><div class="clearfix"></div>';
	$(UserResponse).appendTo('.chats').show('slow');
	$(".usrInput").val('');
	scrollToBottomOfResults();
	$('.suggestions').remove();
}

//---------------------------------- Scroll to the bottom of the chats-------------------------------
function scrollToBottomOfResults() {
	var terminalResultsDiv = document.getElementById('chats');
	terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}

function send(message) {
	console.log("User Message:", message)
	$.ajax({
		url: 'http://localhost:5005/webhooks/rest/webhook',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({
			"message": message,
			"sender": "Me"
		}),
		success: function (data, textStatus) {
			if(data != null){
					setBotResponse(data);
			}
			console.log("Rasa Response: ", data, "\n Status:", textStatus)
		},
		error: function (errorMessage) {
			setBotResponse("");
			console.log('Error' + errorMessage);

		}
	});
}

//------------------------------------ Set bot response -------------------------------------
function setBotResponse_old(val) {
	setTimeout(function () {
		if (val.length < 1) {
			//if there is no response from Rasa
			msg = 'I couldn\'t get that. Let\' try something else!';

			var BotResponse = '<img class="botAvatar" src="./static/img/botAvatar.png"><p class="botMsg">' + msg + '</p><div class="clearfix"></div>';
			$(BotResponse).appendTo('.chats').hide().fadeIn(1000);

		} else {
			//if we get response from Rasa
			for (i = 0; i < val.length; i++) {
				//check if there is text message
				if (val[i].hasOwnProperty("text")) {
					var BotResponse = '<img class="botAvatar" src="./static/img/botAvatar.png"><p class="botMsg">' + val[i].text + '</p><div class="clearfix"></div>';
					$(BotResponse).appendTo('.chats').hide().fadeIn(1000);
				}

				//check if there is image
				if (val[i].hasOwnProperty("image")) {
					var BotResponse = '<div class="singleCard">' +
						'<img class="imgcard" src="' + val[i].image + '">' +
						'</div><div class="clearfix">'
					$(BotResponse).appendTo('.chats').hide().fadeIn(1000);
				}

				//check if there is  button message
				if (val[i].hasOwnProperty("buttons")) {
					addSuggestion(val[i].buttons);
				}

			}
			scrollToBottomOfResults();
		}

	}, 500);
}

function setBotResponse(val) {
	setTimeout(function () {
		if (val.length < 1) {
			//if there is no response from Rasa
			msg = 'Sorry I wasn\'t able to understand your Query. Let\' try something else!';

			var BotResponse = '<img class="botAvatar" src="./static/img/botAvatar.png"><p class="botMsg">' + msg + '</p><div class="clearfix"></div>';
			$(BotResponse).appendTo('.chats').hide().fadeIn(1000);

		} else {
			//if we get response from Rasa
			var msg = "";

			for (i = 0; i < val.length; i++) {
				//check if there is text message
				console.log(val[i].image);
				console.log(val[i].text);

				if (val[i].hasOwnProperty("text")) {
					var BotResponse = '<img class="botAvatar" src="./static/img/botAvatar.png"><p class="botMsg">' + val[i].text + '</p><div class="clearfix"></div>';
					$(BotResponse).appendTo('.chats').hide().fadeIn(1000);
				}

				//check if there is image
				if (val[i].hasOwnProperty("image")) {
				if (val[i].image == "/home/mukesh/20april2020/test/01_rasa_color_cb/3.png")
				{
				msg += '<div class="container botResult"><div class="myCarousel'+i+' carousel slide" data-ride="carousel"><ol class="carousel-indicators"><li data-target=".myCarousel'+i+'" data-slide-to="0" class="active"></li><li data-target=".myCarousel'+i+'" data-slide-to="1"></li><li data-target=".myCarousel'+i+'" data-slide-to="2"></li></ol><div class="carousel-inner">';
				msg += '<div class="item active"><img width="200" height="124" src="/home/mukesh/9april2020/01_rasa_color_cb/1.png"></div><div class="item"><img width="200" height="124" src="/home/mukesh/9april2020/01_rasa_color_cb/2.png"></div><div class="item"><img width="200" height="124" src="/home/mukesh/9april2020/01_rasa_color_cb/3.png"></div><div class="item"><img width="200" height="124" src="/home/mukesh/9april2020/01_rasa_color_cb/4.png"></div>';
				msg += '</div><a class="left carousel-control" href=".myCarousel'+i+'" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href=".myCarousel'+i+'" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span><span class="sr-only">Next</span></a></div></div>';

				}
				else if (val[i].image == "https://i.imgur.com/nGF1K8f.jpg")
				{
				msg += '<div class="container botResult"><div class="myCarousel'+i+' carousel slide" data-ride="carousel"><ol class="carousel-indicators"><li data-target=".myCarousel'+i+'" data-slide-to="0" class="active"></li><li data-target=".myCarousel'+i+'" data-slide-to="1"></li><li data-target=".myCarousel'+i+'" data-slide-to="2"></li></ol><div class="carousel-inner">';
				msg += '<div class="item active"><img width="200" height="124" src="2e6ae96e6811ac9b21deb3f1213d39d3.png"></div><div class="item"><img width="200" height="124" src="6180fbd0fd58b249600f1260b1737c06.png"></div><div class="item"><img width="200" height="124" src="yokohama-tire-squarelogo.png"></div><div class="item"><img width="200" height="124" src="michelin-logo-square.jpg"></div>';
				msg += '</div><a class="left carousel-control" href=".myCarousel'+i+'" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href=".myCarousel'+i+'" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span><span class="sr-only">Next</span></a></div></div>';
				}
				else
				{
					var BotResponse = '<div class="singleCard">' +
										'<img class="imgcard" src="' + val[i].image + '">' +
										'</div>'
				}

					var BotResponse = msg+'<div class="clearfix">'
					$(BotResponse).appendTo('.chats').hide().fadeIn(1000);
				}

				//check if there is  button message
				if (val[i].hasOwnProperty("buttons")) {
					addSuggestion(val[i].buttons);
				}

			}
			scrollToBottomOfResults();
		}

	}, 500);
}

// ------------------------------------------ Toggle chatbot -----------------------------------------------
$('#profile_div').click(function () {
	$('.profile_div').toggle();
	$('.widget').toggle();
	scrollToBottomOfResults();
});

$('#close').click(function () {
	$('.profile_div').toggle();
	$('.widget').toggle();
});


// ------------------------------------------ Suggestions -----------------------------------------------

function addSuggestion(textToAdd) {
	setTimeout(function () {
		var suggestions = textToAdd;
		var suggLength = textToAdd.length;
		$(' <div class="singleCard"> <div class="suggestions"><div class="menu"></div></div></diV>').appendTo('.chats').hide().fadeIn(1000);
		// Loop through suggestions
		for (i = 0; i < suggLength; i++) {
			$('<div class="menuChips" data-payload=\''+(suggestions[i].payload)+'\'>' + suggestions[i].title + "</div>").appendTo(".menu");
		}
		scrollToBottomOfResults();
	}, 1000);
}


// on click of suggestions, get the value and send to rasa
$(document).on("click", ".menu .menuChips", function () {
	var text = this.innerText;
	var payload= this.getAttribute('data-payload');
	console.log("button payload: ",this.getAttribute('data-payload'))
	setUserResponse(text);
	send(payload);
	$('.suggestions').remove(); //delete the suggestions 
});
