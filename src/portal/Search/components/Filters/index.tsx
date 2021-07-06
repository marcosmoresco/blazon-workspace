import React, { FC, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { FormattedMessage } from 'react-intl'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Tutorial from '@components/Tutorial'
import Checkbox from '@components/Checkbox'
import Radio from '@components/Radio'
import TableIcon from '@icons/Table'
import PuzzlePieceIcon from '@icons/PuzzlePiece'
import ArticleIcon from '@icons/Article'
import UserGearIcon from '@icons/UserGear'
import NewspaperClippingIcon from '@icons/NewspaperClipping'
import ShoppingCartSimpleIcon from '@icons/ShoppingCartSimple'
import CaretUpIcon from '@icons/CaretUp'
import CaretDownIcon from '@icons/CaretDown'
import CaretRightIcon from '@icons/CaretRight'
import FilterIcon from '@icons/Filter'
import XIcon from '@icons/X'
import type { FilterProps } from './types'
import useStyles from './styles'
import filters from './filters.json'


const Filters: FC<FilterProps> = ({classes}) => {

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('ALL')
  const [filtered] = useState({
    total: 2
  })

  const closeFilters = (event:any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(false)
  }

  const currentFilter: { [key: string]: any } = {
    "ALL": {
      icon: <TableIcon />,
      text: <FormattedMessage id="app.all"/>
    },
    "ROLE": {
      icon: <NewspaperClippingIcon />,
      text: <FormattedMessage id="app.roles"/>
    },
    "ADMIN_ACCOUNT": {
      icon: <UserGearIcon />,
      text: <FormattedMessage id="app.users"/>
    },
    "ENTITLEMENT": {
      icon: <ArticleIcon />,
      text: <FormattedMessage id="app.entitlements"/>
    },
    "RESOURCE": {
      icon: <PuzzlePieceIcon />,
      text: <FormattedMessage id="app.resources"/>
    }
  }

  return (
    <React.Fragment>                            
      <div className={classes.filters}>
        <div className={classes.filter} onClick={() => setOpen(true)}>
          <div className={classes.filterIcon}>
            <FilterIcon width={20} height={20}/>
          </div> 
          Filtros
          <span className={classes.filterCaretRight}>
            <CaretRightIcon width={20} height={20}/>
          </span>            
        </div>
      </div>                     
      <Drawer 
        anchor='right' 
        open={open} 
        onClose={closeFilters}>
          <div className={classes.searchFilters}>
            <div className={classes.searchFiltersHeader}>
              <div className="Search-filter-close" onClick={closeFilters}>
                <XIcon/>
              </div>
              <div className="Filters-selected-title">{filtered.total || 0} <FormattedMessage id="filters.selected"/></div>
              <div className="Filters-selected-subTitle"><FormattedMessage id="app.filters.review"/></div>
              <div className="Divider"></div>                                      
            </div>            
            <div className={classes.searchFiltersPadding}>
              <div className={`${classes.searchFiltersContent} Filters-header`}>
                <div className="Search-filters-title">
                  <FormattedMessage id="filters"/>
                </div>
                <div className="flex-align-center">
                  <div                     
                    className={`${classes.filterFilters} ${classes.defaultTag} active`}>
                    {currentFilter[active].icon}                    
                    <span>
                      {currentFilter[active].text}
                    </span>
                  </div>
                  <CaretDownIcon/>
                </div>  
              </div>
              {filters.items.map((f:any) => f.type !== 'TEXT' ? (               
                <div key={`filter-${f.name}`} className={`${f.expanded ? classes.filterExpanded : ""}`}>
                  <div className={`${classes.filtersItem}`}>
                    <div className={`${classes.searchFiltersContent} ${classes.searchFiltersContentTitle}`}>
                      {f.type === "MULTTEXT" ? (
                        <Checkbox
                        label={f.label}
                        //value={filtered[f.name].selected}
                        /*onChange={(value) => this.handleChangeFiltered(f, null, value, "selected", f.values)}*//>
                      ) : null} 
                      {f.type === "BOOLEAN" ? (
                        <div>{f.label}</div>
                      ) : null}                   
                      {f.expanded ? CaretUpIcon : CaretDownIcon}  
                    </div>
                    <div className={`${classes.searchFiltersContentDivider} ${f.expanded ? "Expanded" : ""}`}/>
                  </div>  
                  {f.expanded && f.type === "MULTTEXT" ? (
                    f.values.map((v:any) => (
                      <div 
                        key={`filter-${f.name}-value-${v.value}`} 
                        className={`${classes.searchFiltersContent} ${classes.filtersItem}`}>
                        <Checkbox
                          label={v.label}
                          //value={filtered[f.name][v.value]}
                          /*onChange={(value) => this.handleChangeFiltered(f, v, value, v.value)}*//>
                      </div> 
                    ))
                  ): null}   
                  {f.expanded && f.type === "BOOLEAN" ? (
                    <React.Fragment>
                      <div className={`${classes.searchFiltersContent} ${classes.filtersItem}`}>
                        <FormControlLabel
                          value="right"
                          control={<Radio/>}
                          label={<FormattedMessage id="app.enabled"/>}
                          labelPlacement="end"
                        />
                      </div>
                      <div className={`${classes.searchFiltersContent} ${classes.filtersItem}`}>
                        <FormControlLabel
                          value="right"
                          control={<Radio />}
                          label={<FormattedMessage id="app.disabled"/>}
                          labelPlacement="end"
                        />
                      </div>                      
                    </React.Fragment>                    
                  ): null}                            
                </div> 
              ) : null)}                                                 
            </div>                   
          </div>
      </Drawer>  
    </React.Fragment>
  )  
}

export default withStyles(useStyles)(Filters)