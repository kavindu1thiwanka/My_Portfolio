$("#AddCustomerFormFile,#AddCustomerFormFileMultiple,#AddCustomerFormFileDisabled,#AddCustomerFormFileSm,#DeleteCustomerFormFile,#DeleteCustomerFormFileMultiple,#DeleteCustomerFormFileDisabled,#DeleteCustomerFormFileSm").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

//Add Customer
$('#addCustomerButton').click(function () {

    let customerID = $("#AddCustomerFormFile").val();
    let customerName = $("#AddCustomerFormFileMultiple").val();
    let customerAddress = $("#AddCustomerFormFileDisabled").val();
    let customerTel = $("#AddCustomerFormFileSm").val();

    var customerObject = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        tel: customerTel
    }

    customers.push(customerObject);

    $("#AddCustomerFormFile").val("");
    $("#AddCustomerFormFileMultiple").val("");
    $("#AddCustomerFormFileDisabled").val("");
    $("#AddCustomerFormFileSm").val("");

    loadCustomerData();

    loadCustomersForOrder();

    totalCustomerCalculate();

    generateCustomerID();

    defaultAllTextCustomer();
});

function generateCustomerID() {
    if (customers.length === 0){
        $('#AddCustomerFormFile').val("C-001");
    }else {
        let customerCount = customers.length + 1;
        if (customerCount < 10){
            $('#AddCustomerFormFile').val("C-00"+ customerCount);
        }else if (customerCount < 100){
            $('#AddCustomerFormFile').val("C-0"+ customerCount);
        }else if (customerCount < 100000){
            $('#AddCustomerFormFile').val("C-"+ customerCount);
        }
    }
}

$('#customerNav').click(function () {
    generateCustomerID();
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

function setCustomerTextFieldValues(id, name, address, tel) {
    $("#DeleteCustomerFormFile").val(id);
    $("#DeleteCustomerFormFileMultiple").val(name);
    $("#DeleteCustomerFormFileDisabled").val(address);
    $("#DeleteCustomerFormFileSm").val(tel);
}

$('#customerSearchBtn').click(function () {
    let typedId = $("#DeleteCustomerFormFile").val();
    let customer = searchCustomer(typedId);
    if (customer != null) {
        setCustomerTextFieldValues(customer.id, customer.name, customer.address, customer.tel);
    } else {
        alert("There is no customer available for that " + typedId);
        setCustomerTextFieldValues("", "", "", "");
    }
});

//Delete Customer
$('#customerDeleteBtn').click(function () {
    let customerID = $("#DeleteCustomerFormFile").val();
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let option = confirm("Do you really want to delete customer id :" + customerID);
        if (option) {
            let indexNumber = customers.indexOf(customer);
            customers.splice(indexNumber, 1);
            loadCustomerData();
            alert("Customer Successfully Deleted..");
            setCustomerTextFieldValues("", "", "", "");
        }
    } else {
        alert("No such customer to delete. please check the id");
    }
    defaultAllTextCustomer();
    totalCustomerCalculate();
});

//Update Customer
$('#customerUpdateBtn').click(function () {
    let customerID = $("#DeleteCustomerFormFile").val();
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.id = $("#DeleteCustomerFormFile").val();
        customer.name = $("#DeleteCustomerFormFileMultiple").val();
        customer.address = $("#DeleteCustomerFormFileDisabled").val();
        customer.tel = $("#DeleteCustomerFormFileSm").val();
        loadCustomerData();
        alert("Customer Updated Successfully");
        setCustomerTextFieldValues("", "", "", "");
    } else {
        alert("Customer Updated Failed..!");
    }
    defaultAllTextCustomer();
});

