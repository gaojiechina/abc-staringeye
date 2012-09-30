﻿
var server_ip = "http://www.mtmfuture.com:8080/HS/";
//var server_ip = "http://localhost:8080/HS/";
var isLocal = false;
var mycards = [ 10, 23, 11, 11, 53, 54 ];
var prevcards = [];
// var order = [];
var currentDUIZI_Count = -1;
var currentDUIZI_Array;
var currentSHUNZI_Count = -1;
var currentSHUNZI_Array;
var currentLIANDUI_Count = -1;
var currentLIANDUI_Array;
var currentZHADAN_Count = -1;
var currentZHADAN_Array;
var toSearchArray = [];
var toSearchCount = -1;
var timeStamp = 0;
var preState = 0;
// var prePlayState = 0;
var token = "";
var currentState = 0;
var userInfo = "";
var lastCards = [];
var currentScore = [];
var lastPlayCards = [];
var intervalTime = 3000;
var regAvatarId;
var displayScore = false;
var defaultTime = 20;
// {"avatarId":3,"niname":"xing","score":1000,"uid":"2"}var currentRoomId = 0; // For example:
// {"createId":"3","createName":"xing","currentCount":1,"rid":"20","roomName":"123","state":0},

var timer;
var restTime;

var myScroll;

document.addEventListener('touchmove', function(e){e.preventDefault();}, false);
$(document).ready(function() {
	//$("#sound").html("<audio id=\"backplayer\" autoplay=\"autoplay\" loop=\"loop\"><source src=\"sound/audio_game_back.ogg\" type=\"audio/ogg\"></audio>");
	setTimeout(am_ready, 1000);
});
setTimeout(am_ready, 10000);

function help_loaded() 
{
	myScroll = new iScroll('wrapper');
}

function room_loaded()
{
	myScroll = new iScroll('wrapper_room');
//	$('#loadingroominfo').css("display","none");
}

function am_ready() 
{
	$("#nike_Me").html("昵称：我");
	if(typeof(android) == "undefined")
		return;
	loadParameters();
	android.ready();
}

function toggleSound(){
	if($('#sound_button > span > span').html() == '声音(开)'){
		document.getElementById('backplayer').pause();
	}else{
		document.getElementById('backplayer').play();
	}
	$('#sound_button > span > span').html(($('#sound_button > span > span').html() == '声音(开)')?'声音(关)':'声音(开)')
	
}

function loadParameters(){
	if(typeof(android) == "undefined"){
		user_score_local = 1000;
		lplayer_score_local = 1000;
		rplayer_score_local = 1000;
		return;
	}
	
	user_score_local = android.getProperty("user_score_local");
	if(typeof(user_score_local) == "undefined"){
		user_score_local = 1000;
		android.setProperty("user_score_local", 1000);
	}
	user_score_local = Number(user_score_local);
	
	lplayer_score_local = android.getProperty("lplayer_score_local");
	if(typeof(lplayer_score_local) == "undefined"){
		lplayer_score_local = 1000;
		android.setProperty("lplayer_score_local", 1000);
	}
	lplayer_score_local = Number(lplayer_score_local);

	rplayer_score_local = android.getProperty("rplayer_score_local");
	if(typeof(rplayer_score_local) == "undefined"){
		rplayer_score_local = 1000;
		android.setProperty("rplayer_score_local", 1000);
	}
	rplayer_score_local = Number(rplayer_score_local);
	
	var isRemember = android.getProperty("isRemember");
	if(typeof(isRemember) != "undefined" && Number(isRemember) == 1){
		console.log("is remember");
		$('#checkbox-0').attr("checked",true).checkboxradio("refresh");
		
		var username = android.getProperty("username");
		if(typeof(username) != "undefined"){
			$('#username').val(username);
		}

		var userniname = android.getProperty("userniname");
		//alert(userniname);
		if(typeof(userniname) != "undefined"){
			$('#username_one').html("昵称：" + userniname);
			$('#username_one').css("display", "block");
		}
		
		var password = android.getProperty("password");
		if(typeof(password) != "undefined"){
			$('#password').val(password);
		}

		var avatarId = android.getProperty("avatarId");
		if(typeof(avatarId) != "undefined"){
			$('#user_icon_one').html(
					"<img src=\"js/images/head/head"
							+ ((avatarId < 10) ? ("0" + avatarId) : avatarId)
							+ ".png\" width=\"50\" />");
		}

		var online_score = android.getProperty("online_score");
		if(typeof(online_score) != "undefined"){
			//alert(online_score);
			$('#score_one').html("资产：$" + online_score + "");
			$('#score_one').css("display", "block");
		}
	}else{
		$('#checkbox-0').attr("checked",false).checkboxradio("refresh");;
		$('#username').val("");
		$('#password').val("");
	}
}


function insertCards(cardlist, num)
{
	for ( var i in cardlist) 
	{
		if (num >= 53) 
		{
			if (cardlist[i] == 53)
			{
				var split1 = cardlist.slice(0, i);
				split1.push(num);
				cardlist = split1.concat(cardlist.slice(i));
				// mycards =
				// mycards.slice(0,i).push(num).concat(mycards.slice(i+1))
				return cardlist;
			}
		} 
		   else 
		    {
			  if (compareCardsGE(Number(cardlist[i]), num))
			   { // mycards[i] >= num
				var split1 = cardlist.slice(0, i);
				split1.push(num);
				cardlist = split1.concat(cardlist.slice(i));
				return cardlist;
			   }
		    }
	}
	cardlist.push(num);
	return cardlist;
}

function removeFromCardsList(cardslist, count) {
	if (cardslist.length <= count)
		return cardslist;
	var split1 = cardslist.slice(0, count);
	cardslist = split1.concat(cardslist.slice(count + 1));
	return cardslist;
}

function removeListFromCardsList(cardslist, todelete) {
	console.log("Before removeListFromCardsList: cardslist: " + getcardstoprint(cardslist));
	todelete = todelete.sort().reverse();
	for (i in todelete) 
	{
		cardslist = removeFromCardsList(cardslist, todelete[i]);
	}
	console.log("After removeListFromCardsList: cardslist: " + getcardstoprint(cardslist));
	return cardslist;
}

function getCardFileName(num) 
{
	var innerHTML = "";
	num = Number(num);
	switch (num) 
  {
	case 53:
		innerHTML += "card_smallking";
		break;
	case 54:
		innerHTML += "card_bigking";
		break;
	default: 
	{
		switch (Math.floor((Number(num) - 1) / 13)) 
		{
		case 0:
			innerHTML += "card_hearts_";
			break;
		case 1:
			innerHTML += "card_diamonds_";
			break;
		case 2:
			innerHTML += "card_spades_";
			break;
		case 3:
			innerHTML += "card_clubs_";
			break;
		}
		switch (Number(num % 13)) 
		{
		case 1:
			innerHTML += "a";
			break;
		case 11:
			innerHTML += "j";
			break;
		case 12:
			innerHTML += "q";
			break;
		case 0:
			innerHTML += "k";
			break;
		default:
			innerHTML += (num % 13);
		}
	}
	}
	innerHTML += ".png";
	return innerHTML;
}

