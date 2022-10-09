$("#AddItemFormFile,#AddItemFormFileMultiple,#AddItemFormFileDisabled,#AddItemFormFileSm,#DeleteItemFormFileSm,#DeleteItemFormFileDisabled,#DeleteItemFormFileMultiple,#DeleteItemFormFile").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

//Add Items
$('#addItemButton').click(function () {

    let itemID = $("#AddItemFormFile").val();
    let itemName = $("#AddItemFormFileMultiple").val();
    let itemQty = $("#AddItemFormFileDisabled").val();
    let itemPrice = $("#AddItemFormFileSm").val();


    var itemObject = {
        id: itemID,
        name: itemName,
        qty: itemQty,
        price: itemPrice
    }

    items.push(itemObject);

    $("#AddItemFormFile").val("");
    $("#AddItemFormFileMultiple").val("");
    $("#AddItemFormFileDisabled").val("");
    $("#AddItemFormFileSm").val("");

    loadItemData();

});

//Search Items
function searchItems(itemID) {
    for (let item of items) {
        if (item.id == itemID) {
            return item;
        }
    }
    return null;
}

function setTextFieldValues(id, name, qty, price) {
    $("#DeleteItemFormFile").val(id);
    $("#DeleteItemFormFileMultiple").val(name);
    $("#DeleteItemFormFileDisabled").val(qty);
    $("#DeleteItemFormFileSm").val(price);
}

$('#itemSearchBtn').click(function (){
    let typedId = $("#DeleteItemFormFile").val();
    let item = searchItems(typedId);
    if (item != null) {
        setTextFieldValues(item.id, item.name, item.qty, item.price);
    } else {
        alert("There is no item available for that " + typedId);
        setTextFieldValues("", "", "", "");
    }
});

//Delete Items
$('#deleteItemBtn').click(function (){
    let ItemID = $("#DeleteItemFormFile").val();
    let item = searchItems(ItemID);
    if (item != null) {
        let option = confirm("Do you really want to delete Item id :" + ItemID);
        if (option){
            let indexNumber = items.indexOf(item);
            items.splice(indexNumber, 1);
            loadItemData();
            alert("Item Successfully Deleted..");
            setTextFieldValues("", "", "", "");
        }
    } else {
        alert("No such item to delete. please check the id");
    }
});

//Update Items
$('#UpdateItemBtn').click(function (){
    let ItemID = $("#DeleteItemFormFile").val();
    let item = searchItems(ItemID);
    if (item != null) {
        item.id = $("#DeleteItemFormFile").val();
        item.name = $("#DeleteItemFormFileMultiple").val();
        item.qty = $("#DeleteItemFormFileDisabled").val();
        item.price = $("#DeleteItemFormFileSm").val();
        loadItemData();
        alert("Item Updated Successfully");
        setTextFieldValues("", "", "", "");
    } else {
        alert("Item Updated Failed..!");
    }
});

function loadItemData() {
    $('#itemTable').empty();
    for (var i of items) {
        var row = "<tr><td>" + i.id + "</td><td>" + i.name + "</td><td>" + i.qty + "</td><td>" + i.price + "</td></tr>";
        $('#itemTable').append(row);
    }
}