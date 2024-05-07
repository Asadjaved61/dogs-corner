import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DogBreedI } from "../interfaces/DogBreed.interface";

const DogsList = ({ dogsOnPage }: { dogsOnPage: DogBreedI[] }) => {
  return (
    <div>
      <ListGroup>
        {dogsOnPage.map((dog: any, index: number) => (
          <ListGroup.Item key={index} action className='p-3'>
            <Link to={`/details/${dog?.id}`}>{dog?.name}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default DogsList;
