// Komponente Profile importieren
import Profile from './Profile.js';

// Komponente App exportieren
export default function App() {
  // Inhalt der Komponente App
  // Da eine Komponente nur ein einziges Element zurückgeben kann, werden die Profile-Elemente in ein leeres parent-Tag gesteckt.
  // Die Komponente Profile enthält die Property animal, welche wiederum die Props imageId, name und description enthält.
  return (
    <>
      <Profile animal={{
        imageId: 'katze.jpeg',
        name: 'Katze',
        description: 'Die Katze hat vier Beine, einen runden Kopf, zwei kleine Ohren, Tasthaare an der Schnauze, einen Schwanz und weiches Fell. Katzen haben lange Eckzähne und ein Raubtiergebiss eines Fleischfressers. Sie werden 30 - 35 cm (Schulterhöhe) groß und 2 - 8 kg schwer.',
      }} />
      <Profile animal={{
        imageId: 'eidechse.jpg',
        name: 'Eidechse',
        description: 'Eidechsen gehören zu den Reptilien, den Kriechtieren. Sie haben einen länglichen Körper, der an eine Schlange erinnert. Allerdings besitzen sie vier Beine, mit denen sie schnell laufen können. Ihre Haut hat Schuppen.',
      }} />
      <Profile animal={{
        imageId: 'hund.png',
        name: 'Hund',
        description: 'Der Hund ist ein Säugetier. Er wird 20 bis 85 cm groß und wiegt meist zwischen einem und 70 Kilogramm, seine Lebenserwartung liegt bei sieben bis 18 Jahren.',
      }} />
    </>
  );
}