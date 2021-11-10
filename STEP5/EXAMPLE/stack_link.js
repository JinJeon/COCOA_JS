class Node {
  constructor(next, value) {
    this.next = next;
    this.value = value;
  }
}

class Stack {
  constructor() {
    this.stack = null;
  }

  push(element) {
    let head = this.stack;
    let newNode = new Node(null, element);

    if (!head) {
      this.stack = newNode;
    } else {
      newNode.next = head;
      this.stack = newNode;
    }
  }

  pop() {
    let head = this.stack;

    if (!head) return "Stack is empty!";

    this.stack = head.next;
    return head.value;
  }

  peek() {
    if (!this.stack) return "Stack is empty!";
    return this.stack.value;
  }
}
const A = new Stack();
A.push("A");
// A.push("B");
console.log(A.stack);
// A.pop();
// console.log(A);
