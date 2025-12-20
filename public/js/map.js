  const map = L.map("map", {
     minZoom: 5,  
     maxZoom: 10, 
  }).setView([20, 0], 2);

  L.tileLayer(
    `https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=${map_api_key}`,
    {
      attribution: '© MapTiler © OpenStreetMap contributors',
      tileSize: 512,
      zoomOffset: -1
    }
  ).addTo(map);

  let marker;

 const popUpMsg = `<h5>${title}</h5><p>Location will be shared with you after booking...</p>`;

  fetch(
    "https://api.maptiler.com/geocoding/" +
      encodeURIComponent(placeName) +
      `.json?key=${map_api_key}`
  )
    .then(res => res.json())
    .then(data => {
      if (!data.features || !data.features.length) return;

      const [lng, lat] = data.features[0].geometry.coordinates;

      map.setView([lat, lng], 12);

      marker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(popUpMsg)
        .openPopup();
    })
    .catch(err => console.error(err));