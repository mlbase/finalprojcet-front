let ses = JSON.parse(sessionStorage.getItem("login"));

$(document).ready(function(){
	$.ajax({
		url: "http://localhost:3000/orderlist",
		type: "get",
		data: { id: ses.id },
		success: function(resp) {
			//alert(JSON.stringify(resp));
				$.each(resp, function(index, item) {
					//alert(item.address);
					let data="<tr name='item' class='book'>";
					data += "<td><div class='img'><img src='" + item.filename + "'></div></td>";
					data += "<td><div class='title'>" + item.title + "</div></td>";
					data += "<td><div class='p_price' name='p_price'>" + item.price + "</div></td>";
					data += "<td><div class='orderDate'>" + String(item.orderDate) + "</div></td>";
					data += "<td><p class='address'>"+item.address+ "</p></td>";
					data += "<td><div class='num'><span class='bookCount'>"+ item.bookCount + "</span></div></td>";
					data += "<td><div class='sum' name='sum' id='sum" + index + "'>" + (item.bookCount * item.price) + "</div></td></tr>"
				
		
					$("#row").append(data);
				});
	
		},
		error: function() {
			alert('error');
		}
	});
});


			