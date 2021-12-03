
let parsnickname= location.href.split("?"); 
let ses = JSON.parse(sessionStorage.getItem("login"));
//let nickname = parsnickname[2];

let nickname = decodeURIComponent(parsnickname[2]);
//alert(parsnickname[2]);
//alert(nickname);
$( document ).ready(function() {

	$.ajax({
		url:"http://localhost:3000/userlist",
		type:"get",
		async:false,
		data : {"nickname":nickname},
		success: function(list){
			
			
			$('#profile-nickname').html(list[0].nickname);
			$('#profile-birth').html(list[0].birth);
			$('#profile-email').html(list[0].email);
			$('#intro').html(list[0].introduce);
			$('#nickname').val(list[0].nickname);
			$("#img-thumbnail1").attr("src","http://localhost:3000/profile/"+list[0].filename);
			//alert(list[0].nickname);
			//alert(nickname);
			//alert(JSON.stringify(list));
		},
		error: function(){
			alert(error);
		}

	})
	
});

function getLike(seq){
	let result = 0;
	
	$.ajax({
		url:"http://localhost:3000/feedlike",
		type:"get",
		async:false,
		data : { "seq":seq },
		success:function(resp){
			
			result = resp;
		},
		error:function(){
			alert(error);
		}
		
	});
	
	return result;
}
function getCommentCnt(seq){
	let result = 0;
	
	$.ajax({
			url:"http://localhost:3000/commentcount",
			type:"get",
			async:false,
			data : {"seq":seq},
			success: function(resp){
				
				result = resp;
				
			},
			error: function(){
				alert(error);
			}
	
		});
		return result;
}

const listElm = document.querySelector('.infinite-list');
listElm.addEventListener('scroll', () => {
  if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
	  getNextFeed();
  }
});

var currentPage = 1;
var rowsPerPage = 10;
var totalCnt = 0;
$(document).ready(function(){
	getNextFeed()
});

function getNextFeed(){
	if(currentPage != 1 && Math.ceil(totalCnt/rowsPerPage) < currentPage){
		return;
	}
	var params = {"currentPage" : currentPage,
				  "nickname" 		  : nickname,
				  "rowsPerPage" : rowsPerPage
				 };
	
	
	$.ajax({
		url:"http://localhost:3000/myfeed?"+jQuery.param(params),
		type: "get",
		success: function(list){
			
			totalCnt = list[0].totcnt;
			var html = [];
			$.each(list, function(index, item){ 
				let likecount = getLike(item.seq);
				let commentcount = getCommentCnt(item.seq);
				
				html.push("<div class='feed-frame'>");				
				html.push("<a id='nick' href='base.html?profile.html?"+item.nickname + "'>" + item.nickname+ "</a>&nbsp;&nbsp;");
				html.push("<span id='regi'>"+ item.regDate+"</span><br>");
				if(item.filename){
					html.push("<div id=feed-img-frame><img id=feed-img src='http://localhost:3000/upload/"+item.filename+"' onerror='this.src=`images/NoPhoto.png`;'/></div>");
				}
				html.push("<button id='btn1' onclick='likebtn(`"+nickname+"`,`"+item.seq+ "`,this" +")'><img id='img1' src='images/heart.png'></button>");
				html.push("<span id=likecount1>"+likecount+"</span>&nbsp;&nbsp;&nbsp;");
				html.push("<button id='commentPopBtn' onclick='comment_pop("+String(item.seq) + ")'><img id='commenticon' src='images/commentIcon.png'></button><span id='cntComment'>"+commentcount+"</span><br>")
				html.push("<div id='feedcontent'>" + item.content+"</div><br>");	
				html.push("태그 : " + item.tag+"<br>");
				html.push("</div><br><br>");
			});
			
			$('.infinite-list').append(html.join(''));
			currentPage++;
//			alert(JSON.stringify(list));
// 			document.getElementById('json').innerHTML=JSON.stringify(list);
			
		},
		error:function(){
			alert('error');
		}
	});
}


function comment_pop(seq) {
	window.open("comment.html?"+seq , '댓글보기', 'top=10, left=10, width=500, height=600, status=no, menubar=no')
};

function update_profile_pop() {
	const popUrl = "updateProfileImg.html";
	const popOption = "top=100, left=100, width=490px, height=500px, status=no, menubar=no";
	window.open(popUrl,'프로필사진수정',popOption);
}

function message_pop(){
	const popUrl = "message.html?"+nickname;
	const popOption = "top=100, left=100, width=500px, height=500px, status=no, menubar=no";
	window.open(popUrl,'메세지보내기',popOption);
};
function feed_write_pop() {
	const popUrl = "Kwak/feedWrite1.html";
	const popOption = "top=100, left=100, width=700px, height=800px, status=no, menubar=no";
	window.open(popUrl,'피드작성하기',popOption);
}
function likebtn(nickname, feedSeq, obj) {
	$.ajax({
		url:"http://localhost:3000/like",
		type:"post",
		data : {"nickname":nickname, "feedSeq":feedSeq, "isLike": 1},
		success: function(resp){
			//alert(resp);
			if(resp == 'OK'){
				var num = Number(jQuery(obj).siblings('span#likecount1').text())+1;
				jQuery(obj).siblings('span#likecount1').text(num);
				alert("좋아요를 누르셨습니다.");
			}
			if(resp == 'already'){
				alert("이미 좋아요를 누르셨습니다.");
			}
			
		},
		error: function(){
			alert(error);
		}

	})
};

$("#postIntro").click(function(){
	$.ajax({
		url:"http://localhost:3000/updateIntro",
		type:"get",
		data:$("#introData").serialize(),
		success:function(resp){
			
			if(resp == "OK"){
				alert('intro를 수정했습니다.');
				window.location.reload();
			}else{
				alert('intro를 수정하지 못했습니다.');
			 }
			},
			error:function(){
				alert('error');			
		}
	});
});

$("#updateIntro").click(function(){
	
		$("#updateForm").show();	
	
});
/*alert(ses.id);*/
$( document ).ready(function() {
let id1 = $("#profile-nickname").text();
//alert(id1);
	if(ses.id==id1){
		$("#imgPopBtn").show();
		$("#updateIntro").show();
		$("#updateInterest").show();
		$("#feedWriteBtn").show();
	}else{
		$("#imgPopBtn").hide();
		$("#updateIntro").hide();
		$("#updateInterest").hide();
		$("#feedWriteBtn").hide();
	}
});
/*$( document ).ready(function() {
	if(ses.id==){
		
	}else{
		
	}
});*/