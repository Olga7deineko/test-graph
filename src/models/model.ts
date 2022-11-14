import { Node } from '@reactflow/core/dist/esm/types/nodes';
import { Edge } from 'reactflow';

export interface GraphSidebarProps {
    graphNodes: Node[];
    selectedId: string | undefined;
    setSelectedId: (id: string) => void;
}

export interface GraphBodeProps extends GraphSidebarProps {
    graphEdges: Edge[];
    fetchGraphNodes: () => void;
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
    childrenIds?: string[];
    extendId?: string;
}

export interface GraphChangeAttributeProps {
    open: boolean;
    setNewValue: (data?: string) => void,
    defaultInputValue: string | undefined;
    isAttribute: boolean;
}

export interface UpdateNodePayload {
    nodeId: string;
    id: string;
    attributeName: string;
    attributeValue: string;
    nodes: Node[];
}

export interface GraphCustomNodeAttributesProps {
    attributes: NodeDataAttribute[];
    nodeId: string;
    updateNode: (data: UpdateNodePayload) => void;
    nodes: Node[];
}

export interface GraphCustomNodeAttributeProps {
    attribute: NodeDataAttribute;
    setNewValue: (id: string, attributeName: string, attributeValue: string) => void;
}