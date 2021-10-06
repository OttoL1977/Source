const clearState = (obj) => {
    for (const prop of Object.keys(obj)) {
        delete obj[prop];
    }
}

export default clearState;