function loadCustomerData() {
    $('#customerTable').empty();
    for (var i of customers) {
        var row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.address}</td><td>${i.tel}</td></tr>`;
        $('#customerTable').append(row);
    }
}

//Validation

const cusIDRegEx = /^(C-)[0-9]{3}$/;
const cusNameRegEx = /^[A-z ]{3,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{4,}$/;
const cusTelRegEx = /^[0-9]{10}$/;

let customerValidations = [];
customerValidations.push({
    reg: cusIDRegEx,
    field: $('#AddCustomerFormFile'),
    error: 'Customer ID Pattern is Wrong : C-001',
    cato: "add"
});
customerValidations.push({
    reg: cusNameRegEx,
    field: $('#AddCustomerFormFileMultiple'),
    error: 'Customer Name Pattern is Wrong : A-z 5-20',
    cato: "add"
});
customerValidations.push({
    reg: cusAddressRegEx,
    field: $('#AddCustomerFormFileDisabled'),
    error: 'Customer Address Pattern is Wrong : A-z 0-9 ,/',
    cato: "add"
});
customerValidations.push({
    reg: cusTelRegEx,
    field: $('#AddCustomerFormFileSm'),
    error: 'Customer Phone Number Pattern is Wrong : 0771234567',
    cato: "add"
});
customerValidations.push({
    reg: cusIDRegEx,
    field: $('#DeleteCustomerFormFile'),
    error: 'Customer ID Pattern is Wrong : C-001',
    cato: "manage"
});
customerValidations.push({
    reg: cusNameRegEx,
    field: $('#DeleteCustomerFormFileMultiple'),
    error: 'Customer Name Pattern is Wrong : A-z 5-20',
    cato: "manage"
});
customerValidations.push({
    reg: cusAddressRegEx,
    field: $('#DeleteCustomerFormFileDisabled'),
    error: 'Customer Address Pattern is Wrong : A-z 0-9 ,/',
    cato: "manage"
});
customerValidations.push({
    reg: cusTelRegEx,
    field: $('#DeleteCustomerFormFileSm'),
    error: 'Customer Phone Number Pattern is Wrong : 0771234567',
    cato: "manage"
});

function checkCustomerValidity() {
    for (let validation of customerValidations) {
        if (checkCustomerInput(validation.reg, validation.field)) {
            if (validation.field.val().length <= 0) {
                defaultTextCustomer(validation.field, "");
            } else {
                validation.field.css('border', '2px solid green');
                validation.field.parent().children('span').text("");
                btnState(validation.cato, "success");
            }
        } else {
            if (validation.field.val().length <= 0) {
                defaultTextCustomer(validation.field, "");
            } else {
                validation.field.css('border', '2px solid red');
                validation.field.parent().children('span').text(validation.error);
                btnState(validation.cato, "fail");
            }
        }
    }
}

function defaultAllTextCustomer() {
    for (let validation of customerValidations) {
        validation.field.css("border", "1px solid #ced4da");
        validation.field.parent().children('span').text("");
    }

}

function defaultTextCustomer(txtField, error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function checkCustomerInput(regex, txtField) {
    let inputVal = txtField.val();
    return regex.test(inputVal) ? true : false;
}

function btnState(txtType, stat) {
    if (txtType == "add") {
        if (stat == "success") {
            $('#addCustomerButton').attr('disabled', false);
        } else if (stat == "fail") {
            $('#addCustomerButton').attr('disabled', true);
        }
    } else if (txtType == "manage") {
        if (stat == "success") {
            $('#customerDeleteBtn').attr('disabled', false);
            $('#customerUpdateBtn').attr('disabled', false);
        } else if (stat == "fail") {
            $('#customerDeleteBtn').attr('disabled', true);
            $('#customerUpdateBtn').attr('disabled', true);
        }
    }
}

$("#AddCustomerFormFile,#AddCustomerFormFileMultiple,#AddCustomerFormFileDisabled,#AddCustomerFormFileSm,#DeleteCustomerFormFile,#DeleteCustomerFormFileMultiple,#DeleteCustomerFormFileDisabled,#DeleteCustomerFormFileSm").on('keyup', function (event) {
    checkCustomerValidity();
});