import React, { useState, useEffect } from 'react'
import { storesCol } from '../stores-firebase'

const SORT_OPTIONS = {
    "A-Z": { column: 'name', direction: 'asc' },
    "Postcode": { column: 'delivery_postcodes', direction: 'desc' },
}

function useStores(sortBy = "A-Z") {
    const [store, setStores] = useState([])
    console.log(sortBy);

    useEffect(() => {
        const fb_connection = storesCol()
            .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
            .onSnapshot((snapshot) => {
                const newStores = snapshot.docs.map(doc => ({
                    'id': doc.id,
                    ...doc.data(),
                }))
                console.log(newStores);
                setStores(newStores)
            })

        // unsubs from FB when leaving this component
        return () => fb_connection()

    }, [sortBy])
    return store
}

const searchParams = new URLSearchParams(window.location.search);
const Stores = () => {
    const [sortBy, setStoreSort] = useState('A-Z')
    const stores = useStores(sortBy)
    const isAdmin = searchParams.get('admin-site') == 'true' || false;
    const deleteStore = (id) => (
        storesCol()
            .doc(id)
            .delete()
    )
    return (
        <div>
            <h2>Stores</h2>
            <div>
                <label >Sort By:</label>{' '}
                <select value={sortBy} onChange={e => setStoreSort(e.currentTarget.value)} > >
                    <option>A-Z</option>
                    <option>Postcode</option>
                </select>
            </div>
            <ol>
                {stores.length == 0 ? <li>Loading...</li>
                    : stores.map(store =>
                        <li className='store-entry' key={store.id} >
                            <div>
                                {store.name}
                                <code> {Array.isArray(store.delivery_postcodes) ? store.delivery_postcodes.join(', ') : store.delivery_postcodes}</code>
                                {isAdmin && <span onClick={e => deleteStore(store.id)} style={{ color: "red" }}> X</span>}
                            </div>
                        </li>
                    )}
            </ol>
        </div >
    )
}

export default Stores