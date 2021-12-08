import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import CaretDownIcon from "@icons/CaretDown";

const useStyles = makeStyles(() => ({
  root: {
    "&.freeSolo": {
      "& .MuiAutocomplete-clearIndicator": {
        bottom: 0
      }
    },
    "& .MuiAutocomplete-tag": {
      height: 28,
    },
    "& .MuiAutocomplete-inputRoot": {
      paddingTop: 4,
      paddingBottom: 4,
      height: 42,
      backgroundColor: "#fff",
      "& .MuiButtonBase-root": {
        bottom: 4
      }
    },
    "& .Mui-error": {
      marginLeft: 0
    },
    "& .MuiInputLabel-outlined:not(.Mui-focused)": {
      top: -7
    }
  },
  inputFilter: {
    padding: "0 !important",
    height: 24,
  },
}));

type Ref = {
  isLoading: boolean;
  changed: boolean;
};

export default function CustomizedAutocomplete(props: any) {
  const classes = useStyles();
  const { label, inputPlaceholder, async, getOptionLabel, helperText, error, renderInput, ...other } = props;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState(props.options || []);
  const [query, setQuery] = React.useState(null);
  const [loading, setLoading] = React.useState(open && options.length === 0);
  const [firstSearch, setFirstSearch] = React.useState(false);

  const autoCompleteRef = useRef<Ref>();

  React.useEffect(() => {
    if (
      async &&
      autoCompleteRef &&
      autoCompleteRef.current &&
      !autoCompleteRef?.current?.isLoading &&
      ((!options.length && !firstSearch) || autoCompleteRef?.current?.changed)
    ) {
      setLoading(true);
      autoCompleteRef.current.isLoading = true;
      async(query, (results: any) => {
        setLoading(false);
        results.map((r) => {
          r.refId = query || "FILTER";
          return r;
        });
        setOptions(results);
        if (autoCompleteRef.current) {
          autoCompleteRef.current.changed = false;
          autoCompleteRef.current.isLoading = false;
        }
        if (!firstSearch) {
          setFirstSearch(true);
        }
      });
    } else if (props.options) {
      setOptions(props.options);
    }
  }, [async, query, options, firstSearch, props]);

  const handleChange = (event: any) => {
    if (async && !other.freeSolo) {
      if (autoCompleteRef.current) {
        autoCompleteRef.current.changed = true;
      }
      setQuery(event.target.value);
      setLoading(true);
    }  
    if(other.freeSolo && other.onChange && !other?.disableInput) {
      let value = {};
      value[label] = event.target.value
      other.onChange(event, value);
    }  
  };

  const filterOptions = async
    ? createFilterOptions({
        stringify: (option: any) => option.refId,
      })
    : createFilterOptions({
        matchFrom: "any",
      });

  return (
    <Autocomplete
      {...other}
      ref={autoCompleteRef}
      className={`${classes.root} ${other.freeSolo && "freeSolo"}`}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      loading={loading}
      filterOptions={filterOptions}
      options={options || []}
      getOptionLabel={(option: any) =>
        getOptionLabel
          ? getOptionLabel(option)
          : label
          ? option[label]
          : option.title
      }
      popupIcon={<CaretDownIcon />}
      renderInput={(params) => (
        <>
          {renderInput && renderInput(params) || (
            <div ref={params.InputProps.ref}>
              <TextField
                {...params}
                label={inputPlaceholder || ""}
                helperText={helperText}
                error={Boolean(error)} 
                disabled={!!other?.disableInput}
                onKeyPress={(event: any) => {
                  if(!!other?.disableInput) {
                    event.preventDefault();                                     
                  }
                }} 
                onKeyDown={(event: any) => {
                  if(!!other?.disableInput) {
                    event.preventDefault();                                     
                  }
                }}
                onClick={() => {
                  if(other.freeSolo && autoCompleteRef?.current) {                    
                    setLoading(true);
                    async(query, (results: any) => {
                      setLoading(false);
                      results.map((r: any) => {
                        r.refId = query || "FILTER";
                        return r;
                      });
                      setOptions(results);                      
                    });
                  }
                }}                
                InputProps={{
                  ...params.InputProps,
                  ...props.inputprops,              
                  classes: { input: classes.inputFilter },
                  onChange: handleChange,                                   
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                placeholder=""
                variant="outlined"
              />
            </div>
          )}          
        </>
      )}
    />
  );
}
