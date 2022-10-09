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

function setCustomerTextFieldValues(id, name, address, salary) {
    $("#DeleteCustomerFormFile").val(id);
    $("#DeleteCustomerFormFileMultiple").val(name);
    $("#DeleteCustomerFormFileDisabled").val(address);
    $("#DeleteCustomerFormFileSm").val(salary);
}

$('#customerSearchBtn').click(function (){
    let typedId = $("#DeleteCustomerFormFile").val();
    let customer = searchCustomer(typedId);
    if (customer != null) {
        setCustomerTextFieldValues(customer.id, customer.name, customer.address, customer.salary);
    } else {
        alert("There is no customer available for that " + typedId);
        setCustomerTextFieldValues("", "", "", "");
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
            setCustomerTextFieldValues("", "", "", "");
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
        setCustomerTextFieldValues("", "", "", "");
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

//Validation

const cusIDRegEx = /^(C-)[0-9]{3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

let customerValidations = [];
customerValidations.push({reg: cusIDRegEx, field: $('#AddCustomerFormFile'),error:'Customer ID Pattern is Wrong : C-001',cato: "add"});
customerValidations.push({reg: cusNameRegEx, field: $('#AddCustomerFormFileMultiple'),error:'Customer Name Pattern is Wrong : A-z 5-20',cato: "add"});
customerValidations.push({reg: cusAddressRegEx, field: $('#AddCustomerFormFileDisabled'),error:'Customer Address Pattern is Wrong : A-z 0-9 ,/',cato: "add"});
customerValidations.push({reg: cusSalaryRegEx, field: $('#AddCustomerFormFileSm'),error:'Customer Salary Pattern is Wrong : 100 or 100.00',cato: "add"});
customerValidations.push({reg: cusIDRegEx, field: $('#DeleteCustomerFormFile'),error:'Customer ID Pattern is Wrong : C-001',cato: "manage"});
customerValidations.push({reg: cusNameRegEx, field: $('#DeleteCustomerFormFileMultiple'),error:'Customer Name Pattern is Wrong : A-z 5-20',cato: "manage"});
customerValidations.push({reg: cusAddressRegEx, field: $('#DeleteCustomerFormFileDisabled'),error:'Customer Address Pattern is Wrong : A-z 0-9 ,/',cato: "manage"});
customerValidations.push({reg: cusSalaryRegEx, field: $('#DeleteCustomerFormFileSm'),error:'Customer Salary Pattern is Wrong : 100 or 100.00',cato: "manage"});

function checkCustomerValidity() {
    for (let validation of customerValidations) {
        if (checkCustomerInput(validation.reg,validation.field)) {
            if (validation.field.val().length <= 0) {
                defaultText(validation.field,"");
            } else {
                validation.field.css('border', '2px solid green');
                validation.field.parent().children('span').text("");
                btnState(validation.cato,"success");
            }
        } else {
            if (validation.field.val().length <= 0) {
                defaultText(validation.field,"");
            } else {
                validation.field.css('border', '2px solid red');
                validation.field.parent().children('span').text(validation.error);
                btnState(validation.cato,"fail");
            }
        }
    }
}

function defaultText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}
function checkCustomerInput(regex, txtField) {
    let inputVal = txtField.val();
    return regex.test(inputVal) ? true : false;
}

function btnState(txtType,stat){
    if (txtType == "add"){
        if (stat == "success"){
            $('#addCustomerButton').attr('disabled',false);
        }else if(stat == "fail"){
            $('#addCustomerButton').attr('disabled',true);
        }
    }else if (txtType == "manage"){
        if (stat == "success"){
            $('#customerDeleteBtn').attr('disabled',false);
            $('#customerUpdateBtn').attr('disabled',false);
        }else if(stat == "fail"){
            $('#customerDeleteBtn').attr('disabled',true);
            $('#customerUpdateBtn').attr('disabled',true);
        }
    }
}

$("#AddCustomerFormFile,#AddCustomerFormFileMultiple,#AddCustomerFormFileDisabled,#AddCustomerFormFileSm,#DeleteCustomerFormFile,#DeleteCustomerFormFileMultiple,#DeleteCustomerFormFileDisabled,#DeleteCustomerFormFileSm").on('keyup', function (event) {
    checkCustomerValidity();
});