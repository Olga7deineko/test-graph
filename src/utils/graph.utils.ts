import {Edge} from '@reactflow/core/dist/esm/types/edges'
import {Node} from '@reactflow/core/dist/esm/types/nodes'
import {MarkerType} from 'reactflow'
import {
    DEFAULT_CONNECTION_COLOR,
    EDGE_STEP_TYPE,
    EXTEND_CONNECTION_COLOR,
    NODE_CUSTOM_TYPE,
    NODE_HEIGHT,
    NODE_WIDTH,
} from '../constants/graph.constants'

export const prepareData = (data: any) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    createNodeRecursive(data, nodes, edges);
    return {nodes, edges};
}

const createEdgesData = (sourceId: string, targetId: string, acumEdges: Edge[], node?: Node) => {
    if (sourceId && targetId) {
        acumEdges.push({
            id: `e${sourceId}-e${targetId}`,
            source: sourceId,
            target: targetId,
            targetHandle: `${targetId}${sourceId}`,
            sourceHandle: `${sourceId}${targetId}`,
            type: EDGE_STEP_TYPE,
            markerEnd: {
                type: MarkerType.Arrow,
                width: 10,
                height: 10,
                color: node?.data?.parentId === targetId ? EXTEND_CONNECTION_COLOR : DEFAULT_CONNECTION_COLOR,
            },
            style: {
                strokeWidth: 3,
                stroke: node?.data?.parentId === targetId ? EXTEND_CONNECTION_COLOR : DEFAULT_CONNECTION_COLOR,
            },
        })
    }
    return acumEdges;
}

const createNodeRecursive = (data: any, nodes: Node[], edges: Edge[]) : any => {
    const currentNode = createNode(data, nodes);
    if (!currentNode) {
        return;
    }
    if (data.type === 'object') {
        addAttributesForNode(data, nodes, currentNode, edges);
        return currentNode;
    }
    if (data.allOf) {
        for (const allOfElement of data.allOf) {
            const itemLabel = allOfElement.title || allOfElement?.xml?.name;
            if (itemLabel && allOfElement.type === 'object' && data.title) {
                // Create Parent Node
                let parentNode = createNodeRecursive(allOfElement, nodes, edges);
                updateNodeParentId(parentNode?.id, currentNode, nodes);
                parentNode?.id && createEdgesData(currentNode?.id, parentNode?.id, edges, currentNode);
            } else if (allOfElement.type === 'object' && allOfElement.properties && data.title) {
                // Create current node attribute and compose node
                addAttributesForNode(allOfElement, nodes, currentNode, edges);
            }
            if (allOfElement.type === 'object' && allOfElement.title && allOfElement.properties && !data.title) {
                currentNode.data.label = allOfElement.title;
                addAttributesForNode(allOfElement, nodes, currentNode, edges);
            }
            if (allOfElement.type === 'object' && allOfElement?.xml?.name && allOfElement.properties && !data.title) {
                const parentNode = createNodeRecursive(allOfElement, nodes, edges);
                updateNodeParentId(parentNode?.id, currentNode, nodes);
                parentNode?.id && createEdgesData(currentNode?.id, parentNode?.id, edges, currentNode);
                addAttributesForNode(allOfElement, nodes, currentNode, edges);
            }
        }
        return currentNode;
    }
}

const createNode = (data: any, nodes: Node[]) => {
    const generatedId = uniqueFlowId()?.toString();
    const label = data?.title ?? data?.xml?.name;
    const find = nodes.find(n => n.data.label === label);
    if (find) {
        return find;
    }
    const node = {
        id: generatedId,
        data: {
            label: label,
            attributes: [],
            attributesIds: [],
            type: 'object'
        },
        position: {'x': 0, 'y': 0},
    };
    nodes.push(node);
    return node;
}

const addAttributesForNode = (data: any, nodes: Node[], currentNode: Node<any>, edges: Edge[]) => {
    if (data.properties) {
        Object.entries(data.properties)
            .forEach(([key, value]: [string, any]) => {
                if (value.additionalProperties && value.type === 'object') {
                    value.title = currentNode.data.label + ' ' + key;
                    const extNode = createNodeRecursive(value, nodes, edges);
                    addExtNodeAttribute(edges, extNode, nodes, key, value);
                    addNodeAttribute(edges, currentNode, nodes, key, value);
                } else if (value?.type === 'object') {
                    const createdNode = createNodeRecursive(value, nodes, edges);
                    addNodeAttribute(edges, currentNode, nodes, key, value, createdNode?.data.label);
                } else if (value?.type === 'array') {
                    const createdNode = createNodeRecursive(value.items, nodes, edges);
                    addNodeAttribute(edges, currentNode, nodes, key, value, createdNode?.data.label);
                } else if (value?.['oneOf'] && value?.['oneOf'].length > 0) {
                    for (const oneOfElement of value?.['oneOf']) {
                        createNodeRecursive(oneOfElement, nodes, edges);
                    }
                } else {
                    addNodeAttribute(edges, currentNode, nodes, key, value);
                }
            })
    }

}

