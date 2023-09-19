// assuming that the given input has no duplicates
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = null;
        this.root = this.buildTree(arr);
    }

    buildTree(arr) {
        arr.forEach((value) => {
            this.insert(value);
        });
        return this.root;
    }

    // iterative insertion of nodes
    insert(value) {
        if (!this.root) {
            this.root = new Node(value);
            return;
        }
        let currentNode = this.root;
        while (currentNode) {
            if (value < currentNode.value) {
                if (!currentNode.left) {
                    currentNode.left = new Node(value);
                    break;
                }
                currentNode = currentNode.left;
            } else {
                if (!currentNode.right) {
                    currentNode.right = new Node(value);
                    break;
                }
                currentNode = currentNode.right;
            }
        }
    }

    // delete using successor recursively
    delete(value) {
        this.root = this.deleteNode(this.root, value);
    }
    deleteNode(node, value) {
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            // the 4 cases
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }
            node.value = this.minValue(node.right);
            node.right = this.deleteNode(node.right, node.value);
        }
        return node;
    }
    minValue(node) {
        let min = node.value;
        while (node.left !== null) {
            min = node.left.value;
            node = node.left;
        }
        return min;
    }

    // the traversal methods constructing the string
    levelOrder(node = this.root, string = "") {
        if (node === null) {
            return;
        }
        const queue = [];
        queue.push(node);
        while (queue.length > 0) {
            const currentNode = queue.shift();
            string += currentNode.value + " ";
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
        return string;
    }
    inOrder(node = this.root, string = "") {
        if (node === null) {
            return string;
        }

        // Recursively traverse the left subtree and append to string
        string = this.inOrder(node.left, string);

        // Append the current node's value to the string
        string += node.value + " ";

        // Recursively traverse the right subtree and append to string
        string = this.inOrder(node.right, string);

        // Return the updated string
        return string;
    }
    preOrder(node = this.root, string = "") {
        if (node === null) {
            return string;
        }
        string += node.value + " ";
        string = this.preOrder(node.left, string);
        string = this.preOrder(node.right, string);
        return string;
    }
    postOrder(node = this.root, string = "") {
        if (node === null) {
            return string;
        }
        string = this.postOrder(node.left, string);
        string = this.postOrder(node.right, string);
        string += node.value + " ";
        return string;
    }
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return "";
    }

    let result = "";

    if (node.right !== null) {
        result += prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }

    result += `${prefix}${isLeft ? "└── " : "┌── "}${node.value}\n`;

    if (node.left !== null) {
        result += prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }

    return result;
};


class UIManager {
    constructor() {
        this.tree = null;
        this.input = document.getElementById("input");
        this.output = document.getElementsByClassName("output");
        this.insertButton = document.getElementById("insert");
        this.deleteButton = document.getElementById("delete");
        this.clearButton = document.getElementById("clear");

        this.inOrderOutput = document.getElementById("inorder");
        this.preOrderOutput = document.getElementById("preorder");
        this.postOrderOutput = document.getElementById("postorder");
        this.levelOrderOutput = document.getElementById("levelorder");
        this.prettyOutput = document.getElementById("pretty-output");

        this.insertButton.addEventListener("click", this.insert.bind(this));
        this.deleteButton.addEventListener("click", this.delete.bind(this));
        this.clearButton.addEventListener("click", this.clear.bind(this));
    }

    insert() {
        const value = this.input.value;
        if (value === "") {
            return;
        }
        if (this.tree === null) {
            this.tree = new Tree([value]);
        } else {
            this.tree.insert(value);
        }
        this.input.value = "";
        this.print();
    }

    delete() {
        const value = this.input.value;
        if (value === "") {
            return;
        }
        if (this.tree === null) {
            return;
        }
        this.tree.delete(value);
        this.input.value = "";
        this.print();
    }

    clear() {
        this.tree = null;
        this.input.value = "";
        this.print();
    }



    print() {
        if (this.tree === null) {
            this.output.innerHTML = "";
            this.inOrderOutput.textContent = "In-Order: ";
            this.preOrderOutput.textContent = "Pre-Order: ";
            this.postOrderOutput.textContent = "Post-Order: ";
            this.levelOrderOutput.textContent = "Level-Order: ";
            this.prettyOutput.textContent = "";
            return;
        }

        // Perform the tree traversals and pretty print
        const inOrderString = this.tree.inOrder();
        const preOrderString = this.tree.preOrder();
        const postOrderString = this.tree.postOrder();
        const levelOrderString = this.tree.levelOrder();
        const prettyPrintString = prettyPrint(this.tree.root);

        this.output.innerHTML = levelOrderString;
        this.inOrderOutput.textContent = "In-Order: " + inOrderString;
        this.preOrderOutput.textContent = "Pre-Order: " + preOrderString;
        this.postOrderOutput.textContent = "Post-Order: " + postOrderString;
        this.levelOrderOutput.textContent = "Level-Order: " + levelOrderString;
        this.prettyOutput.textContent = prettyPrintString;
    }}

const uiManager = new UIManager();


