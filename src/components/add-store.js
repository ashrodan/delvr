import React, { useState } from 'react'
import Firebase from '../firebase'

const AddFormEntry = () => {
    const [store_name, setStoreName] = useState('')
    const [store_postcodes, setStorePostcodes] = useState('')
    const [store_url, setStoreUrl] = useState('')
    const [store_cat, setStoreCat] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        Firebase
            .firestore()
            .collection('stores')
            .add({
                name: store_name,
                delivery_postcodes: store_postcodes.split(','),
                store_url: store_url,
                store_cat: store_cat,
            })
            .then(() => {
                // TODO: this does not seem to be working!!
                setStoreName('')
                setStorePostcodes('')
                setStoreUrl('')
                setStoreCat('')
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
            <div>
                <label>Image Url</label>
                <input type='text' required={true} onChange={e => setStoreUrl(e.currentTarget.value)} value={store_url} />
            </div>
            <div>
                <label>Category</label>
                <input type='text' required={true} onChange={e => setStoreCat(e.currentTarget.value)} value={store_cat} />
            </div>
            <button>Add Store</button>
        </form>
    )
}

export default AddFormEntry;