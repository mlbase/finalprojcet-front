/**
 * 
 */

$(document).ready(function(){
	$("#checkbtn").click(function () {
		//	alert('idcheckbtn');
		
			// title첵크
		
			$.ajax({
				url:"http://localhost:3000/title",
				type:"post",
				data:{ title:$("#title").val() },
				success:function( resp ){
				//	alert('success');
				
					if(resp.trim() == "YES"){
						$("#titlecheck").html("중복된 제목입니다");
						$("#title").val("");
					}else{
						$("#titlecheck").html("사용할 수 있는 제목입니다");
					}			
				},
				error:function(){
					alert('error');
				}
			});
		});
	
	$("#postbook").on("click",function () {
		
		let params = $("#frm").serialize();
		console.log(params);
		
		$.ajax({
			url:"http://localhost:3000/book",
			type:"post",
			data:params,
			success:function(resp){
			//	alert('success');
				if(resp == "OK"){
					alert("책정보 업로드에 성공했습니다.");	
					location.href = "index.html";
				}else{
					alert("책정보 업로드에 실패했습니다.");
				}			
			},
			error:function(){
				alert('error');
			}			
		});
	});
	
	
	$("#search").click(function () {
		let params = $("#frm").serializeArray();
		
            $.ajax({
                method: "GET",
                url: "https://dapi.kakao.com/v3/search/book?target=title",
                data: { query: $("#isbn").val() },
                headers: { Authorization: "KakaoAK df463844cdd08a00867744d4479dd735" },
                success: function(resp){
                	alert(JSON.stringify(resp));
					//console.log(JSON.stringify(resp));
					console.log(resp.documents[0].thumbnail);
					let realdate = resp.documents[0].datetime.split("T",1);
					console.log(realdate);
					$("#title").val(resp.documents[0].title);
					$("#filename").val(resp.documents[0].thumbnail);
					$("#writer").val(resp.documents[0].authors);
					$("#publishDate").val(realdate);
					$("#publisher").val(resp.documents[0].publisher);
					$("#price").val(resp.documents[0].price);
					$("#content").val(resp.documents[0].contents);
                }
                
            });
	});                      
});