window.addEventListener("DOMContentLoaded", () => {
    
    const dynamicSection = document.querySelector(".dynamic-section"),
          navListWrapper = document.querySelector(".header__nav"),
          hamburger = document.querySelector(".header__hamburger"),
          slides = document.querySelectorAll(".slide"),
          arrowBox = document.querySelector(".arrow-box"),
          prev = document.querySelectorAll(".left-arrow"),
          next = document.querySelectorAll(".right-arrow"),
          slideWrapper = document.querySelector(".slide-wrapper"),
          slidesField = document.querySelector(".slide-inner"),
          tabs = document.querySelectorAll(".header__nav-item"),
          orderBtn = document.querySelectorAll(".contacts-button"),
          modal = document.querySelector(".modal"),
          feedbackBtn = document.querySelectorAll(".feedback"),
          viberLinks = document.querySelectorAll(".viber");
          closeModalBtn = document.querySelectorAll("[data-close]");
          
    let offset = 0,
        width = window.getComputedStyle(slideWrapper).width,
        slideIndex = 0;

    dynamicSection.style.height = window.innerHeight - document.querySelector(".header").offsetHeight + "px";
    arrowBox.style.height = slideWrapper.offsetHeight + "px";
    sliderInit();
    hamburgerInit();
    btnInit();
    //linksInit();
    function hamburgerInit() {
        hamburger.addEventListener("click", () => {
            if(hamburger.classList.contains("header__hamburger_active")) {
                hamburger.classList.remove("header__hamburger_active");
                navListWrapper.style.display = "none";
            } else {
                hamburger.classList.add("header__hamburger_active");
                navListWrapper.style.display = "block";
                navListWrapper.style.height = "auto";
            }
        });
    }

    function linksInit() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            viberLinks.forEach(item => {
                item.href = "viber://phone?number=+375296546002";
            });
        } 
    }

    function btnInit() {
        orderBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                openSlideByNum(2);
                console.log("btn");
            });
        });
        // chatBtn.forEach((btn) => {
        //     btn.addEventListener("click", jivo_api.open());
        // });
        feedbackBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                modal.classList.toggle("hide");
            })
        });
        closeModalBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                modal.classList.toggle("hide");
            })
        });
        modal.addEventListener("click", (e) => {
            if(e.target === modal) {
                modal.classList.toggle("hide");
            }
        });
    }

    function openSlideByNum(num) {
        offset = +width.slice(0, width.length - 2) * num;
        slidesField.style.transform = `translateX(-${offset}px)`;
        changeNavTab(num, tabs);
    }

    function changeNavTab(index, tabs) {
        tabs.forEach(element => {
            element.classList.remove("header__nav-item_active");
        });
        tabs[index].classList.add("header__nav-item_active")
    }

    function sliderInit() {
        dynamicSection.style.height = window.innerHeight - document.querySelector(".header").clientHeight;


        slides.forEach(slide => {
            slide.style.width = width;
        });

        slidesField.style.width = 100 * slides.length + "%";
        slidesField.style.transition = "0.5s all";
        //slideWrapper.style.overflow = "hidden";

        tabs.forEach((element, index) => {
            element.addEventListener("click", () => {
                openSlideByNum(index);
                slideIndex = index;
            });
        });

        window.addEventListener("resize", () => {
            width = window.getComputedStyle(slideWrapper).width;
            slidesField.style.width = 100 * slides.length + "%";
            openSlideByNum(slideIndex);
        });



        

        next.forEach(e => {
            e.addEventListener("click", () => {
		        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			        offset = 0;
		        } else {
			        offset += +width.slice(0, width.length - 2);
		        }

		        slidesField.style.transform = `translateX(-${offset}px)`;

		        if (slideIndex == slides.length-1) {
			        slideIndex = 0;
		        } else {
			        slideIndex++;
		        }
                changeNavTab(slideIndex, tabs);
	        });
        })

        prev.forEach(e => {
            e.addEventListener("click", () => {
		        if (offset == 0) {
			        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
		        } else {
			        offset -= +width.slice(0, width.length - 2);
		        }

		        slidesField.style.transform = `translateX(-${offset}px)`;

		        if (slideIndex == 0) {
			        slideIndex = slides.length-1;
		        } else {
			        slideIndex--;
		        }
                changeNavTab(slideIndex, tabs);
                console.log(slideIndex);
	        });
        });
        console.log("Hello world");

        function nextSlide() {
            if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += +width.slice(0, width.length - 2);
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == slides.length-1) {
                slideIndex = 0;
            } else {
                slideIndex++;
            }
            changeNavTab(slideIndex, tabs);
        }

        function prevSlide() {
            if (offset == 0) {
                offset = +width.slice(0, width.length - 2) * (slides.length - 1);
            } else {
                offset -= +width.slice(0, width.length - 2);
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == 0) {
                slideIndex = slides.length-1;
            } else {
                slideIndex--;
            }
            changeNavTab(slideIndex, tabs);
            console.log(slideIndex);
        }

        let x;
        slideWrapper.addEventListener('touchstart', e => x = e.changedTouches[0].clientX);
        slideWrapper.addEventListener('touchend', e => {
            if(e.changedTouches[0].clientX - x < -50) {
                console.log("move next");
                nextSlide();
            } else if(e.changedTouches[0].clientX - x > 50) {
                console.log("move prev");
                prevSlide();
            }
        });
    }
});