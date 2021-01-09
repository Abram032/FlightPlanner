export class FlightPlan {
  id: string;
  name: string;
  date: Date;
  nodes: Node[];
  description?: string;

  constructor(id: string, name: string, description?: string) {
    this.id = id,
    this.name = name,
    this.description = description,
    this.date = new Date(),
    this.nodes = []
  }

  addNode(node: Node): void {
    this.nodes.push(node);
  }

  updateNode(nodeId: number, node: Node): void {
    this.nodes[nodeId] = node;
  }

  removeNode(nodeId: number): void {
    this.nodes.splice(nodeId, 1);
  }
}

export interface Coordinates {
  latitude: number,
  longitude: number,
  mgrs?: string | null
}

export interface DTOT {
  start: Date,
  end: Date
}

export interface Via {
  type: string | null,
  ident: string | null
}

export interface Node {
  type: string;
  ident: string;
  coordinates: Coordinates;
  altitude: number;
  name?: string | null;
  tot?: Date | null;
  dtot?: DTOT | null;
  via?: Via | null;
  description?: string | null;
}