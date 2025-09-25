export interface User {
    id: number;
    name: string;
    email: string;
    telefono: string;
    role: 'admin' | 'user' | 'guest';
    fechaNacimiento: Date;
    DNI: string;
    direccion: string;
    ciudad: string;
    distrito: string;
}