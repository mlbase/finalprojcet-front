let pass= location.href.split("?");
let receiveid = pass[1];
let nickname = pass[2];
let ses = JSON.parse(sessionStorage.getItem("login"));

$("#send").click(function(){
	let params = {"sendId": ses.id, "receiveId":$("#RIDval").val(), "content":$("#comment").val()} 
	//alert(JSON.stringify(params));
	
	$.ajax({
		url:"http://localhost:3000/message",
		type : "post",
		data : params,
		success : function(resp) {
			//alert(JSON.stringify(resp));
			if(resp==""){
				alert("message 작성에 실패했습니다.");
				
			}
			alert("message 작성에 성공했습니다.")
		},
		error : function(){
			alert('error');
		}		
	});
	window.location.reload();
});

function getBtnVal(param){
	let sendid = $("#"+param).val();
	$("#receiveId").text(sendid);
	$("#RIDval").val(sendid);
	$("#notice").hide();
	//let data = {"id": sendid, "myid":ses.id}
	//alert(JSON.stringify(data));
	//alert(ses.id);
	
	$.ajax({
		url:"http://localhost:3000/message",
		type : "get",
		data : {"id": sendid, "myid":ses.id},
		success : function(list) {
			//alert(JSON.stringify(list));
			let output = "";
			
			$.each(list, function(index,item){
				
				output += "<div class='talkbubble'><div id='content1'>" + item.content +"</div><br><div id='regDate1'>" + item.regDate +"</div></div><br>";
				
	
			});
			$("#message").html(output);
			
		},
		error : function(){
			alert('error');
		}
	});	
	
	$.ajax({
		url:"http://localhost:3000/sentmessage",
		type : "get",
		data : {"id": ses.id, "opponentid":sendid},
		success : function(list) {
			//alert(JSON.stringify(list));
			let output = "";
			
			$.each(list, function(index,item){
				
				
				output += "<div class='talkbubble2'><div id='content2'>" + item.content +"</div><br><div id='regDate2'>" + item.regDate +"</div></div><br>";
				
	
			});
			$("#title1").html(sendid+"님께 받은 메세지");
			$("#title2").html("내가 보낸 메세지");
			$("#mymessage").html(output);
			
		},
		error : function(){
			alert('error');
		}
	});	
	
}


$( document ).ready(function() {
//alert(id+nickname);
$("#title1").html("받은 메세지");
$("#title2").html("보낸 메세지");
/*$(".listbtn").each(function(){
	var fileid = $(this).val();
	console.log(fileid);
});*/

	
	
	$.ajax({
		url:"http://localhost:3000/whoSent",
		type : "get",
		data : {"id": receiveid},
		success : function(list) {
			//alert(JSON.stringify(list));
			
				$.each(list, function(index,item){
				
				var output = "";

				output += "<button type='button'class='listbtn btn btn-primary btn-sm' onclick='getBtnVal(this.id)' id='"+ item.sendId +"' value='"+item.sendId+"'>" + item.sendId + "</button>&nbsp;";
				
				document.getElementById("target").innerHTML += output
				
			});
			
		},
		error : function(){
			alert('error');
		}
	});

});

