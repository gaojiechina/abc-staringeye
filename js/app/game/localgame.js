/**
 * @author DELL
 */

var allCards = [];
var leftcards = [];
var rightcards = [];
var prevPlayer = 0; //0 for me, 1 for right, 2 for left
var prevWinner = 0;

var user_score_local = 1000;
var lplayer_score_local = 1000;
var rplayer_score_local = 1000;

var zhadan_count = 1;

function initLocalGame(){
	isLocal = true;
	prevcards = [];
	mycards = [];
	allCards = [];
	leftcards = [];
	rightcards = [];
	prevPlayer = 0;
	calcCardLeftNum();
	$('#game_over').css("display", "none");
	
	gotopage_three();
	
	$('#allCards_left_count').html("");
	$('#loadingroominfo').css("display", "none");
	$("#buttonmenu").css("display", "none");
	$("#clock").css("display", "none");
	$("#imready").css("display", "none");
	$("#leftavatar").css("display", "block");
	$("#rightavatar").css("display", "block");
	$("#leftavatar").css("background-image", "url(js/images/peasant_lord_r.png)");
	$("#rightavatar").css("background-image", "url(js/images/peasant_lord_r.png)");
	$("#playInfo_Left").css("display", "block");
	$("#playInfo_Rigth").css("display", "block");
	$("#cardnum_Left").css("display", "block");
	$("#cardnum_Right").css("display", "block");
	$("#cardnum_Me").css("display", "block");
	$("#nike_Left").css("display", "block");
	$("#nike_Left").html("昵称：左侧电脑");
	$("#money_Left").css("display", "block");
	$("#nike_Right").css("display", "block");
	$("#nike_Right").html("昵称：右侧电脑");
	$("#money_Right").css("display", "block");
	
	$("#readybuttonmenu").css("display", "none");
	$("#startbuttonmenu").css("display", "block");
	$("#cards_left").css("display", "block");
	$("#cards_right").css("display", "block");
	$("#cards_left").html("");
	$("#cards_right").html("");
	$("#roomNameDis").html("");
	$("#mycards").html("");
	$("#mycard_small").html("");
	$("#showtime").val("单机模式");
	resetLocalScore();
}

function refreshLocalGame(){
	prevcards = [];
	mycards = [];
	allCards = [];
	leftcards = [];
	rightcards = [];
	prevPlayer = 0;
	calcCardLeftNum();
	zhadan_count = 1;
	
	$('#allCards_left_count').html("");
	$('#loadingroominfo').css("display", "none");
	$("#buttonmenu").css("display", "none");
	$("#clock").css("display", "none");
	$("#imready").css("display", "none");

	$("#readybuttonmenu").css("display", "none");
	$("#startbuttonmenu").css("display", "block");
	$("#cards_left").html("");
	$("#cards_right").html("");
	$("#roomNameDis").html("");
	$("#mycards").html("");
	$("#mycard_small").html("");
	
	isLocal = true;
	
}

function initAllCards(){
	allCards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54];
	allCards = Shuffle(allCards);
	// alert(allCards);
}

function Shuffle(ary)
{
    for ( var i=ary.length-1 ; i >= 0 ; i-- )
    {
         var v = parseInt(Math.random()*(i+1));
         var tmp = ary[v];
         ary[v] = ary[i];
         ary[i] = tmp;   
    }
    return ary; 
}

function startLocalGame(){
	initAllCards();
	
	for(i = 0; i < 5; i++){
		mycards = insertCards(mycards, allCards[i]);
	}
	for(i = 5; i < 10; i++){
		leftcards = insertCards(leftcards, allCards[i]);
	}
	for(i = 10; i < 15; i++){
		rightcards = insertCards(rightcards, allCards[i]);
	}
	
	allCards = allCards.slice(15, 54);
	
	initmycards();
	calcCardLeftNum();
	
	$("#startbuttonmenu").css("display", "none");
	
	if(prevWinner == 0){
		enableButton();
		disableButton(1);
		showAllButton();
		userPlayer();
	}else if(prevWinner == 1){
		prevPlayer = 1;
		setTimeout(rightPlayerAI, 300);
	}else if(prevWinner == 2){
		prevPlayer = 2;
		setTimeout(leftPlayerAI, 300);
	}
	
	// alert(mycards);
	// alert(leftcards);
	// alert(rightcards);
}

