

function onSubmit (event) {
  event.preventDefault();
  console.debug('SUBMITTED');
  var artist = {
    name: $('#artist').val()
  }

  var request = $.get('https://api.spotify.com/v1/search?type=artist&query=' + artist.name);

  function onSaveSuccess (response) {
    console.debug('BOOM Arist', response);
    showArtists(response);
  }

  function onSaveFailure (err) {
    console.error(err.responseJSON);
  }

  request.done(onSaveSuccess);
  request.fail(onSaveFailure);
}

$('#spotify-searcher').on('submit', onSubmit);

function showArtists (artist_obj) {
  $('#content-search').empty();
  $('#content-search').append('<h1>Artists</h1>')
  $('#content-search').append('<ul id="list">');
  artist_obj.artists.items.forEach(function (artist) {    
    if(artist.images.length !== 0) {
      var image = '<div class="cover"><img src="' + artist.images[0].url + '"/></div>'
      var name = '<div class="data-name"><h1>' + artist.name + '</h1></div>'
      var html = '<li><article class="box"><a href="" class="link link-artist" data-id="' + artist.id + '">' + image + name + '</a></article></li>';
      $('#list').append(html);
    };
  });
  $('#content-search').append('</ul>');
}

function goArtistPage (event) {
  event.preventDefault();
  var artist_id = event.currentTarget.dataset.id;

  var request = $.get('https://api.spotify.com/v1/artists/' + artist_id + '/albums');

  function onSaveSuccess (response) {
    console.debug('BOOM album', response);
    showAlbums(response);
  }

  function onSaveFailure (err) {
    console.error(err.responseJSON);
  }

  request.done(onSaveSuccess);
  request.fail(onSaveFailure); 
}

$('#content-search').on('click', '.link-artist', goArtistPage);

function showAlbums (albums_obj) {
  $('#content-search').empty();
  $('#content-search').append('<h1>Albums</h1>')
  $('#content-search').append('<ul id="list">');
  albums_obj.items.forEach(function (album) {
    if(album.images.length !== 0) {
      var image = '<div class="cover"><img src="' + album.images[0].url + '"/></div>'
      var name = '<div class="data-name"><h1>' + album.name + '</h1></div>'
      var html = '<li><article class="box"><a href="" class="link link-album" data-id="' + album.id + '">' + image + name + '</a></article></li>';
      $('#list').append(html);
    };
  });
  $('#content-search').append('</ul>');
}

function goTracks (event) {
  event.preventDefault();
  var album_id = event.currentTarget.dataset.id;

  var request = $.get('https://api.spotify.com/v1/albums/' + album_id + '/tracks');

  function onSaveSuccess (response) {
    console.debug('BOOM track', response);
    showTracks(response);
  }

  function onSaveFailure (err) {
    console.error(err.responseJSON);
  }

  request.done(onSaveSuccess);
  request.fail(onSaveFailure); 
}

$('#content-search').on('click', '.link-album', goTracks);

function showTracks (tracks_object) {
  $('.modal-body').empty();
  $('.modal-body').append('<ul id="list-modal">');
  tracks_object.items.forEach(function (track) {  
    var name = '<p>' + track.name + '</p>'
    var html = '<li><article><a href="' + track.preview_url + '" target="blank" class="link link-track" data-id="' + track.id + '">' + name + '</a></article></li>';
    $('#list-modal').append(html);
  });
  $('#traks-list').modal('show');
}