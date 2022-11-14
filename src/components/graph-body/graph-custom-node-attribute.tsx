import React, { useState } from 'react';
import { GraphCustomNodeAttributeProps } from '../../models/model';
import GraphChangeAttribute from './graph-change-attribute';

const GraphCustomNodeAttribute = ({ attribute, setNewValue }: GraphCustomNodeAttributeProps) => {
    const [open, setOpen] = useState(false);
    const [isAttribute, setIsAttribute] = useState(false);
    const [inputValue, setInputValue] = useState<string>();

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
        if(value){
            setNewValue(attribute?.id, isAttribute ? 'label': 'value', value)
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
                <GraphChangeAttribute open={open} setNewValue={onSetNewValue} defaultInputValue={inputValue} isAttribute={isAttribute}/>}
        </div>);
};

export default GraphCustomNodeAttribute;