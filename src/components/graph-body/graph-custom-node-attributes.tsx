import React from 'react';
import { GraphCustomNodeAttributesProps, NodeDataAttribute } from '../../models/model';
import GraphCustomNodeAttribute from './graph-custom-node-attribute';

const GraphCustomNodeAttributes = ({ attributes, nodeId, updateNode, nodes }: GraphCustomNodeAttributesProps) => {
    const onSetNewValue = (id: string, attributeName: string, attributeValue: string) => {
        updateNode({nodeId, id, attributeName, attributeValue, nodes});
    }

    return (
        <>
            {attributes?.map((attribute: NodeDataAttribute) => (
                <GraphCustomNodeAttribute key={'attribute' + attribute?.label + Math.random()} attribute={attribute} setNewValue={onSetNewValue}/>
            ))}

        </>
    );
};

export default GraphCustomNodeAttributes;