
// audio time calculator
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}

// set audio time and volume
const setTime = (audio, player) => {
    audio.addEventListener("loadeddata", () => {
        player.querySelector(".time .length").textContent = getTimeCodeFromNum(audio.duration);
        audio.volume = .75;
    });
}

const setTimeLine = (audio, player) => {
    const timeline = player.querySelector(".timeline");
    // const timelineWidth = window.getComputedStyle(timeline).width;
    timeline.addEventListener("click", e => {
        const timelineWidth = window.getComputedStyle(timeline).width;
        const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
        audio.currentTime = timeToSeek;
    });
}

// set volume
const setVolume = (audio, player) => {
    const volumeSlider = player.querySelector(".volume-container .volume-slider");
    const volumeBtn = player.querySelector(".volume-container .volume-button");
    volumeBtn.addEventListener("click", () => {
        volumeSlider.classList.toggle("active");
    })

    volumeSlider.addEventListener('click', e => {
        const sliderHeight = window.getComputedStyle(volumeSlider).height;
        const newVolume = e.offsetY / parseInt(sliderHeight);
        audio.volume = newVolume;
        player.querySelector(".volume-container .volume-percentage").style.height = (newVolume * 100) + '%';
    });
}

// mute unmute volume
// const muteUnmute = (audio, player) => {
//     const volumeBtn = player.querySelector(".volume-container i");
//     volumeBtn.addEventListener("click", () => {
//         if (audio.muted) {
//             audio.muted = false;
//             // volumeBtn.textContent = "volume_up";
//             volumeBtn.classList.add("ti-volume")
//             volumeBtn.classList.remove("ti-volume-off")
//         } else {
//             audio.muted = true;
//             // volumeBtn.textContent = "volume_off";
//             volumeBtn.classList.add("ti-volume-off")
//             volumeBtn.classList.remove("ti-volume")
//         }
//     });
// }

// update timeline 
const updateTimeline = (audio, player) => {
    setInterval(() => {
        const progressBar = player.querySelector(".progress");
        progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
        player.querySelector(".time .current").textContent = getTimeCodeFromNum(
            audio.currentTime
        );
    }, 500)
}

// toggle between playing and pausing
const togglePlay = (audio, player) => {
    const playBtn = player.querySelector(".play-audio .toggle-play");
    let playIcon = playBtn.querySelector('i');

    playBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playIcon.classList.remove("ti-player-play")
            playIcon.classList.add("ti-player-pause")
        } else {
            audio.pause();
            playIcon.classList.remove("ti-player-pause")
            playIcon.classList.add("ti-player-play")
        }
    });
}




const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
	isAutoPlay = true,
	startX,
	startScrollLeft,
	timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
	.slice(-cardPerView)
	.reverse()
	.forEach((card) => {
		carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
	});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
	carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
	});
});

const dragStart = (e) => {
	isDragging = true;
	carousel.classList.add("dragging");
	// Records the initial cursor and scroll position of the carousel
	startX = e.pageX;
	startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
	if (!isDragging) return; // if isDragging is false return from here
	// Updates the scroll position of the carousel based on the cursor movement
	carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
	isDragging = false;
	carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
	// If the carousel is at the beginning, scroll to the end
	if (carousel.scrollLeft === 0) {
		carousel.classList.add("no-transition");
		carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
		carousel.classList.remove("no-transition");
	}
	// If the carousel is at the end, scroll to the beginning
	else if (
		Math.ceil(carousel.scrollLeft) ===
		carousel.scrollWidth - carousel.offsetWidth
	) {
		carousel.classList.add("no-transition");
		carousel.scrollLeft = carousel.offsetWidth;
		carousel.classList.remove("no-transition");
	}

	// Clear existing timeout & start autoplay if mouse is not hovering over carousel
	clearTimeout(timeoutId);
	if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
	if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
	// Autoplay the carousel after every 2500 ms
	timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);











const playAudio = (audio, audioPlayer) => {
    // // set initial audio
    // const audio = new Audio('assets/music/01.mp3'); // add audio here 

    // call set time and volume function 
    setTime(audio, audioPlayer);
    // call set Timeline function
    setTimeLine(audio, audioPlayer);
    // call set volume function
    setVolume(audio, audioPlayer);
    // call mute unmute function
    // muteUnmute(audio, audioPlayer);
    // call update Timeline function
    updateTimeline(audio, audioPlayer);
    // call toggle between playing and pausing
    togglePlay(audio, audioPlayer)
}

// set audio 
const setAudio = () => {
    const audio = new Audio('assets/music/01.mp3'); // add audio here 
    return audio
}


const audioPlayer = document.querySelectorAll(".audio-player");
if (audioPlayer) {
    audioPlayer.forEach(player => {
        const audio = setAudio()
        playAudio(audio, player)
    })
}