function leaveTheGame_local(){
	isLocal = false;
	gotopage_one();
}

function calcCardLeftNum(){
	$("#cardnum_Me").html("<span style=\"display: inline-block; height: 20px; width: 18px;\"><img src=\"js/images/card_back.png\" width=\"21\" /></span><span style=\"display: inline-block; height: 20px; width: 15px;\"><img src=\"js/images/score_add_"+mycards.length+".png\" /></span>");
	$("#cardnum_Left").html("<span style=\"display: inline-block; height: 20px; width: 18px;\"><img src=\"js/images/card_back.png\" width=\"21\" /></span><span style=\"display: inline-block; height: 20px; width: 15px;\"><img src=\"js/images/score_add_"+leftcards.length+".png\" /></span>");
	$("#cardnum_Right").html("<span style=\"display: inline-block; height: 20px; width: 18px;\"><img src=\"js/images/card_back.png\" width=\"21\" /></span><span style=\"display: inline-block; height: 20px; width: 15px;\"><img src=\"js/images/score_add_"+rightcards.length+".png\" /></span>");
	
	if(mycards.length == 0 || leftcards.length == 0 || rightcards.length == 0 )
		return true;
	else
		return false;
}

function chupai_local(){
	var innerStr = "";
	var todelete = [];
	
	$('span.mycard').each(function(index) {
		if ($(this).css("height") != "117px") {
			// $(this).remove();
			todelete.push(index);
		}
	});
	
	console.log("todelete:" + todelete);
	
	todelete = reReplaceCards(mycards, todelete);
	if (isValid(todelete, prevcards) == "NOTVALID") 
	{
		console.log("NOTVALID");
		container_add("不合规则的出牌");
		container_intime(550,1500);
		chongxuan();
	}else{
		hideAllButton();
		var innerStr = "";
		prevcards = [];
		for (i in todelete) 
		{
			if(mycards[todelete[i]] <= 54 && mycards[todelete[i]] >= 0){
				innerStr += "<span style=\"display: inline-block; height:58px; width:18px; \"><img src=\"js/images/"
						+ getCardFileName(mycards[todelete[i]])
						+ "\" width=\"40\"/></span>";
				prevcards.push(mycards[todelete[i]]);
			}
		}
		countZHADAN(prevcards);
		prevPlayer = 0;
		todelete = todelete.sort().reverse();
		for (i in todelete) 
		{
			mycards = removeFromCardsList(mycards, todelete[i]);
		}
		//console.log("innerStr: " + innerStr);
		initmycards();
		if(calcCardLeftNum() == false){
			$("#mycard_small").animate({opacity : 100}, 0);
			$("#mycard_small").html(innerStr);
			//console.log("innerStr: " + $("#mycard_small").html());
			setTimeout(rightPlayerAI, 600);
		}else{
			$("#mycard_small").animate({opacity : 100}, 0);
			$("#mycard_small").html(innerStr);
			setTimeout(finishGame_local,300);
		}
	}
}

function buchu_local(){
	var obj;
	$('span.button').each(function(index){
		if(index == 0)
			obj = $(this);
	});
	if(obj.hasClass("disabled")){
		return;
	}
	disableButton(1);
	chongxuan();
	hideAllButton();
	$("#mycard_small").html("<img src='js/images/no_user.png'/>");
	setTimeout(rightPlayerAI, 600);
}

