import React, { FC, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FormattedMessage, injectIntl } from "react-intl";
import Drawer from "@material-ui/core/Drawer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@components/Button";
import Checkbox from "@components/Checkbox";
import Radio from "@components/Radio";
import MagnifyingGlassPlusIcon from "@icons/MagnifyingGlassPlus";
import SquaresFourIcon from "@icons/SquaresFour";
import CheckCircleIcon from "@icons/CheckCircle";
import SecurityUserIcon from "@icons/SecurityUser";
import PeopleIcon from "@icons/People";
import CaretUpIcon from "@icons/CaretUp";
import CaretDownIcon from "@icons/CaretDown";
import CaretRightIcon from "@icons/CaretRight";
import FilterIcon from "@icons/Filter";
import XIcon from "@icons/X";
import SearchIcon from "@icons/Search";
import UserIcon from "@icons/UserAdd";
import { isDefined } from '@utils/index';
import type { FilterProps, FilterType, FilterValueType } from "./types";
import { deepCopyFunction } from "@utils/index";
import apolloClient from "@utils/apollo-client";
import { GET_SELF_SERVICE_FILTERS } from "@portal/Search/queries";
import { 
  useStyles, 
  BoxButton,
  ButtonFilter,
  ButtonFilterIcon,
  ButtonFilterIconCaretRight,
  BoxFilters,
  BoxFiltersHeader,
  Header, 
  HeaderTitle,
  HeaderDivider,
  CloseHeader, 
  BoxHeader, 
  BoxHeaderTitle,
  BoxHeaderInputSearch,
  BoxContainerTitle,
  BoxContainerTitleText,
  BoxContainerTitleTagContent,
  BoxContainerTitleTag,  
  BoxFilterDivider,
  BoxFilter,
  BoxFilterIcon,
  BoxFilterContent,
  BoxFilterClearContent,
  BoxFilterClear,
  BoxFooter,
  BoxHeaderInputFilter,
} from "./styles";

const initFilters = (filters: any, filterMapReference: any) => {
  const _filteredItems: { [key: string]: any } = {};
  filters.forEach((f:FilterType) => {
    _filteredItems[f.name] = {};
    const ref = {
      name: f.name,
      type: f.type,
      values: []
    };

    filterMapReference[f.name] = ref  
  });
  return _filteredItems;
};

