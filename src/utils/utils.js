export const createFirebaseGeneric = (customObject) => {
    const firebaseGeneric = {};
    Object.keys(customObject).forEach((propertyName) => {
        if (customObject[propertyName] !== firebaseGeneric[propertyName]) {
            firebaseGeneric[propertyName] = customObject[propertyName];
        }
    });
    return firebaseGeneric;
}