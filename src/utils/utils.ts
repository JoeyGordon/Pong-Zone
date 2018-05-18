export const createFirebaseGeneric = (customObject) => {
    const firebaseGeneric = {};
    Object.keys(customObject).forEach((propertyName) => {
        if (customObject[propertyName] !== firebaseGeneric[propertyName]) {
            firebaseGeneric[propertyName] = customObject[propertyName];
        }
    });
    return firebaseGeneric;
}

export const formatDate = (date: Date) => {
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

export const getTeamIdFromUserIds = (userIdA: string, userIdB: string) => {
    if(userIdA === userIdB) throw new Error('Teammates cannot be the same person');
    return userIdA > userIdB ? userIdB + userIdA : userIdA + userIdB;
}

export const getId = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };