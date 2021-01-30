$(function(){
    console.log('Working');
    $("#signup").on('click', function(event){
        event.preventDefault();
        var fname   = $("#fname").val();
        var lname      = $("#lname").val();
        var password   = $("#password").val();
        var password2  = $("#password2").val();
        var calories_per_day = $("#calorie").val();
        var phone    = $("#phone").val();
        var email     = $("#email").val(); 
        var username    = $("#username").val(); 
        // console.log(lname);

        // if(!fname || !lname || !password || !password2 || !calories_per_day || !phone || !email || !username ){ 
        //     $("#msgDiv").show().html("All fields are required.");
        // } else if(password2 != password){
        //     $("#msgDiv").show().html("Passwords should match.");
        // } 
        // else{ 
            $.ajax({
                url: "signup/api/user",
                method: "POST",
                data: { fname: fname, lname: lname, password: password, password2: password2, calories_per_day: calories_per_day, phone: phone, email: email, username:username},
                // dataType: "json",
                // contentType: "application/x-www-form-urlencoded",
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
                            $("#msgDiv").removeClass('alert-danger').addClass('alert-success').html('SUCCESS').show(); 
                            location.href = "http://127.0.0.1:5000/"

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