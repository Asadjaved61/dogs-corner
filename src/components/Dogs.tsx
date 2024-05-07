import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Container,
  ListGroup,
  Pagination,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { DogBreedI } from "../interfaces/DogBreed.interface";
import "./Dogs.css";
import { api_endpoints } from "../data/api_endpoints";
import DogsList from "./DogsList";

const Dogs = () => {
  const [dogs, setDogs] = useState<DogBreedI[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  const dogsPerPage = 10;
  const totalPages = dogs ? Math.ceil(dogs.length / dogsPerPage) : 0;
  const dogsOnPage = dogs
    ? dogs.slice((activePage - 1) * dogsPerPage, activePage * dogsPerPage)
    : [];
  const dogsWithLongLifespan = useMemo(() => {
    return dogs?.filter((dog) => {
      const lifespan = dog?.life_span.split(" - ");
      const maxLifespan =
        lifespan.length > 1 ? parseInt(lifespan[1]) : parseInt(lifespan[0]);
      return maxLifespan > 15;
    });
  }, [dogs]);

  useEffect(() => {
    fetchDogs();
  }, []);

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
            <DogsList dogsOnPage={dogsOnPage} />
          ) : (
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
