import React from 'react';
import './PageTitle.scss';

const PageTitle = (props: { title: string; description: string }) => {
  return (
    <div className="top-page">
      <span className="title">{props.title} </span>
      <span>{props.description}</span>
    </div>
  );
};
export default PageTitle;
