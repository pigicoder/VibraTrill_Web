document.addEventListener('DOMContentLoaded', function() {
    const notes = document.querySelectorAll('.note');
    const noteArea = document.querySelector('.note-area');
    const radius = 200; // Raggio più grande per disporre le note più distanziate

    // Funzione per disporre le note in cerchio attorno al centro, lasciando uno spazio vuoto al centro per la nota selezionata
    function positionNotesInCircleWithEmptySpace(centerNote) {
        const areaCenterX = noteArea.offsetWidth / 2;
        const areaCenterY = noteArea.offsetHeight / 2;

        // Posiziona la nota selezionata al centro della `note-area`
        centerNote.style.left = `${areaCenterX - centerNote.offsetWidth / 2}px`;
        centerNote.style.top = `${areaCenterY - centerNote.offsetHeight / 2}px`;

        // Disposizione delle altre note con uno spazio vuoto (come se ci fosse una nota in più)
        const otherNotes = Array.from(notes).filter(note => note !== centerNote);
        const numPositions = otherNotes.length + 1; // Aggiungi uno per lasciare uno spazio vuoto
        let positionIndex = 0;

        otherNotes.forEach((note, index) => {
            // Salta una posizione per lasciare uno spazio vuoto
            if (positionIndex === Math.floor(numPositions / 2)) {
                positionIndex++;
            }

            // Calcola l'angolo per ciascuna nota
            const angle = (positionIndex / numPositions) * 2 * Math.PI;
            const x = areaCenterX + radius * Math.cos(angle) - note.offsetWidth / 2;
            const y = areaCenterY + radius * Math.sin(angle) - note.offsetHeight / 2;
            note.style.left = `${x}px`;
            note.style.top = `${y}px`;

            positionIndex++;
        });
    }

    // Funzione per traslare tutte le note verso il centro dello schermo mantenendo la disposizione attuale
    function translateAllNotesToScreenCenter() {
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        // Calcola il centro attuale di tutte le note
        let totalX = 0;
        let totalY = 0;

        notes.forEach(note => {
            totalX += parseFloat(note.style.left) + note.offsetWidth / 2;
            totalY += parseFloat(note.style.top) + note.offsetHeight / 2;
        });

        const averageX = totalX / notes.length;
        const averageY = totalY / notes.length;

        // Calcola la traslazione necessaria per portare il gruppo di note al centro dello schermo
        const translateX = screenCenterX - averageX;
        const translateY = screenCenterY - averageY;

        // Applica la traslazione a tutte le note
        notes.forEach(note => {
            const newX = parseFloat(note.style.left) + translateX;
            const newY = parseFloat(note.style.top) + translateY;
            note.style.left = `${newX}px`;
            note.style.top = `${newY}px`;
        });
    }

    // Event listener per il passaggio del mouse sulle note
    notes.forEach(note => {
        note.addEventListener('mouseenter', () => {
            // Dispone tutte le note in cerchio attorno al centro della `note-area`, con la nota selezionata al centro
            positionNotesInCircleWithEmptySpace(note);

            // Dopo un breve ritardo, trasla tutte le note verso il centro dello schermo
            setTimeout(translateAllNotesToScreenCenter, 500);
        });
    });

    // Funzione per disporre le note inizialmente in cerchio al caricamento della pagina
    function positionNotesInInitialCircle() {
        const centerX = noteArea.offsetWidth / 2;
        const centerY = noteArea.offsetHeight / 2;

        notes.forEach((note, index) => {
            const angle = (index / notes.length) * 2 * Math.PI; // Calcola l'angolo per ciascuna nota
            const x = centerX + radius * Math.cos(angle) - note.offsetWidth / 2;
            const y = centerY + radius * Math.sin(angle) - note.offsetHeight / 2;
            note.style.left = `${x}px`;
            note.style.top = `${y}px`;
        });
    }

    // Disporre le note inizialmente in cerchio al caricamento della pagina
    positionNotesInInitialCircle();
});
