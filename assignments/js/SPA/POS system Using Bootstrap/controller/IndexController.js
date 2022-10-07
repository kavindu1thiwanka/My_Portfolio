$("#customerContent").css("display", "none");
$("#itemContent").css("display", "none");
$("#orderContent").css("display", "none");
$("#homeNav").css('background', '#e6f2ff');
$("#homeNav").css('border-radius', '8px');
$("#customerNav").css('border-radius', '8px');
$("#itemNav").css('border-radius', '8px');
$("#orderNav").css('border-radius', '8px');


$("#homeNav").click(function () {
    $("#dashboardContent").css('display', 'block');
    $("#customerContent").css('display', 'none');
    $("#itemContent").css('display', 'none');
    $("#orderContent").css('display', 'none');

    $("#homeNav").css('background', '#e6f2ff');
    $("#customerNav").css('background', '#f8f9fa');
    $("#itemNav").css('background', '#f8f9fa');
    $("#orderNav").css('background', '#f8f9fa');
});

$("#customerNav").click(function () {
    $("#dashboardContent").css('display', 'none');
    $("#customerContent").css('display', 'block');
    $("#itemContent").css('display', 'none');
    $("#orderContent").css('display', 'none');

    $("#homeNav").css('background', '#f8f9fa');
    $("#customerNav").css('background', '#e6f2ff');
    $("#itemNav").css('background', '#f8f9fa');
    $("#orderNav").css('background', '#f8f9fa');
});

$("#itemNav").click(function () {
    $("#dashboardContent").css('display', 'none');
    $("#customerContent").css('display', 'none');
    $("#itemContent").css('display', 'block');
    $("#orderContent").css('display', 'none');

    $("#homeNav").css('background', '#f8f9fa');
    $("#customerNav").css('background', '#f8f9fa');
    $("#itemNav").css('background', '#e6f2ff');
    $("#orderNav").css('background', '#f8f9fa');
});

$("#orderNav").click(function () {
    $("#dashboardContent").css('display', 'none');
    $("#customerContent").css('display', 'none');
    $("#itemContent").css('display', 'none');
    $("#orderContent").css('display', 'block');

    $("#homeNav").css('background', '#f8f9fa');
    $("#customerNav").css('background', '#f8f9fa');
    $("#itemNav").css('background', '#f8f9fa');
    $("#orderNav").css('background', '#e6f2ff');
});