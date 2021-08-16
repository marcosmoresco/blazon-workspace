// vendors
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { IconButton, InputAdornment } from "@material-ui/core";

//types
import { ContinueProps } from "./types";

// styles
import { Box, BoxCard, Label } from "./styles";

//components
import TextField from "@material-ui/core/TextField";

//icons
import EyeSlashIcon from '@icons/EyeSlash'
import EyeIcon from '@icons/Eye'

const Continue: React.FC<ContinueProps> = ({ task, stage, payload, setPayload }) => {

  const intl = useIntl();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <Box>
        <BoxCard>
          {task?.type === "CREATE_ACCOUNT" && (
           <>
            {stage !== "SET_USERNAME_PASSWORD" && (
              <>
                <Label>
                  {intl.formatMessage({
                    id: "accountIdentifier"                      
                  })}
                </Label>
                <TextField                   
                  value={payload?.accountIdentifier || ""} 
                  fullWidth={true} 
                  variant="outlined" 
                  error={payload && !payload.accountIdentifier}
                  helperText={(payload && !payload.accountIdentifier && (
                    intl.formatMessage({
                      id: "isRequired"                      
                    }, {
                      field: intl.formatMessage({
                        id: "accountIdentifier"                      
                      })
                    }))) || ""
                  }
                  onChange={(e) => setPayload({accountIdentifier: e.target.value})}
                />
              </>
            )}  
            {stage === "SET_USERNAME_PASSWORD" && (
              <>
                <Label>
                  {intl.formatMessage({
                    id: "username"                      
                  })}
                </Label>
                <TextField                   
                  value={payload?.username || ""} 
                  fullWidth={true} 
                  variant="outlined" 
                  error={payload && !payload.username}
                  helperText={(payload && !payload.username && (
                    intl.formatMessage({
                      id: "isRequired"                      
                    }, {
                      field: intl.formatMessage({
                        id: "username"                      
                      })
                    }))) || ""
                  }
                  onChange={(e) => setPayload({...payload, username: e.target.value})}
                />
                <Label className="Add-top">
                  {intl.formatMessage({
                    id: "password"                      
                  })}
                </Label>
                <TextField    
                  type={!showPassword && "password" || "text"}               
                  value={payload?.password || ""} 
                  fullWidth={true} 
                  variant="outlined" 
                  error={payload && !payload.password}
                  helperText={(payload && !payload.password && (
                    intl.formatMessage({
                      id: "isRequired"                      
                    }, {
                      field: intl.formatMessage({
                        id: "password"                      
                      })
                    }))) || ""
                  }
                  InputProps={{
                    endAdornment: 
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                        </IconButton>
                      </InputAdornment>                    
                  }}                  
                  onChange={(e) => setPayload({...payload, password: e.target.value})}
                />
              </>
            )}         
           </>           
          ) || (
            <TextField    
              type={!showPassword && "password" || "text"}               
              value={payload?.password || ""} 
              fullWidth={true} 
              variant="outlined" 
              error={payload && !payload.password}
              helperText={(payload && !payload.password && (
                intl.formatMessage({
                  id: "isRequired"                      
                }, {
                  field: intl.formatMessage({
                    id: "password"                      
                  })
                }))) || ""
              }
              InputProps={{
                endAdornment: 
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                    </IconButton>
                  </InputAdornment>                    
              }}                  
              onChange={(e) => setPayload({password: e.target.value})}
            />
          )}
        </BoxCard>
      </Box>
    </>
  );
};

export default Continue;
