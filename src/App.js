import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter/Counter'
import Controllers from './components/Controllers/Controllers';
import RobotList from './components/RobotList/RobotList';
import SearchField from './components/SearchField/SearchField';

import { useState, useEffect } from 'react'
import { URL } from './constants';

function App() {
  const [count, setCount] = useState(1)
  const plus = () => setCount(count + 1)
  const minus = () => setCount(count - 1)

  const [robots, setRobots] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const [searchField, setSearchField] = useState('')

  const searchHandler = (e) => {
    setSearchField(e.target.value)
  }

  useEffect(function() {
    async function fetchRobots() {
      let response = await fetch(URL)
      let robots = await response.json()
      setRobots(robots)
    }

    fetchRobots()
      .catch(error => setError(error))
      .finally(() => {
        setLoading(false)
      })
      
  }, [URL])

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase()) ||
           robot.username.toLowerCase().includes(searchField.toLowerCase()) ||
           robot.email.toLowerCase().includes(searchField.toLowerCase())
  })
    
  return (
  <div className="App">
    <header className="App-header">
      <SearchField onChange={searchHandler} />
    </header>
    <main className="App-main">
      {
        loading ? <h1>Загрузка</h1> :
        error ? <h1>Что-то пошло не так</h1> :
        <RobotList robots={filteredRobots} /> 
      }
      <div className='counts'>
        <Counter count={ count } />
        <Controllers plus={plus} minus={minus} />
      </div>
    </main>
  </div>
  );
}

export default App;
