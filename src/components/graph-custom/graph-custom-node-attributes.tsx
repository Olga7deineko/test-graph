import React from 'react';
import { GraphCustomNodeAttributesProps, NodeDataAttribute } from '../../models/model';
import GraphCustomNodeAttribute from './graph-custom-node-attribute';

const GraphCustomNodeAttributes = ({ attributes }: GraphCustomNodeAttributesProps) => {
    return (
        <>
            {attributes?.map((attribute: NodeDataAttribute) => (
                <GraphCustomNodeAttribute key={'attribute' + attribute?.label + Math.random()} attribute={attribute}/>
            ))}
        </>
    );
};

export default GraphCustomNodeAttributes;