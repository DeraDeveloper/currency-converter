
 navigator.serviceWorker.register('/sw/index.js').then((reg) => {
    console.log("service-worker registered");
  });
  
   $(document).ready(function () {

        $('#butCallAjax').click(function () {
            jQuery.support.cors = true;


            $.ajax(
                {
                    type: "GET",
                    url: 'https://free.currencyconverterapi.com/api/v5/convert?q=USD_PHP,PHP_USD',
                    data: "",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {

                      console.log(data);
                    },
                    error: function (msg, url, line) {
                        alert('error trapped in error: function(msg, url, line)');
                        alert('msg = ' + msg + ', url = ' + url + ', line = ' + line);

                    }
                });


            //alert('button click');

        });
    });