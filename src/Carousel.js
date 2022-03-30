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
      <div className="flex bg-gray-300 p-7 h-96">
        <img
          className=" max-w-xs border-yellow-400 border-2 rounded-2xl"
          src={images[active]}
          alt="animal"
        />
        <div className="flex p-5 justify-between flex-wrap">
          {images.map((img, index) => (
            <img
              key={img}
              className={
                index === active
                  ? "h-28 w-28 rounded-full border-yellow-400 border-2"
                  : "h-28 w-28 rounded-full cursor-pointer"
              }
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
