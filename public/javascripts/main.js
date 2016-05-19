$(document).ready(function(){

   $('#delete').on('click', function(e){
    e.preventDefault();

    $('input:checked').each(function(index, value){ 
      var val = $(this).attr('id');
      console.log($(this));
      var $thisInput = $(this);

      $.ajax({
        url:'/products/'+val,
        type:'DELETE'
      }).done(function(){
        $thisInput.parents('tr').remove();
      });

    });
  });

    $('#delete2').on('click', function(e){
        e.preventDefault();

        $('input:checked').each(function(index, value){
            var val = $(this).attr('id');
            console.log($(this));
            var $thisInput = $(this);

            $.ajax({
                url:'/customers/'+val,
                type:'DELETE'
            }).done(function(){
                $thisInput.parents('tr').remove();
            });

        });
    });

});
