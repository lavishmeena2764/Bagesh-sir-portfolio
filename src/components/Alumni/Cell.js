import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ data }) => (
  <div className="cell-container" style={{ margin: '20px' }}>
    <article className="mini-post" style={{ width: 'fit-content' }}>
      <header style={{
        maxWidth: '250px',
        maxHeight: '250px',
        overflow: 'hidden',
        display: 'flex',
        padding: '10px',
      }}
      >
        <img
          src={data.link}
          alt={data.name}
          style={{
            width: '230px',
            height: '230px',
            borderRadius: '100%',
            border: '5px solid grey',
            padding: '5px',
          }}
        />
      </header>
      <center><h3 style={{ padding: '0px', margin: '0px' }}>{data.name}</h3></center>
      <center><a href={data.projectLink} target="_blank" rel="noreferrer"><h5 style={{ padding: '0px', margin: '0px' }}>Project : {data.project}</h5></a></center>
      <center>
        <a href={data.linkedin} target="_blank" rel="noreferrer">
          <img
            src="https://imgs.search.brave.com/fQPr1e-Xdvt8sGDU2azrU80WfA8mqPqdzDaBsTf19ck/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS81/MTIvMTc0LzE3NDg1/Ny5wbmc"
            style={{
              width: '20px',
              height: '20px',
              marginRight: '10px',
              marginTop: '20px',
            }}
            alt="LinkedIn"
          />
        </a>
      </center>
    </article>
  </div>
);

Cell.propTypes = {
  data: PropTypes.shape({
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
    projectLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cell;
