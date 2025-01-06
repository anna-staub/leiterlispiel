# Persönlicher Fork eines gemeinsam entwickelten Spiels 

Dies ist ein Fork, um in Einzelarbeit am gemeinsam entwickelten Spiel weiter zu arbeiten.<br>
Das originale Repository des gemeinsamen Projektes ist auf [GitLab](https://gitlab.com/yxaw/front-projekt) zu finden.<br>
Autorinnen: Yara Wagner, Anna Staub, Morena Sager<br>
Dozierende: Marc Iten, Elham Müller<br>
Zeitraum des Gruppenprojektes: 12.09.2022 - 31.05.2023<br>

## Link zum Spiel

[anna-staub.github.io/leiterlispiel](https://anna-staub.github.io/leiterlispiel/)

## Projektidee

Wir verfolgen das Ziel, ein Leiterspiel zu programmieren. Das Spielfeld soll aus hundert Feldern bestehen. Dabei ist das erste Feld gleichzeitig auch das Startfeld und das letzte Feld das Zielfeld. Im Spiel sind die nummerierten Spielfelder mit Leitern verbunden, die man je nachdem hochklettern kann, um den Weg abzukürzen, oder runterklettern muss, um somit einen Teil des Weges erneut zurückzulegen. Mit einem Würfel wird bestimmt, wie weit die Spielfigur fahren darf. Würfelt man die Zahl sechs, darf man einen zusätzlichen Zug ausführen. Der Spieler, der als erstes das Zielfeld erreicht gewinnt.

## Projektmanagement

Die Planung des Projektes ist im Ordner documents einsehbar.<br>
Dazu gehört:

- Projektstrukturplan (PSP)
- Zeitbudget, Zeitplan und Meilensteinplanung

Die Kommunikation im Team findet über Signal und Webex statt, die Kommunikation mit den Dozierenden über E-Mail.<br>
Der in den PDF-Files aktuelle Stand ist verbindlich, Änderungen müssen den Dozierenden mitgeteilt werden. 

## Branch-Management 

### main

Master, enthält funktionierende Zustände des Projekts <br>
Der Ordner documents beinhaltet zugehörige Dokumentationen

### abgabe-prototyp

Branch zur Abgabe des Prototyps und allen zugehörigen assets am Ende des HS22. 

### abgabe-projekt

Branch zur Abgabe des fertigen Projekts mit allen zugehörigen Assets am Ende des FS23

### develop

work-in-progress 

### develop_with_api

work-in-progress mit Einbindung Serverkommunikation. Momentan on hold.

### develop_with_dragndrop

work-in-progress von Spielfigur per Drag & Drop platzieren. Momentan on hold.


## Coding guidelines
Bezeichnungen werden deutsch geschrieben. <br>
Properties von Klassen wo immer möglich privat. <br>
Public Variablen, Methoden sowie Funktionen werden in camelCase geschrieben. <br>
Private Variablen und Methoden werden ebenfalls in camelCase geschrieben, beginnen aber zusätzlich mit einem #. <br>
Klassenbezeichnungen werden in PascalCase geschrieben. <br>
Konstanten werden in Grossbuchstaben geschrieben. <br>
Strings werden in single quotes geschrieben.
