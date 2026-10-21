# Credit Card Mask

Wenn du etwas kaufst, wirst du normalerweise gefragt, ob deine Kreditkartennummer, deine Telefonnummer oder die Antwort auf deine geheimste Sicherheitsfrage noch korrekt sind. Da dir jedoch jemand über die Schulter schauen könnte, möchtest du nicht, dass diese Daten auf dem Bildschirm angezeigt werden. Deshalb maskieren wir sie.

Deine Aufgabe ist es, eine Funktion namens `maskify` zu schreiben, die alle Zeichen bis auf die letzten vier durch ein „#“-Zeichen ersetzt. Beispiele (Eingabe –> Ausgabe):

"4556364607935616" --> "############5616"
"64607935616" --> "#######5616"
"1" --> "1"
"" --> ""
What was the name of your first pet?

"Skippy" --> "##ippy"
"Nananananananananananananananana Batman!" --> "####################################man!"

node --watch script.js
