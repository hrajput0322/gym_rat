import { useContext } from "react";
import { ExerciseList } from "../store/ExerciseStore";

const ExerciseCard = ({gifUrl, name}) => {
    const {handleCardClick} = useContext(ExerciseList);
  return (
    <div id={name} className="card" style={{ width: "18rem", cursor: "pointer" }} onClick={(e)=>handleCardClick(e.target.currentSrc)}>
      <img src={gifUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <p className="card-text">
          {name}
        </p>
      </div>
    </div>
  );
};

export default ExerciseCard;
