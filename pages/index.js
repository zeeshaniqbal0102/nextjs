import HomeBanner from '../components/Home/HomeBanner'
import Categories from '../components/Home/Categories'
import About from '../components/Home/About'
import Instagram from '../components/Home/Instagram'
import Layout from '../components/Layout'

export default function Home() {
    return (
        <Layout>
            <HomeBanner />
            <Categories />
            <About />
            <Instagram />
        </Layout>
    )
}
