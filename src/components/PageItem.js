import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageItem({ page_info, value }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(`/${value}`)} disabled={value === page_info.prev + 1}>
      {value}
    </button>
  )
}

export default PageItem