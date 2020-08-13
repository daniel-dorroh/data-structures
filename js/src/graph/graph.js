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

  areAdjacent(node1Id, node2Id) {
    for (let edge of this.edges_) {
      if ((edge.node1Id === node1Id && edge.node2Id === node2Id)
          || (edge.node2Id === node1Id && edge.node1Id === node2Id)) {
        return true;
      }
    }
    return false;
  }

  getNode(id) {
    return this.nodes_.get(id);
  }

  getNeighborNodes(nodeId) {
    const neighbors = new HashSet();
    for (let edge of this.edges_) {
      if (edge.node1Id === nodeId) {
        neighbors.add(this.nodes_.get(edge.node2Id));
      }
    }
    return Array.from(neighbors);
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
    const removedEdges = [];
    for (let edge of this.edges_) {
      if (edge.node1Id === id || edge.node2Id === id) {
        removedEdges.push(edge);
      }
    }
    for (let edge of removedEdges) {
      this.edges_.remove(edge);
    }
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
