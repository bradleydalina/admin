$(document).ready(function(){
    Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;
    if ($(window).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }

    var sideMenu = $('#side-menu').metisMenu();

    sideMenu.on('shown.metisMenu', function (e) {
        fix_height();
    });

    $('body.canvas-menu .sidebar-collapse').slimScroll({
        height: '100%',
        railOpacity: 0.9
    });

    $('.right-sidebar-toggle').on('click', function (e) {
        e.preventDefault();
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    $('.sidebar-container').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 10
    });

    $('.navbar-minimalize').on('click', function (event) {
        event.preventDefault();
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });

    $("li.menu-list > a").on("click",function(event){//id^='s'
            $("li.menu-list:not('.parent-menu')").each(function(){
                    $(this).removeClass("active");        
            })
            $(this).parent("li.menu-list:not('.parent-menu')").addClass("active");
        });
        $(document).on("click", ".menu-button", function(){  
                $(".menu-list.active").removeClass('active');
                $(this).parent('li').addClass("active");
                const $this = $(this);
                const list_menu = $this.parent('li');
                const list_target = $this.attr('data-bs-target');
                $( list_target ).on('hidden.bs.modal', function () {   
                    list_menu.removeClass('active');
                    $this.focusout().blur();
                    $('.menu-dashboard').addClass("active");                  
                });  
            });    
        $(".update-password-button").on("click", function(){
                $("#update-password-modal").modal('show');
            });
        $(".update-profile-button").on("click", function(){
                $("#update-profile-modal").modal('show');
            });
        $(".alternate-email-button").on("click", function(){
                $("#alternate-email").val('{{Auth::user()->alternate_email}}');
                setTimeout(function(){
                    $("#alternate-email").focus();
                }, 500)
                $("#alternate-email-modal").modal('show');
            });
        
    });

    $(window).bind("load", function () {
        if ($("body").hasClass('fixed-sidebar')) {
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }
    });

    function fix_height() {
        var heightWithoutNavbar = $("body > #eu-wrapper").height() - 62;
        $(".sidebar-panel").css("min-height", heightWithoutNavbar + "px");
    
        var navbarheight = $('#eu-navbar').height();
        var wrapperHeight = $('#page-wrapper').height();
    
        if (navbarheight > wrapperHeight) {
            $('#page-wrapper').css("min-height", navbarheight + "px");
        }
    
        if (navbarheight < wrapperHeight) {
            $('#page-wrapper').css("min-height", $(window).height() + "px");
        }
    
        if ($('body').hasClass('fixed-nav')) {
            if (navbarheight > wrapperHeight) {
                $('#page-wrapper').css("min-height", navbarheight + "px");
            } else {
                $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
            }
        }
    
    }

    $(document).ready(function () {
        if (localStorageSupport()) {
    
            var collapse = localStorage.getItem("collapse_menu");
            var fixednavbar = localStorage.getItem("fixednavbar");
            var boxedlayout = localStorage.getItem("boxedlayout");
            var fixedfooter = localStorage.getItem("fixedfooter");
    
            var body = $('body');

            if (collapse == 'on') {
                if (body.hasClass('fixed-sidebar')) {
                    if (!body.hasClass('body-small')) {
                        body.addClass('mini-navbar');
                    }
                } else {
                    if (!body.hasClass('body-small')) {
                        body.addClass('mini-navbar');
                    }
    
                }
            }    
    
            if (boxedlayout == 'on') {
                body.addClass('boxed-layout');
            }
    
            if (fixedfooter == 'on') {
                $(".footer").addClass('fixed');
            }
        }
    });
    
    function localStorageSupport() {
        return (('localStorage' in window) && window['localStorage'] !== null)
    }

    $(window).bind("load resize scroll", function () {    
        // Full height of sidebar
        setTimeout(function(){
            if (!$("body").hasClass('body-small')) {
                fix_height();
            }
        })
    
    });
    
    // Minimalize menu when screen is less than 768px
    $(window).bind("resize", function () {
        if ($(this).width() < 769) {
            $('body').addClass('body-small')
        } else {
            $('body').removeClass('body-small')
        }
    });

    function SmoothlyMenu() {
        if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
            $('#side-menu').hide();
            setTimeout(
                function () {
                    $('#side-menu').fadeIn(400);
                }, 200);        
        } else {
            $('#side-menu').removeAttr('style');
        }
    }