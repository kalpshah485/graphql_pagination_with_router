import React from 'react'
import { 
  // Link, 
  useNavigate } from 'react-router-dom'

function PageItem({ page_info, value }) {
  const navigate = useNavigate();
  return (
    // <Link to={`/${value}`} disabled={value === page_info.prev + 1}>
    //   {value}
    // </Link>
    <button onClick={() => navigate(`/${value}`)} disabled={value === page_info.prev + 1}>
      {value}
    </button>
  )
}

export default PageItem