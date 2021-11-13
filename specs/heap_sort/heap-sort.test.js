
const heapSort = (array) => {
  const midIndex = Math.floor(array.length / 2)
  array = createMaxHeap(array)
  for (let i = array.length - 1; i > 0; i--) {
    array = swapPlace(0, i, array)
    console.log('after swap', i, array)
    array = heapify(array, 0, i)
    console.log('after heapyfy ', i, array)
  }
  console.log('sorted array ', array);
  return array
};

const createMaxHeap = (array) => {
  const midIndex = Math.floor(array.length / 2)
  for (let i = midIndex; i >= 0; i--) {
    array = heapify(array, i,)
  }
  console.log('max heap', array);
  return array
};

const swapPlace = (index1, index2, array) => {
  if (array[index1] && array[index2]) {
    const tempVal = array[index1]
    array[index1] = array[index2]
    array[index2] = tempVal
  }
  return array
}

const heapify = (array, index, heapSize) => {
  // code\
  const left = (index * 2) + 1
  const right = (index * 2) + 2
  heapSize = heapSize ? heapSize : array.length
  let largestNumberIndex = index
  // finding largest number by storing largest number till now in different field (largestNumberIndex)
  if (heapSize > left && array[largestNumberIndex] < array[left]) {
    largestNumberIndex = left
  }
  if (heapSize > right && array[largestNumberIndex] < array[right]) {
    largestNumberIndex = right
  }
  // swipe only when indexes are different
  if (index !== largestNumberIndex) {
    array = swapPlace(index, largestNumberIndex, array)
    array = heapify(array, largestNumberIndex, heapSize)
  }
  return array
};

// unit tests
test("heap sort", function () {
  const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
  heapSort(nums);
  expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
