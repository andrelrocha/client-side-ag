import { CountryResponseDTO, RoleResponseDTO } from ".";

export interface CreateUserRequestDTO {
  email: string;
  password: string;
  name: string;
  username: string;
  phone: string;
  birthday: string; // formato YYYY-MM-DD
  countryId: string;
  twoFactorEnabled: boolean;
  refreshTokenEnabled: boolean;
  theme: 'LIGHT' | 'DARK';
  rolesName: string[];
}

export interface CreateUserResponseDTO {
  id: string;
  email: string;
  username: string;
  name: string;
  phone: string;
  birthday: string;
  refreshTokenEnabled: boolean;
  twoFactorEnabled: boolean;
  theme: 'LIGHT' | 'DARK';
  profilePicUrl: string | null;
  roles: RoleResponseDTO[];
  country: CountryResponseDTO;
}
