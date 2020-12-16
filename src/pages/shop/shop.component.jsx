// import React from 'react';
// import CollectionOverview from "../../components/collections-overview/collections-overview.component";
// import { Route } from "react-router-dom";
// import CollectionPage from "../collection/collection.component";
//
// const ShopPage = ({ match }) => {
//     console.log('SHOP_COMPONENT: ', match)
//     return (
//         <div className='shop-page'>
//             <Route exact path={`${match.path}`} component={CollectionOverview} />
//             <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//         </div>
//     )
// };
//
// export default ShopPage;

import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const ShopPage = ({ match }) => (
    <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
);

export default ShopPage;