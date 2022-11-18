import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import GraphCustomNodeAttributes from '../../containers/graph-custom-node-attributes.container';
import '../../styles/graph-custom.style.scss';
import { generateSourceHandlePosition, generateSourceHandleStyles } from '../../utils/graph.utils';

const GraphCustomNode = memo(({ data, selected, id }: any) => {

    return (
        <div key={data?.title + Math.random()}
             className={`graph-node-wrapper ${selected ? 'selected' : ''}`}>
            <div style={{ width: '100%' }}>
                {data?.inputConnections?.map((connection: string, index: number) => (
                    <Handle className="graph-handle-target" id={`${id}${connection}`} type="target"
                            key={'handle-target' + id + Math.random()}
                            style={{ left: 10 + index * 15, right: 'auto' }}
                            position={Position.Bottom}/>))}
            </div>
            <Accordion
                className="graph-node"
                sx={{
                    bgcolor: '#edf1f5',
                    borderRadius: '4px'
                }}>
                <AccordionSummary
                    className={`graph-node-header ${selected ? 'selected' : ''}`}
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <div className="graph-node-header-wrapper">
                        <div className="graph-node-header-title">{data?.label}</div>
                        <div className="graph-node-header-description">{data?.description}</div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    {<GraphCustomNodeAttributes attributes={data?.attributes} nodeId={id}/>}
                    {data?.extendId && (
                        <div className="graph-node-extend">
                            <div className="graph-node-extend-label">
                                <AccountTreeIcon/>
                                {data?.parent?.data?.label}
                            </div>
                            {<GraphCustomNodeAttributes attributes={data?.parent?.data?.attributes}
                                                        nodeId={data?.parent?.id}/>}
                        </div>
                    )}
                </AccordionDetails>
            </Accordion>
            {data?.outputConnections?.map((connection: string, index: number) => {
                const isExtendedConnection = data?.extendId === connection;
                return (
                <Handle className={`graph-handle-source ${ isExtendedConnection ? 'extended' : ''}`}
                        id={`${id}${connection}`} type="source"
                        key={'handle-source' + id + Math.random()}
                        style={generateSourceHandleStyles(isExtendedConnection, index)}
                        position={generateSourceHandlePosition(id, isExtendedConnection, connection)}/>)})}
        </div>
    );
});

export default GraphCustomNode;