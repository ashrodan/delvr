import React, { useState } from 'react'
import Firebase from '../firebase'

const AddFormEntry = () => {
    const [store_name, setStoreName] = useState('')
    const [store_postcodes, setStorePostcodes] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        Firebase
            .firestore()
            .collection('stores')
            .add({
                name: store_name,
                delivery_postcodes: store_postcodes,
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Add Store</h2>
            <div>
                <label>Store Name</label>
                <input type='text' onChange={e => setStoreName(e.currentTarget.value)} />
            </div>
            <div>
                <label>Postcode</label>
                <input type='text' onChange={e => setStorePostcodes(e.currentTarget.value)} />
            </div>
            <button>Add Store</button>
        </form>
    )
}

export default AddFormEntry;