function leftPlayerAI(){
	console.log("================LEFT PLAYER=================");
	if(prevPlayer != 2){
		console.log("leftcards: " + getcardstoprint(leftcards) + ", prevcards: " + getcardstoprint(prevcards));
		var tempcards = ai_withPrev(leftcards, prevcards);
		console.log("tempcards withPrev: " + tempcards);
		var innerStr = "";
		if(tempcards.length > 0){
			prevcards = tempcards;
			var new_prevcards = [];
			prevPlayer = 2;
			tempcards = reReplaceCards(leftcards, tempcards);
			for (j in tempcards ){
				console.log("prevcards[j]: " + tempcards[j]);
				console.log("leftcards[prevcards[j]]: " + ((leftcards[tempcards[j]]-1)%13 + 1));
				if(leftcards[tempcards[j]] <= 54 && leftcards[tempcards[j]] >= 0){
					innerStr += "<span style=\"display: inline-block; height:58px; width:18px; \"><img src=\"js/images/"
							+ getCardFileName(leftcards[tempcards[j]])
							+ "\" width=\"40\"/></span>";
					new_prevcards.push(leftcards[tempcards[j]]);
				}
			}
			leftcards = removeListFromCardsList(leftcards, tempcards);
			prevcards = new_prevcards;
			countZHADAN(prevcards);
		}
		if (innerStr != ""){
			$("#cards_left").html(innerStr);
			$("#cards_left").animate( {opacity : 0,}, 0, function(){
				$("#cards_left").animate({}, 100, function(){
					$("#cards_left").animate({
							opacity : 100,
					}, 0, function() {});
				});
			});
		}else{
			$("#cards_left").html("<img src='js/images/no_user.png'/>");
		}
		if(calcCardLeftNum() == true){
			setTimeout(finishGame_local,300);
			return;
		}
	}else{
		resetOutCardsDisplay();
		leftcards = insertCards(leftcards, allCards_pop());
		var tempcards = ai_withOutPrev(leftcards);
		console.log("tempcards withOutPrev: " + tempcards);
		var innerStr = "";
		if(tempcards.length > 0){
			console.log("0");
			prevcards = tempcards;
			var new_prevcards = [];
			prevPlayer = 2;
			for (j in prevcards ){
				if(leftcards[tempcards[j]] <= 54 && leftcards[tempcards[j]] >= 0){
					innerStr += "<span style=\"display: inline-block; height:58px; width:18px; \"><img src=\"js/images/"
							+ getCardFileName(leftcards[prevcards[j]])
							+ "\" width=\"40\"/></span>";
					new_prevcards.push(leftcards[prevcards[j]]);
				}
			}
			leftcards = removeListFromCardsList(leftcards, tempcards);
			prevcards = new_prevcards;
			countZHADAN(prevcards);
		}
		if (innerStr != ""){
			$("#cards_left").html(innerStr);
			$("#cards_left").animate( {opacity : 0,}, 0, function(){
				$("#cards_left").animate({}, 100, function(){
					$("#cards_left").animate({
							opacity : 100,
					}, 0, function() {});
				});
			});
		}else{
			$("#cards_left").html("<img src='js/images/no_user.png'/>");
		}
		if(calcCardLeftNum() == true){
			setTimeout(finishGame_local,300);
			return;
		}
	}
	setTimeout(userPlayer, 600);
}

