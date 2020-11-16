
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import {Switch, Route} from 'react-router-dom'
import ShopPage from '../src/pages/shop/shop.component'
import Header from "./components/header/header.component";
import React from "react";
import SignInAndSignOutPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth } from "./firebase/firebase.utils";
import { createUserProfileDocument } from "./firebase/firebase.utils";


class App extends React.Component{

    constructor() {
        super();

        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null

    componentDidMount() {
       this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

           // this.setState({currentUser: userAuth});

           if(userAuth){
               const userRef = await createUserProfileDocument(userAuth);

               userRef.onSnapshot(snapshot => {
                   this.setState({
                       currentUser: {
                           id: snapshot.id,
                           ...snapshot.data()
                       }
                   });
               });
           } else{
               this.setState({currentUser: userAuth});
           }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                {/*<Header currentUser={this.state.currentUser}/>*/}
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/shop' component={ShopPage}/>
                    <Route exact path='/signin' component={SignInAndSignOutPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
