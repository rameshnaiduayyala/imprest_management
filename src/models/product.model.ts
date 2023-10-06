// Product interface
export interface Product {
    id?: number;
    description: string;
    strength: string;
    short_code: string;
    pack_size: number|string,
    pack_uom_id: number|string,
    measure_id: number|string,
    product_form_id: number|string,
    brand_id: number|string,
    generic_id: number|string,
}