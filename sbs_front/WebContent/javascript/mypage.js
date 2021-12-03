
let ses = JSON.parse(sessionStorage.getItem("login"));
let id = ses.id;
let nickname = ses.nickname;
$("#profile").attr("src","http://localhost:3000/profile/"+ses.filename);
$("#profile-id").html(ses.id);
// $("#profile-email").html(ses.email);
$("#profile-nickname").html(ses.nickname);
//$("#profile-address").html(ses.address);

$.ajax({
	url:"http://localhost:3000/userlist",
	type:"get",
	async:true,
	data : {"nickname":nickname},
	success: function(list){
		$("#profile-email").html(list[0].email);
		$("#profile-address").html(list[0].address);
	},
	error: function(){
		alert(error);
	}

});
/*$(document).ready(function(){
	$("#emailId")
	$("#writeemail")
});*/
$("#updateemail").click(function(){
	let a = $("#emailId").val()
	let b = $("#writeemail").val()
	let email = a + "@" + b
	/*alert(a+"@"+b);*/
	let id = ses.id
	/*alert(id);*/
	$.ajax({
		url:"http://localhost:3000/updateEmail",
		type:"get",
		data:{"id":id, "email":email},
		success:function(resp){
			
			if(resp == "OK"){
				alert('email을 수정했습니다.');
				window.location.reload();
			}else{
				alert('email을 수정하지 못했습니다.');
			 }
			},
			error:function(){
				alert('error');			
		}
	});
});
function checkDMpop(){
   const popUrl = "checkDM.html?"+id+"?"+nickname;
   const popOption = "top=100, left=100, width=510px, height=730px, status=no, menubar=no";
   window.open(popUrl,'메세지보내기',popOption);
};
function addressmake() {
	let text = $("#sample4_postcode").val()+" "+$("#sample4_roadAddress").val()
	+" "+$("#sample4_detailAddress").val();
	
	$("#add").html("<input type='text' id='address' name='address' value='"+text+"'>")
}
function sample4_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
               extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample4_postcode').value = data.zonecode;
            document.getElementById("sample4_roadAddress").value = roadAddr;
            document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
            
            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if(roadAddr !== ''){
                document.getElementById("sample4_extraAddress").value = extraRoadAddr;
            } else {
                document.getElementById("sample4_extraAddress").value = '';
            }

            var guideTextBox = document.getElementById("guide");
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if(data.autoRoadAddress) {
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                guideTextBox.style.display = 'block';

            } else if(data.autoJibunAddress) {
                var expJibunAddr = data.autoJibunAddress;
                guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                guideTextBox.style.display = 'block';
            } else {
                guideTextBox.innerHTML = '';
                guideTextBox.style.display = 'none';
            }
        }
    }).open();
}

$("#updateaddress").click(function(){
	let a = $("#sample4_postcode").val()
	let b = $("#sample4_roadAddress").val()
	let c = $("#sample4_jibunAddress").val()
	let d = $("#sample4_detailAddress").val()
	let e = $("#sample4_extraAddress").val()
	//alert(a + " " + b + " " + c + " " + d + " " + e);
	let address = a + " " + b + " " + c + " " + d + " " + e
	let id = ses.id
/*	alert(address);*/
	
	$.ajax({
		url:"http://localhost:3000/updateAddress",
		type:"get",
		data:{"id":id, "address":address},
		success:function(resp){
			
			if(resp == "OK"){
				alert('주소를 성공적으로 수정했습니다.');
				window.location.reload();
			}else{
				alert('주소를 수정하지 못했습니다. 다시 작성 해주세요.');
			 }
			},
			error:function(){
				alert('error');			
		}
	});
});

function check() {
	let updatepwd = $("#newpwd").val();
	let pwcheck = $("#pwcheck").val();
	//alert(updatepwd);
	//alert(pwcheck);
	if(pwd == pwcheck){
		$("#pwdcheck").css("color", "#0000ff");
		$("#pwdcheck").html("입력한 비밀번호와 일치합니다!");
	}else{
		$("#pwdcheck").css("color", "#ff0000");
		$("#pwdcheck").html("입력한 비밀번호와 일치하지 않습니다.");
		$("#pwcheck").val("");
		$("#pwcheck").focus();
	}
}


$("#changepwd").on("click",function () {
	
	  let params = {"id": ses.id ,"pwd": $("#pwd").val(),"new_pwd":$("#newpwd").val()};
	  console.log(params);
	
	  $.ajax({
		  url:"http://localhost:3000/change",
		  type:"post",
		  data:params,
		  success:function(resp){
		  //	alert('success');
			  if(resp == "OK"){
				  alert("비밀번호 변경에 성공했습니다. 로그인창으로 이동합니다.");
				  sessionStorage.removeItem("login");	
				  location.href = "login.html";
			  }else{
				  alert("비밀번호 변경에 실패했습니다.");
			  }			
		  },
		 error:function(){
			alert('error');
		}			
	});
});