function initmycards() {
	var innerHTML = "";
	for ( var i in mycards) 
	{
		innerHTML += "<span class=\"mycard\" style=\"display: inline-block; height:117px; width:60px; overflow:visible !important;\"><span style=\"display:block; padding-top:30px;\"><img src=\"js/images/";
		innerHTML += getCardFileName(mycards[i]);
		innerHTML += "\" height=\"117\"/></span></span>";
	}
	$('#mycards').html(innerHTML);
	$("span.mycard").click(function() 
	  {
		var height = $(this).css("height");
		console.log("click height:", height);
		
		if (height == "117px") 
		 {
			$(this).animate({height : '137',}, 0, function() {checkChupaiButton();});
			 //$(this).css("height", "137px");
		} else 
		    {
			$(this).animate({height : '117',}, 0, function() {checkChupaiButton();});
			//$(this).css("height", "117px");
		}
	});
	calcNumofCards();
	currentDUIZI_Count = -1;
	currentSHUNZI_Count = -1;
	currentLIANDUI_Count = -1;
	currentZHADAN_Count = -1;
	toSearchArray = [];
	toSearchCount = -1;
}

function disableButton(count) 
{
	$('span.button').each(function(index){
		if (count){
			if (index == count - 1)
				$(this).addClass("disabled");
		}else {
			$(this).addClass("disabled");
		}
	});
}

function enableButton(count) {
	$('span.button').each(function(index) {
		if (count){
			if (index == count - 1)
				$(this).removeClass("disabled");
		} 
		else {
			$(this).removeClass("disabled");
		}
	});
}

function hideAllButton() 
{
	$('#buttonmenu').css("display", "none");
}

function showAllButton() 
{
	$('#buttonmenu').css("display", "block");
}

function displayPai(cards){
	var innerStr = "";
	if( cards == null || cards.length == 0 ){
		 innerStr = "<span style=\"display: inline-block; height:58px; width:58px; \"><img src=\"js/images/no_user.png\"/></span>";
	}else{
		for (i in cards) 
		{
			if(cards[i] <= 54 && cards[i] >= 0)
				innerStr += "<span style=\"display: inline-block; height:58px; width:18px; \"><img src=\"js/images/"
						+ getCardFileName(cards[i])
						+ "\" width=\"40\"/></span>";
		}
		
	}
	
	if (innerStr != "") 
	{

	
		$("#mycard_small").css("display", "inline-block");
		$("#mycard_small").html(innerStr);
		
		// $("span.mycard_small").click(function() 
	  // {
		// var height = $(this).css("height");
		// console.log("click height:", height);
// 		
		// if (height == "117px") 
		 // {
			// $(this).animate({height : '137',}, 0, function() {checkChupaiButton2();});
			 // //$(this).css("height", "137px");
		// } else 
		    // {
			// $(this).animate({height : '117',}, 0, function() {checkChupaiButton2();});
			// //$(this).css("height", "117px");
		// }
	// });
		$("#mycard_small").animate
		({
			opacity : 0,
		}, 0, function() 
		  {
			$("#mycard_small").animate({}, 100, function() 
			  {
				$("#mycard_small").animate
				({
					opacity : 100,
				}, 0, function() 
				 {
					// Animation complete.
				});
			});
		});
	}
}

function chupai() 
{
	if(isLocal){
		chupai_local();
		return;
	}
	var innerStr = "";
	var todelete = [];
	var restCards = [];
	var playcards = "";
	
	lastPlayCards = [];
	$('span.mycard').each(
     function(index) 
	  {
		if ($(this).css("height") != "117px") 
		{
			// $(this).remove();
			todelete.push(index);
			lastPlayCards.push(mycards[index]);
			playcards += mycards[index]+"_";
		}else{
			restCards.push(mycards[index]);
		}
	  });
		
	todelete = reReplaceCards(mycards, todelete);
	if( prevcards == null || prevcards.length == 0)
		prevcards = [];
	if (isValid(todelete, prevcards) == "NOTVALID"
		// || !checkValid(lastCards, todelete) 
		) 
	{
		console.log("NOTVALID");
		container_add("不合规则的出牌");
		container_intime(550,1500);
		chongxuan();
		// innerStr = "<span style=\"display: inline-block; height:58px; width:58px; \"><img src=\"js/images/happybaby1.gif\" width=\"58\"/></span>";
		
	} else 
	{

		mycards = [];

		for( j in restCards )
		{
			mycards = insertCards(mycards, restCards[j]);
								
		}
		
						
		initmycards();
		
		displayPai(lastPlayCards);
		disableButton(3);
		hideAllButton();
		resetTime(20);
		//calcNumofCards();
		
		sendChupai(playcards);
	}
	

}

function forceChupai() 
{
	var innerStr = "";
	// var todelete = [];
	var playcards = "";
	var tochu = ai_withOutPrev(mycards);
	lastPlayCards = [];
	var restCards = [];
	for(i in tochu){
		playcards += mycards[tochu[i]] + "_";
		lastPlayCards.push(mycards[tochu[i]]);
	};
	
	for( i in mycards ){
		if( lastPlayCards.indexOf(mycards[i]) == -1 ){
			restCards.push(mycards[i]);
		}
	}
	
	tochu = reReplaceCards(mycards, tochu);

	mycards = [];

	for( j in restCards )
	{
		mycards = insertCards(mycards, restCards[j]);
								
	}
	
	initmycards();
	
	displayPai(lastPlayCards);
	disableButton(3);
	hideAllButton();
	resetTime(20);
	
	sendChupai(playcards);
}

function calcNumofCards() 
{
	var num = $('span.mycard').children().length;
	var innerHTML = "<span style=\"display: inline-block; height:20px; width:19px; \"><img src=\"js/images/score_add_0.png\" /></span>";
	innerHTML += "<span style=\"display: inline-block; height:20px; width:18px; \"><img src=\"js/images/score_add_"
			+ num + ".png\" /></span>";
	$("#mycardnum").html(innerHTML);
}

function chongxuan() 
{
	$('span.mycard').each
	 (function(index) 
	  {
		if ($(this).css("height") != "117px") 
		{
			$(this).animate
			({
				height : '117',
			}, 80);
		}
	});
	disableButton(3);
	currentLIANDUI_Count = -1;
	currentSHUNZI_Count = -1;
	currentDUIZI_Count = -1;
	currentZHADAN_Count = -1;
}

function checkValid(preCards, currentCards){
/*
	if( preCards == null || preCards.length == 0 || isValid(preCards) ){
		return true;
	}else{
		//implement preCards and currentCards are all arrays
	}
*/
	return true;
}

