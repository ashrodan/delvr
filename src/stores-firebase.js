import Firebase from './firebase'

export function storesCol() {
    return Firebase
        .firestore()
        .collection('stores')
}