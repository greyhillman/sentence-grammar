import * as React from "react";
import * as ReactDOM from "react-dom";

import { Tooltip } from "@material-ui/core";

import { WordClass, getColor } from "./WordClass";

import "./SentencePart.css";


export interface WordClassListProps {
    position: ListPosition;
    clickedWordClass(wordClass: WordClass): undefined;
}

interface WordClassListState {
    x: number;
    y: number;
}

export class WordClassList extends React.Component<WordClassListProps, WordClassListState> {
    constructor(props: WordClassListProps) {
        super(props);
        this.state = {
            x: props.position.x,
            y: props.position.y,
        };
    }

    closeList = (e: React.SyntheticEvent) => {
        e.stopPropagation();
    }

    clickedOption = (wordClass: WordClass) => {
        this.props.clickedWordClass(wordClass);
    }

    componentDidMount() {
        // Get the size of the rendered element
        const element = ReactDOM.findDOMNode(this) as Element;

        const listRect = element.getBoundingClientRect();

        let positionOnTarget = {
            x: 0,
            y: 0,
        };

        // Find the position on the selected part's box to pin this list to.
        switch (this.props.position.orientation) {
            case Orientation.Down:
                positionOnTarget.x = this.props.position.x + (this.props.position.width / 2);
                positionOnTarget.y = this.props.position.y + this.props.position.height;
                break;
            default:
                throw `This orientation is not supported: ${this.props.position.orientation}`;
        }

        let listLeft = 0;
        let listTop = 0;
        
        switch (this.props.position.orientation) {
            case Orientation.Down:
                listLeft = positionOnTarget.x - (listRect.width / 2);
                listTop = positionOnTarget.y;
                break;
            default:
                throw `This orientation is not supported: ${this.props.position.orientation}`;
        }

        this.setState({
            x: listLeft,
            y: listTop,
        });
    }

    render() {
        const listItems = Object.values(WordClass).map(wordClass => 
            <li
                key={wordClass}
                className="wordClassListOption"
                onClick={() => this.clickedOption(wordClass)}
                style={{ color: getColor(wordClass)}}
            >
                {wordClass}
            </li>
        );

        return (
            <div
                className="wordClassList"
                onClick={this.closeList}
                style={{ left: this.state.x, top: this.state.y }}
            >
                <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                    {listItems}
                </ul>
            </div>
        );
    }
}

export interface SentencePartProps {
    text: string;
}

interface SentencePartState {
    wordClass: WordClass | null;
    showingWordClassList: boolean;
    wordClassListPosition: ListPosition;
}

interface ListPosition {
    x: number;
    y: number;
    width: number;
    height: number;
    orientation: Orientation;
}

enum Orientation {
    Up = "Up",
    Down = "Down",
    Left = "Left",
    Right = "Right",
}

export class SentencePart extends React.Component<SentencePartProps, SentencePartState> {
    constructor(props: SentencePartProps) {
        super(props);
        this.state = {
            wordClass: null,
            showingWordClassList: false,
            wordClassListPosition: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                orientation: Orientation.Down,
            },
        };
    }

    clickedPart = (e: React.SyntheticEvent) => {
        console.log(e.currentTarget.getBoundingClientRect());

        const mouseEvent = e.nativeEvent as MouseEvent;
        if (mouseEvent && mouseEvent.ctrlKey) {
            // Add this part to the current phrase selection
        }

        console.log(e.nativeEvent as MouseEvent);

        const rect = e.currentTarget.getBoundingClientRect();

        this.setState((prevState, props) => {
            return {
                wordClass: prevState.wordClass,
                showingWordClassList: true,
                wordClassListPosition: {
                    x: rect.x,
                    y: rect.y,
                    width: rect.width,
                    height: rect.height,
                    orientation: Orientation.Down,
                },
            };
        });
        return undefined;
    }

    closeWordClassList = (wordClass: WordClass | null): undefined => {
        this.setState((prevState) => {
            return {
                wordClass: !wordClass ? prevState.wordClass : wordClass,
                showingWordClassList: false,
            };
        });
        return undefined;
    }

    setWordClass = (wordClass: WordClass): undefined => {
        return this.closeWordClassList(wordClass);
    }

    _computeLeft(list: React.ReactInstance) {
        console.log(list);
        return 0;
    }

    _computeRight(list: React.ReactInstance) {
        console.log(list);
        return 0;
    }

    render() {
        return <div
            className="sentencePart"
        >
            <PartText
                text={this.props.text}
                wordClass={this.state.wordClass}
                clickedWord={this.clickedPart}
             />
            <BackDrop
                isOpen={this.state.showingWordClassList}
                closeBackDrop={this.closeWordClassList}
            >
                <WordClassList
                    position={this.state.wordClassListPosition}
                    clickedWordClass={this.setWordClass} />
            </BackDrop>
        </div>;
    }
}

interface PartTextProps {
    text: string;
    wordClass: WordClass | null;
    clickedWord(e: React.SyntheticEvent): undefined;
}

class PartText extends React.Component<PartTextProps, {}> {
    render() {
        return <Tooltip
        title={this.props.wordClass || ''}
        // arrow
    >
        <span
            style={{ color: this.props.wordClass ? getColor(this.props.wordClass) : undefined }}
            onClick={this.props.clickedWord}
        >
            {this.props.text}
        </span>
    </Tooltip>;
        // if (this.props.wordClass) {
        //     return (
        //         <Tooltip
        //             title={this.props.wordClass}
        //             arrow
        //         >
        //             <span style={{ color: getColor(this.props.wordClass) }}>
        //                 {this.props.text}
        //             </span>
        //         </Tooltip>
        //     )
        // } else {
        //     return <span onClick={this.props.clickedWord}>{this.props.text}</span>;
        // }
    }
}

interface BackDropProps {
    isOpen: boolean;
    closeBackDrop(wordClass: WordClass | null): undefined;
};

class BackDrop extends React.Component<BackDropProps, {}> {
    closeBackDrop = () => {
        this.props.closeBackDrop(null);
    }

    render() {
        if (!this.props.isOpen) {
            return null;
        }

        return (
            <div
                className="backdrop"
                onClick={this.closeBackDrop}
            >
                {this.props.children}
            </div>
        )
    }
}