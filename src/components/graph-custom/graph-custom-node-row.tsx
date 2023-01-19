import React from 'react';
import { Handle, Position } from 'reactflow';
import { HandleType } from '../../constants/graph.constants';
import { GraphCustomNodeRowProps } from '../../models/model';

const GraphCustomNodeRow = ({ nodes, edges, nodeId }: GraphCustomNodeRowProps) => {
    const nodeAttributes = nodes.filter((node) => node?.data?.attributeParentId === nodeId);
    return (
        <>{nodeAttributes?.length > 0 && nodeAttributes.map((node) => {
            const isOutputConnection = edges?.find((edge) => edge.target === node.id || edge.source === node.id)

            return (
                <div className="graph-node-attributes" key={node?.data?.label + Math.random()}>
                    <div className="graph-node-attributes-label">
                        {node?.data?.label}
                        {node?.data?.required && <div className="graph-node-attributes-label-required">*</div>}
                    </div>

                    <div className="graph-node-attributes-value">
                        {node?.data?.value}
                        {isOutputConnection && <div>
                            <Handle
                                id={`${isOutputConnection?.source}${isOutputConnection?.target}`}
                                type={HandleType.Source}
                                key={'handle-' + HandleType.Source + isOutputConnection.target + Math.random()}
                                position={Position.Right}/>
                        </div>}
                    </div>
                </div>
            )}
        )
        }
        </>
    );
};

export default GraphCustomNodeRow;