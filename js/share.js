var shareAct={
	textArr:[
		'哇！真正的吃货就服你哟！还能好好的穿漂亮衣服吗？能吃是很好，会瘦更重要~',
		'哇！您对美食的抵抗力很棒，想瘦的更加完美，在抵抗美食诱惑的道路上，需再接再厉哦！',
		'哇！您对美食的抵抗力实在太强大了，对于可以瘦出新高度的你，好朋友还能和你愉快的聚餐吗？',
	],
    comfortArr:[
        '安慰她(他)',
        '赞美她(他)',
    ],
	init:function(){
        var i=decodeURIComponent(window.location.href).match('score').index+6;
        var score=decodeURIComponent(window.location.href).substring(i,i+2)
		$('.resultNav p span').html(score);
		var percent='',text='',comfortText;
		if(score<=60){
			percent='25%';
			text=this.textArr[0];
            comfortText=this.comfortArr[0];
		}
		else if(score<=80&&score>60){
			percent='50%';
			text=this.textArr[1];
            comfortText=this.comfortArr[1];
		}
		else{
			percent='98%';
			text=this.textArr[2];
            comfortText=this.comfortArr[1];
		}
		$('.resultNav h1 span').html(percent);
        $('.shareText p').html(text);
		$('.againBtn').html(comfortText);
	},
	getParticipant:function(){
        getParticipant('/tenSecond/Mod/pv',json,'.peopleCount');
    },
    getActData:function(){
        $.getJSON(_ACTHOST+'/tenSecond/Mod/actInfo?callback=?',json,function(data){
            shareFun(data.data);
            if(data.data){//活动已结束，页面底部提示
            	$('title').text(data.data.title);
            	if(data.data.state==-1){
            		$('.page_1_foot').css('display','block'); 
            	}
            }
        })
    },
    testBindA:function(){
    	$('.shareBtn').on('click',function(){
    		window.location.href='https://act.hxsapp.com/html/tenSecondsTest/index.html?id='+$_GET('id')+'&shareType=1';
    	}) 
    },
    shareBindA:function(){
    	$('.againBtn').on('click',function(){
    		window.location.href='http://app.hxsapp.com/html/channel_statistics.html?channel_id=87';
    	})
    }
}
window.onload=function(){
	init();
    getclientH('.index_warp');
    shareAct.init();
    shareAct.getParticipant();
    shareAct.getActData();
    shareAct.testBindA();
    shareAct.shareBindA();
}