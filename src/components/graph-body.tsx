import { Node } from '@reactflow/core/dist/esm/types/nodes';
import React, { MouseEvent as ReactMouseEvent, useCallback, useEffect } from 'react';
import {
    addEdge,
    Background,
    Connection,
    Edge,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { GraphBodeProps } from '../models/model';
import { getNodes } from '../utils/graph.utils';
import GraphCustomNode from './graph-custom/graph-custom-node';

const nodeTypes = {
    custom: GraphCustomNode
};

const GraphBody = ({
                       graphNodes,
                       graphEdges,
                       selectedId,
                       setSelectedId
                   }: GraphBodeProps): any => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback(
        (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    useEffect(() => {
        if (graphNodes?.length && graphEdges?.length) {
            setNodes(getNodes(graphNodes));
            setEdges(graphEdges);
        }
    }, [graphNodes]);

    useEffect(() => {
        if (selectedId && graphNodes.length) {
            setNodes((nds) => nds?.map((node) => {
                node.selected = node?.id === selectedId;
                return node;
            }));
        }
    }, [selectedId, graphNodes, setNodes])

    const handleElementClick = (event: ReactMouseEvent, node: Node) => {
        setSelectedId(node?.id);
    };


    return nodes?.length > 0 && (
        <div style={{ width: '100%', height: '100vh' }}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={handleElementClick}
                    fitView
                    nodeTypes={nodeTypes}
                >
                    <Background color="#aaa" gap={16}/>
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
};

export default GraphBody;