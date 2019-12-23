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
	cList=document.cookie.split("; ");
	cPair='';
	value='';
	newSet='';
	newValue='';
	index='x';
	item=v.substring(0,v.indexOf("+"));
	qty=Number(v.substring(v.indexOf("+"),v.length));
	for(i=0;i<cList.length;i++) {
		if(cList[i].substring(0,c.length)==c) {
			cPair=cList[i].split("=");
			value=cPair[1];
		}
	}
	if(value!=null&&value!='') {
		vList=value.split("|");
		for(i=0;i<vList.length;i++) {
			vSet=vList[i].split("+");
			if(vSet[0]==item) {
				index=i;
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
				vList.splice(index,1);
			}
		}
		if(index=='x'&&(a=="Add"||a=="Replace")) {
			//if there is no matching item in value...
			newSet=item+"+"+qty;
		}
		if(a!="Remove"||a!="Delete") {
			vList.push(newSet);
		}
		newValue=vList.join("|");
	}
	return newValue
}
