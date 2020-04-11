import * as React from "react";

import { WordClass, getColor } from "./WordClass";

import "./Legend.css";


export class Legend extends React.Component<{}, {}> {
    render() {
        const listItems = Object.values(WordClass).map(wordClass => {
            const color = getColor(wordClass);

            return (
                <tr key={wordClass}>
                    <td>{wordClass}</td>
                    <td style={{ color: color }} >{color}</td>
                </tr>
            )
        });

        return (
            <table className="legend">
                <thead>
                    <tr>
                        <th>{`Word Class`}</th>
                        <th>{`Color`}</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </table>
        );
    }
}
