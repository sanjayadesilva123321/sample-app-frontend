import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <div className="loading-indicator" data-testid="component-loading">
      <output className="spinner-output">
        <Spinner animation="border" />
      </output>
    </div>
  );
}

export default Loading;
