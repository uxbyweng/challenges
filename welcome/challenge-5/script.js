// Wer mag es?
// Du kennst wahrscheinlich das „Gefällt mir“-System von Facebook und anderen Seiten. Nutzer können Blogbeiträge, Bilder oder andere Inhalte mit „Gefällt mir“ markieren. Wir möchten den Text erstellen, der neben einem solchen Inhalt angezeigt werden soll.

// Implementiere eine Funktion, die ein Array mit den Namen der Personen entgegennimmt, denen ein Inhalt gefällt. Sie soll den Anzeigetext zurückgeben, wie in den folgenden Beispielen dargestellt:

// []                                -->  "no one likes this"
// ["Peter"]                         -->  "Peter likes this"
// ["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
// ["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
// ["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this

// Note: For 4 or more names, the number in “and 2 others” simply increases.

const usersWithLikes = ["Jacob", "Alex"];

function showHowManyUsersLikeThis(usersWithLikes) {
    console.log(usersWithLikes);
    if (usersWithLikes.length < 1) {
        console.log("no one likes this");
    }
}

showHowManyUsersLikeThis(usersWithLikes);
