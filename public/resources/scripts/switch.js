document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.getElementById('switch');
    let enabled = false;

    button.addEventListener('click', () => {
        if (enabled === true) {
            enabled = false;
            
            document.getElementById('search').style.display = 'block';
            document.getElementById('fs').style.display = 'none';

            button.classList.remove('enabled');
            button.style.backgroundColor = 'rgb(255 255 255 / 84%)';
            button.innerHTML = 'OFF';
        } else if (enabled === false) {
            enabled = true;

            document.getElementById('search').style.display = 'none';
            document.getElementById('fs').style.display = 'block';

            button.classList.add('enabled');
            button.style.backgroundColor = 'rgb(146 146 146)';
            button.innerHTML = 'ON';
        }
    });
});