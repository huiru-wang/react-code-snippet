import { useContext, useEffect, useMemo, useState } from 'react'
import './App.css'
import FilterBar from './components/FilterBar'
import ProductList from './components/ProductList'
import { productData } from './lib/data'
import { Product } from './lib/types'
import { ThemeButton } from './components/ThemeButton'
import { ThemeContext } from './context/ThemeContext'

function App() {

  console.log("App rendered");

  const [products, setProducts] = useState<Product[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [keyword, setKeyword] = useState<string>('');
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    setProducts(productData);
  }, [])

  /**
   * 缓存过滤后的商品列表
   */
  const filteredProducts = useMemo(() => {
    // 重新计算的时机
    console.log('Compute filteredProducts');

    return products.filter(product => {
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchesSearch = product.name.toLowerCase().includes(keyword.toLowerCase());
      return matchesPrice && matchesSearch;
    });

  }, [products, minPrice, maxPrice, keyword]);

  const onMinPriceChange = (min: number) => {
    setMinPrice(min);
  };

  const onMaxPriceChange = (max: number) => {
    setMaxPrice(max);
  };

  const onSearchKeywordChange = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <div className={`container-${theme}`}>

      {/* 切换Product的卡片主题，不会触发组件的重新渲染 */}
      <ThemeButton />

      <FilterBar
        minPrice={minPrice}
        maxPrice={maxPrice}
        keyword={keyword}
        onMinPriceChange={onMinPriceChange}
        onMaxPriceChange={onMaxPriceChange}
        onSearchKeywordChange={onSearchKeywordChange}
      />
      <ProductList products={filteredProducts} />
    </div>
  )
}

export default App
