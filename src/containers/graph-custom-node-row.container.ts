import { compose } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import GraphCustomNodeRow from '../components/graph-custom/graph-custom-node-row';

const mapStateToProps = (state: any) => {
    return {
        nodes: state?.['graphNodes']?.nodes,
        edges: state?.['graphNodes']?.edges,
    };
};


export default compose(
    connect(mapStateToProps,null)
)(GraphCustomNodeRow);
