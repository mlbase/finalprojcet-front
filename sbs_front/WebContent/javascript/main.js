//current position
var pos = 0;
//number of slides
var totalSlides = $('#slider-wrap ul#slider li').length;
//get the slide width
var sliderWidth = $('#slider-wrap').width();
var totalWidth = sliderWidth * totalSlides;

$(document).ready(function(){
  
  
  /*****************
   BUILD THE SLIDER
  *****************/
  //set width to be 'x' times the number of slides
  $('#slider-wrap ul#slider').width(totalWidth);
  
    //next slide  
  $('#next').click(function(){
    slideRight();
  });
  
  //previous slide
  $('#previous').click(function(){
    slideLeft();
  });
  
  
  
  /*************************
   //*> OPTIONAL SETTINGS
  ************************/
  //automatic slider
  var autoSlider = setInterval(slideRight, 3000);
  
  //for each slide 
  $.each($('#slider-wrap ul li'), function() { 

     //create a pagination
     var li = document.createElement('li');
     $('#pagination-wrap ul').append(li);    
  });
  
  //counter
  countSlides();
  
  //pagination
  pagination();
  
  //hide/show controls/btns when hover
  //pause automatic slide when hover
  $('#slider-wrap').hover(
    function(){ $(this).addClass('active'); clearInterval(autoSlider); }, 
    function(){ $(this).removeClass('active'); autoSlider = setInterval(slideRight, 3000); }
  );
  
  

});//DOCUMENT READY
  


/***********
 SLIDE LEFT
************/
function slideLeft(){
  pos--;
  if(pos==-1){ pos = totalSlides-1; }
  $('#slider-wrap ul#slider').css('left', -(sliderWidth*pos));  
  
  //*> optional
  countSlides();
  pagination();
}


/************
 SLIDE RIGHT
*************/
function slideRight(){
  pos++;
  if(pos==totalSlides){ pos = 0; }
  $('#slider-wrap ul#slider').css('left', -(sliderWidth*pos)); 
  
  //*> optional 
  countSlides();
  pagination();
}



  
/************************
 //*> OPTIONAL SETTINGS
************************/
function countSlides(){
  $('#counter').html(pos+1 + ' / ' + totalSlides);
}

function pagination(){
  $('#pagination-wrap ul li').removeClass('active');
  $('#pagination-wrap ul li:eq('+pos+')').addClass('active');
}

/*infinite-list*/
var listElm = document.querySelector('.infList');
var itemNum = 1;

var loadMoreList = () => {
  for (let i = 0; i < 10; i++) {
    var item = document.createElement('li');
    item.innerText = 'Item ' + itemNum++;
    listElm.appendChild(item);
  }
}

listElm.addEventListener('scroll', () => {
  if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
    loadMoreList();
  }
});

// Initially load items
loadMoreList();
/*infinite-list*/

/*챗봇 링크불러오기*/
function chatbot(){
	window.open("chatbot.html", "PopupWin", "width=500, height=500");
}
/*챗봇 링크 불러오기*/
