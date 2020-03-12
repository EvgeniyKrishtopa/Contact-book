import React, {Suspense} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/navbar/navbar';
import MainPage from './pages/main';
import Loader from './components/loader/loader';
import NotFound from './pages/404';
import './App.scss';

const Login = React.lazy(() => import('./pages/login'));
const Signup = React.lazy(() => import('./pages/auth'));
//TODO: напиши конфиг для роутинга и через map его тут обходи. Если будет много урлов - компонент слишком большой станет
// Попробуй написать конфиг в формате json, компонент там укажи строкой и придумай как сделать так чтобы с config.json начать рисовать компоненты
const App = () => (
    <Router>
        <Navbar/>
        <Switch>
        <Route exact path="/" render={() => <MainPage/>}/>
        <Route path="/signup" render={() => <Suspense fallback={<Loader/>}><Signup/></Suspense>}/>
        <Route path="/login" render={() => <Suspense fallback={<Loader/>}><Login/></Suspense>}/> 
        <Route component={NotFound}/>
        </Switch>
    </Router>
)

export default App;