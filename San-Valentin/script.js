const message = document.querySelector('#message');
const buttons = document.querySelector('#buttons');
const noBtn = document.querySelector('.no');
const yesBtn = document.querySelector('.yes');

noBtn.addEventListener('click', () => {
    // Obtener dimensiones de la ventana y del botón
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Calcular posición aleatoria asegurando que el botón no salga de la pantalla
    const maxX = windowWidth - btnWidth;
    const maxY = windowHeight - btnHeight;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    // Aplicar nueva posición
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    
    // Mostrar el botón Sí
    yesBtn.style.display = 'block';
});

yesBtn.addEventListener('click', () => {
    message.innerHTML = 'TE AMO MIBIDA';
    buttons.style.display = 'none';
    message.style.fontSize = '32px';
    message.style.fontWeight = 'bold';
});