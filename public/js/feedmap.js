

function makeMap(docid)
{
    var map = L.map(docid, {
        minZoom: 1,
        maxZoom: 4,
        center: [0, 0],
        zoom: 3,
        crs: L.CRS.Simple
      });

      var w = 725,
      h = 481,
      url = 'https://www.thoughtco.com/thmb/78yp4LX-ib10jQdSRslNYianKu8=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/floorplan-138720186-crop2-58a876a55f9b58a3c99f3d35.jpg';

      var southWest = map.unproject([0, h], map.getMaxZoom()-1);
          var northEast = map.unproject([w, 0], map.getMaxZoom()-1);
          var bounds = new L.LatLngBounds(southWest, northEast);
      
          // add the image overlay, 
          // so that it covers the entire map
          L.imageOverlay(url, bounds).addTo(map);
      
          // tell leaflet that the map is exactly as big as the image
          map.setMaxBounds(bounds);
      
       console.log('got here');



}
    
    
    function makeChart(docid,bdata,param_key)
{
    //console.log(param_key);

    
    var ctx = document.getElementById(docid).getContext('2d');

    //resize canvas

    var param_vs_time = [];
            for(var i = 0; i < bdata.length; i++) {
            var thisco2 = bdata[i].parameters[param_key];
            var timeutc = bdata[i].timestamp;
            var localtime = luxon.DateTime.fromISO(timeutc).toLocal().toString();
            param_vs_time.push({"t":localtime,"y":thisco2})
            }
    
    console.log(param_vs_time);

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
        datasets: [{
        label: param_key,
        fill: true,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: param_vs_time
        }]
        },
        // Configuration options go here
        options: {
        scales: {
        xAxes: [{
        type: 'time',
        distribution: 'linear',
        ticks: {
        major: {
        enabled: true, // <-- This is the key line
        fontStyle: 'bold', //You can also style these values differently
        fontSize: 14, //You can also style these values differently
        },
        },
        }],
        },
        zone: "America/NewYork"
        }
        });
}