/* global L */
;(function (window) {
  function init (mapid) {
    var minZoom = 2
    var maxZoom = 7
    var img = [
      22328, 
      22328  
    ]

    // create the map
    var map = L.map(mapid, {
      minZoom: minZoom,
      maxZoom: maxZoom
    })

    // assign map and image dimensions
    var rc = new L.RasterCoords(map, img)

    // set the view on a marker ...
    map.setView(rc.unproject([8000, 6000]), 6)

    // the tile layer containing the image generated with gdal2tiles --leaflet ...
    L.tileLayer('./tiles/{z}/{x}/{y}.jpg', {
      noWrap: true,
      attribution: 'Project by <a href="http://subject.space">Logan Williams</a>.'
    }).addTo(map)
  }
  
  init('map')
}(window))
