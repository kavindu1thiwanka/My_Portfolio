function loadCustomerData() {
    for (var i of customers) {
        var row = "<tr><td>" + i.id + "</td><td>" + i.name + "</td><td>" + i.address + "</td><td>" + i.salary + "</td></tr>";
    }

    $('#customerTable').append(row);
}

$('#addCustomerButton').click(function () {

    let customerID = $("#AddCustomerFormFile").val();
    let customerName = $("#AddCustomerFormFileMultiple").val();
    let customerAddress = $("#AddCustomerFormFileDisabled").val();
    let customerSalary = $("#AddCustomerFormFileSm").val();

    var customerObject = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        salary: customerSalary
    }

    customers.push(customerObject);

    loadCustomerData();

});

$('#getAllCustomerDetails').click(function () {
    $('#customerTable').clear();
    loadCustomerData();
});