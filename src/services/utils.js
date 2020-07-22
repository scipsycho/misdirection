
export const getIndexToIdMap = (rows) => {
    let indexToIdMap = {}
    Object.keys(rows).map(
        id => {
            let row = rows[id]
            indexToIdMap[row.index] = id
        }
    )
    return indexToIdMap;
}