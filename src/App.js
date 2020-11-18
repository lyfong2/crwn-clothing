import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';


class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount(){

    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()            
          })
        });
      } else {
        setCurrentUser(userAuth); 
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          {/* 設path='/' 就是設定首頁的初始頁面 */}
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact patch='/signin' 
                  render={
                    () => this.props.currentUser 
                    ? (<Redirect to='/' />)
                    : (<SignInAndSignUpPage/>)} 
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
}) 

// using the second argument to connect
export default connect(mapStateToProps, mapDispatchToProps)(App);



/** 
 * connect(mapStateToProps, mapDispatchToProps)(要被使用的component)
 * 
 * mapStateToProps:
 * mapDispatchToProps:
 */