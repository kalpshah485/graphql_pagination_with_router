import React from 'react'
import { useNavigate } from 'react-router-dom'
import PageItem from './PageItem'

function Pagination({ page_info }) {
  const navigate = useNavigate();
  return (
    <div className="pagination">
      <button onClick={() => navigate(`/${page_info.prev}`)} disabled={!page_info.prev}>
        prev
      </button>
      {
        Array.from({ length: page_info.pages }).map((_item, index) => <PageItem key={index + 1} page_info={page_info} value={index + 1} />)
      }
      <button onClick={() => navigate(`/${page_info.next}`)} disabled={!page_info.next}>
        next
      </button>
    </div>
  )
}

export default Pagination