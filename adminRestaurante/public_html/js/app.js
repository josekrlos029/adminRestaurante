// Diccionario de Estados
// p -> pendiente
// a -> Aceptado por parte del restaurante
// n -> No Aceptado
// c -> Cancelado
// l -> Domicilio listo
// r -> Recibida

function atras() {
    history.back();
}

function update() {

    var idRestaurante = localStorage.getItem("idRestaurante");
    var regid = localStorage.getItem("regId");
    if (regid != "" && regid != null) {
        var data = {
            regId: regid,
            idRestaurante: idRestaurante
        };
    } else {
        var data = {
            token: localStorage.getItem("token"),
            idRestaurante: idRestaurante
        };
    }

    var url = "http://admin.tudomicilio.net/restaurante/updateRegId";
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
    var url = "http://admin.tudomicilio.net/restaurante/domicilios";
    //var url = "http://192.168.1.33/domicilios/restaurante/domicilios";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        $("#contenido").html(msg);
        setTimeout(function() {
            $('#lista1').trigger('create');
            $('#lista2').trigger('create');
            $('#lista3').trigger('create');
            $("#uno").click();
            $("#two").hide();
            $("#three").hide();
            //$('.boton').button('refresh');
            $(".l1").trigger('create');
            $(".l2").trigger('create');
            $.mobile.loading("hide");
        }, 1000);

    });

}

function pop(idProducto) {
    $("#idProducto").val(idProducto);
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

    var data = {
        idProducto: idProducto
    };
    var url = "http://admin.tudomicilio.net/restaurante/consultarEstadoProducto";
    //var url = "http://192.168.1.33/domicilios/restaurante/domicilios";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {
        var json = eval("(" + msg + ")");
        if (json.estado == "d") {
            $("#btnInhabilitar").show();
        } else if (json.estado == "n") {
            $("#btnHabilitar").show();
        }
        $.mobile.loading("hide");

    });
}

function habilitar() {

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

    var data = {
        idProducto: $("#idProducto").val(),
        estado: 'd'
    };
    var url = "http://admin.tudomicilio.net/restaurante/modificarEstadoProducto";
    //var url = "http://192.168.1.33/domicilios/restaurante/domicilios";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {
        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Estado cambiado a activo Correctamente");
            $("#close").show();
        } else if (json.estado == "n") {
            alert("Error en el servidor, contactate con TuDomicilio");
        }
        $.mobile.loading("hide");
    });
}

function inhabilitar() {

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

    var data = {
        idProducto: $("#idProducto").val(),
        estado: 'n'
    };
    var url = "http://admin.tudomicilio.net/restaurante/modificarEstadoProducto";
    //var url = "http://192.168.1.33/domicilios/restaurante/domicilios";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {
        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Estado cambiado a inactivo Correctamente");
            $("#close").show();
        } else if (json.estado == "n") {
            alert("Error en el servidor, contactate con TuDomicilio");
        }
        $.mobile.loading("hide");

    });
}

function popAceptar(idDomicilio) {
    $("#idAceptar").val(idDomicilio);
}

function popRechazar(idDomicilio) {
    $("#idRechazar").val(idDomicilio);
}

function popCancelar(idDomicilio) {
    $("#idCancelar").val(idDomicilio);
}

function popListo(idDomicilio) {
    $("#idListo").val(idDomicilio);
}

function popUbicacion(lat, lng, direccion, referencia) {
    lat = '10.4662302';
    lng = '-73.2398247';
    var mapa = new GMaps({
        div: '#mapa',
        lat: lat,
        lng: lng,
        zoom: 13,
        zoomControl: false,
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false
    });
}

function aceptar() {
    var idDomicilio = $("#idAceptar").val();
    var data = {
        idDomicilio: idDomicilio,
        estado: "a"
    };
    var url = "http://admin.tudomicilio.net/restaurante/cambiarEstadoDomicilio";
    //var url = "http://192.168.1.33/domicilios/restaurante/cambiarEstadoDomicilio";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Domicilio Aceptado, Se le notificará al cliente la novedad !");
        } else if (json.msj == "no") {
            alert("Error en el servidor, intenta nuevamente");
        } else {
            alert("Error en el servidor, contactate con la empresa TuDomicilio ");
        }
        $("#close1").click();
        cargarPedidios();

    });
}

