$(document).ready(function () {

	var emailValid = 0;

	//Widget Code
	var bot = '<div class="chatCont" id="chatCont">' +
		'<div class="chat_header_none"></div>'+
		'<div class="chat_header" style="display:none"><span style="color:white;"><img height="auto" width="160px" class="logo_header" src="./UI/static/img/eluminous-logo.png"/></span></div>'+
		'<div id="result_div" class="resultDiv"><img height="50px" width="130px" class="logo center" src="./UI/static/img/eluminous-icon.png"/><h2 class="logo_text">eLuminous<span>Technologies pvt ltd</span></h2></div>' +
		'<div class="chatForm" id="chat-div">' +
		'<p class="footer" style="display:none">Powered by <strong>eLuminous</strong></p>'+
		'<div class="spinner">' +
		'<div class="bounce1"></div>' +
		'<div class="bounce2"></div>' +
		'<div class="bounce3"></div>' +
		'</div>' +
		'<div class="card-body">'+
		'How can i help you?'+
		'<hr style="width: 105.6%;margin-left: -10px;margin-top: 20px;margin-bottom: 20px;border: 0;border-top: 1px solid #eee;">'+
		'<strong>Type hi to get started <span><img src="./UI/static/img/right-icon.png"/></span></strong>'+
		'</div>'+
		'<button class="test-button">  </button><button class="test-button1" style="display:none">  </button><span><input type="text" id="chat-input" autocomplete="off" placeholder="Type here..."' + 'class="form-control bot-txt"/></span>' +
		'</div>' +
		'<div class="bot_profile">' +
		'<img src="./UI/static/img/close-icon.png"/>' +
		'</div>' +
		'</div><!--bot_profile end-->' +
		'</div><!--chatCont end-->' +

		'<div class="profile_div">' +
		'<div class="row">' +
		'<div class="col-hgt col-sm-offset-2">' +
		'<p class="img-profile">' +
		'<img height="16px" width="16px" src="./UI/static/img/chat-icon.png"/>'+
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

	$('#contact-form input').keydown(function (e) {
				    if (e.keyCode == 13) {
				        e.preventDefault();
				        return false;
				    }
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

	function getJSessionId(){    

		var session_id;
		if (sessionStorage.getItem('sessionId') === null)
		 {
			var date = new Date();
			var timestamp = date.getTime();
			var jsId = 'user'+timestamp;

			sessionStorage.setItem('sessionId',jsId);
			
		}
		
		session_id = sessionStorage.getItem('sessionId'); 
		$('#userId').val(session_id);				
		console.log(session_id);

	    return session_id
	}

	function send(text) {
				
		$.ajax({
			url: 'http://134.209.189.219:5005/webhooks/rest/webhook', //  RASA API
			type: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify({
				"sender": getJSessionId(),
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
			//console.log(val[i]["image"]);
			console.log(val[i]["text"]);
			if (val[i]["image"] == "./rasa_chatboat/UI/3.png")
			{
				msg += '<div class="container botResult"><div class="myCarousel'+i+' carousel slide" data-ride="carousel"><ol class="carousel-indicators"><li data-target=".myCarousel'+i+'" data-slide-to="0" class="active"></li><li data-target=".myCarousel'+i+'" data-slide-to="1"></li><li data-target=".myCarousel'+i+'" data-slide-to="2"></li></ol><div class="carousel-inner">';
				msg += '<div class="item active"><img width="200" height="124" src="UI/1.png"><img width="200" height="124" src="UI/2.png"></div><div class="item"><img width="200" height="124" src="UI/3.png"><img width="200" height="124" src="UI/4.png"></div>';
				msg += '</div><a class="left carousel-control" href=".myCarousel'+i+'" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href=".myCarousel'+i+'" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span><span class="sr-only">Next</span></a></div></div>';

			}
			else if	(val[i]["image"] == "https://i.imgur.com/nGF1K8f.jpg")
			{
				msg += '<div class="container botResult"><div class="myCarousel'+i+' carousel slide" data-ride="carousel"><ol class="carousel-indicators"><li data-target=".myCarousel'+i+'" data-slide-to="0" class="active"></li><li data-target=".myCarousel'+i+'" data-slide-to="1"></li><li data-target=".myCarousel'+i+'" data-slide-to="2"></li></ol><div class="carousel-inner">';
				msg += '<div class="item active"><img width="200" height="124" src="UI/2e6ae96e6811ac9b21deb3f1213d39d3.png"><img width="200" height="124" src="UI/6180fbd0fd58b249600f1260b1737c06.png"></div><div class="item"><img width="200" height="124" src="UI/yokohama-tire-squarelogo.png"><img width="200" height="124" src="UI/michelin-logo-square.jpg"></div>';
				msg += '</div><a class="left carousel-control" href=".myCarousel'+i+'" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href=".myCarousel'+i+'" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span><span class="sr-only">Next</span></a></div></div>';
			}
 			else if	(val[i]["text"] == "contact_details")
			{
				msg += '<form id="contact-form" method="post"  role="form"><div class="messages"></div><div class="controls">';
				msg += '<div class="row"><div class="col-md-12"><div class="form-group"><label for="form_name">First Name *</label><input id="form_name" type="text" name="name" class="form-control" placeholder="Please enter your firstname *" required="required" data-error="Firstname is required."><div class="help-block with-errors"></div></div></div>';
				msg += '<div class="col-md-12"><div class="form-group"><label for="form_lastname">Last Name *</label><input id="form_lastname" type="text" name="surname" class="form-control" placeholder="Please enter your lastname *" required="required" data-error="Lastname is required."><div class="help-block with-errors"></div></div></div></div>';
				msg += '<div class="row"><div class="col-md-12"><div class="form-group"><label for="form_email">Email *</label><input id="form_email" type="email" name="email" class="form-control" placeholder="Please enter your email *" required="required" data-error="Valid email is required." onchange = "$(\'#send_button\').attr(\'disabled\', true);$(\'#send_button\').val(\'Wait! Form is submitting\');"><div class="help-block with-errors"></div></div></div></div>';
				//msg += '<div class="col-md-12"><div class="form-group"><label for="form_phone">Phone</label><input id="form_phone" type="tel" name="phone" class="form-control" placeholder="Please enter your phone"><div class="help-block with-errors"></div></div></div>';
				msg += '<div class="row"><div class="col-md-12"><input type="submit" class="btn userEnteredText btn-send" value="Send" id="send_button"></div></div>';
				msg += '</div></form>';

				$('#contact-form input').keydown(function (e) {
				    if (e.keyCode == 13) {
				        e.preventDefault();
				        return false;
				    }
				});
				
				
				setTimeout( function(){ 
						getUserDetails();
  					}  , 10000 );
				
			}
			else 
			{
				var searchStr = 'answering';
				if(	val[i].text.search(searchStr) != -1)
				{
					var userReq = val[i].text;
					var finalUserReq = userReq.replace("Thanks for answering,Here is your Details:", " ");
					$('#userReq').val(finalUserReq);
					//console.log($('#userReq').val());
				}
				
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


	function getUserDetails() {

		$('#contact-form').validator();


		var url = "contact.php";

		var name = $('#form_name').val(); 
		var surname = $('#form_lastname').val(); 
		var phone = $('#form_phone').val(); 
		var email = $('#form_email').val(); 
		var userId = $('#userId').val();
		var userReq = $('#userReq').val();
		
		 var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		  if(regex.test(email)) {
		    emailValid = 1
		  }

			   
		// POST values in the background the the script URL
		if((name != null && name != '') && (surname != null && surname != '') && (emailValid == 1))
	    {
	    	//$("#send_button").prop('disabled', true); 
	    	$("#send_button").attr("disabled", true);

			$.ajax({
			type: "POST",
			url: url,
			data: { name: name, surname:surname,phone:phone, email:email, userId:userId, userReq:userReq } ,
			success: function (data)
			{
				// data = JSON object that contact.php returns

				// we recieve the type of the message: success x danger and apply it to the 
				var messageAlert = 'alert-' + data.type;
				var messageText = data.message;

				// let's compose Bootstrap alert box HTML
				var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

				// If we have messageAlert and messageText
				if (messageAlert && messageText) {
				    // inject the alert to .messages div in our form
				    $('#contact-form').find('.messages').html(alertBox);

				    // empty the form
				    //$('#contact-form')[0].reset();
				    $('#send_button').val('Form successfully submitted.');
				    send('hi');
				}
			}
			});
		} 
		else 
		{			
			setTimeout( function(){ 
						getUserDetails();
  					}  , 10000 );
		}
		
		return false;
	}

	//------------------------------------- Set user response in result_div ------------------------------------
	function setUserResponse(val) {
		var UserResponse = '<p class="userEnteredText">' + val + '</p><div class="clearfix"></div>';
		var imageUrl = "UI/crop1.png";
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