function tishi() 
{
	//return;
	
	//此段代码实现了部分的提示功能，请不要删掉
	if(prevcards.length == 0){ 
		//FREE Search
		var toSearchTYPE;
	
		if(currentLIANDUI_Count<0){
			currentLIANDUI_Array = checkLIANDUI(mycards).concat(checkLIANDUI_W(mycards));
			toSearchTYPE = "LIANDUI";
		}
		if(currentLIANDUI_Count+1 < currentLIANDUI_Array.length && currentLIANDUI_Array.length > 0){
			toSearchTYPE = "LIANDUI";
		}else{
			if(currentSHUNZI_Count<0){
				currentSHUNZI_Array = checkSHUNZI(mycards).concat(checkSHUNZI_W(mycards));
				toSearchTYPE = "SHUNZI";
			}
			if(currentSHUNZI_Count+1 <currentSHUNZI_Array.length && currentSHUNZI_Array.length > 0){
				toSearchTYPE = "SHUNZI";
			}else{
				if(currentDUIZI_Count<0){
					currentDUIZI_Array = checkDUIZI(mycards);
					toSearchTYPE = "DUIZI";
				}
				if(currentDUIZI_Count+1 < currentDUIZI_Array.length && currentDUIZI_Array.length > 0){
					toSearchTYPE = "DUIZI";
				}else{
//					if(currentZHADAN_Count<0){
//						currentZHADAN_Array = checkZHADAN();
//						toSearchTYPE = "ZHADAN";
//					}
//					if(currentDUIZI_Count+1 < currentDUIZI_Array.length && currentDUIZI_Array.length > 0){
//						toSearchTYPE = "DUIZI";
//					}else{
						if(currentZHADAN_Count<0){
							currentZHADAN_Array = checkZHADAN(mycards).concat(checkZHADAN_W(mycards)).concat(checkDUIZI_W(mycards)).concat(checkDANZHANG(mycards));//Single Card!!
							toSearchTYPE = "ZHADAN";
						}
						if(currentZHADAN_Count+1 < currentZHADAN_Array.length && currentZHADAN_Array.length > 0){
							toSearchTYPE = "ZHADAN";
						}else{
							if(currentLIANDUI_Count == -1 && currentSHUNZI_Count==-1 && currentDUIZI_Count == -1 && currentZHADAN_Count == -1){
								alert("您无牌可出了");
								disableButton(3);
								return;
							}
							currentLIANDUI_Count = -1;
							currentSHUNZI_Count = -1;
							currentDUIZI_Count = -1;
							currentZHADAN_Count = -1;
							tishi();
							return;
						}
//					}
				}
			}
		}
		
		
		if(toSearchTYPE == "LIANDUI"){
			toSearchArray = currentLIANDUI_Array;
			currentLIANDUI_Count ++;
			toSearchCount = currentLIANDUI_Count;
		}else if(toSearchTYPE == "SHUNZI"){
			toSearchArray = currentSHUNZI_Array;
			currentSHUNZI_Count ++;
			toSearchCount = currentSHUNZI_Count;
		}else if(toSearchTYPE == "DUIZI"){
			toSearchArray = currentDUIZI_Array;
			currentDUIZI_Count ++;
			toSearchCount = currentDUIZI_Count;
		}else if(toSearchTYPE == "ZHADAN"){
			toSearchArray = currentZHADAN_Array;
			currentZHADAN_Count ++;
			toSearchCount = currentZHADAN_Count;
		}
	}else{
		if(toSearchCount == -1){
			toSearchArray = [];
			if(isDUIZI(prevcards)){
				toSearchArray = toSearchArray.concat(checkDUIZI_Condition(mycards, prevcards));
				toSearchArray = toSearchArray.concat(checkDUIZI_Condition_W(mycards, prevcards));
				toSearchArray = toSearchArray.concat(checkZHADAN(mycards, prevcards));
				toSearchArray = toSearchArray.concat(checkZHADAN_W(mycards, prevcards));
			}else if(isSHUNZI(prevcards)){
				toSearchArray.push(checkSHUNZI_Condition(mycards, prevcards));
				toSearchArray.push(checkSHUNZI_Condition_W(mycards, prevcards));
				toSearchArray = toSearchArray.concat(checkZHADAN(mycards, prevcards));
				toSearchArray = toSearchArray.concat(checkZHADAN_W(mycards, prevcards));
			}else if(isLIANDUI(prevcards)){
				toSearchArray.push(checkLIANDUI_Condition(mycards, prevcards));
				toSearchArray.push(checkLIANDUI_Condition_W(mycards, prevcards));
				toSearchArray = toSearchArray.concat(checkZHADAN(mycards, prevcards));
				toSearchArray = toSearchArray.concat(checkZHADAN_W(mycards, prevcards));
			}else if(isZHADAN(prevcards)){ console.log("ZHADAN");
				toSearchArray = toSearchArray.concat(checkZHADAN_Condition(mycards, prevcards));
				toSearchArray = toSearchArray.concat(checkZHADAN_Condition_W(mycards, prevcards));
			}else if(isDANZHANG(prevcards)){ console.log("DANZHANG");
				toSearchArray = toSearchArray.concat(checkDANZHANG_Condition(mycards, prevcards));
				//toSearchArray = toSearchArray.concat(checkDANZHANG_Condition_W(mycards, prevcards));
				toSearchArray = toSearchArray.concat(checkZHADAN(mycards, prevcards));
				toSearchArray = toSearchArray.concat(checkZHADAN_W(mycards, prevcards));
			}
			
			var hasMeaningfulReason = false;
			if(toSearchArray.length > 0){
				for(k in toSearchArray){
					if(toSearchArray[k].length > 0){
						hasMeaningfulReason = true;
						break;
					}
				}
			}
			
			if(hasMeaningfulReason == false){
				//if(isLocal == true){
					buchu();
					return;
				//}
			}
			
		}
		toSearchCount = (toSearchCount+1) % toSearchArray.length;
	}
	if(toSearchArray.length == 0){
		return;// Should give a tishi
	}
	$('span.mycard').each(function(index) {
		var needToMove = 0;
		if(toSearchArray[toSearchCount].length == 0)
			return tishi();
		for(i in toSearchArray[toSearchCount]){
			if(index == toSearchArray[toSearchCount][i]){
				if($(this).css("height") == "117px"){
					needToMove = 1;
				}else{
					needToMove = -1;
				}
			}
		}
		if(needToMove == 1){
			$(this).animate({
				height: '137',
			}, 80);
		}else if(needToMove == 0 && $(this).css("height") == "137px"){
			$(this).animate({
				height: '117',
			}, 80);
		}
	});
	enableButton(3);
}

function buchu() 
{
	if(isLocal){
		buchu_local();
		return;
	}
	
	if(prevcards.length == 0){
		if( preState == 1 ){
			forceChupai();
		}
		
	}else{
		
		initmycards();
		lastPlayCards = [];
		displayPai(lastPlayCards);
		disableButton(0);
		chongxuan();
		hideAllButton();
		stopclock();
		resetTime(20);
		sendBuchu();
	}
	
	/**
	 * 本段代码可忽略，但先不要删除 $('#buttonmenu').animate({ opacity: 0, }, 0, function() 
	 * {
	 * $("#buttonmenu").animate({ opacity: 0, }, 2000, function() {
	 * enableButton(0); disableButton(3); $("#buttonmenu").animate({ opacity:
	 * 100, }, 0); }); } );
	 */
}

function checkChupaiButton() 
{
	var needdisable = 1;
	$('span.mycard').each(function(index) 
	  {
		if ($(this).css("height") == "137px") 
		{
			enableButton(3);
			needdisable = 0;
			return;
		}
	});
	if (needdisable) 
	{
		disableButton(3);
	}
}

function boom() 
 {
	$("#boom").show();
	$("#sound").html("<audio autoplay=\"autoplay\"><source src=\"sound/cardtype_bomb.ogg\" type=\"audio/ogg\"></audio>");
	animate("#boom", "animte_bomb", 1, 15, 80);
}

function animate(div, picname, count, totlecount, interval) 
 {
	if (count < totlecount) {
		var innerHTML = "<span style=\"display:inline-block; position:fixed; left:0; right:0; top:60px; bottom:60px; background:url(js/images/animation/"
				+ picname
				+ ((count > 9) ? count : ("0" + count))
				+ ".png) center no-repeat; \"></span>";
		// alert(innerHTML);
		$(div).html(innerHTML);
		$(div).animate
		({
			opacity : 100,
		 }, interval, function() 
		  {
			animate(div, picname, count + 1, totlecount, interval);
		});
	} else {
		$("#boom").hide();
	}
}

