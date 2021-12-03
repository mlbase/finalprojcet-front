
let ses = JSON.parse(sessionStorage.getItem("login"));
$("#td1").html(ses.nickname);
$("#nickname").val(ses.nickname);
//let getFilename = document.getElementById('image').files[0].name;
//document.getElementById('image').files[0].name;
//$("#image").files[0].name;
function setThumbnail(event) {
	
	var reader = new FileReader(); 
	
	reader.onload = function(event) {
		var img = document.createElement("img"); 
		img.setAttribute("src", event.target.result); 
		document.querySelector("div#imgContainer").appendChild(img); 
		}; 
		
		reader.readAsDataURL(event.target.files[0]); 
		
	}

function insertFilename() {
	let getFilename = document.getElementById('image').files[0].name;
	$("#filename").attr('value',getFilename);
}
$(document).ready(function(){
	$("#postFeed").on("click", function(){
		let params = $("#frm").serialize();
		
		$.ajax({
			url:"http://localhost:3000/feed",
			type:"post",
			data:params,
			success:function(resp){
			//	alert('success');
				if(resp == "OK"){
					alert("feed 업로드에 성공했습니다.");	
				}else{
					alert("feed 업로드에 실패했습니다.");
				}			
			},
			error:function(){
				alert('error');
			}	
			
		});
		
	});
	
});