import {Col, Container, Row} from 'react-bootstrap'
import newsLetterStyles from '../styles/Newsletter.module.css'

function NewsLetter() {
    return (
        <section className={newsLetterStyles.newsLetter}>
            <Container>
                <Row>
                    <Col sm={12} md={9}>
                        <h2>Subscribe to the Newsletter for special offers!</h2>
                        <form>
                            <input
                                type='text'
                                name='newsletter'
                                placeholder='Email'
                            />
                            <button type='submit' className={`btn btnWhite`}>
                                Subscribe
                            </button>
                        </form>
                    </Col>
                    <Col sm={12} md={3}></Col>
                </Row>
            </Container>
        </section>
    )
}

export default NewsLetter
