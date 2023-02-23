import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
/* import AddToCart from "../Cart/AddToCart"; */

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-01-c929c-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("request not succeful");
      }

      const recievedData = await response.json();
      console.log(recievedData);
      const cleanedData = [];
      for (const key in recievedData) {
        cleanedData.push({
          id: key,
          name: recievedData[key].name,
          description: recievedData[key].description,
          price: recievedData[key].price,
        });
      }

      console.log(cleanedData);
      setMeals(cleanedData);
      setIsLoading(false);
    };

    fetchData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.isLoading}>
        <p>Content is Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul> {mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
