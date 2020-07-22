import React, {Component} from 'react';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {enableCheckBoxLabel_off, enableCheckBoxLabel_on} from "../../constants";


export class Checkbox extends Component {

    render() {
        const {isChecked, onClickHandler} = this.props;

        return (
            <FormControlLabel
                control={<Switch size={"small"} checked={isChecked} onChange={onClickHandler} color={"primary"}/>}
                label={isChecked ? enableCheckBoxLabel_on : enableCheckBoxLabel_off}
            />
    );
    }
}