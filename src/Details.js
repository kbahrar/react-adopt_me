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
        <div className="details">
          <div>
            <h1>{name} </h1>
            <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
            <ThemeContext.Consumer>
              {([theme]) => (
                <button
                  onClick={this.toggleModal}
                  style={{ backgroundColor: theme }}
                >
                  Adopt {name}
                </button>
              )}
            </ThemeContext.Consumer>
            <p>{description}</p>
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
