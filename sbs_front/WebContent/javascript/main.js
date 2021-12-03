$(document).ready(function() {
	getNextFeed();
	getBookList();
	getSlider();
});

function getBookList() {

	$.ajax({
		url: "http://localhost:3000/bestsellerimage",
		type: "get",
		async : false,
		success: function(resp) {
		//	alert(JSON.stringify(resp));
			//let arParam = {};
			let ar =[];
			$.each(resp, function(index, item) {
				let data = "";
				data +="<div class='owl-item'>";
				data += "<div class='bbb_viewed_image'>";
				data +=	"<a href='base.html?singlePage.html?" + item.seq + "'><img id='detail' src=" + item.filename + "alt=''></a>";
				data +="</div>";
				data += "<div class='bbb_viewed_content text-center'><div class='bbb_viewed_price'>" + item.title + "</div>";
				data += "<div class='bbb_viewed_name'>" + item.writer + "</div>";
				data += "</div>";
				
				ar.push(data);
				$(".bbb_viewed_slider").html(ar);
				/*$("#title").html(item.title);
				$("#writer").eq(index).html(item.writer);
				console.log($("#writer").eq(index).html(item.writer));*/
				
				/*console.log($(".bbb_viewed_name").eq(index).html());
				console.log($(".bbb_viewed_price").eq(index).html());
				console.log($(".bbb_viewed_image").eq(index).html());
				$(".bbb_viewed_image").eq(index).html("<a href='base.html?singlePage.html?" + item.seq
				 + "'><img id='detail' src=" + item.filename + "alt=''></a>");
				$(".bbb_viewed_price").eq(index).html(item.title);
				$(".bbb_viewed_name").eq(index).html(item.writer);*/
			});
			
			//console.log(ar);
		},
		error: function() {
			alert('error');
		}
	});
}

/* 슬라이드 */
function getSlider() {
	
	if ($('.bbb_viewed_slider').length) {
		var viewedSlider = $('.bbb_viewed_slider');

		viewedSlider.owlCarousel(
			{
				loop: true,
				margin: 10,
				autoplay: true,
				autoplayTimeout: 6000,
				nav: false,
				dots: false,
				responsive:
				{
					0: { items: 1 },
					575: { items: 2 },
					768: { items: 3 },
					991: { items: 4 },
					1199: { items: 6 }
				}
			});

		if ($('.bbb_viewed_prev').length) {
			var prev = $('.bbb_viewed_prev');
			prev.on('click', function() {
				viewedSlider.trigger('prev.owl.carousel');
			});
		}

		if ($('.bbb_viewed_next').length) {
			var next = $('.bbb_viewed_next');
			next.on('click', function() {
				viewedSlider.trigger('next.owl.carousel');
			});
		}
	}
}
/*뉴스피드*/
let ses = JSON.parse(sessionStorage.getItem("login"));

const listElm = document.querySelector('.infinite-list');

listElm.addEventListener('scroll', () => {
	if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
		getNextFeed();
	}
});

var currentPage = 1;
var rowsPerPage = 10;
var totalCnt = 0;

function getNextFeed() {
	if (currentPage != 1 && Math.ceil(totalCnt / rowsPerPage) < currentPage) {
		return;
	}
	var params = {
		"currentPage": currentPage,
		"rowsPerPage": rowsPerPage
	};
	$.ajax({
		url: "http://localhost:3000/bestfeed?" + jQuery.param(params),
		type: "get",
		success: function(list) {

			totalCnt = list[0].totcnt;
			var html = [];
			$.each(list, function(index, item) {
				let nickname = String(ses.nickname);
				let likecount = getLike(item.seq);
				let commentcount = getCommentCnt(item.seq);

				html.push("<div class='feed-frame'>");
				html.push("<div><a id='nick' href='profile.html?" + item.nickname + "'>" + item.nickname + "</a>&nbsp;&nbsp;");
				html.push("<span id='regi'>" + item.regDate + "</span></div>");
				if (item.filename) {
					html.push("<div id=feed-img-frame><img id=feed-img src='http://localhost:3000/upload/" + item.filename + "' onerror='this.src=`images/error.png`;'/></div>");
				}

				html.push("<div class='feedcontent'>" + item.content + "</div><br><br>");
				html.push("<div id='tag'>태그 : " + item.tag + "</div><br><br>");
				html.push("<div><button id='btn1' onclick='likebtn(`" + nickname + "`,`" + item.seq + "`)'><img id='img1' src='images/heart.png'></button>");
				html.push("<span id=likecount1>" + likecount + "</span>&nbsp;&nbsp;&nbsp;");
				html.push("<button id='commentPopBtn' onclick='comment_pop(" + String(item.seq) + ")'><img id='commenticon' src='images/commentIcon.png'></button><span id='cntComment'>" + commentcount + "</span></div>")
				html.push("</div>");
			});

			$('.infinite-list').append(html.join(''));
			currentPage++;
			//			alert(JSON.stringify(list));
			// 			document.getElementById('json').innerHTML=JSON.stringify(list);

		},
		error: function() {
			alert('error');
		}
	});
}

function getLike(seq) {
	let result = 0;

	$.ajax({
		url: "http://localhost:3000/feedlike",
		type: "get",
		async: false,
		data: { "seq": seq },
		success: function(resp) {

			result = resp;
		},
		error: function() {
			alert(error);
		}

	});

	return result;
}

function getCommentCnt(seq) {
	let result = 0;

	$.ajax({
		url: "http://localhost:3000/commentcount",
		type: "get",
		async: false,
		data: { "seq": seq },
		success: function(resp) {

			result = resp;

		},
		error: function() {
			alert(error);
		}

	});
	return result;
}

function comment_pop(seq) {
	window.open("comment.html?" + seq, '댓글보기', 'top=10, left=10, width=500, height=600, status=no, menubar=no')
};

function feed_write_pop() {
	const popUrl = "Kwak/feedWrite.html";
	const popOption = "top=100, left=100, width=700px, height=800px, status=no, menubar=no";
	window.open(popUrl, '피드작성하기', popOption);
}

function likebtn(nickname, feedSeq) {
	$.ajax({
		url: "http://localhost:3000/like",
		type: "post",
		data: { "nickname": nickname, "feedSeq": feedSeq, "isLike": 1 },
		success: function(resp) {
			//alert(resp);
			if (resp == 'OK') {
				alert("좋아요를 누르셨습니다.");
			}
			if (resp == 'already') {
				alert("이미 좋아요를 누르셨습니다.");
			}

		},
		error: function() {
			alert(error);
		}

	})
};


/*챗봇 링크불러오기*/
function chatbot() {
	window.open("chatbot.html", "PopupWin", "width=500, height=500");
}
/*챗봇 링크 불러오기*/