function rechazar() {
    var idDomicilio = $("#idRechazar").val();
    var data = {
        idDomicilio: idDomicilio,
        estado: "n"
    };
    var url = "http://admin.tudomicilio.net/restaurante/cambiarEstadoDomicilio";
    //var url = "http://192.168.1.33/domicilios/restaurante/cambiarEstadoDomicilio";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Domicilio Rechazado, Se le notificará al cliente la novedad !");
        } else if (json.msj == "no") {
            alert("Error en el servidor, intenta nuevamente");
        } else {
            alert("Error en el servidor, contactate con la empresa TuDomicilio ");
        }
    });
    $("#close2").click();
    cargarPedidios();

}

function cancelar() {
    var idDomicilio = $("#idCancelar").val();
    var data = {
        idDomicilio: idDomicilio,
        estado: "c"
    };
    var url = "http://admin.tudomicilio.net/restaurante/cambiarEstadoDomicilio";
    //var url = "http://192.168.1.33/domicilios/restaurante/cambiarEstadoDomicilio";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Domicilio Cancelado, Se le notificará al cliente la novedad !");
        } else if (json.msj == "no") {
            alert("Error en el servidor, intenta nuevamente");
        } else {
            alert("Error en el servidor, contactate con la empresa TuDomicilio ");
        }
        $("#close3").click();
        cargarPedidios();
    });
}

function listo() {
    var idDomicilio = $("#idListo").val();
    var data = {
        idDomicilio: idDomicilio,
        estado: "l"
    };
    var url = "http://admin.tudomicilio.net/restaurante/cambiarEstadoDomicilio";
    //var url = "http://192.168.1.33/domicilios/restaurante/cambiarEstadoDomicilio";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Domicilio Listo, Se le notificará al cliente la novedad !");
        } else if (json.msj == "no") {
            alert("Error en el servidor, intenta nuevamente");
        } else {
            alert("Error en el servidor, contactate con la empresa TuDomicilio ");
        }
        $("#close4").click();
        cargarPedidios();

    });
}

function consultarEstado(){
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

    var data = {
        idRestaurante: localStorage.getItem("idRestaurante")
    };
    var url = "http://admin.tudomicilio.net/restaurante/consultarEstadoRestaurante";
    //var url = "http://192.168.1.33/domicilios/restaurante/domicilios";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {
        var json = eval("(" + msg + ")");
        if (json.estado == "a") {
            $("#abrir").hide();
        } else if (json.estado == "c") {
            $("#cerrar").hide();
            alert("Recuerda Abrir el sitio en el menú para que recibas los pedidos");
            $("#tt").text("Sitio Cerrado");
        }
        $.mobile.loading("hide");

    });
}

function cerrarSitio(){
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
    var data = {
        idRestaurante: localStorage.getItem("idRestaurante"),
        estado: "c"
    };
    var url = "http://admin.tudomicilio.net/restaurante/cambiarEstadoRestaurante";
    //var url = "http://192.168.1.33/domicilios/restaurante/cambiarEstadoDomicilio";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Sitio Cerrado Exitosamente");
            location.href ="home.html";
        } else if (json.msj == "no") {
            alert("Error en el servidor, intenta nuevamente");
        } else {
            alert("Error en el servidor, contactate con la empresa TuDomicilio ");
        }
        
        $.mobile.loading("hide");
});

}

function abrirSitio(){
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
    var data = {
        idRestaurante: localStorage.getItem("idRestaurante"),
        estado: "a"
    };
    var url = "http://admin.tudomicilio.net/restaurante/cambiarEstadoRestaurante";
    //var url = "http://192.168.1.33/domicilios/restaurante/cambiarEstadoDomicilio";
    $.ajax({
        type: "POST",
        url: url,
        data: data
    }).done(function(msg) {

        var json = eval("(" + msg + ")");
        if (json.msj == "exito") {
            alert("Sitio Abierto Exitosamente, atento a los pedidos ! ");
            location.href ="home.html";
        } else if (json.msj == "no") {
            alert("Error en el servidor, intenta nuevamente");
        } else {
            alert("Error en el servidor, contactate con la empresa TuDomicilio ");
        }
        
        $.mobile.loading("hide");
});    
}
