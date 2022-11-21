import { bindActionCreators, compose, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import GraphBody from '../components/graph-body';
import { setSelectedId } from '../reducers/graph-nodes.reducer';

const mapStateToProps = (state: any) => {
    return {
        graphNodes: state?.['graphNodes']?.nodes,
        graphEdges: state?.['graphNodes']?.edges,
        selectedId: state?.['graphNodes']?.selectedId
    };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            setSelectedId
        },
        dispatch
    );

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(GraphBody);
