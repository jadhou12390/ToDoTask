function insert_user() {


        var selectedValue;
        var adminRadio = document.getElementById("role_admin_0");
        var userRadio = document.getElementById("role_user_0");

        if (adminRadio && adminRadio.checked) {
            selectedValue = adminRadio.value;
          
        } else if (userRadio && userRadio.checked) {
            selectedValue = userRadio.value;
           
        } else {
            console.log("No radio button selected");
            return;
        }

       // Rest of your code...
    
    var username = $("#username_0").val();
    var password = $("#password_0").val();
   

    if (username != "" && password != "" && selectedValue!="") {

        $.ajax({
            type: "POST",
            url: "/User/ADD",
            data: {
                username: username,
                password: password,
                role: selectedValue
            },
            success: function (data) {
               
                if (data.success) {
                    var updated_row_role = "";
                    if (data.added_role == "admin") {
                        updated_row_role = "<td><select name='role' id='role_" + data.id + "' class='form-control'><option value='admin' selected>admin</option><option value='user'>user</option></select></td>";
                    } else if (data.added_role == "user") {
                        updated_row_role = "<td><select name='role' id='role_" + data.id + "' class='form-control'><option value='admin'>admin</option><option value='user' selected>user</option></select></td>";
                    }

                    var newRow = "<tr>" +
                        "<td><input type='text' id='user_id_" + data.id + "' name='userr=_id' value='" + data.id + "' class='form-control hidden' readonly /></td>" +
                        "<td><input type='text' id='username_" + data.id + "' name='username' value='" + data.added_username + "' class='form-control' /></td>" +
                        "<td><input type='password' id='passsword_" + data.added_password + "'value='"+data.added_password+"' name='password' class='form-control' />" +
                        "</td>" + updated_row_role
                        +
                        "<td><div class='btn-group'>" +
                        "<button class='btn btn-upd btn-sm' onclick='update_user(" + data.id + ");'>" +
                        "<i class='fas fa-edit'></i>" +
                        "</button>" +
                        "<button class='btn btn-danger btn-sm ml-2' onclick='remove_user(" + data.id + ");' style='color: white; background-color: #dc3545;'>" +
                        "<i class='fas fa-trash'></i>" +
                        "</button>" +
                        "</div>" +
                        "</td>" +
                        "</tr>";
                    console.log(newRow);
                    $("#rows_user").append(newRow);

                    // Clear the input field
                    $("#username_0").val("");
                    $("#password_0").val("");


                } else {
                  alert(data.message)
                }
            },
            error: function (error) {
                console.error(error);
            }
        });


    } else {
        alert("Please enter username and password");
    }



   

}

function remove_user(id_user) {

    $.ajax({

        type: "POST",
        url: "/User/Delete",
        data: {
            user_id: id_user
        },
        success: function (data) {


            $("#user_id_" + id_user).closest('tr').remove();
        },
        error: function (error) {
            console.error(error);
        }
    });

}