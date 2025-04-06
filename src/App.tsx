import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import {useState, useEffect} from 'react'
import { Candidate } from './interfaces/Candidate.interface'


const App: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('savedCandidates');
    if (stored) setSavedCandidates(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  }, [savedCandidates]);
  return (
    <>
      <Nav />
      <main>
        <Outlet context={{savedCandidates, setSavedCandidates}}/>
      </main>
    </>
  );
}

export default App;
