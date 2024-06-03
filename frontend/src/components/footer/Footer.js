import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'

const Footer = () => {
  return (
    <footer style={{width: '100%',display: 'flex', justifyContent: 'center', position: 'relative', bottom: '0'}}>
        <Container>
        <Row>
            <Col className='text-center py-3'>Copyright @ Notezipper</Col>
        </Row>
    </Container>
    </footer>
    
  )
}

export default Footer
