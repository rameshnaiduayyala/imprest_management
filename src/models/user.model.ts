export interface User {
  id?: number,
  user_name: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  phone_number: string,
  email: string,
  active: boolean|string,
  created_by: string,
  created_at?: Date,
  modified_by: string,
  modified_at?: Date,
  hospital_id?: number | string
}