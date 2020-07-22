import React, {Component} from "react";
import {ArrowButton, DeleteButton} from "../button";
import {Text} from "../text";
import {
    inputRegex_helperText_error,
    inputRegex_label,
    outputRegex_helperText_error,
    outputRegex_label
} from "../../constants";

export class Row extends Component {

    render() {
        const {
            id,
            inputRegex,
            outputRegex,
            inputRegexIsValid,
            outputRegexIsValid,
            updateFieldHandler,
            deleteRowHandler,
            isUpDisabled,
            isDownDisabled,
            moveRowHandler
        } = this.props
        return (
            <div id={id}>
                <DeleteButton rowId={id} onClickHandler={deleteRowHandler}/>
                <Text
                    id={id}
                    name={"inputRegex"}
                    isValid={inputRegexIsValid}
                    label={inputRegex_label}
                    helperTextError={inputRegex_helperText_error}
                    defaultValue={inputRegex}
                    updateFieldHandler={updateFieldHandler}
                />
                <Text
                    id={id}
                    name={"outputRegex"}
                    isValid={outputRegexIsValid}
                    label={outputRegex_label}
                    helperTextError={outputRegex_helperText_error}
                    defaultValue={outputRegex}
                    updateFieldHandler={updateFieldHandler}
                />
                <ArrowButton id={id} moveRowHandler={moveRowHandler} isDownDisabled={isDownDisabled} isUpDisabled={isUpDisabled}/>
            </div>
        )
    }
}