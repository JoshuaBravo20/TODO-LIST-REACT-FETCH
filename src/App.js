import "./App.css";
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import Task from './components/Task';

function App() {
  return <>
    <div className='container'>
    <Header />
    <MainContainer />
    </div>
    </>;
}

export default App;