function ramdomAddCards() 
 {
	if (mycards.length >= 6)
		return;
	var toadd = Math.floor(Math.random() * 54) + 1;
	for (i in mycards) {
		if (mycards[i] == toadd) 
		{
			ramdomAddCards();
			return;
		}
	}
	mycards = insertCards(mycards, toadd);
	initmycards();
}

// var SEVER="http://172.16.1.127:8080";
function login() {
	if ($("#username").val() == "") 
	{
		alert("请输入用户名");
		return false;
	}
	if ($("#password").val() == "") 
	{
		alert("请输入密码");
		return false;
	}
	$('#loadinglogin').css("display","block");

	//alert($('#checkbox-0').attr("checked"));
	
	//Store
	if(typeof(android) != "undefined"){
		if($('#checkbox-0').attr("checked") == "checked"){
			//alert("true");
			android.setProperty("username", $("#username").val());
			android.setProperty("password", $("#password").val());
			android.setProperty("isRemember", "1");
			//alert(android.getProperty("username") + ", " + android.getProperty("password") + ", " + android.getProperty("isRemember"));
		}else{
			android.setProperty("isRemember", "0");
			//alert(android.getProperty("isRemember"));
		}
	}
	
	$.getJSON(server_ip + "UserLogin?callback=?",

	{
		username : $("#username").val(),
		password : $("#password").val(),
		type : 1
	}, function(data) 
	{
		if (data.resCode == 0) 
		{
			isLocal = false;
			token = data.token;
			userInfo = data.userInfo;
			var avatarId = data.userInfo.avatarId;
			$('#username_two').html(data.userInfo.niname);
			$('#score_two').html(data.userInfo.score);
			$('#username_one').html("昵称：" + data.userInfo.niname);
			$('#score_one').html("资产：$" + data.userInfo.score);
			$('#user_icon_one').html(
					"<img src=\"js/images/head/head"
							+ ((avatarId < 10) ? ("0" + avatarId) : avatarId)
							+ ".png\" width=\"50\" />");
			if(typeof(android) != "undefined" && $('#checkbox-0').attr("checked") == "checked"){
				android.setProperty("userniname", data.userInfo.niname);
				android.setProperty("avatarId", data.userInfo.avatarId);
				android.setProperty("online_score", data.userInfo.score);
				//alert(android.getProperty("userniname") + ", " + android.getProperty("avatarId") + ", " + android.getProperty("online_score"));
			}			
			
			$('#loadinglogin').css("display","none");
			$('#loginwindow').css("display","none");
			$('#backtable').show(0);
			gotopage_two();
			getRoomInfo();
		} else 
		{
			alert("您输入的用户名密码有误或此用户不存在。");
			$('#loadinglogin').css("display","none");
			return false;
		}
	});
	return true;
}

function logout(){
	if( userInfo != "" && userInfo != null ){
		$.getJSON(server_ip + "UserLogout?callback=?",

		{
			uid : userInfo.uid,
			token : token,
			type : 2
		}, function(data) 
		  {
		  	reset();
		  }
		);
	}

	gotopage_one();
}

function reset(){
	stopclock();
	resetTime(20);
	currentState = 0;
	timeStamp = 0;
	currentRoomId = -1;
	userInfo = "";
	token = "";
}

function backtoFront(rescode)
{
	reset();
	if( rescode == -3 ){
		alert("您的账号可能在其他地方登陆，您已经被强制离线");
	}else{
		alert("您已经与服务器断开连接，请重新登陆");
	}
	
	gotopage_one();
	return;
}

function getRoomInfo() 
{
	if (token == "") 
	{
		alert("您当前状态为未登录，请先登陆游戏！");
		gotopage_one();
		return;
	}
	
	currentRoomId = -1;
	
	$('#loadingroominfo').css("display","block");
	// $.getJSON("http://172.16.1.127:8080/HS/test/GetRoomInfo?callback=?",
	$.getJSON(server_ip + "GetRoomInfo?callback=?",

	{
		userId : userInfo.uid,
		token : token,
		type : 3
	}, function(data) 
	  {
	  	$('#loadingroominfo').css("display","none");
	  	
	  	var res = Number(data.resCode);
	  	
		if( res == -3 || res == -4 ){
	  		backtoFront(res);
	  		return;
	  	}
	  	
		if (res == 0) 
		{
			var innerHTML = "";
			for (i in data.roomList) 
			{
				innerHTML += "<li><span class=\"ui-li-id\">"
						+ data.roomList[i].rid;
				innerHTML += "</span><a href=\"#\" onclick=\"joinInGame("
						+ data.roomList[i].rid + ");\">"
						+ data.roomList[i].roomName;
				innerHTML += "<span class=\"ui-li-creator\">"
						+ data.roomList[i].createName;
				innerHTML += "</span><span class=\"ui-li-count\">"
						+ data.roomList[i].currentCount + "/3</span></a></li>"
			}
			$('#roomList').html(innerHTML);
			$('#roomList').listview('refresh');
			$('#username_two').html(data.self.niname);
			$('#score_two').html(data.self.score);
			//room_loaded();
			setTimeout(room_loaded, 500);
			
		} else 
		 {
			alert("获取房间列表失败，请稍候再试！");
		 }
	});
	return true;
}

function creatRoom() 
 {
	if (token == "")  
	 {
		alert("您当前状态为未登录，请先登陆游戏！");
		gotopage_one();
		return;
	}
	if ($("#roomname").val() == "") 
	{
		alert("请输入房间名称！");
		return;
	}

	// alert($("#roomname").val());
	$('#loadingroominfo').css("display","block");
	// CreateRoomInfo?type=4&token=78d7c325e6ea326d9c1a5c5b1172a59d&roomName=test&userId=3
	$.getJSON(server_ip + "CreateRoomInfo?callback=?", {
		token : token,
		type : 4,
		roomName : encodeURI($("#roomname").val()),
		userId : userInfo.uid
	}, function(data) 
	{
		$('#loadingroominfo').fadeOut(200);
	  	var res = Number(data.resCode);
	  	
		if( res == -3 || res == -4 ){
	  		backtoFront(res);
	  		return;
	  	}
	    	
		 if (res == 0)
		  {
			currentRoomId = data.room.rid;
			$('#newroomwindow').css("display","none");
			
			initOnlineGame();
		} else if( res == 3 )
		 {
			alert("房间名已经被使用，请更换房间名称");
		
		 }else{
		 	alert("创建获取房间失败，请重试！");
		 }
	});
	return true;
}

function joinInGame(rid) 
 {
	if (token == "") 
	{
		alert("您当前状态为未登录，请先登陆游戏！");
		gotopage_one();
		return;
	}
	
	if (rid == "" ) 
	 {
		alert("请重新选择游戏房间！");
		gotopage_two();
		return;
	 }
	 
	 console.log("join game");
	$('#loadingroominfo').css("display","block");
	// updateGameState?type=5&token=69a9cd6bceaaaf2f6df6806f829d5ea2&roomId=20&sendUid=1
	$.getJSON(server_ip + "UpdateGameState?callback=?", 
	 {
		token : token,
		type : 5,
		roomId : rid,
		sendUid : userInfo.uid
	 }, function(data) 
	  {
	  	$('#loadingroominfo').css("display","none");
	  	var res = Number(data.resCode);
	  	
		if( res == -3 || res == -4 ){
	  		backtoFront(res);
	  		return;
	  	}
	  	
		if (res == 0) 
		{
			currentRoomId = rid;
			initOnlineGame();
			
		} else 
		 {
			alert("暂时无法进入该房间，请重新选择！");
		 }
	});
}

