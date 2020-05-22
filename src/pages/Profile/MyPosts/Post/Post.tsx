import React from 'react';
import style from './Post.module.css'

type PropsType = {
  message: string,
  likeCounter: number
}

const Post:React.FC<PropsType> =  (props) => {
  return(
    <div className={style.item}>
      <img className={style.avatar} src="https://avatars.mds.yandex.net/get-pdb/1979423/4f56fe36-7a8d-4805-bde3-039bd14a6b7f/s1200?webp=false" alt=""/>
      { props.message }
      <div>
        <span>{ props.likeCounter } Like</span>
      </div>
    </div>
  )
};

export default Post;