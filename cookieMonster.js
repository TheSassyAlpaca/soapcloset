//c=COOKIE NAME, a=ACTION to be taken (delete[entire cookie],remove[item],add[item],replace[entire value]),v=VALUE change,l=LIFE in seconds/milliseconds
//value chain=ITEM+QTY
function updateCookie(c,a,v,l) {
	//document.cookie=c+"="+getCookieValue(c)+"";
	//console.log(getCookieValue(c));
	//expiry=new Date()+l;
	document.cookie = c+"="+getCookieValue(c,a,v)+"; expires="+new Date(new Date().getTime()+l)+"; path=/; Domain=thesassyalpaca.com";
	console.log(document.cookie);
}

function getCookieValue(c,a,v) {
	console.log(c,a,v);
	//get cookie name=value pairs
	cList=document.cookie.split("; ");
	console.log(cList);
	cPair='';
	value='';
	newSet='';
	newValue='';
	index='x';
	//split 'v' into product and qty
	item=v.substring(0,v.indexOf("+"));
	qty=Number(v.substring(v.indexOf("+"),v.length));
	console.log(item,qty);
	//cycle through cookie pairs to find pair with matching name 'c'
		//result 'value' could be blank?
	for(i=0;i<cList.length;i++) {
		if(cList[i].substring(0,c.length)==c) {
			cPair=cList[i].split("=");
			value=cPair[1];
			console.log(cPair);
		}
	}
	//use cookie's value to determine if this stage is needed... why?
		//value could be multiple name value pairs
	if(value!=null&&value!='') {
		//create list of cookie's value as name=value pairs
		vList=value.split(",");
		//create new list
		newvList=[];
		//search through list of pairs to find pair relevant to action being taken
		for(i=0;i<vList.length;i++) {
			//only bother with pairs that exist...
			if(vList[i].length>0) {
				//split pairs into product and qty
				vSet=vList[i].split("+");
				//check if product matches relevant product
				if(vSet[0]!=item&&(vSet[1]!=''&&vSet[1]!='undefined'&&vSet[1]!=null)) {
					newvList.push(vSet[0]+'+'+vSet[1]);
					/*
					if(a=="Replace") {
						newSet=item+"+"+qty;
					}
					if(a=="Add") {
						newSet=item+"+"+(Number(vSet[1])+qty);
						console.log("I am adding "+qty+" to "+vSet[1]+".");
					}
					if(a=="Subtract") {
						newSet=item+"+"+(Number(vSet[1])-qty);
						console.log("I am subtracting "+qty+" from "+vSet[1]+".");
					}
					if(a=="Remove"||a=="Delete") {
						newSet='';
					}
					*/
					//vList.splice(index,1);
				}
			}
		}
		newvList.push(item+'+'+qty);
		/*
		if(index=='x'&&(value==''||value==null)&&(a=="Add"||a=="Replace")) {
			//if there is no matching item in value...
			newSet=item+"+"+qty;
		}
		if(a!="Remove"||a!="Delete") {
			//vList.push(newSet);
			newvList.push(newSet);
		}
		//newValue=vList.join(",");
		*/
		newValue=newvList.join(",");
	} else {
		newValue=item+"+"+qty;
	}
	return newValue
}
