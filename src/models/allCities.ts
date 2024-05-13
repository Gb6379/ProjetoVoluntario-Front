export default interface allCities {
    id: number;
    name: string;
    uf: string;
    country: {
        id: number;
        name: string;
    }
    cities: {
        map(arg0: (city: any) => import("react").JSX.Element): import("react").ReactNode;
        id: number;
        name: string;
    }
}