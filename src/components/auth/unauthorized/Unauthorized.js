import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section>
      <h1 className="error">Unauthorized</h1>
      <br />
      <p className="error">You do not have access to the requested page.</p>
      <div className="flexGrow">
        <Button onClick={goBack} variant="light" data-testid="go-back-button">
          Go Back
        </Button>
      </div>
    </section>
  );
}

export default Unauthorized;
