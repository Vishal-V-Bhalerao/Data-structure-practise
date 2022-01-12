/*
  AVL Tree
  
  Name you class/function (anything we can call new on) Tree
  
  I would suggest making a Node class as well (it will help _a lot_ with AVL trees) Whereas with BSTs we 
  could get away with most of the logic living in the Tree class, that will be a lot tougher with AVL
  trees dues how the function calls must be recursive in order to get the balancing correct.
  
  Tree must a method called add that takes a value and adds it to the tree and then correctly balances the
  tree. There is only one correct structure for any given order of adding numbers and the unit tests enforce
  that structure.
  
  If you have any questions conceptually about balancing the tree, refer to the class website.
  
  Make sure you are calling the properties
  of the Nodes as follows:
  value - integer - the value being store in the tree
  left  - Node    - the subtree containing Node's with values less than the current Node's value
  right - Node    - the subtree containing Node's with values greater than the current Node's value

*/

class Tree {
  // code goes here
  constructor() {
    this.root = null;
  }
  add(value) {
    if (!this.root) {
      this.root = new Node(value)
    }
    else {
      this.root.add(value)
    }
  }
  toObject() {
    return this.root
  }
}

class Node {
  // code also goes here
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value
    this.height = 1
  }
  add(value) {
    if (value < this.value) {
      // go left or right
      if (this.left) {
        this.left.add(value)
      }
      else {
        this.left = new Node(value)
      }
      if (this.right && this.right.height < this.left.height) {
        this.height = this.left.height + 1
      }
    }
    else {
      if (this.right) {
        this.right.add(value)
      }
      else {
        this.right = new Node(value)
      }
      if (this.left && this.left.height < this.right.height) {
        this.height = this.right.height + 1
      }
    }
    _selfBalance()
  }
  _selfBalance() {

  }
  /**
   * (on the way up from the recursion)
    -> check balance of node C: left height is 0, right height is 0, balanced
    -> check balance of node B: left height is 0, right height is 1, balanced
    -> check balance of node A: left height is 0, right height is 2
    unbalanced, right heavy, child is right heavy

    -> perform right rotation
    -> swap the values of nodes A and B
    -> make node B the left child of node A
    -> make node C the right child of node A
    -> move node B's right child to its left child
    (if present)0
    -> make node A's _original_ left child
    (if present) the left child of node B
    -> update the heights of all the nodes involved
   */
  _rotateRR(topNode) {
    const tempVal = topNode.value
    topNode.value = topNode.right.value
    topNode.right.value = tempVal

    topNode.left = topNode.right
    topNode.right = topNode.right.right
  }
  _rotateLL() { }
  _updateInNewLocation() {
    // update new height
  }
}

// unit tests
// do not modify the below code
describe.skip("AVL Tree", function () {
  test("creates a correct tree", () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();

    expect(objs.value).toEqual(4);

    expect(objs.left.value).toEqual(2);

    expect(objs.left.left.value).toEqual(1);
    expect(objs.left.left.left).toBeNull();
    expect(objs.left.left.right).toBeNull();

    expect(objs.left.right.value).toEqual(3);
    expect(objs.left.right.left).toBeNull();
    expect(objs.left.right.right).toBeNull();

    expect(objs.right.value).toEqual(7);

    expect(objs.right.left.value).toEqual(6);
    expect(objs.right.left.right).toBeNull();

    expect(objs.right.left.left.value).toEqual(5);
    expect(objs.right.left.left.left).toBeNull();
    expect(objs.right.left.left.right).toBeNull();

    expect(objs.right.right.value).toEqual(9);

    expect(objs.right.right.left.value).toEqual(8);
    expect(objs.right.right.left.left).toBeNull();
    expect(objs.right.right.left.right).toBeNull();

    expect(objs.right.right.right.value).toEqual(10);
    expect(objs.right.right.right.left).toBeNull();
    expect(objs.right.right.right.right).toBeNull();
  });
});
