$("#orderId,#lblDate,#lblCustomer,#lblCustomerId,#lblName,#lblTel,#lblAddress,#lblItem,#lblPrice,#qtyOnH,#orderQty,#txtCash,#txtDiscount,#txtBalance").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

function loadCustomersForOrder() {
    $("#lblCustomerId").empty();
    for (let cus of customers) {
        $("#lblCustomerId").append(`<option>${cus.id}</option>`);
    }
}

$('#lblCustomerId').click(function (){
    let cID=$("#lblCustomerId").val();
    for (let cus of customers) {
        if (cus.id == cID) {
            $("#lblCustomer").val(cus.name);
            $("#lblTel").val(cus.tel);
            $("#lblAddress").val(cus.address);
        }
    }
});

$('#lblItemCode').click(function (){
    let cID=$("#lblItemCode").val();
    for (let item of items) {
        if (item.id == cID) {
            $("#lblItem").val(item.name);
            $("#qtyOnH").val(item.qty);
            $("#lblPrice").val(item.price);
        }
    }
});