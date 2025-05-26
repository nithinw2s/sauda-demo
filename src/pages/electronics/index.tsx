import ProtectedRoute from '../../components/ProtectedRoute';
import CustomFilterComponent from "@/components/filter/filter";
import { FilterConfig } from "@/utils/typos";

const ElectronicsPage = () => {
    const handleApply = (key: string) => {
        console.log(`Applied filter: ${key}`);
    };
    const handleReset = (key: string) => {
        console.log(`Reset filter: ${key}`);
    };

    const electronicsFilterConfigs: FilterConfig[] = [
        { key: 'brand', type: 'select', options: ['Samsung', 'Apple', 'Sony'] },
        { key: 'model', type: 'select', options: ['Galaxy S21', 'iPhone 12', 'Xperia 5'] },
        { key: 'storage', type: 'select', options: ['64GB', '128GB', '256GB'] },
        { key: 'price', type: 'range', range: [100, 2000] },
    ];

    return (
        <ProtectedRoute>
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Electronics Component</h1>
            <CustomFilterComponent
                fields={electronicsFilterConfigs}
                category="electronics"
                onApply={handleApply}
                onReset={handleReset}
            />
        </div>
        </ProtectedRoute>
    );
};

export default ElectronicsPage;