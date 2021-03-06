let ses = JSON.parse(sessionStorage.getItem("login"));
$("#profile-nickname").html(ses.nickname);
$("#profile-birth").html(ses.birth);
$("#profile-email").html(ses.email);
$("#intro1").html(ses.introduce);

//alert(JSON.stringify(ses));
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
				  "nickname" 		  : ses.nickname,
				  "rowsPerPage" : rowsPerPage
				 };
	
	
	$.ajax({
		url:"http://localhost:3000/myfeed?"+jQuery.param(params),
		type: "get",
		success: function(list){
			
			totalCnt = list[0].totcnt;
			var html = [];
			$.each(list, function(index, item){ 
				let nickname = String(ses.nickname);
				let likecount = getLike(item.seq);
				
				html.push("<div class='feed-frame'>");				
				html.push("<a id='nick' href='profile.html?"+item.nickname + "'>" + item.nickname+ "</a>&nbsp;&nbsp;");
				html.push("<span id='regi'>"+ item.regDate+"</span><br>");
				html.push("<div id=feed-img-frame><img id=feed-img src='images/"+item.filename+"' onerror='this.src=`images/error.png`;'/></div>");
				html.push("<button id='btn1' onclick='likebtn(`"+nickname+"`,`"+item.seq+ "`)'><img id='img1' src='images/heart.png'></button>");
				html.push("<span id=likecount1>"+likecount+"</span>&nbsp;&nbsp;&nbsp;");
				html.push("<button id='commentPopBtn' onclick='comment_pop("+String(item.seq) + ")'><img id='commenticon' src='images/commentIcon.png'></button><br>")
				html.push("<div id='feedcontent'>" + item.content+"</div><br>");	
				html.push("?????? : " + item.tag+"<br>");
				html.push("</div>");
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





	


function update(action,obj){
	if(action == 'modify'){
		//readonly ??????
		//onclick="update('update');
		//
		jQuery(obj).attr('readonly',false);
		jQuery(obj).attr('onclick',"update('update',this)");
	}else if(action == 'update'){
		//ajax ??????
		
		jQuery(obj).attr('readonly',true);
	}
}

function comment_pop(seq) {
	window.open("comment.html?"+seq , '????????????', 'top=10, left=10, width=500, height=600, status=no, menubar=no')
};

function feed_write_pop() {
	const popUrl = "Kwak/feedWrite.html";
	const popOption = "top=100, left=100, width=700px, height=800px, status=no, menubar=no";
	window.open(popUrl,'??????????????????',popOption);
}

function likebtn(nickname, feedSeq) {
	$.ajax({
		url:"http://localhost:3000/like",
		type:"post",
		data : {"nickname":nickname, "feedSeq":feedSeq, "isLike": 1},
		success: function(resp){
			//alert(resp);
			if(resp == 'OK'){
				alert("???????????? ??????????????????.");
			}
			if(resp == 'already'){
				alert("?????? ???????????? ??????????????????.");
			}
			
		},
		error: function(){
			alert(error);
		}

	})
};