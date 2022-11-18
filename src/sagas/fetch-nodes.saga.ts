import { fetchNodes, fetchNodesSucceeded } from '../reducers/graph-nodes.reducer'
import { call, put, takeEvery } from 'redux-saga/effects'
import { getNodes } from '../services/nodes.service';
import { prepareEdges } from '../utils/graph.utils';

function* fetchNodesAsync() {
    // @ts-ignore
    let data = yield call(getNodes);
    data.edges = prepareEdges(data.nodes);
    yield put(fetchNodesSucceeded(data))
}


export default function* watchGetNodesRequest() {
    yield takeEvery(
        fetchNodes.type,
        fetchNodesAsync
    );
}