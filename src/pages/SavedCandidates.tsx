
import { Candidate } from '../interfaces/Candidate.interface';
import githublogo from '../assets/githublogo.webp'
import { useOutletContext } from 'react-router-dom';


type ContextType = {
  savedCandidates: Candidate[];
  setSavedCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
}

const SavedCandidates = () => {
  
  const {savedCandidates, setSavedCandidates} = useOutletContext<ContextType>()


  const handleDelete = (login:string) => { 
      const updatedCandidates = savedCandidates.filter((candidate) => candidate.login !== login);
      setSavedCandidates(updatedCandidates)
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <table>
        <thead>
          <th>Image</th>
          <th>Name</th>
          <th>Location</th>
          <th>Email</th>
          <th>Company</th>
          <th>Bio</th>
          <th>Reject</th>
        </thead>
        <tbody>
        {savedCandidates.map((candidate) => (
          <tr key={candidate.login}>
            <td>
              <img 
              src={candidate.avatar_url || githublogo} 
              alt="" 
              className='potential-img'
              />
            </td>
            <td>{candidate.login}</td>
            <td>{candidate.location || "Not Available"}</td>
            <td>{candidate.email || "Not Available"}</td>
            <td>{candidate.company || "Not Available"}</td>
            <td>{candidate.bio || "Not Available"}</td>
            <td>
              <button className='button-circle button-next' onClick={()=>handleDelete(candidate.login)}>
                -
                </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
