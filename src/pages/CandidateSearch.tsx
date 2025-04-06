import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import githublogo from '../assets/githublogo.webp'

type ContextType = {
  savedCandidates: Candidate[];
  setSavedCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>
}

const CandidateSearch = () => {
  const {savedCandidates, setSavedCandidates} = useOutletContext<ContextType>();
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCandidate = async () => {
      setLoading(true);
      const users = await searchGithub();
      setCandidates(users)
      if(users.length > 0) {
        const username = users[0].login;
        const data = await searchGithubUser(username);
        setCandidate(data);
      } else {
        setCandidate(null);
      }
      setLoading(false);
    };

    fetchCandidate();
  }, []);

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if(currentIndex < candidates.length - 1) {
      //Move to the next candidate in the array
      setCurrentIndex(currentIndex + 1);
      const username = candidates[currentIndex + 1].login;
      const data = await searchGithubUser(username);
      setCandidate(data)
    } else {
      //Fetch a new list of candidates when the array ends
      const users = await searchGithub();
      setSavedCandidates(users);
      setCurrentIndex(0);
      if (users.length > 0) {
        const username = users[0].login;
        const data = await searchGithubUser(username);
        setCandidate(data);
      } else {
        setCandidate(null);
      }
    }
  }

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if(candidate){
      const alreadySaved = savedCandidates.some(c => c.login === candidate.login);
      if(!alreadySaved){
        setSavedCandidates((prevCandidates) => [...prevCandidates, candidate]);
      }

      // Check if there are more candidates in the array
      if (currentIndex < candidates.length - 1) {
        // Move to the next candidate
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        const username = candidates[nextIndex].login;
        searchGithubUser(username).then((data) => setCandidate(data));
      } else {
        // Fetch a new list of candidates if the array ends
        searchGithub().then((users) => {
          setCandidates(users);
          setCurrentIndex(0);
          if (users.length > 0) {
            const username = users[0].login;
            searchGithubUser(username).then((data) => setCandidate(data));
          } else {
            setCandidate(null);
          }
        });
      }
    }
    
  };

  if (loading) return <p>Loading...</p>;
  if (!candidate) return <p>No candidate found.</p>;
  console.log(candidate)
  return (
    <div>
      <h1>CandidateSearch</h1>
      <div className='candidate-search'>
        <img src={candidate.avatar_url || githublogo} alt={`${candidate.login}'s avatar`} />
        <h2>{candidate.login || "Unknown User"}</h2>
        <p>Location: {candidate.location || "Not Available"}</p>
        <p>Email: {candidate.email || "Not Available"}</p>
        <p>Company: {candidate.company || "Not Available"}</p>
        <p>Bio: {candidate.bio || "Not Available"}</p>
      </div>
      <div className='button-container'>
        <button className='button-circle button-next' onClick={handleNext}>-</button>
        <button className='button-circle button-add' onClick={handleAdd}>+</button>
      </div>
      
    </div>
  )
  ;
};

export default CandidateSearch;
