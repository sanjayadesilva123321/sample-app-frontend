import { Link } from 'react-router-dom';

import { PostProvider } from '../post/PostProvider';

import Posts from '../../components/posts/Posts';
import AuthorizedWithMessage from '../auth/authorizationWrappers/AuthorizedWithMessage';

import { ROLES } from '../../helpers/auth';
import { EDITOR } from '../../helpers/editor/editor';

function Editor() {
  return (
    <div data-testid="component-editor" className="wrapper">
      <AuthorizedWithMessage requiredPermissions={[ROLES.Manager, ROLES.Admin]}>
        <h2>{EDITOR.EDITORS_PAGE}</h2>
        <PostProvider>
          <Posts />
        </PostProvider>
        <br />
        <div className="flexGrow">
          <Link to="/">{EDITOR.Home}</Link>
        </div>
      </AuthorizedWithMessage>
    </div>
  );
}

export default Editor;