function quickGame() 
 {
	if (token == "") 
	{
		alert("您当前状态为未登录，请先登陆游戏！");
		gotopage_one();
		return;
	}

	$('#loadingroominfo').css("display","block");
	// updateGameState?type=5&token=69a9cd6bceaaaf2f6df6806f829d5ea2&roomId=20&sendUid=1
	$.getJSON(server_ip + "QuickGame?callback=?", 
	 {
		token : token,
		type : 12,
		sendUid : userInfo.uid
	 }, function(data) 
	  {
	  	$('#loadingroominfo').css("display","none");
	  	var res = Number(data.resCode);
	  	
		if( res == -3 || res == -4 ){
	  		backtoFront(res);
	  		return;
	  	}
	  	
		if (res == 0) 
		{
			currentRoomId = data.gameInfo.rid;
			initOnlineGame();
			
		} else 
		 {
			alert("暂时无法进入该房间，请重新选择！");
		 }
	});
}

function leaveWarning(){
	if( currentState == 1 ){
		$('#warningwindow').fadeIn(100);
		return;
	}
	
	leaveTheGame();
	
}

function leaveTheGame()
 {
	$('#warningwindow').css("display","none");
 	
 	if(isLocal){
 		leaveTheGame_local();
 		return;
 	}
	if (token == "") 
	{
		alert("您当前状态为未登录，请先登陆游戏！");
		gotopage_one();
		return;
	}
	if( currentRoomId == -1 ){
		gotopage_two();
		return;
	}
	
	// $('#loadingleaveroom').css("display","block");
	var rid = currentRoomId;
	currentRoomId = -1;
	currentState = 0;
	timeStamp = 0;
	stopclock();
	resetTime(20);
	// type=7&token=69a9cd6bceaaaf2f6df6806f829d5ea2&roomId=20&sendUid=1
	$.getJSON(server_ip + "UpdateGameState?callback=?", 
	 {
		type : 7,
		token : token,
		roomId : rid,
		sendUid : userInfo.uid
	    }, function(data) 
	     {
	     	// $('#loadingroominfo').css("display","none");
	    var res = Number(data.resCode);
	  	
		if( res == -3 || res == -4 ){
	  		backtoFront(res);
	  		return;
	  	}
	  	
		    // if (res != 0){
				// alert("退出失败，请稍后重试。");
		 	// }
	});
	
	gotopage_two();
	//setTimeout(getRoomInfo, 500);
}

function finishGame()  
{

}

function initOnlineGame() 
{
	$('#game_over').css("display", "none");
	
	gotopage_three();
	prevcards = [];
	mycards = [];
	initmycards();
	// order[0] = userInfo.uid;
	// for( i =1; i< 3; i++ ){
		// order[i] = -1;
	// }
	
	$('#loadingroominfo').css("display", "none");
	$("#buttonmenu").css("display", "none");
	$("#clock").css("display", "none");
	$("#imready").css("display", "none");

	$("#readybuttonmenu").css("display", "block");
	$("#cards_left").html("");
	$("#cards_right").html("");
	$("#roomNameDis").html("");
	$("#mycard_small").html("");
	$("#startbuttonmenu").css("display", "none");
	
	timeStamp = 0;
	currentState = 0;
	defaultTime = 30;
	stopclock();
	resetTime();
	startclock();
	
	container_add("请在30秒之内\"准备\"游戏");
	$("#textContainer").fadeIn(200);
	setTimeout(SyncGameState, 800);

}

function sendReady() 
{
	if (token == "") 
	 {
		alert("您当前状态为未登录，请先登陆游戏！");
		gotopage_one();
		return;
	}
	if (currentRoomId == -1) 
	{
		return;
	}
	if (currentRoomId == 0) 
	{
		alert("请重新选择游戏房间！");
		gotopage_two();
		return;
	}
	
	$("#imready").css("display", "block");
	$("#readybuttonmenu").css("display", "none");
	defaultTime = 20;
	stopclock();
	resetTime();
	// updateGameState?type=6&token=69a9cd6bceaaaf2f6df6806f829d5ea2&roomId=20&sendUid=1
	// PlayState = 5/6 -> NotReady/Ready
	$.getJSON(server_ip + "UpdateGameState?callback=?", 
	{
		token : token,
		type : 6,
		roomId : currentRoomId,
		sendUid : userInfo.uid
	}, function(data) 
	{
		var res = Number(data.resCode);
	  	
		if( res == -3 || res == -4 ){
	  		backtoFront(res);
	  		return;
	  	}

		if (res != 0) 
		{
			alert("准备失败，请重试");
			$("#imready").css("display", "none");
			$("#readybuttonmenu").css("display", "block");
		}
	});
}
var char_money = "资产:";
var char_nike = "昵称:";
function SyncGameState() 
{
	$("#textContainer").fadeOut(200);
	
	if (currentRoomId == -1) 
	{
		return;
	} else if (currentRoomId == 0) 
	{
		alert("请重新选择游戏房间！");
		gotopage_two();
		return;
	}
	
	if (token == "") 
	{
		alert("您当前状态为未登录，请先登陆游戏！");
		gotopage_one();
		return;
	}


	//alert("test");
	// SyncGameState?type=11&token=445b5ae4057b4b368aa6586f6cdfdd8a&roomId=20&sendUid=4
	$.getJSON(
		server_ip + "SyncGameState?callback=?",
		{
			token : token,
			type : 11,
			roomId : currentRoomId,
			timestamp : timeStamp,
			sendUid : userInfo.uid
		},
		function(data) 
		 {
		 	
		 	if( currentRoomId == -1 ){
	  			return;
	  		}
	  		
		 	var res = Number(data.resCode);

			if( res == -3 || res == -4 ){
		  		backtoFront(res);
		  		return;
		  	}
	  	
	  		if( res == 2 ){
	  			currentRoomId = -1;
	  			stopclock();
	  			resetTime();
	  			gotopage_two();
	  			setTimer(alert("准备时间过久，您已经被强制离开房间"), 1000);
	  			
				//getRoomInfo();
	  			return;
	  		}
	  		
			if (res == 0) 
			{
				// 游戏尚未开始
				if (data.gameInfo == null) 
				{
					return;
				}

				timeStamp = data.gameInfo.timeStamp;
				updateUI(data);
				
				if( data.gameInfo.state == 0 ) {
				
				}else if (data.gameInfo.state == 1){
					defaultTime = 20;
					for( i in data.gameInfo.playInfo ){
						currentScore[i] = data.gameInfo.playInfo[i].score;
					}
					displayScore = false;
				}else if( data.gameInfo.state == 2 ){
				//end of game
				}
				
				// if( prePlayState == 10 ){
					// prePlayState = 0;
				// }
			}else{
				return;
			}

			preState = data.gameInfo.state;
		});
	if (currentRoomId > 0)
		setTimeout(SyncGameState, intervalTime);
}

function hidePlayerUI(index){
		switch (index) {
					// case 0:
						// $("#myavatar").css("display","none");
						// $("#money_Me").css("display","none");
						// $("#nike_Me").css("display", "none");
						// $("#cardnum_Me").css("display","none");
						// break;
			case 1:
						$("#rightavatar").css("display","none");
						$("#money_Right").css("display","none");
						$("#nike_Right").css("display","none");
						$("#cardnum_Right").css("display","none");
						$("#cards_right").html("<img src='js/images/waiting_user.png' />");
						break;
			case 2:
						$("#leftavatar").css("display","none");
						$("#money_Left").css("display","none");
						$("#nike_Left").css("display","none");
						$("#cardnum_Left").css("display","none");
						$("#cards_left").html("<img src='js/images/waiting_user.png' />");
						break;
		}
}

