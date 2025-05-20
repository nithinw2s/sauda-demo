
import CustomFilterComponent from "@/components/filter/filter";
import { FilterConfig } from "@/utils/typos";


const index = () => {

    const handleApply = (key: string) => {
        console.log(`Applied filter: ${key}`);
    }
    const handleReset = (key: string) => {
        console.log(`Reset filter: ${key}`);
    }
    // This is a bike page filterConfigs
    const bikeFilterConfigs: FilterConfig[] = [
        { key: 'brand', type: 'select', options: ['Yamaha', 'Honda', 'Kawasaki'] },
        { key: 'model', type: 'select', options: ['YZF-R1', 'CBR1000RR', 'Ninja H2'] },
        { key: 'engineType', type: 'select', options: ['Petrol', 'Electric'] },
        { key: 'price', type: 'range', range: [5000, 30000] },
    ];


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Bikes Component</h1>
            <CustomFilterComponent
            fields={bikeFilterConfigs}
            onApply={handleApply}
            onReset={handleReset}
            />
        </div>
    )
}

export default index;