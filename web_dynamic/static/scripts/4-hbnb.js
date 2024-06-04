$(document).ready(function () {
  const hostName = window.location.hostname;
  // Toggle the color of circle on page based on status of the API
  $.get(`http://${hostName}:5001/api/v1/status/`, (data) => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  // Dynamically Fetch Places
  $.ajax({
    url: `http://${hostName}:5001/api/v1/places_search`,
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: appendPlaces
  });

  // Add checkboxes for amenities
  const amenities = {};
  $('INPUT[type="checkbox"]').change(function () {
    const k = $(this).attr('data-id');
    const v = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      amenities[k] = v;
    } else {
      delete amenities[k];
    }

    // Display amenities that are checked as a comma-separated list
    $('.amenities H4').text(Object.values(amenities).join(', '));
  });

  // Filter places by Amenity
  $('BUTTON').click(function () {
    $.ajax({
      url: `http://${hostName}:5001/api/v1/places_search`,
      type: 'POST',
      data: JSON.stringify(amenities),
      contentType: 'application/json',
      dataType: 'json',
      success: appendPlaces
    });
  });
});

function appendPlaces (places) {
  for (let i = 0; i < places.length; i++) {
    $('SECTION.places').append(
      `
      <article>
      <div class="title_box">
      <h2> ${places[i].name}</h2>
      <div class="price_by_night"> ${places[i].price_by_night} </div>
      </div>
      <div class="information">
      <div class="max_guest">${places[i].max_guest}
      ${places[i].max_guest > 1 ? 'Guests' : 'Guest'} </div>
      <div class="number_rooms">${places[i].number_rooms}
      ${places[i].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}  </div>
      <div class="number_bathrooms">${places[i].number_bathrooms}
      ${places[i].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}  </div>
      </div>
      <div class="user">
      </div>
      <div class="description">
      ${places[i].description}
      </div>
      </article>
      `
    );
  }
}
