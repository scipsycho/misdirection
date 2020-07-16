const {v4: uuidv4} = require('uuid');

function disableEnableAllCheckbox(e) {
    if (!e.target.checked) {
        document.getElementById('allEnabled').checked = false;
    }
}

function deleteRowEvent(e) {
    var id = e.target.value;
    var rowToBeDeleted = document.getElementById(id);
    rowToBeDeleted.remove();
}

function addRow(rowState) {
    if(!rowState) {
        rowState = {
            id: `${uuidv4()}`,
            "isEnabled": true,
            "inputRegex": "",
            "outputRegex": ""
        }
    }

    var disableRowCheckBox = document.createElement('input');
    disableRowCheckBox.setAttribute('type', 'checkbox');
    disableRowCheckBox.setAttribute('name', 'isEnabled');
    disableRowCheckBox.setAttribute('class', 'disableCheckbox');

    disableRowCheckBox.defaultChecked = rowState.isEnabled;

    disableRowCheckBox.addEventListener('click', e => disableEnableAllCheckbox(e));

    disableRowCheckBox.setAttribute('id', `disableRowCheckBox_${rowState.id}`);

    var tableData_checkBox = document.createElement('td');
    tableData_checkBox.appendChild(disableRowCheckBox);

    var textInput = document.createElement('input');
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('name', 'inputRegex');
    textInput.setAttribute('class', 'inputRegex');
    textInput.setAttribute('id', `inputRegex_${rowState.id}`);
    textInput.setAttribute('value', rowState.inputRegex);
    var tableData_inputRegex = document.createElement('td');
    tableData_inputRegex.appendChild(textInput);

    var anotherTextInput = document.createElement('input');
    anotherTextInput.setAttribute('type', 'text');

    anotherTextInput.setAttribute('name', 'outputRegex');
    anotherTextInput.setAttribute('id', `outputRegex_${rowState.id}`);
    anotherTextInput.setAttribute('value', rowState.outputRegex);
    var tableData_outputRegex = document.createElement('td');
    tableData_outputRegex.appendChild(anotherTextInput);

    var deleteRowButton = document.createElement('button');
    deleteRowButton.setAttribute('class', 'delRow');
    deleteRowButton.setAttribute('value', `${rowState.id}`);
    deleteRowButton.setAttribute('id', `deleteRowButton_${rowState.id}`);

    deleteRowButton.appendChild(document.createTextNode("-"));
    deleteRowButton.addEventListener("click", e => deleteRowEvent(e));

    var tableData_deleteButton = document.createElement('td');
    tableData_deleteButton.appendChild(deleteRowButton);

    var newRow = document.createElement("tr");
    newRow.setAttribute('class', 'rows');
    newRow.setAttribute("id", `${rowState.id}`);

    newRow.append(tableData_checkBox, tableData_inputRegex, tableData_outputRegex, tableData_deleteButton)
    document.getElementById('addRowsHere').appendChild(newRow);
}

document.getElementById("addRow").addEventListener('click', e => addRow(null));
function toggleAllDisableCheckboxes(e) {
    var allCheckboxes = document.getElementsByClassName('disableCheckbox');

    for (var i = 0; i < allCheckboxes.length; i++) {
        var checkbox = allCheckboxes.item(i);
        checkbox.checked = e.target.checked;
    }
}

document.getElementById('allEnabled').addEventListener('click', e => toggleAllDisableCheckboxes(e));


