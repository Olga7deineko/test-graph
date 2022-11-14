import React from 'react';
import { NodeDataAttribute } from '../../models/model';

const GraphCustomNodeAttributes = (arr: NodeDataAttribute[]) => {
    return arr?.map((obj) => (
        <div className="graph-node-attributes" key={obj?.label + Math.random()}>
            <div className="graph-node-attributes-label">
                {obj?.label}
                {obj?.required && <div className="graph-node-attributes-label-required">*</div>}
            </div>

            <div className="graph-node-attributes-value">
                {obj?.value}
            </div>
        </div>
    ));
};

export default GraphCustomNodeAttributes;