const Filters: FC<FilterProps> = ({ classes, intl, activeType, onSave }) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");        
  const [filters, setFilters] = useState([]);
  const [filtered, setFiltered] = useState<{[key: string]: any}>({}); 
  const [filterMapReference, setFilterMapReference] = useState<{[key: string]: any}>({});
  const [current, setCurrent] = useState<string>("");

  useEffect(() => {
    if(!current || (current !== activeType)) {

      apolloClient
      .query({
        query: GET_SELF_SERVICE_FILTERS,
        variables: {
          type: activeType
        },
      })
      .then(({ data }) => {
        setFilters(deepCopyFunction(data.getSelfServiceFilters));        
        setFiltered({
          total: 0,   
          ...initFilters(data.getSelfServiceFilters, filterMapReference)   
        })      
      });
      
      setCurrent(activeType);
    }  
  }, [current, activeType, filterMapReference]);  

  const clearAll = (): void => {    
    setFiltered({
      total: 0,   
      ...initFilters(filters, filterMapReference)   
    });
    onSave(filterMapReference, 0);
  };

  const closeFilters = (event: any): void => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };

  const changeFilter = (filter: FilterType, value: any, property: string, options?: FilterValueType[], valueObject?: any): void => {
    let _filtered = {...filtered};     
    if(options) {
      options.forEach((o) => {  
        if(value) {
          if(!_filtered[filter.name][o.value]) {
            _filtered.total++;
            filterMapReference[filter.name].values.push(o);
          }          
        } else {
          if(_filtered[filter.name][o.value]) {
            --_filtered.total;
            filterMapReference[filter.name].values = filterMapReference[filter.name].values.filter((v: any) => v.value !== o.value) || [];
          }          
        }
        _filtered[filter.name][o.value] = value;
      });     
    } else if (filter.type === 'TEXT') {
      if(value) {  
        if(!filterMapReference[filter.name].values.length) {
          _filtered.total++;                  
          filterMapReference[filter.name].values.push(valueObject);
        } else {
          filterMapReference[filter.name].values[0] = valueObject;
        }               
      } else {
        filterMapReference[filter.name].values = [];
        _filtered.total--;           
      }
    } else if(filter.type !== 'BOOLEAN'){
      if(value) {        
        _filtered.total++;    
        filterMapReference[filter.name].values.push(valueObject);             
      } else {       
        _filtered.total--;
        filterMapReference[filter.name].values = filterMapReference[filter.name].values.filter((v: any) => v.value !== valueObject.value) || [];         
      }
      if(filter.values) {
        var selectedFilters = filter.values.filter((v) => _filtered[filter.name][v.value]);
        if(selectedFilters.length + (value && 1 || -1) === filter.values.length) {
          _filtered[filter.name].selected = true;          
        } else {
          _filtered[filter.name].selected = false;          
        }
      }
    } else {
      if(isDefined(value) && !isDefined(filtered[filter.name].selected)) {
        _filtered.total++;                  
      } else if(!isDefined(value)) {
        _filtered.total--;
      }      
    }     
    
    _filtered[filter.name][property] = value; 
    setFiltered(_filtered);
    onSave(filterMapReference, _filtered?.total);
  };

  const currentFilter: { [key: string]: any } = {
    ALL: {
      icon: <MagnifyingGlassPlusIcon width={18} height={18}/>,
      text: <FormattedMessage id="all" />,
    },
    ROLE: {
      icon: <PeopleIcon width={18} height={18}/>,
      text: <FormattedMessage id="roles" />,
    },
    ADMIN_PASSWORD: {
      icon: <SecurityUserIcon width={18} height={18}/>,
      text: <FormattedMessage id="adminAccounts" />,
    },
    ENTITLEMENT: {
      icon: <CheckCircleIcon width={18} height={18}/>,
      text: <FormattedMessage id="entitlements" />,
    },
    RESOURCE: {
      icon: <SquaresFourIcon width={18} height={18}/>,
      text: <FormattedMessage id="resources" />,
    },
    USER: {
      icon: <UserIcon width={18} height={18}/>,
      text: <FormattedMessage id="users" />,
    }
  };

  return (
    <>
      <BoxButton>
        <ButtonFilter onClick={() => setOpen(true)}>
          <ButtonFilterIcon>
            <FilterIcon width={20} height={20} />
          </ButtonFilterIcon>
          <FormattedMessage id="filters"/>
          <ButtonFilterIconCaretRight>
            <CaretRightIcon width={20} height={20} />
          </ButtonFilterIconCaretRight>
        </ButtonFilter>
      </BoxButton>
      <Drawer anchor="right" open={open} onClose={closeFilters}>
        <BoxFilters>
          <BoxFiltersHeader>    
            <Header>
              <HeaderTitle>
                <FormattedMessage id="filters"/>
              </HeaderTitle>
              <CloseHeader onClick={closeFilters}>
                <XIcon/>
              </CloseHeader>
            </Header>                   
            <HeaderDivider />
            <BoxHeader>
              <BoxHeaderTitle>
                {filtered.total > 0 ? (
                  <>
                    {filtered.total} {filtered.total === 1 ? <FormattedMessage id="filter.selected" /> : <FormattedMessage id="filters.selected" />}
                  </>
                ) : (
                  <>
                    <FormattedMessage id="filters.no.selected" />
                  </>
                )}  
              </BoxHeaderTitle>
              <BoxHeaderInputSearch                
                id="header-search"
                placeholder={intl.formatMessage({ id: "search.filters" })}                
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon width={25} height={25} color="#60636A" />
                  </InputAdornment>
                }
                onChange={(event) => setFilter(event.target.value)}
                labelWidth={0}
              />
            </BoxHeader>                        
          </BoxFiltersHeader>
          <>
            <BoxContainerTitle>
              <BoxContainerTitleText>
                <FormattedMessage id="filters" />
              </BoxContainerTitleText>
              <BoxContainerTitleTagContent>
                <BoxContainerTitleTag>
                  {currentFilter[activeType].icon}
                  <span>{currentFilter[activeType].text}</span>
                </BoxContainerTitleTag>
                <CaretDownIcon width={21} height={21} color="#676378"/>
              </BoxContainerTitleTagContent>
            </BoxContainerTitle>
            {filters
              .filter((f: FilterType) => f.label.toLocaleUpperCase().indexOf(filter.toLocaleUpperCase()) > -1)
              .map((f: FilterType, index: number) =>
              f.type !== "TEXT" ? (
                <div
                  key={`filter-${f.name}`}                                 
                >                  
                  <BoxFilter>                   
                    {f.type === "MULTTEXT" ? (
                      <Checkbox
                        label={f.label}   
                        value={filtered[f.name]?.selected}                     
                        onChange={(value:any) => changeFilter(f, value, "selected", f.values)}
                      />
                    ) : null}
                    {f.type === "BOOLEAN" ? <div>{f.label}</div> : null}
                    <BoxFilterIcon                       
                      onClick={() => {
                        let _filters = [...filters];
                        if(_filters[index]) {
                          const _filter: FilterType = _filters[index]
                          _filter.expanded = !f.expanded;
                          setFilters(_filters);
                        }                        
                      }}>
                        {f.expanded ? <CaretUpIcon width={26}/>: <CaretDownIcon width={26}/>}
                    </BoxFilterIcon>
                  </BoxFilter>
                  <BoxFilterDivider />                  
                  {f.expanded && f.type === "MULTTEXT"
                    ? f.values.map((v: any) => (
                        <BoxFilterContent
                          key={`filter-${f.name}-value-${v.value}`}
                          className={`${classes.searchFiltersContent} ${classes.filtersItem}`}
                        >
                          <Checkbox
                            label={v.label}
                            value={filtered[f.name][v.value]}
                            onChange={(value:any) => changeFilter(f, value, v.value, undefined, v)}
                          />
                        </BoxFilterContent>
                      ))
                    : null}
                  {f.expanded && f.type === "BOOLEAN" ? (
                    <BoxFilterContent>
                      <div>
                        <FormControlLabel
                          value="right"
                          control={
                            <Radio 
                              checked={filtered[f.name]['selected'] || false}
                              onChange={() =>changeFilter(f, true, 'selected')}
                            />
                          }
                          label={<FormattedMessage id="enabled" />}
                          labelPlacement="end"
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          value="right"
                          control={
                            <Radio
                              checked={filtered[f.name]['selected'] === false || false} 
                              onChange={() =>changeFilter(f, false, 'selected')}
                            />
                          }
                          label={<FormattedMessage id="disabled" />}
                          labelPlacement="end"
                        />
                      </div>
                    </BoxFilterContent>
                  ) : null}
                  {f.expanded ? (
                    <>
                      <BoxFilterDivider />
                      <BoxFilterClearContent>
                        <BoxFilterClear onClick={() => changeFilter(f, f.type !== 'BOOLEAN' ? false : undefined, "selected", f.type !== 'BOOLEAN' ? f.values : undefined)}>
                          <XIcon width={15} height={15}/>
                          <FormattedMessage id="search.filters.clear.all" />
                        </BoxFilterClear>
                      </BoxFilterClearContent>                      
                    </>  
                  ) : null}
                </div>
              ) :  (
                <BoxHeaderInputFilter
                  placeholder={f.label}    
                  value={filtered[f.name]?.resourceName}                                            
                  onChange={(e:any) => changeFilter(f, e?.target?.value, "resourceName", undefined, {value: e?.target?.value})}
                />
              )
            )}
          </>
        </BoxFilters>
        <BoxFooter>         
          <Button
            variant="contained"
            color="default-primary"
            onClick={clearAll}>
            <FormattedMessage id="search.filters.clear" />
          </Button>          
        </BoxFooter>
      </Drawer>
    </>
  );
};

export default withStyles(useStyles)(injectIntl(Filters));
