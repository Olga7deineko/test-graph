import React from 'react';
import { GraphCustomNodeRowProps } from '../../models/model';

const GraphCustomNodeRow = ({ nodes, edges, nodeId }: GraphCustomNodeRowProps) => {
    const nodeAttributes = nodes.filter((node) => node?.data?.attributeParentId === nodeId);
    return (
        <>{nodeAttributes?.length > 0 && nodeAttributes.map((node) => (
                <div className="graph-node-attributes" key={node?.data?.label + Math.random()}>
                    <div className="graph-node-attributes-label">
                        {node?.data?.label}
                        {node?.data?.required && <div className="graph-node-attributes-label-required">*</div>}
                    </div>

                    <div className="graph-node-attributes-value">
                        {node?.data?.value}
                    </div>
                </div>
            )
        )
        }
        </>
    );
};

export default GraphCustomNodeRow;