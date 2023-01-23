import { compose } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import GraphCustomNodeAttributes from '../components/graph-custom/graph-custom-node-attributes';

const mapStateToProps = (state: any) => {
    return {
        nodes: state?.['graphNodes']?.nodes,
        edges: state?.['graphNodes']?.edges,
    };
};

export default compose(
    connect(mapStateToProps,null)
)(GraphCustomNodeAttributes);
