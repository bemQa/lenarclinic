let scrollTop = $(window).scrollTop();

$(window).scroll(function(evt) {
    scrollTop = $(this).scrollTop();
});

$(document).ready(function() {
	// анимация меню
	$('.menu').click(function(e){
        e.preventDefault();
        (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');

        $('.header').toggleClass('active');
        $('body').on('click', function (e) {
            let div = $('.menu-links-wrapper, .menu');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $('.header, .menu').removeClass('active');
            }
        });
    });

    // якоря для ссылок
    $('.anchor[href^="#"]').click(function () {
        $('.header').removeClass('active'); 
       	$('.menu').removeClass('active');

        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top-150;
        $('html, body').animate( { scrollTop: destination }, 500, 'swing' );
        return false;
    });

    // аккордеон
    function openAccordion() {
        let wrap = $('.accordion-wrap');
        let accordion = wrap.find('.accordion-title');

        accordion.on('click', function () {
            let $this = $(this);
            let $parent = $(this).parent();
            let wrapper = $(this).parents('.accordion-wrap');
            let content = $this.next();

            if (content.is(':visible')) {
                if(wrapper.hasClass('single-accordion')) {
                    wrapper.children().find('.accordion-title').removeClass('active');
                    wrapper.children().find('.accordion-title').next().slideUp('fast');
                }
                $this.removeClass('active');
                $parent.removeClass('active');
                content.slideUp('fast');
            } else {
                if(wrapper.hasClass('single-accordion')) {
                    wrapper.children().find('.accordion-title').removeClass('active');
                    wrapper.children().find('.accordion-title').next().slideUp('fast');
                }
                $this.addClass('active');
                $parent.addClass('active');
                content.slideDown('fast');
            }

        });
    }
    openAccordion();

    let clinic_photos_slider = $('.clinic-photos');
    if(clinic_photos_slider.length){
        clinic_photos_slider.owlCarousel({
            center: false,
            items: 1,
            loop: false,
            nav: true,
            dots: true,
            margin: 10,
            mouseDrag: true,
            touchDrag: true,
            navSpeed: 1300,
            responsive: {
                0: {
                    nav: false
                },
                481: {
                    nav: true
                }
            }
        });
    }

    // select2
    if($('.select').length > 1) {
        $('select').each(function() {
            let $this = $(this).not('.select-search');
            let parent = $(this).not('.select-search').parents('.select');
            $this.select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: parent
            });
        });
        $('.select-search').each(function() {
            let $this = $(this);
            let parent = $(this).parents('.select');
            $this.select2({
                dropdownParent: parent
            });
        });
    } else if($('.select').length == 1) {
        $('select').select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $('.select')
        });
        $('.select-search').select2({
            dropdownParent: $('.select')
        });
    }

    // history-element scroll
    if($('.history-element').length) {
        $(window).on('scroll load', function () {
            let top = $(window).scrollTop();
            $('.history-element').each(function() {
                let destination = $(this).offset().top-300;
                if(top >= destination) {
                    $(this).addClass('scrolled');
                } else {
                    $(this).removeClass('scrolled');
                }
            });
        }).trigger('scroll');
    }

    if($('.list-item').length) {
        $('.list-item').click(function() {
            if($(this).hasClass('active')) {
                $('.list-item').removeClass('active');
                $(this).addClass('active');
                $(this).prevAll().addClass('active');
            } else {
                $('.list-item').removeClass('active');
                $(this).removeClass('active');
                $(this).prevAll().removeClass('active');
            }
        });
    }

    scrollWaypointInit($('.animateMe'));

    function countMe() {
        $('.count_me').spincrement({
            thousandSeparator: '',
            duration: 2200
        });
    };
    
    // if ( $('.stat-count').length ) {
    //     $(window).scroll(function(){
    //         let oftop = $(this).scrollTop();
    //         let counters = $('.stat-count').parent().parent().offset().top;
    //         let percent = $(window).height() * 0.8;
    //         if ( oftop > counters-percent ) {
    //             countMe();
    //         }
    //     });
    //     countMe();
    // }

    $('.youtube-iframe').click(function(){
        $('.youtube-iframe').removeClass('active').addClass('inactive');
        $(this).removeClass('inactive').addClass('active');
    });

    // if($(window).innerWidth() > 480) {
    //     $('.review-mainpage').mouseover(function(e) {
    //         $(this).addClass('first')
    //         if($(this).index() == 2) {
    //             $('.review-mainpage:eq(0)').addClass('third');
    //         } else if($(this).index() == 1) {
    //             $('.review-mainpage:eq(0), .review-mainpage:eq(2)').addClass('third');
    //         } else if($(this).index() == 0) {
    //             $(this).css({'scale':'1.1'});
    //         }
    //     });
    
    //     $('.review-mainpage').mouseout(function(e) {
    //         $('.review-mainpage').removeClass('first second third').css({'scale':''});
    //     });
    // }

    // попап отзывов
    $('body').on('click', '.review-open', function(e) {
        let name = $(this).find('.review-name').html();
        let text = $(this).find('.review-text').html();
        $('#modal_review_name').html(name);
        $('#modal_review_text').html(text);
    });

    // рекламный баннер
    const imageContainer = document.getElementById('imageContainer');
    const closeBtn = document.getElementById('closeBtn');
    const imageLink = document.getElementById('imageLink');

    // Функция разворачивания
    function expandBanner() {
        imageContainer.classList.remove('minimized');
        localStorage.setItem('bannerMinimized', 'false');
    }

    // Функция сворачивания
    function minimizeBanner() {
        imageContainer.classList.add('minimized');
        localStorage.setItem('bannerMinimized', 'true');
    }

    // 1. При загрузке восстанавливаем состояние свёрнутости
    const isMinimized = localStorage.getItem('bannerMinimized') === 'true';
    if (isMinimized) {
        imageContainer.classList.add('minimized');
    } else {
        imageContainer.classList.remove('minimized');
    }

    // 2. Клик по крестику — сворачиваем
    closeBtn.onclick = function(e) {
        e.stopPropagation();
        minimizeBanner();
    };

    // 3. Клик по контейнеру (кроме крестика) — разворачиваем, если свёрнут
    imageContainer.addEventListener('click', function(e) {
        if (e.target === closeBtn || closeBtn.contains(e.target)) {
            return;
        }
        if (imageContainer.classList.contains('minimized')) {
            expandBanner();
        }
    });

    // 4. Клик по ссылке
    imageLink.addEventListener('click', function(e) {
        if (imageContainer.classList.contains('minimized')) {
            e.preventDefault();
            expandBanner();
            return;
        }
        e.preventDefault();
        const url = imageLink.getAttribute('href');
        window.open(url, '_blank');
    });
});

function scrollWaypointInit(items, trigger) {
    items.each(function() {
        var element = $(this),
            osAnimationClass = element.data("animation"),
            osAnimationDelay = element.attr('data-animation-delay');

        element.css({
            '-webkit-animation-delay': osAnimationDelay,
            '-moz-animation-delay': osAnimationDelay,
            'animation-delay': osAnimationDelay
        });

        var trigger = (trigger) ? trigger : element;

        trigger.waypoint(function() {
            element.addClass('animate__animated').addClass('animate__' + osAnimationClass);
        }, {
            // triggerOnce: true,
            offset: '80%'
        });
    });
}

( function() {

    var youtube = document.querySelectorAll( ".youtube" );
    
    for (var i = 0; i < youtube.length; i++) {
    
        youtube[i].addEventListener( "click", function() {

            var iframe = document.createElement( "iframe" );

                iframe.setAttribute( "frameborder", "0" );
                iframe.setAttribute( "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" );
                iframe.setAttribute( "allowfullscreen", "" );
                iframe.setAttribute( "src", this.dataset.link + "?autoplay=1&controls=0");

                this.innerHTML = "";
                this.appendChild( iframe );
        } );    
    };
    
} )();