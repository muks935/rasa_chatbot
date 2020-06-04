$(document).ready(function () {

	//Widget Code
	var bot = '<div class="chatCont" id="chatCont">' +
		'<div class="chat_header_none"></div>'+
		'<div class="chat_header" style="display:none"><span style="color:white;"><img height="auto" width="160px" class="logo_header" src="./static/img/eluminous-logo.png"/></span></div>'+
		'<div id="result_div" class="resultDiv"><img height="50px" width="130px" class="logo center" src="./static/img/eluminous-icon.png"/><h2 class="logo_text">eLuminous<span>Technologies pvt ltd</span></h2></div>' +
		'<div class="chatForm" id="chat-div">' +
		'<p class="footer" style="display:none">Powered by <strong>eLuminous &nbsp; &nbsp;</strong></p>'+
		'<div class="spinner">' +
		'<div class="bounce1"></div>' +
		'<div class="bounce2"></div>' +
		'<div class="bounce3"></div>' +
		'</div>' +
		'<div class="card-body">'+
		'How can i help you?'+
		'<hr style="width: 105.6%;margin-left: -10px;margin-top: 20px;margin-bottom: 20px;border: 0;border-top: 1px solid #eee;">'+
		'<strong>Type hi to get started <span><img src="./static/img/right-icon.png"/></span></strong>'+
		'</div>'+
		'<button class="test-button">  </button><button class="test-button1" style="display:none">  </button><span><input type="text" id="chat-input" autocomplete="off" placeholder="Type here..."' + 'class="form-control bot-txt"/></span>' +
		'</div>' +
		'<div class="bot_profile">' +
		'<img src="./static/img/close-icon.png"/>' +
		'</div>' +
		'</div><!--bot_profile end-->' +
		'</div><!--chatCont end-->' +

		'<div class="profile_div">' +
		'<div class="row">' +
		'<div class="col-hgt col-sm-offset-2">' +
		'<p class="img-profile">' +
		'<img height="16px" width="16px" src="./static/img/chat-icon.png"/>'+
		" "+
		"Let's Chat!"+
		'</p>'
		'</div><!--col-hgt end-->' +
		'<div class="col-hgt">' +
		'<div class="chat-txt">' +
		'' +
		'</div>' +
		'</div><!--col-hgt end-->' +
		'</div><!--row end-->' +
		'</div><!--profile_div end-->';

	$("mybot").html(bot);

	$('.img-profile').on('click', function() {
$.ajax({
url : 'start_chat.php'
}).done(function(data) {
console.log(data);
});
});

	// ------------------------------------------ Toggle chatbot -----------------------------------------------
	//function to click and open chatbot from icon
	$('.profile_div').click(function () {
		$('.profile_div').toggle();
		$('.chatCont').toggle();
		$('.bot_profile').toggle();
		$('.chatForm').toggle();
		document.getElementById('chat-input').focus();
		
	});
	
	//function to click and close chatbot to icon
	$('.bot_profile').click(function () {
		$('.profile_div').toggle();
		$('.chatCont').toggle();
		$('.bot_profile').toggle();
		$('.chatForm').toggle();
		//document.execCommand("make run");
	});

	$('.test-button').click(function () {
		$('.card-body').toggle();
		$('.test-button').toggle();
		$('.test-button1').toggle();
		//document.execCommand("make run");
	});
	$('.test-button1').click(function () {
		$('.card-body').toggle();
		$('.test-button').toggle();
		$('.test-button1').toggle();
		//document.execCommand("make run");
	});




	// on input/text enter--------------------------------------------------------------------------------------
	
	$('#chat-input').on('keyup keypress', function (e) {
		var keyCode = e.keyCode || e.which;
		var text = $("#chat-input").val();

		if (keyCode === 13) {
			if (text == "" || $.trim(text) == '') {
				e.preventDefault();
				return false;
			} else {
				$("#chat-input").blur();
				$('.card-body').hide();
				setUserResponse(text);
				send(text);
				e.preventDefault();
				return false;
			}
		}
	});


	//------------------------------------------- Call the RASA API--------------------------------------
	function send(text) {


		$.ajax({
			url: 'http://134.209.189.219:5005/webhooks/rest/webhook', //  RASA API
			type: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify({
				"sender": "user",
				"message": text
			}),
			success: function (data, textStatus, xhr) {
				//console.log(data);

				if (Object.keys(data).length !== 0) {
					for (i = 0; i < Object.keys(data[0]).length; i++) {
						if (Object.keys(data[0])[i] == "buttons") { //check if buttons(suggestions) are present.
							addSuggestion(data[0]["buttons"])
						}

					}
				}

				setBotResponse(data);

			},
			error: function (xhr, textStatus, errorThrown) {
				console.log('Error in Operation');
				setBotResponse('error');
			}
		});





	}


	//------------------------------------ Set bot response in result_div -------------------------------------
	function setBotResponse(val) {
		setTimeout(function () {

		if ($.trim(val) == '' || val == 'error') 
		{ //if there is no response from bot or there is some error
			val = 'Sorry I wasn\'t able to understand your Query. Let\' try something else!'
			var BotResponse = '<p class="botResult">' + val + '</p><div class="clearfix"></div>';
			$(BotResponse).appendTo('#result_div');
		} else {

		//if we get message from the bot succesfully
		var msg = "";
		for (var i = 0; i < val.length; i++) {
			console.log(val[i]["image"]);
			console.log(val[i]["text"]);
			if (val[i]["image"] == "/home/mukesh/20april2020/test/01_rasa_color_cb/3.png")
			{
				msg += '<div class="container botResult"><div class="myCarousel'+i+' carousel slide" data-ride="carousel"><ol class="carousel-indicators"><li data-target=".myCarousel'+i+'" data-slide-to="0" class="active"></li><li data-target=".myCarousel'+i+'" data-slide-to="1"></li><li data-target=".myCarousel'+i+'" data-slide-to="2"></li></ol><div class="carousel-inner">';
				msg += '<div class="item active"><img width="200" height="124" src="1.png"><img width="200" height="124" src="2.png"></div><div class="item"><img width="200" height="124" src="3.png"><img width="200" height="124" src="4.png"></div>';
				msg += '</div><a class="left carousel-control" href=".myCarousel'+i+'" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href=".myCarousel'+i+'" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span><span class="sr-only">Next</span></a></div></div>';

			}
			else if	(val[i]["image"] == "https://i.imgur.com/nGF1K8f.jpg")
			{
				msg += '<div class="container botResult"><div class="myCarousel'+i+' carousel slide" data-ride="carousel"><ol class="carousel-indicators"><li data-target=".myCarousel'+i+'" data-slide-to="0" class="active"></li><li data-target=".myCarousel'+i+'" data-slide-to="1"></li><li data-target=".myCarousel'+i+'" data-slide-to="2"></li></ol><div class="carousel-inner">';
				msg += '<div class="item active"><img width="200" height="124" src="2e6ae96e6811ac9b21deb3f1213d39d3.png"><img width="200" height="124" src="6180fbd0fd58b249600f1260b1737c06.png"></div><div class="item"><img width="200" height="124" src="yokohama-tire-squarelogo.png"><img width="200" height="124" src="michelin-logo-square.jpg"></div>';
				msg += '</div><a class="left carousel-control" href=".myCarousel'+i+'" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href=".myCarousel'+i+'" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span><span class="sr-only">Next</span></a></div></div>';
			}

			else {
				msg += '<p class="botResult">' + val[i].text + '</p><div class="clearfix"></div>';
			}

			}
			BotResponse = msg;
			$(BotResponse).appendTo('#result_div');

			}
			scrollToBottomOfResults();
			hideSpinner();
			}, 500);
		$('.card-body').hide();

	}


	//------------------------------------- Set user response in result_div ------------------------------------
	function setUserResponse(val) {
		var UserResponse = '<p class="userEnteredText">' + val + '</p><div class="clearfix"></div>';
		var imageUrl = "crop1.png";
		$(".chatCont").css("background-image", "url(" + imageUrl + ")");  
		$('.chat_header').show();
		$('.chat_header_none').hide();
		$('.logo').hide();
		$('.logo_text').hide();
		$('.footer').show();
		$(UserResponse).appendTo('#result_div');
		$("#chat-input").val('');
		scrollToBottomOfResults();
		showSpinner();
		$('.suggestion').remove();
	}


	//---------------------------------- Scroll to the bottom of the results div -------------------------------
	function scrollToBottomOfResults() {
		var terminalResultsDiv = document.getElementById('result_div');
		terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
	}


	//---------------------------------------- Spinner ---------------------------------------------------
	function showSpinner() {
		$('.spinner').show();
	}

	function hideSpinner() {
		$('.spinner').hide();
	}




	//------------------------------------------- Buttons(suggestions)--------------------------------------------------
	function addSuggestion(textToAdd) {
		setTimeout(function () {
			var suggestions = textToAdd;
			var suggLength = textToAdd.length;
			$('<p class="suggestion"></p>').appendTo('#result_div');
			// Loop through suggestions
			for (i = 0; i < suggLength; i++) {
				$('<span class="sugg-options">' + suggestions[i].title + '</span>').appendTo('.suggestion');
			}
			scrollToBottomOfResults();
		}, 1000);
	}


	// on click of suggestions get value and send to API.AI
	$(document).on("click", ".suggestion span", function () {
		var text = this.innerText;
		setUserResponse(text);
		send(text);
		$('.suggestion').remove();
	});
	// Suggestions end -----------------------------------------------------------------------------------------


});
