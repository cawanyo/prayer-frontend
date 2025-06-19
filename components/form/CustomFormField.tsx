"use client"
import React from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Control } from 'react-hook-form'
import { E164Number } from 'libphonenumber-js/core'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { FormFieldType } from '@/constants'


  interface CustomProps {
    control: Control<any>,
    type: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any)  => React.ReactNode
  }



const RenderInput = ({field, props} : {field:any, props: CustomProps}) => {
    switch(props.type){
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-blue-200 bg-white text-gray-800'>
                    {
                        props.iconSrc 
                        && 
                        <Image 
                            src={props.iconSrc}
                            alt={props.iconAlt || 'icon'}
                            width={24}
                            height={24}
                            className='mx-2'
                            
                        />
                    }

                    <FormControl>
                        <Input
                        
                            placeholder={props.placeholder}
                            {...field}
                            className='shad-input border-0'
                        />
                    </FormControl>
                </div>
            )
            case FormFieldType.PASSWORD:
                return (
                    <div className='flex rounded-md border border-blue-200 bg-white text-gray-800'>
                        {
                            props.iconSrc 
                            && 
                            <Image 
                                src={props.iconSrc}
                                alt={props.iconAlt || 'icon'}
                                width={24}
                                height={24}
                                className='mx-2'
                                
                            />
                        }
    
                        <FormControl>
                            <Input
                                type='password'
                                placeholder={props.placeholder}
                                {...field}
                                value={field.value?? ""}
                                className='shad-input border-0'
                            />
                        </FormControl>
                    </div>
                )
        case FormFieldType.TEXT_AREA:
            return (
                <FormControl>
                    <Textarea 
                        placeholder={props.placeholder}
                        {...field}
                        className='shad-textArea border border-blue-200'
                        
                    />
                </FormControl>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <PhoneInput
                    defaultCountry='FR'
                    placeholder=""
                    value={field.value as E164Number | undefined}
                    onChange={field.onChange}
                    className='input-phone border border-blue-200'
                    international
                    
                />
            )
        case FormFieldType.CHECKBOX:
            return (
                <div className='flex items-center gap-2 w-full mt-4'>
                    <Checkbox
                        id={props.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={field.disabled}
                    />
                    <Label htmlFor={props.name} className='checkbox-label'>
                        {props.label}
                    </Label>

                </div>
            )
        case FormFieldType.DATE_PICKER:
            return (
                <div className=' flex rounded-md border border-blue-200 bg-dark-400'>
                    <Image
                        src={"/assets/icons/calendar.svg"}
                        height={24}
                        width={24}
                        alt='calendar'
                        className='ml-2'

                    />

                    <FormControl>
                        <DatePicker 
                            selected={field.value} 
                            onChange={(date) => field.onChange(date)} 
                            dateFormat={props.dateFormat?? 'MM/dd/yyyy' }
                            showTimeSelect={props.showTimeSelect ?? false}
                            timeInputLabel='Time:'
                            wrapperClassName='date-picker'
                            disabled={field.disabled}
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={field.disabled}>
                        <FormControl>
                            <SelectTrigger className='shad-select-trigger w-full border border-blue-200'>
                                <SelectValue placeholder={props.placeholder} />
                            </SelectTrigger>
                        </FormControl>

                        <SelectContent className='shad-select-content border border-blue-200'>
                         {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormFieldType.SKELETON:
            return (
                props.renderSkeleton ?  props.renderSkeleton(field) : null
            )
    }
}

const CustomFormField = (props: CustomProps) => {
  return (
    <FormField
        control={props.control}
        name={props.name}
        render={({ field }) => (
        <FormItem className='flex-1'>
            {
                props.type != FormFieldType.CHECKBOX && props.label &&(
                    <FormLabel className='block text-sm font-medium text-gray-700 mb-1'>{props.label}</FormLabel>
                )
            }

            <RenderInput field={field} props={props} />

            <FormMessage className=' shad-error' ></FormMessage>
        </FormItem>
        )}
    />
  )
}

export default CustomFormField
