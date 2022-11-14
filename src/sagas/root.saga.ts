import { all, fork } from 'redux-saga/effects'
import watchGetNodesRequest from './fetch-nodes.saga';
import watchUpdateNode from './update-node.saga';


export function* rootSaga() {
    yield all([fork(watchGetNodesRequest), fork(watchUpdateNode)])
}

export default rootSaga;