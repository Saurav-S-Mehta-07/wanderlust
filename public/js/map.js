document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = window.MAP_TOKEN;
  const locationName = window.MAP_LOCATION;
  const countryName = window.MAP_COUNTRY;
  const title = window.MAP_TITLE;

  if (!API_KEY) return;

  // Combine location with country for more accurate geocoding
  const combinedLocation = `${locationName}, ${countryName}`;

  geocodePlace(combinedLocation)
    .then(coords => {
      if (coords) {
        initMap(coords);
      } else {
        console.warn("Combined location failed, trying only country...");
        return geocodePlace(countryName).then(countryCoords => {
          if (countryCoords) {
            initMap(countryCoords);
          } else {
            console.error("Country geocoding failed too.");
          }
        });
      }
    })
    .catch(err => {
      console.error("Geocoding error:", err);
    });

  function geocodePlace(query) {
    return fetch(`https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          return { lat, lng };
        }
        return null;
      });
  }

 function initMap({ lat, lng }) {
  const map = L.map('map', {
    scrollWheelZoom: true,
    dragging: true,
    zoomControl: true
  }).setView([lat, lng], 13);

  L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${API_KEY}`, {
    attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>',
    tileSize: 512,
    zoomOffset: -1
  }).addTo(map);
 
  
  const marker = L.marker([lat, lng]).addTo(map)
    .bindPopup(
        `<h4>${title}</h4>
        <p>Exact location will be provided after booking</p>`, {
      closeButton: false
    });

  marker.on('mouseover', function () {
    this.openPopup();
  });

  marker.on('mouseout', function () {
    this.closePopup();
  });

  L.circle([lat, lng], {
    stroke: false,
    fillColor: 'green',
    fillOpacity: 0.2,
    radius: 700 
  }).addTo(map);
}

});
