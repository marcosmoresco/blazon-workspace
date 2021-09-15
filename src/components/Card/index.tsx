import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({    
  root: props => ({
    marginTop: props.margintop || 23,  
    marginBottom: props.marginbottom || 23,    
    border: props.border || "none",  
    boxShadow: props.boxshadow || '0px 0px 28px rgba(0, 0, 0, 0.25)',    
    '& .Card-header': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '24px 24px 0px 24px'
    },
    '& .Card-actions': {
      display: 'flex', 
      '&.Default-type': {
        marginTop: 30
      },
      '& .Actions': {
        marginRight: 20,
        display: 'flex'
      },              
      '& .Action': {
        backgroundColor: '#E9E9EA',
        width: 42,
        height: 42,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%', 
        cursor: 'pointer',
        '&:not(:last-child)': {
          marginRight: 10
        },        
        '& img': {
          width: 24,
          height: 24
        }                                    
      },      
      '& .Default-button': {
        marginLeft: 15
      }      
    }
  })  
}));

export default function CustomizedCard(props) { 
  
    const classes = useStyles(props) 
  
    return (
      
        <Card   
        {...props}                                   
        className={classes.root}
        >
          {props.children}
        </Card>
                                                           
    )
} 