import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Container,
  Pagination,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { DogBreedI } from "../interfaces/DogBreed.interface";
import "./Dogs.css";
import { api_endpoints } from "../data/api_endpoints";

// Lazy load the DogsList component
const DogsList = React.lazy(() => import("./DogsList"));

const Dogs = () => {
  // State for storing the list of dogs and the active page
  const [dogs, setDogs] = useState<DogBreedI[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  // Constants for pagination
  const dogsPerPage = 10;
  const totalPages = dogs ? Math.ceil(dogs.length / dogsPerPage) : 0;
  // Compute the list of dogs to display on the current page
  const dogsOnPage = dogs
    ? dogs.slice((activePage - 1) * dogsPerPage, activePage * dogsPerPage)
    : [];
  // Compute the list of dogs with a lifespan of more than 15 years
  const dogsWithLongLifespan = useMemo(() => {
    return dogs?.filter((dog) => {
      const lifespan = dog?.life_span.split(" - ");
      const maxLifespan =
        lifespan.length > 1 ? parseInt(lifespan[1]) : parseInt(lifespan[0]);
      return maxLifespan > 15;
    });
  }, [dogs]);

  // Fetch the list of dogs when the component mounts
  useEffect(() => {
    fetchDogs();
  }, []);

  // Function to fetch the list of dogs from the API
  const fetchDogs = async () => {
    try {
      const response = await axios.get(api_endpoints.dogs);
      setDogs(response?.data);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  return (
    <Container className='mt-5'>
      <Tabs defaultActiveKey='list'>
        <Tab eventKey='list' title='List of Breeds'>
          {dogs ? (
            // If the dogs have been fetched, display the DogsList component
            <DogsList dogsOnPage={dogsOnPage} />
          ) : (
            // Otherwise, display a spinner
            <Spinner animation='border' />
          )}
          <Row className='mt-3'>
            <Pagination className='d-flex justify-content-center align-items-center'>
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === activePage}
                  onClick={() => setActivePage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Row>
        </Tab>
        <Tab eventKey='summary' title='Summary'>
          <p>
            Total number of dog breeds:{" "}
            <strong>{dogs ? dogs.length : 0}</strong>
          </p>
          <p>
            Total number of dog breeds with a lifespan over 12 years:{" "}
            <strong>{dogsWithLongLifespan?.length}</strong>
          </p>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Dogs;
