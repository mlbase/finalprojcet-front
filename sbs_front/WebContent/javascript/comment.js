
let ses = JSON.parse(sessionStorage.getItem("login"));
//alert(JSON.stringify(ses));

let parsing = location.href.split("?");
//alert(parsing[1]);
$("#feedSeq").val(parsing[1]);

function refreshPage(){
	window.location.reload();
}

function getLike(seq){
	let result = 0;
	
	$.ajax({
		url:"http://localhost:3000/commentlike",
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

$(document).ready(function(){
	$("#name").html(ses.nickname);
	$("#nickname").val(ses.nickname);
	$("#postcomment").on("click", function(){
		let params = $("#frm").serialize();
		
		$.ajax({
			url:"http://localhost:3000/comment",
			type:"post",
			data:params,
			success:function(resp){
				if(resp == "OK"){	
					alert("comment 업로드에 성공했습니다.");	
				}else{
					alert("comment 업로드에 실패했습니다.");
				}			
			},
			error:function(){
				alert('error');
			}
		});
		
	});
});

$.ajax({
	url:"http://localhost:3000/comment?feedSeq="+parsing[1],
	type:"get",
	success: function(list){
		//alert(JSON.stringify(list));
		var html = [];
		$.each(list, function(index, item){
			let nickname = String(ses.nickname);
			let likecount = getLike(item.seq);
			html.push("<div class='comment-box'>")
			html.push("<span id='nickname'>"+item.nickname+"</span>"+"&nbsp;&nbsp;&nbsp;"+"<span id=regdate>"+item.regDate+"</span>");
			html.push("<div id='content'>"+item.content+"</div>");
			
			html.push("<button id='btn1' item-seq="+"'"+item.seq+"'"+""+"onclick='likebtn(`"+nickname+"`,`"+item.seq+ "`)'><img id='img1' src='images/thumbsUp2.png'></button>");
			html.push("<span id=\"like_cnt\">"+likecount+"<span>");
			html.push("</div>")
		})
		$('.comments').append(html.join(''));
	},
	error:function(){
		alert('error');
	}
});

function likebtn(nickname, commentSeq) {
	
	var obj = null;
	$.each(jQuery('.comment-box > button'), function(index, item){
		if(jQuery(item).attr('item-seq') == commentSeq){
			obj = item;
		} 
	});
	obj = jQuery(obj).siblings('span#like_cnt');
	$.ajax({
		url:"http://localhost:3000/like",
		type:"post",
		data : {"nickname":nickname, "commentSeq":commentSeq, "isLike": 1},
		success: function(resp){
			//alert(resp);
			if(resp == 'OK'){
				var cnt = Number(obj.text())+1;
				jQuery(obj).text(cnt);
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

