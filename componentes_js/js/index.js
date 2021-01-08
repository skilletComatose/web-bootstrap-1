$(()=> {
    $("[data-toggle='tooltip']").tooltip();
    $("[data-toggle='popover']").popover();
    $('.carousel').carousel({
        interval:2001
    });

    $('#contacto').on('show.bs.modal',(e)=>{
        console.log('el modal contacto se esta mostrando')

            $('#contactoBtn').removeClass("btn-outline-success").addClass("btn-primary").prop("disabled",true)
        
    } );

    $('#contacto').on('shown.bs.modal',(e)=>{
        console.log('el modal contacto se mostró')
    } );

    $('#contacto').on('hidden.bs.modal',(e)=>{
        console.log('el modal contacto se esta ocultó')

        $('#contactoBtn').prop("disabled",false)
    } );

    $('#contacto').on('hide.bs.modal',(e)=>{
        console.log('el modal contacto se esta ocultando')
    } );


}); 
