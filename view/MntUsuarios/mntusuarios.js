var tabla;

function init()
{
	$('#user_form').on("submit", function(e){
		insertOrUpdate(e);
	});
}

function insertOrUpdate(e)
{
	e.preventDefault();
	var formData = new FormData($('#user_form')[0]);
	$.ajax({
		url: "../../controller/userController.php?op=insertOrUpdate",
		type: "POST",
		data: formData,
		contentType: false,
		processData: false,
		success: function(data){
			$('#user_form')[0].reset();
			$('#modalMntUsuario').modal('hide');
			$('#user_data').DataTable().ajax.reload();
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
	tabla = $('#user_data').dataTable({
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
			url: '../../controller/userController.php?op=listUser',
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

function editar(id_usuario){
	$('#mdltitulo').html('Editar Registro');
	
	$.post("../../controller/userController.php?op=listUserById", { id_usuario : id_usuario}, function(data) {
    	data = JSON.parse(data);
    	$('#id_usuario').val(data.id_usuario);
    	$('#nombre_usuario').val(data.nombre_usuario);
    	$('#apellido_usuario').val(data.apellido_usuario);
    	$('#correo').val(data.correo);
    	$('#documento').val(data.documento);
    	$('#celular').val(data.celular);
    	$('#direccion').val(data.direccion);
    	$('#clave').val(data.clave);
    	$('#id_rol').val(data.id_rol).trigger('change');
    });
	
	$('#modalMntUsuario').modal('show');
}

function eliminar(id_usuario){
	swal({
    	title: "HelpDesk",
    	text: "¿Esta seguro de eliminar el usuario?",
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
			$.post("../../controller/userController.php?op=deleteUserById", { id_usuario : id_usuario}, function(data) {
        	});
        	
        	$('#user_data').DataTable().ajax.reload();
        	
			swal({
				title: "HelpDesk",
				text: "Registro eliminado.",
				type: "success",
				confirmButtonClass: "btn-success"
			});
		}
	});
}

$(document).on("click", "#btnnuevo", function(){
	$('#mdltitulo').html('Nuevo Registro');
	$('#user_form')[0].reset();
	$('#modalMntUsuario').modal('show');
});

init();