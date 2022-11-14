import { bindActionCreators, compose, Dispatch } from '@reduxjs/toolkit';
import { fetchNodes, setSelectedId } from '../reducers/graph-nodes.reducer';
import GraphBody from '../components/graph-body/graph-body';
import { connect } from 'react-redux';

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
            fetchGraphNodes: fetchNodes,
            setSelectedId
        },
        dispatch
    );

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(GraphBody);
