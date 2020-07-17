function removeAllRows() {
    rowsToRemove = document.getElementsByClassName('rows');
    for (var i = 0; i < rowsToRemove.length; i++) {
        document.getElementById(rowsToRemove.item(i).id).remove();
    }
}

function setAllEnabled(boolVal) {
    document.getElementById('allEnabled').checked = boolVal;
}

function updateUIFromSettings() {
    (browser.storage.local.get().then('settingsInJson').then(
        storage => {
            storedSettings = storage.settingsInJson;
            removeAllRows();
            setAllEnabled(storedSettings.allEnabled);
            storedSettings.rows.forEach(rowJson => addRow(rowJson))
        }
    ));
}

function onError() {
    console.error(e);
}

document.addEventListener('DOMContentLoaded', updateUIFromSettings);



