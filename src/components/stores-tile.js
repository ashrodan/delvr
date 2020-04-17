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

const SORT_OPTIONS = {
    "A-Z": { column: 'name', direction: 'asc' },
    "Postcode": { column: 'delivery_postcodes', direction: 'desc' },
}

function useStores(sortBy = "A-Z", store_cat_filter) {
    const [store, setStores] = useState([])
    console.log(sortBy);

    useEffect(() => {
        const fb_connection = storesCol()
            .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
            .onSnapshot((snapshot) => {
                let newStores = snapshot.docs.map(doc => ({
                    'id': doc.id,
                    ...doc.data(),
                })).filter(e => store_cat_filter ? (e.store_cat == 'Bakery') : e)
                console.log(newStores);
                setStores(newStores)
            })

        // unsubs from FB when leaving this component
        return () => fb_connection()

    }, [sortBy])
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
        width: 1000,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.64)',
    },
}));


export default function TitlebarGridList() {
    const [sortBy, setStoreSort] = useState('A-Z')
    const stores = useStores(sortBy)

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>

                {stores.map((store) => (
                    <GridListTile key={store.name} cols={.5}>
                        <img src={store.store_url || default_shop_icon} alt={store.name} />
                        <GridListTileBar
                            title={store.name}
                            subtitle={<span>{store.store_cat}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${store.name}`} className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}