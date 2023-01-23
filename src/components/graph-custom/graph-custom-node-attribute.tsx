import React from 'react';
import { GraphCustomNodeAttributeProps } from '../../models/model';

const GraphCustomNodeAttribute = ({ attribute }: GraphCustomNodeAttributeProps) => {

    return (
        <div className="graph-node-attributes" key={attribute?.label + Math.random()}>
            <div className="graph-node-attributes-label">
                {attribute?.label}
                {attribute?.required && <div className="graph-node-attributes-label-required">*</div>}
            </div>

            <div className="graph-node-attributes-value">
                {attribute?.value}
            </div>
        </div>);
};

export default GraphCustomNodeAttribute;