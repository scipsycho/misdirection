function addSearchSuggestions(text, addSuggestions) {
    browser.storage.local.get().then('settingsInJson').then(
        storage => {
            let suggestions = []

            var regexRows = storage.settingsInJson.rows;
            for (var i = 0; i < regexRows.length; i++) {
                var regexRow = regexRows[i];
                var inputRegexMatcher = regexRow.inputRegexMatcher;
                if (inputRegexMatcher.test(text)) {
                    var newUrl = text.replace(inputRegexMatcher, regexRow.outputRegex);
                    suggestions.push({
                        content: newUrl,
                        description: newUrl
                    });
                }
            }
            if (suggestions.length > 0) {
                addSuggestions(suggestions);
            }
        }
    )
}

function executeSuggestion(text, disposition) {
    let url = text;
    document.URL
    switch (disposition) {
        case "currentTab":
            browser.tabs.update({url});
            break;
        case "newForegroundTab":
            browser.tabs.create({url});
            break;
        case "newBackgroundTab":
            browser.tabs.create({url, active: false});
            break;
    }
}

browser.omnibox.onInputChanged.addListener((text, addSuggestions) => addSearchSuggestions(text, addSuggestions));
browser.omnibox.onInputEntered.addListener((text, disposition) => executeSuggestion(text, disposition));