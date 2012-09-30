
function ai_withPrev(cardsList, prevList){
	allPossibilities = new Array();

	if(isSHUNZI(prevcards)) {console.log("isSHUNZI");
		allPossibilities.push(checkSHUNZI_Condition(cardsList, prevcards));
		allPossibilities.push(checkSHUNZI_Condition_W(cardsList, prevcards));
		allPossibilities = allPossibilities.concat(checkZHADAN(cardsList));
		allPossibilities = allPossibilities.concat(checkZHADAN_W(cardsList));
	} else if(isLIANDUI(prevcards)) {console.log("isLIANDUI");
		allPossibilities.push(checkLIANDUI_Condition(cardsList, prevcards));
		allPossibilities.push(checkLIANDUI_Condition_W(cardsList, prevcards));
		allPossibilities = allPossibilities.concat(checkZHADAN(cardsList));
		allPossibilities = allPossibilities.concat(checkZHADAN_W(cardsList));
	} else if(isDUIZI(prevcards)) {console.log("isDUIZI");
		allPossibilities = allPossibilities.concat(checkDUIZI_Condition(cardsList, prevcards));console.log(allPossibilities);
		allPossibilities = allPossibilities.concat(checkDUIZI_Condition_W(cardsList, prevcards));console.log(allPossibilities);
		allPossibilities = allPossibilities.concat(checkZHADAN(cardsList));console.log(allPossibilities);
		allPossibilities = allPossibilities.concat(checkZHADAN_W(cardsList));console.log(allPossibilities);
	} else if(isZHADAN(prevcards)) {console.log("isZHADAN");
		allPossibilities = allPossibilities.concat(checkZHADAN_Condition(cardsList, prevcards));
		allPossibilities = allPossibilities.concat(checkZHADAN_Condition_W(cardsList, prevcards));
	} else if(isDANZHANG(prevcards)) {console.log("isDANZHANG");
		allPossibilities = allPossibilities.concat(checkDANZHANG_Condition(cardsList, prevcards));
		allPossibilities = allPossibilities.concat(checkZHADAN(cardsList));
		allPossibilities = allPossibilities.concat(checkZHADAN_W(cardsList));
	}
	
	console.log(allPossibilities);
	
	if(allPossibilities.length == 0){
		return [];
	}else{
		var maxlength = 0;
		var maxlength_count = 0;
		for(i = 0; i < allPossibilities.length; i++){
			if(allPossibilities[i].length > maxlength){
				maxlength = allPossibilities[i].length;
				maxlength_count = i;
			}
		}
		return allPossibilities[maxlength_count];
	}
}


