
export class Graph {

  constructor() {
    this.nodes_ = [];
    this.edges_ = [];
    this.freedNodeIds_ = [];
    this.freedEdgeIds_ = [];
    this.nodeCount_ = 0;
    this.edgeCount_ = 0;
  }

  edgeCount() {
    return this.edgeCount_;
  }

  nodeCount() {
    return this.nodeCount_;
  }

  getNode(id) {
    if (id === null || id === undefined) {
      return null;
    }
    if (typeof id !== 'number') {
      throw `id was ${typeof id}, but it must be a number`;
    }
    if (!Number.isInteger(id)) {
      throw 'id was not an integer';
    }
    if (id > this.nodes_.length - 1) {
      return null;
    }
    const node = this.nodes_[id];
    return node;
  }

  addNode(value) {
    if (value === null || value === undefined) {
      throw `added value '${value}' is not valid`;
    }
    const item = this.createNode_(value);
    return this.addNode_(item);
  }

  addEdge(node1Id, node2Id) {
    if (node1Id === null
        || node1Id === undefined
        || node1Id > this.nodes_.length - 1) {
      throw `node1Id '${node1Id}' is not valid`;
    }
    if (node2Id === null
        || node2Id === undefined
        || node2Id > this.nodes_.length - 1) {
      throw `node2Id '${node2Id}' is not valid`;
    }
    const edge = this.createEdge_(node1Id, node2Id);
    return this.addEdge_(edge);
  }

  addNode_(item) {
    let itemId = null;
    if (this.freedNodeIds_.length) {
      itemId = this.freedNodeIds_.pop();
      this.nodes_[itemId] = item;
    } else {
      itemId = this.nodes_.push(item) - 1;
    }
    item.id = itemId;
    this.nodeCount_++;
    return itemId;
  }

  addEdge_(edge) {
    let edgeId = null;
    if (this.freedEdgeIds_.length) {
      edgeId = this.freedEdgeIds_.pop();
      this.edges_[edgeId] = edge;
    } else {
      edgeId = this.edges_.push(edge) - 1;
    }
    edge.id = edgeId;
    this.edgeCount_++;
    return edgeId;
  }

  createNode_(value) {
    return {
      id: null,
      value: value,
    };
  }

  createEdge_(node1Id, node2Id) {
    return {
      id: null,
      node1Id: node1Id,
      node2Id: node2Id,
    };
  }

}
