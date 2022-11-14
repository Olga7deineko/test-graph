import { Node } from '@reactflow/core/dist/esm/types/nodes';
import { put, takeEvery } from 'redux-saga/effects';
import { updateNode, updateNodes } from '../reducers/graph-nodes.reducer';

function* updateNodeAsync(action: any) {
    const { nodeId, id, attributeName, attributeValue, nodes } = action?.payload;
    const copiedNodes = structuredClone(nodes);

    copiedNodes.map((node: Node) => {
        if (node?.id === nodeId) {
            node?.data?.attributes.map((attribute: any) => {
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