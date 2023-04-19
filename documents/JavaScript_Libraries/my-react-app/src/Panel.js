// vordefinierter Hook useState importieren
import { useState } from 'react';

// Komponente Panel exportieren
export default function Panel({ children }) {
    const [open, setOpen] = useState(false); // open = Variable, setOpen = damit kann man den Wert der Variable ändern, useState = vordefinierter Hook, false = Default-Wert der Variable open
    // Inhalt der Komponente Panel
    // Wenn der Button angeklickt wird, wird die Variable 'open' auf den gegenteiligen Wert (true bzw. false) gesetzt.
    // Wenn die Variable 'open' den Wert true hat, wird im Button der Text 'Beschreibung ausblenden' angezeigt, bei false 'Beschreibung anzeigen'.
    // Wenn die Variable 'open' den Wert true hat, werden die in der Komponente enthaltenen children angezeigt.
    return (
        <section className="panel">
            <button onClick={() => setOpen(!open)}>
                {open ? 'Beschreibung ausblenden' : 'Beschreibung anzeigen'}
            </button>
            {open && children}
        </section>
    );
}