function resetUi4NextGame(){
	$("#cardnum_Me").css("display", "none");
	$("#cardnum_Right").css("display", "none");
	$("#cardnum_Left").css("display", "none");
	
	$("#cards_right").css("display", "none");
	$("#cards_left").css("display", "none");
	mycards = [];
	lastPlayCards = [];
	initmycards();
	
	$("#mycard_small").html("");
	
	$('#imready').css("display", "none");
	$("#readybuttonmenu").css("display", "block");
	
	$.getJSON(
			server_ip + "ConfirmOneGame?callback=?",
			{
				token : token,
				type : 15,
				roomId : currentRoomId,
				sendUid : userInfo.uid
				},
			function(data) 
			{
				var res = Number(data.resCode);
	  	
				if( res == -3 || res == -4 ){
			  		backtoFront(res);
			  		return;
			  	}
			}
	);
		
	timeStamp--;
	
	defaultTime = 30;
	stopclock();
	resetTime();
	startclock();
	
	container_add("请在30秒之内\"准备\"游戏");
	$("#textContainer").fadeIn(200);
	setTimeout(SyncGameState, 1000);
}

function updateUI(data){
	if( data == null || data.gameInfo == null ){
		return;
	}
	
	var mypos = -1;
	var ui_index = 0;
	var innerStr = "";
	var state = data.gameInfo.state;
	var prePlayerIndex = -1;
	var myorderIndex = -1;
	var handleOrderIndex = -1;
	currentState = state;
	for (i in data.gameInfo.playInfo) 
	{
		if (data.gameInfo.playInfo[i].uid == userInfo.uid) 
		{
			mypos = i;
		}
		
		if( data.gameInfo.playInfo[i].uid == data.gameInfo.lastPlayId ){
			prevcards = data.gameInfo.playInfo[i].currentPlayCard;
			prePlayerIndex = i;
		}
	}

	if( data.gameInfo.restCardsNum != undefined && state == 1 ){
		$('#allCards_left_count').html("剩余" + (data.gameInfo.restCardsNum) + "张牌");
		$('#allCards_left_count').css("display","block");
	}else{
		$('#allCards_left_count').html("");
		$('#allCards_left_count').css("display","none");
	}
	
	if( prePlayerIndex == -1 || prePlayerIndex == mypos ){
		prevcards = [];
	}
			
	console.log("prevcards: ", prevcards);
	$("#roomNameDis").html("<span>"+data.gameInfo.roomName+"</span>");
	
	if( state == 1 && preState == 0 )
	{
		$('#start_game_message').fadeIn(800);
		$('#start_game_message').fadeOut(1000);
		$("#cards_right").css("display", "none");
		$("#cards_left").css("display", "none");
	}
	
	for( i = 0; i< 3; i++ ){
		if( data.gameInfo.orders[i] == userInfo.uid ){
			myorderIndex = i;
		}
	}
	
	handleOrderIndex = myorderIndex;
	
	if( state == 1 ){
		stopclock();
		resetTime();
	}

	
	if( displayScore == false &&  state == 2 ){
		//end game
		//display end game ui
		console.log("end game");
		var scores = [];
		if( data.gameInfo.playInfo.length != 3 ){
			for( k in data.gameInfo.playInfo){
				scores[k] = 0;
			}
		}else{
			for( k in data.gameInfo.playInfo ){
				scores[k] = data.gameInfo.playInfo[k].score - currentScore[k];
			}
		}
		
		hideAllButton();
		resetTime(20);
		game_over_dis(data.gameInfo.playInfo, scores);
		displayScore = true;
		return;
	}
			
	for (var i = 0; i< 3; i++) 
	{
		innerStr = "";
		var uid = data.gameInfo.orders[handleOrderIndex];
		handleOrderIndex = ( handleOrderIndex + 1 ) % 3;
		
		console.log("order uid and i: ", uid, i );
		
		// var uid = order[i];
		if( uid == -1 ){
			hidePlayerUI(i);
			continue;
		}
		
		var player = null;
		
		for( j in data.gameInfo.playInfo ){
			if(data.gameInfo.playInfo[j].uid == uid ){
				player = data.gameInfo.playInfo[j];
				break;
			}
			
		}
		
		if( player == null ){
			console.error("player is null ", uid);
			return;
		}
		
		var avatarId = player.userInfo.avatarId;

		// if( player.uid == data.gameInfo.lastPlayId ){
			// lastCards = player.currentPlayCard;
		// }
		
		switch (i) 
		{
			case 0:
				var nike = document.getElementById("nike_Me");
				var money = document.getElementById("money_Me");
				var text;
				$("#myavatar").css("display", "block");
				$("#money_Me").css("display", "block");
				$("#nike_Me").css("display", "block");
				$("#cardnum_Me").css("display", "none");
				$("#myavatar").css({"background-image" : "url(js/images/head/head"+ ((avatarId < 10) ? ("0" + avatarId): avatarId)+ ".png)"});

				var text = nike.childNodes[0];
				text.nodeValue = char_nike+ player.userInfo.niname;
				text = money.childNodes[0];
				text.nodeValue = char_money+ player.userInfo.score;
				
				if( state == 0 ){
					if (player.playState == 5){
						$('#imready').css("display", "none");
					}else if( player.playState == 6 ){
						$('#imready').css("display", "block");
						
					}
				}else if( state == 1 ){
					//handsCard
					var cards = player.handsCard;
					if( cards == null || mycards.length != cards.length ){
						mycards = [];
						
						if( cards != null ){
							for( j in cards )
							{
								mycards = insertCards(mycards, cards[j]);
								
							}
						}
						
						initmycards();
					}
				
					$('#imready').css("display", "none");
					$("#cardnum_Me").css("display", "block");
					$("#cardnum_Me").html("<span style=\"display: inline-block; height: 20px; width: 18px;\"><img src=\"js/images/card_back.png\" width=\"21\" /></span><span style=\"display: inline-block; height: 20px; width: 15px;\"><img src=\"js/images/score_add_"+player.handsCardCount+".png\" /></span>");
					if( data.gameInfo.currentPlayId == player.userInfo.uid )
					{					
						$("#mycard_small").html("");
						showAllButton();
						resetTime();
						timer = setInterval("second(hideAllButton)", 1000);
						
						disableButton(3);
					}
					
					else
					{
						hideAllButton();
						
						if( player.op == 1 ){
							console.log("op: ", player.op);
							displayPai(null);
						}else if( player.op == 2 ){
							if( player.currentPlayCard == null || player.currentPlayCard.length != lastPlayCards.length ){
								displayPai(player.currentPlayCard);
							}
							
						}else{
							console.log("op: ", player.op);
							$("#mycard_small").css("display", "none");
						
						}
					}
				}else if( state == 3 ){
					$('#imready').css("display", "none");
					$("#cardnum_Me").css("display", "block");
					$("#cardnum_Me").html("<span style=\"display: inline-block; height: 20px; width: 18px;\"><img src=\"js/images/card_back.png\" width=\"21\" /></span><span style=\"display: inline-block; height: 20px; width: 15px;\"><img src=\"js/images/score_add_"+player.handsCardCount+".png\" /></span>");
						hideAllButton();
						
						if( data.gameInfo.lastPlayId == player.userInfo.uid ){
							$('#mycards').html("");
						}
						
						if( player.op == 1 ){
							console.log("op: ", player.op);
							displayPai(null);
						}else if( player.op == -1 ){
							console.log("op -1: ", player.op);
							$("#mycard_small").css("display", "none");
						}else if( player.op == 2 ){
							if( player.currentPlayCard == null || player.currentPlayCard.length != lastPlayCards.length ){
								displayPai(player.currentPlayCard);
							}
						}
				}

				break;
				case 1:
					var nike = document.getElementById("nike_Right");
					var money = document.getElementById("money_Right");
					var text;
					$("#rightavatar").css("display", "inline-block");
					$("#money_Right").css("display", "inline-block");
					$("#nike_Right").css("display", "inline-block");
					$("#cardnum_Right").css("display", "none");
					$("#rightavatar").css({"background-image" : "url(js/images/head/head"+ ((avatarId < 10) ? ("0" + avatarId): avatarId)+ ".png)"});
					
					
					var text = nike.childNodes[0];
					text.nodeValue = char_nike+ player.userInfo.niname;
					text = money.childNodes[0];
					text.nodeValue = char_money+ player.userInfo.score;

					
					if (player.playState == 5){
						$("#cards_right").html("<img src='js/images/waiting_user.png' />");
						$("#cards_right").css("display", "none");
						console.log("right wait 5");
					}else if( player.playState == 6 ){
						$("#cards_right").html("<img src='js/images/prepare_user.png' />");
						$("#cards_right").css("display","block");
						console.log("right wait 6");
					}
					
					//playcards
					if( state == 1 ){
						$("#cardnum_Right").css("display", "block");
						$("#cardnum_Right").html("<span style=\"display: inline-block; height: 20px; width: 18px;\"><img src=\"js/images/card_back.png\" width=\"21\" /></span><span style=\"display: inline-block; height: 20px; width: 15px;\"><img src=\"js/images/score_add_"+player.handsCardCount+".png\" /></span>");
						
						$("#cards_right").css("display", "block");
						
						if( data.gameInfo.currentPlayId == player.userInfo.uid ){
							//the player
							$("#cards_right").html("<img src='js/images/waiting_user.png' />");
							startclock();
						}else{
							//display cards or eyes
							for (j in player.currentPlayCard ) 
							 {
								if(player.currentPlayCard[j] <= 54 && player.currentPlayCard[j] >= 0)
									innerStr += "<span style=\"display: inline-block; height:58px; width:18px; \"><img src=\"js/images/"
											+ getCardFileName(player.currentPlayCard[j])
											+ "\" width=\"40\"/></span>";
							}
							
							if (innerStr != ""){
								$("#cards_right").html(innerStr);
								$("#cards_right").animate( {opacity : 0,}, 0, function() 
								{
									$("#cards_right").animate({}, 100, function() {
										$("#cards_right").animate(
											{
												opacity : 100,
											}, 0, function() {
																	// Animation complete.
																
											});
										});
								});
							}else{
								
								if( player.op == 1 ){
									$("#cards_right").html("<img src='js/images/no_user.png'/>");
								}else if( player.op == -1 ){
									$("#cards_right").css("display", "none");
								}

							}
						}
						
					
					}else if( state == 3 ){
						$("#cardnum_Right").css("display", "block");
						$("#cardnum_Right").html("<span style=\"display: inline-block; height: 20px; width: 18px;\"><img src=\"js/images/card_back.png\" width=\"21\" /></span><span style=\"display: inline-block; height: 20px; width: 15px;\"><img src=\"js/images/score_add_"+player.handsCardCount+".png\" /></span>");
						
						$("#cards_right").css("display", "block");
						
						for (j in player.currentPlayCard ) 
						{
							if(player.currentPlayCard[j] <= 54 && player.currentPlayCard[j] >= 0)
								innerStr += "<span style=\"display: inline-block; height:58px; width:18px; \"><img src=\"js/images/"
										+ getCardFileName(player.currentPlayCard[j])
										+ "\" width=\"40\"/></span>";
						}
							
							if (innerStr != ""){
								$("#cards_right").html(innerStr);
								$("#cards_right").animate( {opacity : 0,}, 0, function() 
								{
									$("#cards_right").animate({}, 100, function() {
										$("#cards_right").animate(
											{
												opacity : 100,
											}, 0, function() {
																	// Animation complete.
																
											});
										});
								});
							}else{
								
								if( player.op == 1 ){
									$("#cards_right").html("<img src='js/images/no_user.png'/>");
								}else if( player.op == -1 ){
									$("#cards_right").css("display", "none");
								}

							}
					}

											
					break;
				case 2:
					var nike = document.getElementById("nike_Left");
					var money = document.getElementById("money_Left");
					var text;
					$("#leftavatar").css("display", "inline-block");
					$("#money_Left").css("display", "inline-block");
					$("#nike_Left").css("display", "inline-block");
					$("#cardnum_Left").css("display", "none");
					$("#leftavatar").css({"background-image" : "url(js/images/head/head"+ ((avatarId < 10) ? ("0" + avatarId): avatarId)+ ".png)"});
					
					
					var text = nike.childNodes[0];
					text.nodeValue = char_nike+ player.userInfo.niname;
					text = money.childNodes[0];
					text.nodeValue = char_money+ player.userInfo.score;

					
					if (player.playState == 5){
						$("#cards_left").html("<img src='js/images/waiting_user.png' />");
						$("#cards_left").css("display", "none");
					}else if( player.playState == 6 ){
						$("#cards_left").html("<img src='js/images/prepare_user.png' />");
						$("#cards_left").css("display","block");
					}
					
					//playcards
					if( state == 1 ){
						$("#cardnum_Left").css("display", "block");
						$("#cardnum_Left").html("<span style=\"display: inline-block; height: 20px; width: 18px;\"><img src=\"js/images/card_back.png\" width=\"21\" /></span><span style=\"display: inline-block; height: 20px; width: 15px;\"><img src=\"js/images/score_add_"+player.handsCardCount+".png\" /></span>");
						
						$("#cards_left").css("display", "block");
						
						if( data.gameInfo.currentPlayId == player.userInfo.uid ){
							$("#cards_left").html("<img src='js/images/waiting_user.png' />");
							startclock();
						}else{
							 for (j in player.currentPlayCard ) 
							 {
								if(player.currentPlayCard[j] <= 54 && player.currentPlayCard[j] >= 0)
									innerStr += "<span style=\"display: inline-block; height:58px; width:18px; \"><img src=\"js/images/"
											+ getCardFileName(player.currentPlayCard[j])
											+ "\" width=\"40\"/></span>";
							}
							
							// if(player.currentPlayCard.length > 0){
								// prevcards = player.currentPlayCard;
								// console.log("left:" + prevcards);
								// // alert(player.userInfo.niname + ": prevcards: " + prevcards);
							// }
							
							if (innerStr != ""){
								$("#cards_left").html(innerStr);
								$("#cards_left").animate( {opacity : 0,}, 0, function() 
								{
									$("#cards_left").animate({}, 100, function() {
										$("#cards_left").animate(
											{
												opacity : 100,
											}, 0, function() {
												// Animation complete.
																
											});
										});
								});
							}else{
								if( player.op == 1 ){
									$("#cards_left").html("<img src='js/images/no_user.png'/>");
								}else if( player.op == -1 ){
									$("#cards_left").css("display", "none");
								}
								
							}
						}
					}else if( state == 3 ){
							for (j in player.currentPlayCard ) 
							 {
								if(player.currentPlayCard[j] <= 54 && player.currentPlayCard[j] >= 0)
									innerStr += "<span style=\"display: inline-block; height:58px; width:18px; \"><img src=\"js/images/"
											+ getCardFileName(player.currentPlayCard[j])
											+ "\" width=\"40\"/></span>";
							}
							
							// if(player.currentPlayCard.length > 0){
								// prevcards = player.currentPlayCard;
								// console.log("left:" + prevcards);
								// // alert(player.userInfo.niname + ": prevcards: " + prevcards);
							// }
							
							if (innerStr != ""){
								$("#cards_left").html(innerStr);
								$("#cards_left").animate( {opacity : 0,}, 0, function() 
								{
									$("#cards_left").animate({}, 100, function() {
										$("#cards_left").animate(
											{
												opacity : 100,
											}, 0, function() {
												// Animation complete.
																
											});
										});
								});
							}else{
								if( player.op == 1 ){
									$("#cards_left").html("<img src='js/images/no_user.png'/>");
								}else if( player.op == -1 ){
									$("#cards_left").css("display", "none");
								}
								
							}
					}
				
					break;
			}
		}
}
							
	

