import React, {Component} from "react";
import {IconButton} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


export class AddButton extends Component {
    render() {
        const {onClickHandler} = this.props;
        return (
            <div>
                <IconButton onClick={onClickHandler} aria-label={"add"} color={"primary"}>
                    <AddBoxIcon style={{margin: 4}}/>
                </IconButton>
            </div>
        )
    }
}

export class DeleteButton extends Component {
    render() {
        const {onClickHandler, rowId} = this.props
        return (
            <IconButton aria-label={"delete"} color={"primary"} onClick={() => onClickHandler(rowId)}>
                <DeleteIcon/>
            </IconButton>
        )
    }
}

export class SubmitButton extends Component {
    render() {
        const {onClickHandler} = this.props;
        return (<div>
            <Button variant={"contained"} color={"primary"} onClick={() => onClickHandler("submit button clicked")}
                    startIcon={<SaveIcon/>}>Save</Button>
        </div>);
    }
}

export class ArrowButton extends Component {
    render() {
        const { isUpDisabled, isDownDisabled, id, moveRowHandler} = this.props
        return (
            <span>
                <IconButton aria-label={"move"} color={"primary"} disabled={isUpDisabled} onClick={() => moveRowHandler(id, -1)}>
                    <KeyboardArrowUpIcon/>
                </IconButton>
                <IconButton aria-label={"move"} color={"primary"} disabled={isDownDisabled} onClick={() => moveRowHandler(id, 1)}>
                    <KeyboardArrowDownIcon/>
                </IconButton>
            </span>
        )
    }
}