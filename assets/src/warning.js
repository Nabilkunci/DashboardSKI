// Menangani peristiwa copy
document.addEventListener('copy', function (e) {
    e.preventDefault();
    showWarningMessage();
});

// Menangani peristiwa cut (menyalin dan menghapus)
document.addEventListener('cut', function (e) {
    e.preventDefault();
    showWarningMessage();
});

// Menangani klik kanan (context menu)
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    showWarningMessage();
});

// Fungsi untuk menampilkan pesan peringatan
function showWarningMessage() {
    const warningMessage = document.getElementById('warning-message');
    warningMessage.style.display = 'block';

    // Menyembunyikan pesan setelah 2 detik
    setTimeout(function() {
        warningMessage.style.display = 'none';
    }, 2000);
}

// Blokir pintasan keyboard untuk membuka DevTools (Ctrl+Shift+I, F12, Ctrl+Shift+J, atau Ctrl+U)
document.addEventListener('keydown', function (e) {
    // Cek untuk pintasan yang sering digunakan untuk membuka DevTools
    if (
        (e.ctrlKey && e.shiftKey && e.key === 'I') || // Ctrl+Shift+I
        (e.key === 'F12') || // F12
        (e.ctrlKey && e.shiftKey && e.key === 'J') || // Ctrl+Shift+J
        (e.ctrlKey && e.key === 'U') // Ctrl+U
    ) {
        e.preventDefault(); // Blokir tindakan default
        showWarningMessage(); // Tampilkan pesan peringatan
    }
});