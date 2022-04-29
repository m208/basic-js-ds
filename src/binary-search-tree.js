const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  tree = null;

  root() {
    return this.tree;
  }

  add(data) {

    if (!this.tree) {
      this.tree = new Node(data);
    }

    if (this.has(data)) return; // no dublicates

    else {
      let node = this.tree;
      let last = node;
      while (node) {
        last = node;
        if (data < node.data) {
          node = node.left;
        } else {
          node = node.right;
        }
      }

      if (data < last.data) {
        last.left = new Node(data);
      } else {
        last.right = new Node(data);
      }
    }
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  find(data) {
    let node = this.tree;

    while (node) {
      if (node.data === data) return node;

      if (data < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return null;
  }

  findParent(data) {
    let node = this.tree;
    let parent = node;

    while (node) {

      if (node.data === data) return parent;
      parent = node;

      if (data < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return null;
  }


  remove(data) {

    let node = this.find(data);

    const parent = this.findParent(data);
    const connector = (data > parent.data) ? 'right' : 'left';

    //console.log('data: ', data, 'parent.data: ', parent.data, 'connector: ', connector);

    if (!node.left && !node.right) {
      parent[connector] = null;
    }

    else if (!node.left) {
      parent[connector] = node.right;
    }

    else if (!node.right) {
      parent[connector] = node.left;
    }

    else {
      const maxFromLeft = this.max(node.left);

      this.remove(maxFromLeft); // recursive remove more childs
      node.data = maxFromLeft;
    }
  }

  min(node = this.tree) {
    let min = node.data;

    while (node) {
      min = node.data;
      node = node.left;
    }

    return min;
  }

  max(node = this.tree) {
    let max = node.data;

    while (node) {
      max = node.data;
      node = node.right;
    }

    return max;
  }

}
module.exports = {
  BinarySearchTree
};

/*
const tree = new BinarySearchTree();

tree.add(9);
tree.add(14);
tree.add(4);
tree.add(10);
// tree.add(2);
// tree.add(1);
// tree.add(6);
// tree.add(128);
// tree.add(8);
// tree.add(7);
// tree.add(31);
// tree.add(54);
// tree.add(1);

// tree.remove(14);
// tree.remove(8);
//tree.remove(4);

console.log(tree);
console.log(tree.root().data);

// console.log(tree.has(1), 1);
// console.log(tree.has(6), 6);
// console.log(tree.has(7), 7);


//console.log(tree.has(14), false, 14);
//console.log(tree.has(8), false, 8);
console.log(tree.has(9), false, 9);
console.log(tree.has(2), true, 2);
console.log(tree.has(6), true, 6);
console.log(tree.has(128), true, 128);
console.log(tree.has(31), true, 31);
console.log(tree.has(54), true, 54);
console.log(tree.has(1), true, 1);


*/