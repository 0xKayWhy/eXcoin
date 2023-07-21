import React from 'react'
import { Pagination } from 'react-bootstrap';
import { useRoute } from '../context';

export default function Page() {
  const routeCoin = useRoute()

  const handleNext = async () => {
    console.log(routeCoin.currentPage,routeCoin.rowFormat)
    await routeCoin.setRowNum(prevNum => prevNum + routeCoin.rowFormat)
    await routeCoin.setCurrentPage(prevCurrentPage => prevCurrentPage + 1)
  }

  const handlePrev = async () => {
    if(routeCoin.currentPage !== 1) {
    await routeCoin.setRowNum(prevNum => prevNum - routeCoin.rowFormat)
    await routeCoin.setCurrentPage(prevCurrentPage => prevCurrentPage - 1)
  }
  }


  return (
    <Pagination className="justify-content-center">
        <Pagination.First />
        <Pagination.Prev 
         onClick={()=>handlePrev()}
        />
        <Pagination.Item 
        >{routeCoin.currentPage}</Pagination.Item>
        <Pagination.Next onClick={()=>handleNext()}/>
        <Pagination.Last />
      </Pagination>
  )
}






  