import React, { FC, useState, useEffect } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import SortAscendingIcon from "@icons/SortAscending";
import SortDescendingIcon from "@icons/SortDescending";
import CaretDownIcon from "@icons/CaretDown";
import type { OrdenationProps } from "./types";
import { Box, OrdenationIcon, StyledMenu,MenuItemContainer, MenuItemText } from "./styles";

const Ordenation: FC<OrdenationProps> = ({ intl, list, onChange, composed, orderBy }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [current, setCurrent] = useState(null);
  const [orderType, setOrderType] = useState("desc");
  const [currentComposed, setCurrentComposed] = useState<string>("");

  const handleOrder = (event: any) => {
    event.stopPropagation();
    const newOrderType = orderType === "desc" ? "asc" : "desc";
    setOrderType(newOrderType);  
    if(onChange && current) {
      onChange(`${current.name}:${newOrderType}`);
    }   
  }

  const handleSelect = (elem: any) => {
    setAnchorEl(null);
    setCurrent(elem); 
    if(onChange) {
      onChange(`${elem?.name}:${orderType}`);
    }   
  }

  useEffect(() => {
    console.log(list);
    if(composed) {
      if(!currentComposed) {
        setCurrentComposed(composed);
      } else if(composed !== currentComposed && list.length) {
        const defaultFilter = list.filter((f) => f.name === "identifier");
        setOrderType("desc");
        if(defaultFilter.length) {
          setCurrent(defaultFilter[0]);
        }
        setCurrentComposed(composed);
      }
    }

    if(list && !current && !orderBy) {
      const defaultFilter = list.filter((f) => f.name === "identifier");
      if(defaultFilter.length) {
        setCurrent(defaultFilter[0]);
      }
    }

    if(list && !current && orderBy) {
      const splited = orderBy.split(":");
      setOrderType(splited[1]);
      setCurrent(list.filter((f) => f.name === splited[0])[0]);
    }
  }, [composed, currentComposed, list, current, orderBy]);
 
  return (
    <>
      <Box onClick={(event: any) => setAnchorEl(event.currentTarget)}>
        <OrdenationIcon onClick={handleOrder}>
          {orderType === "asc" && <SortAscendingIcon />}   
          {orderType === "desc" && <SortDescendingIcon />}      
        </OrdenationIcon>
        {current ? current?.label : <FormattedMessage id="orderBy" />}
        <CaretDownIcon stroke={2} width={21}/>
      </Box>
      <StyledMenu        
        anchorEl={anchorEl}
        keepMounted
        disableAutoFocusItem
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {list
          .filter((elem: any) => elem.orderable)
          .map((elem: any, index) => {            
            return (
            <MenuItemContainer key={`ordenation-${index}`} onClick={() => handleSelect(elem)}>
              <MenuItemText>
                {elem?.label || " - "}
              </MenuItemText>                                
            </MenuItemContainer>
            )
        })}
               
      </StyledMenu> 
    </>
  );
};

export default injectIntl(Ordenation);
