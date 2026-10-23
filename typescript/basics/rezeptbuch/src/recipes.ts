// Type aliases

// Lege ein Typalias 'Ingredient' mit name(string) und amountGrams(number) an
type Ingredient = {
    name: string;
    amountGrams: number;
};

// Lege ein Typalias 'Recipe' mit  name, servings(Zahl), vegetarian(booleschen Wert) und ingredients(einem Array von Ingredient) an
type Recipe = {
    name: string;
    servings: number;
    vegetarian: boolean;
    ingredients: Ingredient[];
};

// lege zwei Variablen an, die mit 'Recipe' gekennzeichnet sind und jeweils ein realistisches Rezept mit mindestens zwei Zutaten enthalten

const pancakes: Recipe = {
    name: "Pfannkuchen",
    servings: 4,
    vegetarian: true,
    ingredients: [
        {
            name: "Buttermilch",
            amountGrams: 500,
        },
        {
            name: "Eier",
            amountGrams: 4,
        },
        {
            name: "Mehl",
            amountGrams: 250,
        },
        {
            name: "Apfelmus",
            amountGrams: 500,
        },
        {
            name: "Zucker",
            amountGrams: 100,
        },
    ],
};

const lasagne: Recipe = {
    name: "Lasagne",
    servings: 4,
    vegetarian: false,
    ingredients: [
        {
            name: "Lasagne Nudel",
            amountGrams: 500,
        },
        {
            name: "Dosentomaten",
            amountGrams: 500,
        },
        {
            name: "Parmesan",
            amountGrams: 250,
        },
        {
            name: "Hackfleisch",
            amountGrams: 300,
        },
        {
            name: "Mozzarella",
            amountGrams: 300,
        },
    ],
};

// Schreibe eine Funktion summarize(recipe: Recipe): string, die eine lesbare, einzeilige Beschreibung des Rezepts zurückgibt

function summarize(recipe: Recipe): string {
    const ingredientNames = recipe.ingredients

        // mit map jede Zutat durchgehen und Namen rausholen.
        // pro Zutat einen Text (Menge + "g " + Name) zusammenbauen
        .map((ingredient) => `${ingredient.amountGrams}g ${ingredient.name}`)

        // kleine Texte mit ", " zu einem langen Text zusammnfügen
        .join(", ");

    // Satz zusammenbauen
    return `${recipe.name} Rezept (${recipe.vegetarian ? "vegetarisch" : "nicht vegetarisch"}) für ${recipe.servings} Personen mit folgenden Zutaten: ${ingredientNames}.`;
}

console.log(summarize(lasagne));
