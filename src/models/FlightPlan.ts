import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export class FlightPlan {
  id: string;
  name: string;
  date: Date;
  createdAt?: Date;
  nodes: Node[];
  description?: string;

  constructor(name: string, date: Date, description?: string, nodes?: Node[]) {
    this.id = uuidv4(),
    this.name = name,
    this.description = description,
    this.createdAt = new Date(),
    this.date = date,
    this.nodes = nodes ?? []
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

export interface Node {
  id: string;
  type: string;
  ident: string;
  coordinates: string[] | number[];
  coordinateType: CoordinateType;
  altitude: number;
  name?: string | null;
  tot?: Date | null;
  dtot?: DTOT | null;
  via?: Via | null;
  description?: string | null;
  inDetailMode?: boolean;
}

export enum CoordinateType {
  GPS,
  LATLON,
  MGRS
}

export interface DTOT {
  start: Date,
  end: Date
}

export interface Via {
  type: string | null,
  ident: string | null
}