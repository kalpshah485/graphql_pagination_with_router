import { gql, useQuery } from '@apollo/client';
import React from 'react'
import { useParams } from 'react-router-dom';
import Pagination from '../components/Pagination';

const GET_CHARACTERS = gql`
  query getCharacters($page_num: Int) {
    characters (page: $page_num) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        gender
      }
    }
  }
`;

function Characters() {
  const { page_num } = useParams();
  const getPageNum = () => {
    return Number(page_num);
  }
  const { loading, data, error } = useQuery(
    GET_CHARACTERS, {
    variables: {
      page_num: getPageNum()
    },
    onError: error => console.log(error.message)
  });
  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }
  if (error) {
    return (
      <p>Failed to load.... </p>
    )
  }
  if (!loading && data) {
    return (
      <>
        <h1>Characters: {page_num}</h1>
        <div style={{ marginBottom: "15vh" }}>
          {
            data.characters.results.map((character) => {
              return <p key={character.id}>{character.name}</p>
            })
          }
        </div>
        <Pagination page_info={data.characters.info} />
      </>
    );
  }
}

export default Characters