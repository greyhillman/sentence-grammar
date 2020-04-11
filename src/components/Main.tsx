import * as React from "react";
import { Sentence } from "./Sentence";

import "./Main.css";
import { Legend } from "./Legend";

const parts = [
    "The", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog."
];

export interface MainProps {

}

export class Main extends React.Component<MainProps, {}> {
    render() {
        return (
            <div className="main">
                <Sentence parts={parts} />
                <Legend />
            </div>
        );
    }
}
