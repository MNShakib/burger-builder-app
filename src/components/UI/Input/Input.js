import React from 'react';
import './Input.css';

const input = (props) => {

    let inputElement = null;
    let inputClasses = ["InputElement"];

    if( props.invalid && props.shouldValidate && props.touched){
        inputClasses.push("Invalid");
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.defaultValue} onChange={props.change}/>
            break;
        
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.change} value={props.defaultValue}/>
            break;

        case ('select'):
                inputElement = <select 
                                    className={inputClasses.join(' ')} 
                                    {...props.elementConfig} 
                                    onChange={props.change}
                                    key={props.defaultValue}
                                    value={props.defaultValue}>
                                    {props.elementConfig.options.map((option) => (
                                        <option key={option.defaultValue} value={option.defaultValue}>
                                            {option.displayValue}
                                        </option>
                                    ))}
                                </select>
            break;

        default:
            inputElement = <input key={props.defaultValue} className={inputClasses.join(' ')} onChange={props.change} {...props.elementConfig} defaultValue={props.defaultValue}/>
    }

    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;