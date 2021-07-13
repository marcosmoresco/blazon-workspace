
import React, { Component } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { injectIntl, FormattedMessage } from 'react-intl'
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import TextField from '../TextField'
import Select from '../Select'
import Autocomplete from '../Autocomplete'
import DatePicker from '../DatePicker'
import FilterIcon from '@icons/Filter'
import CaretDownIcon from '@icons/CaretDown'
import CaretUpIcon from '@icons/CaretUp'
import closeIcon from './images/x.svg'
import addIcon from './images/add.svg'
import { connect } from 'react-redux'
import { deepCopyFunction } from '@utils/index'
import useStyles from './styles'
import type { FilterPropsType, FilterStateType, FilterType } from './types'

class Filter extends Component<FilterPropsType, FilterStateType> {
    
  constructor(props:FilterPropsType) {

    super(props)
    
    this.state = {           
      open: false,
      selectedIndex: undefined,     
      selectedFilter: undefined,
      filterText: '',
      filtered: [],
      filters: []
    }    
        
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSelectFilter = this.handleSelectFilter.bind(this)
    this.handleChangeComponent = this.handleChangeComponent.bind(this)
    this.getFilterComponent = this.getFilterComponent.bind(this)
    this.addFilter = this.addFilter.bind(this)
    this.removeFilter = this.removeFilter.bind(this)
    this.getFilters = this.getFilters.bind(this)
  }

  async generateFilters(filters:FilterType[], callback:any) {
    if(filters && filters.length) {
      for( const f of filters ) {
        if(f.$promise) {          
          let resp = await f.$promise   
          f.values = resp.payload
        }       
      }      
    }

    callback()
  }

  componentDidMount() {

    const { filters, intl } = this.props

    this.generateFilters(filters || [], () => {   
      (filters || []).forEach((f:FilterType) => {
        if(f.label && f.label.type) {
          f.label = intl.formatMessage({id: f.label.props.id}) 
        }          
      })  
      this.setState({
        ...this.state,
        filters: deepCopyFunction(filters)
      }, () => {
        if(filters) {
          filters.forEach((f) => {
            if(f.value) {
              this.addFilter(null, f)
            } else if(f.type === 'group' && f.list[0].value) {
              this.addFilter(null, f)
            }
          })
        }        
      })
    })   
  }

  componentDidUpdate() {

    const { filters } = this.props

    if((!this.state.filters || !this.state.filters.length) && filters && filters.length) {     
      this.setState({
        ...this.state,
        filters: [...filters]
      })
    } else if((!filters || !filters.length) && (this.state.filters && this.state.filters.length)) {
      this.setState({
        ...this.state,
        filters: [...filters],
        filtered: [],
        selectedIndex: undefined,     
        selectedFilter: undefined
      })
    }
  }

  handleClick() {
    this.setState({
      ...this.state, 
      selectedIndex: undefined,  
      open: true      
    })   
  }

  handleClose() {
    this.setState({
      ...this.state,       
      open: false
    })
  }

  handleSelectFilter(index:number, filter:FilterType) {
    
    const { filtered } = this.state
        
    if(filter.type === "boolean" && filtered.indexOf(filter.name) === -1) {
      filter.value = filter.value ? null : filter.defaultValue || true      
      if(!filter.value) {                 
        const index = filtered.indexOf(filter.name)
        filtered.splice(index, 1)
      }   
    }


    const _filter = JSON.parse(JSON.stringify(filter))    
    this.setState({
      ...this.state,     
      selectedIndex: index,
      selectedFilter: {..._filter},
      filtered     
    }, () => {
      if(filter.type === "boolean") {
        this.addFilter(null, undefined)
      }     
    })  
  }

  handleChangeComponent(value:any, type?:string) {

    const { selectedFilter } = this.state
    if(selectedFilter) {
      if(selectedFilter.type === 'date' && type) {
      
        if(!selectedFilter.value) {
          selectedFilter.value = {}
        }
        selectedFilter.value[type] = value
      } else if(selectedFilter.type === "group") {
        if(selectedFilter.list) {
          const filtered = selectedFilter.list.filter((s:FilterType) => s.name === type)
          if(filtered && filtered.length) {
            filtered[0].value = value
          }
        }
      } else {
        selectedFilter.value = value
      }
    }    

    this.setState({
      ...this.state,           
      selectedFilter     
    })    
  } 

