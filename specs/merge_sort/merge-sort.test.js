/*
  Merge sort implementation in javascript
*/

const mergeSort = (array) => {
  if (array.length <= 1) {
    return array
  }
  const mid = Math.floor(array.length / 2)
  const leftArray = mergeSort(array.slice(0, mid))
  const rightArray = mergeSort(array.slice(mid))
  return merge(leftArray, rightArray)
};

const merge = (leftArray, rightArray) => {
  let i = 0
  let j = 0
  let sortedArray = []
  while (leftArray[i] && rightArray[j]) {
    if (leftArray[i] < rightArray[j]) {
      sortedArray.push(leftArray[i])
      i++
    }
    else {
      sortedArray.push(rightArray[j])
      j++
    }
  }
  if (leftArray[i]) {
    sortedArray = [...sortedArray, ...leftArray.slice(i)]
  }

  if (rightArray[j]) {
    sortedArray = [...sortedArray, ...rightArray.slice(j)]
  }
  return sortedArray
}
// unit tests
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
