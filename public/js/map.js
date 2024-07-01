
//         // let mapToken = mapToken;
//         // console.log(mapToken);



//         mapboxgl.accessToken = mapToken;
//         const map = new mapboxgl.Map({
//             container : "map",
//             style:"mapbox://styles/mapbox/satellite-streets-v12",
//             center: listing.geometry.coordinates, // [longitude,latitude]
//             zoom:9, //starting zoom
//         });


// const marker = new mapboxgl.Marker({color:"red"})
//     .setLngLat(listing.geometry.coordinates)
//     .setPopup(new mapboxgl.Popup({ offset: 25})
//     .setHTML(`<h5>${listing.title}</h5><p>Exact location will be provided after booking</p>`))
//     .addTo(map);