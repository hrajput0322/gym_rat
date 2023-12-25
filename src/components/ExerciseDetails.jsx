import { useContext } from "react";
import { ExerciseList } from "../store/ExerciseStore";

const ExerciseDetails = ({ card }) => {
  const { exerciseVideos } = useContext(ExerciseList);
  return (
    <>
      <div id="exercise-details" className="container col-xxl-8 px-4 py-5">
        <h1
          className="fw-bold text-body-emphasis text-decoration-underline"
          style={{ textAlign: "center" }}
        >
          Exercise Details
        </h1>
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={card.gifUrl}
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              {card.name}
            </h1>
            <p className="lead">{card.instructions}</p>
            <span class="badge rounded-pill text-bg-dark m-1">{card.target}</span>
            {card.secondaryMuscles.map((item)=><span className="badge rounded-pill text-bg-dark m-1">{item}</span>)}
          </div>
        </div>
      </div>
      <h1
        className="fw-bold text-body-emphasis text-decoration-underline"
        style={{ textAlign: "center" }}
      >
        Watch Related YouTube Videos
      </h1>
      <div style={{ textAlign: "center", display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {exerciseVideos?.slice(0, 6)?.map((item, index) => (
          <div className="exercise-video">
            <a
              key={index}
              href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
              target="_blank"
              rel="noreferrer"
              style={{textDecoration: "none", color: "black"}}
            >
              <div>
                <img
                  style={{
                    borderTopLeftRadius: "20px",
                    margin: "20px",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    height: "200px",
                    width: "400px",
                  }}
                  src={item.video.thumbnails[0].url}
                  alt={item.video.title}
                />
                <p style={{ textDecoration: "none" }}>{item.video.title}</p>
                <p style={{ textDecoration: "none" }}>{item.video.channelName}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExerciseDetails;
