import React from 'react'
import {Form,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'
import api from '../../api/axiosConfig'
import validator from "validator";
import './Footer.css'


const Footer = () => {

    const [email,setEmail] = useState('')
    const [validated, setValidated] = useState(false);
    const [error,setError] = useState()
    const [message,setMessage] = useState('')

    async function handleSubmit(e){
        e.preventDefault();
        
        if(!validated){
            setError('Email is not valid!')
        }
        else{
        try {
        const response = await api.post('/api/v1/newsletter', {mail:email} );
        setEmail('')
        setValidated(false)
        setMessage("Email sent successfuly")
        }
        catch(error){
          setError('Something gone wrong')
        }
        }
    }

    function handleChange(e){
    const value = e.target.value
        setMessage('')
        setEmail(value)
        if(email!=='' && validator.isEmail(email)){
        setValidated(true)
        }
        else{
            setValidated(false)
        }
        setError('')
    }

  return (
    <footer className='footer-container'>
        <FontAwesomeIcon icon={faGithubAlt}/>
        <Form className='footer-form'>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Newsletter</Form.Label>
            {error ? <p style={{color:"red"}}> {error} </p>:''}
            {message ? <p style={{color:"green"}}> {message} </p>:''}
            <Form.Control type="email" isValid={validated} value={email} onChange={handleChange} placeholder={'john@doe.com'}/>
        </Form.Group>
        <Button variant="outline-info" onClick={handleSubmit}>Submit</Button>
        </Form>
    </footer>
  )
}

export default Footer