

import { Link } from "./styles";

const BreadcrumbLink = ({ children, ...other } : {children: any}) => {
  return (
    <Link {...other}>
      {children}
    </Link>
  );
};

export default BreadcrumbLink;