import { all, fork } from 'redux-saga/effects'
import watchGetNodesRequest from './fetch-nodes.saga';


export function* rootSaga() {
    yield all([fork(watchGetNodesRequest)])
}

export default rootSaga;