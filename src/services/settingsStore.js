
const defaultSettings = {
    isEnabled: true,
    rows: []
}

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
    console.log("Reinitalised state to : ")
    console.log(tempState)
    return tempState;
}

export const fetchSettings = () => {
    
};
export const storeSettings = () => console.log("Stored settings.");

