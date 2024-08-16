import Image from 'next/image'
import {Container, Row, Col} from 'react-bootstrap'
import aboutStyles from './About.module.css'

function About() {
    return (
        <section className={aboutStyles.about}>
            <Container className={aboutStyles.aboutContainer}>
                <Row className='displayNoneAtMobile'>
                    <Col className={aboutStyles.reviewCol}>
                        <p>
                            See our{' '}
                            <strong>
                                <span id='trustpilot-reviews'>82</span>
                            </strong>
                            {' reviews '}
                            on
                        </p>
                        <Image
                            src='/images/trustpilot-icon.png'
                            width={70}
                            height={70}
                            alt='Trustpilot'
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className={aboutStyles.aboutCol}>
                        <h2>Welcome to project-name</h2>
                        {/* Divider with text at right side and hr at left side */}
                        <div
                            className={`${aboutStyles.divider} displayNoneAtDesktop`}
                        >
                            <div className={aboutStyles.dividerHr}></div>
                            <span className={aboutStyles.dividerText}>
                                Knives made of high-quality steel
                            </span>
                        </div>

                        <p className='displayNoneAtMobile'>
                            Knives made of high-quality steel
                        </p>
                        <p>
                            At project-name, our mission is to provide
                            exceptional products that are reliable, effective,
                            and affordable. We offer premium folding knives, pry
                            bars, fidget spinners, knucks and lanyard beads that
                            is priced for everyone.
                        </p>
                        <p>
                            Incorporated in Wyoming in 2017 and operating out of
                            Pennsylvania, USA, we are committed to offering
                            high-quality products that are designed to meet and
                            exceed your everyday needs. With lightning-fast
                            service, best in class customer support, and a vast
                            array of premium products, project-name is
                            passionate about providing an exceptional experience
                            from start to finish.
                        </p>
                        <p>
                            Where Function Marries Style At project-name, we
                            have a passion for design, and it shows. Being EDC
                            enthusiasts ourselves, we are committed to creating
                            tools that look great and work better. We believe
                            well designed products shouldn’t demand a hefty
                            price so we’re here to change that.
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default About