  addFilter(e:any, _filter?:FilterType) {
    
    const { onChange } = this.props
    const { selectedFilter, filtered, filters } = this.state    
    const _selectedFilter = _filter || selectedFilter
        
    if(_selectedFilter) {
      const filterList = filters.filter((f:FilterType) => f.name === _selectedFilter.name)    
      if(filterList && filterList.length) {
        if(_selectedFilter.type === "group") {
          filterList[0].list =  _selectedFilter.list
        } else {        
          filterList[0].value =  _selectedFilter.value
        }      
      }

      this.setState({
        ...this.state,   
        selectedFilter: undefined,
        selectedIndex: undefined,
        filtered: filtered.indexOf(_selectedFilter.name) === -1 ? [...filtered, _selectedFilter.name] : [...filtered]     
      })

      if(onChange) {
        let _filters: { [key: string]: any } = {}
        filters.forEach((f:FilterType) => {
          if(filtered.indexOf(f.name) > -1 || f.name === _selectedFilter.name) {         
            if(f.type === 'list' && f.bind && f.values.length > 10) {
              _filters[f.name] = (f.formatValue && f.formatValue(f.value[f.bind])) || f.value[f.bind]  
            } else if(f.type === 'date' && f.bind) {
              _filters[f.bind.start] = f.value.start
              _filters[f.bind.end] = f.value.end
            } else if(f.type === 'group') {                                               
              _filters[f.name] = {}
              _filters[f.name][f.list[0].value] = f.list[1].value                              
            } else {
              _filters[f.bindValue ? f.bindValue : f.name] = (f.formatValue && f.formatValue(f.value)) || f.value
            }          
          } 
        })
        onChange(_filters)
      }
    }
  }

  removeFilter(event:any, item:FilterType) {

    const { onChange } = this.props
    const { filtered, selectedIndex, selectedFilter, filters } = this.state

    event.stopPropagation()

    item.value = null
    const index = filtered.indexOf(item.name)
    filtered.splice(index, 1)
    
    this.setState({       
      selectedFilter: selectedFilter && selectedFilter.name === item.name ? undefined : selectedFilter,
      selectedIndex: selectedFilter && selectedFilter.name === item.name ? undefined : selectedIndex,            
      filtered,        
    })   
    
    if(onChange) {
      let _filters: { [key: string]: any } = {}
      filters.forEach((f:FilterType) => {
        if(filtered.indexOf(f.name) > -1 && (!selectedFilter || f.name !== selectedFilter.name)) {
          _filters[f.name] = f.value
        } 
      })
      onChange(_filters)
    }
  }

  handleKeyDown = (event:any, enableClick:any) => {
    if (event.key === "Enter" && enableClick) {
      this.addFilter(null, undefined)
    }
  }

