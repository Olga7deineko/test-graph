import React from 'react';
import { Position } from 'reactflow';
import { HandleType } from '../../constants/graph.constants';
import GraphCustomHandle from './graph-custom-handle';
import GraphCustomNodeAccordion from './graph-custom-node-accordion';


const GraphCustomNode = ({ data, selected, id }: any) => {

    return (
        <div key={data?.title + Math.random()}
             className={`graph-node-wrapper ${selected ? 'selected' : ''}`}>
            <GraphCustomHandle
                connections={data?.inputLeftConnections}
                type={HandleType.Target}
                position={Position.Left}
                nodeId={id}
            />
            <GraphCustomHandle
                connections={data?.inputBottomConnections}
                type={HandleType.Target}
                position={Position.Bottom}
                nodeId={id}
            />
             <GraphCustomNodeAccordion selected={selected} data={data} nodeId={id}/>
            <GraphCustomHandle
                connections={data?.outputRightConnections}
                type={HandleType.Source}
                position={Position.Right}
                parentId={data?.parentId}
                nodeId={id}
            />
            <GraphCustomHandle
                connections={data?.outputLeftConnections}
                type={HandleType.Source}
                position={Position.Left}
                parentId={data?.parentId}
                nodeId={id}
            />
            <GraphCustomHandle
                connections={data?.outputTopConnections}
                type={HandleType.Source}
                position={Position.Top}
                parentId={data?.parentId}
                nodeId={id}
            />
        </div>
    );
};

export default GraphCustomNode;