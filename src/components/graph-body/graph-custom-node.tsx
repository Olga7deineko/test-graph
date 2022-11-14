import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import '../../styles/graph-custom.style.scss';
import GraphCustomNodeAttributes from '../../containers/graph-custom-node-attributes.container';

const GraphCustomNode = memo(({ data, selected, id }: any) => {
    return (
        <div key={data?.title + Math.random()}
             className={`graph-node-wrapper ${selected ? 'selected' : ''}`}>

            <Handle className="graph-handle-extend" type="target"
                    position={Position.Bottom}/>
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
                    {<GraphCustomNodeAttributes attributes={data?.attributes} nodeId={id} />}
                    {data?.extendId && (
                        <div className="graph-node-extend">
                            <div className="graph-node-extend-label">
                                <AccountTreeIcon/>
                                {data?.parent?.data?.label}
                            </div>
                            {<GraphCustomNodeAttributes attributes={data?.parent?.data?.attributes} nodeId={data?.parent?.id} />}
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