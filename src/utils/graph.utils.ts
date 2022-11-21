import { Edge } from '@reactflow/core/dist/esm/types/edges';
import { Node } from '@reactflow/core/dist/esm/types/nodes';
import { MarkerType } from 'reactflow';
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
                    color: node?.data?.parentId === connection ? EXTEND_CONNECTION_COLOR : DEFAULT_CONNECTION_COLOR
                },
                style: {
                    strokeWidth: 3,
                    stroke: node?.data?.parentId === connection ? EXTEND_CONNECTION_COLOR : DEFAULT_CONNECTION_COLOR
                }
            })
        })
    });
    return edges;
}

export const getNodes = (nodes: Node[]) => {
    const newNodes: Node[] = [];

    nodes.forEach((node, index) => {
        const parentNode = node?.data?.parentId ? nodes?.find((n) => n.id === node?.data?.parentId) : null;
        const childIds = nodes?.filter((n) => n?.data?.parentId === node?.id)?.map((n) => n?.id) ?? null;
        const isZeroXPosition = node?.data?.outputConnections?.filter((con: string) => con !== node?.data?.parentId)?.length > 0;

        // we form arrays of inputs and outputs of nodes from the type of these connections.
        // We define that inherited connection have a top\bottom position, and compositions have a right\left position
        const outputRightConnections = node?.data?.outputConnections?.filter((con: string) => con !== node?.data?.parentId && con !== node?.id);
        const outputLeftConnections = node?.data?.outputConnections?.filter((con: string) => con !== node?.data?.parentId && con === node?.id);

        const outputTopConnections = node?.data?.outputConnections?.filter((con: string) => con === node?.data?.parentId);

        const inputLeftConnections = node?.data?.inputConnections?.filter((con: string) => !childIds?.includes(con));

        const inputBottomConnections = childIds.filter((child: string) => node?.data?.inputConnections?.includes(child));

        const targetNode = {
            ...node,
            position: {
                x: isZeroXPosition ? 0 : (NODE_WIDTH * 2),
                y: NODE_HEIGHT * (isZeroXPosition ? 3 : 2) * (index + 1),
            },
            data: {
                ...node?.data, parent: parentNode, childIds: childIds,
                outputRightConnections, outputLeftConnections,
                outputTopConnections, inputLeftConnections,
                inputBottomConnections
            },
            type: NODE_CUSTOM_TYPE
        } as Node;

        newNodes.push(targetNode);
    });
    return newNodes;
};

