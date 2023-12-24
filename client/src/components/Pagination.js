import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import icons from '../ultils/icons'
import '../assets/css/pagination.css'
import { useSelector } from 'react-redux';
import { useLocation, useSearchParams, createSearchParams, useNavigate } from 'react-router-dom';
import * as actions from '../store/actions'

const { IoIosArrowBack, IoIosArrowForward } = icons

const Pagination = ( ) => {
  const navigate = useNavigate()
  const { isSearch } = useSelector(state => state.app)

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(1)
  const { count: length, data } = useSelector(state => state.post)
  let itemsPerPage = data.length
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil(length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % length;
    console.log(
      `Page: ${event.selected}, offset:${newOffset}`
    );
    setCurrentPage(++event.selected)
    setItemOffset(newOffset);

    console.log(length);
    console.log(pageCount);
  };
  function handleParams() {

    let params = []
    let searchParamsObject = {}
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    params.forEach(item => {
      searchParamsObject[item[0]] = item[1]
    })
    return searchParamsObject
  } 
  useEffect(() => { 
    setItemOffset(0)
    setCurrentPage(1)
  }, [location.pathname, isSearch])  
  useEffect(() => {
    searchParams.set('page', currentPage)
    const params = handleParams()
    navigate({
      pathname: location.pathname,
      search: createSearchParams(params).toString(),
    }, {})
  }, [currentPage])



  const itemCss = 'mx-[2px]   hover:bg-[#ddd] text-black text-sm rounded-md h-[50px] w-[50px]  '
  const itemLinkCss = 'w-full h-full block text-center leading-[50px]'
  return (
    <div className='as mt-[20px] mb-[30px]'>
      {/* <Items currentItems={currentItems} /> */}
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        activeClassName={' bg-[#e13427] hover:bg-[#e13427] text-[#e9e4e3]'}
        breakClassName={itemCss + ' flex items-center justify-center '}
        containerClassName={'flex flex-row justify-center '}
        disabledClassName={'disabled-page'}
        marginPagesDisplayed={0}
        pageClassName={itemCss + 'relative'}
        pageLinkClassName={itemLinkCss}

        forcePage={currentPage - 1}

        previousLinkClassName={itemLinkCss + ' flex items-center justify-center'}
        previousClassName={itemCss + "  "}
        nextClassName={itemCss + "   "}
        nextLinkClassName={itemLinkCss + ' flex items-center justify-center'}

        nextLabel={<IoIosArrowForward style={{ fontSize: 18 }} />}
        previousLabel={<IoIosArrowBack style={{ fontSize: 18 }} />}
      />
    </div>
  );
}
export default Pagination 