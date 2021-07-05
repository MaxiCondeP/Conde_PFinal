$(document).ready(main);

var contador = 1;

function main(){
	$('.logoMenu').click(function(){
		// $('menuItem').toggle(); 

        if(contador == 1){
			$('.miMenu').animate({
				left: '0'
			});		
			contador = 0;
		} else {
			contador = 1;
			$('.miMenu').animate({
				left: '-100%'
			});
		}

	});
};