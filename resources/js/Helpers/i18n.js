/**
 * Translate a given key
 * 
 * @param {string} key The translation key in format 'file.key'
 * @param {object} replacements Optional replacements
 * @return {string}
 */
export function __(key, replacements = {}) {
    // Split the key into file and actual key
    const [file, translationKey] = key.split('.');

    // Check if we have translations and the specific translation
    if (
        !window.translations ||
        !window.translations[file] ||
        !window.translations[file][translationKey]
    ) {
        return key; // Return the key if no translation found
    }

    // Get the translation
    let translation = window.translations[file][translationKey];

    // Handle replacements
    if (replacements) {
        Object.keys(replacements).forEach(key => {
            translation = translation.replace(`:${key}`, replacements[key]);
        });
    }

    return translation;
}

// Also add a global window.trans function for convenience
window.trans = __;