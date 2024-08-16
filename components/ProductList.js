import ProductItem from './ProductItem'
import articleStyles from '../styles/Article.module.css'

const ProductList = ({articles}) => {
    return (
        <div className={articleStyles.grid}>
            {articles.map((article, idx) => (
                <ProductItem key={idx} article={article} />
            ))}
        </div>
    )
}

export default ProductList
