export const createFirebaseGeneric = (customObject) => {
    const firebaseGeneric = {};
    Object.keys(customObject).forEach((propertyName) => {
        if (customObject[propertyName] !== firebaseGeneric[propertyName]) {
            firebaseGeneric[propertyName] = customObject[propertyName];
        }
    });
    return firebaseGeneric;
}

export const formatDate = (date) => {
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    const dateMonth = monthNames[date.getMonth()];
    const dateDay = date.getDate();
    const dateYear = date.getFullYear();

    return `${dateMonth} ${dateDay}, ${dateYear}`;
}