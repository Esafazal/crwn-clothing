import React from "react";
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from '../src/pages/shop/shop.component';
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignOutPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";

import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";

import './App.css';


class App extends React.Component {

    unsubscribeFromAuth = null

    componentDidMount() {

        const {setCurrentUser} = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

            // this.setState({currentUser: userAuth});

            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    });
                });
            } else {
                setCurrentUser(userAuth);
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/shop' component={ShopPage}/>
                    <Route exact path='/checkout' component={CheckoutPage} />
                    {/* calling render method instead of component inorder to
                        parse JS code to find out if user is logged in and redirect to home*/}
                    <Route
                        exact
                        path='/signin'
                        render={() => this.props.currentUser
                                ? (<Redirect to='/'/>)
                                : (<SignInAndSignOutPage/>)}
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
