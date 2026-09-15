
/* -----------------------------------------
   MỞ THIỆP + PHÁT NHẠC NGẪU NHIÊN
   ----------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const openButton =
            document.getElementById(
                "openInvitation"
            );

        const openingScreen =
            document.getElementById(
                "opening-screen"
            );

        const music =
            document.getElementById(
                "backgroundMusic"
            );


        if (!openButton) {

            console.error(
                "Không tìm thấy nút MỞ THIỆP"
            );

            return;
        }


        if (!music) {

            console.error(
                "Không tìm thấy trình phát nhạc"
            );

            return;
        }


        openButton.addEventListener(
            "click",
            function () {

                console.log(
                    "Đã bấm MỞ THIỆP"
                );


                /* =========================
                   DANH SÁCH NHẠC
                   ========================= */

                const musicList = [

                    "music/A.mp3",
                    "music/B.mp3",
                    "music/C.mp3",
                    "music/D.mp3"

                ];


                /* =========================
                   CHỌN NGẪU NHIÊN
                   ========================= */

                const randomIndex =
                    Math.floor(
                        Math.random() *
                        musicList.length
                    );


                const selectedMusic =
                    musicList[randomIndex];


                console.log(
                    "Bài nhạc được chọn:",
                    selectedMusic
                );


                /* =========================
                   GÁN BÀI NHẠC
                   ========================= */

                music.src =
                    selectedMusic;


                music.load();


                /* =========================
                   MỞ THIỆP
                   ========================= */

                openingScreen.classList.add(
                    "hide"
                );


                /* =========================
                   PHÁT NHẠC
                   ========================= */

                music.play()
                    .then(function () {

                        console.log(
                            "Nhạc đã bắt đầu phát"
                        );

                    })
                    .catch(function (error) {

                        console.error(
                            "Không thể phát nhạc:",
                            error
                        );

                    });

            }
        );

    }
);
/* =========================================
   COUNTDOWN
   ========================================= */

