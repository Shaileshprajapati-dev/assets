
/*
---> nav-menu navbar
---> small device menu item toggle
---> Navbar menu Auto Active Class
---> category menu toggle
---> sticky header
---> search toggle
---> wishlist
---> body click toggler
---> active back to top
---> Preloader
---> Odometer
---> price toggle
---> top listens swiper
---> host profile swiper
---> host profile swiper 2
---> testimonial swiper 
---> testimonial swiper 2
---> testimonial swiper 3
---> testimonial swiper 4
---> top listens swiper 2
---> features swiper 
---> more episodes
---> swiper bottom btn control
---> host social link toggle
---> magnific popup
---> remove form search history
---> select 2 js
---> custom accordion
---> custom tab
---> password toggle
---> like comment
---> character limit
---> wishlist toggle
---> remove wishlist
---> clone wishlist
---> current year
*/


$(document).ready(() => {
    "use strict";

    // nav-menu navbar
    $('.navbar-toggle-btn').on('click', function () {
        $('.menu-toggler').toggleClass('active');
        $(this).toggleClass('open');
    });

    // small device menu item toggle
    $('.menu-item button').on('click', function () {
        $(this).siblings("ul").slideToggle(300);
        $(this).toggleClass('active');
    });

    // Navbar menu Auto Active Class 
    var curUrl = $(location).attr('href');
    var terSegments = curUrl.split("/");
    var desired_segment = terSegments[terSegments.length - 1];
    var removeGarbage = desired_segment.split(".html")[0] + ".html";
    var checkLink = $('.menu-link a[href="' + removeGarbage + '"]');
    var targetClass = checkLink.addClass('active');
    targetClass.parents('.menu-item').addClass('active');

    // category menu toggle
    $('.category-toggle-btn').on('click', function () {
        $('.category-list-area').toggleClass('active');
        $(this).toggleClass('active');
        $('body').toggleClass('overflow-hidden');
    })

    // header sticky
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 100) {
            $('.header-section').addClass('fixed-header');
        } else {
            $('.header-section').removeClass('fixed-header');
        }
    })

    // search toggle
    $('.search-toggle-btn').on('click', function () {
        $('.search-box').toggleClass('active');
        $(this).find('i').toggleClass('ti-search ti-xbox-x');
    })
    // search toggle 2
    $('.search-toggle-btn-2').on('click', function () {
        $('.search-box-2').toggleClass('active');
        $(this).find('i').toggleClass('ti-search ti-xbox-x');
    })

    // clone wishlist
    $('.wishlist').clone().appendTo('.show-wishlist')

    // body click toggler
    $(document).on("click", function (event) {
        // category toggle hide
        if (!$(event.target).closest(".category-list-area, .category-toggle-btn").length) {
            $(".category-list-area").removeClass("active");
            $(".category-toggle-btn").removeClass("active");
            $('body').removeClass('overflow-hidden');
        }

        if (!$(event.target).closest('.search-toggle-btn, .search-box').length) {
            $('.search-box').removeClass('active')
            $('.search-toggle-btn').find('i').hasClass('ti-xbox-x') ? $('.search-toggle-btn').find('i').toggleClass('ti-search ti-xbox-x') : '';
        }
        if (!$(event.target).closest('.search-toggle-btn-2, .search-box').length) {
            $('.search-box-2').removeClass('active')
            $('.search-toggle-btn-2').find('i').hasClass('ti-xbox-x') ? $('.search-toggle-btn-2').find('i').toggleClass('ti-search ti-xbox-x') : '';
        }
    });

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 300) {
            $('.bottom-to-top').addClass('active');
        } else {
            $('.bottom-to-top').removeClass('active');
        }
    })
    // bottom/back to top
    $('.bottom-to-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    })

    // preloader
    setTimeout(() => {
        $('.preloader').slideUp(300);
    }, 1000);

    // window scroll
    // Odometer
    $(window).on("scroll", function () {
        let windowHeight = $(window).height();
        $('.odometer').children().each(function () {
            if ($(this).isInViewport({ "tolerance": windowHeight, "toleranceForLast": windowHeight, "debug": false })) {
                var section = $(this).closest(".odometer-item");
                section.find(".odometer").each(function () {
                    $(this).html($(this).attr("data-odometer-final"));
                });
            }
        });
    })

    // circle text animation
    let circleText = document.querySelector(".circle-text p");
    if (circleText) {
        circleText.innerHTML = circleText.innerText.split("").map((char, i) => `<span style="transform:rotate(${i * 9}deg)">${char}</span>`).join("");
    }

    // price toggle
    $('#price-toggle-btn').on('click', function () {
        if ($(this).is(':checked')) {
            $('.pricing-card .monthly-package').toggleClass('show hide')
            $('.pricing-card .yearly-package').toggleClass('hide show');

            $('.pricing-card .monthly-price').toggleClass('show hide')
            $('.pricing-card .yearly-price').toggleClass('hide show');
        } else {
            $('.pricing-card .monthly-package').toggleClass('hide show')
            $('.pricing-card .yearly-package').toggleClass('show hide');

            $('.pricing-card .monthly-price').toggleClass('hide show')
            $('.pricing-card .yearly-price').toggleClass('show hide');
        }
    })

    // top listens swiper
    var topListens = new Swiper('.top-listens', {
        slidesPerView: 1,
        spaceBetween: 24,
        speed: 1000,
        freeMode: true,
        loop: true,
        pagination: {
            el: ".top-listens-swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-top-btn .top-listens-next',
            prevEl: '.swiper-top-btn .top-listens-prev',
        },
        breakpoints: {
            1800: {
                slidesPerView: 3
            },
            1500: {
                slidesPerView: 2.5
            },
            1200: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 1.5
            },
        }
    });

    // host profile swiper
    var HostSwiper = new Swiper('.host-swiper', {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 24,
        speed: 1000,
        freeMode: true,
        autoplay: {
            delay: 4500,
        },
        pagination: {
            el: ".host-swiper-swiper-pagination",
            clickable: true,
        },
        navigation: {
            prevEl: ".swiper-top-btn .host-swiper-prev",
            nextEl: ".swiper-top-btn .host-swiper-next",
        },
        breakpoints: {
            1200: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 3
            },
            480: {
                slidesPerView: 2
            },
        }
    });

    //host profile swiper 2
    var HostSwiper2 = new Swiper('.host-swiper-2', {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 24,
        speed: 1000,
        freeMode: true,
        autoplay: {
            delay: 4500,
        },
        navigation: {
            prevEl: ".swiper-top-btn .host-swiper-prev",
            nextEl: ".swiper-top-btn .host-swiper-next",
        },
        breakpoints: {
            1500: {
                slidesPerView: 3.5
            },
            1200: {
                slidesPerView: 3
            },
            992: {
                slidesPerView: 2.5
            },
            768: {
                slidesPerView: 3
            },
            575: {
                slidesPerView: 2
            },
        }
    });

    // testimonial swiper
    var TestimonialSwiper = new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        loop: true,
        speed: 1000,
        freeMode: true,
        effect: "fade",
        navigation: {
            prevEl: ".testimonial-swiper-prev",
            nextEl: ".testimonial-swiper-next",
        },
    });

    // testimonial swiper 2
    var testimonialSwiper2 = new Swiper('.testimonial-swiper-2', {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 24,
        speed: 1000,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4500,
        },
        navigation: {
            prevEl: ".swiper-top-btn .ts-swiper-2-prev",
            nextEl: ".swiper-top-btn .ts-swiper-2-next",
        },
        breakpoints: {
            992: {
                slidesPerView: 2
            },
        }
    });

    // testimonial swiper 3
    var tsWiper3 = new Swiper('.ts-swiper-3', {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 24,
        speed: 1000,
        freeMode: true,
        autoplay: {
            delay: 4500,
        },
        navigation: {
            prevEl: ".ts-swiper-3-prev",
            nextEl: ".ts-swiper-3-next",
        },
    });

    // testimonial swiper 4
    var testimonialSwiper4Thumb = new Swiper(".ts-swiper-4-thumb", {
        spaceBetween: 24,
        slidesPerView: 5,
        // freeMode: true,
        centeredSlides: true,
        slideToClickedSlide: true,
        loop: true,
    });
    var testimonialSwiper4 = new Swiper('.testimonial-swiper-4', {
        slidesPerView: 1,
        loop: true,
        speed: 1000,
        // freeMode: true,
        centeredSlides: true,
        // slideToClickedSlide: true,
        autoplay: {
            delay: 4500,
        },
        navigation: {
            prevEl: ".ts-swiper-4-prev",
            nextEl: ".ts-swiper-4-next",
        },
        thumbs: {
            swiper: testimonialSwiper4Thumb,
        },
    });

    // top listens swiper 2
    var topListens2 = new Swiper('.top-listens-02', {
        slidesPerView: 1,
        spaceBetween: 24,
        speed: 1000,
        freeMode: true,
        loop: true,
        pagination: {
            el: ".top-listens-2-swiper-pagination",
            clickable: true,
        },
        navigation: {
            prevEl: ".swiper-top-btn .top-listens-2-prev",
            nextEl: ".swiper-top-btn .top-listens-2-next",
        },
        breakpoints: {
            1600: {
                slidesPerView: 4
            },
            1400: {
                slidesPerView: 3.5
            },
            992: {
                slidesPerView: 3
            },
            768: {
                slidesPerView: 2
            },
            575: {
                slidesPerView: 1.5
            },
        }
    });

    // features swiper
    var features = new Swiper('.features-swiper', {
        slidesPerView: 1,
        loop: true,
        speed: 1000,
        freeMode: true,
        autoplay: {
            delay: 4500,
        },
        navigation: {
            prevEl: ".swiper-top-btn .features-prev",
            nextEl: ".swiper-top-btn .features-next",
        },
        breakpoints: {
            1400: {
                slidesPerView: 4
            },
            992: {
                slidesPerView: 3
            },
            768: {
                slidesPerView: 2
            },
        }
    });

    // more episodes
    var moreEpisodes = new Swiper('.more-episodes', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        speed: 1000,
        freeMode: true,
        autoplay: {
            delay: 4500,
        },
        navigation: {
            prevEl: ".swiper-top-btn .more-episodes-prev",
            nextEl: ".swiper-top-btn .more-episodes-next",
        },
        pagination: {
            el: ".more-episodes-pagination",
            clickable: true,
        },
        breakpoints: {
            992: {
                slidesPerView: 2
            },
        }
    });

    // swiper bottom btn control
    $('.swiper-bottom-btn .button-prev').on('click', function () {
        $(this).parents("section").addClass("active-swiper-bottom-btn");
        document.querySelector(".active-swiper-bottom-btn .swiper-top-btn .button-prev").click();
        setTimeout(() => {
            $(this).parents("section").removeClass("active-swiper-bottom-btn");
        }, 5000);
    });
    $('.swiper-bottom-btn .button-next').on('click', function () {
        $(this).parents("section").addClass("active-swiper-bottom-btn");
        document.querySelector(".active-swiper-bottom-btn .swiper-top-btn .button-next").click();
        setTimeout(() => {
            $(this).parents("section").removeClass("active-swiper-bottom-btn");
        }, 5000);
    });

    // host social link toggle
    $('.link-expand-btn').on('click', function () {
        $(this).parents(".social-link").toggleClass('active');
        $(this).parents(".social-link").find('.social-link-items').toggleClass('active');
        $(this).find('i').toggleClass('ti-plus ti-minus');
    })

    // magnific popup
    if (document.querySelector(".popupvideo") !== null) {
        $(".popupvideo").magnificPopup({
            disableOn: 300,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
        });
    }

    // remove form search history
    $(".remove-search-history").on("click", function () {
        $(this).closest(".search-history").remove()
    })

    // select 2 js
    $(".select-category").select2({
        width: "auto",
        dropdownAutoWidth: true,
        minimumResultsForSearch: Infinity,
    })
    $(".select-sort-comment").select2({
        width: "auto",
        dropdownAutoWidth: true,
        minimumResultsForSearch: Infinity,
    })
    // custom accordion
    $(".accordion-item .accordion-header-area").click(function () {
        if ($(this).closest(".accordion-item").hasClass("active")) {
            $(this).closest(".accordion-item").removeClass("active");
            $(this).next(".accordion-content").slideUp();
        } else {
            $(".accordion-item").removeClass("active");
            $(this).closest(".accordion-item").addClass("active");
            $(".accordion-content").not($(this).next(".accordion-content")).slideUp();
            $(this).next(".accordion-content").slideToggle();
        }
    });

    // custom tab 
    $(".tablinks .nav-links").each(function () {
        var targetTab = $(this).closest(".singletab");
        targetTab.find(".tablinks .nav-links").each(function () {
            var navBtn = targetTab.find(".tablinks .nav-links");
            navBtn.click(function () {
                navBtn.removeClass('active');
                $(this).addClass('active');
                var indexNum = $(this).closest("li").index();
                var tabcontent = targetTab.find(".tabcontents .tabitem");
                $(tabcontent).removeClass('active');
                $(tabcontent).eq(indexNum).addClass('active');
            });
        });
    });

    //password toggle
    $('.show-password').on('click', function () {
        $(this).find('i').toggleClass('ti-eye-closed ti-eye');
        $('#password').attr('type', function (index, attr) {
            return attr == 'password' ? 'text' : 'password';
        })
    })

    // like comment
    // like
    $('.like-btn').on('click', function () {
        $(this).toggleClass('liked');
        $(this).find('i').toggleClass('ti-thumb-up ti-thumb-up-filled');
        if ($(this).hasClass('liked')) {
            $(this).closest('.like-btn-area').find('.like-count').html(parseInt($(this).closest('.like-btn-area').find('.like-count').html()) + 1);
        } else {
            $(this).closest('.like-btn-area').find('.like-count').html(parseInt($(this).closest('.like-btn-area').find('.like-count').html()) - 1);
        }
    })
    // comment
    $('.comment-btn-area').on('click', function () {
        $(this).closest('.like-comment').find('.comment-sending-box').slideToggle();
        $(this).toggleClass('active');
    })

    // character limit
    $('.char-limit').each(function () {
        if ($(this).text().trim().length > parseInt($(this).attr('data-maxlength'))) {
            $(this).html($(this).text().trim().substring(0, parseInt($(this).attr('data-maxlength'))) + '...');
        }
    })

    // wishlist toggle
    $(".heart-icon").on("click", function () {
        $(this).toggleClass("active")
        $(this).find("i").toggleClass("ti-heart ti-heart-filled")
    })
    // remove wishlist
    $(".remove-wishlist").on("click", function () {
        $(this).closest(".wishlist-card").remove()
    })

    // aos animation
    AOS.init({
        startEvent: 'DOMContentLoaded',
        offset: 120,
        delay: 5,
        duration: 1000,
        once: true,
        easing: 'ease',
    });

    // current Year 
    $('.currentYear').text(new Date().getFullYear())

});