function ai_withOutPrev(cardsList){
	allPossibilities = new Array();
	
	allPossibilities = allPossibilities.concat(checkSHUNZI(cardsList));
	console.log("ai_withOutPrev: " + allPossibilities);
	allPossibilities = allPossibilities.concat(checkSHUNZI_W(cardsList));
	console.log("ai_withOutPrev: " + allPossibilities);
	allPossibilities = allPossibilities.concat(checkLIANDUI(cardsList));
	console.log("ai_withOutPrev: " + allPossibilities);
	allPossibilities = allPossibilities.concat(checkLIANDUI_W(cardsList));
	console.log("ai_withOutPrev: " + allPossibilities);
	allPossibilities = allPossibilities.concat(checkDUIZI(cardsList));
	console.log("ai_withOutPrev: " + allPossibilities);
	allPossibilities = allPossibilities.concat(checkDUIZI_W(cardsList));
	console.log("ai_withOutPrev: " + allPossibilities);
	allPossibilities = allPossibilities.concat(checkDANZHANG(cardsList));
	console.log("ai_withOutPrev: " + allPossibilities);
	allPossibilities = allPossibilities.concat(checkZHADAN(cardsList));
	console.log("ai_withOutPrev: " + allPossibilities);
	allPossibilities = allPossibilities.concat(checkZHADAN_W(cardsList));
	
	console.log("ai_withOutPrev: " + allPossibilities);
	
	if(allPossibilities.length == 0){
		alert("error in ai_withOutPrev");
		return [];
	}else{
		var maxlength = 0;
		var maxlength_count = 0;
		for(i = 0; i < allPossibilities.length; i++){
			if(allPossibilities[i].length > maxlength){
				maxlength = allPossibilities[i].length;
				maxlength_count = i;
			}
		}
		return allPossibilities[maxlength_count];
	}
}
	
	function compareCardsGE(num1, num2){//return true if num1 >= num2 [num2 < 53]
		if(num1 >=53)
			return true;
		if((num1+10)%13 >= (num2+10)%13)
			return true;
	}
	
	function compareCardsGe(num1, num2){//return true if num1 >= num2 [num2 < 53]
		if(num1 >=53)
			return true;
		if((num1+10)%13 > (num2+10)%13)
			return true;
	}
	
	function compareCardsEq(num1, num2){//return true if num1 == num2
		if((num1)%13 == (num2)%13)
			return true;
		return false;
	}
	
	function compareCardsLe(num1, num2){//return true if num1 < num2
		if(num1 >=53 && num1 == num2)
			return true;
		if((num1)%13 < (num2)%13)
			return true;
	}
	
	function checkDUIZI(mycards){
		var prev = -1;
		var toreturn = [];
		for(i = 0; i < mycards.length && mycards[i] < 53; i++){ 
			if(prev == -1){
				prev = mycards[i];
				continue;
			}else{
				if(compareCardsEq(mycards[i], prev)){
					toreturn.push([Number(i-1), Number(i)]);
				}
				prev = mycards[i];
			}
		}
		return toreturn;
	}
	
	function checkDUIZI_W(mycards){
		var prev = -1;
		var toreturn = [];
		if(mycards[mycards.length-1] >= 53){
			for(var i in mycards){ 
				if(mycards[i] < 53){
					toreturn.push([Number(i), Number(mycards.length-1)]);
				}
			}
		}
		return toreturn;
	}

	function checkDUIZI_Condition(mycards, adversaryCards){
		var toreturn = [];
		//adversaryCards[0] is not Wang
		if(compareCardsEq(adversaryCards[0],2))
			return [];
		for(i = 0; i < mycards.length && mycards[i] < 53; i++){ 
			if(compareCardsEq(mycards[i]-1, adversaryCards[0]) && !compareCardsEq(mycards[i], 2)){
				toreturn.push(Number(i));
			}
		}
		console.log("HS19: checkDUIZI_Condition mycards: " + mycards + ", toreturn: " + toreturn);
		if(toreturn.length >= 2){
			toreturn = [toreturn.slice(0,2)];
		}else{
			toreturn = [];
		}
		var for2 = [];
		for(i = 0; i < mycards.length && mycards[i] < 53; i++){ 
			if(compareCardsEq(mycards[i], 2)){
				for2.push(Number(i));
			}
		}
		if(for2.length >= 2){
			toreturn.push(for2.slice(0,2));
		}
		
		console.log("HS19: checkDUIZI_Condition mycards: " + mycards + ", toreturn: " + toreturn);
		
		return toreturn;
	}
	
	function checkDUIZI_Condition_W(mycards, adversaryCards){
		var numofW = 0;
		if(mycards[mycards.length-2] >=53)
			numofW++;
		if(mycards[mycards.length-1] >=53)
			numofW++;
		if(numofW == 0)
			return [];
			
		//adversaryCards[0] is not Wang
		var toreturn = [];
		if(compareCardsEq(adversaryCards[0],2))
			return [];
		for(i = 0; i < mycards.length && mycards[i] < 53; i++){ 
			if(compareCardsEq(mycards[i]-1, adversaryCards[0]) && !compareCardsEq(mycards[i], 2)){
				toreturn.push(Number(i));
			}
		}
		if(toreturn.length >= 1){
			toreturn = [[toreturn[0], mycards.length-1]];
		}
		var for2 = [];
		for(i = 0; i < mycards.length && mycards[i] < 53; i++){ 
			if(compareCardsEq(mycards[i], 2)){
				for2.push(Number(i));
			}
		}
		if(for2.length >= 1){
			toreturn.push([for2[0], mycards.length-1]);
		}
		
		console.log("HS19: checkDUIZI_Condition_W mycards: " + mycards + ", toreturn: " + toreturn);
		
		return toreturn;
	}
	
	function checkSHUNZI(mycards){
		var toreturn = [];
		for(var i in mycards){ 
			for(var j in mycards){ 
				if(i >= j || mycards[j] >= 53)
					continue;
				if(compareCardsEq(mycards[i], mycards[j]-1)){
					for(var k in mycards){ 
						if(j >= k || mycards[k] >= 53)
							continue;
						if(compareCardsEq(mycards[j], mycards[k]-1) && mycards[k]%13 != 2){
							toreturn.push([Number(i), Number(j), Number(k)]);
							for(var l in mycards){ 
								if(k >= l || mycards[l] >= 53)
									continue;
								if(compareCardsEq(mycards[k], mycards[l]-1) && mycards[l]%13 != 2){
									toreturn.push([Number(i), Number(j), Number(k), Number(l)]);
									for(var m in mycards){ 
										if(l >= m || mycards[m] >= 53)
											continue;
										if(compareCardsEq(mycards[l], mycards[m]-1) && mycards[m]%13 != 2){
											toreturn.push([Number(i), Number(j), Number(k), Number(l), Number(m)]);
											for(var n in mycards){ 
												if(m >= n || mycards[n] >= 53)
													continue;
												if(compareCardsEq(mycards[m], mycards[n]-1) && mycards[n]%13 != 2){
													toreturn.push([Number(i), Number(j), Number(k), Number(l), Number(m), Number(n)]);
													
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		return toreturn;
	}
	
	function checkSHUNZI_W(mycards){
		var toreturn = [];
		var numofW = 0;
		if(mycards[mycards.length-2] >=53)
			numofW++;
		if(mycards[mycards.length-1] >=53)
			numofW++;
		if(numofW == 0)
			return [];
		var temp = checkSHUNZI_W_recv(mycards, mycards,-1,numofW);
		
		var toreturn_temp = [];
		for(i in temp){
			if(temp[i].length>=3)
				toreturn_temp.push(temp[i]);
			else if(temp[i].length==2 && (mycards[temp[i][temp[i].length-1]]<53) && (mycards[temp[i][temp[i].length-1]]%13==1)){
				var _1count = 0;
				for(j in temp[i]){
					if(temp[i][j] == -1)
						_1count++;
				}
				if(_1count < numofW){
					toreturn_temp.push([-1].concat(temp[i]));
				}
			}
		}
		for(i in toreturn_temp){
			var tempnumofW = numofW;
			for(j in toreturn_temp[i]){
				if(toreturn_temp[i][j] == -1){
					toreturn_temp[i][j] = mycards.length-tempnumofW;
					tempnumofW--;
				}
			}
			if(tempnumofW != numofW)
				toreturn.push(toreturn_temp[i]);
		}
		return toreturn;
	}
	
	function checkSHUNZI_W_recv(mycards, oriarray, j, numofw){
		var toreturn = [];
		for(var i=j+1; i<oriarray.length && mycards[i] <53; i++){
			if(j == -1){
				var newarray = [i].concat(checkSHUNZI_W_recv(mycards, oriarray,i,numofw));
				toreturn.push(newarray);
			}else if(!compareCardsEq(mycards[i],2)){
				if(compareCardsEq(mycards[i]-1, mycards[j])){
					var newarray = [i].concat(checkSHUNZI_W_recv(mycards, oriarray, i, numofw-1));
					if(newarray.length > toreturn.length)
						toreturn = newarray;
				}else if(compareCardsEq(mycards[i]-2, mycards[j]) && numofw>=1){
					var newarray = [-1, i].concat(checkSHUNZI_W_recv(mycards, oriarray, i, numofw-1));
					if(newarray.length > toreturn.length)
						toreturn = newarray;
				}else if(compareCardsEq(mycards[i]-3, mycards[j]) && numofw>=2){
					var newarray = [-1, -1 ,i].concat(checkSHUNZI_W_recv(mycards, oriarray, i, numofw-2));
					if(newarray.length > toreturn.length)
						toreturn = newarray;
				}
			}
		}
		if(i < oriarray.length && numofw > 0 && countof_n1(toreturn) < numofw){
			var newarray = ((numofw - countof_n1(toreturn))==2)?[-1, -1]:[-1];
			toreturn = toreturn.concat(newarray);
		}
		return toreturn;
	}
	
	function countof_n1(cards){
		var count = 0;
		for(i in cards){
			if(i == -1){
				count ++;
			}
		}
		return count;
	}
	
	function checkSHUNZI_Condition(mycards, adversaryCards){
		var toreturn = [];
		var i = 0;
		for(i in adversaryCards){
			if(adversaryCards[i] <53)
				break;
		}
		if(compareCardsEq((adversaryCards[i] + adversaryCards.length - 1 - i),1))
			return [];
		i = adversaryCards[i] - i;
		var tomeet = [];
		for(j = 0; j < adversaryCards.length; j++){
			i++;
			tomeet.push(i);
		}
		for(k = 0; k < mycards.length && mycards[k] < 53; k++){
			for(m in tomeet){
				if(compareCardsEq(mycards[k], tomeet[m])){
					tomeet[m] = -1;
					toreturn.push(k);
					break;
				}
			}
		}
		var nomeetcount = 0;
		for(m in tomeet){
			if(tomeet[m] > 0){
				nomeetcount ++;
			}
		}
		if(nomeetcount > 0)
			return [];

		return toreturn;
	}
	
	function checkSHUNZI_Condition_W(mycards, adversaryCards){
		var toreturn = [];
		var numofW = 0;
		if(mycards[mycards.length-2] >=53)
			numofW++;
		if(mycards[mycards.length-1] >=53)
			numofW++;
		if(numofW == 0)
			return [];
		
		var i = 0;
		for(i in adversaryCards){
			if(adversaryCards[i] <53)
				break;
		}
		if(compareCardsEq((adversaryCards[i] + adversaryCards.length - 1 - i),1))
			return [];
		i = adversaryCards[i] - i;
		var tomeet = [];
		for(j = 0; j < adversaryCards.length; j++){
			i++;
			tomeet.push(i);
		}
		for(k = 0; k < mycards.length && mycards[k] < 53; k++){
			for(m in tomeet){
				if(compareCardsEq(mycards[k], tomeet[m])){
					tomeet[m] = -1;
					toreturn.push(k);
					break;
				}
			}
		}
		var nomeetcount = 0;
		for(m in tomeet){
			if(tomeet[m] > 0){
				nomeetcount ++;
			}
		}
		if(nomeetcount == 0 || numofW - nomeetcount < 0)
			return [];
		toreturn = toreturn.concat(nomeetcount==2?[mycards.length-2, mycards.length-1]:[mycards.length-1]);

		return toreturn;
	}
	
	function checkLIANDUI(mycards){
		var toreturn = [];
		for(var i in mycards){ 
			for(var j in mycards){ 
				if(i >= j || mycards[j] >= 53)
					continue;
				if(compareCardsEq(mycards[i], mycards[j])){
					for(var k in mycards){ 
						if(j >= k || mycards[k] >= 53)
							continue;
						if(compareCardsEq(mycards[j], mycards[k]-1) && mycards[k]%13 != 2){
							for(var l in mycards){ 
								if(k >= l || mycards[l] >= 53)
									continue;
								if(compareCardsEq(mycards[k], mycards[l]) && mycards[l]%13 != 2){
									toreturn.push([Number(i), Number(j), Number(k), Number(l)]);
									for(var m in mycards){ 
										if(l >= m || mycards[m] >= 53)
											continue;
										if(compareCardsEq(mycards[l], mycards[m]-1) && mycards[m]%13 != 2){
											for(var n in mycards){ 
												if(m >= n || mycards[n] >= 53)
													continue;
												if(compareCardsEq(mycards[m], mycards[n]) && mycards[n]%13 != 2){
													toreturn.push([Number(i), Number(j), Number(k), Number(l), Number(m), Number(n)]);
													
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		return toreturn;
	}
	
	function checkLIANDUI_W(mycards){
		var numofW = 0;
		if(mycards[mycards.length-2] >=53)
			numofW++;
		if(mycards[mycards.length-1] >=53)
			numofW++;
		if(numofW == 0)
			return [];
			
		var toreturn = [];
		var toreturn_temp = [];
		var temp = checkLIANDUI_W_recv(mycards, mycards,-1,numofW)
		for(i in temp){
			if(temp[i].length>=4){
				toreturn_temp.push(temp[i].slice(0,temp[i].length-temp[i].length%2));
			}
		}
		for(i in toreturn_temp){
			var tempnumofW = numofW;
			for(j in toreturn_temp[i]){
				if(toreturn_temp[i][j] == -1){
					toreturn_temp[i][j] = mycards.length-tempnumofW;
					tempnumofW--;
				}
			}
			if(tempnumofW == numofW)
				toreturn.push(toreturn_temp[i]);
		}
		return toreturn;
	}
	
	function checkLIANDUI_W_recv(mycards, oriarray, j, numofw){
		var toreturn = [];
		for(var i=j+1; i<oriarray.length && mycards[i] <53; i++){
			
			if(j == -1){
				var newarray = [i].concat(checkLIANDUI_W_recv(mycards, oriarray,i,numofw));
				toreturn.push(newarray);
			}else if(!compareCardsEq(mycards[i],2)){
				if(compareCardsEq(mycards[i], mycards[j])){
					for(var k=i+1; k<oriarray.length && mycards[k] <53; k++){
						if(compareCardsGe(mycards[k], mycards[i]))
							break;
					}
					if(k >= oriarray.length || mycards[k] >= 53){
						var newarray = [i];
						if(numofw == 2){
							newarray = newarray.concat([-1, -1]);
						}
						if(newarray.length > toreturn.length)
							toreturn = newarray;
					}else{
						if(compareCardsEq(mycards[k]-1,mycards[i])){
							var newarray = [i, k].concat(checkLIANDUI_W_recv(mycards, oriarray, k, numofw));
							if(newarray.length > toreturn.length)
								toreturn = newarray;
						}else if(compareCardsEq(mycards[k]-2, mycards[i]) && !compareCardsEq(mycards[k], 2) && numofw >= 2){
							var newarray = [i, -1, -1, k].concat(checkLIANDUI_W_recv(mycards, oriarray, k, numofw-2));
									if(newarray.length > toreturn.length)
										toreturn = newarray;
						}else{
							toreturn = [i];
						}
					}
				}else if(compareCardsEq(mycards[i]-1, mycards[j]) && numofw >= 1){
					var newarray = [-1, i].concat(checkLIANDUI_W_recv(mycards, oriarray, i, numofw-1));
					if(newarray.length > toreturn.length)
						toreturn = newarray;
				}else if(numofw > 0){
					var newarray = [-1];
					if(newarray.length > toreturn.length)
						toreturn = newarray;
				}
			}
		}
		if(numofw > 0){
			var newarray = [-1];
			if(newarray.length > toreturn.length)
				toreturn = newarray;
		}
		return toreturn;
	}
	
	function checkLIANDUI_Condition(mycards, adversaryCards){
		var toreturn = [];
	
		var i = 0;
		for(i in adversaryCards){
			if(adversaryCards[i] <53)
				break;
		}
		if(compareCardsEq((adversaryCards[i] + (adversaryCards.length/2) - 1 - Math.floor(i/2)),1))
			return [];
		i = adversaryCards[i] - Math.floor(i/2);
		
		var tomeet = [];
		for(j = 0; j < adversaryCards.length / 2; j++){
			i++;
			tomeet = tomeet.concat([i, i]);
		}
		for(k = 0; k < mycards.length && mycards[k] < 53; k++){
			for(m in tomeet){
				if(compareCardsEq(mycards[k], tomeet[m])){
					tomeet[m] = -1;
					toreturn.push(k);
					break;
				}
			}
		}
		var nomeetcount = 0;
		for(m in tomeet){
			if(tomeet[m] > 0){
				nomeetcount ++;
			}
		}
		if(nomeetcount > 0)
			return [];
		return toreturn;
	}
	
	function checkLIANDUI_Condition_W(mycards, adversaryCards){
		var toreturn = [];
		var numofW = 0;
		if(mycards[mycards.length-2] >=53)
			numofW++;
		if(mycards[mycards.length-1] >=53)
			numofW++;
		if(numofW == 0)
			return [];
		
		var i = 0;
		for(i in adversaryCards){
			if(adversaryCards[i] <53)
				break;
		}
		if(compareCardsEq((adversaryCards[i] + (adversaryCards.length/2) - 1 - Math.floor(i/2)),1))
			return [];
		i = adversaryCards[i] - Math.floor(i/2);
		
		var tomeet = [];
		for(j = 0; j < adversaryCards.length / 2; j++){
			i++;
			tomeet = tomeet.concat([i, i]);
		}
		for(k = 0; k < mycards.length && mycards[k] < 53; k++){
			for(m in tomeet){
				if(compareCardsEq(mycards[k], tomeet[m])){
					tomeet[m] = -1;
					toreturn.push(k);
					break;
				}
			}
		}
		var nomeetcount = 0;
		for(m in tomeet){
			if(tomeet[m] > 0){
				nomeetcount ++;
			}
		}
		if(nomeetcount == 0 || numofW - nomeetcount < 0)
			return [];
		toreturn = toreturn.concat(nomeetcount==2?[mycards.length-2, mycards.length-1]:[mycards.length-1]);

		return toreturn;
	}
	
	function checkZHADAN(mycards){
		var numofW = 0;
		if(mycards[mycards.length-2] >=53)
			numofW++;
		if(mycards[mycards.length-1] >=53)
			numofW++;
			
		var tempcards = mycards.slice(0, mycards.length - numofW);
		var toreturn = [];
		for(var i in tempcards){ 
			for(var j in tempcards){ 
				if(i >= j)
					continue;
				if(compareCardsEq(tempcards[i], tempcards[j])){
					for(var k in tempcards){ 
						if(j >= k)
							continue;
						if(compareCardsEq(tempcards[j], tempcards[k])){
							toreturn.push([Number(i), Number(j), Number(k)]);
							for(var l in tempcards){ 
								if(k >= l)
									continue;
								if(compareCardsEq(tempcards[k], tempcards[l])){
									toreturn.push([Number(i), Number(j), Number(k), Number(l)]);
								}
							}
						}
					}
				}
			}
		}
		return toreturn;
	}
	
	function checkZHADAN_W(mycards){
		var numofW = 0;
		if(mycards[mycards.length-2] >=53)
			numofW++;
		if(mycards[mycards.length-1] >=53)
			numofW++;
			
		var toreturn = [];
		if(numofW == 2){
			var fromDUI = checkDUIZI(mycards);
			for(i in fromDUI){
				toreturn.push(fromDUI[i].concat([mycards.length-2, mycards.length-1]));
			}
			var fromZHADAN = checkZHADAN(mycards);
			for(i in fromZHADAN){
				toreturn.push(fromZHADAN[i].concat([mycards.length-2, mycards.length-1]));
			}
			for(i in mycards){
				if(mycards[i] < 53)
				toreturn.push([i].concat([mycards.length-2, mycards.length-1]));
			}
			toreturn.push([mycards.length-2, mycards.length-1]);
		}
		if(numofW >= 1){
			var fromDUI = checkDUIZI(mycards);
			for(i in fromDUI){
				toreturn.push(fromDUI[i].concat([mycards.length-1]));
			}
			console.log("checkZHADAN 1: " + checkZHADAN(mycards));
			console.log("checkZHADAN_W 1: " + toreturn);
			var fromZHADAN = checkZHADAN(mycards);
			for(i in fromZHADAN){
				toreturn.push(fromZHADAN[i].concat([mycards.length-1]));
			}
			console.log("checkZHADAN_W 2: " + toreturn);
		}
		console.log("checkZHADAN_W: " + toreturn);
		return toreturn;
	}

	function checkZHADAN_Condition(mycards, adversaryCards){
		var toreturn = [];
		var temp = [];
		
		if(adversaryCards.length == 2 && adversaryCards[0] >=53 && adversaryCards[1] >= 53)
			return [];
		
		var j = 0;
		for(j in adversaryCards){
			if(adversaryCards[j] <53){
				j = adversaryCards[j];
				break;
			}
		}
		if(j == 0)
			return [];
		
		temp = checkZHADAN(mycards);
		for(i in temp){
			if(temp[i].length > adversaryCards.length
					|| (temp[i].length == adversaryCards.length && (Number(getNumofZHADAN(temp[i]))+10)%13 > (j+10)%13))
				toreturn.push(temp[i]);
		}
		//alert(toreturn);
		return toreturn;
	}
	
	function getNumofZHADAN(cards){
		var i = 0;
		for(i in cards){
			if(cards[i] < 53){
				return cards[i];
			}
		}
		return 3;
	}
	
	function checkZHADAN_Condition_W(mycards, adversaryCards){
		var toreturn = [];
		var temp = [];
		var numofW = 0;
		if(mycards[mycards.length-2] >=53)
			numofW++;
		if(mycards[mycards.length-1] >=53)
			numofW++;
		if(numofW == 0)
			return [];
			
		var i = 0;
		for(i in adversaryCards){
			if(adversaryCards[i] <53){
				i = adversaryCards[i];
				break;
			}
		}
		if(i == 0)
			return [];
		
		temp = checkZHADAN_W(mycards);
		for(i in temp){
			if(temp[i].length == 2){
				toreturn.push(temp[i]);
				continue;
			}
			if(temp[i].length > adversaryCards.length
					|| (temp[i].length == adversaryCards.length && (getNumofZHADAN(temp[i])+10)%13 > (i+10)%13)){
				toreturn.push(temp[i]);
			}
		}
		return toreturn;
	}
	
	function checkDANZHANG(mycards){
		var toreturn = [];
		for(i = 0; i < mycards.length && mycards[i] < 53; i++){ 
			toreturn.push([i]);
		}
		return toreturn;
	}

	function checkDANZHANG_Condition(mycards, adversaryCards){
		var toreturn = [];
		if(compareCardsEq(adversaryCards[0], 2))
			return [];
		for(i = 0; i < mycards.length && mycards[i] < 53; i++){ 
			if(compareCardsEq(adversaryCards[0]+1, mycards[i])){
				toreturn.push([i]);
				break;
			}
		}
		for(i = 0; i < mycards.length && mycards[i] < 53; i++){ 
			if(compareCardsEq(2, mycards[i])){
				toreturn.push([i]);
				break;
			}
		}
		return toreturn;
	}
	
	function reReplaceCards(mycards, cards){
		if(cards.length <= 2){ //A or AA
			return cards;
		}
		if(mycards[cards[cards.length-1]] < 53){ //NO W
			return cards;
		}
		if(mycards[cards[1]] >= 53){ //AXX
			return cards;
		}
		var numofw = 0;
		if(mycards[cards[cards.length-1]] >= 53)
			numofw++;
		if(mycards[cards[cards.length-2]] >= 53)
			numofw++;
			
		if((cards.length == 4 || cards.length == 6) 
			&& (compareCardsEq(mycards[cards[0]],mycards[cards[1]])
				|| compareCardsEq(mycards[cards[1]],mycards[cards[2]])
				|| compareCardsEq(mycards[cards[2]],mycards[cards[3]])
					)){
			if(compareCardsEq(mycards[cards[0]],mycards[cards[1]])){
				if((cards.length == 4 && numofw < 2) 
					|| (compareCardsEq(mycards[cards[2]],mycards[cards[3]]) 
						&& compareCardsEq(mycards[cards[1]],mycards[cards[2]]-1))){
					//AABX | AABBCX | AABBXX
					if(compareCardsEq(mycards[cards[2]],1)){
						//AABBXX but b is Ace  ->  XXAABB
						var newcards = cards.slice(4,6);
						newcards = newcards.concat(cards.slice(0,4));
						return newcards;
					}
					return cards; 
				}
				if(cards.length == 6  && !compareCardsEq(mycards[cards[2]],mycards[cards[3]])){
					//AABCCX | AABCXX
					var newcards = cards.slice(0,3);
					newcards.push(cards[cards.length-1]);
					newcards = newcards.concat(cards.slice(3,5));
					return newcards;
				}
				if(cards.length == 6 ){
					//AACCXX
					var newcards = cards.slice(0,2);
					newcards = newcards.concat(cards.slice(4,6));
					newcards = newcards.concat(cards.slice(2,4));
					return newcards;
				}
			}else if(compareCardsEq(mycards[cards[1]],mycards[cards[2]])){
				//ABBX | ABBCCX | ABBCXX
				var newcards = cards.slice(0,1);
				newcards.push(cards[cards.length-1]);
				newcards = newcards.concat(cards.slice(1,cards.length-1));
				return newcards;
			}else{
				//ABCCXX
				var newcards = cards.slice(0,1);
				newcards.push(4);
				newcards = newcards.concat(cards.slice(1,2));
				newcards.push(5);
				newcards = newcards.concat(cards.slice(2,4));
				return newcards;
			}
		}
		
		if(isLIANDUI(prevcards) && cards.length == prevcards.length && cards.length == 4){
			if(mycards[cards[2]] >= 53 && mycards[cards[3]] >= 53){
				if(compareCardsEq(mycards[cards[0]] + 1,mycards[cards[1]]) && mycards[cards[1]]%13 != 2){
					if(compareCardsEq(prevcards[0] + 1,mycards[cards[0]])){
						return [cards[0], cards[2], cards[1], cards[3]];
					}
				}
			}
		}
		
		// AAXX | AAAXX | AAAAXX | AAX | AAAX | AAAAX
		var isAllEqual = true;
		var prev = mycards[cards[0]];
		for(i = 1; i < cards.length && mycards[cards[i]]<53; i++){
			if(!compareCardsEq(prev,mycards[cards[i]])){
				isAllEqual = false;
				break;
			}
			prev = mycards[cards[i]];
		}
		if(isAllEqual){
			return cards;
		}
		
		console.log("cards: " + cards);
		
		console.log("-1. mycards: " + mycards);
			
		// SHUNZI
		var interval = 0;
		var prev = mycards[cards[0]];
		for(i = 1; i < cards.length && mycards[cards[i]]<53; i++){
			var tempinteval = 0;
			
			// console.log("cards[i]: " + cards[i]);
			// console.log("mycards[cards[i]]: " + mycards[cards[i]]);
			// console.log("(mycards[cards[i]]+11)%13: " + ((mycards[cards[i]]+11)%13));
			// console.log("(prev+9)%13: " + ((prev+9)%13));
			
			if((mycards[cards[i]]+11)%13 <= (prev+11)%13){
				tempinteval = 10;
			}else{
				tempinteval = (mycards[cards[i]]+11)%13 - (prev+11)%13 - 1;
			}
			interval += tempinteval;
			if(interval > numofw)
				break;
			prev = mycards[cards[i]];
		}
		
		console.log("interval: " + interval);
		
		if(interval <= numofw){
			var newcards = cards.slice(0,1);
			prev = mycards[cards[0]];
			console.log("0. prev: " + prev);
			console.log("0. mycards: " + mycards);
			console.log("0. cards: " + cards);
			for(i = 1; i < cards.length && mycards[cards[i]]<53; i++){
				console.log("1. newcards: " + newcards);
				if((mycards[cards[i]]+11)%13 - (prev+11)%13 == 1){
					newcards.push(cards[i]);
					prev = mycards[cards[i]];
					console.log("1. prev: " + prev);
				}else{
					console.log("1.5mycards[cards[i]]: " + mycards[cards[i]]);
					console.log("1.5prev: " + prev);
					var j = (mycards[cards[i]]+11)%13 - (prev+11)%13 - 1;
					prev = mycards[cards[i]];
					console.log("2. prev: " + prev);
					console.log("2. j: " + j);
					console.log("2. i: " + i);
					console.log("2. cards[i]: " + cards[i]);
					if(j > 0){
						for(; j > 0; j--){
							newcards.push(cards[cards.length-numofw]);
							numofw--;
						}
					}
					newcards.push(cards[i]);
				}
				console.log("2. newcards: " + newcards);
			}
			if(numofw > 0){
				if((mycards[newcards[newcards.length-1]]+11)%13 == 12){// = A
					newcards = ((numofw==2)?([cards[cards.length-2],cards[cards.length-1]]):([cards[cards.length-1]])).concat(newcards);
				}else if((mycards[newcards[newcards.length-1]]+11)%13 == 11 && numofw == 2){ // K
					newcards.push(cards[cards.length-2]);
					newcards = ([cards[cards.length-1]]).concat(newcards);
				}else{
					newcards = newcards.concat((numofw==2)?([cards[cards.length-2],cards[cards.length-1]]):([cards[cards.length-1]]))
				}
			}
			if(prevcards.length != 0 && mycards[newcards[newcards.length-1]] >= 53){
				var temp_cards = [];
				for(k in newcards){
					temp_cards.push(mycards[newcards[k]]);
				}
				//alert(prevcards);
				//alert(temp_cards);
				if(!isGreaterThan_SHUNZI(prevcards, temp_cards)){
					//alert("need 1");
					newcards = newcards.slice(newcards.length-1,newcards.length).concat(newcards.slice(0,newcards.length-1));
					//alert(newcards);
					if(mycards[newcards[newcards.length-1]] >= 53){
						temp_cards = [];
						for(k in newcards){
							temp_cards.push(mycards[newcards[k]]);
						}
						if(!isGreaterThan_SHUNZI(prevcards, temp_cards)){
							//alert("need 1");
							newcards = newcards.slice(newcards.length-1,newcards.length).concat(newcards.slice(0,newcards.length-1));
							//alert(newcards);
						}
					}
				}
				//alert("here");
			}
			//alert(newcards);
			return newcards;
		}
		
		console.log("cards: " + cards);
		/*
		if(compareCardsEq(cards[0],cards[1])){//A==B
			if(compareCardsEq(cards[1],cards[2])){//B==C
				return cards;//AAAXX
			}
			if(compareCardsEq(cards[1],cards[2]-1)){//B+1==C
				if(compareCardsEq(cards[2],cards[3])){//C==D
					return cards;//AABBXX
				}else if(compareCardsEq(cards[2],cards[3]-1)){//C==D
					if(cards.length!=6) alert("ERROR_199342312");
					var newcards = cards.slice(0,3);
					newcards.push(cards.length-1);
					newcards.concat(cards.slice(3,5));
					return newcards;//AABXCX
				}else{
					if(cards.length!=4) alert("ERROR_19928392");
					return cards;
				}
			}
			return cards;//AAX
		}
		if(compareCardsEq(cards[0],cards[1]-1)){//A+1==B
			if(compareCardsEq(cards[1],cards[2])){//B==C
				var newcards = cards.slice(0,1);
				newcards.push(cards.length-1);
				newcards.concat(cards.slice(1,3));
				if(cards.length==6)
					newcards.concat(cards.slice(3,5));
				return cards;//AXBB | AXBBCC | AXBBCX
			}
			if(compareCardsEq(cards[1],cards[2]-1)){//B+1==C
				if(compareCardsEq(cards[2],cards[3]-1)){//C+1==D
					//ABCDX | ABCDE | ABCDEX |ABCDXF
				}else if(compareCardsEq(cards[2],cards[3]-2)){//C+2==D
					if(cards.length!=6) alert("ERROR_199532312");
					var newcards = cards.slice(0,3);
					newcards.concat(cards.slice(4,6));
					newcards.concat(cards.slice(3,4));
					return newcards;//ABCXD | ABCXDE | ABCXDX
				}else{
					return cards;//ABCXX
				}
			}
			return cards;//AAX
		}
		if(compareCardsEq(cards[0],cards[1]-2)){//A+2==B
			if(compareCardsEq(cards[1],cards[2]-1)){//C+1==D
				var newcards = cards.slice(0,1);
				newcards.push(cards.length-1);
				newcards.push(cards.length-2);
				if(cards.length==6)
					newcards.push(cards.slice(3,4));
				return newcards;//AXXCD | AXXCDE
			}
			var newcards = cards.slice(0,1);
			newcards.push(cards[cards.length-1]);
			newcards.push(cards.slice(1,2));
			if(cards.length == 4) newcards.push(cards.length-2);
			return newcards;//AXC | AXCX
		}
		*/
	}

	function isGreaterThan_DANZHANG(prevCards, currCards){
		if(prevCards.length != 1 || currCards.length != 1)
			return false;
			
		if(currCards[0] >= 53 || prevCards[0] >= 53)
			return false;
			
		if(compareCardsEq(prevCards[0], 2))
			return false;
			
		if(compareCardsEq(currCards[0], prevCards[0]+1))
			return true;
			
		if(compareCardsEq(currCards[0], 2) && !compareCardsEq(prevCards[0], 2))
			return true;
			
		return false;
	}

	function isGreaterThan_DUIZI(prevCards, currCards){
		if(prevCards.length != 2 || currCards.length != 2)
			return false;
		
		if(!isDUIZI(prevCards))
			return false;
		if(!isDUIZI(currCards))
			return false;
			
		var num1 = prevCards[0];
		if(num1 >= 53)
			num1 = prevCards[1];
		var num2 = currCards[0];
		if(num2 >= 53)
			num2 = currCards[1];
		
		
		if(compareCardsEq(num1, 2))
			return false;
		if(compareCardsEq(num1+1, num2))
			return true;
		if(!compareCardsEq(num1, 2) && compareCardsEq(num2, 2))
			return true;
		
		return false;
	}
	
	function isGreaterThan_ZHADAN(prevCards, currCards){
		
		if(prevCards.length == 2 && prevCards[0] >=53 && prevCards[1] >=53){
			return false;
		}
		if(currCards.length == 2 && currCards[0] >=53 && currCards[1] >=53){
			return true;
		}
		
		if(prevCards.length < 2 || currCards.length < 2)
			return false;
		if(prevCards.length > currCards.length)
			return false;
		
		if(!isZHADAN(prevCards))
			return false;
		if(!isZHADAN(currCards))
			return false;
		
		if(prevCards.length < currCards.length)
			return true;
			
		var num1 = 0;
		for(i in prevCards){
			if(prevCards[i] < 53){
				num1 = prevCards[i];
				break;
			}
		}
		var num2 = 0;
		for(i in currCards){
			if(currCards[i] < 53){
				num2 = currCards[i];
				break;
			}
		}
		
		if((num2+10)%13 > (num1+10)%13)
			return true;

		return false;
	}

	function isGreaterThan_SHUNZI(prevCards, currCards){
		if(prevCards.length < 2 || currCards.length < 2)
			return false;
		if(prevCards.length != currCards.length)
			return false;
		if(!isSHUNZI(prevCards))
			return false;
		if(!isSHUNZI(currCards))
			return false;
		
		var num1 = 0;
		var count = 0;
		for(i = 0; i < prevCards.length; i++){
			if(prevCards[i] < 53){
				num1 = prevCards[i];
				break;
			}
			count ++;
		}
		num1 -= count;
		
		var num2 = 0;
		count = 0;
		for(i = 0; i < currCards.length; i++){
			if(currCards[i] < 53){
				num2 = currCards[i];
				break;
			}
			count ++;
		}
		num2 -= count;
		
		if((num2+10)%13 == (num1+10)%13 + 1)
			return true;

		return false;
	}


	function isGreaterThan_LIANDUI(prevCards, currCards){
		if(prevCards.length < 3 || currCards.length < 3)
			return false;
		if(prevCards.length != currCards.length || currCards.length%2 != 0)
			return false;
		
		if(!isLIANDUI(prevCards))
			return false;
		if(!isLIANDUI(currCards))
			return false;
		
		var num1 = 0;
		var count = 0;
		for(i = 0; i < prevCards.length; i+=2){
			if(prevCards[i] < 53){
				num1 = prevCards[i];
				break;
			}
			count ++;
		}
		num1 -= count;
		
		var num2 = 0;
		count = 0;
		for(i = 0; i < currCards.length; i+=2){
			if(currCards[i] < 53){
				num2 = currCards[i];
				break;
			}
			count ++;
		}
		num2 -= count;
		
		if((num2+10)%13 > (num1+10)%13)
			return true;

		return false;
	}

	function isValid(cards, prevcards){
	
		console.log("isValid prevcards: " + prevcards);
		console.log("isValid cards: " + cards);
		//alert(prevcards);
		
		var replacedCards = [];
		for(i in cards){
			replacedCards.push(mycards[cards[i]]);
		}
		
		console.log("isValid replacedCards: " + replacedCards);
		
		if(prevcards.length == 0){
			if(isDANZHANG(replacedCards))
				return "DANZHANG";
			if(isZHADAN(replacedCards))
				return "ZHADAN";
			if(isDUIZI(replacedCards))
				return "DUIZI";
			if(isSHUNZI(replacedCards))
				return "SHUNZI";
			if(isLIANDUI(replacedCards))
				return "LIANDUI";
			return "NOTVALID";
		}else{
			if(isDANZHANG(prevcards)){			//alert("DANZHANG");
				if(isDANZHANG(replacedCards))
					if(isGreaterThan_DANZHANG(prevcards, replacedCards))
						return "DANZHANG";
				if(isZHADAN(replacedCards))
					return "ZHADAN";
			}else if(isDUIZI(prevcards)){			//alert("DUIZI");
				if(isDUIZI(replacedCards))
					if(isGreaterThan_DUIZI(prevcards, replacedCards))
						return "DUIZI";
				if(isZHADAN(replacedCards))
					return "ZHADAN";
			}else if(isSHUNZI(prevcards)){			//alert("SHUNZI");
				if(isSHUNZI(replacedCards))
					if(isGreaterThan_SHUNZI(prevcards, replacedCards))
						return "SHUNZI";
				if(isZHADAN(replacedCards))
					return "ZHADAN";
			}else if(isLIANDUI(prevcards)){			//alert("LIANDUI");
				if(isLIANDUI(replacedCards))
					if(isGreaterThan_LIANDUI(prevcards, replacedCards))
						return "LIANDUI";
				if(isZHADAN(replacedCards))
					return "ZHADAN";
			}else if(isZHADAN(prevcards)){			//alert("ZHADAN");
				if(isZHADAN(replacedCards))
					if(isGreaterThan_ZHADAN(prevcards, replacedCards))
						return "ZHADAN";
			}
			return "NOTVALID";
		}
	}
	
	function isSHUNZI(replacedCards){
		if(replacedCards.length < 3)
			return false;
		var realnum = 0;
		for(i in replacedCards){
			if(replacedCards[i] < 53){
				realnum = i;
				break;
			}
		}
		/*
		for(i=Number(realnum-1); i>=0; i--){
			if(replacedCards[i] < 53 && (replacedCards[realnum]+9)%13 != (replacedCards[i]+9)%13 + (realnum-i)){
				return false;
			}
		}
		*/
		for(i=Number(realnum) + 1; i<replacedCards.length; i++){
			if(replacedCards[i] < 53 && (replacedCards[realnum]+11)%13 != (replacedCards[i]+11)%13 + (realnum-i)){
				return false;
			}
		}
		return true;
	}
	
	function isDUIZI(replacedCards){
		if(replacedCards.length != 2)
			return false;
		if(replacedCards[0]>=53 && replacedCards[1] >= 53)
			return false;
		if(replacedCards[0]>=53 || replacedCards[1] >= 53)
			return true;
		if(compareCardsEq(replacedCards[0],replacedCards[1]))
			return true;
		return false;
	}

	function isLIANDUI(replacedCards){
		if(replacedCards.length != 4 && replacedCards.length != 6)
			return false;
		if(!compareCardsEq(replacedCards[0], replacedCards[1]) && replacedCards[0]<53 && replacedCards[1]<53)
			return false;
		if(!compareCardsEq(replacedCards[2], replacedCards[3]) && replacedCards[2]<53 && replacedCards[3]<53)
			return false;
		if(replacedCards[2]>=53 && replacedCards[3]>=53)
			return false;
		if(replacedCards.length == 6 && !compareCardsEq(replacedCards[4], replacedCards[5]) && replacedCards[4]<53 && replacedCards[5]<53)
			return false;
		var i = 0;
		for(i in replacedCards){
			if(replacedCards[i] <53)
				break;
		}
		if(((replacedCards[i] + (replacedCards.length/2) - 1 - Math.floor(i/2))+11)%13 < (replacedCards[i] - Math.floor(i/2) + 11)%13)
			return false;
		i = replacedCards[i] - Math.floor(i/2);
		
		var even=0;
		for(j in replacedCards){
			if(replacedCards[j] < 53){
				if(!compareCardsEq(replacedCards[j], i)){
					return false;
				}
			}
			if(even){
				i++;
			}
			even = (even+1)%2;
		}
		
		return true;
	}
	
	function isZHADAN(replacedCards){
		if(replacedCards.length == 2 && replacedCards[0] >=53 && replacedCards[1] >=53)
			return true;
		if(replacedCards.length < 3)
			return false;
		var realnum = 0;
		for(i in replacedCards){
			if(replacedCards[i] < 53){
				realnum = i;
				break;
			}
		}
		for(i=Number(realnum) + 1; i<replacedCards.length; i++){
			if(replacedCards[i] < 53 && (replacedCards[realnum]+11)%13 != (replacedCards[i]+11)%13){
				return false;
			}
		}
		return true;
	}
	
	function isDANZHANG(replacedCards){
		if(replacedCards.length == 1 && replacedCards[0] < 53)
			return true;
		return false;
	}