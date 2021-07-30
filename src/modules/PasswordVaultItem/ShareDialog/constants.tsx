import { FormattedMessage } from "react-intl";
import {
  BoxAction, 
} from "./styles";
import Button from "@components/Button";

export const columns = ({ classes }: { classes: any }) => [
  {
    field: "user",
    headerName: <FormattedMessage id="shareddialog.grid.user" />,
    sortable: false,
    renderCell: (row: any) => {
      return row?.links ? (
        <UserThumb
          isSmall
          displayName={row?.displayName}
          image={getLink("thumb", row?.links || [])}
        />
      ) : (
        " - "
      );
    },
  },
  {
    field: "remove",
    headerName: "",
    sortable: false,
    renderCell: (row: any) => {
      return (
        <BoxAction>
          <Button
            color="primary"
            variant="contained"
            onClick={(e: any) => unShare(e, row)}
          >
            <FormattedMessage id="remove" />
          </Button>
        </BoxAction>
      );
    },
  },
];
