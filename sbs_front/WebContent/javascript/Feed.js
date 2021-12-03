let ses = JSON.parse(sessionStorage.getItem("login"));

const listElm = document.querySelector('.infinite-list');

listElm.addEventListener('scroll', () => {
  if(listElm.scrollTop + listElm.clientHeight + 50 >= listElm.scrollHeight) {
	console.log('nextfeed!');
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
				 "rowsPerPage" : rowsPerPage
				 };
	$.ajax({
		url:"http://localhost:3000/newsfeed?"+jQuery.param(params),
		type: "get",
		success: function(list){
			
			totalCnt = list[0].totcnt;
			var html = [];
			$.each(list, function(index, item){ 
				let nickname = String(ses.nickname);
				let likecount = getLike(item.seq);
				let commentcount = getCommentCnt(item.seq);
				
				html.push("<div class='feed-frame'>");				
				html.push("<div><a id='nick' href='base.html?myfeed.html?"+item.nickname + "'>" + item.nickname+ "</a>&nbsp;&nbsp;");
				//html.push("<div><a id='nick' href='base.html?myfeed.html?"+item.nickname + "'>" + item.nickname+ "</a>&nbsp;&nbsp;");
				html.push("<span id='regi'>"+ item.regDate+"</span></div>");
				if(item.filename){
				html.push("<div id=feed-img-frame><img id=feed-img src='http://localhost:3000/upload/"+item.filename+"' onerror='this.src=`images/NoPhoto.png`;'/></div>");
				}
				html.push("<div><button id='btn1' onclick='likebtn(`"+nickname+"`,`"+item.seq+ "`,this" +")'><img id='img1' src='images/heart.png'></button>");
				html.push("<span id=likecount1>"+likecount+"</span>&nbsp;&nbsp;&nbsp;");
				html.push("<button id='commentPopBtn' onclick='comment_pop("+String(item.seq) + ")'><img id='commenticon' src='images/commentIcon.png'></button><span id='cntComment'>"+commentcount+"</span></div>")
				html.push("<div id='feedcontent'>" + item.content+"</div><br>");	
				html.push("<div>태그 : " + item.tag+"<br></div>");
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

function comment_pop(seq) {
	window.open("comment.html?"+seq , '댓글보기', 'top=10, left=10, width=500, height=600, status=no, menubar=no')
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


