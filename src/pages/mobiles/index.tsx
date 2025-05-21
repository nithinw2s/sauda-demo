
import CustomFilterComponent from "@/components/filter/filter";
import { FilterConfig } from "@/utils/typos";


const index = () => {

    const handleApply = (key: string) => {
        console.log(`Applied filter: ${key}`);
    }
    const handleReset = (key: string) => {
        console.log(`Reset filter: ${key}`);
    }
    const filterConfigs: FilterConfig[] = [
      { key: 'brand', type: 'select', options: ['Samsung', 'Apple', 'OnePlus'] },
      { key: 'model', type: 'select', options: ['Galaxy S21', 'iPhone 12', 'OnePlus 9'] },
      { key: 'storage', type: 'select', options: ['64GB', '128GB', '256GB'] },
      { key: 'price', type: 'range', range: [100, 900] },
    ];


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Mobile Component</h1>
            <CustomFilterComponent
            fields={filterConfigs}
            onApply={handleApply}
            onReset={handleReset}
            />
        </div>
    )
}

export default index;