function sendChupai(playcards)
{
	console.log("playcards: ", playcards);
		$.getJSON(
			server_ip + "UpdatePlayState?callback=?",
			{
				token : token,
				type : 8,
				roomId : currentRoomId,
				playCard : playcards,
				sendUid : userInfo.uid
				},
			function(data) 
			{
				var res = Number(data.resCode);
	  	
				if( res == -3 || res == -4 ){
			  		backtoFront(res);
			  		return;
			  	}
	  	
				if (res == 0) 
				{
					
					console.log("send cards succ: ", data.resCode);
					
					
					prevcards = [];
					console.log("Me: " + prevcards);
					// alert("ME: prevcards: " + prevcards);
					
					if (data.gameInfo == null) 
					{
						return;
					}
					
					timeStamp = data.gameInfo.timeStamp;
					updateUI(data);
					

					prevcards = [];
				}
				else
				{
					alert("操作失败！");
				}
			}
		);	
}

function sendBuchu()
{
		$.getJSON(
					server_ip + "UpdatePlayState?callback=?",
					{
						token : token,
						type : 9,
						roomId : currentRoomId,
						sendUid : userInfo.uid
						},
					function(data) 
					{
						var res = Number(data.resCode);
	  	
						if( res == -3 || res == -4 ){
					  		backtoFront(res);
					  		return;
					  	}
					  	
						if (res == 0) 
						{
							
							console.log("suspend cards succ: ", data.resCode);
							if (data.gameInfo == null) 
							{
								return;
							}
							
							timeStamp = data.gameInfo.timeStamp;
							
							updateUI(data);
						}
						else
						{
							alert("操作失败！");
						}
					}
			);	
}

