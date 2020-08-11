import { DenseRepository } from '../utility/dense-repository';

export class Graph {

  constructor() {
    this.nodes_ = new DenseRepository();
    this.edges_ = new DenseRepository();
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

  getEdge(id) {
    return this.edges_.get(id);
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
