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

    defaultAllTextItem();
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

function setItemTextFieldValues(id, name, qty, price) {
    $("#DeleteItemFormFile").val(id);
    $("#DeleteItemFormFileMultiple").val(name);
    $("#DeleteItemFormFileDisabled").val(qty);
    $("#DeleteItemFormFileSm").val(price);
}

$('#itemSearchBtn').click(function (){
    let typedId = $("#DeleteItemFormFile").val();
    let item = searchItems(typedId);
    if (item != null) {
        setItemTextFieldValues(item.id, item.name, item.qty, item.price);
    } else {
        alert("There is no item available for that " + typedId);
        setItemTextFieldValues("", "", "", "");
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
            setItemTextFieldValues("", "", "", "");
        }
    } else {
        alert("No such item to delete. please check the id");
    }
    defaultAllTextItem();
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
        setItemTextFieldValues("", "", "", "");
    } else {
        alert("Item Updated Failed..!");
    }
    defaultAllTextItem();
});

function loadItemData() {
    $('#itemTable').empty();
    for (var i of items) {
        var row = "<tr><td>" + i.id + "</td><td>" + i.name + "</td><td>" + i.qty + "</td><td>" + i.price + "</td></tr>";
        $('#itemTable').append(row);
    }
}

//Validation

const itemIDRegEx = /^(I-)[0-9]{3}$/;
const itemNameRegEx = /^[A-z ]{5,20}$/;
const itemQrtRegEx = /^[0-9]{1,}$/;
const itemPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

let itemValidations = [];
itemValidations.push({reg: itemIDRegEx, field: $('#AddItemFormFile'),error:'Item ID Pattern is Wrong : I-001',cato: "add"});
itemValidations.push({reg: itemNameRegEx, field: $('#AddItemFormFileMultiple'),error:'Item Name Pattern is Wrong : A-z 5-20',cato: "add"});
itemValidations.push({reg: itemQrtRegEx, field: $('#AddItemFormFileSm'),error:'Item Quantity Pattern is Wrong : 0-9',cato: "add"});
itemValidations.push({reg: itemPriceRegEx, field: $('#AddItemFormFileDisabled'),error:'Item Price Pattern is Wrong : 100 or 100.00',cato: "add"});
itemValidations.push({reg: itemIDRegEx, field: $('#DeleteItemFormFile'),error:'Item ID Pattern is Wrong : C-001',cato: "manage"});
itemValidations.push({reg: itemNameRegEx, field: $('#DeleteItemFormFileMultiple'),error:'Item Name Pattern is Wrong : A-z 5-20',cato: "manage"});
itemValidations.push({reg: itemQrtRegEx, field: $('#DeleteItemFormFileSm'),error:'Item Quantity Pattern is Wrong :  0-9',cato: "manage"});
itemValidations.push({reg: itemPriceRegEx, field: $('#DeleteItemFormFileDisabled'),error:'Item Price Pattern is Wrong : 100 or 100.00',cato: "manage"});

function checkItemValidity() {
    for (let validation of itemValidations) {
        if (checkItemInput(validation.reg,validation.field)) {
            if (validation.field.val().length <= 0) {
                defaultTextItem(validation.field,"");
            } else {
                validation.field.css('border', '2px solid green');
                validation.field.parent().children('span').text("");
                btnStateItem(validation.cato,"success");
            }
        } else {
            if (validation.field.val().length <= 0) {
                defaultTextItem(validation.field,"");
            } else {
                validation.field.css('border', '2px solid red');
                validation.field.parent().children('span').text(validation.error);
                btnStateItem(validation.cato,"fail");
            }
        }
    }
}

function defaultAllTextItem() {
    for (let validation of itemValidations) {
        validation.field.css("border", "1px solid #ced4da");
        validation.field.parent().children('span').text("");
    }

}

function defaultTextItem(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}
function checkItemInput(regex, txtField) {
    let inputVal = txtField.val();
    return regex.test(inputVal) ? true : false;
}

function btnStateItem(txtType,stat){
    if (txtType == "add"){
        if (stat == "success"){
            $('#addItemButton').attr('disabled',false);
        }else if(stat == "fail"){
            $('#addItemButton').attr('disabled',true);
        }
    }else if (txtType == "manage"){
        if (stat == "success"){
            $('#deleteItemBtn').attr('disabled',false);
            $('#UpdateItemBtn').attr('disabled',false);
        }else if(stat == "fail"){
            $('#deleteItemBtn').attr('disabled',true);
            $('#UpdateItemBtn').attr('disabled',true);
        }
    }
}

$("#AddItemFormFile,#AddItemFormFileMultiple,#AddItemFormFileDisabled,#AddItemFormFileSm,#DeleteItemFormFile,#DeleteItemFormFileMultiple,#DeleteItemFormFileDisabled,#DeleteItemFormFileSm").on('keyup', function (event) {
    checkItemValidity();
});