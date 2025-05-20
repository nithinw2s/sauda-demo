
import CustomFilterComponent from "@/components/filter/filter";
import { FilterConfig } from "@/utils/typos";


const index = () => {

    const handleApply = (key: string) => {
        console.log(`Applied filter: ${key}`);
    }
    const handleReset = (key: string) => {
        console.log(`Reset filter: ${key}`);
    }
    
    // this is the furniture page filterConfigs
    const furnitureFilterConfigs: FilterConfig[] = [
        { key: 'material', type: 'select', options: ['Wood', 'Metal', 'Plastic'] },
        { key: 'style', type: 'select', options: ['Modern', 'Traditional', 'Industrial'] },
        { key: 'color', type: 'select', options: ['Red', 'Blue', 'Green'] },
        { key: 'price', type: 'range', range: [50, 2000] },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Furnitures Component</h1>
            <CustomFilterComponent
            fields={furnitureFilterConfigs}
            onApply={handleApply}
            onReset={handleReset}
            />
        </div>
    )
}

export default index;