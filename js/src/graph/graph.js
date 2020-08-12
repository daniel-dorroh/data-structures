import { DenseRepository } from '../utility/dense-repository';
import { HashSet } from '../associative-array/hash-set';

export class Graph {

  constructor() {
    this.nodes_ = new DenseRepository();
    this.edges_ = new HashSet();
  }

  edgeCount() {
    return this.edges_.size();
  }

  nodeCount() {
    return this.nodes_.size();
  }

  getNode(id) {
    return this.nodes_.get(id);
  }

  addNode(value) {
    if (value === null || value === undefined) {
      throw `added value '${value}' is not valid`;
    }
    const item = this.createNode_(value);
    return this.nodes_.add(item);
  }

  removeNode(id) {
    this.nodes_.remove(id);
  }

  addEdge(node1Id, node2Id) {
    if (!this.nodes_.contains(node1Id)) {
      throw `node1Id '${node1Id}' is not valid`;
    }
    if (!this.nodes_.contains(node2Id)) {
      throw `node2Id '${node2Id}' is not valid`;
    }
    const edge = this.createEdge_(node1Id, node2Id);
    return this.edges_.add(edge);
  }

  removeEdge(node1Id, node2Id) {
    if (node1Id === null
        || node1Id === undefined
        || node2Id === null
        || node2Id === undefined) {
      return;
    }
    let edge = this.createEdge_(node1Id, node2Id);
    if (this.edges_.get(edge) !== null) {
      this.edges_.remove(edge);
    }
  }

  createNode_(value) {
    return {
      id: null,
      value: value,
    };
  }

  createEdge_(node1Id, node2Id) {
    return {
      node1Id: node1Id,
      node2Id: node2Id,
    };
  }

}
