function redirectToURL(url) {
    window.location.href = url;
  }

document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
      let elements = document.querySelectorAll(".fade");
      elements.forEach(function(element) {
        if (isElementInViewport(element)) {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }
      });
    });
    
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  });

$(document).ready(function() {

// Select the circle element
const $circleElement = $('.circle');
const $targetDiv = $('.target-div');

var currentScale = 0;
var currentAngle = 0;

// Create objects to track mouse position and custom cursor position
const mouse = { x: 0, y: 0 }; // Track current mouse position
const previousMouse = { x: 0, y: 0 }; // Store the previous mouse position
const circle = { x: 0, y: 0 }; // Track the circle position

// Update mouse position on the 'mousemove' event
$(window).on('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  $circleElement.css('display', 'block');
  // Reset the idle timer when mouse moves
  resetIdleTimer();
});

// Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
const speed = 0.37;

let idleTimeout;

// Function to reset the idle timer
const resetIdleTimer = () => {
  // Clear the previous timeout
  clearTimeout(idleTimeout);
  // Start a new timeout to hide the circle element after 2 seconds of inactivity
  idleTimeout = setTimeout(() => {
    // Hide the circle element after 2 seconds of inactivity
    $circleElement.css('display', 'none'); 
  }, 2000); // Adjust the time here (in milliseconds)
};
  

// Start animation
const tick = () => {

  // MOVE
  // Calculate circle movement based on mouse position and smoothing
  circle.x += (mouse.x - circle.x) * speed;
  circle.y += (mouse.y - circle.y) * speed;
  // Create a transformation string for cursor translation
  const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

  // SQUEEZE
  // 1. Calculate the change in mouse position (deltaMouse)
  const deltaMouseX = mouse.x - previousMouse.x;
  const deltaMouseY = mouse.y - previousMouse.y;
  // Update previous mouse position for the next frame
  previousMouse.x = mouse.x;
  previousMouse.y = mouse.y;
  // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
  const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150); 
  // 3. Convert mouse velocity to a value in the range [0, 0.5]
  const scaleValue = (mouseVelocity / 150) * 0.5;
  // 4. Smoothly update the current scale
  currentScale += (scaleValue - currentScale) * speed;
  // 5. Create a transformation string for scaling
  const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

  // ROTATE
  // 1. Calculate the angle using the atan2 function
  const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
  // 2. Check for a threshold to reduce shakiness at low mouse velocity
  if (mouseVelocity > 20) {
    currentAngle = angle;
  }
  // 3. Create a transformation string for rotation
  const rotateTransform = `rotate(${currentAngle}deg)`;

  // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
  $circleElement.css('transform', `${translateTransform} ${rotateTransform} ${scaleTransform}`);

  // Request the next frame to continue the animation
  // Check if the circle is hovering over the target div
  if (isCircleHoveringTargetDiv()) {
    // Fill up the circle when hovering over the target div
    $circleElement.addClass('filled');
  } else {
    // Remove the filled class if not hovering over the target div
    $circleElement.removeClass('filled');
  }

  // Request the next frame to continue the animation
  window.requestAnimationFrame(tick);
};

// Function to check if the circle is hovering over the target div
const isCircleHoveringTargetDiv = () => {
  const circleOffset = $circleElement.offset();
  const circleWidth = $circleElement.width();
  const circleHeight = $circleElement.height();
  const circleTop = circleOffset.top;
  const circleLeft = circleOffset.left;
  const circleBottom = circleTop + circleHeight;
  const circleRight = circleLeft + circleWidth;

  const targetOffset = $targetDiv.offset();
  const targetWidth = $targetDiv.width();
  const targetHeight = $targetDiv.height();
  const targetTop = targetOffset.top;
  const targetLeft = targetOffset.left;
  const targetBottom = targetTop + targetHeight;
  const targetRight = targetLeft + targetWidth;

  return (
    circleBottom >= targetTop &&
    circleTop <= targetBottom &&
    circleRight >= targetLeft &&
    circleLeft <= targetRight
  );
};

