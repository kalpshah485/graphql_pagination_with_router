import {
  gql,
  useLazyQuery,
  // useQuery
} from '@apollo/client';
import React, { useEffect, useState } from 'react'
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
  console.log("page number:", page_num);
  const [data, setData] = useState();
  const [getCharacters, { called, loading, error }] = useLazyQuery(GET_CHARACTERS);
  // const { loading, error } = useQuery(
  //   GET_CHARACTERS, {
  //   variables: {
  //     page_num: Number(page_num)
  //   },
  //   onCompleted: (data) => {
  //     setData(data);
  //   }
  // });
  useEffect(() => {
    getCharacters({
      variables: {
        page_num: Number(page_num)
      }
    }).then(data => setData(data.data)).catch(error => console.log(error))
  }, [getCharacters, page_num]);
  // useEffect(() => {
  //   console.log("mounted");
  //   refetch({
  //     page_num: Number(page_num)
  //   })
  //   return () => {
  //     console.log("unmounted")
  //   }
  // }, [page_num, refetch])

  console.log(
    called, 
    loading,
    data
  );
  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }
  if (called && error) {
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