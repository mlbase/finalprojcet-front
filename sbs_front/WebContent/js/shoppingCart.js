let qdata = {};

let basket = {
    totalCount: 0, 
    totalPrice: 0,
   
    //장바구니 전체 비우기
    delAllItem: function(){
        document.querySelectorAll('.row').forEach(function (item) {
            item.remove();
          });
          //AJAX 서버 업데이트 전송
        
          //전송 처리 결과가 성공이면
          this.totalCount = 0;
          this.totalPrice = 0;
          
    },
   
    
    checkItem: function () {
        this.reCalc();
        this.updateUI();
    },
    delItem: function (seq) {
		$.ajax({
			url:"http://localhost:3000/wishdelete",
			type : "get",
			data : {"seq":seq},
			success : function(msg){
				let resp = "삭제에 실패했습니다";
				if(msg == "YES"){
					resp="삭제에 성공했습니다";
				};
				
				alert(resp);
			},
			error : function(){
				alert('error');
			}
		});
	
        event.target.parentElement.parentElement.parentElement.remove();
        this.reCalc();
        this.updateUI();
		doSum();
		doSum1();
    },
 	saveItem: function(){
		let param = {};
		/*
		$(".book").each(function(index, item){
			//alert(item.children('img').attr('src'));
			alert(item);		
		});*/
		
		let pnum = document.getElementsByClassName("img");
			
		
		sessionStorage.setItem("sum",qdata);
		
		location.href="http://localhost:8090/sbs_front/base.html?checkout.html";
	}
}

$(document).on("click", "#saveItem", function(){	
	
	let param = {};
	
	let srcArr = [];	
	let src = document.getElementsByClassName("img");
//	alert(src[0].innerHTML);

	for(i = 0;i < src.length; i++){
		let img = src[i].innerHTML;
		
		let start = img.indexOf("\"");
		let end = img.lastIndexOf("\"");
	//	alert(start);
	//	alert(end);
		
		let imgSrc = img.substring(start + 1, end);
	//	alert(imgSrc);	
		srcArr[i] = imgSrc;	
	}
	
	for(i = 0;i < srcArr.length; i++){
		//alert(srcArr[i]);
	}
		
	
	let title = document.getElementsByClassName("title");
//	alert(src[0].innerHTML);

	for(i = 0;i < title.length; i++){
		let t = title[i].innerHTML;
		//alert(t);
	}
	
	let p_price = document.getElementsByClassName("p_price");
//	alert(src[0].innerHTML);

	for(i = 0;i < p_price.length; i++){
		let b = p_price[i].innerHTML;
		//alert(b);
		//console.log(b);
	}
	let p_num = document.getElementsByClassName("p_num");
//	alert(src[0].innerHTML);

	for(i = 0;i < p_num.length; i++){
		let c = p_num[i].value;
		//alert(c);
		//console.log(c);
	}
	let sum=document.getElementsByClassName("sum");
	for(i = 0;i < sum.length; i++){
		let d = sum[i].innerHTML;
		//alert(d);
		//console.log(c);
	}
	
	
	
	let seq = document.getElementsByClassName("seq");
//	alert(src[0].innerHTML);

	for(i = 0;i < seq.length; i++){
		let s = seq[i].value;
		//alert(s);
	}
	
	let shopList = new Array() ;
	
	for(i=0;i<seq.length;i++){
		var ses=new Object();
		
		ses.img=srcArr[i];
		ses.title=title[i].innerHTML;
		ses.p_price=p_price[i].innerHTML;
		ses.p_num=p_num[i].value;
		ses.seq=seq[i].value;
		ses.sum=sum[i].innerHTML;
		
		 shopList.push(ses);		
		
	}
	
	
	let slist = JSON.stringify(shopList);
	console.log(shopList);
	sessionStorage.setItem("shopList", slist);
	
	location.href="http://localhost:8090/sbs_front/base.html?checkout.html";
	
	
	
});


		let ses = JSON.parse(sessionStorage.getItem("login"));
		$(document).ready(function(){
			
			$.ajax({	
				url:"http://localhost:3000/wishlist",
				type:"get",
				data:{ id : ses.id },	
				success:function( resp ){
					//alert(JSON.stringify(resp));
					
					
					$.each(resp, function(index, item){
						
					
						
						/* let data="<tr id='cart_item' name=item><td><input type=checkbox name='buy' onclick=javascript:basket.checkItem()></td>";
						 */
						let data="<tr name='item' class='book'>";
						data+="<td><div class='img'><img src='" + item.filename +"'></div></td>";
					    data+="<td><div class='title'>"+ item.title+"/ "+item.writer+ "</div></td>";
						data+="<td><div class='p_price' name='p_price'>" + item.price+ "</div></td>";
						data+="<td><div class='num'><div class='updown'><input type='text' name='p_num'  size='2' maxlength='4' class='p_num' value='" 
						+ item.bookCount + "' priceval=" + item.price + " sumval='sum" + index + "'>개</div></div></td>";
						data+="<td><div class='sum' name='sum' id='sum" + index + "'>" + (item.bookCount * item.price) + "</div></td>"
						data+="<td><div class='basketcmd'><a href='javascript:void(0)' "+
						"class='abutton btn btn-danger btn-sm' onclick='javascript:basket.delItem(" + item.seq+");''>삭제</a></div></td>"
						data+="<input type='hidden' class='seq' name='seq' value='" + item.bookSeq + "' ></tr>";
					
						 
						$("#row").append(data);
						
						
					});
					
					doSum();
					doSum1();
					
				},	 
				error:function(){
					alert('error');
				},
			});
			
			
			$(document).on("change", ".p_num", function(){
				$("#" + $(this).attr("sumval")).text($(this).val() * $(this).attr("priceval"));
				//document.getElementById("'" + $(this).attr("sumval")).text = "테스트";
				doSum();
				doSum1();
			});
			
			
						
		});		
	
		

		
		
		function doSum(){ 
		//	alert('doSum()');
			
			let pnum = document.getElementsByClassName("p_num");
			//alert(pnum);
			
			let psum = 0;
			for(i = 0;i < pnum.length; i++){
			//	alert(pnum[i].value);
				psum += parseInt(pnum[i].value);
			}
			//alert(psum);
			
			
			$("input[name=sum_p_num]").val(psum);
			
			qdata.psum = psum;
			
			
		}
			

		function doSum1(){ 
			//alert('doSum1()');
			let ppsum=0;
			
			$(".sum").each(function(){
				let pprice= parseInt($(this).html());
				//console.log(pprice);
				ppsum += pprice; 	
			});
			//alert(pprice.length);
			
			
			
			//alert(parseInt(pprice[0]));
			/*for(i = 0;i < pprice.length; i++){
				console.log(pprice);
				ppsum += parseInt(pprice[i]);
			}*/
			//alert(ppsum);
			$("#sum_p_price").val(ppsum); 
			
			qdata.ppsum = ppsum;
		}
			










