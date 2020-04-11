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
                delivery_postcodes: store_postcodes.split(','),
            })
            .then(() => {
                // TODO: this does not seem to be working!!
                setStoreName('')
                setStorePostcodes('')
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Add Store</h2>
            <div>
                <label>Store Name</label>
                <input type='text' required={true} onChange={e => setStoreName(e.currentTarget.value)} value={store_name} />
            </div>
            <div>
                <label>Postcodes (Separated by commas)</label>
                <input type='text' required={true} onChange={e => setStorePostcodes(e.currentTarget.value)} value={store_postcodes} />
            </div>
            <button>Add Store</button>
        </form>
    )
}

export default AddFormEntry;