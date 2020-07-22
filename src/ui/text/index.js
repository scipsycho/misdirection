import React, {Component} from "react";
import {TextField} from "@material-ui/core";

export class Text extends Component {
    render(){
        const {id, name, isValid, label, helperText, helperTextError, defaultValue, updateFieldHandler} = this.props;
        return (<TextField
            name={name}
            label={label}
            variant={"outlined"}
            size={"small"}
            error={!isValid}
            helperText={isValid ? helperText : helperTextError}
            value={defaultValue ? defaultValue : ""}
            style={{margin: 8}}
            onChange={e => updateFieldHandler(id, name, e.target.value)}
        />)
    }
}