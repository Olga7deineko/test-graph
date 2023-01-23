import React from 'react';
import { Handle, Position } from 'reactflow';
import { HandleType } from '../../constants/graph.constants';

const GraphCustomNodeRow = ({ data }: any) => {
    return (
        <>
            <div className="graph-node-attributes" key={data?.label + Math.random()}>
                <div className="graph-node-attributes-label">
                    {data?.label}
                    {data?.required && <div className="graph-node-attributes-label-required">*</div>}
                </div>

                <div className="graph-node-attributes-value">
                    {data?.value}
                    {data?.sourceId && <Handle
                        id={data?.sourceId}
                        type={HandleType.Source}
                        key={'handle-' + HandleType.Source + Math.random()}
                        position={Position.Right}/>}
                </div>
            </div>
        </>
    );
};

export default GraphCustomNodeRow;