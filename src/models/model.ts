import { Node } from '@reactflow/core/dist/esm/types/nodes';
import { Edge, HandleType, Position } from 'reactflow';

export interface GraphProps {
    nodes: Node[];
    fetchGraphNodes: () => void;
}

export interface GraphSidebarProps {
    graphNodes: Node[];
    selectedId?: string;
    setSelectedId: (id: string) => void;
}

export interface GraphBodeProps extends GraphSidebarProps {
    graphEdges: Edge[];
}

export interface GraphCustomNodeAccordionProps {
    selected?: boolean;
    data: NodeData;
    nodeId?: string;
}

export interface NodeDataAttribute {
    id: string;
    label: string;
    required: boolean;
    value: string;
}

export interface NodeData {
    label: string;
    description?: string;
    attributes?: NodeDataAttribute[];
    inputConnections?: string[];
    outputConnections?: string[];
    parentId?: string;
    childIds?: string[];
    parent?: Node;
}

export interface GraphChangeAttributeProps {
    open: boolean;
    setNewValue: (data?: string) => void,
    defaultInputValue: string | undefined;
    isAttribute: boolean;
}

export interface GraphCustomNodeRowProps {
    nodes: Node[];
    edges?: Edge[];
    nodeId?: string;
}

export interface GraphCustomNodeAttributesProps {
    attributes?: NodeDataAttribute[];
}

export interface GraphCustomNodeAttributeProps {
    attribute: NodeDataAttribute;
}

export interface GraphCustomHandleProps {
    connections: string[];
    type: HandleType;
    position: Position;
    nodeId?: string;
    parentId?: string;
}
