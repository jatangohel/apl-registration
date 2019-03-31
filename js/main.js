(function ($) {
    "use strict";
    let registerForm = $('#register-form');
    $('#jerseySize').parent().append('<ul class="list-item" id="newjerseySize" name="jerseySize"></ul>');
    $('#jerseySize option').each(function () {
        $('#newjerseySize').append('<li value="' + $(this).val() + '">' + $(this).text() + '</li>');
    });
    $('#jerseySize').remove();
    $('#newjerseySize').attr('id', 'jerseySize');
    $('#jerseySize li').first().addClass('init');
    $('#jerseySize').on("click", ".init", function () {
        $(this).closest("#jerseySize").children('li:not(.init)').toggle();
    });

    let allOptions = $('#jerseySize').children('li:not(.init)');
    $('#jerseySize').on("click", "li:not(.init)", function () {
        allOptions.removeClass('selected');
        $(this).addClass('selected');
        $("#jerseySize").children('.init').html($(this).html());
        allOptions.toggle();
    });

//    var range_all_sliders = {
//	'min': [     0 ],
//	'10%': [   50,  50 ],
//	'50%': [  400, 100 ],
//	'max': [ 1000 ]
//}

    let battingSlider = document.getElementById('slider-margin');
    if (battingSlider !== undefined) {
        noUiSlider.create(battingSlider, {
            start: [5],
            step: 1,
            connect: [true, false],
            tooltips: [true],
            range: {
                'min': 0,
//                '10%':['best'],
//                '20%':[2,'worst'],
                'max': [10]
            },
            format: wNumb({
                decimals: 0,
                thousand: ',',
                prefix: ' ',
            })


        });
    }

    let bowlingSlider = document.getElementById('slider-margin1');
    if (bowlingSlider !== undefined) {
        noUiSlider.create(bowlingSlider, {
            start: [5],
            step: 1,
            connect: [true, false],
            tooltips: [true],
            range: {
                'min': 0,
                'max': 10
            },
            format: wNumb({
                decimals: 0,
                thousand: ',',
                prefix: ' ',
            })
        });
    }

    let fieldingSlider = document.getElementById('slider-margin2');
    if (fieldingSlider !== undefined) {
        noUiSlider.create(fieldingSlider, {
            start: [5],
            step: 1,
            connect: [true, false],
            tooltips: [true],
            range: {
                'min': 0,
                'max': 10
            },
            format: wNumb({
                decimals: 0,
                thousand: ',',
                prefix: ' ',
            })
        });
    }

    $('#reset').on('click', function () {
        $('#register-form').reset();
    });

    registerForm.validate({
        rules: {
            first_name: {
                required: true,
            },
            last_name: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            phone_number: {
                required: true,
            }
        },
        onfocusout: function (element) {
            $(element).valid();
        },
    });

    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        email: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });

    const URL = "https://apl2019i862354trial.hanatrial.ondemand.com/cloudFinal/webapi/player/playerDetails";
    let isProcessing = false;

    const assertCheckIfDefined = (inputValue, fieldName) => {
        if (!inputValue) {
            throw new Error(`please specify ${fieldName}`);
        }
    };

    const getValueIfNotUndefinedInputFields = (inputFieldId, fieldName) => {
        const fieldValue = document.getElementById(inputFieldId).value.trim();
        fieldName = fieldName ? fieldName : inputFieldId;
        assertCheckIfDefined(fieldValue, fieldName);
        return fieldValue;
    };
    
    const isValidEmail = email => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email.match(regex);
    };

    const validateAndGetValidatedFields = () => {
        let firstName;
        let lastName;
        let email;
        let streetAddress;
        let city;
        let state;
        let zipCode;
        let country;
        let phoneNumber;
        let battingRate;
        let bowlingRate;
        let battingComment;
        let bowlingComment;
        let fieldingComment;
        let fieldingRate;
        let base64ImageString;
        let imageFormat;
        let jerseyNumber;
        let jerseySize;
        let sevaCollectorEmail;
        let refName;
        

        firstName = getValueIfNotUndefinedInputFields("first_name", "first name");
        lastName = getValueIfNotUndefinedInputFields("last_name", "last name");
        email = getValueIfNotUndefinedInputFields("email");
        if(!isValidEmail(email)) {
            throw new Error("please provide valid email id");
        }
        const streetNumber = getValueIfNotUndefinedInputFields("street_number", "street number");
        const route = getValueIfNotUndefinedInputFields("route");
        streetAddress = streetNumber + " " + route;
        city = getValueIfNotUndefinedInputFields("locality");
        state = getValueIfNotUndefinedInputFields("administrative_area_level_1", "state");
        zipCode = getValueIfNotUndefinedInputFields("postal_code", "postal code");
        country = getValueIfNotUndefinedInputFields("country");
        battingComment = getValueIfNotUndefinedInputFields("battingComments", "batting comments");
        bowlingComment = getValueIfNotUndefinedInputFields("bowlingComments", "bowling comments");
        fieldingComment = getValueIfNotUndefinedInputFields("fieldingComments", "fielding comments");
        sevaCollectorEmail = getValueIfNotUndefinedInputFields("sevaCollectorEmail", "seva collector");
        refName = getValueIfNotUndefinedInputFields("refName", "reference name");

        try {
            phoneNumber = parseInt(document.getElementById("phone_number").value.trim().replace(/-/g, ''));   // this line will remove dash in string and convert it to integer
        } catch (error) {
            log(error);
            throw new Error("invalid mobile number");
        }
        try {
            battingRate = parseInt(battingSlider.noUiSlider.get().trim()); // getter syntax for the value of slider
        } catch (error) {
            log(error);
            throw new Error("invalid batting rating");
        }
        try {
            bowlingRate = parseInt(bowlingSlider.noUiSlider.get().trim());
        } catch (error) {
            log(error);
            throw new Error("invalid bowling rating");
        }
        try {
            fieldingRate = parseInt(fieldingSlider.noUiSlider.get().trim());
        } catch (error) {
            throw new Error("invalid fielding rating");
        }
        const base64PhotoWithFileExtensionSeperatedByDot = document.getElementById('base64Image').value;
        if (!base64PhotoWithFileExtensionSeperatedByDot) {
            throw new Error("invalid profile picture");
        }
        const base64PhotoWithExt = base64PhotoWithFileExtensionSeperatedByDot.toString().split('.');
        base64ImageString = base64PhotoWithExt[0];
        imageFormat = base64PhotoWithExt[1];

        if (!(imageFormat === "jpg" || imageFormat === "jpeg" || imageFormat === "png" || imageFormat === "JPG" ||
              imageFormat === "JPEG" || imageFormat === "PNG")) {
            throw new Error("invalid image format (shoud either jpg/jpeg/png)");
        }

        try {
            const jerseyNumberString = document.getElementById("chequeno").value.trim();
            jerseyNumber = jerseyNumberString ? parseInt(jerseyNumberString) : 0;
            if (jerseyNumber < 0 || jerseyNumber > 99) {
                throw new Error();
            }
        } catch (error) {
            log(error);
            throw new Error("invalid jersey number");
        }

        const jerseySizeElement = document.getElementById("jerseySize");
        jerseySize = jerseySizeElement.outerText.toLocaleLowerCase().trim();
        if (jerseySize === "select final size") {
            jerseySize = "";
        }
        assertCheckIfDefined(jerseySize, "jersey size");

        return {
            firstName,
            lastName,
            email,
            phoneNumber,
            streetAddress,
            city,
            state,
            zipCode,
            country,
            battingRate,
            bowlingRate,
            fieldingRate,
            battingComment,
            bowlingComment,
            fieldingComment,
            base64ImageString,
            imageFormat,
            jerseyNumber,
            jerseySize,
            sevaCollectorEmail,
            refName
        }
    };

    const createData = () => {
        const validatedFields = validateAndGetValidatedFields();
        document.getElementById('base64Image').value = "";

        const requestBody = {
            firstName: validatedFields.firstName,
            lastName: validatedFields.lastName,
            email: validatedFields.email,
            mobileNumber: validatedFields.phoneNumber,
            streetAddress: validatedFields.streetAddress,
            city: validatedFields.city,
            state: validatedFields.state,
            zipCode: validatedFields.zipCode,
            country: validatedFields.country,
            jerseyNumber: validatedFields.jerseyNumber,
            sevaCollector: validatedFields.sevaCollectorEmail,
            jerseySize: validatedFields.jerseySize,
            isPaid: false,
            battingRating: validatedFields.battingRate,
            bowlingRating: validatedFields.bowlingRate,
            fieldingRating: validatedFields.fieldingRate,
            battingComment: validatedFields.battingComment,
            bowlingComment: validatedFields.bowlingComment,
            fieldingComment: validatedFields.fieldingComment,
            photo: validatedFields.base64ImageString,
            imageFormat: validatedFields.imageFormat,
            refName: validatedFields.refName
        };

        log(requestBody);
        return requestBody;
    };

    const sendRequest = async jsonData => {
        try {
            const response = await fetch(URL, {
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(jsonData),
                method: "POST"
            });
            return true;
        } catch (error) {
            log(error);
            throw new Error("unexpected error occurred. Please try again or contact the admin.");
        }
    };

    registerForm.submit(async event => {
        try {
            if (isProcessing) {
                return;
            }
            isProcessing = true;

            displayLoader();
            event.preventDefault();
            const jsonData = createData();
            const isRegistered = await sendRequest(jsonData);

            displaySuccessMessage("Registered Successfully");
        } catch (error) {
            log(error);
            displayErrorMessage(error);
        }

        isProcessing = false;
        hideLoader();
    });

    const displaySuccessMessage = message => {
        document.getElementById("myModal").style.display = "block";
    };

    const displayErrorMessage = message => {
        document.getElementById("myModal1").style.display = "block";
        document.getElementById("failModalMessage").innerHTML = (message);
    };

    const displayLoader = () => {
        getLoader().style.visibility = "visible";
    };

    const hideLoader = () => {
        getLoader().style.visibility = "hidden";
    };

    const getLoader = () => {
        return document.getElementById("loader");
    };

    const log = message => {
        console.log(message);
    }
})(jQuery);