  getFilterComponent() {

    const { classes, dispatch, isLoading } = this.props
    const { filters, selectedIndex, selectedFilter } = this.state    

    let filter = selectedIndex !== undefined && filters[selectedIndex] || null
    let component = null        
    
    if(filter && selectedFilter) {
      if(['text', 'number'].indexOf(filter.type) > -1) {        
        component = (
          <TextField
            id={`filter-${filter.name}`}  
            label={filter.label}              
            type={filter.type} 
            value={selectedFilter.value || ''}
            onChange={(event:any) => this.handleChangeComponent(event.target.value)} 
            placeholder={filter.type === 'text' ? 'Enter the text' : 'Enter the number'}                      
          />  
        )
      } else if(filter.type === 'list') {
        if(filter.values && filter.values.length) {
          if(filter.values.length <= 10) {
            component = (
              <Select 
                label={filter.label}  
                value={selectedFilter.value || ''}             
                options={filter.values}             
                onChange={(event:any) => this.handleChangeComponent(event.target.value)} 
                bind={filter.bind ? filter.bind : null}
                view={filter.view ? filter.view : null}
              />
            )
          } else {                         
            component = (
              <div>
                <label>{filter.label}</label>
                <Autocomplete 
                  filterSelectedOptions
                  label={filter.view}  
                  value={selectedFilter.value || {[filter.view] : ''}}             
                  options={filter.values}             
                  onChange={(event:any, value:any) => this.handleChangeComponent(value)} 
                />
              </div>              
            )
          }
        } else if(filter.async) {

          let inputprops: { [key: string]: any } = {}
          if(filter.startAdornment) {
            inputprops.startAdornment = filter.startAdornment(selectedFilter.value)            
          }

          component = (
            <div>
              <label>{filter.label}</label>
              <Autocomplete 
                key={`filter-${filter.name}`}
                async={(query:any, callback:any) => filter && filter.async(dispatch, query, callback) || null} 
                filterSelectedOptions
                label={filter.view}  
                value={selectedFilter.value || {[filter.view] : ''}}             
                options={filter.values}             
                renderOption={filter.renderOption}
                inputprops={inputprops}
                onChange={(event:any, value:any) => this.handleChangeComponent(value)} 
              />
            </div>              
          )
        }             
      } else if(filter.type === 'date') {
        component = (
          <div className="Date-filter">
            <DatePicker 
              isTime
              label="Início"
              style={{marginRight: 15}}
              value={(!!selectedFilter.value && selectedFilter.value.start) || null}
              onChange={(date:any) => this.handleChangeComponent(date, 'start')}
            />
            <DatePicker 
              isTime
              label="Fim"
              value={(!!selectedFilter.value && selectedFilter.value.end) || null}
              onChange={(date:any) => this.handleChangeComponent(date, 'end')}
            />
          </div>            
        )
      } else if(filter.type === "group" && selectedFilter.list) {       
        component = (
          selectedFilter.list.map((f:FilterType) => {
            return (
              <div key={`filter-group-${f.name}`}>
                <TextField                  
                  id={`filter-${f.name}`}  
                  label={f.label}              
                  type={f.type} 
                  value={f.value || ""}
                  onChange={(event:any) => this.handleChangeComponent(event.target.value, f.name)} 
                  placeholder={f.type === 'text' ? 'Enter the text' : 'Enter the number'}                      
                />
              </div>              
            )
          })
        )
      }      
    }   
    
    const enableClick = selectedFilter && !isLoading && 
    ((
      selectedFilter.type === "date" && 
      selectedFilter.value && 
      selectedFilter.value.start && 
      selectedFilter.value.end
    ) || (
      selectedFilter.type === "group" && 
      selectedFilter.list && 
      selectedFilter.list[0].value && 
      selectedFilter.list[1].value
    ) || (
      selectedFilter.type !== "date" && 
      selectedFilter.value
    ))

    return (component && (
      <React.Fragment>
        <div className={classes.filterContainer} onKeyPress={(event) => this.handleKeyDown(event, enableClick)}>
          <div className="Filter-component">
            {component}
          </div>          
          <div 
            className="Add-icon"
            onClick={enableClick ? this.addFilter : null}>
            <Image               
              alt="Add" 
              src={addIcon}             
            />
          </div>          
        </div>          
      </React.Fragment>        
    )) || null
  }

  getFilters() {

    const { filtered, filters, filterText } = this.state

    let list: FilterType[] = []

    if( filters && filters.length) {
      filters.forEach((f:FilterType) => {
        if(filtered.indexOf(f.name) === -1 && (!filterText || f.label.toLocaleUpperCase().indexOf(filterText.toLocaleUpperCase()) > -1)) {
          list.push(f)
        }
      })
    }   

    return list
  }

  getValue(filter: FilterType) {

    let value = null

    if(filter.type === 'date') {     
      value = <span>`${filter.value.start} - ${filter.value.end}`</span>
    } else if(filter.type === 'group') {
      value = <span>`${filter.label} : ${filter.list[0].value} = ${filter.list[1].value}`</span>
    } else if(filter.type === 'list' && filter.view) {
      if(filter.async) {
        if(filter.startAdornment) {
          value = (
            <div className="flex-align-center">
              {filter.startAdornment(filter.value, true)}
              <span>{filter.value[filter.view]}</span>
            </div>               
          )         
        } else {
          value =  <span>filter.value[filter.view]</span>
        }        
      } else {
        const filtered = filter.values.filter((val:any) => val[filter.bind] === (filter.values.length > 10 ? filter.value[filter.bind] : filter.value))     
        if(filtered && filtered.length) {
          value = <span>filtered[0][filter.view]</span>
        }         
      }                       
    } else {
      value = filter.value
    }    

    return value
  }
  
