    var $toggle1 = 0;
    var $isSitPresent2 = 0;
    var $isSitPresent2Xtra = 0;
    var $casenumberinput = 0;
    var $casenumberinputChecked = 0;
    var $details = 0;

    $(document).ready(function() {

        //alert('ready');
        $("#phoenixform").hide();
        $("#technote1").hide();
        $("#step2panel").hide();
        $("#step3panel").hide();
        $("#step4panel").hide();
        $("#step5panel").hide();
        $('#epostEmail').hide();
        $('#nextStep2').hide();
        $('#nextStep2Reset').hide();
        $('#nextStep3').hide();
        $('#nextStep4').hide();
        $('#nextStep5').hide();
        $('#nextStep3Reset').hide();
        $('#submitbutton').hide();
        $('#resetbuttonStep1').hide();
        $('#resetbuttonStep2').hide();
        $('#mainresetbutton').hide();
        $('#processingbtns').hide();
        $('#casenumberinput').hide();
        $('#precasenumberinput').hide();
        $('#isStudent').hide();
        $('#subsituationlist').hide();
        $('#subsubsituationlist').hide();
        $('#nextStepSubmit').hide();

        $('#step1item').addClass('active');
        $('#stepcounter1').css('color', '#000');

        $('#stepNumber').text('Step 1');
        $('#stepNumberText').html('<h4 class="mrgn-tp-0">Useful information</h4><p class="small" style="line-height: 20px;">Did you know the Client Contact Centre can help you to fix some issues such as:</p> <ul class="small single-space" style="line-height: 20px;"><li>update your direct deposit information</li><li>activate or deactivate your electronic payments</li><li>send electronic copies of your pay stubs and tax slips via <a target="_blank" href="https://www.canadapost-postescanada.ca/cpc/en/business/postal-services/digital-mail/epost-connect.page">epost Connect™</a></li><li>place a hold on the recovery of an overpayment</li><li>update your information to withhold additional taxes, and validate and update your tax data</li><li>activate your enrolment in time reporter and maintain time reporter data in Phoenix</li><li>activate your access to Phoenix</li><li>change your address if you have left the public service to go on extended leave (maternity, education, sick, etc.)</li><li>enrol, amend or terminate your benefits (dental, health, pension, death and disability (excluding the Public Service Management Insurance Plan and British Columbia Medical)</li></ul>');

        // set the todaysdate datepicker to only go up to todays date
        var todaysdate = (new Date()).toISOString().split('T')[0];
        $('#issueTo').attr('max', todaysdate);

    });

    $(document).on('change', 'input[type=radio][name=epost]', function() {
        //alert(this.value);
        if (this.value == 'Yes') {
            $('#epostEmail').show();
            checkStep1Status();
            // $('#nextStep2').hide();
            // $('#nextStep2Reset').hide();
        } else if (this.value == 'No') {
            $('#epostEmail').hide();
            $('#epostEmailAddress').val('');
            checkStep1Status();
            // $('#nextStep2').show();
            // $('#nextStep2Reset').show();
        }

    });

    $(document).on('change', 'input[type=radio][name=casenumber]', function() {
        //alert(this.value);
        if (this.value == 'Yes') {
            $('#casenumberinput').show();
            $casenumberinput = 1;
            $casenumberinputChecked = 1;

            $('#toolTipText').html('<div class="alert alert-info"><h4 class="mrgn-tp-0">Tip</h4><p class="small" style="line-height: 20px;">Your case number can be found in <a href="https://mygcpay.pwgsc.gc.ca">MyGCPay</a> under the <strong>CASES</strong> tab in the <strong>Enquiries and Cases section</strong> (accessible only on the Government of Canada network)</p></div>');

        } else if (this.value == 'No') {
            $('#casenumberinput').hide();
            $casenumberinput = 0;
            $casenumberinputChecked = 1;
            $('#casenumbertext').val('');
            $('#toolTipText').html('');
        }

        checkStep3Status();

    });

    $(document).on('change', 'input[type=radio][name=prevReport]', function() {
        //alert(this.value);
        if (this.value == 'Yes') {
            $('#precasenumberinput').show();
            checkStep1Status();
        } else if (this.value == 'No') {
            $('#precasenumberinput').hide();
            $('#precasenumbertext').val('');
            $('#updateNew1').prop('checked', false);
            $('#updateNew2').prop('checked', false);
            checkStep1Status();
        }

    });


    $('#epostEmailAddress').on("keyup change", function(event) {
        if ($("#epostEmailAddress").val().length > 3) {
            // $('#nextStep2').show();
            // $('#nextStep2Reset').show();
            // $('#resetbuttonStep1').hide();
            // $('#resetbuttonStep2').show();
            checkStep1Status();
        }
    });

    $("#nextStep2").click(function() {
        var formisValid = $(this.form).valid();

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
         if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 

        today = yyyy+'-'+mm+'-'+dd;

        $('#issueFrom').attr('max', today);           

        //alert(formisValid);

        if (formisValid) {
            // Form is valid so process
            $("#step1panel").hide();
            $("#step2panel").show();
            $("#step3panel").hide();
            $("#step4panel").hide();
            $("#step5panel").hide();
            $('#toolTipText').html('');

            var chosen = $("input[type='radio'][name='problem']:checked").val();

            if (chosen == 'Pay issue') {
                change2Pay();
            } else if (chosen == 'Technical issue') {
                change2Technical();
            }

            $('#stepNumber').text('Step 2');
            $('#stepNumberText').html('<h4 class="mrgn-tp-0">Useful information</h4><p class="small" style="line-height: 20px;">Did you know the Client Contact Centre can help you to fix some issues such as:</p> <ul class="small single-space" style="line-height: 20px;"><li>update your direct deposit information</li><li>activate or deactivate your electronic payments</li><li>send electronic copies of your pay stubs and tax slips via <a target="_blank" href="https://www.canadapost-postescanada.ca/cpc/en/business/postal-services/digital-mail/epost-connect.page">epost Connect™</a></li><li>place a hold on the recovery of an overpayment</li><li>update your information to withhold additional taxes, and validate and update your tax data</li><li>activate your enrolment in time reporter and maintain time reporter data in Phoenix</li><li>activate your access to Phoenix</li><li>change your address if you have left the public service to go on extended leave (maternity, education, sick, etc.)</li><li>enrol, amend or terminate your benefits (dental, health, pension, death and disability (excluding the Public Service Management Insurance Plan and British Columbia Medical)</li></ul>');

            $('#step1item').addClass('completed');
            $('#stepcounter1').css('color', '#fff');
            $('#step2item').addClass('active');
            $(document).scrollTop($("#progresssteps").offset().top);
        } else {
            // Form has errors
            errorFocus();
        }

    });

    $("#nextStep3").click(function() {
        var formisValid = $(this.form).valid();

        //alert(formisValid);

        if (formisValid) {
            // Form is valid so process
            $("#step1panel").hide();
            $("#step2panel").hide();
            $("#step3panel").show();
            $("#step4panel").hide();
            $("#step5panel").hide();
            $('#toolTipText').html('');

            var chosen = $("input[type='radio'][name='problem']:checked").val();

            if (chosen == 'Pay issue') {


                if (!$('#situation').val()) {
                    change2Pay();                    
                } else {
                    //alert('there is a value for situation: ' + $('#situation').val());
                }
                
            } else if (chosen == 'Technical issue') {

                if (!$('#situation').val()) {
                    change2Technical();                   
                } else {
                    //alert('there is a value for situation: ' + $('#situation').val());   
                }

            }

            $('#stepNumber').text('Step 3');
            $('#stepNumberText').html('<p class="small" style="line-height: 20px;">Did you know you can be eligible to request an Emergency Salary Advance if you didn\'t receive your pay. You can request it through this form by selecting "I need an Emergency Salary Advance".</p><ul class="small" style="line-height: 20px;"><li>GCPedia - Employee\'s Guide - My Benefits - Benefits</li><li>Canada.ca - Public Service Benefits Plans at a glance</li><li>Insurance Administration Manual (IAM)</li></ul>');

            $('#step1item').addClass('completed');
            $('#stepcounter1').css('color', '#fff');
            $('#step2item').addClass('completed');
            $('#stepcounter2').css('color', '#fff');
            $('#step3item').addClass('active');
            $(document).scrollTop($("#progresssteps").offset().top);
        } else {
            // Form has errors
            errorFocus();
        }

    });

    $("#nextStep4").click(function() {
        var formisValid = $(this.form).valid();

        //alert(formisValid);

        if (formisValid) {
            // Form is valid so process
            $("#step1panel").hide();
            $("#step2panel").hide();
            $("#step3panel").hide();
            $("#step4panel").show();
            $("#step5panel").hide();
            $('#toolTipText').html('');

            $('#stepNumber').text('Step 4');
            $('#stepNumberText').html('<p class="small" style="line-height: 20px;">Did you know you can be eligible to request an Emergency Salary Advance if you didn\'t receive your pay. You can request it through this form by selecting "I need an Emergency Salary Advance".</p><ul class="small" style="line-height: 20px;"><li>GCPedia - Employee\'s Guide - My Benefits - Benefits</li><li>Canada.ca - Public Service Benefits Plans at a glance</li><li>Insurance Administration Manual (IAM)</li></ul>');

            $('#step1item').addClass('completed');
            $('#stepcounter1').css('color', '#fff');
            $('#step2item').addClass('completed');
            $('#stepcounter2').css('color', '#fff');
            $('#step3item').addClass('completed');
            $('#stepcounter3').css('color', '#fff');            
            $('#step4item').addClass('active');
            $(document).scrollTop($("#progresssteps").offset().top);
        } else {
            // Form has errors
            errorFocus();
        }

    });


    $("#nextStep5").click(function() {
        var formisValid = $(this.form).valid();

        //alert(formisValid);

        if (formisValid) {
            // Form is valid so process
            $("#step1panel").hide();
            $("#step2panel").hide();
            $("#step3panel").hide();
            $("#step4panel").hide();
            $("#step5panel").show();

            getFormElements();
            
            $('#toolTipText').html('');

            $('#stepNumber').text('Note');
            $('#stepNumberText').html('<p class="small" style="line-height: 20px;">Please take a moment to review all information and if you think it is correct and complete, click on "Submit" to process your information.</p>');

            $('#step1item').addClass('completed');
            $('#stepcounter1').css('color', '#fff');
            $('#step2item').addClass('completed');
            $('#stepcounter2').css('color', '#fff');
            $('#step3item').addClass('completed');
            $('#stepcounter3').css('color', '#fff');            
            $('#step4item').addClass('completed');
            $('#stepcounter4').css('color', '#fff');
            $(document).scrollTop($("#progresssteps").offset().top);
        } else {
            // Form has errors
            errorFocus();
        }

    });

    $(document).on('change', 'input[type=checkbox][name=chkreview]', function() {
        //alert('reviewed');
       if(this.checked) // if changed state is "CHECKED"
        {
            $('#nextStepSubmit').show();
        } else {
            $('#nextStepSubmit').hide();
        }
    });      

    function getFormElements() {
        var pushtext = '';

        // variables for Step 1
        var radio1 = document.getElementsByName('prevReport');
        for (var i = 0, length = radio1.length; i < length; i++) {
          if (radio1[i].checked) {
            // do whatever you want with the checked radio
            var prevReportValue = radio1[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
          }
        }

        var precasenumValue = $('#precasenumbertext').val();
        var epostEmailValue = $('#epostEmailAddress').val();

        var updateNewValue = '';
        var counter = '0';

        var updateNewValue = jQuery.map($(':checkbox[name=updateNew\\[\\]]:checked'), function (n, i) {
            return n.value;
        }).join(', ');              

        var radio2 = document.getElementsByName('problem');
        for (var i = 0, length = radio2.length; i < length; i++) {
          if (radio2[i].checked) {
            // do whatever you want with the checked radio
            var problemValue = radio2[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
          }
        }

        var radio2b = document.getElementsByName('epost');
        for (var i = 0, length = radio2b.length; i < length; i++) {
          if (radio2b[i].checked) {
            // do whatever you want with the checked radio
            var epostValue = radio2b[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
          }
        }        

        pushtext = pushtext + '<div class="well mrgn-bttm-sm">';
        pushtext = pushtext + '<h3 class="h2 mrgn-tp-0">Step 1</h3>';
        pushtext = pushtext + '<p style="line-height: 20px;"><strong>Previously reported?:</strong> '+ prevReportValue +'</p>';

        if (precasenumValue) {
            pushtext = pushtext + '<p style="line-height: 20px;"><strong>PreCase number:</strong> '+ precasenumValue +'</p>';
        }

        if (updateNewValue) {
            pushtext = pushtext + '<p style="line-height: 20px;"><strong>Update or New:</strong> '+ updateNewValue +'</p>';
        }

        if (epostValue) {
            pushtext = pushtext + '<p style="line-height: 20px;"><strong>Do you have an Epost account?:</strong> '+ epostValue +'</p>';
        }  

        if (epostEmailValue) {
            pushtext = pushtext + '<p style="line-height: 20px;"><strong>Epost email address:</strong> '+ epostEmailValue +'</p>';
        }                

        pushtext = pushtext + '<p style="line-height: 20px;"><strong>Type of problem:</strong> '+ problemValue +'</p>';
        pushtext = pushtext + '</div>';

        // variables for Step 2

        var radio3 = document.getElementsByName('identity');
        for (var i = 0, length = radio3.length; i < length; i++) {
          if (radio3[i].checked) {
            // do whatever you want with the checked radio
            var identityValue = radio3[i].value;

            // only one radio can be logically checked, don't check the rest
            break;
          }
        } 

        var radio4 = document.getElementsByName('status');
        for (var i = 0, length = radio4.length; i < length; i++) {
          if (radio4[i].checked) {
            // do whatever you want with the checked radio
            var statusValue = radio4[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
          }
        }                    

        var radio5 = document.getElementsByName('empSchedule');
        for (var i = 0, length = radio5.length; i < length; i++) {
          if (radio5[i].checked) {
            // do whatever you want with the checked radio
            var empScheduleValue = radio5[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
          }
        } 

        var radio6 = document.getElementsByName('empStatus');
        for (var i = 0, length = radio6.length; i < length; i++) {
          if (radio6[i].checked) {
            // do whatever you want with the checked radio
            var empStatusValue = radio6[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
          }
        }

        var radio7 = document.getElementsByName('empGroup');
        for (var i = 0, length = radio7.length; i < length; i++) {
          if (radio7[i].checked) {
            // do whatever you want with the checked radio
            var empGroupValue = radio7[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
          }
        }

        pushtext = pushtext + '<div class="well mrgn-bttm-sm">';
        pushtext = pushtext + '<h3 class="h2 mrgn-tp-0">Step 2</h3>';
        pushtext = pushtext + '<p style="line-height: 20px;"><strong>Identify yourself:</strong> '+ identityValue +'</p>';
        pushtext = pushtext + '<p style="line-height: 20px;"><strong>Your status:</strong> '+ statusValue +'</p>';
        pushtext = pushtext + '<p style="line-height: 20px;"><strong>Your employment schedule:</strong> '+ empScheduleValue +'</p>';
        pushtext = pushtext + '<p style="line-height: 20px;"><strong>Your employment status:</strong> '+ empStatusValue +'</p>';

        if (empGroupValue) {
            pushtext = pushtext + '<p style="line-height: 20px;"><strong>Your employee group:</strong> '+ empGroupValue +'</p>';
        }

        pushtext = pushtext + '</div>';

        // variables for Step 3
        var thesituation = $('#situation').val();
        thesituation = thesituation.split('&&')[0];
        var thesubsituation = $('#subsituation').val();
        thesubsituation = thesubsituation.split('&&')[0];
        var thesubsubsituation = $('#subsubsituation').val();

        var theIssueFrom = $('#issueFrom').val();
        var theIssueTo = $('#issueTo').val();

        var thedetails = $('#comments').val();

        var radio8 = document.getElementsByName('casenumber');
        for (var i = 0, length = radio8.length; i < length; i++) {
          if (radio8[i].checked) {
            // do whatever you want with the checked radio
            var caseNumberValue = radio8[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
          }
        }

        var thecasenumbertext = $('#casenumbertext').val();


        pushtext = pushtext + '<div class="well mrgn-bttm-sm">';
        pushtext = pushtext + '<h3 class="h2 mrgn-tp-0">Step 3</h3>';
        pushtext = pushtext + '<p style="line-height: 20px;"><strong>Situation:</strong> '+ thesituation +'</p>';
        if (thesubsituation) {
            pushtext = pushtext + '<p style="line-height: 20px;"><strong>Sub situation:</strong> '+ thesubsituation +'</p>';
        }

        if (thesubsubsituation) {
            pushtext = pushtext + '<p style="line-height: 20px;"><strong>Date you didn\'t receive pay:</strong> '+ thesubsubsituation +'</p>';
        }        

        pushtext = pushtext + '<p style="line-height: 20px;"><strong>From:</strong> '+ theIssueFrom +'</p>';
        pushtext = pushtext + '<p style="line-height: 20px;"><strong>To:</strong> '+ theIssueTo +'</p>';

        if (caseNumberValue) {
            pushtext = pushtext + '<p style="line-height: 20px;"><strong>Do you have a case number:</strong> '+ caseNumberValue +'</p>';
        }  

        if (thecasenumbertext) {
            pushtext = pushtext + '<p style="line-height: 20px;"><strong>Case number:</strong> '+ thecasenumbertext +'</p>';
        }               

        pushtext = pushtext + '<p style="line-height: 20px;"><strong>Details:</strong> '+ thedetails +'</p>';
        pushtext = pushtext + '</div>';

        // variables for Step 4
        var thefirstname = $("#Firstname").val();
        var thelastname = $("#Lastname").val();
        var thepricode = $('#PRIcode').val();
        var thedepartment = $('#Department').val();
        var departmentArr = thedepartment.split('||');
        var thedepartmentname = departmentArr[0];
        var thedepartmentcode = departmentArr[1];
        var theclassification = $('#Classification').val();
        var classificationArr = theclassification.split('||');
        var theclassificationname = classificationArr[0];
        var theclassificationcode = classificationArr[1];
        var theemailaddress = $('#EmailAddress').val();
        var thetelephone = $('#TelephoneNumber').val();
        var theopttelephone = $('#OptTelephone').val();

        pushtext = pushtext + '<div class="well mrgn-bttm-sm">';
        pushtext = pushtext + '<h3 class="h2 mrgn-tp-0">Step 4</h3>';
        pushtext = pushtext + '<p style="line-height: 20px;"><strong>First name:</strong> '+ thefirstname +'</p>';
        pushtext = pushtext + '<p style="line-height: 20px;"><strong>Last name:</strong> '+ thelastname +'</p>';
        pushtext = pushtext + '<p style="line-height: 20px;"><strong>PRI code:</strong> '+ thepricode +'</p>';

        pushtext = pushtext + '<p style="line-height: 20px;"><strong>Department:</strong> '+ thedepartmentname +'</p>';
        pushtext = pushtext + '<p style="line-height: 20px;"><strong>Department code:</strong> '+ thedepartmentcode +'</p>';
        pushtext = pushtext + '<p style="line-height: 20px;"><strong>Classification:</strong> '+ theclassificationname +'</p>';
        pushtext = pushtext + '<p style="line-height: 20px;"><strong>Classification code:</strong> '+ theclassificationcode +'</p>';
        pushtext = pushtext + '<p style="line-height: 20px;"><strong>Email address:</strong> '+ theemailaddress +'</p>';
        pushtext = pushtext + '<p style="line-height: 20px;"><strong>Telephone number:</strong> '+ thetelephone +'</p>';

        if (theopttelephone) {
            pushtext = pushtext + '<p style="line-height: 20px;"><strong>Additional telephone number:</strong> '+ theopttelephone +'</p>';
        }

        pushtext = pushtext + '</div>';
 
        $('#submitText').html(pushtext);

    // var myForm = document.getElementById("form");
    //     //Extract Each Element Value
    //     for (var i = 0; i < myForm.elements.length; i++) {
    //     console.log(myForm.elements[i].value);
    //     }

    }

    function checkStep2Status() {
        var step2sum = 0;

        // check each input for a value
        if ($('input[type=radio][name=identity]').is(':checked')) { step2sum = step2sum + 1; }
        if ($('input[type=radio][name=status]').is(':checked')) { step2sum = step2sum + 1; }
        if ($('input[type=radio][name=empSchedule]').is(':checked')) { step2sum = step2sum + 1; }
        if ($('input[type=radio][name=empStatus]').is(':checked')) { step2sum = step2sum + 1; }

        // use value of number of inputs compared to above inputs
        // if they match, show the "proceed" button
        if (step2sum === 4) {
            $('#nextStep3').show();
        }

    }

    $("#situation").change(function() {
        checkStep3Status();
    });

    $("#subsituation").change(function() {
        checkStep3Status();
    }); 

    $("#subsubsituation").change(function() {
        checkStep3Status();
    }); 

    $("#issueTo").change(function() {  
        $issueto = 1;
        checkStep3Status();
    });

    // set new mindate for the "to" date based on selected "from" date
    $("#issueFrom").change(function() {
        var newendDate = $("#issueFrom").val();
        $('#issueTo').attr('min', newendDate);
        $issuefrom = 1;
        checkStep3Status();
    });  

    $("#casenumbertext").keyup(function() {
        $casenumertext = 1;
        checkStep3Status();
    });   

    $('#comments').keyup(function() {
        $("#comments-word-cnt").text("Characters left: " + (1500 - $(this).val().length));
        checkStep3Status();
    });

    $("#Firstname").keyup(function() {
        checkStep4Status();
    });    

    $("#Lastname").keyup(function() {
        checkStep4Status();
    }); 

    $("#PRIcode").keyup(function() {
        checkStep4Status();
    });   
    
    $("#Department").change(function() {
        checkStep4Status();
    }); 

    $("#Classification").change(function() {
        checkStep4Status();
    }); 

    $("#EmailAddress").keyup(function() {
        checkStep4Status();
    });  
    
    $("#EmailAddressConfirm").keyup(function() {
        checkStep4Status();
    });     

    $("#TelephoneNumber").keyup(function() {
        checkStep4Status();
    });                  

    function checkStep4Status() {
            var step4sum = 0;
            var totalstep4sum = 8;

            // check contents
            var selected_option1 = $('#Firstname').val();

            if (selected_option1 !== '') {
                //alert('Firstname');
                step4sum = step4sum + 1;
            } 

            // check contents
            var selected_option2 = $('#Lastname').val();

            if (selected_option2 !== '') {
                //alert('Lastname');
                step4sum = step4sum + 1;
            } 

            // check contents
            var selected_option3 = $('#PRIcode').val();

            if (selected_option3 !== '') {
                //alert('PRIcode');
                step4sum = step4sum + 1;
            }               

            // check contents
            var selected_option4 = document.getElementById("Department");

            if (selected_option4.selectedIndex > 0) {
                //alert('Department');
                step4sum = step4sum + 1;
            }  

            // check contents
            var selected_option5 = document.getElementById("Classification");

            if (selected_option5.selectedIndex > 0) {
                //alert('Classification');
                step4sum = step4sum + 1;
            }  
            
            // check contents
            var selected_option6 = $('#EmailAddress').val();

            if (selected_option6 !== '') {
                //alert('EmailAddress');
                step4sum = step4sum + 1;
            }    
            
            // check contents
            var selected_option7 = $('#EmailAddressConfirm').val();

            if (selected_option7 !== '') {
                //alert('EmailAddressConfirm');
                step4sum = step4sum + 1;
            }  
            
            // check contents
            var selected_option8 = $('#TelephoneNumber').val();

            if (selected_option8 !== '') {
                //alert('TelephoneNumber');
                step4sum = step4sum + 1;
            }    

            //alert(step4sum);
            
        if (step4sum === totalstep4sum) {

            // set all variables for CMT here
            var cmtType = $("input[type='radio'][name='problem']:checked").val();

            if (cmtType == 'Pay issue') {
                cmtTypeVal = '';
            } else if (cmtType == 'Technical issue') {
                cmtTypeVal = '';
            }
            var var1 = '<input type="hidden" name="CMT_SIT" id="CMT_TYPE" value="'+ cmtTypeVal +'" />';







            $('#nextStep5').show();
        } else {
            $('#nextStep5').hide();
        }                                                                                 

    };  


    function checkStep3Status() {
        var step3sum = 0;
        var totalstep3sum = 6;

        // check situation list
        var selected_option = $('#situation').val();

        if (selected_option !== 'sit00' && selected_option !== '') {
            step3sum = step3sum + 1;
        }

        // check sub situation list
        var selected_option2 = $('#subsituation').val();

        if (selected_option2 !== 'subsit00' && selected_option2 !== '') {
            step3sum = step3sum + 1;
        }

        // check date from issue
        var checkDateFrom = $('#issueFrom').val();

        if (checkDateFrom !== '') {
            step3sum = step3sum + 1;
        }

        // check date to issue
        var checkDateTo = $('#issueTo').val();

        if (checkDateTo !== '') {
            step3sum = step3sum + 1;
        }

        // check date to issue
        var checkDateSub = $('#subsubsituation').val();

        if (checkDateSub !== '') {
            step3sum = step3sum + 1;
        }        

        if ($isSitPresent2 > 0) {
            // the extra date is required
            totalstep3sum = totalstep3sum + 1;
        }
      
        if ($casenumberinput > 0) {
            // the extra input is required
            totalstep3sum = totalstep3sum + 1;
        } 

        // check date from issue
        var checkCaseNumber = $('#casenumbertext').val();
        if (checkCaseNumber !== '') {
            step3sum = step3sum + 1;
        }        

        if ($casenumberinputChecked > 0) {
            // the extra input is required
            step3sum = step3sum + 1;
        } 

        var commentDetails = $('#comments').val();
        if (commentDetails !== '') {
            // the extra date is required
            step3sum = step3sum + 1;
        }

        //alert('steps done: '+step3sum+ ' steps to total: '+totalstep3sum);

        // use value of number of inputs compared to above inputs
        // if they match, show the "proceed" button
        if (step3sum === totalstep3sum) {
            $('#nextStep4').show();
        } else {
            $('#nextStep4').hide();
        }

    }    

    
    $(document).on('change', 'input[type=radio][name=identity]', function() {
        //alert(this.value);
        if (this.value == 'Employee') {
            $('#isStudent').show();
            $('#student').show();
            $('label[for="student"] span').text('I am a student');
            $('#toolTipText').html('');
        } else {
            $('#isStudent').show();
            $('#student').show();
            $('label[for="student"] span').text('The claimant is a student');
            $('#toolTipText').html('<div class="alert alert-info"><h4 class="mrgn-tp-0">Tip</h4><p class="small" style="line-height: 20px;">Did you know that as a manager, timekeeper or third party you can submit a request on your employee behalf . We are unable to provide you with the detail of their pay file but we will relay the information to the employee.</p></div>');
        }

        // check status of step 2 for showing the "proceed" button
        checkStep2Status();

    });


    $(document).on('change', 'input[type=radio][name=status]', function() {

        // check status of step 2 for showing the "proceed" button
        checkStep2Status();

    });

    $(document).on('change', 'input[type=radio][name=empSchedule]', function() {

        // check status of step 2 for showing the "proceed" button

        checkStep2Status();
    });    

    $(document).on('change', 'input[type=radio][name=empStatus]', function() {

        // check status of step 2 for showing the "proceed" button
        
        checkStep2Status();
    });     


    $('#badge1').click(function() {
        if ($toggle1 == 0) {
            var speakText = 'You can find your PreCase number via MyGCPay under the "ENQUIRIES" tab in the "Enquiries and Cases" section (accessible only on the Government of Canada network)';
            $('#toolTipText').html('<div class="alert alert-info"><h4 class="mrgn-tp-0">Tip</h4><p class="small" style="line-height: 20px;">You can find your PreCase number via MyGCPay under the "ENQUIRIES" tab in the "Enquiries and Cases" section (accessible only on the Government of Canada network)</p></div>');
            srSpeak(speakText, 'polite');
            $toggle1 = 1;
        } else {
            $('#toolTipText').html('');
            $toggle1 = 0;
        };

    });

    $("#returnToStep1").click(function() {
        //alert('Back to Step 1');
        $("#step2panel").hide();
        $("#step1panel").show();
        $("#step3panel").hide();
        $("#step4panel").hide();
        $("#step5panel").hide();
        $toggle1 = 0;
        $('#toolTipText').html('');

        $('#step1item').addClass('active');
        $('#step1item').removeClass('completed');
        $('#step2item').removeClass('completed');
        $('#step2item').removeClass('active');

        $('#stepcounter1').css('color', '#000');
        $('#stepcounter2').css('color', '#000');
        $('#stepcounter3').css('color', '#000');
        $('#stepcounter4').css('color', '#000');

        $('#stepNumber').text('Step 1');
        $('#stepNumberText').html('<h4 class="mrgn-tp-0">Useful information</h4><p class="small" style="line-height: 20px;">Did you know the Client Contact Centre can help you to fix some issues such as:</p> <ul class="small single-space" style="line-height: 20px;"><li>update your direct deposit information</li><li>activate or deactivate your electronic payments</li><li>send electronic copies of your pay stubs and tax slips via <a target="_blank" href="https://www.canadapost-postescanada.ca/cpc/en/business/postal-services/digital-mail/epost-connect.page">epost Connect™</a></li><li>place a hold on the recovery of an overpayment</li><li>update your information to withhold additional taxes, and validate and update your tax data</li><li>activate your enrolment in time reporter and maintain time reporter data in Phoenix</li><li>activate your access to Phoenix</li><li>change your address if you have left the public service to go on extended leave (maternity, education, sick, etc.)</li><li>enrol, amend or terminate your benefits (dental, health, pension, death and disability (excluding the Public Service Management Insurance Plan and British Columbia Medical)</li></ul>');
        $(document).scrollTop($("#progresssteps").offset().top);

    });

    $("#returnToStep2").click(function() {
        //alert('Back to Step 2');
        $("#step2panel").show();
        $("#step1panel").hide();
        $("#step3panel").hide();
        $("#step4panel").hide();
        $("#step5panel").hide();
        $('#toolTipText').html('');

        $('#step1item').addClass('completed');
        $('#step2item').addClass('completed');
        $('#step2item').removeClass('completed');

        $('#step3item').removeClass('completed');
        $('#step3item').removeClass('active');

        $('#stepcounter1').css('color', '#fff');
        $('#stepcounter2').css('color', '#000');
        $('#stepcounter3').css('color', '#000');
        $('#stepcounter4').css('color', '#000');



        $('#stepNumber').text('Step 2');
        $('#stepNumberText').html('<h4 class="mrgn-tp-0">Useful information</h4><p class="small" style="line-height: 20px;">Did you know the Client Contact Centre can help you to fix some issues such as:</p> <ul class="small single-space" style="line-height: 20px;"><li>update your direct deposit information</li><li>activate or deactivate your electronic payments</li><li>send electronic copies of your pay stubs and tax slips via <a target="_blank" href="https://www.canadapost-postescanada.ca/cpc/en/business/postal-services/digital-mail/epost-connect.page">epost Connect™</a></li><li>place a hold on the recovery of an overpayment</li><li>update your information to withhold additional taxes, and validate and update your tax data</li><li>activate your enrolment in time reporter and maintain time reporter data in Phoenix</li><li>activate your access to Phoenix</li><li>change your address if you have left the public service to go on extended leave (maternity, education, sick, etc.)</li><li>enrol, amend or terminate your benefits (dental, health, pension, death and disability (excluding the Public Service Management Insurance Plan and British Columbia Medical)</li></ul>');
        $(document).scrollTop($("#progresssteps").offset().top);

    });

    $("#returnToStep3").click(function() {
        //alert('Back to Step 2');
        $("#step1panel").hide();
        $("#step2panel").hide();
        $("#step3panel").show();
        $("#step4panel").hide();
        $("#step5panel").hide();
        $('#toolTipText').html('');


        $('#step3item').removeClass('completed');
        $('#step3item').addClass('active');
        $('#step4item').removeClass('active');

        $('#stepcounter1').css('color', '#fff');
        $('#stepcounter2').css('color', '#000');
        $('#stepcounter3').css('color', '#000');
        $('#stepcounter4').css('color', '#000');


        $('#stepNumber').text('Step 3');
        $('#stepNumberText').html('<h4 class="mrgn-tp-0">Useful information</h4><p class="small" style="line-height: 20px;">Did you know the Client Contact Centre can help you to fix some issues such as:</p> <ul class="small single-space" style="line-height: 20px;"><li>update your direct deposit information</li><li>activate or deactivate your electronic payments</li><li>send electronic copies of your pay stubs and tax slips via <a target="_blank" href="https://www.canadapost-postescanada.ca/cpc/en/business/postal-services/digital-mail/epost-connect.page">epost Connect™</a></li><li>place a hold on the recovery of an overpayment</li><li>update your information to withhold additional taxes, and validate and update your tax data</li><li>activate your enrolment in time reporter and maintain time reporter data in Phoenix</li><li>activate your access to Phoenix</li><li>change your address if you have left the public service to go on extended leave (maternity, education, sick, etc.)</li><li>enrol, amend or terminate your benefits (dental, health, pension, death and disability (excluding the Public Service Management Insurance Plan and British Columbia Medical)</li></ul>');
        $(document).scrollTop($("#progresssteps").offset().top);

    });


    $("#returnToStep4").click(function() {
        //alert('Back to Step 2');
            $("#step1panel").hide();
            $("#step2panel").hide();
            $("#step3panel").hide();
            $("#step4panel").show();
            $("#step5panel").hide();
            $('#toolTipText').html('');

            $('#stepNumber').text('Step 4');
            $('#stepNumberText').html('<p class="small" style="line-height: 20px;">Did you know you can be eligible to request an Emergency Salary Advance if you didn\'t receive your pay. You can request it through this form by selecting "I need an Emergency Salary Advance".</p><ul class="small" style="line-height: 20px;"><li>GCPedia - Employee\'s Guide - My Benefits - Benefits</li><li>Canada.ca - Public Service Benefits Plans at a glance</li><li>Insurance Administration Manual (IAM)</li></ul>');

            $('#step1item').addClass('completed');
            $('#stepcounter1').css('color', '#fff');
            $('#step2item').addClass('completed');
            $('#stepcounter2').css('color', '#fff');
            $('#step3item').addClass('completed');
            $('#stepcounter3').css('color', '#fff');            
            $('#step4item').addClass('active');
            $(document).scrollTop($("#progresssteps").offset().top);

    }); 

    $(document).on('change', 'input[type="checkbox"][name="updateNew[]"]', function() {
        checkStep1Status();
    });  

    function checkStep1Status() {

        //console.log('status 1 checked');
        var epostChecked = 0;
        var prevChecked = 0;
        var precaseFilled = 0;
        var new1Checked = 0;
        var new2Checked = 0;
        var updateNewChecked = 0;
        var sectionOne = 0;
        var sectionTwo = 0;


        if ($('#precasenumbertext').val() != '') {
            precaseFilled = 1;
            //console.log(precaseFilled);
        } else {
            precaseFilled = 0;
            //console.log(precaseFilled);
        }

        if($("#updateNew1").prop('checked') == true){
            new1Checked = 1;
        }

        if($("#updateNew2").prop('checked') == true){
            new2Checked = 1;
        } 


        if ( new1Checked || new2Checked ) {
            updateNewChecked = 1;
        } else {
            updateNewChecked = 0;
        }

     

        if ($('input[type=radio][name=prevReport]:checked').attr('id') == "prevReport1") {
            if(precaseFilled && updateNewChecked) {
                //alert('section one filled');
                sectionOne = 1;
            } else {
                //alert('section one NOT filled');
                sectionOne = 0;
            }

        }   

        if ($('input[type=radio][name=prevReport]:checked').attr('id') == "prevReport2") {
           sectionOne = 1;
        }              


        if ($('input[type=radio][name=problem]:checked').attr('id') == "problem1" && $('input[type=radio][name=epost]:checked').attr('id') == "epostNo") {
            epostChecked = 0;
            sectionTwo = 1;
        }

        if ($('input[type=radio][name=problem]:checked').attr('id') == "problem1" && $('input[type=radio][name=epost]:checked').attr('id') == "epostYes") {
            epostChecked = 1;

            if ( epostChecked == 1) {
                if ($('#epostEmailAddress').val() != '') {
                    sectionTwo = 1;
                }
            } 

        }  

        if ($('input[type=radio][name=problem]:checked').attr('id') == "problem2" ) {
            epostChecked = 0;
            sectionTwo = 1;
        }        


        if (sectionOne && sectionTwo) {
            $('#nextStep2').show();
        } else {
            $('#nextStep2').hide();
        }

        $('#nextStep2Reset').show();
    }

    $("#epostEmail").keyup(function() {
        checkStep1Status();
    });  
    
    $("#precasenumbertext").keyup(function() {
        checkStep1Status();
    });  


    function checkRadioButtons() {
        if ($('input[type=radio][name=problem]:checked').attr('id') == "problem2") {
            //alert('You have a pay issue');
            $("#technote1").hide();
            $('#epostEmailAddress').val('');
            $('input[name="epost"]').prop('checked', false);
            checkStep1Status();
            // $('#nextStep2').show();
            // $('#nextStep2Reset').show();
            removeDetailsText();
        } else if ($('input[type=radio][name=problem]:checked').attr('id') == "problem1") {
            //alert('You have a tecnical issue');
            $("#technote1").show();
            $('#epostEmail').hide();
            $('#epostEmailAddress').val('');
            checkStep1Status();
            // $('#nextStep2').hide();
            // $('#nextStep2Reset').hide();
        }

    }

    $("#startForm").click(function() {
        $("#phoenixform").show();
        $("#startForm").hide();
        $(document).scrollTop($("#progresssteps").offset().top);
    });


    function change2Pay() {
        $('#subsubsituationlist').hide();

        var newOptions = {
            "Select": ["", "sit00"],
            "I did not get paid, I didn't receive my salary for the previous pay": ["I did not get paid, I didn't receive my salary for the previous pay&&||&&ST_01", "sit01"],
            "I'm on leave (with or without pay), I'm about to go on leave or I'm returning from leave": ["I'm on leave (with or without pay), I'm about to go on leave or I'm returning from leave&&||&&ST_02", "sit02"],
            "I am, or about to be, terminated (resignation, retirement, end of contract, etc.) and I have an issue or concern": ["I am, or about to be, terminated (resignation, retirement, end of contract, etc.) and I have an issue or concern&&||&&ST_03", "sit03"],
            "I need to report the passing of a public service member": ["I need to report the passing of a public service member&&||&&ST_04", "sit04"],
            "I am, or I was, on acting and I have an issue or question": ["I am, or I was, on acting and I have an issue or question&&||&&ST_05", "sit05"],
            "I am missing an entitlement and/or allowance": ["I am missing an entitlement and/or allowance&&||&&ST_06", "sit06"],
            "I need help with my benefits": ["I need help with my benefits&&||&&ST_07", "sit07"],
            "I have a change in employment (change of personal information, address change, assignment, secondment, promotion, demotion, etc.)": ["I have a change in employment (change of personal information, address change, assignment, secondment, promotion, demotion, etc.)&&||&&ST_08", "sit08"],
            "I need to report a lost/stolen cheque and/or direct deposit not received": ["I need to report a lost/stolen cheque and/or direct deposit not received&&||&&ST_09", "sit09"],
            "I need help with my deduction": ["I need help with my deduction&&||&&ST_10", "sit10"],
            "I need help with my direct deposit": ["I need help with my direct deposit&&||&&ST_11", "sit11"],
            "I need help with the repayment of Emergency Salary Advance (ESA) or Priority Payment": ["I need help with the repayment of Emergency Salary Advance (ESA) or Priority Payment&&||&&ST_12", "sit12"],
            "I need help with Extra Duty Pay (EDP)": ["I need help with Extra Duty Pay (EDP)&&||&&ST_13", "sit13"],
            "I have an issue with garnishments": ["I have an issue with garnishments&&||&&ST_14", "sit14"],
            "I need to request an official letter (letter of offer, termination paperwork, ReHire, leave without pay, etc.)": ["I need to request an official letter (letter of offer, termination paperwork, ReHire, leave without pay, etc.)&&||&&ST_15", "sit15"],
            "I am missing pay": ["I am missing pay&&||&&ST_16", "sit16"],
            "I was recently hired/ReHired and my salary is incorrect": ["I was recently hired/ReHired and my salary is incorrect&&||&&ST_17", "sit17"],
            "I have an outstanding pay increment": ["I have an outstanding pay increment&&||&&ST_18", "sit18"],
            "I have an overpayment and/or need help with the overpayment recovery": ["I have an overpayment and/or need help with the overpayment recovery&&||&&ST_19", "sit19"],
            "I have an outstanding transfer": ["I have an outstanding transfer&&||&&ST_20", "sit20"],
            "I have a Tax Slip (T4 or R1) related enquiry": ["I have a Tax Slip (T4 or R1) related enquiry&&||&&ST_21", "sit21"],
            "I have a Collective Agreement-related inquiry": ["I have a Collective Agreement-related inquiry&&||&&ST_22", "sit22"],
            "I have a Grievance related inquiry": ["I have a Grievance related inquiry&&||&&ST_23", "sit23"],
            "I am requesting a review of my pay file": ["I am requesting a review of my pay file&&||&&ST_24", "sit24"],
            "I am experiencing a pay issue not listed in this drop-down": ["I am experiencing a pay issue not listed in this drop-down&&||&&ST_25", "sit25"],
        };

        var $el = $("#situation");
        $el.empty(); // remove old options
        $.each(newOptions, function(key, value) {
            $el.append($("<option></option>")
                .attr("value", value[0]).attr("id", value[1]).text(key));
        });
    }


    function change2PaySub() {
        $('#subsubsituationlist').hide();
        var sitnumber = $('#situation').val();
        var isSitPresent = 0;

        if (sitnumber.indexOf("ST_01") >= 0) {
            isSitPresent = 1;

            // alert('found it');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I need to request an Emergency Salary Advance (ESA)": ["I need to request an Emergency Salary Advance (ESA)&&||&&SST_01", "subsit01"],
                "I did not get paid": ["I did not get paid&&||&&SST_02", "subsit02"],
                "I need to request a Priority Payment": ["I need to request a Priority Payment&&||&&SST_03", "subsit03"],
                "Other (please provide detail in the detail box below)": ["Other (please provide detail in the detail box below)&&||&&SST_04", "subsit04"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }

        if (sitnumber.indexOf("ST_02") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I need help with my Leave with Income Averaging (LIA)": ["I need help with my Leave with Income Averaging (LIA)&&||&&SST_05", "subsit05"],
                "I'm on Leave Without Pay (LWOP) and I didn't receive my last pay and/or Record Of Employment (ROE)": ["I'm on Leave Without Pay (LWOP) and I didn't receive my last pay and/or Record Of Employment (ROE)&&||&&SST_06", "subsit06"],
                "I'm on Leave Without Pay (LWOP) and my Record Of Employment (ROE) is wrong": ["I'm on Leave Without Pay (LWOP) and my Record Of Employment (ROE) is wrong&&||&&SST_07", "subsit07"],
                "I'm on Maternity / Parental leave and need to receive my final pay and/or my Record Of Employment (ROE) and/or my Top-up": ["I'm on Maternity / Parental leave and need to receive my final pay and/or my Record Of Employment (ROE) and/or my Top-up&&||&&SST_08", "subsit08"],
                "I'm on Maternity / Parental leave and my Record Of Employment (ROE) is wrong": ["I'm on Maternity / Parental leave and my Record Of Employment (ROE) is wrong&&||&&SST_09", "subsit09"],
                "I'm on Maternity/Parental leave for over 20 days and haven't received my benefit package (Maternity Leave agreement and undertaking and EI Statement/QPIP Statement)": ["I'm on Maternity/Parental leave for over 20 days and haven't received my benefit package (Maternity Leave agreement and undertaking and EI Statement/QPIP Statement)&&||&&SST_10", "subsit10"],
                "I'm on Pre-Retirement leave or about to go on Pre-Retirement leave and I have an issue/question": ["I'm on Pre-Retirement leave or about to go on Pre-Retirement leave and I have an issue/question&&||&&SST_11", "subsit11"],
                "I'm returning from leave on a rehabilitation schedule and I have an issue/question": ["I'm returning from leave on a rehabilitation schedule and I have an issue/question&&||&&SST_12", "subsit12"],
                "I'm returning from leave without pay (LWOP) and I have an issue/question": ["I'm returning from leave without pay (LWOP) and I have an issue/question&&||&&SST_13", "subsit13"],
                "I'm on employment injury benefit (workers' compensation) for work-related injury and I have an issue or question": ["I'm on employment injury benefit (workers' compensation) for work-related injury and I have an issue or question&&||&&SST_14", "subsit14"],
                "Other (please provide detail in the detail box below)": ["Other (please provide detail in the detail box below)&&||&&SST_15", "subsit15"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }

        if (sitnumber.indexOf("ST_03") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "My contract ended and I have an issue/question": ["My contract ended and I have an issue/question&&||&&SST_16", "subsit16"],
                "I resigned or retired and I'm waiting for my final pay, leave cash-out, severance, Record Of Employment (ROE), etc.)": ["I resigned or retired and I'm waiting for my final pay, leave cash-out, severance, Record Of Employment (ROE), etc.)&&||&&SST_17", "subsit17"],
                "I received my Record Of Employment (ROE) but it needs to be amended": ["I received my Record Of Employment (ROE) but it needs to be amended&&||&&SST_18", "subsit18"],
                "I'm retired and I need to receive my severance pay": ["I'm retired and I need to receive my severance pay&&||&&SST_19", "subsit19"],
                "Other (please provide detail in the detail box below)": ["Other (please provide detail in the detail box below)&&||&&SST_20", "subsit20"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }  

        if (sitnumber.indexOf("ST_04") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I need to report the passing of a public service member": ["I need to report the passing of a public service member&&||&&SST_21", "subsit21"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }

        if (sitnumber.indexOf("ST_05") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I am, or I was, on acting and I have an issue or question": ["I am, or I was, on acting and I have an issue or question&&||&&SST_22", "subsit22"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }                         

        if (sitnumber.indexOf("ST_06") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I'm entitled for Isolated Post Allowance (IPA) and/or Vacation Travel Allowance (VTA)": ["I'm entitled for Isolated Post Allowance (IPA) and/or Vacation Travel Allowance (VTA)&&||&&SST_23", "subsit23"],
                "I'm entitled for Performance Pay": ["I'm entitled for Performance Pay&&||&&SST_24", "subsit24"],
                "I am missing my 4.0% Vacation Premium": ["I am missing my 4.0% Vacation Premium&&||&&SST_25", "subsit25"],
                "I am missing my Bilingual Bonus": ["I am missing my Bilingual Bonus&&||&&SST_26", "subsit26"],
                "I have to cash out my leave as per the collective agreement": ["I have to cash out my leave as per the collective agreement&&||&&SST_27", "subsit27"],
                "I have been terminated and require my leave cash-out": ["I have been terminated and require my leave cash-out&&||&&SST_28", "subsit28"],
                "I would like to voluntarily cash out my leave": ["I would like to voluntarily cash out my leave&&||&&SST_29", "subsit29"],
                "I have incorrect or missing leave balance": ["I have incorrect or missing leave balance&&||&&SST_30", "subsit30"],
                "My service date is incorrect for my leave entitlement": ["My service date is incorrect for my leave entitlement&&||&&SST_31", "subsit31"],
                "I'm entitled to any other type of allowances (not in the above choices) and I have an issue/question": ["I'm entitled to any other type of allowances (not in the above choices) and I have an issue/question&&||&&SST_32", "subsit32"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }   

        if (sitnumber.indexOf("ST_07") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I need help to enroll, amend of terminate my Public Service Health Care Plan (PSHCP)": ["I need help to enroll, amend of terminate my Public Service Health Care Plan (PSHCP)&&||&&SST_33", "subsit33"],
                "I need help to enroll, amend of terminate my Dental (PSDCP) benefit": ["I need help to enroll, amend of terminate my Dental (PSDCP) benefit&&||&&SST_34", "subsit34"],
                "I need help to enroll, amend of terminate my Supplementary Death Benefits (SDB) and/or Pension Plan": ["I need help to enroll, amend of terminate my Supplementary Death Benefits (SDB) and/or Pension Plan&&||&&SST_35", "subsit35"],
                "I reached 35 years of pensionable service and I request amendment of pension contribution to 1% and/or request a refund": ["I reached 35 years of pensionable service and I request amendment of pension contribution to 1% and/or request a refund&&||&&SST_36", "subsit36"],
                "I reached 71 + years of age I request amendment of pension contribution to 1% and/or request a refund": ["I reached 71 + years of age I request amendment of pension contribution to 1% and/or request a refund&&||&&SST_37", "subsit37"],
                "I'm a returning pensioner and I need to terminate pension contributions and/or request a refund": ["I'm a returning pensioner and I need to terminate pension contributions and/or request a refund&&||&&SST_38", "subsit38"],
                "I need help to enroll, amend of terminate my Disability or Long-term disability insurance": ["I need help to enroll, amend of terminate my Disability or Long-term disability insurance&&||&&SST_39", "subsit39"],
                "I need a letter confirming my Disability Insurance premium paid": ["I need a letter confirming my Disability Insurance premium paid&&||&&SST_40", "subsit40"],
                "I need help to submit a claim for Disability or Long-Term Disability": ["I need help to submit a claim for Disability or Long-Term Disability&&||&&SST_41", "subsit41"],
                "I need help about a payment related to Disability or Long-Term Disability": ["I need help about a payment related to Disability or Long-Term Disability&&||&&SST_42", "subsit42"],
                "I need help with my Public Service Management Insurance Plan (PSMIP)": ["I need help with my Public Service Management Insurance Plan (PSMIP)&&||&&SST_43", "subsit43"],
                "I have a general enquiry about benefits": ["I have a general enquiry about benefits&&||&&SST_44", "subsit44"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }  

        if (sitnumber.indexOf("ST_08") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I need help to change my address (for active employee)": ["I need help to change my address (for active employee)&&||&&SST_45", "subsit45"],
                "I need help to change my address (for terminated employees)": ["I need help to change my address (for terminated employees)&&||&&SST_46", "subsit46"],
                "I need help to change my personal information": ["I need help to change my personal information&&||&&SST_47", "subsit47"],
                "I am, or about to go, on assignment/secondment": ["I am, or about to go, on assignment/secondment&&||&&SST_48", "subsit48"],
                "I had a promotion": ["I had a promotion&&||&&SST_49", "subsit49"],
                "I had a demotion": ["I had a demotion&&||&&SST_50", "subsit50"],
                "My hours of work are incorrect": ["My hours of work are incorrect&&||&&SST_51", "subsit51"],
                "Any other type of change in employment not mentioned above (please provide detail in the detail box below)": ["Any other type of change in employment not mentioned above (please provide detail in the detail box below)&&||&&SST_52", "subsit52"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        } 

        if (sitnumber.indexOf("ST_09") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I need to report a lost/stolen cheque and/or direct deposit not received": ["I need to report a lost/stolen cheque and/or direct deposit not received&&||&&SST_53", "subsit53"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        } 

        if (sitnumber.indexOf("ST_10") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I would like to start, amend or stop additional tax deduction": ["I would like to start, amend or stop additional tax deduction&&||&&SST_54", "subsit54"],
                "I need help to modify my tax data information (tax location code, province of taxation, etc.)": ["I need help to modify my tax data information (tax location code, province of taxation, etc.)&&||&&SST_55", "subsit55"],
                "I have Aboriginal status and need help with my deduction": ["I have Aboriginal status and need help with my deduction&&||&&SST_56", "subsit56"],
                "I need help with my union dues": ["I need help with my union dues&&||&&SST_57", "subsit57"],
                "Any other type of deduction issue/question not mentioned in the options above": ["Any other type of deduction issue/question not mentioned in the options above&&||&&SST_58", "subsit58"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        } 

        if (sitnumber.indexOf("ST_11") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I need help to start or amend my direct deposit information": ["I need help to start or amend my direct deposit information&&||&&SST_59", "subsit59"],
                "I have a question related to direct deposit": ["I have a question related to direct deposit&&||&&SST_60", "subsit60"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }         

        if (sitnumber.indexOf("ST_12") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I need help with the repayment of Emergency Salary Advance (ESA) or Priority Payment": ["I need help with the repayment of Emergency Salary Advance (ESA) or Priority Payment&&||&&SST_61", "subsit61"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }

        if (sitnumber.indexOf("ST_13") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I am missing additional hours or overtime": ["I am missing additional hours or overtime&&||&&SST_62", "subsit62"],
                "I submitted additional hours by paper but I didn't receive my payment": ["I submitted additional hours by paper but I didn't receive my payment&&||&&SST_63", "subsit63"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }  

        if (sitnumber.indexOf("ST_14") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I do not agree with the garnishment coming off my pay": ["I do not agree with the garnishment coming off my pay&&||&&SST_64", "subsit64"],
                "I wish to stop the garnishments coming off my pay": ["I wish to stop the garnishments coming off my pay&&||&&SST_65", "subsit65"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }

        if (sitnumber.indexOf("ST_15") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I need a copy of my letter of offer": ["I need a copy of my letter of offer&&||&&SST_66", "subsit66"],
                "I need a copy of my retirement/termination letter": ["I need a copy of my retirement/termination letter&&||&&SST_67", "subsit67"],
                "I need a copy of my leave without pay documentation": ["I need a copy of my leave without pay documentation&&||&&SST_68", "subsit68"],
                "I need a copy of my benefits letter": ["I need a copy of my benefits letter&&||&&SST_69", "subsit69"],
                "Other (please provide detail in the detail box below)": ["Other (please provide detail in the detail box below)&&||&&SST_70", "subsit70"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }   

        if (sitnumber.indexOf("ST_16") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I am missing a regular pay from a previous pay period (I'm currently receiving my pay)": ["I am missing a regular pay from a previous pay period (I'm currently receiving my pay)&&||&&SST_71", "subsit71"],
                "I am missing a portion of my regular pay": ["I am missing a portion of my regular pay&&||&&SST_72", "subsit72"],
                "My regular pay does not seem correct": ["My regular pay does not seem correct&&||&&SST_73", "subsit73"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }                               

        if (sitnumber.indexOf("ST_17") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I was recently hired/ReHired and my salary is incorrect": ["I was recently hired/ReHired and my salary is incorrect&&||&&SST_74", "subsit74"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }  

        if (sitnumber.indexOf("ST_18") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I did not receive my increment": ["I did not receive my increment&&||&&SST_75", "subsit75"],
                "My increment date is incorrect": ["My increment date is incorrect&&||&&SST_76", "subsit76"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }

        if (sitnumber.indexOf("ST_19") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I want to report an overpayment": ["I want to report an overpayment&&||&&SST_77", "subsit77"],
                "I have not received a letter outlining my overpayment": ["I have not received a letter outlining my overpayment&&||&&SST_78", "subsit78"],
                "I am disputing the amount outlined on my overpayment letter or I do not understand the letter": ["I am disputing the amount outlined on my overpayment letter or I do not understand the letter&&||&&SST_79", "subsit79"],
                "My overpayment is being recovered and I want to stop the recovery": ["My overpayment is being recovered and I want to stop the recovery&&||&&SST_80", "subsit80"],
                "I would like to reimburse my overpayment - I need help with the recovery form": ["I would like to reimburse my overpayment - I need help with the recovery form&&||&&SST_81", "subsit81"],
                "My overpayment is being recovered and I need help to change the recovery amount": ["My overpayment is being recovered and I need help to change the recovery amount&&||&&SST_82", "subsit82"],
                "I filled and sent the recovery form but the amount is not being deducted from my pay": ["I filled and sent the recovery form but the amount is not being deducted from my pay&&||&&SST_83", "subsit83"],
                "I have a question related to overpayment recovery": ["I have a question related to overpayment recovery&&||&&SST_84", "subsit84"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        } 

        if (sitnumber.indexOf("ST_20") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I have not been transferred out of my previous department (still being paid by my previous department)": ["I have not been transferred out of my previous department (still being paid by my previous department)&&||&&SST_85", "subsit85"],
                "I have not been transferred into my new department": ["I have not been transferred into my new department&&||&&SST_86", "subsit86"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }                  

        if (sitnumber.indexOf("ST_21") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I do not understand my T4": ["I do not understand my T4&&||&&SST_87", "subsit87"],
                "Where can I find my T4?": ["Where can I find my T4?&&||&&SST_88", "subsit88"],
                "I need an amended T4 (current tax slip is incorrect)": ["I need an amended T4 (current tax slip is incorrect)&&||&&SST_89", "subsit89"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }  

        if (sitnumber.indexOf("ST_22") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I am waiting on an outstanding collective agreement payment": ["I am waiting on an outstanding collective agreement payment&&||&&SST_90", "subsit90"],
                "My salary needs to be updated as per my newly signed collective agreement": ["My salary needs to be updated as per my newly signed collective agreement&&||&&SST_91", "subsit91"],
                "I am a member of an excluded group and I have an issue/question": ["I am a member of an excluded group and I have an issue/question&&||&&SST_92", "subsit92"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        } 

        if (sitnumber.indexOf("ST_23") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I need information about Grievance process": ["I need information about Grievance process&&||&&SST_93", "subsit93"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }     

        if (sitnumber.indexOf("ST_24") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I would like a review of my pay file to be completed": ["I would like a review of my pay file to be completed&&||&&SST_94", "subsit94"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }              

        if (sitnumber.indexOf("ST_25") >= 0) {
            isSitPresent = 1;

            // alert('found it again');

            var newOptions = {
                "Select": ["", "subsit00"],
                "Other (please provide detail in the detail box below)": ["Other (please provide detail in the detail box below)&&||&&SST_95", "subsit95"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }  

        if (isSitPresent === 1) {
            $('#subsituationlist').show();
            $('#step2renum1').text('3');
            $('#step2renum2').text('4');
            $('#step2renum3').text('5');
            $('#step2renum4').text('6');
        } else {
            $('#subsituationlist').hide();
            $('#step2renum1').text('2');
            $('#step2renum2').text('3');
            $('#step2renum3').text('4');
            $('#step2renum4').text('5');
        }
    }

    function change2PaySubSub() {
        $('#subsubsituationlist').hide();
        var subsitnumber = $('#subsituation').val();

        if (subsitnumber.indexOf("SST_02") >= 0) {
            $isSitPresent2 = 1;
            $isSitPresent2Xtra = 1;

            $('#subsubsituationlist').show();
            $('#subsublabel').text("2.1 Please specify the date you didn't receive pay");

        } else {
            $('#subsubsituation').val('');
            $isSitPresent2 = 0;
            $isSitPresent2Xtra = 0;            
        }
    }    

    // change below for production
    function change2TechnicalSubSub() {
        $('#subsubsituationlist').hide();
        var subsitnumber = $('#subsituation').val();

        if (subsitnumber.indexOf("SST_02") >= 0) {
            $isSitPresent2 = 1;
            $isSitPresent2Xtra = 1;

            $('#subsubsituationlist').show();
            $('#subsublabel').text("2.1 Please specify the date you didn't receive pay");

        } else {
            $('#subsubsituation').val('');
            $isSitPresent2 = 0;
            $isSitPresent2Xtra = 0;            
        }
    }     

    function change2Sub(e) {
            var chosen = $("input[type='radio'][name='problem']:checked").val();

            if (chosen == 'Pay issue') {
                change2PaySub(e);                    
            } else if (chosen == 'Technical issue') {
                change2TechnicalSub(e);                   
            }
    }

    function change2SubSub(e) {
            var chosen = $("input[type='radio'][name='problem']:checked").val();

            if (chosen == 'Pay issue') {
                    change2PaySubSub(e);                   
            } else if (chosen == 'Technical issue') {
                    change2TechnicalSubSub(e);                   
            }
    }    

    function change2Technical() {
        var newOptions = {
            "Select": ["", "sit00"],
            "I need help with MyGCPay application": ["I need help with MyGCPay application&&||&&ST_50", "sit50"],
            "I cannot log in to Compensation Web Applications (CWA) or access Phoenix pay system": ["I cannot log in to Compensation Web Applications (CWA) or access Phoenix pay system&&||&&ST_51", "sit51"],
            "I need help with my Extra Duty Pay (EDP)": ["I need help with my Extra Duty Pay (EDP)&&||&&ST_52", "sit52"],
            "I need help with selecting my section 34 manager": ["I need help with selecting my section 34 manager&&||&&ST_53", "sit53"],
            "I need help with my Pay Stub": ["I need help with my Pay Stub&&||&&ST_54", "sit54"],
            "I need help to create or modify a schedule": ["I need help to create or modify a schedule&&||&&ST_55", "sit55"],
            "I need help with my Timesheet": ["I need help with my Timesheet&&||&&ST_56", "sit56"],
            "I need help to remove exception": ["I need help to remove exception&&||&&ST_57", "sit57"],
            "I have a technical issue that is not mentioned in the above options": ["I have a technical issue that is not mentioned in the above options&&||&&ST_58", "sit58"],
            "I have a Tax Slip (T4 or R1) related enquiry": ["I have a Tax Slip (T4 or R1) related enquiry&&||&&ST_59", "sit59"],
        };

        var $el = $("#situation");
        $el.empty(); // remove old options
        $.each(newOptions, function(key, value) {
            $el.append($("<option></option>")
                .attr("value", value[0]).attr("id", value[1]).text(key));
        });
    }


    function change2TechnicalSub() {
        
        $('#subsubsituationlist').hide();
        var sitnumber = $('#situation').val();
        var isSitPresent = 0;

        if (sitnumber.indexOf("ST_50") >= 0) {
            isSitPresent = 1;

            //alert('found it');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I need help to access MyGCPay application": ["I need help to access MyGCPay application&&||&&SST_501", "subsit501"],
                "I need help understanding my information in MyGCPay": ["I need help understanding my information in MyGCPay&&||&&SST_502", "subsit502"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }

        if (sitnumber.indexOf("ST_51") >= 0) {
            isSitPresent = 1;

            //alert('found it');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I cannot log in to Compensation Web Applications (CWA) and/or access Phoenix pay system": ["I cannot log in to Compensation Web Applications (CWA) and/or access Phoenix pay system&&||&&SST_511", "subsit511"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }        

        if (sitnumber.indexOf("ST_52") >= 0) {
            isSitPresent = 1;

            //alert('found it');

            var newOptions = {
                "Select": ["", "subsit00"],
                "My overtime rate is incorrect": ["My overtime rate is incorrect&&||&&SST_521", "subsit521"],
                "I have submitted my time but it has not generated for approval": ["I have submitted my time but it has not generated for approval&&||&&SST_522", "subsit522"],
                "Any other question/issue related to Extra Duty Pay": ["Any other question/issue related to Extra Duty Pay&&||&&SST_523", "subsit523"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }

        if (sitnumber.indexOf("ST_53") >= 0) {
            isSitPresent = 1;

            //alert('found it');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I need help with selecting my section 34 manager": ["I need help with selecting my section 34 manager&&||&&SST_531", "subsit531"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }  

        if (sitnumber.indexOf("ST_54") >= 0) {
            isSitPresent = 1;

            //alert('found it');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I would like to receive a copy of my Pay Stub by Mail": ["I would like to receive a copy of my Pay Stub by Mail&&||&&SST_541", "subsit541"],
                "I would like to receive a copy of my Pay Stub electronically": ["I would like to receive a copy of my Pay Stub electronically&&||&&SST_542", "subsit542"],
                "I want to start receiving a biweekly copy of my Pay Stub": ["I want to start receiving a biweekly copy of my Pay Stub&&||&&SST_543", "subsit543"],
                "I want to stop receiving a biweekly copy of my Pay Stub": ["I want to stop receiving a biweekly copy of my Pay Stub&&||&&SST_544", "subsit544"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }     

        if (sitnumber.indexOf("ST_55") >= 0) {
            isSitPresent = 1;

            //alert('found it');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I need help to create or modify a schedule": ["I need help to create or modify a schedule&&||&&SST_551", "subsit551"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }    

        if (sitnumber.indexOf("ST_56") >= 0) {
            isSitPresent = 1;

            //alert('found it');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I need help with my Timesheet": ["I need help with my Timesheet&&||&&SST_561", "subsit561"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }                         

        if (sitnumber.indexOf("ST_57") >= 0) {
            isSitPresent = 1;

            //alert('found it');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I need help to remove exception": ["I need help to remove exception&&||&&SST_571", "subsit571"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        } 

        if (sitnumber.indexOf("ST_58") >= 0) {
            isSitPresent = 1;

            //alert('found it');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I have a technical issue that is not mentioned in the above options": ["I have a technical issue that is not mentioned in the above options&&||&&SST_581", "subsit581"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }

        if (sitnumber.indexOf("ST_59") >= 0) {
            isSitPresent = 1;

            var speakText = 'At the Client Contact Centre (CCC), we support all public servants by: - Sending electronic copies of your pay stubs and tax slips via Epost Connect™)';
            $('#toolTipText').html('<div class="alert alert-info"><h4 class="mrgn-tp-0">Note</h4><p class="small" style="line-height: 20px;">At the <a href="https://www.tpsgc-pwgsc.gc.ca/remuneration-compensation/services-paye-pay-services/paye-centre-pay/cnaide-cuhelp-eng.html#help">Client Contact Centre</a> (CCC), we support all public servants by:</p><ul class="small" style="line-height: 20px;"><li>Sending electronic copies of your pay stubs and tax slips via <a href="https://www.youtube.com/watch?v=dpSbOzOBCsw">Epost Connect™</a></li></ul></div>');

            var newOptions = {
                "Select": ["", "subsit00"],
                "I would like my T4/R1 sent by mail to me": ["I would like my T4/R1 sent by mail to me&&||&&SST_591", "subsit591"],
                "I would like my T4/R1 sent electronically to me by Epost connect": ["I would like my T4/R1 sent electronically to me by Epost connect&&||&&SST_592", "subsit592"],
            };

            var $el = $("#subsituation");
            $el.empty(); // remove old options
            $.each(newOptions, function(key, value) {
                $el.append($("<option></option>")
                    .attr("value", value[0]).attr("id", value[1]).text(key));
            });

        }

        if (isSitPresent === 1) {
            $('#subsituationlist').show();
            $('#step2renum1').text('3');
            $('#step2renum2').text('4');
            $('#step2renum3').text('5');
            $('#step2renum4').text('6');
        } else {
            $('#subsituationlist').hide();
            $('#step2renum1').text('2');
            $('#step2renum2').text('3');
            $('#step2renum3').text('4');
            $('#step2renum4').text('5');
        }

    }   



    function addDetailsText() {
        var detailsText = "Additional information on your pay situation: " + "\n\n" + "Daytime telephone number: " + "\n" + "Evening telephone number: " + "\n" + "Indicate the best time to be contacted: ";
        $('#id11').val($('#id11').val() + detailsText);
    }

    function removeDetailsText() {
        $('#id11').val("");
    }

    // return focus to where the form error list is
    function errorFocus() {
        $("#errors-form").focus();
        return false;
    }

    function getTodaysDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        return yyyy + '/' + mm + '/' + dd;
    }

    // clear all inputs
    function clearJqValidErrors() {

        $("#technote1").hide();
        $("#step2panel").hide();
        $("#step3panel").hide();
        $("#step4panel").hide();
        $("#step5panel").hide();
        $('#epostEmail').hide();
        $('#nextStep2').hide();
        $('#nextStep2Reset').hide();
        $('#nextStep3').hide();
        $('#nextStep3Reset').hide();
        $('#nextStep4').hide();
        $('#nextStep5').hide();
        $('#nextStepSubmit').hide();

        $('#subsituationlist').hide();
        $('#subsubsituationlist').hide();     

        $('#casenumberinput').hide();
        $('input[name="casenumber"]').prop('checked', false);
        $('#casenumbertext').val('');              
        
        $('#precasenumberinput').hide();
        $("#step1panel").show();
        $('#epostEmailAddress').val('');
        $('#toolTipText').html('');

        $('#step1item').addClass('active');
        $('#step1item').removeClass('completed');
        $('#step2item').removeClass('completed');
        $('#step2item').removeClass('active');

        // set validator based on form id
        var validator = $('#form').validate();

        validator.resetForm();
        validator.reset();

        $('#form').find("label.error").hide(); // remove all error and success data
        $('#form').find(".error").removeClass("error"); // remove error class on name elements and clear history
        $("#errors-form").remove(); // remove the error form box 

        $('#form')[0].reset();

        $(document).scrollTop($("#progresssteps").offset().top);
        // go back to the first form field  
        $('#prevReport1').focus();

    }

    function clearJqValidErrorsConfirm() {

        $("#technote1").hide();
        $("#step2panel").hide();
        $("#step3panel").hide();
        $("#step4panel").hide();
        $("#step5panel").hide();
        $('#epostEmail').hide();
        $('#nextStep2').hide();
        $('#nextStep2Reset').hide();
        $('#nextStep3').hide();
        $('#nextStep3Reset').hide();
        $('#nextStep4').hide();
        $('#nextStep4Reset').hide();
        $('#nextStep5').hide();
        $('#nextStepSubmit').hide();
        $('#nextStep5Reset').hide();
        $('#precasenumberinput').hide();
        $("#step1panel").show();
        $('#epostEmailAddress').val('');
        $('#toolTipText').html('');

        $('#casenumberinput').hide();
        $('input[name="casenumber"]').prop('checked', false);
        $('#casenumbertext').val('');           

        $('#subsituationlist').hide();
        $('#subsubsituationlist').hide();

        $('#step1item').addClass('active');
        $('#step1item').removeClass('completed');
        $('#stepcounter1').css('color', '#000');

        $('#step2item').removeClass('completed');
        $('#step2item').removeClass('active');
        $('#stepcounter2').css('color', '#000');  

        $('#step3item').removeClass('completed');
        $('#step3item').removeClass('active');
        $('#stepcounter3').css('color', '#000');  

        $('#step4item').removeClass('completed');
        $('#step4item').removeClass('active');
        $('#stepcounter4').css('color', '#000');                             

        $('#stepNumber').text('Step 1');
        $('#stepNumberText').html('<h4 class="mrgn-tp-0">Useful information</h4><p class="small" style="line-height: 20px;">Did you know the Client Contact Centre can help you to fix some issues such as:</p> <ul class="small single-space" style="line-height: 20px;"><li>update your direct deposit information</li><li>activate or deactivate your electronic payments</li><li>send electronic copies of your pay stubs and tax slips via <a target="_blank" href="https://www.canadapost-postescanada.ca/cpc/en/business/postal-services/digital-mail/epost-connect.page">epost Connect™</a></li><li>place a hold on the recovery of an overpayment</li><li>update your information to withhold additional taxes, and validate and update your tax data</li><li>activate your enrolment in time reporter and maintain time reporter data in Phoenix</li><li>activate your access to Phoenix</li><li>change your address if you have left the public service to go on extended leave (maternity, education, sick, etc.)</li><li>enrol, amend or terminate your benefits (dental, health, pension, death and disability (excluding the Public Service Management Insurance Plan and British Columbia Medical)</li></ul>');        

        // set validator based on form id
        var validator = $('#form').validate();

        validator.resetForm();
        validator.reset();

        $('#form').find("label.error").hide(); // remove all error and success data
        $('#form').find(".error").removeClass("error"); // remove error class on name elements and clear history
        $("#errors-form").remove(); // remove the error form box 

        $('#form')[0].reset();

        $(document).scrollTop($("#progresssteps").offset().top);
        // go back to the first form field  
        $('#prevReport1').focus();

    }


    // reset Step 2 inputs
    function clearJqValidErrorsStep2() {

        $("#step1panel").hide();
        $("#step3panel").hide();
        $("#step2panel").show();
        $("#step4panel").hide();
        $("#step5panel").hide();
        $('#casenumberinput').hide();
        $('#nextStep3').hide();
        $('#toolTipText').html('');

        $('#step2item').removeClass('completed');
        $('#step2item').addClass('active');
        $('#stepcounter2').css('color', '#000');            


        $('input[name="identity"]').prop('checked', false);
        $('input[name="status"]').prop('checked', false);
        $('input[name="empSchedule"]').prop('checked', false);
        $('input[name="empStatus"]').prop('checked', false);
        $('input[name="empGroup"]').prop('checked', false);

        // $('#student').prop('checked', false);
        // $('#isStudent').hide();

        // $('input[name="casenumber"]').prop('checked', false);
        // $('#casenumbertext').val('');
        // $('#estimatedOwing').prop('selectedIndex', 0);
        // $('#classification').prop('selectedIndex', 0);
        // go back to the first form field  
        $('#identity1').focus();

    }

    // reset Step 2 inputs
    function clearJqValidErrorsStep3() {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
         if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 

        today = yyyy+'-'+mm+'-'+dd;

        $('#issueFrom').attr('max', today);          

        $('#issueFrom').val('');
        $('#issueTo').val('');
        $('#comments').val('');
        $("#comments-word-cnt").text('Characters left: 1500');
        $('#situation').prop('selectedIndex', 0);
        $('#subsituation').prop('selectedIndex', 0);
        $('#subsubsituation').val('');
        $('#casenumberinput').hide();
        $('input[name="casenumber"]').prop('checked', false);
        $('#casenumbertext').val('');        

        $("#step1panel").hide();
        $("#step3panel").show();
        $("#step2panel").hide();
        $("#step4panel").hide();
        $("#step5panel").hide();
        $('#nextStep4').hide();
        $('#casenumberinput').hide();
        $('#subsituationlist').hide();
        $('#subsubsituationlist').hide();
        $('#step2renum1').text('2');
        $('#step2renum2').text('3');
        $('#step2renum3').text('4');
        $('#step2renum4').text('5');
        $('#toolTipText').html('');
        $('#subsubsituationlist').hide();

        $('#step3item').removeClass('completed');
        $('#step3item').addClass('active');
        $('#stepcounter3').css('color', '#000');       

        // go back to the first form field  
        $('#situation').focus();

    }

    // reset Step 4 inputs
    function clearJqValidErrorsStep4() {

        $("#step1panel").hide();        
        $("#step2panel").hide();
        $("#step3panel").hide();
        $("#step4panel").show();
        $("#step5panel").hide();
        $('#nextStep5').hide();

        $('#step4item').removeClass('completed');
        $('#step4item').addClass('active');
        $('#stepcounter4').css('color', '#000');        

        $('#Firstname').val('');
        $('#Lastname').val('');
        $('#PRIcode').val('');
        $('#Department').val('');
        $('#Classification').val('');
        $('#EmailAddress').val('');
        $('#EmailAddressConfirm').val('');
        $('#TelephoneNumber').val('');


        // go back to the first form field  
        $('#Firstname').focus();

    }

    function srSpeak(text, priority) {
        var el = document.createElement("div");
        var id = "speak-" + Date.now();
        el.setAttribute("id", id);
        el.setAttribute("aria-live", priority || "polite");
        el.classList.add("sr-only");
        document.body.appendChild(el);

        window.setTimeout(function() {
            document.getElementById(id).innerHTML = text;
        }, 100);

        window.setTimeout(function() {
            document.body.removeChild(document.getElementById(id));
        }, 1000);
    }