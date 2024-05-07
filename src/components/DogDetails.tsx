// DogDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DogBreedI } from "../interfaces/DogBreed.interface";
import { Card, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { api_endpoints } from "../data/api_endpoints";

const DogDetails = () => {
  const { id } = useParams();
  const [dog, setDog] = useState<DogBreedI | null>(null);

  useEffect(() => {
    fetchDogDetails();
  }, [id]);

  const fetchDogDetails = async () => {
    try {
      if (id === undefined) return;
      const response = await axios.get(
        api_endpoints.dog(parseInt(id as string))
      );
      setDog(response.data);
    } catch (error) {
      console.error("Error fetching dog details:", error);
    }
  };

  return dog ? (
    <Container className='mt-5 d-flex justify-content-center align-items-center'>
      <Card style={{ width: "35rem" }}>
        <Card.Img
          variant='top'
          width={"100%"}
          height={"400px"}
          src={api_endpoints.img(dog.reference_image_id)}
        />
        <Card.Body>
          <Card.Title>{dog.name}</Card.Title>
          <Card.Text>{dog.temperament}</Card.Text>
        </Card.Body>
        <ListGroup variant='flush' className='list-group-flush'>
          <ListGroup.Item>
            <strong>Life span:</strong> {dog.life_span}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Origin:</strong> {dog.origin}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Bred for:</strong> {dog.bred_for}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Breed group:</strong> {dog.breed_group}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Weight:</strong> {dog.weight.imperial} lbs{" "}
            {dog.weight.metric} kg
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Height:</strong> {dog.height.imperial} inches{" "}
            {dog.height.metric} cm
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  ) : (
    <Container className='mt-5 d-flex justify-content-center align-items-center'>
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </Container>
  );
}; // Add closing parenthesis here

export default DogDetails;