  render() {  

    const { classes, type, onChange, isLoading, intl } = this.props
    const { filters, open, filterText, filtered, selectedIndex } = this.state         
      
    return (
      
      <div>    
        {type !== 'simple' ? (
          <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={() => this.setState({...this.state, open: false})}
          >
           <div>
             <OutlinedInput   
               className={classes.input}     
               placeholder={filtered && filtered.length ? `${filtered.length} ${intl.formatMessage({id: filtered.length === 1 ? "filter" : "filters"})}` : intl.formatMessage({id: "search.filters"})}
               value={filterText || ''}
               onChange={(event) => this.setState({...this.state, filterText: event.target.value})}
               onClick={this.handleClick}        
               startAdornment={
               <div className={classes.inputFilterIcon}>
                  <InputAdornment position="start">
                    <FilterIcon width={20} height={20}/>
                  </InputAdornment>                  
               </div>
               }
               endAdornment={<InputAdornment position="end">{open ? <CaretUpIcon width={25}/> : <CaretDownIcon width={25}/>}</InputAdornment>}
               labelWidth={0}
             />
             {open ? (
               <div className={classes.content}>
                 {filtered && filtered.length ? ( 
                    <div>
                        <label className={classes.title}>
                          <FormattedMessage id="filters.added"/>
                        </label>
                        <div className={classes.chipsContent}>
                          {filters.map((item:any, index:any) => (                    
                            filtered.indexOf(item.name) > -1 ? (
                              <div 
                                key={`filtered-${item.name}`} 
                                className={classes.addedFilter} 
                                onClick={() => this.handleSelectFilter(index, item)}>
                                <Image alt="X" src={closeIcon} onClick={(event) => !isLoading ? this.removeFilter(event, item) : null}/>
                                <div>
                                  <div className="Filter-title">{item.label}</div>
                                  <div className="Filter-value">{this.getValue(item)}</div>
                                </div>
                              </div>
                            ) : null                                       
                          ))}                              
                        </div>
                    </div>
                   ) : null
                 } 
                 <div className={classNames({'Filters-list': filtered && !!filtered.length})}>
                   <label className={classes.title}>
                      <FormattedMessage id="filters"/>
                   </label>
                   <div>
                     {this.getFilterComponent()}
                   </div>
                   <div className={classes.chipsContent}>
                     {
                       filters.map((filter:any, index:number) => (
                         filtered.indexOf(filter.name) === -1 && 
                           (!filterText || filter.label.toLocaleUpperCase().indexOf(filterText.toLocaleUpperCase()) > -1)? ( 
                           <div 
                             key={`filter-${filter.name}`}                       
                             className={classNames({'Default-filter': true, 'active': selectedIndex === index})}
                             onClick={() => this.handleSelectFilter(index, filter)}>
                             <label>{filter.label}</label>
                           </div>
                         ) : null
                       ))
                     }
                     {
                       this.getFilters().length === 0 ? (
                          <div>
                            <FormattedMessage id="app.filters.not.found"/>
                          </div>
                       ) : null
                     }                
                   </div>
                 </div>                     
               </div>
             ) : null} 
           </div>                   
          </ClickAwayListener>  
        ) : (
          <OutlinedInput   
            id="ìnput-filter-grid"
            className={classes.input}     
            type="Search"
            placeholder="Enter filter here"            
            onChange={onChange}
            onClick={this.handleClick}        
            startAdornment={<InputAdornment position="start"><FilterIcon /></InputAdornment>}            
            labelWidth={0}
          />
        )}            
      </div>                   
    )
  }
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps)(withStyles(useStyles)(injectIntl(Filter)))