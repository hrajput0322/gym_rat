import { useContext, useRef } from "react";
import Logo from "../assets/Logo.png"
import { ExerciseList } from "../store/ExerciseStore";

const Navbar = ({selectedTab, setSelectedTab}) => {
  const {handleSearch} = useContext(ExerciseList);
  const inputElement = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(inputElement.current.value);
    setSelectedTab("SearchExercises");
    inputElement.current.value="";
  }
  return (
    <header className="mb-3 border-bottom bg-dark navbar-container">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            onClick={()=>setSelectedTab("Home")}
            href="#"
            className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
          >
            <img src={Logo} className="logo" alt="logo" />
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li  onClick={()=>setSelectedTab("Home")}>
              <a href="#" className={`nav-link px-2 text-white ${selectedTab==="Home" && "text-decoration-underline"}`}>
                Home
              </a>
            </li>
            <li  onClick={()=>setSelectedTab("SearchExercises")}>
              <a href="#" className={`nav-link px-2 text-white ${selectedTab==="SearchExercises" && "text-decoration-underline"}`}>
                Exercises
              </a>
            </li>
          </ul>

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
            onSubmit={handleSubmit}
          >
            <input
              type="search"
              className="form-control"
              placeholder="Enter Keyword"
              aria-label="Search"
              ref={inputElement}
            />
          </form>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
