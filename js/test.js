var testAct={
    timer: null,
    checked: false,
    score: 100,
    getActData:function(){
        var me = this;
        $.getJSON(_ACTHOST + '/tenSecond/Mod/actInfo?callback=?', json, function(data){
            shareFun(data.data);
            me.randomImg()
            // if(data.code == 200){//活动未开始、不存在、参数异常.
            //     if(data.data.state == -1){
            //         $('.page_1_foot').css('display', 'block'); 
            //     } 
            // }
            // me.testBindA(data.code, 0, data.msg);
            me.testBindA(200, 0, data.msg);
        })
    },
    getParticipant:function(){
        getParticipant('/tenSecond/Mod/pv',json,'.peopleCount');
    },
    testBindA:function(code, n, msg){
        var me=this;
        var token = $_GET('sess_token');
        $('.testBtn').on('click',function(){
            $('.d_foot').hide();
            $('.testBtn').css({'animation':''});
            if( $_GET('shareType') == 1 || ( !( (token && token.length < 10 || (locationType != -1 && !token)) ) ) ){
                $('.frame').css({'animation':'fadeOutUp 1s 1 linear'}).hide(1050);
                // if(code!=200){
                //     toastTip('.toast_tip',msg,2500);
                //     return;
                // }else{
                    if(n==1){me.randomImg()}
                    me.imgBindA();
                    var time=10;
                    me.timer=setInterval(function(){
                        if(time<=0){
                            clearInterval(me.timer);
                            me.timer=null;
                            // if(!$('.section li').hasClass('checked')){
                            if(!document.getElementsByClassName('checked')[0]){
                                $('.testBtn').html('重新测试').css({'animation':'bounceIn 1s 1 linear'});
                                $('.frame p').html('很遗憾 你未选中任何食物')
                                $('.frame').css({'animation':'fadeInDown 1s 1 linear'}).show(1050);
                                $('.time p').html('10"');
                                me.testBindA(200,1);
                                $('.page2 .section').off('touchstart');
                                return;
                            }
                            else{
                                $('.testBtn').html('查看结果').css({'animation':'bounceIn 1s 1 linear'});
                                $('.testBtn').on('click',function(){
                                    me.score=me.score>98?98:me.score;
                                    window.location.href='https://act.hxsapp.com/html/tenSecondsTest/testResult.html?'+window.location.href.split('?')[1]+'&'+encodeURIComponent('score=')+encodeURIComponent(me.score);
                                })
                                $('.page2 .section').off('touchstart')
                                return;
                            }
                        }
                        time--;
                        $('.time p').html(time+'"');
                        $('.testBtn').off('click');
                    },1000); 
                // } 
            }
            else{ 
                myUserAgent(function(Version){
                    if(Version && Version >= 2.5){
                        window.location.href='https://hxsapp_showloginpage';
                        return false;
                    }
                })
            }
        })
    },
    imgBindA:function(){
        var me=this;
        $('.page2 .section').on('click',function(e){
            var target=e.target;
            if(target.nodeName=='IMG'){
                if(!$(target.parentNode).hasClass('checked')){
                    $(target.parentNode).addClass('checked');
                    $(target).siblings('img').show(1);
                    if(target.alt==1||target.alt==2||target.alt==5||target.alt==9||target.alt==4||target.alt==6||target.alt==3||target.alt==7||target.alt==10||target.alt==8){
                        me.score-=5
                    }
                    else{
                        me.score+=5
                    }
                }
                else{
                    $(target.parentNode).removeClass('checked');
                    var alt=$(target).siblings('img').get(0).alt;
                    if(alt==1||alt==2||alt==5||alt==9||alt==4||alt==6||alt==3||alt==7||alt==10||alt==8){
                        me.score+=5
                    }
                    else{
                        me.score-=5
                    }
                    $(target).hide()
                }
            }
        })
    },
    randomImg:function(){
        var box = $('.page2 .section');
        var obj=$('.page2 .section li'),ar = [];
        for(var i=0;i<obj.length;i++){ar.push(obj[i])};
        function sortRandom(a, b) { return Math.random() - .5; }
        ar.sort(sortRandom);
        box.html('');
        for (var i = 0; i < ar.length; i ++){ box.append(ar[i])};
    },
}
window.onload=function(){
    init();
    getclientH('.index_warp');
    getclientH('.frame');
    $('.frame .sandClock').css('animation','slowroll 1s infinite');
    testAct.getActData();
    testAct.getParticipant();
}