const addExtNodeAttribute = (edges: Edge[],
                             currentNode: Node,
                             nodes: Node[],
                             key: string,
                             value: any) => {
    if (value.additionalProperties && value.type === 'object') {
        if (value.additionalProperties.type === 'array' &&
            Object.keys(value.additionalProperties.items).length === 1) {
            addNodeAttribute(edges,
                currentNode,
                nodes,
                `[${value.additionalProperties.items.type}]`,
                null,
                `${key}Schema`);
        }
    }
    const connectionData = nodes.find((node) => node?.data?.label.includes(key));

    if (connectionData) {
        createEdgesData(key, connectionData?.id, edges);
    }
    return currentNode
}

const addNodeAttribute = (edges: Edge[],
                          currentNode: Node,
                          nodes: Node[],
                          attributeName: string,
                          attributeValue: any,
                          attributeType?: string) => {
    const attributeId = uniqueFlowId()?.toString();
    const connectionData = nodes.find((node) => node?.data?.label === attributeType);

    if (connectionData) {
        createEdgesData(attributeId, connectionData?.id, edges);
    }

    if (currentNode.data.attributes.find((a: any) => a.label === attributeName)) {
        return currentNode;
    }
    if (currentNode.data.parentId) {
        const parentNode = nodes.find(n => n.id === currentNode.data.parentId);
        if (parentNode?.data.attributes.find((a: any) => a.label === attributeName)) {
            return;
        }
    }
    const attributeData = {
        id: attributeId,
        label: attributeName,
        required: currentNode.data.required?.includes(attributeName),
        value: attributeType ?? attributeValue?.type + ' ' + (attributeValue?.format !== 'undefined' ? attributeValue?.format : ''),
        type: 'attribute',
        attributeParentId: currentNode?.id
    }
    currentNode.data.attributes.push(attributeData);
    currentNode.data.attributesIds.push(attributeId);

    nodes.push({
        id: attributeId,
        data: attributeData,
        position: {'x': 0, 'y': 0},
    });

    return currentNode;
}

const updateNodeParentId = (parentId: any, node: Node, nodes: Node[]) => {
    const find = nodes.find((n) => n.id === node.id);
    if (find) {
        nodes.splice(nodes.indexOf(find), 1);
        find.data.parentId = parentId;
        nodes.push(find);
    }
}

export const uniqueFlowId = () => {
    const array = new Uint32Array(1);
    return crypto.getRandomValues(array)[0];
}

export const prepareEdges = (nodes: Node[]) => {
    const edges: Edge[] = []
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
                    color: node?.data?.parentId === connection ? EXTEND_CONNECTION_COLOR : DEFAULT_CONNECTION_COLOR,
                },
                style: {
                    strokeWidth: 3,
                    stroke: node?.data?.parentId === connection ? EXTEND_CONNECTION_COLOR : DEFAULT_CONNECTION_COLOR,
                },
            })
        })
    })
    return edges
}

export const getNodes = (nodes: Node[], graphEdges?: Edge[]) => {
    const newNodes: Node[] = [];
    let objectIndex = 0;

    nodes.forEach((node) => {
        const parentNode = node?.data?.parentId ? nodes?.find((n) => n.id === node?.data?.parentId) : null;
        const childIds = nodes?.filter((n) => n?.data?.parentId === node?.id)?.map((n) => n?.id) ?? null;
        const isZeroXPosition = objectIndex === 0;

        const sourcetargetEdges = graphEdges?.filter((edge) => edge?.source === node?.id)?.map((edge) => edge?.target);
        const targetsourceEdges = graphEdges?.filter((edge) => edge?.target === node?.id)?.map((edge) => edge?.source);

        // const target2sourceEdges = graphEdges?.filter((edge) => edge?.target === node?.id)?.map((edge) => edge?.target);
        // const source2targetEdges = graphEdges?.filter((edge) => edge?.source === node?.id)?.map((edge) => edge?.source);

        // we form arrays of inputs and outputs of nodes from the type of these connections.
        // We define that inherited connection have a top\bottom position, and compositions have a right\left position
        const outputRightConnections = node?.data?.outputConnections?.filter((con: string) => con !== node?.data?.parentId && con !== node?.id);
        const outputLeftConnections = sourcetargetEdges;

        const outputTopConnections = node?.data?.outputConnections?.filter((con: string) => con === node?.data?.parentId);

        const inputLeftConnections = targetsourceEdges;

        const inputBottomConnections = childIds.filter((child: string) => node?.data?.inputConnections?.includes(child));

        const targetNode = {
            ...node,
            position: {
                x: isZeroXPosition ? 0 : (node?.data?.attributeParentId ? nodes.find((node) => node?.id === node?.data?.attributeParentId)?.position?.x : (NODE_WIDTH * 2)),
                y: NODE_HEIGHT * (isZeroXPosition ? 3 : 2) * (objectIndex + 1),
            },
            data: {
                ...node?.data, parent: parentNode, childIds: childIds,
                outputRightConnections, outputLeftConnections,
                outputTopConnections, inputLeftConnections,
                inputBottomConnections
            },
            type: NODE_CUSTOM_TYPE
        } as Node;
        if(!node?.data?.attributeParentId) objectIndex +=1;
        newNodes.push(targetNode);
    });
    return newNodes;
};

