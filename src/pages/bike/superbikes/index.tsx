
import CustomFilterComponent from "@/components/filter/filter";
import { FilterConfig } from "@/utils/typos";


const index = () => {

    const handleApply = (key: string) => {
        console.log(`Applied filter: ${key}`);
    }
    const handleReset = (key: string) => {
        console.log(`Reset filter: ${key}`);
    }
    // This is a superbikes page filterConfigs
    const superbikeFilterConfigs: FilterConfig[] = [
        { key: 'brand', type: 'select', options: ['Ducati', 'BMW', 'Kawasaki'] },
        { key: 'model', type: 'select', options: ['Panigale V4', 'S1000RR', 'Ninja ZX-10R'] },
        { key: 'engineType', type: 'select', options: ['Petrol', 'Electric'] },
        { key: 'price', type: 'range', range: [15000, 50000] },
    ];


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Super Bikes Component</h1>
            <CustomFilterComponent
            fields={superbikeFilterConfigs}
            onApply={handleApply}
            onReset={handleReset}
            />
        </div>
    )
}

export default index;