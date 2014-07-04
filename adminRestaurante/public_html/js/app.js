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

function cargarPedidios(){
    
}