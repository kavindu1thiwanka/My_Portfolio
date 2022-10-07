$("#AddCustomerFormFile,#AddCustomerFormFileMultiple,#AddCustomerFormFileDisabled,#AddCustomerFormFileSm,DeleteCustomerFormFile,DeleteCustomerFormFileMultiple,DeleteCustomerFormFileDisabled,DeleteCustomerFormFileSm").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

//Add Customer
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

    $("#AddCustomerFormFile").val("");
    $("#AddCustomerFormFileMultiple").val("");
    $("#AddCustomerFormFileDisabled").val("");
    $("#AddCustomerFormFileSm").val("");

    loadCustomerData();
});

//Search Customer
function searchCustomer(cusID) {
    for (let customer of customers) {
        if (customer.id == cusID) {
            return customer;
        }
    }
    return null;
}

function setTextFieldValues(id, name, address, salary) {
    $("#DeleteCustomerFormFile").val(id);
    $("#DeleteCustomerFormFileMultiple").val(name);
    $("#DeleteCustomerFormFileDisabled").val(address);
    $("#DeleteCustomerFormFileSm").val(salary);
}

$('#customerSearchBtn').click(function (){
    let typedId = $("#DeleteCustomerFormFile").val();
    let customer = searchCustomer(typedId);
    if (customer != null) {
        setTextFieldValues(customer.id, customer.name, customer.address, customer.salary);
    } else {
        alert("There is no customer available for that " + typedId);
        setTextFieldValues("", "", "", "");
    }
});

//Delete Customer
$('#customerDeleteBtn').click(function (){
    let customerID = $("#DeleteCustomerFormFile").val();
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let option = confirm("Do you really want to delete customer id :" + customerID);
        if (option){
            let indexNumber = customers.indexOf(customer);
            customers.splice(indexNumber, 1);
            loadCustomerData();
            alert("Customer Successfully Deleted..");
            setTextFieldValues("", "", "", "");
        }
    } else {
        alert("No such customer to delete. please check the id");
    }
});

//Update Customer
$('#customerUpdateBtn').click(function (){
    let customerID = $("#DeleteCustomerFormFile").val();
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.id = $("#DeleteCustomerFormFile").val();
        customer.name = $("#DeleteCustomerFormFileMultiple").val();
        customer.address = $("#DeleteCustomerFormFileDisabled").val();
        customer.salary = $("#DeleteCustomerFormFileSm").val();
        loadCustomerData();
        alert("Customer Updated Successfully");
        setTextFieldValues("", "", "", "");
    } else {
        alert("Customer Updated Failed..!");
    }
});

function loadCustomerData() {
    $('#customerTable').empty();
    for (var i of customers) {
        var row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.address}</td><td>${i.salary}</td></tr>`;
        $('#customerTable').append(row);
    }
}