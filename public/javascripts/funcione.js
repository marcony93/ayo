$(function() {
	$("#typed").typed({
		strings: ["Apoyo Escolar","Club de Jovenes","Consulta Medica","Escuela para padres"],
		typeSpeed: 100,
    backDelay: 1500,
    loop: true,
    callback: function(){}
	});
});

$("#donaciones").on("pagecreate",function(e){
    var librosList = $("#librosList");
    $.ajax("api/obtenerBeneficiados",
            {
                "method":"GET",
                "data":{},
                "dataType":"json",
                "success":function(jsonDoc,status,jqXHR){
                    var htmlstr = "";
                    for(var i = 0 ; i < jsonDoc.beneficiados.length; i++){
                        htmlstr += '<li id="jovenes"><img src="images/fotos/'+jsonDoc.beneficiados[i].Id+'.jpg"><strong>Nombre: '+jsonDoc.beneficiados[i].Nombre+'</strong><p> Edad: '+jsonDoc.beneficiados[i].Edad+'<br>Encargada: '+jsonDoc.beneficiados[i].Encargada+'<br>Escuela: '+jsonDoc.beneficiados[i].Escuela+'<br><a href="/api/selecBene?Id='+jsonDoc.beneficiados[i].Id+'&Nombre='+jsonDoc.beneficiados[i].Nombre+'"  id="insertar" data-role="button" class="ui-btn ui-btn-inline" data-ajax="false">Donar</a>'+'</p><li>'
                    }
                    librosList.html(htmlstr).listview("refresh");

                },
                "error":function(jqXHR,status, errorMsg){
                }
            }
        );
});

$("#donar").on("pagecreate",function(e){
    console.log("entro");
});
