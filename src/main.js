

function onSubmit (event) {
  event.preventDefault();
  console.debug('SUBMITTED');
  var artist = {
    name: $('#artist').val()
  }

  var request = $.get('https://api.spotify.com/v1/search?type=artist&query=' + artist.name)

  function onSaveSuccess (response) {
    console.debug('BOOM', response);
    name: $('#artist').empty();
    respondSpotify(response);
  }

  function onSaveFailure (err) {
    console.error(err.responseJSON);
  }

  request.done(onSaveSuccess);
  request.fail(onSaveFailure);
}

$('#spotify-searcher').on('submit', onSubmit);

function respondSpotify (artist_obj) {
  $('#content-search').empty();
  artist_obj.artists.items.forEach(function (artist) {    
    var html = '<li><img src="' + artist.images[0].url + '"/> <span class="artist_name">' + artist.name + '</span></li>';
    $('#content-search').append(html);
  });
}