function rightPlayerAI(){
	console.log("================RIGHT PLAYER=================");
	if(prevPlayer != 1){
		console.log("rightcards: " + getcardstoprint(rightcards) + ", prevcards: " + getcardstoprint(prevcards));
		var tempcards = ai_withPrev(rightcards);
		console.log("tempcards withPrev: " + tempcards);
		var innerStr = "";
		if(tempcards.length > 0){
			console.log("1");
			prevcards = tempcards;
			var new_prevcards = [];
			prevPlayer = 1;
			tempcards = reReplaceCards(rightcards, tempcards);
			console.log("2");
			for (j in tempcards ){
				if(rightcards[tempcards[j]] <= 54 && rightcards[tempcards[j]] >= 0){
					innerStr += "<span style=\"display: inline-block; height:58px; width:18px; \"><img src=\"js/images/"
							+ getCardFileName(rightcards[tempcards[j]])
							+ "\" width=\"40\"/></span>";
					new_prevcards.push(rightcards[tempcards[j]]);
				}
			}
			console.log("3");
			rightcards = removeListFromCardsList(rightcards, tempcards);
			prevcards = new_prevcards;
			countZHADAN(prevcards);
			console.log("4");
		}
		if (innerStr != ""){
			$("#cards_right").html(innerStr);
			$("#cards_right").animate( {opacity : 0,}, 0, function(){
				$("#cards_right").animate({}, 100, function(){
					$("#cards_right").animate({
							opacity : 100,
						}, 0, function() {});
				});
			});
		}else{
			$("#cards_right").html("<img src='js/images/no_user.png'/>");
		}
		if(calcCardLeftNum() == true){
			setTimeout(finishGame_local,300);
			return;
		}
	}else{
		resetOutCardsDisplay();
		rightcards = insertCards(rightcards, allCards_pop());
		var tempcards = ai_withOutPrev(rightcards);
		console.log("tempcards withOutPrev: " + tempcards);
		var innerStr = "";
		if(tempcards.length > 0){
			console.log("0");
			prevcards = tempcards;
			var new_prevcards = [];
			prevPlayer = 1;
			console.log("1");
			for (j in prevcards ){
				console.log("prevcards[j]: " + prevcards[j]);
				console.log("rightcards[prevcards[j]]" + rightcards[prevcards[j]]);
				if(rightcards[tempcards[j]] <= 54 && rightcards[tempcards[j]] >= 0){
					innerStr += "<span style=\"display: inline-block; height:58px; width:18px; \"><img src=\"js/images/"
							+ getCardFileName(rightcards[prevcards[j]])
							+ "\" width=\"40\"/></span>";
					new_prevcards.push(rightcards[prevcards[j]]);
				}
			}
			console.log("2");
			rightcards = removeListFromCardsList(rightcards, tempcards);
			prevcards = new_prevcards;
			countZHADAN(prevcards);
			console.log("3");
		}
		if (innerStr != ""){
			console.log("4");
			console.log("innerStr: " + innerStr);
			$("#cards_right").html(innerStr);
			$("#cards_right").animate( {opacity : 0,}, 0, function(){
				$("#cards_right").animate({}, 100, function(){
					$("#cards_right").animate({
							opacity : 100,
						}, 0, function() {});
				});
			});
			console.log("5");
		}else{
			$("#cards_right").html("<img src='js/images/no_user.png'/>");
		}
		if(calcCardLeftNum() == true){
			setTimeout(finishGame_local,300);
			return;
		}
	}
	setTimeout(leftPlayerAI, 600);
}

function resetOutCardsDisplay(){
	$("#cards_left").html("");
	$("#cards_right").html("");
	$("#mycard_small").html("");
}

function userPlayer(){
	console.log("================USER PLAYER=================");
	currentLIANDUI_Count = -1;
	currentSHUNZI_Count = -1;
	currentDUIZI_Count = -1;
	currentZHADAN_Count = -1;
	toSearchCount = -1;
	showAllButton();
	$("#mycard_small").html("");
	if(prevPlayer == 0){
		disableButton(1);
		resetOutCardsDisplay();
		mycards = insertCards(mycards, allCards_pop());
		calcCardLeftNum();
		prevcards = [];
		initmycards();
	}else{
		enableButton(1);
	}
}

function getcardstoprint(cardsList){
	var string = "[";
	for(i in cardsList){
		string += (cardsList[i] >= 53)?cardsList[i]:((cardsList[i]-1)%13 + 1) + ", ";
	}
	return string + "]";
}

