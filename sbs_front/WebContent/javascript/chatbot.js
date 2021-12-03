$(document).ready(function() {

	$("#chatbox").stop().animate({ scrollTop: $("#chatbox")[0].scrollHeight }, 2000);
	
	$("#usermsg").on("keyup", (event) => {
		if (event.which === 13) $("#submitmsg").click(); // Use enter to send
	}).on("focus", () => {
		$("#usermsg").addClass("focus");
	}).on("blur", () => {
		$("#usermsg").removeClass("focus");
	});
	
	$("#submitmsg").click(function() {

		if ($("#usermsg").val() != "") 

			$("#chatbox").append("<div class='txt-div'><div class='usermsg'>" + $("#usermsg").val() + "</div><div class='time'>" + new Date().toLocaleTimeString() + "</div></div><br>");
		// naver 전송
		$.ajax({
			url: "http://localhost:3000/chatbot",
			type: "post",
			data: { msg: $("#usermsg").val() },
			success: function(str) {
				//	alert('success');
				//	alert(str);
				//	let json = JSON.parse(str);
				//	alert(json.bubbles[0].type);	

				respProc(str);
			},
			error: function() {
				alert('error');
			}
		});
		$("#usermsg").val("");
		$("#chatbox").stop().animate({ scrollTop: $("#chatbox")[0].scrollHeight }, 2000);
		
	});
});

function respProc(str) {
	let json = JSON.parse(str);

	if (json.bubbles[0].type == "text") {

		$("#chatbox").append("<div align='right'><div class='botmsg'>" + json.bubbles[0].data.description + "</div></div><br>");

	} else {

		alert(json.bubbles[0].data.cover.type);	// image, text(link)

		if (json.bubbles[0].data.cover.type == "image") {
			let title = json.bubbles[0].data.cover.title;
			let imageUrl = json.bubbles[0].data.cover.data.imageUrl;

			//	alert(title);
			//	alert(imageUrl);

			let imgTag = "<img src='" + imageUrl + "' width='200' class='img1'/>";

			$("#chatbox").append("<div align='right'><div class='botmsg'>" + title + "<br>" + imgTag + "</div></div><br>");
		}
		else {	// text -> a tag
			let description = json.bubbles[0].data.cover.data.description;
			let title = json.bubbles[0].data.contentTable[0][0].data.title;
			let url = json.bubbles[0].data.contentTable[0][0].data.data.action.data.url;
			//			alert(JSON.stringify(url));

			let aTag = "<a href='" + url + "' target='_blank'>" + title + "</a>";
			$("#chatbox").append("<div align='right'><div class='botmsg'>" + description + "<br>" + aTag + "</div></div><br>");
		}
	}
}