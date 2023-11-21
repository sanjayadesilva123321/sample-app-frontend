import { Link } from "react-router-dom";

import Posts from "../../components/posts/Posts";
import { ROLES } from "../../helpers/auth";
import AuthorizedWithMessage from "../auth/authorizationWrappers/AuthorizedWithMessage";
import { PostProvider } from "../post/PostProvider";

const Editor = () => {
  return (
    <div data-testid="component-editor" className="wrapper">
      <AuthorizedWithMessage requiredPermissions={[ROLES.Manager, ROLES.Admin]}>
        <h2>Editors Page</h2>
        <PostProvider>
          <Posts />
        </PostProvider>
        <br />
        <div className="flexGrow">
          <Link to="/">Home</Link>
        </div>
      </AuthorizedWithMessage>
    </div>
  );
};

export default Editor;
