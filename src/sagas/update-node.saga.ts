import { put, takeEvery } from 'redux-saga/effects';
import { updateNode, updateNodes } from '../reducers/graph-nodes.reducer';

function* updateNodeAsync(action) {
    const { nodeId, id, attributeName, attributeValue, nodes } = action?.payload;
    const copiedNodes = structuredClone(nodes);

    copiedNodes.map((node) => {
        if (node?.id === nodeId) {
            node?.data?.attributes.map((attribute) => {
                if (attribute?.id === id) {
                    attribute[attributeName] = attributeValue;
                }
                return attribute
            })
        }
        return node;
    });

    yield put(updateNodes(copiedNodes))
}


export default function* watchUpdateNode() {
    yield takeEvery(
        updateNode.type,
        updateNodeAsync
    );
}