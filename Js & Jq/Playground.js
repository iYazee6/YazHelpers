$(document).ready(function () {
    
    // AdminLTE: Select current page and remove href from it
    try {
        if (!this.location.pathname.includes('/404')) {
            // Selecting the current page and openning treeview if there is one
            $('a[href="' + this.location.pathname + '"]').addClass('active');
            $('a[href="' + this.location.pathname + '"]').parents('.has-treeview').addClass('menu-open');
            $('a[href="' + this.location.pathname + '"]').removeAttr('href');
        }
    } catch (e) { }
    
    
    /* Using culture specified classes (Will just replace depending on the current language ~> (RTL/LTR)
    for example we
        <div class="float-culture"></div>
     if (RTL) will be replaced to
        <div class="float-left"></div>
     else 
        <div class="float-right"></div>
    ...
    */
    try {
        $(".cultureClass").addClass(getCultureLayout()).removeClass('cultureClass');
        $(".float-culture").addClass((culture == "AR") ? 'float-left' : 'float-right').removeClass('float-culture');
        $(".mx-culture").addClass((culture == "AR") ? 'mr-auto' : 'ml-auto').removeClass('mx-culture');
        $(".text-culture").addClass((culture == "AR") ? 'text-right' : 'text-left').removeClass('text-culture');
        $(".text-culture-inv").addClass((culture == "AR") ? 'text-left' : 'text-right').removeClass('text-culture');
    } catch (e) { }
    
});

// Simple (AR/EN) Culture Management from Cookies [_culture]
var culture = 'AR';
function setCulture() {
    var match = document.cookie.match(new RegExp('(^| )' + '_culture' + '=([^;]+)'));
    if (match && match[2] == 'en-US') { culture = 'EN'; }
    else { culture = 'AR'; }
}
function getCultureLayout() {
    if (culture == 'AR') { return 'left'; }
    else { return 'right'; }
}

// JQ: Allows loading a script to the page
// Just user $.loadScript('../Scripts/my-script.js', function() { console.log('Loaded'); });
jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

// JQ: Adds Bootstrap's loading spinner
function addLoadingBtn(btnId) {
    $('#' + btnId).attr('disabled', 'disabled');
    $('#' + btnId).addClass('disabled');
    $('#' + btnId).html($('#' + btnId).html() + `<span class="btn-loading">...</span> <span class="btn-loading spinner-border spinner-border-sm mb-1" role="status" aria-hidden="true"></span>`);
}

// JQ: removes Bootstrap's loading spinner
function removeLoadingBtn(btnId) {
    $('#' + btnId).attr('disabled', false);
    $('#' + btnId).removeClass('disabled');
    $('#' + btnId + ' .btn-loading').remove();
}

// JQ: On AjaxStart: show loading & On AjaxStop: HideLoading
var pendingReq = false, loadingEvent;
$(document).on({
    ajaxStart: function () {
        pendingReq = true;
        showLoading();
    },
    ajaxStop: function () {
        clearTimeout(loadingEvent);
        loadingEvent = setTimeout(hideLoading, 100);
        pendingReq = false;
    }
});

// Show & Hide bootstrap's full page loading indicator with default timeout
function showLoading(speed, wait) {
    $(".gloading").fadeIn((speed)? 250 : speed);
    clearTimeout(loadingEvent);
    loadingEvent = setTimeout(hideLoading, (wait) ? wait : 5000);
}
function hideLoading(speed) {
    clearTimeout(loadingEvent);
    $(".gloading").fadeOut((speed)? 250 : speed);
}
// Must have this in dom
/* CSS:
.gloading {
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    position: fixed;
    display: block;
    z-index: 1050;
}

.gloading-content {
    position: absolute;
    top: 40%;
    left: 45%;
    z-index: 1050;
}

.gloading .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
    background: rgba(0,0,0,0.2);
    z-index: 1050;
}
*/
/*
<div class="gloading" style="display:none;">
    <div class="overlay"></div>
    <div class="gloading-content">
        <div class="spinner-grow text-warning" style="width: 5rem; height: 5rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</div>
*/

// AdminLTE: Collapse site menu
function collapseSideMenu() {
    try {
        if (($(window).width() >= 993) && ($('.sidebar-collapse').length == 0))
            $('.nav-link[data-widget="pushmenu"]').click();
    } catch (e) { }
}

