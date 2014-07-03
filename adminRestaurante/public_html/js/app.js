/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    consultarFooter();
    
});

function consultarFooter(){
    if (localStorage.getItem("rows") == "true") {


        $('<div data-role="footer" id="footer"><div data-role="navbar"><ul><li><a href="carrito.html" data-ajax="false" data-icon="shop" class="ui-btn-active">Carrito de Compras</a></li></ul></div></div>')
                .appendTo($("#pagina").closest(".ui-page"))
                .toolbar({position: "fixed"
                });

        // This second step ensures that the insertion of the new toolbar does not
        // affect page height
        $.mobile.resetActivePageHeight();

    }else{
        $("#footer").hide();
    }
}

function pop(idProducto, nombre, descripcion, precio) {

    var db = window.openDatabase("carrito", "1.0", "listacompraDB", 1000000);

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM lista WHERE id=?', [idProducto], function(tx, results) {
            var len = results.rows.length;
            if (len != 0) {
                $("#canti").val(parseInt(results.rows.item(0).cantidad));
                $("#btnPop").text("Modificar");
                $("#btnEliminar").show();
            }
        }, null);
    });
    $("#titu").text(nombre);
    $("#desc").text(descripcion);
    $("#prec").text("$" + precio);
    $("#idProducto").val(idProducto);

}
function añadir() {

    var db = window.openDatabase("carrito", "1.0", "listacompraDB", 1000000);
    var precio = $("#prec").text();

    precio = precio.replace('$', '');
    if ($("#btnPop").text() == 'Añadir') {


        if ($("#canti").val() == "" || $("#canti").val() == null || $("#canti").val() == " ") {
            alert("Por Favor digite una cantidad Valida");
        } else {

            db.transaction(function(tx) {
                tx.executeSql('SELECT * FROM lista', [], function(tx, results) {
                    var len = results.rows.length;
                    if (len == 0) {
                        insert(precio);
                    } else {
                        if (results.rows.item(0).idRestaurante == localStorage.getItem("idRestaurante")) {
                            insert(precio);
                        } else {
                            alert("Ojoo");
                        }
                    }

                    /*for (var i = 0; i < len; i++) {
                     
                     alert(results.rows.item(i).log);
                     }*/
                }, null);
            });

        }
    } else {
        update();
    }
}

function insert(precio) {
    var db = window.openDatabase("carrito", "1.0", "listacompraDB", 1000000);
    var cantidad = $("#canti").val();
    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO lista (id, nombre, descripcion, precio, cantidad, idRestaurante) VALUES (?, ?, ?, ?, ?, ?)', [$("#idProducto").val(), $("#titu").text(), $("#desc").text(), precio, cantidad, localStorage.getItem("idRestaurante")]);
        reset();
        localStorage.setItem("rows", "true");
        if (getNameURLWeb() != "carrito.html") {
            consultarFooter();
        }
    });
    $("#close").click();

}

function update() {
    var cantidad = $("#canti").val();
    var db = window.openDatabase("carrito", "1.0", "listacompraDB", 1000000);
    db.transaction(function(tx) {
        tx.executeSql('UPDATE lista SET cantidad=? WHERE id=?', [cantidad, $("#idProducto").val()]);
        reset();
        comprobarLista();
        if (getNameURLWeb() == "carrito.html") {
            recargarLista();
        }else{
            consultarFooter();
        }
    });
    $("#close").click();
}

function eliminar() {
    var db = window.openDatabase("carrito", "1.0", "listacompraDB", 1000000);
    db.transaction(function(tx) {
        tx.executeSql('DELETE FROM lista WHERE id=?', [$("#idProducto").val()]);
        reset();
        if (getNameURLWeb() == "carrito.html") {
            comprobarLista();
            recargarLista();
        }else{
            consultarFooter();
        }
        localStorage.setItem("rows", "false");
    });
    $("#close").click();
}

function reset() {
    $("#canti").val("");
    $("#btnPop").text("Añadir");
    $("#btnEliminar").hide();
}

function getNameURLWeb() {
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    return sPage;
}

function comprobarLista() {
    var db = window.openDatabase("carrito", "1.0", "listacompraDB", 1000000);
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM lista', [], function(tx, results) {
            var len = results.rows.length;
            if (len == 0) {
                localStorage.setItem("rows", "false");
            }
        }, null);
    });

}