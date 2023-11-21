import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <div data-testid="component-page-not-found" className="wrapper">

            <section>
                <h1 className="error">Page Not Found</h1>
                <br/>
                <p className="error">Sorry, the page you are looking for does not exist.</p>
                <div className="flexGrow">
                    <Button onClick={goBack} variant="light" data-testid="go-back-button">
                        Go Back
                    </Button>
                </div>
            </section>
        </div>
    );
}
export default NotFoundPage;
