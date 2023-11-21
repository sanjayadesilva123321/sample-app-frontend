import { PostProvider } from "./PostProvider";
import { checkProps } from "../../utils/TestUtils";

const defaultProps = {
  children: <p>child</p>,
};

test("validate props types", () => {
  checkProps(PostProvider, defaultProps);
});
