

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