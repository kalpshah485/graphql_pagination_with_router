import {
  gql,
  useLazyQuery,
  // useQuery
} from '@apollo/client';
import React, { useEffect, useMemo } from 'react'
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
  // const oldpagenum = useMemo(() => {console.log("memo: ", page_num);return page_num},[]);
  console.log("page number:", page_num);
  // const [data, setData] = useState();
  const [getCharacters, { data, loading, error }] = useLazyQuery(GET_CHARACTERS);
  // const { loading, data, error, refetch } = useQuery(
  //   GET_CHARACTERS, {
  //   variables: {
  //     page_num: getPageNum()
  //   },
  //   onError: error => console.log(error.message),
  //   // onCompleted: (data) => {
  //   //   setData(data);
  //   // }
  // });
  useEffect(() => {
    getCharacters({
      variables: {
        page_num: Number(page_num)
      }
    })
  }, [page_num]);
  // useEffect(() => {
  //   console.log("mounted",oldpagenum !== page_num);
  //   if (oldpagenum !== page_num) {
  //     console.log("it worked",oldpagenum,page_num);
  //     refetch({
  //       page_num: Number(page_num)
  //     })
  //     console.log("finished");
  //   }
  // }, [page_num, refetch])

  console.log(
    // called, 
    error,
    loading,
    data
  );
  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }
  if (
    // called && 
    error) {
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