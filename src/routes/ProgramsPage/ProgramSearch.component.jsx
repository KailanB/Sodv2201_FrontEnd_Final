import './ProgramsPage.style.css';

const ProgramSearch = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className='programSearch'>
            <input 
                type="text" 
                placeholder="Search Programs..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="standardInput"
            />
            <button className='standardButton'>Search</button>
        </div>
    );
};

export default ProgramSearch;
