var tabla;

function init()
{
	$('#ruta_form').on("submit", function(e){
		insertOrUpdate(e);
	});
}


function insertOrUpdate(e)
{
	e.preventDefault();
	var formData = new FormData($('#ruta_form')[0]);
	$.ajax({
		url: "../../controller/rutaController.php?op=insertOrUpdate",
		type: "POST",
		data: formData,
		contentType: false,
		processData: false,
		success: function(data){
			$('#ruta_form')[0].reset();
			$('#modalMntRuta').modal('hide');
			$('#ruta_data').DataTable().ajax.reload();
			swal({
				title: "HelpDesk",
				text: "Registro completado.",
				type: "success",
				confirmButtonClass: "btn-success"
			});
		}
	});
}

$(document).ready(function(){
	tabla = $('#ruta_data').dataTable({
		"aProcessing": true,
        "aServerSide": true,
        dom: 'Bfrtip',
        "searching": true,
        lengthChange: false,
        colReorder: true,
        buttons: [		          
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5'
        ],
		"ajax":{
			url: '../../controller/rutaController.php?op=listRuta',
			type: 'POST',
			dataType: 'JSON',
			error: function(e){
				console.log(e.responseText);
			}
		},
		"bDestroy": true,
        "responsive": true,
        "bInfo":true,
        "iDisplayLength": 10,
        "autoWidth": false,
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        } 
	}).DataTable();
});

/*
* Su función es visualizar el detalle de la ruta por medio del ID de la rita (En pocas
* palabras, enviar el ID a esa ventana)
*/
function ver(id)
{
	window.open('http://localhost/ProyectosUniversidad/Proyecto-Electiva-git-github/view/detalleRuta/?ID='+id+'');
}

function editar(id_ruta){
	$('#mdltitulo').html('Editar Registro');
	
	$.post("../../controller/rutaController.php?op=listRutaById", { id_ruta : id_ruta}, function(data) {
    	data = JSON.parse(data);
    	$('#id_ruta').val(data.id_ruta);
    	$('#sector').val(data.sector);
    	$('#descripcion').val(data.descripcion);
    	$('#latitud').val(data.latitud);
    	$('#longitud').val(data.longitud);
    });
	
	$('#modalMntRuta').modal('show');
}

function eliminar(id_ruta){
	swal({
    	title: "MilkCollector",
    	text: "¿Esta seguro de eliminar la ruta?",
    	type: "error",
    	showCancelButton: true,
    	confirmButtonClass: "btn-danger",
    	confirmButtonText: "Si",
    	cancelButtonText: "No",
    	closeOnConfirm: false
	},
	function(isConfirm)
	{
		if(isConfirm){
			$.post("../../controller/rutaController.php?op=deleteRutaById", { id_ruta : id_ruta}, function(data) {
        	});
        	
        	$('#ruta_data').DataTable().ajax.reload();
        	
			swal({
				title: "MilkCollector",
				text: "Registro eliminado.",
				type: "success",
				confirmButtonClass: "btn-success"
			});
		}
	});
}

$(document).on("click", "#btnnuevo", function(){
	$('#mdltitulo').html('Nuevo Registro');
	$('#ruta_form')[0].reset();
	$('#modalMntRuta').modal('show');
	// Obtener la latitud y longitud al abrir el modal
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // Actualiza los campos de entrada en el formulario dentro del modal
            $('#latitud').val(position.coords.latitude.toFixed(5));
            $('#longitud').val(position.coords.longitude.toFixed(5));
        }, function (error) {
            console.error("Error al obtener la ubicación: ", error.message);
        });
    } else {
        console.error("Geolocalización no es compatible en este navegador");
    }
});

init();