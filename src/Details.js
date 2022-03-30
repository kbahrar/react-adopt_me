import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBondaries";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

// export default function Details() {
//   const { id } = useParams();
//   return <h1>{id}</h1>;
// }
const withRouter = (Component) => {
  const wrapper = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    return <Component params={params} navigate={navigate} {...props} />;
  };

  return wrapper;
};

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.params.id;
    this.state = { loading: true, showModal: false };
  }

  async componentDidMount() {
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${this.id}`);
    const json = await res.json();

    this.setState(
      (prevState) => ({ ...prevState, loading: false, ...json.pets[0] }),
      () => {}
    );
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    if (this.loading) {
      return <h1>Loading ...</h1>;
    } else {
      return (
        <div className="pb-5">
          <div className=" text-blue-50 w-3/5 mx-auto text-center bg-gray-400 flex flex-col rounded-md">
            <h1 className="p-5 text-5xl font-bold font-serif">{name} </h1>
            <h2 className="p-2 text-lg font-bold">{`${animal} - ${breed} - ${city}, ${state}`}</h2>
            <ThemeContext.Consumer>
              {([theme]) => (
                <button
                  className="mx-auto w-1/6 p-2 rounded-xl mb-3 hover:bg-black"
                  onClick={this.toggleModal}
                  style={{ backgroundColor: theme }}
                >
                  Adopt {name}
                </button>
              )}
            </ThemeContext.Consumer>
            <p className="w-2/6 mx-auto my-3">{description}</p>
            {showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name}?</h1>
                  <div className="buttons">
                    <button onClick={this.adopt}>Yes</button>
                    <button onClick={this.toggleModal}>No</button>
                  </div>
                </div>
              </Modal>
            ) : null}
            <Carousel images={images} />
          </div>
        </div>
      );
    }
  }
}

const DetailsWithRouter = withRouter(Details);

export default function (props) {
  return (
    <ErrorBoundary>
      <DetailsWithRouter {...props} />
    </ErrorBoundary>
  );
}
