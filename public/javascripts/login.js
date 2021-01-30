$(function(){
    console.log('Working');
    $("#login").on('click', function(event){
        event.preventDefault();
        var username   = $("#username").val();
        var password   = $("#password").val();
        // console.log(username);
        // console.log(lname);
//         console.log(JSON.stringify({ fname: fname, lname: lname, password: password, password: password2, calories_per_day: calories_per_day, phone: phone, email: email, username:username}),
// )

        if(!username){ 
            $("#msgDiv").show().html("Username is required");
        } else if(!password){
            $("#msgDiv").show().html("Password is required");
        } 
        else{ 
            $.ajax({
                url: "/login/user",
                method: "POST",
                data: { username: username, password: password},
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
                        }
                        else if(data.success === true)
                        {   
                            location.href = "http://127.0.0.1:5000/home"


                        }



                    }


                },
                error: function(jqXHR,exception){

                        var msg = '';
                        if(jqXHR.status == 404){
                            alert('Username not Found')
                        }else if(jqXHR.status == 400){
                            alert('Password Incorrect')
                        }else if (exception === 'parsererror') {
                            msg = 'Requested JSON parse failed.';
                        } else if (exception === 'timeout') {
                            msg = 'Time out error.';
                        } else if (exception === 'abort') {
                            msg = 'Ajax request aborted.';
                        } else {
                            msg = 'Uncaught Error.\n' + jqXHR.responseText;
                        }
                        $('#msgDiv').html(msg);


                }


                
              })
                
            
        
        }


    });
});