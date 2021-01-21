
 function setActiveIcon(marker) {
    marker.setIcon(divIconActive);
  };

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

       var locationLayer = new L.FeatureGroup();
       var markerTemp = L.marker();
     
       var iconSettings = {
         mapIconUrl: '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><circle fill="{mapIconColorInnerCircle}" cx="74" cy="75" r="61"/><circle fill="#FFF" cx="74" cy="75" r="{pinInnerCircleRadius}"/></svg>', 
         mapIconColor: 'red',
         mapIconColorInnerCircle: '#fff',
         pinInnerCircleRadius: 48
       };
     
       var iconSettingsActive = {
         mapIconUrl: '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><circle fill="{mapIconColorInnerCircle}" cx="74" cy="75" r="61"/><circle fill="#FFF" cx="74" cy="75" r="{pinInnerCircleRadius}"/></svg>',
         mapIconColor: 'red',
         mapIconColorInnerCircle: '#fff',
         pinInnerCircleRadius: 48
       };
     
       // icon normal state
       var divIcon = L.divIcon({
         className: "leaflet-data-marker",
         html: L.Util.template(iconSettings.mapIconUrl, iconSettings), //.replace('#','%23'),
         //html: '<h1>hello</h1>',
         iconAnchor: [12, 32],
         iconSize: [25, 30],
         popupAnchor: [0, -28]
       });
     
       // icon active state
       var divIconActive = L.divIcon({
         className: "leaflet-data-marker",
         html: L.Util.template(iconSettingsActive.mapIconUrl, iconSettingsActive), //.replace('#','%23'),
         iconAnchor: [18, 42],
         //iconSize: [36, 42],
         iconSize: [42,55],
         popupAnchor: [0, -30]
         
       });
     
       var coords = [
       [-49, 50],[-20, 20]  
       ];

       var markerArray = [];
       var iMarker = -1;
     
      
     
       $.each(coords, function(i, e) {
         // create the button
         //$('#controls').append('<button>' + i + '</button>')
     
         var marker = L.marker(e, {
           icon: divIcon,
           id: i
         });
     
         locationLayer.addLayer(marker);
     
         /*
         marker.on('mouseover', function(e) {
           if (iMarker == i) return;
           setTimeout(setActiveIcon, 10, this);
           if (iMarker >= 0) markerArray[iMarker].setIcon(divIcon);
           iMarker = i;
         });
     
         marker.on('mouseout', function(e) {
           this.setIcon(divIcon);
           iMarker = -1;
         });
         */
     
         markerArray[i] = marker;
       });
     
       locationLayer.addTo(map);
     
       $('#f1').on('mouseover', function(e) {
         markerArray[0].setIcon(divIconActive);
         $("#f1").css("background-color","AliceBlue");
         //$("#f1n").css("font-size","15");
         $("#f1n").css("font-size","20");
         console.log(0);
       });
     
       $('#f1').on('mouseleave', function(e) {
         markerArray[0].setIcon(divIcon);
         $("#f1n").css("font-size","15");
         $("#f1").css("background-color","white");
         //$("#f1n").css("font-size","13");
     
         console.log(0);
       });
     
       $('#f2').on('mouseover', function(e) {
         markerArray[1].setIcon(divIconActive);
         $("#f2n").css("font-size","20");
         $("#f2").css("background-color","AliceBlue");
         console.log(2);
       });
     
       $('#f2').on('mouseleave', function(e) {
         markerArray[1].setIcon(divIcon);
         $("#f2n").css("font-size","15");
     
         $("#f2").css("background-color","white");
         console.log(1);
     
       });
     
       markerArray[0].on('mouseover', function(e) {
         console.log('1');
         $("#f1").css("background-color","AliceBlue");
         $("#f1n").css("font-size","20");
         //markerArray[0].setIcon(divIconActive);
         //setTimeout(setActiveIcon, 10, this);
         });
     
       markerArray[0].on('mouseout', function(e) {
          console.log('out');
          $("#f1").css("background-color","white");
          $("#f1n").css("font-size","15");
     
          //markerArray[0].setIcon(divIcon);
     
         });
     
         markerArray[1].on('mouseover', function(e) {
         console.log('1');
         $("#f2n").css("font-size","20");
         $("#f2").css("background-color","AliceBlue");
         //markerArray[1].setIcon(divIconActive);
         //setTimeout(setActiveIcon, 10, this);
         });
     
       markerArray[1].on('mouseout', function(e) {
          console.log('out');
          $("#f2n").css("font-size","15");
          $("#f2").css("background-color","white");
          //markerArray[1].setIcon(divIcon);
     
         });
     
         // some markers
         var m = {
           x: w*3/4,
           y: h*2.5/4
           }
     

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