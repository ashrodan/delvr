import React, { useState, useEffect } from 'react'
import Firebase from '../firebase'

function useStores() {
    const [store, setStores] = useState([])
    useEffect(() => {
        Firebase
            .firestore()
            .collection('stores')
            .onSnapshot((snapshot) => {
                const newStores = snapshot.docs.map(doc => ({
                    'id': doc.id,
                    ...doc.data(),
                }))
                console.log(newStores);
                setStores(newStores)
            })
    }, [])
    return store
}

const Stores = () => {
    const stores = useStores()
    return (
        <div>
            <h2>stores</h2>
            <div>
                <label>Sort By:</label>{' '}
                <select>
                    <option>Postcode</option>
                    <option>A-Z</option>
                </select>
            </div>
            <ol>
                {stores.map(store =>
                    <li className='store-entry' key={store.id} >
                        <div>
                            {store.name}
                            <code>{store.delivery_postcodes}</code>
                        </div>
                    </li>
                )}
            </ol>
        </div>
    )
}

export default Stores