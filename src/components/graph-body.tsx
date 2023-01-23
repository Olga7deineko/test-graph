import { Node } from '@reactflow/core/dist/esm/types/nodes';
import React, { MouseEvent as ReactMouseEvent, useEffect, useMemo } from 'react';
import { Background, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { GraphBodeProps } from '../models/model';
import { getNodes } from '../utils/graph.utils';
import GraphCustomNode from './graph-custom/graph-custom-node';

const GraphBody = ({
                       graphNodes,
                       graphEdges,
                       selectedId,
                       setSelectedId
                   }: GraphBodeProps): any => {
    const nodeTypes = useMemo(() => ({ custom: GraphCustomNode}), []);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        if (graphNodes?.length) {
            setNodes(getNodes(graphNodes, graphEdges));
        }
        console.log('graphEdges', graphEdges, getNodes(graphNodes));
        if (graphEdges?.length) {
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