// Start the animation loop
tick();

    // Function to change language
    function changeLanguage(language) {
        const statusText = $('#status');
        const greetingtext = $('#greeting');
        const aboutText = $('#about-me');
        // Buttons
        const EM = $('#EM');
        const MVDC = $('#MVDC');

        // Experience section
        const HC = $('#HC');
        const YOE = $('#YOE');
        const CT = $('#CT');

        // Language section
        const ML = $('#ML');
        const MLD = $('#MLD');

        // Stack section
        const MS = $('#MS');
        const MSD = $('#MSD');

        // Services section
        const MSER = $('#MSER');
        const MSERD = $('#MSERD');
        const graphic_design = $('#graphic_design');
        const graphic_design_desc = $('#graphic_design_desc');
        const web_design = $('#web_design');
        const web_design_desc = $('#web_design_desc');
        const discord_bot = $('#discord_bot');
        const discord_bot_desc = $('#discord_bot_desc');

        // Rights section
        const rights = $('#rights')


        // Change image src
        const flagImage = $('#region');
        if (language === 'en') {
            flagImage.attr('src', './icons/flags/english.svg');
            flagImage.data('lang', 'en');

            statusText.text(`Available For Work`);
            greetingtext.text(`Hello, I Am`);
            aboutText.text(`A 20 y.o self-taught web, software developer from Klaipeda, Lithuania, with a passion for reverse engineering and crafting quality products for others to use.`);
            HC.text(`Happy clients`)
            YOE.text(`Years of experience`)
            CT.text(`Completed tasks`)
            ML.text(`My languages`)
            MLD.text(`With what languages do I work with the most and how frequently do i use them.`)
            MS.text(`My stacks`)
            MSD.text(`Commitment to staying updated with the latest design trends and techniques.`)
            MSER.text(`My services`)
            MSERD.text(`Formulating comprehensive strategies to meet your design goals and exceed expectations.`)
            rights.text(`@2024, All Rights Reserved`)
            graphic_design.text(`Graphic Design`)
            web_design.text(`Web Design`)
            discord_bot.text(`Discord Bot Development`)
            discord_bot_desc.text(`Crafting visually captivating and user-friendly discord bots for people to have fun.`)
            web_design_desc.text(`Crafting visually captivating and user-friendly websites for online success.`)
            graphic_design_desc.text(`Creating visually stunning designs that captivate and engage audiences.`)
          } else if (language === 'lt') {
            flagImage.attr('src', './icons/flags/lithuanian.svg');
            flagImage.data('lang', 'lt');

            statusText.text(`Gali dirbti`);
            greetingtext.text(`Sveiki, aš esu`);
            aboutText.text(`20 metu savamokslis svetainiu bei programu programuotojas is Klaipedos, su aistra analizuot kaip viskas veikia bei kurti programas, kurios palengvina kitiem kurti panasias programas.`);
            HC.text(`Patenkinti klientai`)
            YOE.text(`Metai patirties`)
            CT.text(`Užbaigti projektai`)
            ML.text(`Mano naudojamos kalbos`)
            MLD.text(`Su kuriomis programavimo kalbomis dirbu ir kiek dažnai.`)
            MS.text(`Mano įrankiai`)
            MSD.text(`Mano naudojamos programos, svetainės, kuriose matau naujausius "trendus", dizainus ir t.t`)
            MSER.text(`Mano paslaugos`)
            MSERD.text(`Šioje skiltyje galite pamatyti kokias paslaugas teikiu.`)
            rights.text(`@2024, Visos teisės saugomos`)
            graphic_design.text(`Grafikų dizainas`)
            web_design.text(`Svetainių dizainas`)
            discord_bot.text(`Discord Botų programavimas`)
            discord_bot_desc.text(`Discord botų programavimas jūsų serveriui pagal jūsų poreikius`)
            web_design_desc.text(`Patrauklus svetainės dizainas pagal jūsų poreikius`)
            graphic_design_desc.text(`Grafikos darbai, logotipai, reklamos, baneriai`)
          }

        // Save selected language to localStorage
        localStorage.setItem('language', language);
    }

    // Function to load language from localStorage on website load
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
        changeLanguage(storedLanguage);
    }

    // Event listener for flag click
    $('#region').click(function() {
        const selectedLanguage = $(this).data('lang');
        console.log(selectedLanguage)
        switch(selectedLanguage) {
            case "en": {
                changeLanguage("lt");
                break;
            }
            case "lt": {
                changeLanguage("en");
                break;
            }
        }
    });

    // Function to get local time in Lithuania
    function getLocalTimeInLithuania() {
        // Get the current UTC time
    var utcTime = new Date();

    // Set the offset for Lithuania time (GMT+3)
    var offset = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

    // Calculate the Lithuania time by adding the offset to the UTC time
    var lithuaniaTime = new Date(utcTime.getTime());

    return lithuaniaTime;
    }

    // Function to format time as HH:MM:SS
    function formatTime(time) {
        var hours = time.getHours().toString().padStart(2, '0');
        var minutes = time.getMinutes().toString().padStart(2, '0');
        var seconds = time.getSeconds().toString().padStart(2, '0');
        return hours + ":" + minutes + ":" + seconds;
    }

    // Function to update time every second
    function updateTime() {
        var localTimeInLithuania = getLocalTimeInLithuania();
        var formattedTime = formatTime(localTimeInLithuania);
        $("#localTime").text("Local Time ( GMT+3 ) " + formattedTime);
    }

    // Update time initially and then every second
    updateTime();
    setInterval(updateTime, 1000);

    $("#serviceBtn").click(function() {
        var targetElement = $("#services");
        if (targetElement.length) {
            $('html, body').animate({
                scrollTop: targetElement.offset().top
            }, 1000);
        }
    });

    $("#specificH3").each(function() {
        var $h3 = $(this);
        $h3.data("originalH3Text", $h3.text()); // Store original text for each button
    });

    $("#specificH3").click(function(){
        var $h3 = $(this)
        var originalText = $h3.data("originalH3Text");
        var newText = "Discord: Mangas";
        
        if ($(this).text() === newText) {
            $(this).text(originalText);
        } else {
            $(this).text(newText);
        }
    });

    $(".scrambleButton").each(function() {
        var $button = $(this);
        $button.data("originalText", $button.text()); // Store original text for each button
    });
    
    $(".scrambleButton").hover(function() {
        var $button = $(this);
        var originalText = $button.data("originalText");
        
        function scrambleText(text) {
            var scrambledText = "";
            var chars = text.split('');
            var symbols = "!@#$%^&*()1234567890";
            var len = chars.length;
            for (var i = 0; i < len; i++) {
                if (chars[i] === ' ') {
                    scrambledText += ' ';
                } else {
                    var randomIndex = Math.floor(Math.random() * symbols.length);
                    scrambledText += symbols[randomIndex];
                }
            }
            return scrambledText;
        }
        
        var animationInterval = setInterval(function() {
            var scrambled = scrambleText(originalText);
            $button.text(scrambled.substring(0, $button.text().length + 1)); // Incrementally add scrambled letters
        }, 50); // Scramble one letter every 50 milliseconds
        
        setTimeout(function() {
            clearInterval(animationInterval);
            $button.text(originalText);
        }, 500); // Restore original text after 500 milliseconds
    });
});