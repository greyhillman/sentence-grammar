export enum WordClass {
    Adjective = "Adjective",
    Adverb = "Adverb",
    Determiner = "Determiner",
    Conjunction = "Conjunction",
    Interjection = "Interjection",
    Noun = "Noun",
    Preposition = "Preposition",
    Pronoun = "Pronoun",
    Verb = "Verb",
}

const WORD_CLASS_COLORS: { [key in WordClass]: string } = {
    Noun: "green",
    Verb: "red",
    Adverb: "lightblue",
    Adjective: "blue",
    Preposition: "orange",
    Pronoun: "lightgreen",
    Determiner: "blueviolet",
    Conjunction: "purple",
    Interjection: "maroon",
};


export function getColor(wordClass: WordClass): string {
    return WORD_CLASS_COLORS[wordClass];
}
