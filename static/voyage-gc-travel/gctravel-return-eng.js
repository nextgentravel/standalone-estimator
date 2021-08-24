//script for page revenir-return  -  Scott
$(document).ready(function() {

    //alert('ready');
    $("#phoenixform").show();
    $("#step2panel").hide();
    $("#step3panel").hide();
    
    $('#step1item').addClass('active');
    $('#stepcounter1').css('color', '#000');
    $(document).scrollTop($("#progresssteps").offset().top);

});

//$("#startForm").click(function() {
    //$("#phoenixform").show();
   // $("#startForm").hide();
    //$(document).scrollTop($("#progresssteps").offset().top);
//});

$("#nextStep2").click(function() {
    $("#step1panel").hide();
    $("#step2panel").show();
    $("#step3panel").hide();

    $('#step1item').addClass('completed');
    $('#stepcounter1').css('color', '#fff');
    $('#step2item').addClass('active');
    $(document).scrollTop($("#progresssteps").offset().top);


});

$("#nextStep3").click(function() {
    $("#step1panel").hide();
    $("#step2panel").hide();
    $("#step3panel").show();

    $('#step1item').addClass('completed');
    $('#stepcounter1').css('color', '#fff');
    $('#step2item').addClass('completed');
    $('#stepcounter2').css('color', '#fff');
    $('#step3item').addClass('active');
    $(document).scrollTop($("#progresssteps").offset().top);

});



// GO BACK STEPS


$("#returnToStep1").click(function() {
    //alert('Back to Step 1');
    $("#step2panel").hide();
    $("#step1panel").show();
    $("#step3panel").hide();
    $toggle1 = 0;

    $('#step1item').addClass('active');
    $('#step1item').removeClass('completed');
    $('#step2item').removeClass('completed');
    $('#step2item').removeClass('active');

    $('#stepcounter1').css('color', '#000');
    $('#stepcounter2').css('color', '#000');
    $('#stepcounter3').css('color', '#000');

    $('#stepNumber').text('Step 1');
    $(document).scrollTop($("#progresssteps").offset().top);

});

$("#returnToStep2").click(function() {
    //alert('Back to Step 2');
    $("#step2panel").show();
    $("#step1panel").hide();
    $("#step3panel").hide();

    $('#step1item').addClass('completed');
    $('#step2item').addClass('active');
    $('#step2item').removeClass('completed');
    $('#step3item').removeClass('active');

    $('#stepcounter1').css('color', '#fff');
    $('#stepcounter2').css('color', '#000');
    $('#stepcounter3').css('color', '#000');

    $('#stepNumber').text('Step 2');
    $(document).scrollTop($("#progresssteps").offset().top);

});
