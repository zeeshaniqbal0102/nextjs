import Link from 'next/link'
import {Col, Container, Row} from 'react-bootstrap'
import categoriesStyles from './Categories.module.css'

function Categories() {
    return (
        <>
            <section
                className={`${categoriesStyles.categoriesWrapper} displayNoneAtMobile`}
            >
                <section id={categoriesStyles.knives}>
                    <Container>
                        <Row className={categoriesStyles.categoriesRow}>
                            <Col
                                md={5}
                                className={categoriesStyles.categoriesCol}
                            >
                                <div className={categoriesStyles.categoryTop}>
                                    <h2
                                        className={`${categoriesStyles.categoryTitle} textWhite`}
                                    >
                                        Knives
                                    </h2>
                                    <p
                                        className={`${categoriesStyles.categoryDescription} textWhite`}
                                    >
                                        Choose your knife made of high-quality
                                        steel Bohler M390, CPM S35Vn or steel D2
                                    </p>
                                </div>
                                <div
                                    className={categoriesStyles.categoryBottom}
                                >
                                    <Link href='/knives'>
                                        <a
                                            className={`${categoriesStyles.categoryLink} btn btnWhite`}
                                        >
                                            <span
                                                className={
                                                    categoriesStyles.categoryLinkText
                                                }
                                            >
                                                View knives
                                            </span>
                                        </a>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section id={categoriesStyles.secondSec}>
                    <div id={categoriesStyles.edc}>
                        <Container>
                            <Row className={categoriesStyles.categoriesRow}>
                                <Col className={categoriesStyles.categoriesCol}>
                                    <div
                                        className={categoriesStyles.categoryTop}
                                    >
                                        <h2
                                            className={`${categoriesStyles.categoryTitle} textWhite`}
                                        >
                                            EDC
                                        </h2>
                                        <p
                                            className={`${categoriesStyles.categoryDescription} textWhite`}
                                        >
                                            From Pry Bars to Lanyard Beads, Safe
                                            Touch Tool to knucks – project-name
                                            offers a diverse assortment of EDC
                                            tools meet your daily needs.
                                        </p>
                                    </div>
                                    <div
                                        className={
                                            categoriesStyles.categoryBottom
                                        }
                                    >
                                        <Link href='/edc'>
                                            <a
                                                className={`${categoriesStyles.categoryLink} btn btnWhite`}
                                            >
                                                <span
                                                    className={
                                                        categoriesStyles.categoryLinkText
                                                    }
                                                >
                                                    View EDC
                                                </span>
                                            </a>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    {/* Fifget */}
                    <div id={categoriesStyles.fidget}>
                        <Container>
                            <Row className={categoriesStyles.categoriesRow}>
                                <Col className={categoriesStyles.categoriesCol}>
                                    <div
                                        className={categoriesStyles.categoryTop}
                                    >
                                        <h2
                                            className={`${categoriesStyles.categoryTitle} textWhite`}
                                        >
                                            Fidget
                                        </h2>
                                        <p
                                            className={`${categoriesStyles.categoryDescription} textWhite`}
                                        >
                                            project-name started it’s journey
                                            with fidget spinners in 2017. Since
                                            then, we have designed and released
                                            tens of spinners and other fidget
                                            products.
                                        </p>
                                    </div>
                                    <div
                                        className={
                                            categoriesStyles.categoryBottom
                                        }
                                    >
                                        <Link href='/fidget'>
                                            <a
                                                className={`${categoriesStyles.categoryLink} btn btnWhite`}
                                            >
                                                <span
                                                    className={
                                                        categoriesStyles.categoryLinkText
                                                    }
                                                >
                                                    View Fidget
                                                </span>
                                            </a>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </section>
            </section>
            {/* Mobile Section */}
            <section
                className={`${categoriesStyles.categoriesWrapper} ${categoriesStyles.mobileVersion} displayNoneAtDesktop`}
            >
                <section id={categoriesStyles.mobileKnives}>
                    {/* Button */}
                    <Link href='/knives'>
                        <a
                            className={`${categoriesStyles.categoryLink} btn btnWhite`}
                        >
                            <span className={categoriesStyles.categoryLinkText}>
                                View knives
                            </span>
                        </a>
                    </Link>
                </section>
                <section id={categoriesStyles.mobileSecondSec}>
                    <Row>
                        <Col id={categoriesStyles.mobileEDC}>
                            {/* Button */}
                            <Link href='/edc'>
                                <a
                                    className={`${categoriesStyles.categoryLink} btn btnWhite`}
                                >
                                    <span
                                        className={
                                            categoriesStyles.categoryLinkText
                                        }
                                    >
                                        View EDC
                                    </span>
                                </a>
                            </Link>
                        </Col>
                        <Col id={categoriesStyles.mobileFidget}>
                            {/* Button */}
                            <Link href='/fidget'>
                                <a
                                    className={`${categoriesStyles.categoryLink} btn btnWhite`}
                                >
                                    <span
                                        className={
                                            categoriesStyles.categoryLinkText
                                        }
                                    >
                                        View Fidget
                                    </span>
                                </a>
                            </Link>
                        </Col>
                    </Row>
                </section>
            </section>
        </>
    )
}

export default Categories
