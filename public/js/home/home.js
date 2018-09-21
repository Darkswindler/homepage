new Vue({
    el: '#bluebaby',
    data() {
        return  {
                    list: ""
                }
    },
    mounted() {
        axios
            .get('/getuserlist')
            .then(data => {
                this.list = data.data.list;
                console.log(this.list);
            })
            // .then(() => {
            //     $("#loading").css('display', 'none');
            // })
    },
    methods: {
        go: (driverID) => {
            window.location.href = ("https://dev-driverweb.herokuapp.com/html/driverinformation.html" + "?id=" + driverID);
            // window.location.href = ("http://localhost:8080/html/driverinformation.html" + "?id=" + driverID);
        }
    }
});
$(document).ready(function() {

    // initialize
    $('#video').attr('height', $(window).width() / 2 / 16 * 9);

    // resize
    $(window).resize(function() {
        $('#video').removeAttr('height');
        $('#video').attr('height', $(window).width() / 2 / 16 * 9);
    });
});
$(document).ready(function() {

    // initialize
    $('#video-rwd').attr('height', $(window).width() / 2 );

    // resize
    $(window).resize(function() {
        $('#video-rwd').removeAttr('height');
        $('#video-rwd').attr('height', $(window).width() / 2 );
    });
});

android = () => {
    window.location.href = 'https://play.google.com/store/apps/details?id=com.BlueNet.Ride';
}

android_driver = () => {
    window.location.href = 'https://play.google.com/store/apps/details?id=com.BlueNet.Driver';
}

ios = () => {
    window.location.href = 'https://itunes.apple.com/tw/app/bluenet-ride/id924391575?l=zh&mt=8';
}

facebook = () => {
    window.location.href = 'https://www.facebsook.com/BlueNetRide/?fb_dtsg_ag=AdzNCxXjPAvA0zvxoO-1l5eJckz5Ub98XsaIDL5-f4irdw%3AAdyEPd5WpLRDDKp9HuPpP84hcBVZPKqxol12HcqJ5gn-RA';
}

line = () => {
    window.location.href = 'https://line.me/R/ti/p/%40upo7574o';
}
function rwd(width768) {
    if (width768.matches) { // If media query matches

        $('#dot-rwd>span>i').attr('class', 'fas fa-circle mr-2');

    } else {
        $('#dot-rwd>span>i').attr('class', 'fas fa-circle mr-5');
    }
}

const width768 = window.matchMedia("(max-width: 768px)")
rwd(width768) // Call listener function at run time
width768.addListener(rwd) // Attach listener function on state changes
