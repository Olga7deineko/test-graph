import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import '../../styles/graph-custom.style.scss';
import GraphCustomNodeAttributes from './graph-custom-node-attributes';

const GraphCustomNode = memo(({ data, ...props }: any) => {

    return (
        <div key={data?.title + Math.random()}
             className={`graph-node-wrapper ${props?.selected ? 'selected' : ''}`}>

            <Handle className="graph-handle-extend" type="target"
                    position={Position.Bottom}/>
            <Accordion
                className="graph-node"
                sx={{
                    bgcolor: '#edf1f5',
                    borderRadius: '4px'
                }}>
                <AccordionSummary
                    className={`graph-node-header ${props?.selected ? 'selected' : ''}`}
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <div className="graph-node-header-wrapper">
                        <div className="graph-node-header-title">{data?.label}</div>
                        <div className="graph-node-header-description">{data?.description}</div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    {GraphCustomNodeAttributes(data?.attributes)}
                    {data?.extendId && (
                        <div className="graph-node-extend">
                            <div className="graph-node-extend-label">
                                <AccountTreeIcon/>
                                {data?.parent?.label}
                            </div>
                            {GraphCustomNodeAttributes(data?.parent?.attributes)}
                        </div>
                    )}
                </AccordionDetails>
            </Accordion>

            <Handle className="graph-handle-source" type="source"
                    position={Position.Right}/>
        </div>
    );
});

export default GraphCustomNode;