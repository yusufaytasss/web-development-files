var ang = 0;

$("#prev").click(function(){
	ang = ang + 22.5;
  $("*").css("--ang", ang);
});

$("#next").click(function(){
	ang = ang - 22.5;
  $("*").css("--ang", ang);
});