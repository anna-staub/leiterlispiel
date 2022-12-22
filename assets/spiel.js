// Spielfeld erstellen
class Spiel {
    #spielfeld = new Spielfeld();
    #spieler1 = new Spieler();
    #spieler2 = new Spieler();
  }
  
  new Spiel();


  /* macht das Sinn, diese Instanzen privat zu erstellen? 
  entweder einen getter einbauen, damit die Instanz gelesen werden kann
  oder public. So kann man für den Spielerwechsel nicht auf die Instanz zugreifen
  */