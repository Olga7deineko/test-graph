import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React from 'react';
import GraphCustomNodeAttributes from '../../containers/graph-custom-node-attributes.container';
import { GraphCustomNodeAccordionProps } from '../../models/model';

const GraphCustomNodeAccordion = ({ selected, data, nodeId }: GraphCustomNodeAccordionProps) => {
    return (
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
                {<GraphCustomNodeAttributes attributes={data?.attributes} nodeId={nodeId}/>}
                {data?.parentId && (
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
    );
};

export default GraphCustomNodeAccordion;