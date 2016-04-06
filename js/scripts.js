/*$.noConflict();
jQuery(document).ready(function($){
});
>>>>>>>>Only for Prototype!
*/ 

$(document).ready(function(){
	var $tvContainer = $('#app-body').find('.tv-shows');
//Set the like functionality
	$tvContainer.on('click', 'button.ion-ios-heart', function(ev){
		$(this).toggleClass('like');
		$(this).closest('.tv-show').toggleClass('liked');
	});
//Render for each tv show
	function renderShows(shows){
		$tvContainer.find('.loader').remove();
		shows.forEach(function(show){
			var article = template.replace(':name:', show.name)
			.replace(':summary:', show.summary)
			.replace(':img:', show.image ? show.image.medium : '')
			.replace(':img alt:', show.name + "cover");

			var $article = $(article);
			$tvContainer.append($article.fadeIn(1200));
		});
	}
	//Search functionality of the app
	$('#app-body').find('.search-form').submit(function (ev){
		ev.preventDefault();
		var busqueda = $(this).find('input[type="text"]').val();
		$tvContainer.find('.tv-show').remove();
		var $loader = $('<div class="loader">');
		$loader.appendTo($tvContainer);
		//Ajax request for search
		$.ajax({
			url: 'http://api.tvmaze.com/search/shows',
			data: {q: busqueda},
			success: function (res, textStatus, xhr){
				$loader.remove();
				var shows = res.map(function(el){
					return el.show;
				});
				renderShows(shows);
			}
		});
	});

 //Creating the TV Show template
	var template = '<article class="tv-show col-xs-10 col-xs-offset-1">' +
						'<div class="img-container col-xs-12 col-sm-4 col-md-2">' +
							'<img src=":img:" alt=":img alt:">' +
						'</div>' +
						'<div class="info col-xs-12 col-sm-7 col-sm-offset-1 col-md-9 col-md-offset-1">' +
							'<h1>:name:</h1>' +
							'<p>:summary:</p>' +
							'<button class="ion-ios-heart"></button>'
						'</div>' +
					'</article>';

 //Ajax request for shows list 
	
	if(!localStorage.shows){
		$.ajax('http://api.tvmaze.com/shows')
	 	 .then(function(shows){
	 		//$tvContainer.find('.loader').remove();
	 		localStorage.shows = JSON.stringify(shows);
			renderShows(shows);
	 	})
	}else{
		renderShows(JSON.parse(localStorage.shows));
	}
});