import Container from "react-bootstrap/Container";
import Nav from "../../components/outside/NavBar";
import "animate.css";
import LoginForm from "../../components/outside/LoginForm";

function LoginPage() {
  return (
    <div className="color-background min-h-screen playfair-font">
      <Nav />
      <Container fluid>
        <div className="row justify-content-center abstract-background text-center">
          <div className="col-10 col-md-8 col-lg-8 col-xl-6">
            <div className="row justify-content-md-center mt-8">
              <div className="col-12 col-md-6">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
