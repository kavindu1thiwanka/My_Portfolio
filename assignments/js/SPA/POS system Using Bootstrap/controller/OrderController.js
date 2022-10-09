$("#orderId,#lblDate,#lblCustomer,#lblCustomerId,#lblName,#lblTel,#lblAddress,#lblItem,#lblPrice,#qtyOnH,#orderQty,#txtCash,#txtDiscount,#txtBalance").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});
