import React from 'react';
import style from './style.module.css';


const Paginator = (props) =>  {

  let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];

  for (let i=1; i<=pageCount; i++) {
    pages.push(i)
  }

  return (
    <div>
      {pages.map(page => {
        return (
          <span key={page}
                onClick={() => {props.onPageChanged(page)}}
                className={props.currentPage === page && style.selectedPage}>{page}</span>
        )
      })}
    </div>
  )
};

export default Paginator;
