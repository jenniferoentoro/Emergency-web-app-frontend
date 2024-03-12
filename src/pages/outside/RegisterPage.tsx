import Container from "react-bootstrap/Container";
import Nav from "../../components/outside/NavBar";
import "animate.css";
import RegistrationForm from "../../components/outside/RegistrationForm";

function RegisterPage() {
  return (
    <div className="color-background min-h-screen playfair-font">
      <Nav />
      <Container fluid>
        <div className="row justify-content-center abstract-background text-center">
          <div className="col-12 col-md-10 col-lg-10 col-xl-8">
            <div className="row justify-content-md-center">
              <div className="col-12 col-md-6">
                <RegistrationForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default RegisterPage;
