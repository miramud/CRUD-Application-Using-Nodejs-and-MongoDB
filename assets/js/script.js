const addForm = document.getElementById('add_user')
const fullName = document.getElementById('name')

// addForm.addEventListener('submit', (e) => {
//     // console.log(fullName.value)
//     alert(`New User (${fullName.value}) Was Added Successfully`)
// })

$("#add_user").submit(function(event){
    alert(`New User (${fullName.value}) Was Added Successfully`);
})

// UPDATE USER DATA
$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})


// DELETE USER DATA
if(window.location.pathname == "/"){
    $ondelete = $(".table tbody tr td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}