$(document).ready(function () {
  const hostName = window.location.hostname;
  const url = `http://${hostName}:5001/api/v1/status/`;

  $.get(url, (data) => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  const amenities = {};

  $('INPUT[type="checkbox"]').change(function () {
    const k = $(this).attr('data-id');
    const v = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      amenities[k] = v;
    } else {
      delete amenities[k];
    }
    $('.amenities H4').text(Object.values(amenities).join(', '));
  });
});
