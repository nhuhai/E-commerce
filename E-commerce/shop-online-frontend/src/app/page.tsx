import Slider from "./components/Slider";
import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
        <ProductList />
      </div>
    </div>
  );
}
