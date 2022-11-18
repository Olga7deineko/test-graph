import { bindActionCreators, compose, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import Graph from '../components/graph';
import { fetchNodes } from '../reducers/graph-nodes.reducer';

const mapStateToProps = (state: any) => {
    return {
        nodes: state?.['graphNodes']?.nodes
    };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetchGraphNodes: fetchNodes
        },
        dispatch
    );

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Graph);
