document.addEventListener('keydown', handleShortcut);

function handleShortcut(event) {
    if (event.altKey) {
        switch (event.key) {
            case 'g':
                navigateTo("https://classroom.google.com");
                break;
            case 'c':
                navigateTo("https://samlidp.clever.com/saml-canvas/signon");
                break;
        }
    }
}

function navigateTo(url) {
    window.location.href = url;
}