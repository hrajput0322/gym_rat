import { useContext } from "react";
import { ExerciseList } from "../store/ExerciseStore";
import Loader from "./Loader";
import ExerciseCard from "./ExerciseCard";
import ExerciseDetails from "./ExerciseDetails";

const SearchExercises = () => {
  const { exerciseList, fetching, cardClicked, card } = useContext(ExerciseList);
  return (
    <>
      <div className="card-list">
        {fetching === true && <Loader />}
        {fetching === false &&
          exerciseList &&
          exerciseList.length > 0 &&
          exerciseList.map((item) => (
            <ExerciseCard gifUrl={item.gifUrl} name={item.name} key={item.name} />
          ))}
      </div>
      {cardClicked===true && fetching===false && exerciseList.length>0 && <ExerciseDetails card={card}/>}
    </>
  );
};

export default SearchExercises;
