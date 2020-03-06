import React, {Suspense} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/navbar/navbar';
import MainPage from './pages/main';
import Loader from './components/loader/loader';
import './App.scss';

const Login = React.lazy(() => import('./pages/login'));
const Signup = React.lazy(() => import('./pages/auth'));

const App = () => (
    <Router>
        <Navbar/>
        <Route path="/signup" render={() => <Suspense fallback={<Loader/>}><Signup/></Suspense>}/>
        <Route path="/login" render={() => <Suspense fallback={<Loader/>}><Login/></Suspense>}/>
        <Route exact path="/" render={() => <Suspense fallback={<Loader/>}><MainPage/></Suspense>}/>
    </Router>
)

export default App;