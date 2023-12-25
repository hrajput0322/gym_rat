import { createContext, useEffect, useReducer, useState } from "react";
import { exerciseOptions, fetchData, youtubeOptions } from "../utils/fetchData";

export const ExerciseList = createContext({
  fetching: false,
  exerciseList: [],
  handleSearch: () => {},
  cardClicked: false,
  handleCardClick: () => {},
  card: {},
  exerciseVideos: [],
});

const exerciseListReducer = (currentExerciseList, action) => {
  let newExerciseList = currentExerciseList;

  if (action.type === "ADD_INITIAL_EXERCISES") {
    newExerciseList = action.payload.exerciseData;
  } else if (action.type === "SEARCH") {
    newExerciseList = action.payload.newExerciseList;
  }
  return newExerciseList;
};

const ExerciseListProvider = ({ children }) => {
  const [card, setCard] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [exerciseList, dispatchExerciseList] = useReducer(
    exerciseListReducer,
    []
  );
  const [fetching, setFetching] = useState(false);

  const [cardClicked, setCardClicked] = useState(false);

  const handleCardClick = (url) => {
    for (let i = 0; i < exerciseList.length; i++) {
      if (exerciseList[i].gifUrl === url) {
        setCard(exerciseList[i]);
        setCardClicked(true);
        break;
      }
    }
  };
  
  // ...
  
  useEffect(() => {
    if (cardClicked) {
      const youtubeSearchUrl = "https://youtube-search-and-download.p.rapidapi.com";
  
      const fetchExerciseVideos = async () => {
        try {
          const exerciseVideosData = await fetchData(
            `${youtubeSearchUrl}/search?query=${card.name} exercise`,
            youtubeOptions
          );
          setExerciseVideos(exerciseVideosData.contents);
        } catch (error) {
          console.error('Error fetching exercise videos:', error);
        } finally {
          document.getElementById("exercise-details").scrollIntoView();
        }
      };
  
      fetchExerciseVideos();
    }
  }, [card, cardClicked]);

  const handleSearch = (searchTerm) => {
    setCardClicked(false);
    setFetching(true);
    let newExerciseList = [];
    const fetchExercisesData = async () => {
      try {
        const exerciseData1 = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${searchTerm}`,
          exerciseOptions
        );
        if (exerciseData1.length > 0) {
          newExerciseList = [...newExerciseList, ...exerciseData1];
        }
        const exerciseData2 = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/equipment/${searchTerm}`,
          exerciseOptions
        );
        if (exerciseData2.length > 0) {
          newExerciseList = [...newExerciseList, ...exerciseData2];
        }
        const exerciseData3 = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/target/${searchTerm}`,
          exerciseOptions
        );
        if (exerciseData3.length > 0) {
          newExerciseList = [...newExerciseList, ...exerciseData3];
        }
        const exerciseData4 = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/name/${searchTerm}`,
          exerciseOptions
        );
        if (exerciseData4.length > 0) {
          newExerciseList = [...newExerciseList, ...exerciseData4];
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setFetching(false);
        dispatchExerciseList({
          type: "SEARCH",
          payload: {
            newExerciseList,
          },
        });
      }
    };

    fetchExercisesData();
  };

  const addInitialExercises = (exerciseData) => {
    dispatchExerciseList({
      type: "ADD_INITIAL_EXERCISES",
      payload: {
        exerciseData,
      },
    });
  };

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchExercisesData = async () => {
      try {
        const exerciseData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions,
          { signal }
        );
        addInitialExercises(exerciseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchExercisesData();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <ExerciseList.Provider
      value={{
        fetching,
        exerciseList,
        handleSearch,
        cardClicked,
        handleCardClick,
        card,
        exerciseVideos,
      }}
    >
      {children}
    </ExerciseList.Provider>
  );
};

export default ExerciseListProvider;
