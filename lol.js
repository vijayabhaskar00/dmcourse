jQuery(function ($) {
    $.fn.hScroll = function (amount) {
        amount = amount || 120;
        $(this).bind("wheel DOMMouseScroll mousewheel", function (event) {
            console.log(event.deltaX, event.originalEvent.detail);
            if (event.originalEvent.wheelDeltaX === 0 || (sBrowser === 'Mozilla Firefox' && !event.deltaX)) {
                return;
            }
            var oEvent = event.originalEvent;
            var direction;
            if (sBrowser === 'Mozilla Firefox') {
                direction = event.deltaX * -amount;
            } else {
                direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta;
            }
            position = $(this).scrollTop();
            position += direction > 0 ? -amount : amount;
            $(this).scrollTop(position);
            event.preventDefault();
        });
    };
});


function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

var scrollSpeedConstant = 20;
var isBrowserCompatible = false;
var isMobile = false;
var sBrowser, sUsrAg = navigator.userAgent;
var sendingMessage = false;
var platform = window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    os = null
isMac = false;

if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
    isMac = true;
}

if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "Mozilla Firefox";
    // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
} else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
    sBrowser = "Samsung Internet";
    // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
} else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
    sBrowser = "Opera";
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
} else if (sUsrAg.indexOf("Trident") > -1) {
    sBrowser = "Microsoft Internet Explorer";
    // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
} else if (sUsrAg.indexOf("Edge") > -1) {
    sBrowser = "Microsoft Edge";
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
} else if (sUsrAg.indexOf("Chrome") > -1) {
    sBrowser = "Google Chrome or Chromium";
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
} else if (sUsrAg.indexOf("Safari") > -1) {
    sBrowser = "Apple Safari";
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
} else {
    sBrowser = "unknown";
}

if (["Google Chrome or Chromium", "Mozilla Firefox"].indexOf(sBrowser) >= 0) {
    isBrowserCompatible = true;
}

if (sUsrAg.indexOf('Mobile') > -1) {
    isMobile = true;
}

console.log('isBrowserCompatible', isBrowserCompatible, navigator.userAgent, isMobile);

if (isBrowserCompatible) {
    for (var i = 1; i <= 6; i++) {
        (function (i) {
            $(`#${i}-menu-item`).on('click', function () {
                console.log('should move');
                $('#infinite-loader-container').animate({
                    scrollTop: (i - 1) * $(window).width()
                }, 800);
            });
        })(i);
    }
}

if (getMobileOperatingSystem() === 'iOS' || isMac) {
    $('.cs-vip-btn').attr('href', 'https://apps.apple.com/in/app/stumagz-digital-campus/id1362552730');
}

var lookingForOptions = {
    Student: [
        'General Queries',
        'College related',
        'Events Collaboration',
        'Opportuities related',
        'Platform related',
        'Login related',
        'Others'
    ],
    VIP: [
        'Payment',
        'Voucher related',
        'Cashback',
        'VIP Subscription',
        'App Related',
        'Technical Issue',
        'Others'
    ],
    Business: [
        'Collaboration',
        'Advertisement',
        'Platform Related',
        'BIZ Amount Withdraw',
        'BIZ Voucher Creation',
        'BIZ Voucher Tracking',
        'BIZ App Related',
        'Technical Issue',
        'Others'
    ],
    College: [
        'Collaboration',
        'Technical issue',
        'Training (Faculty, Student)',
        'Platform Related',
        'Others'
    ],
    Others: [
        'Others'
    ]
};

