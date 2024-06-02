$(document).ready(function () {
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
