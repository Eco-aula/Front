export type WasteCategory = 'PLASTIC' | 'GLASS' | 'CARDBOARD' | 'ORGANIC' | 'PAPER' | 'METAL';

export interface Waste {
    id?: number;
    name: string;
    category: WasteCategory;
    description?: string;
    heavy: number; // float
}

const API_URL = "/api/v1/wastes";

export const registerWaste = async (wasteData: Omit<Waste, 'id'>): Promise<Waste> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(wasteData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Detalle del error del servidor:", errorData);
            throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
        }

        const savedWaste: Waste = await response.json();
        console.log("Waste registered successfully:", savedWaste);
        return savedWaste;
    } catch (error: any) {
        console.error("Waste registration error:", error);
        throw error;
    }
};
