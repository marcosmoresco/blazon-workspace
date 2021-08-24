import React, { useEffect } from "react";
import Image from "next/image";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import CheckedIcon from "./images/active";
import NormalIcon from "./images/normal";
import Loading from "../Loading";
import { useTheme, themes } from "@theme/index";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiFormControlLabel-label": {
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 15,
      letterSpacing: "0.0125em",
      color: "#232325",
    },
  },
}));

export default function CustomizedCheckbox(props: any) {
  const classes = useStyles();
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const { label, value, onChange, noTop, isLoading, ...other } = props;

  const [checked, setChecked] = React.useState(value || false);

  useEffect(() => {
    setChecked(value);
  }, [checked, value]);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
    if (onChange) {
      onChange(event.target.checked, event);
    }
  };

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <Checkbox
            {...other}
            icon={
              isLoading ? (
                <Loading type="blue" />
              ) : (
                <NormalIcon />
              )
            }
            checkedIcon={
              isLoading ? (
                <Loading type="blue" />
              ) : (
                <CheckedIcon color={currentTheme.palette.primary.main} />
              )
            }
            checked={checked}
            onChange={handleChange}
            name={`checked-${label}`}
            color="primary"
          />
        }
        label={label}
      />
    </div>
  );
}
