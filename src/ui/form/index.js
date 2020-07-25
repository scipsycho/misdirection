import React, {Component} from "react";
import {BROWSER_STORAGE_KEY, fetchSettings, mapSettingsToState, storeSettings} from "../../services/settingsStore";
import {Checkbox} from "../switch";
import {Rows} from "../rows";
import {AddButton, SubmitButton} from "../button";
import {v4 as uuid} from "uuid";
import {getIndexToIdMap} from "../../services/utils";

const defaultState = {
    isEnabled: true,
    totalRows: 0,
    rows: {}
}

export class Form extends Component {

    constructor(props) {
        super(props);
        this.state = defaultState
        this.setStateFromStore();
    }

    setStateFromStore = (overrideState = {}) =>
        fetchSettings(
            newState => {
                console.debug("Setting state from storage.")
                this.setState(({
                    ...newState,
                    ...overrideState
                }));
            },
            () => {
                console.warn("Error while retrieving data from store. Using default settings.")
                this.setState(defaultState);
            }
        );

    toggleIsEnabled = () => {
        if (this.state.isEnabled) {
            this.setState({
                isEnabled: false
            })
            this.validateAndSubmitInput("toggle turned off.")
        } else {
            this.setStateFromStore({
                isEnabled: true
            });
        }
    }

    addRow = () => {
        this.setState(prevState => {
            let newRows = prevState.rows;
            newRows[uuid()] = {
                inputRegex: "",
                outputRegex: "",
                inputRegexIsValid: true,
                outputRegexIsValid: true,
                index: prevState.totalRows
            }
            console.debug("Added rows", {
                isEnabled: prevState.isEnabled,
                totalRows: prevState.totalRows + 1,
                rows: newRows
            })
            return ({
                isEnabled: prevState.isEnabled,
                totalRows: prevState.totalRows + 1,
                rows: newRows
            })
        })
    }

    isRegexInvalid = (regex) => {
        try {
            if (regex === "") {
                return true;
            }
            new RegExp(regex);
        } catch {
            return true;
        }
        return false;
    }

    reIndexState = (oldRows, totalRows) => {
        console.debug("Reindexing....")
        const indexToIdMap = getIndexToIdMap(oldRows)
        let oldIndex = 0;
        let newIndex = 0;
        let id = ""

        let newRows = {}
        for (oldIndex = 0; oldIndex < totalRows; oldIndex++) {
            if (!(oldIndex in indexToIdMap)) {
                continue;
            }
            id = indexToIdMap[oldIndex];
            let {index, ...restRow} = oldRows[id]
            newRows[id] = {
                index: newIndex,
                ...restRow,
            }
            newIndex++;
        }
        return newRows;
    }

    deleteRow = (id) => {
        this.setState(prevState => {
            let newRows = prevState.rows;
            delete newRows[id]
            newRows = this.reIndexState(newRows, prevState.totalRows)
            console.debug("Deleted row", {
                isEnabled: prevState.isEnabled,
                totalRows: prevState.totalRows - 1,
                rows: newRows
            })
            return ({
                isEnabled: prevState.isEnabled,
                totalRows: prevState.totalRows - 1,
                rows: newRows
            })
        })
    }

    validateAndSubmitInput = (action) => {
        let isValid = true;

        this.setState(prevState => {
                let newRows = prevState.rows

                Object.keys(newRows).map(
                    id => {
                        if (this.isRegexInvalid(newRows[id].inputRegex)) {
                            newRows[id].inputRegexIsValid = false
                            isValid = false;
                        } else {
                            newRows[id].inputRegexIsValid = true
                        }
                        if (this.isRegexInvalid(newRows[id].outputRegex)) {
                            newRows[id].outputRegexIsValid = false
                            isValid = false;
                        } else {
                            newRows[id].outputRegexIsValid = true
                        }
                    }
                )

                return ({
                    ...prevState,
                    rows: newRows
                })
            },
            () => {
                console.debug(`Input is valid: ${isValid}`)
                if (isValid) {
                    storeSettings(this.state, action);
                }
            })
    }

    updateTextField = (id, field, value) => {
        this.setState(prevState => {
            let newRows = prevState.rows;
            newRows[id][field] = value;
            console.debug("Updated rows", {
                isEnabled: prevState.isEnabled,
                totalRows: prevState.totalRows,
                rows: newRows
            })
            return ({
                isEnabled: prevState.isEnabled,
                totalRows: prevState.totalRows,
                rows: newRows
            })
        })
    }

    moveRow = (id, by) => {
        this.setState(prevState => {
            let {rows: newRows, ...rest} = prevState
            const index = newRows[id].index
            let otherRowId
            Object.keys(newRows).map(
                id => {
                    if (newRows[id].index === index + by) {
                        otherRowId = id
                    }
                }
            )
            newRows[id].index = index + by;
            newRows[otherRowId].index = index;
            console.debug("Moved row", {
                ...rest,
                rows: newRows
            })
            return ({
                ...rest,
                rows: newRows
            })
        })
    }

    render() {
        return (
            <div>
                <Checkbox onClickHandler={this.toggleIsEnabled} isChecked={this.state.isEnabled}/>
                <form>
                    {this.state.isEnabled ? <AddButton onClickHandler={this.addRow}/> : ""}
                    {this.state.isEnabled ?
                        <Rows
                            totalRows={this.state.totalRows}
                            rows={this.state.rows}
                            deleteRowHandler={this.deleteRow}
                            updateFieldHandler={this.updateTextField}
                            moveRowHandler={this.moveRow}
                        /> : ""}
                    {this.state.isEnabled ? <SubmitButton onClickHandler={this.validateAndSubmitInput}/> : ""}
                </form>
            </div>
        )
    }

}

