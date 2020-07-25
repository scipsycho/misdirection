/*global browser*/
import {getIndexToIdMap} from "./utils";

export const BROWSER_STORAGE_KEY = 'misdirectionSettings';


export const mapSettingsToState = (storedSettings) => {

    let tempState = {
        isEnabled: storedSettings.isEnabled,
        totalRows: storedSettings.rows.length,
        rows: {}
    };

    storedSettings.rows.forEach(
        (row, i) => {
            tempState.rows[row.id] = {
                inputRegex: row.inputRegex,
                outputRegex: row.outputRegex,
                inputRegexIsValid: true,
                outputRegexIsValid: true,
                index: i
            }
        }
    );
    return tempState;
}

export const fetchSettings = (onResolve, onError) => {
    return browser.storage.local.get().then(
        store => onResolve(mapSettingsToState(store[BROWSER_STORAGE_KEY])),
        () => onError()
    );
};

export const storeSettings = (uiState, action) => {
    let settings = {
        isEnabled: uiState.isEnabled,
        rows: []
    }
    const indexToIdMap = getIndexToIdMap(uiState.rows)
    const uiRows = uiState.rows
    for (let i = 0; i < uiState.totalRows; i++) {
        let uiRow = uiState.rows[indexToIdMap[i]]
        settings.rows.push({
            id: indexToIdMap[i],
            inputRegex: uiRow.inputRegex,
            outputRegex: uiRow.outputRegex,
            inputRegexMatcher: new RegExp(uiRow.inputRegex)
        })
    }
    browser.storage.local.set({
        [BROWSER_STORAGE_KEY]: settings
    }).then(() => console.debug(`Settings stored after action:${action}:`, settings), () => console.error(`Error while storing the settings after ${action}`));
};

