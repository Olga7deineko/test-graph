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

export interface UpdateNodePayload {
    nodeId?: string;
    id: string;
    attributeName: string;
    attributeValue: string;
    nodes: Node[];
}

export interface GraphCustomNodeAttributesProps {
    attributes?: NodeDataAttribute[];
    nodeId?: string;
    updateNode: (data: UpdateNodePayload) => void;
    nodes: Node[];
    edges?: Edge[];
}

export interface GraphCustomNodeAttributeProps {
    attribute: NodeDataAttribute;
    setNewValue: (id: string, attributeName: string, attributeValue: string) => void;
    edges?: Edge[];
}

export interface GraphCustomHandleProps {
    connections: string[];
    type: HandleType;
    position: Position;
    nodeId?: string;
    parentId?: string;
}
