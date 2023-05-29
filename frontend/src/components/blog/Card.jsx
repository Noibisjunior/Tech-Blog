import React from 'react';
import './blog.css';
import {
  AiOutlineTags,
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';


export const Card = ({ card }) => {

const imageUrl = `http://localhost:5000/uploads/${card.articleImage}`;

  return (
    <>
      <section className="blog">
        <div className="container">
          <div className="box boxItems">
            <div className="img">
              <Link to={`/details/${card._id}`}>
              {card.articleImage && 
                <img src={imageUrl} alt="code" />}
              </Link>
            </div>
            <div className="details">
              <Link to={`/posts/${card._id}`} className="link">
                <h3>{card.title}</h3>
              </Link>
              <div className="tag">
                <AiOutlineTags className="icon" />
                <a href="/">#{card.categories}</a>
              </div>

              <p>{card.author}</p>
              <p>{card.summary}</p>
              <div className="date">
                <AiOutlineClockCircle className="icon" />{' '}
                <time>{formatISO9075(new Date(card.createdAt))}</time>
                <AiOutlineComment className="icon" />{' '}
                <label htmlFor="">27</label>
                <AiOutlineShareAlt className="icon" />{' '}
                <label htmlFor="">SHARE</label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
