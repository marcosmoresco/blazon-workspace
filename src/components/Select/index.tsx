import React, { useEffect } from "react";
import Select from "@material-ui/core/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import CaretDownIcon from "@icons/CaretDown";
import CaretUpIcon from "@icons/CaretUp";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 100,
    "& .MuiSelect-select": {
      paddingTop: "11.5px",
      paddingBottom: "11.5px",
      paddingRight: 42,
      position: "relative",
    },    
    "& .PrivateNotchedOutline-legendLabelled-3": {
      width: 0,
    },
    "& .MuiSelect-nativeInput": {
      width: "auto",
    },
    "& legend": {
      display: "none",
    },
    "& fieldset": {
      height: 42,
      top: 0,
    },    
  },
  icon: {
    width: 42,
    height: 32,
    marginRight: 7,
    cursor: "pointer",
    zIndex: 1,
    pointerEvents : "none",
    position: "absolute",
    right: -15,
  },
}));

export default function CustomizedSelect(props: any) {
  const classes = useStyles();
  const { bind, view, label, required, ...other } = props;
  const [options, setOptions] = React.useState(props.options || []);

  useEffect(() => {
    setOptions(props.options || []);
  }, [props, setOptions]);

  return (
    <div>
      <label>
        {label}
        {required && "*"}
      </label>
      <Select
        {...other}       
        variant={props.variant || "outlined"}
        label=""
        className={classes.root}
        IconComponent={(props) =>
          props.className.indexOf("iconOpen") > -1 ? (
            <div className={classes.icon}>
              <CaretUpIcon width={25} />
            </div>          
          ) : (
            <div className={classes.icon}>
              <CaretDownIcon width={25} />
            </div>            
          )
        }
        style={{ width: "100%" }}
      >
        {(options || []).map((option: any, index: number) => (
          <MenuItem
            key={bind ? option[bind] : `select-item-${label}-${index}`}
            value={bind ? option[bind] : option}
          >
            {view ? option[view] : option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
