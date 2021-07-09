import React, { FC, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FormattedMessage, injectIntl } from "react-intl";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tutorial from "@components/Tutorial";
import Button from "@components/Button";
import Checkbox from "@components/Checkbox";
import Radio from "@components/Radio";
import TableIcon from "@icons/Table";
import PuzzlePieceIcon from "@icons/PuzzlePiece";
import ArticleIcon from "@icons/Article";
import UserGearIcon from "@icons/UserGear";
import NewspaperClippingIcon from "@icons/NewspaperClipping";
import ShoppingCartSimpleIcon from "@icons/ShoppingCartSimple";
import CaretUpIcon from "@icons/CaretUp";
import CaretDownIcon from "@icons/CaretDown";
import CaretRightIcon from "@icons/CaretRight";
import FilterIcon from "@icons/Filter";
import XIcon from "@icons/X";
import SearchIcon from "@icons/Search";
import { isDefined } from '@utils/index';
import type { FilterProps, FilterType, FilterValueType } from "./types";
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
} from "./styles";
import items from "./filters.json";

const Filters: FC<FilterProps> = ({ classes, intl, onSave }) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [active, setActive] = useState("ALL");      
  const [filters, setFilters] = useState({...items});

  const initFilters = () => {
    const _filteredItems: { [key: string]: any } = {};
    items.items.forEach((f:FilterType) => (
      _filteredItems[f.name] = {}
    ));
    return _filteredItems;
  };

  const [filtered, setFiltered] = useState<{[key: string]: any}>({
    total: 0,   
    ...initFilters()   
  });

  const clearAll = (): void => {    
    setFiltered({
      total: 0,   
      ...initFilters()   
    });
  };

  const save = (): void => {
    setOpen(false);
    onSave(filtered);
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

  const changeFilter = (filter: FilterType, value: any, property: string, options?: FilterValueType[]): void => {
    let _filtered = {...filtered};     
    if(options) {
      options.forEach((o) => {  
        if(value) {
          if(!_filtered[filter.name][o.value]) {
            _filtered.total++;
          }          
        } else {
          if(_filtered[filter.name][o.value]) {
            --_filtered.total;
          }          
        }
        _filtered[filter.name][o.value] = value;
      });     
    } else if(filter.type !== 'BOOLEAN'){
      if(value) {
        _filtered.total++;          
      } else {
        _filtered.total--;           
      }
      if(filter.values) {
        var selectedFilters = filter.values.filter((v) => _filtered[filter.name][v.value]);
        if(selectedFilters.length === filter.values.length) {
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
  };

  const currentFilter: { [key: string]: any } = {
    ALL: {
      icon: <TableIcon width={18} height={18}/>,
      text: 'Todos',
    },
    ROLE: {
      icon: <NewspaperClippingIcon width={18} height={18}/>,
      text: <FormattedMessage id="app.roles" />,
    },
    ADMIN_ACCOUNT: {
      icon: <UserGearIcon width={18} height={18}/>,
      text: <FormattedMessage id="app.users" />,
    },
    ENTITLEMENT: {
      icon: <ArticleIcon width={18} height={18}/>,
      text: <FormattedMessage id="app.entitlements" />,
    },
    RESOURCE: {
      icon: <PuzzlePieceIcon width={18} height={18}/>,
      text: <FormattedMessage id="app.resources" />,
    },
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
                  {currentFilter[active].icon}
                  <span>{currentFilter[active].text}</span>
                </BoxContainerTitleTag>
                <CaretDownIcon width={21} height={21} color="#676378"/>
              </BoxContainerTitleTagContent>
            </BoxContainerTitle>
            {filters.items
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
                        value={filtered[f.name].selected}                     
                        onChange={(value:any) => changeFilter(f, value, "selected", f.values)}
                      />
                    ) : null}
                    {f.type === "BOOLEAN" ? <div>{f.label}</div> : null}
                    <BoxFilterIcon                       
                      onClick={() => {
                        let _filters = {...filters};
                        if(_filters.items[index]) {
                          const _filter: FilterType = _filters.items[index]
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
                            onChange={(value:any) => changeFilter(f, value, v.value)}
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
                          Limpar todos
                        </BoxFilterClear>
                      </BoxFilterClearContent>                      
                    </>  
                  ) : null}
                </div>
              ) : null
            )}
          </>
        </BoxFilters>
        <BoxFooter>         
          <Button
            variant="contained"
            color="default-primary"
            onClick={clearAll}>
            Limpar filtros
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={save}>
            Salvar
          </Button>
        </BoxFooter>
      </Drawer>
    </>
  );
};

export default withStyles(useStyles)(injectIntl(Filters));
