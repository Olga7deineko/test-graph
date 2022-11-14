import { bindActionCreators, compose, Dispatch } from '@reduxjs/toolkit';
import GraphSidebar from '../components/graph-sidebar';
import { setSelectedId } from '../reducers/graph-nodes.reducer';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
    return {
        graphNodes: state?.['graphNodes']?.nodes,
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
)(GraphSidebar);
