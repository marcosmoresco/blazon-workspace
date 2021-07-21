import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import ShoppingCartSimpleIcon from "@icons/ShoppingCartSimple";
import ArticleIcon from "@icons/Article";
import {
  Box,
  BoxHeader,
  BoxHeaderName,
  BoxHeaderTitle,
  BoxContent,
  BoxDescription,
  BoxCart,
  Label,
} from "./styles";
import { getSelfServiceAttributeValue } from "@utils/index";
import { SelfService } from "@portal/Search/types";
import { GET_SELF_SERVICE_ITEM } from "@portal/Search/queries";

export default function EntitlementDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data, refetch } = useQuery<{
    getSelfServiceItem: SelfService;
  }>(GET_SELF_SERVICE_ITEM, {
    variables: {
      id: id,
    },
  });

  const entitlement = data?.getSelfServiceItem;

  return (
    <>
      <Box>
        <BoxHeader>
          <BoxHeaderName>
            {entitlement?.name || " - "}
          </BoxHeaderName>
          <BoxHeaderTitle>
            <ArticleIcon width={21} height={21} />
            <FormattedMessage id="entitlement" />
          </BoxHeaderTitle>
        </BoxHeader>
        <BoxContent>          
          <FormControl fullWidth={true} margin="normal">
            <Label>
              <FormattedMessage id="description" />
            </Label>
            <BoxDescription>
              {entitlement?.description || " - "}
            </BoxDescription>
          </FormControl>
          <FormControl fullWidth={true} margin="normal">
            <Label>
              <FormattedMessage id="resource" />
            </Label>
            <TextField value={getSelfServiceAttributeValue("resourceName", entitlement?.attributes || [])} variant="outlined" />
          </FormControl>
        </BoxContent>
      </Box>
      <BoxCart>
        <ShoppingCartSimpleIcon width={21} height={21} />
        <FormattedMessage id="cart.add" />
      </BoxCart>
    </>
  );
}
