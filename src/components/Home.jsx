import Banner from "../assets/Banner.png";

const Home = ({ setSelectedTab }) => {
  return (
    <div className="container my-5">
      <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
        <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis">
            Yeah Buddy,
            <br />
            LIGHT WEIGHT!!!
          </h1>
          <p className="lead">
            Welcome to Gym Rat, your ultimate fitness resource! Easily search
            for exercises and discover the correct form and posture with our
            user-friendly platform. Whether you are a beginner or seasoned
            enthusiast, Gym Rat is here to guide you on your journey to a
            healthier, stronger you. Get ready to elevate your fitness game with
            precise information at your fingertips!
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
            <a href="#">
              <button
                type="button"
                className="btn btn-dark btn-lg px-4"
                onClick={() => setSelectedTab("SearchExercises")}
              >
                Exercises
              </button>
            </a>
          </div>
        </div>
        <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <img className="rounded-lg-3" src={Banner} alt="" width="720" />
        </div>
      </div>
    </div>
  );
};

export default Home;
