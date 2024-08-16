import React from 'react'
import Banner from '../components/Products/Banner'
import Content from '../components/Products/Content'
import Layout from '../components/Layout'

function Knives() {
    return (
        <Layout>
            <Banner
                text='project-name offers a wide assortment of knives that are perfect for every occasion and application.  We deliver high-end knives crafted from premium steels like Bohler M390, CPM S35Vn, and D2 steel mated with rugged, durable handle materials such as Titanium, Carbon Fiber, Micarta, and G10.  With drop point, clip point, Wharncliffe, Sheepsfoot and Tanto blades ranging from 2” to 3.5”, project-name offers expertly crafted folding knives that are both beautiful to look at and tremendously functional. Affordable yet substantial.'
                page='Knives'
            />
            <Content category='knives' />
        </Layout>
    )
}

export default Knives
