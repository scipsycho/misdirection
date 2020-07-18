const defaultSettings = {
    allEnabled: true,
    rows: []
}

function removeAllRows() {
    rowsToRemove = document.getElementsByClassName('rows');
    for (var i = 0; i < rowsToRemove.length; i++) {
        document.getElementById(rowsToRemove.item(i).id).remove();
    }
}

function setAllEnabled(boolVal) {
    document.getElementById('allEnabled').checked = boolVal;
}

function updateUI(storage) {
    let storedSettings;

    if (!('settingsInJson' in storage)) {
        console.log("No data found in browser storage. Using default values.");
        storedSettings = defaultSettings;
    } else {
        storedSettings = storage.settingsInJson;
    }

    removeAllRows();
    setAllEnabled(storedSettings.allEnabled);
    storedSettings.rows.forEach(rowJson => addRow(rowJson))
}

function updateUIFromSettings() {
    browser.storage.local.get().then('settingsInJson').then(
        storage => updateUI(storage),
        () => console.error("Error retriveing data from browser storage.")
    );
}

document.addEventListener('DOMContentLoaded', updateUIFromSettings);



