// Komponente Panel importieren
import Panel from './Panel.js';

// Komponente Profile exportieren
// Der Komponente wird die Property animal übergeben, auf deren Wert dadurch zugegriffen werden kann.
export default function Profile({ animal }) {
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
// Hier wird der  Wert der Property animal.name in ein <h1>-Tag geschrieben.
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
// Hier wird der Wert der Property animal.description in ein <p>-Tag geschrieben.
function Description({ animal }) {
    return <p>{animal.description}</p>;
}