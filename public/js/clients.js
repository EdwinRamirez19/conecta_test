// ======================== GLOBAL VARIABLES =============================
var AllRegister = []


jQuery(document).ready(function() {
    Reload()
});



function Reload()
{
    $.ajax({
        url: 'api/clients',
        type: 'POST',
        data: {role: localStorage.role}
    })    

    .done(function(response) 
    {

        console.table(response);
        if (response.length != 0)
        {
            AllRegister = response        

            UpdateTable(response)
        }

    })

    .fail(function() {
        console.log("error");
    })
}






function UpdateTable(response)
{ 

    if ($.fn.DataTable.isDataTable('#table'))
    {
        $('#table').dataTable().fnClearTable();
        $('#table').dataTable().fnDestroy();
        $('#table thead').empty()
    }
    else
    {
        $('#table thead').empty()
    }

    
    if(response.length != 0)
    {
        let my_columns=[]
        $.each(response[0], function(key, value) 
        {
            var my_item = {};
            // my_item.class = "filter_C";
            my_item.data = key;
            if(key =='created_at')
            {
            
                my_item.title = 'Acción';

                my_item.render = function(data, type, row)
                {
                  return `  <div align="center">
                                <div class="btn-group btn-group-circle btn-group-solid" align="center">
                                  <a data-id=${row.id} id="Btn_delete_${row.id}" class='btn btn-circle btn-xs btn-danger'>
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                  </a> &nbsp; 
                                  
                                  <a data-id=${row.id} id="Btn_Edit_${row.id}" class='btn btn-xs btn-circle bg-green-jungle font-white'>
                                    <i class="fa fa-edit" aria-hidden="true"></i>
                                  </a>
                                </div>
                            </div>`
                }
                my_columns.push(my_item);  

            }else if(key =='descripcion')
            {
            
                my_item.title = 'Descripción';

                my_item.render = function(data, type, row)
                {
                  return `  <div'> 
                                ${row.descripcion}
                            </div>`
                }
                my_columns.push(my_item);            
            }

            else if(key =='correo')
            {
            
                my_item.title = 'Contacto';

                my_item.render = function(data, type, row)
                {
                    return `<div>
                                ${row.correo} 
                            </div>`  
                    
                }
                my_columns.push(my_item);            
            }

        })

        $('#table').DataTable({
            responsive: true,
            "destroy": true,


            data: response,


            "columns": my_columns,
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No hay datos registrados",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ empresas",
                "infoEmpty": "No hay empresas registrados",
                "infoFiltered": "(Filtrado de _MAX_  empresas)",
                "lengthMenu": "_MENU_ empresas",
                "search": "Buscar:",
                "zeroRecords": "No se han encontrado registros"
            },
            buttons: [
                { extend: 'print', className: 'btn dark btn-outline' },
                { extend: 'copy', className: 'btn red btn-outline' },
                { extend: 'pdf', className: 'btn green btn-outline' },
                { extend: 'excel', className: 'btn yellow btn-outline ' },
                { extend: 'csv', className: 'btn purple btn-outline ' },
                { extend: 'colvis', className: 'btn dark btn-outline', text: 'Columns'}
            ],


            "order": [
                [0, 'asc']
            ],

            "columnDefs": [
                { "width": "20%", "targets": 2 }
            ],

            "lengthMenu": [
                [10, 15, 20, -1],
                [10, 15, 20, "Todos"] 
            ]
        });
    }
}

// ======================================================================================
