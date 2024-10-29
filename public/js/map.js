
	mapboxgl.accessToken = mapToken;
   
    
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: JSON.parse(coords),
        zoom: 9,
    });


    const marker = new mapboxgl.Marker({color :"red"})
    .setLngLat(JSON.parse(coords)) //listing.geometry.coordinates
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<p>Exact location will be provided after booking</p>`))
    .addTo(map);