$(document).ready(function () {
    $('#cs-progress-bar').css('width', (100 / 8) + '%');

    if (Number($(document).width()) < 768) {
        isMobile = true;

        $('.row').css('margin-left', '0');
        $('#home-content-container').css('background-image', 'none');
        $('#special-privileges-content-container').css('background-image', 'none');
    }

    if (!isBrowserCompatible || isMobile) {
        $('.row').css('width', '100%');
        $('#cs-progress-container').html('');
        $('#infinite-loader-container').removeClass('cs-outer-wrapper');
        $('#infinite-loader').removeClass('cs-wrapper');
    }

    $('#infinite-loader-container').scroll(function (e, delta) {
        if (!isBrowserCompatible) {
            return;
        }

        var scrolledPercentage = 100 * this.scrollTop / (this.scrollHeight - this.clientHeight) + (100 / 8);
        $('#cs-progress-bar').css('width', scrolledPercentage + '%');
        console.log(scrolledPercentage, this.scrollTop, $(window).width());
        for (var i = 1; i <= 6; i++) {
            (function (i) {
                if (Math.ceil(scrolledPercentage) + 6 >= (i * 1 / 6 * 100)) {
                    $(`#${i}-menu-item`).addClass('cs-gold-color');
                } else {
                    $(`#${i}-menu-item`).removeClass('cs-gold-color');
                }
            })(i);
        }
    });

    // var lastPosition = 0;
    // var scrollSpeedConstant = 15;
    // $('#infinite-loader-container').mousewheel(function (e, delta) {
    //     if (!isBrowserCompatible) { return; }

    //     if (e.originalEvent.wheelDeltaX === 0) {
    //         return;
    //     }
    //     var currentPosition = $('#infinite-loader-container').scrollTop();

    //     if (delta < 0) {
    //         $('#infinite-loader-container').animate({
    //             scrollTop: currentPosition - delta + scrollSpeedConstant
    //         }, 0);
    //     } else {
    //         $('#infinite-loader-container').animate({
    //             scrollTop: currentPosition - delta - scrollSpeedConstant
    //         }, 0);
    //     }

    //     e.preventDefault();
    // });

    if (isBrowserCompatible && !isMac) {
        $('#infinite-loader-container').hScroll(30);
    }


    $('#contact-im').change(function () {
        var selectedOption = $('#contact-im option:selected').text();
        $('#contact-looking-for').empty();

        var options = lookingForOptions[selectedOption];
        console.log(options);
        if (!options || !options.length) {
            return;
        }
        options.forEach(function (option) {
            $('#contact-looking-for').append(`
                        <option value="${option}">${option}</option>
                    `);
        });
    });

    function cleanForm() {
        $('#contact-name').empty();
        $('#contact-email').empty();
        $('#contact-mobile').empty();
        $('#contact-message').empty();
        formValue = {};
    }

    $('#contact-form').submit(function (e) {
        e.preventDefault();
        if (sendingMessage) {
            return;
        }
        sendingMessage = true;

        var formValue = {
            contact_country: 'IND',
            stu_type: $('#contact-im').val(),
            looking_for: $('#contact-looking-for').val(),
            contact_person: $('#contact-name').val(),
            contact_email: $('#contact-email').val(),
            contact_mobile: $('#contact-mobile').val(),
            contact_message: $('#contact-message').val()
        }

        $.ajax({
            url: 'https://www.stumagz.com/api/contact',
            method: 'POST',
            json: true,
            data: formValue,
            error: function (err) {
                console.log(err);
                sendingMessage = false;
                $('#cs-popup-text').text(err.errmsg || 'Unknown error occurred. please try again later');
                $('#cs-popup').css('display', 'block');
                cleanForm();
            },
            success: function (data) {
                console.log(data, typeof data);
                data = JSON.parse(data);
                sendingMessage = false;
                if (data.result) {
                    $('#cs-popup-text').text(data.message);
                } else {
                    $('#cs-popup-text').text(data.error_message || 'Unknown error occurred. please try again later');
                }
                $('#cs-popup').css('display', 'block');
                cleanForm();
            }
        });
    });

    $('#cs-popup-close-btn').click(function () {
        $('#cs-popup-text').empty();
        $('#cs-popup').css('display', 'none');
    });
});
