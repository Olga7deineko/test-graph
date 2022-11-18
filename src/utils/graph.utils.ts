import { Edge } from '@reactflow/core/dist/esm/types/edges';
import { Node } from '@reactflow/core/dist/esm/types/nodes';
import { MarkerType, Position } from 'reactflow';
import {
    DEFAULT_CONNECTION_COLOR,
    EDGE_STEP_TYPE,
    EXTEND_CONNECTION_COLOR,
    NODE_CUSTOM_TYPE,
    NODE_HEIGHT,
    NODE_WIDTH
} from '../constants/graph.constants';

export const prepareEdges = (nodes: Node[]) => {
    const edges: Edge[] = [];
    nodes?.forEach((node) => {
        node?.data?.outputConnections && node?.data?.outputConnections.forEach((connection: string) => {
            edges.push({
                id: `e${node?.id}-e${connection}`,
                source: node?.id,
                target: connection,
                targetHandle: `${connection}${node?.id}`,
                sourceHandle: `${node?.id}${connection}`,
                type: EDGE_STEP_TYPE,
                markerEnd: {
                    type: MarkerType.Arrow,
                    width: 10,
                    height: 10,
                    color: node?.data?.extendId === connection ? EXTEND_CONNECTION_COLOR : DEFAULT_CONNECTION_COLOR
                },
                style: {
                    strokeWidth: 3,
                    stroke: node?.data?.extendId === connection ? EXTEND_CONNECTION_COLOR: DEFAULT_CONNECTION_COLOR
                }
            })
        })
    });
    return edges;
}

export const getNodes = (nodes: Node[]) => {
    const newNodes: Node[] = [];

    nodes.forEach((node, index) => {
        const parentNode = node?.data?.extendId ? nodes?.find((n) => n.id === node?.data?.extendId) : null;
        const targetNode = {
            ...node,
            position: {
                x: node?.data?.isParent ? 0 : (NODE_WIDTH * (index + 1)) / 2 + NODE_WIDTH,
                y: NODE_HEIGHT * 3 * (index + 1),
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            data: { ...node?.data, parent: parentNode },
            type: NODE_CUSTOM_TYPE
        } as Node;

        newNodes.push(targetNode);
    });
    return newNodes;
};

export const generateSourceHandlePosition = (id: string, isExtendedConnection: boolean, connection: string) => {
    return isExtendedConnection ? Position.Top : id === connection ? Position.Left : Position.Right
}

export const generateSourceHandleStyles = (isExtendedConnection: boolean, index: number) => {
    return isExtendedConnection ? {
        left: 10 + index * 15,
        right: 'auto'
    } : { top: 10 + index * 15, bottom: 'auto' }
}

