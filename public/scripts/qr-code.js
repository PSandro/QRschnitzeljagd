const showQRCode = () => {
    new QRious({
        element: document.getElementById('qr-code'),
        value: window.location.toString(),
        size: Math.min(window.innerHeight / 2, window.innerWidth / 2)
    });
};

if (document.readyState !== 'completed') {
    window.addEventListener('load', () => showQRCode());
} else {
    showQRCode();
}

window.addEventListener('resize', () => showQRCode());