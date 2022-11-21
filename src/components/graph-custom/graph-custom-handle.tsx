import React from 'react';
import { Handle } from 'reactflow';
import { HandleType } from '../../constants/graph.constants';
import { GraphCustomHandleProps } from '../../models/model';

const GraphCustomHandle = ({ connections, type, position, nodeId, parentId }: GraphCustomHandleProps) => {
    return (
        <>
            {connections?.length > 0 && (
                <div className={`graph-handle-style-wrapper ${position}`}>
                    {connections?.map((connection: string) => {
                            const isExtendedConnection = parentId === connection;
                            const selfReference = type === HandleType.Target && connection === nodeId;

                            return (
                                <Handle
                                    className={`graph-handle-style 
                                    ${position} graph-handle-${type} 
                                    ${isExtendedConnection ? 'extended' : ''}
                                    ${selfReference ? 'self-reference' : ''}`}
                                    id={`${nodeId}${connection}`}
                                    type={type}
                                    key={'handle-' + type + nodeId + Math.random()}
                                    position={position}/>)
                        }
                    )}
                </div>
            )}
        </>
    );
};

export default GraphCustomHandle;