function UserReg() 
{
	if ($("#Newname").val() == "")
	{
		alert("用户名不能为空");
		return false;
	}
	if (/^\d.*$/.test($("#Newname").val())) 
	{
		alert("用户名不能以数字开头");
		return false;
	}
	if ($("#Newname").val().length < 2 || $("#Newname").val().length > 20) 
	{
		alert("用户名合法长度为2-20个字符");
		return false;
	}
	if (!/^\w+$/.test($("#Newname").val())) 
	{
		alert("用户名只能包含_,英文字母，数字");
		return false;
	}
	if (!/^([a-z]|[A-Z])[0-9a-zA-Z_]+$/.test($("#Newname").val()))
	{
		alert("用户名只能英文字母开头");
		return false;
	}
	if ($("#Newpassword").val() == "") 
	{
		alert("请输入密码");
		return false;
	}
	if (!/^\w+$/.test($("#Newpassword").val()) || !/^\w+$/.test($("#Confirmpassword").val()) ) 
	{
		alert("密码只能包含_,英文字母，数字");
		return false;
	}
	
	if ($("#Confirmpassword").val() == "") 
	{
		window.alert("请输入确认密码");
		return false;
	}
	if ($("#Newpassword").val() != $("#Confirmpassword").val()) 
	{
		window.alert("您输入的新密码与确认密码不一致");
		return false;
	}
	
	
	if( regAvatarId == 0 || regAvatarId.length < 5 ){
		window.alert("请选择头像");
		return false;
	}
	
	var aid = Number(regAvatarId.substring(4));
	//$.getJSON("http://172.16.1.127:8080/HS/UserReg?callback=?",

	$('#loadingreg').css("display","block");
	
	$.getJSON(server_ip + "UserReg?callback=?", {
		type : 2,
		username : $("#Newname").val(),
		password : $("#Newpassword").val(),
		niname : encodeURI($('#Nickname').val()),
		avatarId : aid
	}, function(data) 
	{
		$('#loadingreg').css("display","none");
		if (data.resCode == 0) 
		{
			token = data.token;
			gotopage_popup();
			//$('#Registrationwindow').css("display","none");
			//$('#popup').fadeIn(200);
		} 
		else 
		{
			alert("您注册的用户名已被注册。");
			// $('#Registrationwindow').fadeOut(200);
			return false;
		}
	});
	return true;
}

function second(callbackFunction) 
{
	//if(s<0){m-=1 ;s=59;}
	//if(m<0){h-=1;m=59;}
	t = "剩余" + restTime + "秒";
	document.getElementById("showtime").value = t;
	restTime -= 1;
	if (t == "剩余0秒") {
		clearInterval(timer);
		if (callbackFunction != undefined)
			callbackFunction();
		restTime = defaultTime;
		buchu();
		//$.mobile.changePage($('#three'),{transition: 'fade'},true,true);
		return;
	}
}

function secondNoFunc(){
	t = "剩余" + restTime + "秒";
	document.getElementById("showtime").value = t;
	restTime -= 1;
	if (t == "剩余0秒") {
		clearInterval(timer);
		restTime = defaultTime;
		//$.mobile.changePage($('#three'),{transition: 'fade'},true,true);
		return;
	}
}

function resetTime() 
{
	clearInterval(timer);
	t = "剩余" + defaultTime + "秒";
	restTime = defaultTime;
	document.getElementById("showtime").value = t;
}
function startclock() 
{
	timer = setInterval("secondNoFunc()", 1000);
}
function pauseclock() 
{
	clearInterval(timer);
}
function stopclock() 
{
	clearInterval(timer);
	s = defaultTime;
}

/*function zhuce(){//用于登录成功的测试
	$.mobile.changePage($('#popup'), 
	{
		transition : 'fade'
	}, true, true);
	$('#popup').fadeIn(200);
	return false;
}*/
function goback() 
{
	window.history.back();
}
function Headclick(objthis) 
{
	return_to_register_from_chooseavatar();
	document.getElementById("usericon").src = objthis.src;
	// document.getElementById("usericon1").src = objthis.src;
	regAvatarId = objthis.id;
}

function updatemyscore(myscore){
	if(typeof(android) != "undefined"){
		android.setProperty("online_score", myscore);
	}
	$('#score_one').html("资产：$" + myscore + "");
	$('#score_two').html(myscore);
}

function prepareLogin(){
	if(typeof(android) != "undefined"){
		if( android.isNetWorkRun() != 0 ){
			alert("当前网络连接不可用，无法联网游戏");
			return;
		}
	}
	
	show_login();
}
