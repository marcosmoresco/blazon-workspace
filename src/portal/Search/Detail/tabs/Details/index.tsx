import { FormattedMessage } from "react-intl";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@components/TextField";
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

export default function Details() {
  return (
    <>
      <Box>
        <BoxHeader>
          <BoxHeaderName>
            Acessos CSC Algar - Firewall_dropbox_liberado
          </BoxHeaderName>
          <BoxHeaderTitle>
            <ArticleIcon width={21} height={21} />
            <FormattedMessage id="entitlement" />
          </BoxHeaderTitle>
        </BoxHeader>
        <BoxContent>
          <FormControl fullWidth={true} margin="normal">
            <Label>
              <FormattedMessage id="resource" />
            </Label>
            <TextField value={"REDE CSC ALGAR"} variant="outlined" />
          </FormControl>
          <FormControl fullWidth={true} margin="normal">
            <Label>
              <FormattedMessage id="description" />
            </Label>
            <BoxDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              velit accumsan, massa lacus gravida tincidunt metus. Rutrum
              ultricies tellus ac dolor sagittis massa et.
            </BoxDescription>
          </FormControl>
        </BoxContent>     
      </Box>
      <BoxCart>
        <ShoppingCartSimpleIcon width={21} height={21}/>
        <FormattedMessage id="cart.add" />
      </BoxCart>
    </>   
  );
}
