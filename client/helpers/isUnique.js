export const isUnique = function(array) {
  const filteredArray = []
  array.filter(item => {
    if (!filteredArray.includes(item)) filteredArray.push(item)
    return filteredArray
  })

  console.log(filteredArray)
}
