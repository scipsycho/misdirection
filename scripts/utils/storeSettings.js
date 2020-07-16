function isEmpty(rowJson) {
    if(rowJson.inputRegex==="" || rowJson.outputRegex==="") {
        return true;
    }
    return false;
}

function getRowJson(rowElement) {
    var id = rowElement.id;
    return {
        "id": id,
        "isEnabled": document.getElementById(`disableRowCheckBox_${id}`).checked,
        "inputRegex": document.getElementById(`inputRegex_${id}`).value,
        "outputRegex": document.getElementById(`outputRegex_${id}`).value
    }
}

function getInputDataJson() {
    var inputDataJson = {
        "allEnabled": document.getElementById("allEnabled").checked,
        "rows": []
    };

    var rowElements = document.getElementsByClassName('rows');
    var rowsToRemove = []
    for(var i = 0; i<rowElements.length; i++) {
        rowJson = getRowJson(rowElements.item(i));
        if(isEmpty(rowJson)) {
            rowsToRemove.push(rowJson.id);
        } else {
            inputDataJson.rows.push(rowJson);
        }
    }

    rowsToRemove.forEach(id => document.getElementById(id).remove());
    return inputDataJson;
}

function storeSettings(e) {
    var settingsInJson = getInputDataJson();
    browser.storage.sync.set({
        'settingsInJson': settingsInJson
    });
    e.preventDefault();
}

document.getElementById("submitForm").addEventListener("click", storeSettings);
