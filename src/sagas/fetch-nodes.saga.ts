import { fetchNodes, fetchNodesSucceeded } from '../reducers/graph-nodes.reducer'
import { call, put, takeEvery } from 'redux-saga/effects'
import { getNodes } from '../services/nodes.service';

function* fetchNodesAsync() {
    // @ts-ignore
    const data = yield call(getNodes);
    yield put(fetchNodesSucceeded(data))
}


export default function* watchGetNodesRequest() {
    yield takeEvery(
        fetchNodes.type,
        fetchNodesAsync
    );
}