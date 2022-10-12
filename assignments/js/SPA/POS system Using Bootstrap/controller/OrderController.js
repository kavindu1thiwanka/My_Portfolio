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

$('#lblCustomerId').click(function () {
    let cID = $("#lblCustomerId").val();
    for (let cus of customers) {
        if (cus.id == cID) {
            $("#lblCustomer").val(cus.name);
            $("#lblTel").val(cus.tel);
            $("#lblAddress").val(cus.address);
        }
    }
});

function loadItemsForOrder() {
    $("#lblItemCode").empty();
    for (let item of items) {
        $("#lblItemCode").append(`<option>${item.id}</option>`);
    }
}

$('#lblItemCode').click(function () {
    let itemID = $("#lblItemCode").val();
    for (let item of items) {
        if (item.id == itemID) {
            $("#lblItem").val(item.name);
            $("#lblPrice").val(item.price);
            $("#qtyOnH").val(item.qty);
        }
    }
});

$("#orderQty").on('keyup', function (event) {
    if ($("#orderQty").val() == null | $("#orderQty").val() == 0) {
        $('#addItemOnOrder').attr('disabled', true);
    } else {
        $('#addItemOnOrder').attr('disabled', false);
    }
});

$('#addItemOnOrder').click(function () {

    let itemID = $("#lblItemCode").val();
    let itemName = $("#lblItem").val();
    let itemPrice = $("#lblPrice").val();
    let itemsQty = $("#orderQty").val();
    let itemsTotal = $("#orderQty").val() * $("#lblPrice").val();

    if (orderItems.length == 0) {
        var orderItemObject = {
            itemCode: itemID,
            itemName: itemName,
            price: itemPrice,
            itemQty: itemsQty,
            tot: itemsTotal
        }
        orderItems.push(orderItemObject);
    } else {
        let targetItem;
        for (var o of orderItems) {
            if (o.itemCode == itemID) {
                targetItem = o.itemCode;
                break;
            } else {

            }
        }
        if (targetItem != null) {
            let qtyNewVal = $("#orderQty").val();
            o.itemQty = Number(o.itemQty) + Number(qtyNewVal);
            o.tot = o.itemQty * o.price;
        } else {
            orderItemObject = {
                itemCode: itemID,
                itemName: itemName,
                price: itemPrice,
                itemQty: itemsQty,
                tot: itemsTotal
            }
            orderItems.push(orderItemObject);
        }
    }

    loadOrdersData();

    let qtyVal = $("#orderQty").val();
    let itemCode = $("#lblItemCode").val();
    for (let item of items) {
        if (item.id == itemCode) {
            item.qty = item.qty - qtyVal;
            $("#qtyOnH").val(item.qty);
        }
    }

    loadItemData();

    let sumTotal = 0;
    for (var o of orderItems) {
        sumTotal = sumTotal + Number(o.tot);
    }
    $("#total").text(sumTotal);
});

function loadOrdersData() {
    $('#orderTbl').empty();
    for (var o of orderItems) {
        var row = `<tr><td>${o.itemCode}</td><td>${o.itemName}</td><td>${o.price}</td><td>${o.itemQty}</td><td>${o.tot}</td></tr>`;
        $('#orderTbl').append(row);
    }
}

function generateOrderID() {
    if (orders.length === 0){
        $('#orderId').val("OD-001");
    }else {
        let ordersCount = orders.length + 1;
        if (ordersCount < 10){
            $('#orderId').val("OD-00"+ ordersCount);
        }else if (ordersCount < 100){
            $('#orderId').val("OD-0"+ ordersCount);
        }else if (ordersCount < 100000){
            $('#orderId').val("OD-"+ ordersCount);
        }
    }
}

$('#orderNav').click(function (){
    generateOrderID();
});

let finalTotal;

$("#txtDiscount").on('keyup', function (event) {
    finalTotal = 0;
    let dis= $("#txtDiscount").val();
    let Total = $("#total").text();
    finalTotal = Total - (Number(Total) * Number(dis) / 100);
    $("#subtotal").text(finalTotal);

    if ($("#lblCustomer").val() !== "Name" && $("#txtCash").val() != null && $("#txtDiscount").val() != null){
        $('#btnSubmitOrder').attr('disabled', false);
    }else {
        $('#btnSubmitOrder').attr('disabled', true);
    }
});

$('#btnSubmitOrder').click(function (){

    let invoID = $("#orderId").val();
    let orDate = $('#lblDate').val();
    let cusName = $("#lblCustomer").val();
    let itemsAmo = orderItems.length;
    let totalPrice = finalTotal;


    var orderObject = {
        invoiceID: invoID,
        orderDate: orDate,
        custName: cusName,
        itemAmount: itemsAmo,
        totPrice: totalPrice
    }
    orders.push(orderObject);

    loadAllRecentSalesData();

    totalSaleCalculate();

    generateOrderID();

    clearAllTextField();
});

function clearAllTextField() {
    $('#orderTbl').empty();
    $("#total").text("00.0");
    $("#subtotal").text("00.0");
    $("#orderQty").val("");
    $("#txtCash").val("");
    $("#txtDiscount").val("");

    $("#lblCustomer").val("Name");
    $("#lblTel").val("0771236549");
    $("#lblAddress").val("Galle");
    $("#lblItem").val("Name");
    $("#lblPrice").val("100.0");
    $("#qtyOnH").val("100");

    $('#btnSubmitOrder').attr('disabled', true);
    $('#addItemOnOrder').attr('disabled', true);
}