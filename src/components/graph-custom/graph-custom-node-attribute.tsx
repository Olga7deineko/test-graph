import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { HandleType } from '../../constants/graph.constants';
import { GraphCustomNodeAttributeProps } from '../../models/model';
import GraphChangeAttribute from './graph-change-attribute';

const GraphCustomNodeAttribute = ({ attribute, setNewValue, edges }: GraphCustomNodeAttributeProps) => {
    const [open, setOpen] = useState(false);
    const [isAttribute, setIsAttribute] = useState(false);
    const [inputValue, setInputValue] = useState<string>();
    const isOutputConnection = edges?.find((edge) => edge.target === attribute.id || edge.source === attribute.id)

    const handleChangeAttribute = () => {
        setOpen(true);
        setIsAttribute(true);
        setInputValue(attribute?.label)
    };

    const handleChangeAttributeValue = () => {
        setOpen(true);
        setIsAttribute(false);
        setInputValue(attribute?.value)
    };

    const onSetNewValue = (value?: string) => {
        setOpen(false);
        if (value) {
            setNewValue(attribute?.id, isAttribute ? 'label' : 'value', value)
        }
    };

    return (
        <div className="graph-node-attributes" key={attribute?.label + Math.random()}>
            <div className="graph-node-attributes-label" onClick={handleChangeAttribute}>
                {attribute?.label}
                {attribute?.required && <div className="graph-node-attributes-label-required">*</div>}
            </div>

            <div className="graph-node-attributes-value" onClick={handleChangeAttributeValue}>
                {attribute?.value}
            </div>

            {open &&
                <GraphChangeAttribute open={open} setNewValue={onSetNewValue} defaultInputValue={inputValue}
                                      isAttribute={isAttribute}/>}
            {isOutputConnection && <div className={`graph-handle-style-wrapper right`}>
                <Handle
                    className={`graph-handle-style 
                                   right graph-handle-${HandleType.Source}`}
                    id={`${isOutputConnection?.source}${isOutputConnection?.target}`}
                    type={HandleType.Source}
                    key={'handle-' + HandleType.Source + isOutputConnection.target + Math.random()}
                    position={Position.Right}/>
            </div>}
        </div>);
};

export default GraphCustomNodeAttribute;