const graduationDate = new Date("September 20, 2026 08:30:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = graduationDate - now;

    if (distance <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);
/* =========================================
   RSVP FORM
   ========================================= */

const rsvpForm =
    document.getElementById("rsvpForm");

const rsvpSuccess =
    document.getElementById("rsvpSuccess");

const guestCountGroup =
    document.getElementById("guestCountGroup");


/* -----------------------------------------
   HIỂN THỊ / ẨN SỐ NGƯỜI
   ----------------------------------------- */

const attendanceInputs =
    document.querySelectorAll(
        'input[name="attendance"]'
    );


attendanceInputs.forEach(function (input) {

    input.addEventListener("change", function () {

        if (this.value === "Có thể tham dự") {

            guestCountGroup.style.display = "block";

        }
        else {

            guestCountGroup.style.display = "none";

            document.getElementById("guestCount").value = "0";

        }

    });

});


/* -----------------------------------------
   RSVP
   ----------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {

    const rsvpForm = document.getElementById("rsvpForm");
    const rsvpSuccess = document.getElementById("rsvpSuccess");
    const guestCountGroup = document.getElementById("guestCountGroup");
    const guestCount = document.getElementById("guestCount");

    if (!rsvpForm) {
        console.error("Không tìm thấy rsvpForm");
        return;
    }

    if (!rsvpSuccess) {
        console.error("Không tìm thấy rsvpSuccess");
        return;
    }

    console.log("RSVP đã được tải");


    /* -----------------------------------------
       CHỌN CÓ / KHÔNG THAM DỰ
       ----------------------------------------- */

    const attendanceRadios =
        document.querySelectorAll(
            'input[name="attendance"]'
        );

    attendanceRadios.forEach(function (radio) {

        radio.addEventListener("change", function () {

            if (this.value === "Không thể tham dự") {

                guestCountGroup.style.display = "none";

                guestCount.value = "0";

            } else {

                guestCountGroup.style.display = "block";

                guestCount.value = "1";

            }

        });

    });


    /* -----------------------------------------
       GỬI RSVP
       ----------------------------------------- */

    rsvpForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            console.log("Đã bấm XÁC NHẬN");


            /* Họ tên */

            const guestName =
                document
                    .getElementById("guestName")
                    .value
                    .trim();


            /* Người tham dự */

            const attendance =
                document.querySelector(
                    'input[name="attendance"]:checked'
                );


            /* Kiểm tra họ tên */

            if (!guestName) {

                alert(
                    "Vui lòng nhập họ và tên."
                );

                return;
            }


            /* Kiểm tra lựa chọn */

            if (!attendance) {

                alert(
                    "Vui lòng chọn bạn có thể tham dự hay không."
                );

                return;
            }


            /* Nút gửi */

            const submitButton =
                rsvpForm.querySelector(
                    ".rsvp-button"
                );


            submitButton.disabled = true;

            submitButton.textContent =
                "ĐANG GỬI...";


            /* -----------------------------------------
               TẠO FORM TẠM ĐỂ GỬI GOOGLE SHEETS
               ----------------------------------------- */

            const sendForm =
                document.createElement("form");

            sendForm.method = "POST";

            sendForm.action =
                rsvpForm.action;

            sendForm.target =
                "rsvpFrame";

            sendForm.style.display = "none";


            /* Lấy dữ liệu từ form */

            const formData =
                new FormData(rsvpForm);


            formData.forEach(
                function (value, key) {

                    const input =
                        document.createElement("input");

                    input.type = "hidden";

                    input.name = key;

                    input.value = value;

                    sendForm.appendChild(input);

                }
            );


            /* Đưa form tạm vào trang */

            document.body.appendChild(
                sendForm
            );


            /* Gửi đến Google Apps Script */

            sendForm.submit();


            /* Xóa form tạm */

            setTimeout(
                function () {

                    sendForm.remove();

                },
                2000
            );


            /* -----------------------------------------
               HIỆN THÔNG BÁO THÀNH CÔNG
               ----------------------------------------- */

            setTimeout(
                function () {

                    console.log(
                        "Hiện thông báo thành công"
                    );


                    /* Ẩn form */

                    rsvpForm.style.display =
                        "none";


                    /* Hiện thông báo */

                    rsvpSuccess.classList.add(
                        "show"
                    );


                    /* Cuộn tới thông báo */

                    rsvpSuccess.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                },
                1000
            );

        }
    );

});
/* -----------------------------------------
   CÁ NHÂN HÓA THIỆP THEO KHÁCH MỜI
   ----------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {

    const guestNameDisplay =
        document.getElementById("guestNameDisplay");

    const guestCodeInput =
        document.getElementById("guestCode");

    if (!guestNameDisplay) {
        return;
    }


    // Lấy GuestCode từ URL
    const params =
        new URLSearchParams(window.location.search);

    const guestCode =
        params.get("guest");


    console.log("GuestCode:", guestCode);


    // Nếu không có mã khách
    if (!guestCode) {

        guestNameDisplay.textContent = "bạn";

        return;
    }


    const guests = {

        "1": "Trần Thị Linh Chi",
        "2": "Bùi Ngọc Ánh",
        "3": "Vũ Ngọc Ánh",
        "4": "Hoa Trần",
        "5": "Trần Ngọc",
        "6": "Nhị tỷ",
        "7": "Đại tỷ",
        "8": "Bảo mẫu P.Anh",
        "9": "Bé Mỹ Vân",
        "10": "Bé Đinh Hà",
        "11": "Bé Tiên",
        "12": "Bé Việt Đức",
        "13": "Bé Quỳnh",
        "14": "Quốc Cường",
        "15": "Anh Hoàng",
        "16": "Bé Hoàng Diệu"

    };


    // Tìm tên khách
    const guestName =
        guests[guestCode];


    if (guestName) {

        guestNameDisplay.textContent =
            guestName;

        // Gán GuestCode vào form RSVP
        if (guestCodeInput) {

            guestCodeInput.value =
                guestCode;

        }

    } else {

        guestNameDisplay.textContent =
            "bạn";

    }

});
document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.querySelector('.film-viewport');
    if (!viewport) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // --- XỬ LÝ CHO MÁY TÍNH (MOUSE EVENTS) ---
    viewport.addEventListener('mousedown', (e) => {
        isDown = true;
        viewport.classList.add('dragging');
        startX = e.pageX - viewport.offsetLeft;
        scrollLeft = viewport.scrollLeft;
    });

    viewport.addEventListener('mouseleave', () => {
        isDown = false;
        viewport.classList.remove('dragging');
    });

    viewport.addEventListener('mouseup', () => {
        isDown = false;
        viewport.classList.remove('dragging');
    });

    viewport.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault(); // Tránh cuộn trang đứng khi đang kéo ngang trên desktop
        const x = e.pageX - viewport.offsetLeft;
        const walk = (x - startX) * 1.5; // Tốc độ cuộn chuột
        viewport.scrollLeft = scrollLeft - walk;
    });

    // --- HỖ TRỢ CUỘN BẰNG BÁNH XE CHUỘT (SCROLL WHEEL) TRÊN DESKTOP ---
    viewport.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            viewport.scrollLeft += e.deltaY; // Cuộn lăn chuột dọc thành cuộn ngang
        }
    }, { passive: false });
});
/* =========================================================
   PHÁO HOA GIẤY - CONFETTI
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const confettiContainer =
            document.getElementById(
                "confetti-container"
            );


        if (!confettiContainer) {

            return;

        }


        const colors = [
            "blue",
            "white",
            "gold"
        ];


        function createConfetti() {

            const confetti =
                document.createElement(
                    "span"
                );


            confetti.classList.add(
                "confetti"
            );


            /* Chọn màu ngẫu nhiên */

            const color =
                colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
                ];


            confetti.classList.add(
                "confetti-" + color
            );


            /* Vị trí ngang */

            confetti.style.left =
                Math.random() * 100 + "%";


            /* Độ nghiêng */

            confetti.style.setProperty(
                "--rotation",
                Math.floor(
                    Math.random() * 720 - 360
                ) + "deg"
            );


            /* Độ bay ngang */

            confetti.style.setProperty(
                "--sway",
                Math.floor(
                    Math.random() * 180 - 90
                ) + "px"
            );


            /* Kích thước ngẫu nhiên */

            const size =
                Math.random() * 5 + 5;


            confetti.style.width =
                size + "px";


            confetti.style.height =
                size * 1.6 + "px";


            /* Tốc độ rơi */

            const duration =
                Math.random() * 4 + 5;


            confetti.style.animationDuration =
                duration + "s";


            /* Độ trễ nhẹ */

            confetti.style.animationDelay =
                Math.random() * 0.5 + "s";


            confettiContainer.appendChild(
                confetti
            );


            /* Xóa sau khi animation kết thúc */

            setTimeout(
                function () {

                    confetti.remove();

                },
                (duration + 1) * 1000
            );

        }


        /* Tạo một đợt confetti */

        function createConfettiBurst(
            amount
        ) {

            for (
                let i = 0;
                i < amount;
                i++
            ) {

                setTimeout(
                    createConfetti,
                    i * 35
                );

            }

        }


        /* Pháo giấy xuất hiện khi mở thiệp */

        const openButton =
            document.getElementById(
                "openInvitation"
            );


        if (openButton) {

            openButton.addEventListener(
                "click",
                function () {

                    createConfettiBurst(45);

                }
            );

        }


        /* Sau đó thỉnh thoảng rơi nhẹ */

        setInterval(
            function () {

                createConfettiBurst(8);

            },
            6500
        );

    }
);
/* =========================================================
   TỰ ĐỘNG CUỘN TRANG (ĐÃ SỬA LỖI)
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    let autoScroll = false;
    let userInteracting = false;
    let resumeTimer = null;

    // Tăng tốc độ lên tối thiểu 0.8 đến 1 để tránh trình duyệt làm tròn về 0
    const scrollSpeed = 0.8;

    /* -----------------------------------------
       HÀM CUỘN
       ----------------------------------------- */
    function performAutoScroll() {
        if (!autoScroll || userInteracting) return;

        const currentPosition = window.scrollY || window.pageYOffset;
        const maxPosition = document.documentElement.scrollHeight - window.innerHeight;

        /* Đã tới cuối trang */
        if (currentPosition >= maxPosition - 2) {
            autoScroll = false;
            return;
        }

        window.scrollBy(0, scrollSpeed);
    }

    /* -----------------------------------------
       VÒNG LẶP CUỘN
       ----------------------------------------- */
    function autoScrollLoop() {
        performAutoScroll();
        requestAnimationFrame(autoScrollLoop);
    }

    autoScrollLoop();

    /* -----------------------------------------
       NGƯỜI DÙNG TƯƠNG TÁC (TẠM DỪNG CUỘN)
       ----------------------------------------- */
    function pauseAutoScroll() {
        // Chỉ tạm dừng nếu tính năng autoScroll đã thực sự được BẬT
        if (!autoScroll) return;

        userInteracting = true;
        clearTimeout(resumeTimer);

        // Sau 3 giây không tương tác sẽ tự cuộn lại
        resumeTimer = setTimeout(function () {
            userInteracting = false;
        }, 3000);
    }

    /* Đăng ký các sự kiện tương tác */
    window.addEventListener("wheel", pauseAutoScroll, { passive: true });
    window.addEventListener("keydown", pauseAutoScroll);
    window.addEventListener("touchstart", pauseAutoScroll, { passive: true });
    window.addEventListener("touchmove", pauseAutoScroll, { passive: true });
    window.addEventListener("mousedown", pauseAutoScroll);

    /* -----------------------------------------
       BẮT ĐẦU SAU KHI MỞ THIỆP
       ----------------------------------------- */
    const openButton = document.getElementById("openInvitation");

    if (openButton) {
        openButton.addEventListener("click", function () {
            // Chờ 1.5 giây sau khi mở thiệp mới bắt đầu bật tự động cuộn
            setTimeout(function () {
                userInteracting = false; // Reset cờ tương tác
                autoScroll = true;       // Kích hoạt cuộn
            }, 1500);
        });
    }
});