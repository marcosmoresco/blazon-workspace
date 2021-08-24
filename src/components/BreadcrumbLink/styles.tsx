import { styled, withTheme } from '@material-ui/core/styles';
import { Link as MuiLink } from '@material-ui/core/';

export const Link = styled(withTheme(MuiLink))(props => ({
  color: props.theme.palette.primary.main || "#3174F6",
  display: "flex",
  alignItems: "end",  
  gap: 10
}));