import { Node } from '@reactflow/core/dist/esm/types/nodes';
import { Edge } from 'reactflow';

export interface GraphSidebarProps {
    graphNodes: Node[];
    selectedId: string | undefined;
    setSelectedId: (id: string) => void;
}

export interface GraphBodeProps extends GraphSidebarProps{
    graphEdges: Edge[];
    fetchGraphNodes: () => void;
}

export interface NodeDataAttribute{
    label: string;
    required: boolean;
    value: string;
}

export interface NodeData{
    label: string;
    description?: string;
    attributes?: NodeDataAttribute[];
    childrenIds?: string[];
    extendId?: string;
}