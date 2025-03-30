function updateCard() {
    // Pobierz dane z pól
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const pesel = document.getElementById('pesel').value;
    const birthdate = document.getElementById('birthdate').value;

    // Wyświetl dane na karcie
    document.getElementById('cardName').textContent = name;
    document.getElementById('cardSurname').textContent = surname;
    document.getElementById('cardPesel').textContent = pesel;
    document.getElementById('cardBirthdate').textContent = birthdate;

    // Przetwarzanie zdjęcia
    const photoInput = document.getElementById('photo');
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('photoCanvas');
                const ctx = canvas.getContext('2d');
                
                // Rysuj zdjęcie na canvasie
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                // Pobierz dane obrazu i zmień na czarno-białe
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b; // Formuła luminancji
                    data[i] = gray;     // Czerwony
                    data[i + 1] = gray; // Zielony
                    data[i + 2] = gray; // Niebieski
                }
                ctx.putImageData(imageData, 0, 0);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(photoInput.files[0]);
    }
}