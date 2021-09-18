import React from "react";
import LazyLoad from "react-lazyload";



const Photo = ({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) => {
  return (
    <article className="photo">

      <img src={regular} alt={alt_description} />
      
     
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>{likes} Likes</p>
          <p>{alt_description}</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt={name} className="user-img" />
        </a>
      </div>
    </article>
  );
};

export default Photo;
