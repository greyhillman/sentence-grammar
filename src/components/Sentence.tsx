import * as React from "react";
import { SentencePart } from "./SentencePart";

import "./Sentence.css";

export interface SentenceProps {
    parts: string[];
}

export class Sentence extends React.Component<SentenceProps, {}> {
    render() {
        return (
            <div className="sentence">
                {this.props.parts.map(part => <SentencePart key={part} text={part} />)}
            </div>
        );
    }
}