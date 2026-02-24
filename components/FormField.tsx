import React from 'react'
//import { FormField } from './ui/form'
import { FormItem } from './ui/form'
import { FormLabel ,FormControl , FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Controller, FieldValues, Path , Control } from 'react-hook-form'
interface FormFieldProps<T extends FieldValues>{
    control : Control<T>;
    name : Path<T>;
    label : string;
    placeholder ? : string;
    type ?: 'text' | 'email' | 'file'

}

const FormField = <T extends FieldValues>({control , name , label , placeholder, type = "text"} : FormFieldProps<T>) => (
    <Controller name = {name} control={control} render = {({field}) => (
            <FormItem>
                <FormLabel className='label'>{label}</FormLabel>
                <FormControl>
                  <Input  className= "input" placeholder={placeholder} type = {type} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
    )}
/>
)     
          


export default FormField;