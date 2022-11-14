import { Node } from '@reactflow/core/dist/esm/types/nodes';
import { MarkerType } from 'reactflow';


// @ts-ignore
export function getEdges(data) {
    // @ts-ignore
    return data?.map((edge) => {
        return {
            ...edge,
            type: 'smart',
            markerEnd: {
                type: MarkerType.Arrow,
                width: 10,
                height: 10,
                color: edge.type === 'extend' ? '#ff8c00' : '#808080'
            },
            style: {
                strokeWidth: 2,
                stroke: edge.type === 'extend' ? '#ff8c00' : '#808080'
            }
        }
    });
}

export function getNodes(data: Node[]) {
    const nodes: Node[] = [];
    data.forEach((node) => {

        const parentNode = node?.data?.extendId ? nodes?.find((n) => n.id === node?.data?.extendId) : null;
        const targetNode = {
            ...node,
            position: {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
            },
            data:{...node?.data, parent: parentNode},
            type: 'custom'
        };

        nodes.push(targetNode);
    });
    return nodes;
}