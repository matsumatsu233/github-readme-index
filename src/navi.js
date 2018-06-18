import React from 'react';
import Radium from 'radium';

const styles = {
  navi: {
    width: 350,
    position: 'fixed',
    top: 300,
    left: 101,
    zIndex: 1000,
  },
  naviContent: {
    maxHeight: 450,
    overflow: 'auto'
  },
  level_h1: {
    marginLeft: 10
  },
  level_h2: {
    marginLeft: 25,
    listStyleType: 'circle'
  },
  level_h3: {
    marginLeft: 40
  },
  level_h4: {
    marginLeft: 55,
    listStyleType: 'circle'
  },
  level_h5: {
    marginLeft: 70
  },
};

function Navi(props) {
  return (
    <div className="Box Box--condensed mb-3 js-repos-container" style={styles.navi} data-pjax-container role="navigation">
      <div className="Box-header">
        <h3 className="Box-title d-flex flex-justify-between flex-items-center">
          Navigation
        </h3>
      </div>
      <div className="Box-body" style={styles.naviContent}>
        <ul>
          {props.items.map((item) => <li style={styles[`level_${item.level}`]}><a href={item.hash}>{item.text}</a></li>)}
        </ul>
      </div>
    </div>
  );
}

export default Radium(Navi);