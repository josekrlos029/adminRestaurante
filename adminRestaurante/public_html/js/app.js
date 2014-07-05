function update() {

    var idRestaurante = localStorage.getItem("idRestaurante");
    var regid = localStorage.getItem("regId");
    var data = {
        regId: regid,
        idRestaurante: idRestaurante
    };
    var url = "http://tudomicilio.liceogalois.com/restaurante/updateRegId";
    //var url = "http://192.168.1.33/domicilios/restaurante/updateRegId";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    })
            .done(function(msg) {
                var json = eval("(" + msg + ")");
                if (json.msj == "exito") {
                    //alert("ok");

                } else if (json.msj == "no") {
                    alert("No puedes recibir pedidos, intenta ingresando nuevamente.");
                } else {
                    alert("Error en el servidor, contactate con la empresa TuDomicilio ");
                }

            });

}

function cargarPedidios() {

    var $this = $(this),
            theme = $this.jqmData("theme") || $.mobile.loader.prototype.options.theme,
            msgText = $this.jqmData("msgtext") || $.mobile.loader.prototype.options.text,
            textVisible = $this.jqmData("textvisible") || $.mobile.loader.prototype.options.textVisible,
            textonly = !!$this.jqmData("textonly");
    html = $this.jqmData("html") || "";
    $.mobile.loading("show", {
        text: msgText,
        textVisible: textVisible,
        theme: theme,
        textonly: textonly,
        html: html
    });

    var idRestaurante = localStorage.getItem("idRestaurante");

    var data = {
        idRestaurante: idRestaurante
    };
    var url = "http://tudomicilio.liceogalois.com/restaurante/domicilios";
    //var url = "http://192.168.1.33/domicilios/restaurante/domicilios";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        $("#tabs").append(msg);
        setTimeout(function() {
            $('#lista1').trigger('create');
            $('#lista2').trigger('create');
            $('#lista3').trigger('create');
            $(".l1").trigger('create');
            $(".l2").trigger('create');
            $.mobile.loading("hide");
        }, 2000);



    });

}