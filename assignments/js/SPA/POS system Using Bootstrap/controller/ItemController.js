function loadItemData() {
    for (var i of items) {
        var row = "<tr><td>" + i.id + "</td><td>" + i.name + "</td><td>" + i.qty + "</td><td>" + i.price + "</td></tr>";
    }

    $('#itemTable').append(row);
}

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

    loadItemData();

});

$('#getAllItemDetails').click(function () {
    $('#itemTable').clear();
    loadItemData();
});