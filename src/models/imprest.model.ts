export interface Imprest {
  id?: number | string;
  name: string;
  description: string;
  phone_number_1?: number | string;
  extension_1?: number | string;
  phone_number_2?: number | string;
  extension_2?: number | string;
  hospital_id?: string | Number | boolean;
  active?: boolean;
}