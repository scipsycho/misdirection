import React, {Component} from "react";
import {Row} from "../row";
import {getIndexToIdMap} from "../../services/utils";

export class Rows extends Component {
    render() {
        console.log("Rows rendering with", this.props.rows)
        const {rows, deleteRowHandler, updateFieldHandler, totalRows, moveRowHandler} = this.props
        const indexToIdMap = getIndexToIdMap(rows);
        console.debug("indexToIdMap", indexToIdMap)
        let htmlRows = []
        for (let i = 0; i < totalRows; i++) {
            htmlRows.push((<Row {
                                    ...rows[indexToIdMap[i]]}
                                id={indexToIdMap[i]}
                                deleteRowHandler={deleteRowHandler}
                                updateFieldHandler={updateFieldHandler}
                                isUpDisabled={i === 0}
                                isDownDisabled={i === totalRows - 1}
                                moveRowHandler={moveRowHandler}
            />))
        }
        return (
            <div>
                {htmlRows}
            </div>
        );
    }
}

// {/*dd{indexToIdMap.map(row => (<Row {...row} deleteRowHandler={deleteRowHandler} updateFieldHandler={updateFieldHandler}/>))}*/}
