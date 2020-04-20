import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
// import tileData from './tileData';
import { storesCol } from '../stores-firebase'
import default_shop_icon from './default_shop_icon.png'


import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import StoreInfoModal from './store-info-modal';

const SORT_OPTIONS = {
    "A-Z": { column: 'name', direction: 'asc' },
    "Postcode": { column: 'delivery_postcodes', direction: 'desc' },
}

let filter = []
// function onlyUnique(value, index, self) {
//     return self.indexOf(value) === index;
// }
function useStores(store_cat_filter) {
    // filter = filter.filter(onlyUnique)
    // if (store_cat_filter != undefined) {
    //     if (filter.includes(store_cat_filter)) {
    //         filter.pop(store_cat_filter)
    //     } else {
    //         debugger
    //         filter.push(store_cat_filter)
    //     }
    // }
    const [store, setStores] = useState([])

    useEffect(() => {
        const fb_connection = storesCol()
            .orderBy(SORT_OPTIONS['A-Z'].column, SORT_OPTIONS['A-Z'].direction)
            .onSnapshot((snapshot) => {
                let newStores = snapshot.docs.map(doc => ({
                    'id': doc.id,
                    ...doc.data(),
                })).filter(e => filter.length > 0 ? filter.includes(e.store_cat) : e)
                setStores(newStores)
            })

        // unsubs from FB when leaving this component
        return () => fb_connection()

    }, [store_cat_filter])
    return store
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        // height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.64)',
    },
}));


export default function TitlebarGridList() {
    const [store_cat_filter, setStoreSort] = useState()
    const [open_store_info, setStoreInfoModal] = useState(false)
    const stores = useStores(store_cat_filter)

    const classes = useStyles();
    return (
        <div>
            {/* filter checkbox */}
            {/* <FormControlLabel
                control={<Checkbox
                    checked={filter.includes('Bakery')}
                    onChange={() => setStoreSort('Bakery')}
                    name="checkedA"
                />}
                label="Bakery"
            /> */}
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList} cols={window.innerHeight < 1300 ? 2 : 4}>
                    {stores.map((store) => (
                        <GridListTile key={store.name} cols={1}>
                            <img src={store.img || default_shop_icon} alt={store.name} />
                            <GridListTileBar
                                title={store.name}
                                subtitle={<span>{store.store_cat}</span>}
                                actionIcon={
                                    <IconButton
                                        aria-label={`info about ${store.name}`}
                                        className={classes.icon}
                                        onClick={() => setStoreInfoModal(store)}
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div >
            {
                // Store Model setup
                open_store_info &&
                <StoreInfoModal
                    open_state={!!open_store_info}
                    store_info={open_store_info}
                    handle_close={() => setStoreInfoModal(null)}
                />}
        </div >
    );
}