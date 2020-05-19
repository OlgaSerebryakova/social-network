import React, { useState } from 'react';
import style from './style.module.css';
import cn from 'classnames';

type PropsType = {
  totalItemsCount: number,
  pageSize: number,
  currentPage: number,
  onPageChanged: (pageNumber: number) => void,
  portionSize?: number
}

const Paginator: React.FC<PropsType> = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) =>  {

  let pageCount = Math.ceil(totalItemsCount / pageSize);

  let pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }

  const portionCount = Math.ceil(pageCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={style.paginator}>
      { portionNumber > 1 &&
      <button onClick={ () => { setPortionNumber(portionNumber - 1) }}>PREV</button>}
      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(page => {
        return (
          <span className={ cn({[style.selectedPage]: currentPage === page}, style.pageNumber) }
                key={page}
                onClick={() => {onPageChanged(page)}}>
            {page}</span>
        )
      })}
      { portionCount > portionNumber &&
      <button onClick={ () => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
    </div>
  )
};

export default Paginator;
