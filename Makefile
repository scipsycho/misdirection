build: ./scripts/utils/fetchSettings.js ./scripts/utils/handleFormEvents.js ./scripts/utils/storeSettings.js
	touch combinedFile.js
	cat ./scripts/utils/fetchSettings.js ./scripts/utils/handleFormEvents.js ./scripts/utils/storeSettings.js > combinedFile.js
	browserify combinedFile.js > bundle.js
	rm combinedFile.js

clean:
	rm combinedFile.js bundle.js
    
