import * as React from "react";
import { SentencePart, SentencePartProps } from "./SentencePart";

import "./Sentence.css";
import { WordClass } from "./WordClass";

interface PartWordClass {
    readonly index: number;
    readonly text: string;
    wordClass: WordClass | null;
}

interface SelectedParts {
    firstSelected: number | null;
    indices: number[];
}

function addPartToSelected(selectedParts: SelectedParts, index: number): SelectedParts {
    const alreadySelected = selectedParts.indices.some(i => i === index);
    if (!alreadySelected) {
        selectedParts.indices.push(index);
    }

    selectedParts.indices.sort();
    return selectedParts;
}

function addPartsUntil(selectedParts: SelectedParts, index: number): SelectedParts {
    if (!selectedParts.firstSelected) {
        selectedParts.firstSelected = index;
        selectedParts.indices = [index];
    } else {
        selectedParts.indices = [];

        const range = (start: number, end: number) => [...Array(end - start + 1).keys()].map(i => i + start);

        const start = Math.min(selectedParts.firstSelected, index);
        const end = Math.max(selectedParts.firstSelected, index);
        const partsToAdd = range(start, end);

        partsToAdd.forEach(partToAdd => {
            selectedParts = addPartToSelected(selectedParts, partToAdd)
        });
    }
    
    selectedParts.indices.sort();
    return selectedParts;
}

export interface SentenceProps {
    parts: string[];
}

interface SentenceState {
    partsSelected: SelectedParts;
    parts: PartWordClass[];
}

export class Sentence extends React.Component<SentenceProps, SentenceState> {
    constructor(props: SentenceProps) {
        super(props);

        this.state = {
            partsSelected: {
                firstSelected: null,
                indices: [],
            },
            parts: this.props.parts.map((part, index) => {
                return {
                    index: index,
                    text: part,
                    wordClass: null,
                };
            })
        };
    }

    _ctrlClicked(index: number) {
        console.log(`Ctrl+clicked: ${index}`);
        this.setState(prevState => {
            return {
                partsSelected: addPartToSelected(prevState.partsSelected, index),
            };
        });
    }

    _shiftClicked(index: number) {
        console.log(`Shift+clicked: ${index}`);
        this.setState(prevState => {
            return {
                partsSelected: addPartsUntil(prevState.partsSelected, index),
            };
        });
    }

    _wordClassSelectedFor(index: number, wordClass: WordClass) {
        this.setState(prevState => {
            const oldParts = prevState.parts;
            oldParts[index].wordClass = wordClass;
            return {
                parts: oldParts,
            };
        });
    }

    render() {
        return (
            <div>
                <div className="sentence">
                    {this.state.parts.map(part => <SentencePart
                        key={part.text}
                        text={part.text}
                        wordClass={part.wordClass}
                        ctrlSelected={() => this._ctrlClicked(part.index)}
                        shiftSelected={() => this._shiftClicked(part.index)}
                        wordClassSelected={(wordClass)=> this._wordClassSelectedFor(part.index, wordClass)}
                    />)}
                </div>
                <div>
                    {this.state.partsSelected.indices.map(i => <span key={i}>{this.state.parts[i].text}</span>)}
                </div>
            </div>
        );
    }
}