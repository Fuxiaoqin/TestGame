var i=decodeURIComponent(window.location.href).match('score').index+6;
var score=decodeURIComponent(window.location.href).substring(i,i+2);
var clickCount=0;
var json={
	act_id:$_GET('id'),
    // user_id:54,//测试用
    sess_token:$_GET('sess_token'),
    model_idfa:$_GET('medel_idfa'),
    result:1,
};
var resultAct={
	textArr:[
		'哇！真正的吃货就服你哟！还能好好的穿漂亮衣服吗？能吃是很好，会瘦更重要~',
		'哇！您对美食的抵抗力很棒，想瘦的更加完美，在抵抗美食诱惑的道路上，需再接再厉哦！',
		'哇！您对美食的抵抗力实在太强大了，对于可以瘦出新高度的你，好朋友还能和你愉快的聚餐吗？',
	],
	spanArr:[
		'SOSO来为您送享瘦福利啦~~',
		'SOSO为您派发一份鼓励福利~~',
		'SOSO都忍不住给您派发福利啦~~',
	],
	shareArr:[
		'向好友求安慰 才可以抽奖哦',
		'向好友炫耀 才可以抽奖哦',
		'向好友炫耀 才可以抽奖哦',
	],
	shareBtn:[
		'分享给好友求安慰',
		'向好友炫耀'
	],
	init:function(){
		$('.resultNav p span').html(score);
		var percent='',text='',spantext='',shareText='',shareBtntext='';
		if(score<=60){
			percent='25%';
			text=this.textArr[0];
			spantext=this.spanArr[0];
			shareText=this.shareArr[0];
			shareBtntext=this.shareBtn[0];
		}
		else if(score<=80&&score>60){
			percent='50%';
			text=this.textArr[1];
			spantext=this.spanArr[1];
			shareText=this.shareArr[1];
			shareBtntext=this.shareBtn[1];
		}
		else{
			percent='98%';
			text=this.textArr[2];
			spantext=this.spanArr[2];
			shareText=this.shareArr[2];
			shareBtntext=this.shareBtn[1];
		}
		$('.resultNav h1 span').html(percent);
		$('.resultNav div').html(text);
		$('.resultText span').html(spantext);
		$('.resultFooter p').html(shareText);
		$('.shareBtn').html(shareBtntext);
	},
	getParticipant:function(){
        getParticipant('/tenSecond/Mod/pv',json,'.peopleCount');
    },
    //获取图像昵称接口
    getUserInfo:function(){
    	$.getJSON(_ACTHOST+'/tenSecond/Mod/ubi?callback=?',json,function(data){
    		if(data.code==200){
    			$('.resultNav img').attr('src',data.data.head_img);
    			var nickname=data.data.nickname.length>7?data.data.nickname.slice(0,7)+'...':data.data.nickname;
    			$('.resultTitle p').html(nickname);
    		}
   		})
    },
	getActData:function(){
		$.getJSON(_ACTHOST+'/tenSecond/Mod/actInfo?callback=?',json,function(data){
				var shareLink = 'https://act.hxsapp.com/html/tenSecondsTest/share.html?id='+$_GET('id')+ '&shareType=1&score'+encodeURIComponent('='+score);
			    var share_url = {share_url: window.location.href};
			    var shareTitle = data.data.title;
			    var shareImages = data.data.images;
			    var shareDescr = data.data.descr;
			    var shareType = data.data.share_type;
			    //根据不同好享瘦app版本发送对应的客户端跳转协议
			    myUserAgent(function(Version){
			        if(Version == 2.1 && Version){
			            window.location.href = 'hxsapp://visible_share_btn|'+ shareTitle + '|' +shareLink + '|' + shareImages + '|' + shareDescr + '|' + shareType;
			        }else if(Version >= 2.2 && Version <=2.6 && Version){
			            window.location.href = 'https://hxsapp_visible_share_btn#'+ shareTitle + '#' + shareLink + '#' + shareImages + '#' + shareDescr + '#' + shareType;
			        }else if(Version > 2.6 && Version){
			            window.location.href = 'https://hxsapp_visible_act_share_btn#'+ shareTitle + '#' + shareLink + '#' + shareImages + '#' + shareDescr + '#' + shareType;
			        }
			    })  

			    //qq分享
			    $('#qqShareContent').attr('content',decodeURIComponent(shareTitle));
			    $('#qqShareDes').attr('content','好享瘦APP  专享福利');
			    $('#qqShareImg').attr('content',shareImages); 
			    //分享方法
			    wxSecShare(shareTitle,shareDescr,shareLink,shareImages);
		 })
	},
	btnBindA:function(){
		var me=this;
		$('.button').on('click',function(){
			var json={
				act_id:$_GET('id'),
			    // user_id:54,//测试用
			    sess_token:$_GET('sess_token'),
			    model_idfa:$_GET('medel_idfa'),
			    result:1,
			    click_count:clickCount
			};
			$('.resultSection .text').css({'animation':''});
			$('.remindBg').css({'animation':''});
			$('.frame').css({'animation':''});
			if($_GET('shareType') == 1){
		        $('.frame').show(50);
		        $('.remindBg').show(100)
		        $('.remindBg').css({'animation':'bounceIn 1s 1 linear'});
		        $('.shareBg').hide();
		        // $('.confirm').attr('href','http://app.hxsapp.com/html/channel_statistics.html?channel_id=87');
		        $('.confirm').click(function(){
		        	$('.frame').hide();
			        $('.remindBg').hide();
			        window.location.href='http://app.hxsapp.com/html/channel_statistics.html?channel_id=87';
		        })
		        $('.cancel').click(function(){
			        $('.frame').hide();
			        $('.remindBg').hide();
		    	})
		        return false;
		    }
		    else{//请求后台接口
		    	$.getJSON(_ACTHOST+'/tenSecond/Mod/draw?callback=?',json,function(data){
		    		clickCount++;
		    		data.code = 200;
		    		if(data.code==608){
		    			var text=score<=60?'分享给好友求安慰,才可以抽奖哦!':'分享给好友求炫耀，才可以抽奖哦!';
    					toastTip('.toast_tip',text,2500);
    					return;
		    		}
		    		if(data.code==200){
		            	$('.resultSection .text').html('恭喜您,<br>抽中一张免费摩拜单车劵<a>在"我的-我的活动福利"查看</a>');
		            	$('.resultSection .text').css({'animation':'bounceIn 1s 1 linear',top:'10%'});
		            }
		            else if(data.code==607){
		            	$('.resultSection .text').html('<div></div><br>很遗憾,未抽中');
		            	$('.resultSection .text').css({'animation':'bounceIn 1s 1 linear',top:'35%'});
		            }
		    		else{
		    			toastTip('.toast_tip',data.msg,2500);
	                    return;
		    		}
	       		})
		    }
		    
		})
	},
	againTest:function(){
		$('.againBtn').on('click',function(){
			if($_GET('shareType')==1){
				window.location.href='https://act.hxsapp.com/html/tenSecondsTest/test.html?id='+$_GET('id')+'&shareType=1';
			}
			else{
				window.history.go(-1);
			} 
		})
	},
	shareFun:function(){
		$('.shareBtn').on('click',function(){
			$('.shareBg').css({'animation':''});
			$('.frame').css({'animation':''});
			$('.frame').show(50);
			$('.shareBg').show(100);
			$('.frame').css({'animation':'fadeInDown 1s 1 linear'});
			$('.remindBg').hide();
			$('.frame').on('click',function(){
				$('.frame').css({'animation':'fadeOutUp 1s 1 linear'}).hide(1050);
			})
		})
	},
}

window.onload=function(){
	$.getJSON(_ACTHOST+'/tenSecond/Mod/clearClick?callback=?',json,function(data){});
	init();
	$('.frame').hide();
	$('.shareBg').css({'animation':''});
	$('.frame').css({'animation':''});
	$('.remindBg').css({'animation':''});
	getclientH('.index_warp');
	getclientH('.frame');
	resultAct.init();
	resultAct.getParticipant();
	resultAct.getUserInfo();
	resultAct.getActData();
	resultAct.btnBindA();
	resultAct.againTest();
	resultAct.shareFun();
}