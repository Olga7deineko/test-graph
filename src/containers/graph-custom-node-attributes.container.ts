import { bindActionCreators, compose, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import GraphCustomNodeAttributes from '../components/graph-body/graph-custom-node-attributes';
import { updateNode } from '../reducers/graph-nodes.reducer';

const mapStateToProps = (state: any) => {
    return {
        nodes: state?.['graphNodes']?.nodes
    };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            updateNode
        },
        dispatch
    );

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(GraphCustomNodeAttributes);
