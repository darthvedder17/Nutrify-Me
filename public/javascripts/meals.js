
$(function(){


    $("#fetch").on('click', function(event){
        event.preventDefault();
        var meal   = $("#meal").val();
        var calorie = $("#calorie").val();
        $.ajax({
        method: "POST",
        url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
        data: {
          query:meal
        },
        headers: {
          "x-app-id": "be36ff16",
          "x-app-key": "7483c3bd7da751536fdf87f0e02a4345",
        },
        success: function(data){
          var food_calorie = data.foods[0].nf_calories
          $('#calorie').val(food_calorie);
        }

      })
      



    });





    $("#submit").on('click', function(event){
        event.preventDefault();
        
        var datetime = $("#datetime").val();
        var meal    = $("#meal").val();

        var calorie = $("#calorie").val();
        var description    = $("#description").val(); 
        var username = '';
      
            $.ajax({

                url: "/meals/user",
                method: "POST",
                data: { datetime: datetime, meal: meal, calorie: calorie, description: description},
                success: function(data){

                    if ( data ) {
                        if(data.status == 'error'){

                            var errors = '<ul>';
                            $.each( data.message, function( key, value ) {
                                errors = errors +'<li>'+value.msg+'</li>';
                            });

                            errors = errors+ '</ul>';
                            $("#msgDiv").html(errors).show();
                        }else{

                            location.href = "http://127.0.0.1:5000/dashboard"
                            console.log('Meal added successfully')
                        }


                    }

                },
                error: function(xhr,status,error){
                    var errors =  JSON.parse(xhr.responseText);
                    for(var key in errors){
                        if(Object.prototype.hasOwnProperty.call(errors,key)){
                          var val = errors[key]
                          alert(val)

                        }


                    }


                } 

              })
                
            
        
        


    });
});