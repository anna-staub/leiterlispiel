// Komponente Panel importieren
import Panel from './Panel.js';

// Komponente Profile exportieren
// Der Komponente wird die Property animal als Parameter übergeben, auf die dadurch zugegriffen werden kann.
export default function Profile({ animal }) {
  // Inhalt der Komponente Profile
  // Hier werden die Komponenten Header, Avater, Panel und Description in der Komponente Profile verschachtelt.
  return (
    <section className='box'>
        <Header animal={animal} />
        <Avatar animal={animal} />
        <Panel>
            <Description animal={animal} />
        </Panel>
    </section>
  )
}

// Definieren der Komponente Header
// Hier wird der Wert von animal.name in ein <h1>-Tag geschrieben.
function Header({ animal }) {
  return <h1>{animal.name}</h1>;
}

// Definieren der Komponente Avatar
// Hier werden dem <img>-Tag Props für das Bild mitgegeben.
function Avatar({ animal }) {
  return (
    <img
      className="avatar"
      src={animal.imageId}
      alt={animal.name}
      height={100}
    />
  );
}

// Definieren der Komponente Description
// Hier wird der Wert von animal.description in ein <p>-Tag geschrieben.
function Description({ animal }) {
    return <p>{animal.description}</p>;
}