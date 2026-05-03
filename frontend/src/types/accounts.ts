export interface UserProfile {
  public_id: string;
  name: string;
  email: string;
  birthday: string | null;
  course: string | null;
  phone_number: string | null;
  image: string | null;
  created_at: string;
}

export interface UserProfileUpdate {
  name?: string;
  birthday?: string | null;
  course?: string | null;
  phone_number?: string | null;
  image?: File | null;
}

export interface UserPublicProfile {
  public_id: string;
  name: string;
  course: string | null;
  age: number | null;
  image: string | null;
}