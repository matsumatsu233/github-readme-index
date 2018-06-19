import React from "react";
import Radium from "radium";

const styles = {
  naviContent: {
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

const naviContainerStyles = ({ isFixed, readmeContainerX }) => {
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

class Navi extends React.Component {
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
    const readmeContainerX = document
      .querySelector(".file")
      .getBoundingClientRect().x;
    const readmeContainerY = document
      .querySelector(".file")
      .getBoundingClientRect().y;
    const boundary = readmeContainerY + this.state.scrollY;

    const specialStyle =
      this.state.scrollY < boundary - 30
        ? styles.naviAbsolute
        : styles.naviFixed;

    return (
      <div
        className="Box Box--condensed mb-3 js-repos-container"
        style={naviContainerStyles({
          isFixed: this.state.scrollY > boundary - 30,
          readmeContainerX
        })}
        data-pjax-container
        role="navigation"
      >
        <div className="Box-header">
          <h3 className="Box-title d-flex flex-justify-between flex-items-center">
            Navigation
          </h3>
        </div>
        <div className="Box-body" style={styles.naviContent}>
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

export default Radium(Navi);
