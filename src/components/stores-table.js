import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
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
const StoresTable = () => {
    const [sortBy, setStoreSort] = useState('A-Z')
    const stores = useStores(sortBy)
    const isAdmin = searchParams.get('admin-site') == 'true' || false;
    const deleteStore = ({ lookup }) => {
        if (!isAdmin) return false
        // TODO: support multi lookups
        storesCol()
            .doc(stores[Object.keys(lookup)[0]].id)
            .delete()

    }
    // https://github.com/gregnb/mui-datatables
    const columns = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "delivery_postcodes",
            label: "postcodes",
            options: {
                filter: true,
                sort: false,
                display: 'excluded'
            }
        },
    ];
    return (
        <div>
            {stores.length > 0 ?
                <MUIDataTable
                    title='stores'
                    data={stores}
                    columns={columns}

                    options={{
                        searchOpen: true,
                        download: false,
                        print: false,
                        viewColumns: false,
                        onRowsDelete: deleteStore,
                    }}
                />
                : <div >Loading store list...</div>
            }
        </div >
    )
}

export default StoresTable