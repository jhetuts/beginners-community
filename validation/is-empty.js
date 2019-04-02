const isEmpty = value => {
    return(
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (value === '' && value.trim().length === 0)
    )
}

module.exports = isEmpty;