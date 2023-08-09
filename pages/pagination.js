import React from 'react';
import { Button } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';

const Pagination = ({totalPosts, postsPerPage, setCurrentPage}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.map((page, index) => {
        return (
          <Button className="mr-2" variant="outline-warning" key={index} onClick={() => setCurrentPage(page)}>
            {page}
          </Button>
        );
      })}
    </div>
  );
};

export default Pagination;