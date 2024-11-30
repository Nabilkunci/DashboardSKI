// Menangani logout
function handleLogout() {
    // Simpan status logout ke sessionStorage
    sessionStorage.setItem('logoutSuccess', 'true');

    // Redirect ke halaman login
    window.location.href = "index.html";
}
    // Update Tanggal
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = today.toLocaleDateString('id-ID', options);
    }

    // Fetch Waktu Salat
    const prayerTimesElement = document.getElementById('prayer-times');
    const fetchPrayerTimes = async () => {
        if (prayerTimesElement) {
            try {
                const latitude = -6.2088; // Jakarta
                const longitude = 106.8456; // Jakarta
                const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`);
                const data = await response.json();

                const timings = data.data.timings;
                const prayerTimes = [
                    { name: "Subuh", time: timings.Fajr },
                    { name: "Dhuhr", time: timings.Dhuhr },
                    { name: "Ashar", time: timings.Asr },
                    { name: "Maghrib", time: timings.Maghrib },
                    { name: "Isha", time: timings.Isha },
                ];

                const now = new Date();
                const currentMinutes = now.getHours() * 60 + now.getMinutes();

                const upcomingPrayer = prayerTimes.find(prayer => {
                    const [hours, minutes] = prayer.time.split(':').map(Number);
                    const prayerMinutes = hours * 60 + minutes;
                    return prayerMinutes > currentMinutes;
                });

                if (upcomingPrayer) {
                    prayerTimesElement.innerHTML = `
                        <li class="text-lg font-bold">
                            Waktu salat berikutnya: 
                            <span class="text-green-800">${upcomingPrayer.name}</span>
                        </li>
                        <li>
                            Pukul: <span class="text-gray-800">${upcomingPrayer.time}</span>
                        </li>
                    `;
                } else {
                    prayerTimesElement.innerHTML = `
                        <li class="text-lg font-bold text-gray-600">Semua waktu salat telah selesai hari ini.</li>
                    `;
                }
            } catch (error) {
                prayerTimesElement.innerHTML = '<li>Error fetching prayer times.</li>';
                console.error('Error fetching prayer times:', error);
            }
        }
    };

    fetchPrayerTimes();
    setInterval(fetchPrayerTimes, 60 * 1000);

    // Menampilkan data profil dari localStorage
    const username = localStorage.getItem("username");
    const profileImg = localStorage.getItem("profileImg");

    if (username) {
        const profileNamePreview = document.getElementById("profile-name-preview");
        if (profileNamePreview) profileNamePreview.innerText = username;
    }

    if (profileImg) {
        const profileImage = document.getElementById("profile-img");
        if (profileImage) profileImage.src = profileImg;
    }

   