import React from "react";

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleChangeImg(index) {
    this.setState((prev) => ({ ...prev, activeIndex: index }));
  }

  render() {
    const active = this.state.activeIndex;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((img, index) => (
            <img
              key={img}
              className={index === active ? "active" : ""}
              src={img}
              alt="animal-thumb"
              onClick={() => this.handleChangeImg(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}
