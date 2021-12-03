				
	//alert('checkout.js');				
	let ses = JSON.parse(sessionStorage.getItem("login"));
	let shop_List = sessionStorage.getItem('shopList');
	//alert(shop_List);			
	let bookdatas = JSON.parse(shop_List);
	//alert(bookdatas[0].img);
	//alert(bookdatas[0].title);
	
	
	//console.log(bookdatas[0].img);						
					
	    
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
	    //검색버튼 이벤트
	    jQuery("#btnSearchByPostCode").bind("click", function () {
	        searchPostCode("area", "", "");
	        return false;
	    });
	
	    //엔터키
	    function checkEnterKey(event) {
	        event = (event ? event : window.event);
	        if (event.keyCode == 13) {
	             if(event.preventDefault){
	                    event.preventDefault(); 
	                } else {
	                    event.returnValue = false;
	                }
	            //event.preventDefault();
	            jQuery("#btnSearchByPostCode").click();
	        }
	    }
	
	    //우편번호 검색
	    function searchPostCode(searchType, sido, gugun) {
	        var txtSearchWordByPostCode = jQuery("#txtSearchWordByPostCode");
	        if (txtSearchWordByPostCode.val() == "") {
	            alert(jQuery("#spnTitleByPostCode").html().replace("<br />"));
	            txtSearchWordByPostCode.focus();
	
	            return false;
	        }
	
	        jQuery("#divListByPostCode").attr("style", "text-align:center; padding-top:15px");
	        jQuery("#divListByPostCode").html("검색중...");
	
	        jQuery.ajax({
	            type: "POST",
	            url: "/ucl/account/wa_address_input_layer_ajax.aspx",
	            data: "searchWord=" + escape(txtSearchWordByPostCode.val()) + "&searchType=" + searchType + "&sido=" + escape(sido) + "&gugun=" + escape(gugun) + "&isMobile=False",
	            success: function (result) {
	                jQuery("#divListByPostCode").removeAttr("style");
	                jQuery("#divListByPostCode").html(result);
	            }
	        });
	    }
	
	    //우편번호 초기화
	    function initPostCode() {
	        jQuery("#aPostCodeTabArea").click();
	        //jQuery("#txtSearchWordByPostCode").focus();
	        if (typeof jQuery.watermark != 'undefined') {
	            jQuery('#txtSearchWordByPostCode').watermark(" ex) 중구 중림동 157-2");
	        }
	        
	        changePostCodeTab(document.getElementById('aPostCodeTabRoad'), 'road');
	    } 
	    
	    // 문구
	    //jQuery(document).ready(function () {
	    //    jQuery('#txtSearchWordByPostCode').watermark(" ex) 중림동 157-2");
	    //});
	
	    jQuery(document).ready(function () {
	        jQuery('input[name="State"]').bind('keyup', validState);
	        jQuery('select[name="Country"]').bind('change', validState);
	    });
	
	    function validState() {
	        var country = jQuery('select[name="Country"]').val();
	        var state = jQuery('input[name="State"]');
	
	        if (country == 'U.S.A' || country == 'CANADA') {
	            if (state.val().trim().length > 2) {
	                state.val(state.val().slice(0, 2));
	            }
	        }
	        else {
	            if (state.val().trim().length > 3) {
	                state.val(state.val().slice(0, 3));
	            }
	        }
	    }




	function doOpenCheck(chk){
	    var obj = document.getElementsByName("addre	");
	    for(var i=0; i<obj.length; i++){
	        if(obj[i] != chk){
	            obj[i].checked = false;
	        }
	    }
	}





function getCheckboxValue()  {
  // 선택된 목록 가져오기
  const query = 'input[name="addre"]:checked';
  const selectedEls = 
      document.querySelectorAll(query);
  
  // 선택된 목록에서 value 찾기
  let result = '';
  selectedEls.forEach((el) => {
    result += el.value + ' ';
  });
  
  // 출력
  document.getElementById('result').innerText
    = result;
}

function Doorder(){
		
	/*
	let datas = makeparam();
	alert(JSON.stringify(datas));
	*/
	
	$.ajax({
		url : "http://localhost:3000/order",
		type : "post",
		data : { list:JSON.stringify(makeparam()) },		
		/*data : makeparam(),
		dataType: "json",*/
		success : function(resp){
			//alert('success');
			if(resp == "OK"){
				alert("주문성공");
				delWish();
				location.href="base.html?main.html";
				sessionStorage.removeItem("shoplist");
			}
			
		},
		error : function(){
			alert('error');
		}
	});
}

function delWish(){
	$.ajax({
		url:"http://localhost:3000/resetwish",
		type:"get",
		data: {"id":ses.id},
		success : function(resp){
			if(resp == "YES"){
				alert("장바구니초기화");
			}
		},
		error : function(){
			alert('장바구니초기화 에러');
		}
	})
	
}




			

function doSum1(){ 
	let ppsum=0;
			
	$(".sum").each(function(){
	let pprice= parseInt($(this).html());
	//console.log(pprice);
	//alert(pprice);
	ppsum += pprice; 	
				
	});
	//alert(pprice.length);
					
			
	//alert(ppsum);
	$("#sum_p_price").val(ppsum); 
}

$(".prAddress").click(function(){
	addressmake();
	$("#address").val(ses.address);
	
});
		
			
			

$(document).ready(function(){ 
	$.each( bookdatas,function(index, item){
			/*alert(item.img);
			alert(item.title);
			alert(item.p_price);			
			*/
		
			let data="<tr name='item' class='book'>";
			data+="<td><div class='img'><img src='" + item.img +"'></div></td>";
			data+="<td><div class='title'>"+ item.title+ "</div>";
			data+="<td><div class='p_price' name='p_price'>" + item.p_price+ "원"+"</div></td>";
			data+="<td><div class='num'><div class='p_num'>" +item.p_num+ "개"+"</div></td>";
			/*data+="<td><div class='sum' name='sum'>" + item.sum + "</div><span class='seq' hidden>"+
					item.seq+"</span></td>;*/
			data+="<td><div class='sum' name='sum'>" + item.sum + "</div><span class='seq' hidden>"+
					"?"+item.seq+"</span></td></tr>";
	
			/*						
			data+="<td><span class='seq' style='visibility:hidden;'>"+item.seq+"</span></td></tr>";
			*/												
			$("#row").append(data);	
						
	});
	
	$("#id").val(ses.id);
	$("#id").attr("readonly","readonly");				
	doSum1();
	//makeparam();
	
	//alert(senddata);			
	
});

function makeparam(){
	let senddata = {};
	let ar = new Array();
	
	$(".book").each(function(){
		let middata = {};
		middata.id =ses.id;
		middata.bookSeq = $(this).children().text().split("?")[1];
		middata.address = $("#address").val();
		middata.bookCount = $(this).find(".p_num").html().split("개")[0];
		//middata.price = $(this).children().text().split("원")[0].slice(-5);
		middata.price = $(this).find(".p_price").html().split("원")[0];
		middata.cardNum = $("#cardNum").val();
		//alert(JSON.stringify(middata));
		
		ar.push(middata);
	});
	senddata.list = ar;
	// alert(JSON.stringify(senddata));
	//alert(JSON.stringify(ar));
	
	return ar;
}
				
			
				
