import React from "react";
import Radium from "radium";

const styles = {
  indexContent: {
    maxHeight: 450,
    overflow: "auto"
  },
  level_h1: {
    marginLeft: 10
  },
  level_h2: {
    marginLeft: 25,
    listStyleType: "circle"
  },
  level_h3: {
    marginLeft: 40
  },
  level_h4: {
    marginLeft: 55,
    listStyleType: "circle"
  },
  level_h5: {
    marginLeft: 70
  }
};

const indexContainerStyles = ({ isFixed, readmeContainerX }) => {
  if (isFixed) {
    return {
      width: 350,
      position: "fixed",
      top: 30,
      left: readmeContainerX - 370 + 1,
      zIndex: 1000
    };
  } else {
    return {
      width: 350,
      position: "absolute",
      top: 0,
      left: -370,
      zIndex: 1000
    };
  }
};

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: 0
    };
  }

  componentDidMount() {
    document.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    this.setState({
      scrollY: window.scrollY
    });
  };

  render() {
    const readmeContainer =
      document.querySelector(".file") || document.querySelector("#readme");
    const readmeContainerX = readmeContainer.getBoundingClientRect().x;
    const readmeContainerY = readmeContainer.getBoundingClientRect().y;
    const boundary = readmeContainerY + this.state.scrollY;

    return (
      <div
        className="Box Box--condensed mb-3 js-repos-container"
        style={indexContainerStyles({
          isFixed: this.state.scrollY > boundary - 30,
          readmeContainerX
        })}
        data-pjax-container
        role="navigation"
      >
        <div className="Box-header">
          <h3 className="Box-title d-flex flex-justify-between flex-items-center">
            Index
          </h3>
        </div>
        <div className="Box-body" style={styles.indexContent}>
          <ul>
            {this.props.items.map(item => (
              <li style={styles[`level_${item.level}`]}>
                <a href={item.hash}>{item.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Radium(Index);
