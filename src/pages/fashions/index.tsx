import ProtectedRoute from '../../components/ProtectedRoute';
import CustomFilterComponent from "@/components/filter/filter";
import { FilterConfig } from "@/utils/typos";


const index = () => {

    const handleApply = (key: string) => {
        console.log(`Applied filter: ${key}`);
    }
    const handleReset = (key: string) => {
        console.log(`Reset filter: ${key}`);
    }

    // This is a fashion component, so we can add more filter configurations specific to fashion
    const fashionFilterConfigs: FilterConfig[] = [
      { key: 'size', type: 'select', options: ['S', 'M', 'L', 'XL'] },
      { key: 'color', type: 'select', options: ['Red', 'Blue', 'Green'] },
      { key: 'brand', type: 'select', options: ['Nike', 'Adidas', 'Puma'] },
      { key: 'material', type: 'select', options: ['Cotton', 'Polyester'] },
      { key: 'price', type: 'range', range: [100, 2000] },
    ];


    return (
        <ProtectedRoute>
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Fashion Component</h1>
            <CustomFilterComponent
            fields={fashionFilterConfigs}
            onApply={handleApply}
            onReset={handleReset}
            category="fashions"
            />
        </div>
        </ProtectedRoute>
    )
}

export default index;