function finishGame_local(){
	var score = [0, 0, 0];
	if(mycards.length !=0 && leftcards.length != 0 && rightcards.length != 0){
		//alert("Game Finished. The Winner is " + (mycards.length==0?"You":(leftcards.length==0?"Left User":"Right User")) + "!");
	}else{
		//alert("Game Finished. The Winner is " + (mycards.length==0?"You":(leftcards.length==0?"Left User":"Right User")) + "!");
		score = calcScore(prevWinner);
	}
	
	user_score_local += score[0];
	rplayer_score_local += score[1];
	lplayer_score_local += score[2];
	resetLocalScore();
	
	if(typeof(android) != "undefined"){
		android.setProperty("user_score_local", user_score_local);
		android.setProperty("rplayer_score_local", rplayer_score_local);
		android.setProperty("lplayer_score_local", lplayer_score_local);
	}
	
	var innerHtml = "";
	innerHtml += "<span style=\"display: inline-block; position: absolute; height: 50px; width: 120px; left: 0; border-right: 1px solid #777;\">头像<table width=\"100%\" style=\"text-align: center;\"></table><table width=\"100%\" style=\"text-align: center;\"><tbody><tr><td width=\"100%\"><img width=\"40\" src=\"js/images/peasant_lord_r.png\"></td></tr><tr><td width=\"100%\"><img width=\"40\" src=\"js/images/peasant_lord_r.png\"></td></tr><tr><td width=\"100%\"><img width=\"40\" src=\"js/images/peasant_lord_r.png\"></td></tr></tbody></table></span>";
	innerHtml += "<span style=\"display: inline-block; position: absolute; height: 50px; left: 120px; right: 220px; border-right: 1px solid #777;\">昵称<table width=\"100%\"><tbody><tr><td width=\"50\">用户</td></tr><tr><td width=\"50\" style=\"color:\">左侧电脑</td></tr><tr><td width=\"50\" style=\"color:\">右侧电脑</td></tr></tbody></table></span>";
	innerHtml += "<span style=\"display: inline-block; position: absolute; height: 50px; width: 120px; right: 100px; border-left: 1px solid #777;\">本局得分<table width=\"100%\"><tbody><tr><td width=\"50\">" + score[0] + "</td></tr><tr><td width=\"50\">" + score[2] + "</td></tr><tr><td width=\"50\">" + score[1] + "</td></tr></tbody></table></span>";
	innerHtml += "<span style=\"display: inline-block; position: absolute; height: 50px; width: 100px; right: 0; border-left: 1px solid #777;\">资产<table width=\"100%\"><tbody><tr><td width=\"50\">" + user_score_local + "</td></tr><tr><td width=\"50\">" + lplayer_score_local + "</td></tr><tr><td width=\"50\">" + rplayer_score_local + "</td></tr></tbody></table></span>";
	
	$('#game_over_content').html(innerHtml);
	$('#game_over').fadeIn(1000);
}

function calcScore(prevWinner_t){
	
	var scores = new Array();
	
	if(mycards.length == 0)
		scores.push(((leftcards.length == 5)?(leftcards.length * 2):(leftcards.length)) + ((rightcards.length == 5)?(rightcards.length * 2):(rightcards.length)));
	else{
		if(prevWinner_t == 0)
			scores.push( - mycards.length);
		else
			scores.push( - ((mycards.length == 5)?(mycards.length * 2):(mycards.length)));
	}
	
	if(rightcards.length == 0)
		scores.push(((mycards.length == 5)?(mycards.length * 2):(mycards.length)) + ((leftcards.length == 5)?(leftcards.length * 2):(leftcards.length)));
	else{
		if(prevWinner_t == 1)
			scores.push( - rightcards.length);
		else
			scores.push( - ((rightcards.length == 5)?(rightcards.length * 2):(rightcards.length)));
	}
	
	if(leftcards.length == 0)
		scores.push(((mycards.length == 5)?(mycards.length * 2):(mycards.length)) + ((rightcards.length == 5)?(rightcards.length * 2):(rightcards.length)));
	else{
		if(prevWinner_t == 2)
			scores.push( - leftcards.length);
		else
			scores.push( - ((leftcards.length == 5)?(leftcards.length * 2):(leftcards.length)));
	}
	
	prevWinner = (mycards.length == 0)?0:((rightcards.length == 0)?1:2);
	
	for(i in scores){
		scores[i] *= zhadan_count;
	}
	
	return scores;
}

function allCards_pop(){
	if(allCards.length > 0){
		$('#allCards_left_count').html("剩余" + (allCards.length - 1) + "张牌");
		return allCards.pop();
	}
	finishGame_local();
	return -1;
}

function resetLocalScore(){
	$('#money_Left').html("资产：" + lplayer_score_local);
	$('#money_Right').html("资产：" + rplayer_score_local);
	$('#money_Me').html("资产：" + user_score_local);
}

function countZHADAN(cards){
	if(isZHADAN(cards)){
		zhadan_count *= 2;
	}
}
