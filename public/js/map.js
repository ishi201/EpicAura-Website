
	mapboxgl.accessToken = mapToken;
    
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [75.857434, 25.173758],
        zoom: 9,
    });

    console.log(coords);

    const marker = new mapboxgl.Marker()
    .setLngLat(coords) //listing.geometry.coordinates
    .addTo(map);