const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 43,]

const BST = []
function createMinimumBST(arr) {
    if (!Array.isArray(arr)) return null
    if (arr.length < 2) return arr
    const mid = Math.floor(arr.length / 2)
    const lefSubArray = arr.slice(0, mid)
    console.log(lefSubArray)
    const rightSubArray = arr.slice(mid + 1, arr.length)
    console.log(rightSubArray)
    const newNode = new node(mid)
    BST.push(newNode)
    newNode.left = createMinimumBST(lefSubArray)
    newNode.right = createMinimumBST(rightSubArray)
}

function node(val) {
    this.val = val
    this.left = null
    this.right = null
}

(function main() {
    createMinimumBST(array)
    console.log(BST)
})()